const upload = require('../config/multer');
const { User } = require('../models');
const fs = require('fs');
const path = require('path');

const uploadPhoto = upload.single('foto');

/**
 * @swagger
 * /upload/profile-photo:
 *   post:
 *     summary: Subir foto de perfil del usuario autenticado
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen (jpeg, jpg, png, gif, webp)
 *     responses:
 *       200:
 *         description: Foto subida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 foto:
 *                   type: string
 *       400:
 *         description: Error en la subida (formato no válido, archivo no enviado)
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
exports.uploadProfilePhoto = (req, res) => {
  uploadPhoto(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }

    try {
      const userId = req.userId;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      if (user.foto) {
        const oldPath = path.join(__dirname, '../uploads/profiles', path.basename(user.foto));
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      const fotoPath = `/uploads/profiles/${req.file.filename}`;
      user.foto = fotoPath;
      await user.save();

      res.json({ 
        message: 'Foto subida correctamente',
        foto: fotoPath
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

/**
 * @swagger
 * /upload/profile-photo:
 *   delete:
 *     summary: Eliminar foto de perfil del usuario autenticado
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foto eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: No hay foto para eliminar
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
exports.deleteProfilePhoto = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (!user.foto) {
      return res.status(400).json({ error: 'No hay foto para eliminar' });
    }

    const fs = require('fs');
    const path = require('path');
    const oldPath = path.join(__dirname, '../uploads/profiles', path.basename(user.foto));
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }

    user.foto = null;
    await user.save();

    res.json({ message: 'Foto eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};