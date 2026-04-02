const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');
const { User, Role, Pais } = require('../models');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000
};

/**
 * @swagger
 * /auth/enable-2fa:
 *   post:
 *     summary: Generar secreto y código QR para activar 2FA
 *     tags: [2FA]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Secreto y QR generados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 secret:
 *                   type: string
 *                 qrCode:
 *                   type: string
 *                   format: base64
 *                 message:
 *                   type: string
 *       400:
 *         description: 2FA ya activado
 *       500:
 *         description: Error del servidor
 */
exports.enable2FA = async (req, res) => {
  try {
    const user = req.user;

    const secret = speakeasy.generateSecret({
      name: `RBAC:${user.email}`,
      length: 20,
    });

    user.twoFactorSecret = secret.base32;
    await user.save();

    const qrCode = await QRCode.toDataURL(secret.otpauth_url);

    res.json({
      secret: secret.base32,
      qrCode,
      message: 'Escanea el QR con Google Authenticator',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /auth/verify-2fa:
 *   post:
 *     summary: Verificar código y activar 2FA
 *     tags: [2FA]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: Código de 6 dígitos de Google Authenticator
 *     responses:
 *       200:
 *         description: 2FA activado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Código inválido o no hay secreto pendiente
 *       500:
 *         description: Error del servidor
 */
exports.verifyAndEnable2FA = async (req, res) => {
  try {
    const user = req.user;
    const { token } = req.body;

    if (!user.twoFactorSecret) {
      return res.status(400).json({ error: 'No hay un secreto pendiente' });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (!verified) {
      return res.status(400).json({ error: 'Código inválido' });
    }

    user.twoFactorEnabled = true;
    await user.save();

    res.json({ message: '2FA activado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /auth/disable-2fa:
 *   post:
 *     summary: Desactivar 2FA
 *     tags: [2FA]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: Código de 6 dígitos de Google Authenticator
 *     responses:
 *       200:
 *         description: 2FA desactivado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Código inválido o 2FA no activado
 *       500:
 *         description: Error del servidor
 */
exports.disable2FA = async (req, res) => {
  try {
    const user = req.user;
    const { token } = req.body;

    if (!user.twoFactorEnabled) {
      return res.status(400).json({ error: '2FA no está activado' });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (!verified) {
      return res.status(400).json({ error: 'Código inválido' });
    }

    user.twoFactorEnabled = false;
    user.twoFactorSecret = null;
    await user.save();

    res.json({ message: '2FA desactivado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /auth/verify-2fa-login:
 *   post:
 *     summary: Segundo paso de login (verificar código 2FA)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tempToken
 *               - token
 *             properties:
 *               tempToken:
 *                 type: string
 *                 description: Token temporal recibido en el primer paso
 *               token:
 *                 type: string
 *                 description: Código de 6 dígitos de Google Authenticator
 *     responses:
 *       200:
 *         description: Login completado con 2FA
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserWithPermissions'
 *       400:
 *         description: Faltan datos o 2FA no activado
 *       401:
 *         description: Token temporal inválido o código incorrecto
 *       500:
 *         description: Error del servidor
 */
exports.verify2FALogin = async (req, res) => {
  try {
    const { tempToken, token } = req.body;

    if (!tempToken || !token) {
      return res.status(400).json({ error: 'Faltan datos' });
    }

    let decoded;
    try {
      decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: 'Token temporal inválido o expirado' });
    }

    if (!decoded.temp) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const user = await User.findByPk(decoded.id, {
      include: [
        { model: Role, include: ['Permissions'] },
        { model: Pais, as: 'pais', attributes: ['id', 'nombre', 'codigo'] }
      ],
      attributes: { exclude: ['password'] }
    });

    if (!user || !user.twoFactorEnabled) {
      return res.status(400).json({ error: '2FA no activado para este usuario' });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (!verified) {
      return res.status(401).json({ error: 'Código 2FA incorrecto' });
    }

    const permissions = user.Roles.flatMap(role =>
      role.Permissions.map(p => `${p.resource}:${p.action}`)
    );

    const finalToken = jwt.sign(
      { id: user.id, email: user.email, token_version: user.token_version },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    user.lastLogin = new Date();
    await user.save();

    res.cookie('token', finalToken, cookieOptions);

    res.json({
      user: {
        ...user.toJSON(),
        permissions
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};