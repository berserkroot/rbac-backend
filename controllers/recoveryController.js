const { User } = require('../models');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { encrypt, decrypt } = require('../services/encryptionService');

/**
 * @swagger
 * /recovery/generate:
 *   post:
 *     summary: Generar archivo de recuperación (token cifrado)
 *     tags: [Recovery]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Archivo binario con el token de recuperación cifrado
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
exports.generateRecoveryFile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const token = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(token, 10);
    user.recovery_key_hash = hash;
    user.recovery_key_created_at = new Date();
    await user.save();

    const encryptedToken = encrypt(token);

    res.setHeader('Content-Disposition', 'attachment; filename="recovery_key"');
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(encryptedToken);
  } catch (error) {
    console.error('Error generando archivo de recuperación:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /recovery/reset:
 *   post:
 *     summary: Restablecer contraseña usando archivo de recuperación
 *     tags: [Recovery]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token cifrado en base64 (contenido del archivo)
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Archivo corrupto, token inválido o ya usado
 *       500:
 *         description: Error del servidor
 */
exports.resetWithRecoveryFile = async (req, res) => {
  try {
    const { token: tokenBase64, newPassword } = req.body;
    if (!tokenBase64 || !newPassword) {
      return res.status(400).json({ error: 'Token y nueva contraseña requeridos' });
    }

    let token;
    try {
      const encryptedBuffer = Buffer.from(tokenBase64, 'base64');
      token = decrypt(encryptedBuffer);
    } catch (err) {
      return res.status(400).json({ error: 'Archivo corrupto o no válido' });
    }

    const users = await User.findAll({
      where: { recovery_key_hash: { [Op.ne]: null } }
    });
    let user = null;
    for (const u of users) {
      const match = await bcrypt.compare(token, u.recovery_key_hash);
      if (match) {
        user = u;
        break;
      }
    }

    if (!user) {
      return res.status(400).json({ error: 'Token inválido o ya usado' });
    }

    user.password = newPassword;
    user.recovery_key_hash = null;
    user.recovery_key_created_at = null;
    await user.save();

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error restableciendo con archivo de recuperación:', error);
    res.status(500).json({ error: error.message });
  }
};