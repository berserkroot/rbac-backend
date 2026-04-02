const { User, Role, Pais, LoginHistory } = require('../models');
const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
const { createNotification } = require('../services/notificationService');
const { validatePassword, addToHistory, isPasswordExpired } = require('../services/passwordPolicyService');

const getClientIp = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress;
};

// Opciones de la cookie (ajustadas para desarrollo local)
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // false en desarrollo (localhost)
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000 // 24 horas
};

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: juanperez
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 example: MiClaveSegura123!
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Email ya registrado o política de contraseña no cumple
 *       500:
 *         description: Error del servidor
 */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email ya registrado' });

    await validatePassword(password);

    const user = await User.create({ username, email, password });
    user.password_changed_at = new Date();
    await user.save();

    const userRole = await Role.findOne({ where: { name: 'usuario' } });
    if (userRole) await user.addRole(userRole);

    await addToHistory(user.id, user.password);

    await createNotification(user.id, {
      title: 'Bienvenido al sistema',
      message: `Hola ${username}, tu cuenta ha sido creada exitosamente.`,
      type: 'info',
      link: '/profile'
    });

    res.status(201).json({
      message: 'Usuario registrado',
      user: { id: user.id, username, email }
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: root@sistema.com
 *               password:
 *                 type: string
 *                 example: root123
 *     responses:
 *       200:
 *         description: Login exitoso (sin 2FA) o requiere 2FA
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/UserWithPermissions'
 *                 - type: object
 *                   properties:
 *                     requires2fa:
 *                       type: boolean
 *                     tempToken:
 *                       type: string
 *                     message:
 *                       type: string
 *       401:
 *         description: Credenciales inválidas
 *       403:
 *         description: Contraseña expirada (requiresPasswordChange)
 *       423:
 *         description: Cuenta bloqueada por múltiples intentos
 *       500:
 *         description: Error del servidor
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ip = getClientIp(req);
    const userAgent = req.headers['user-agent'] || '';

    const user = await User.findOne({ where: { email }, include: [Role] });

    if (!user) {
      await LoginHistory.create({
        user_id: null,
        ip_address: ip,
        user_agent: userAgent,
        success: false
      });
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    if (user.locked_until && new Date() < new Date(user.locked_until)) {
      await LoginHistory.create({
        user_id: user.id,
        ip_address: ip,
        user_agent: userAgent,
        success: false
      });
      const remainingMinutes = Math.ceil((new Date(user.locked_until) - new Date()) / 60000);
      return res.status(423).json({
        error: `Cuenta bloqueada por múltiples intentos fallidos. Intente de nuevo en ${remainingMinutes} minutos.`
      });
    }

    const passwordValid = await user.validatePassword(password);
    if (!passwordValid) {
      await LoginHistory.create({
        user_id: user.id,
        ip_address: ip,
        user_agent: userAgent,
        success: false
      });

      const newAttempts = (user.failed_login_attempts || 0) + 1;
      if (newAttempts >= 5) {
        const lockedUntil = new Date(Date.now() + 20 * 60 * 1000);
        await user.update({
          failed_login_attempts: newAttempts,
          locked_until: lockedUntil
        });
        return res.status(423).json({
          error: 'Demasiados intentos fallidos. Cuenta bloqueada por 20 minutos.'
        });
      } else {
        await user.update({ failed_login_attempts: newAttempts });
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
    }

    await user.update({
      failed_login_attempts: 0,
      locked_until: null,
      lastLogin: new Date()
    });

    await LoginHistory.create({
      user_id: user.id,
      ip_address: ip,
      user_agent: userAgent,
      success: true
    });

    const expired = await isPasswordExpired(user);
    if (expired) {
      return res.status(403).json({
        requiresPasswordChange: true,
        error: 'Su contraseña ha expirado. Debe cambiarla para continuar.'
      });
    }

    if (user.twoFactorEnabled) {
      const tempToken = jwt.sign(
        { id: user.id, email: user.email, temp: true },
        process.env.JWT_SECRET,
        { expiresIn: '5m' }
      );
      return res.json({
        requires2fa: true,
        tempToken,
        message: 'Código 2FA requerido',
      });
    }

    const userFull = await User.findByPk(user.id, {
      include: [
        { model: Role, include: ['Permissions'] },
        { model: Pais, as: 'pais', attributes: ['id', 'nombre', 'codigo'] }
      ],
      attributes: { exclude: ['password'] }
    });

    const permissions = userFull.Roles.flatMap(role =>
      role.Permissions.map(p => `${p.resource}:${p.action}`)
    );

    const userLevel = Math.max(...(userFull.Roles.map(r => r.level) || []), 0);
    const token = authService.generateToken(user, userLevel);

    // Establecer la cookie HttpOnly
    res.cookie('token', token, cookieOptions);

    res.json({
      user: {
        ...userFull.toJSON(),
        permissions
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtener información del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario con permisos y roles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithPermissions'
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error del servidor
 */
exports.getMe = async (req, res) => {
  try {
    // Intentar usar req.user (inyectado por middleware verifyToken)
    let user = req.user;
    if (!user && req.userId) {
      user = await User.findByPk(req.userId, {
        include: [
          { model: Role, include: ['Permissions'] },
          { model: Pais, as: 'pais' }
        ],
        attributes: { exclude: ['password'] }
      });
    }

    if (!user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const permissions = user.Roles.flatMap(role =>
      role.Permissions.map(p => `${p.resource}:${p.action}`)
    );

    const userData = user.toJSON();
    delete userData.password;

    res.json({
      ...userData,
      permissions
    });
  } catch (error) {
    console.error('Error en getMe:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Cambiar contraseña del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Nueva contraseña no cumple políticas de seguridad
 *       401:
 *         description: Contraseña actual incorrecta
 *       500:
 *         description: Error del servidor
 */
exports.changePassword = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }
    const { currentPassword, newPassword } = req.body;

    if (!await user.validatePassword(currentPassword)) {
      return res.status(401).json({ error: 'Contraseña actual incorrecta' });
    }

    await validatePassword(newPassword, user.id);

    user.password = newPassword;
    user.password_changed_at = new Date();
    await user.save();

    await addToHistory(user.id, user.password);
    await user.increment('token_version');

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error en changePassword:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /auth/logout-all:
 *   post:
 *     summary: Cerrar sesión en todos los dispositivos (incrementa token_version)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sesiones cerradas en todos los dispositivos
 *       500:
 *         description: Error del servidor
 */
exports.logoutAll = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }
    await user.increment('token_version');
    res.clearCookie('token', cookieOptions);
    res.json({ message: 'Sesión cerrada en todos los dispositivos' });
  } catch (error) {
    console.error('Error en logoutAll:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cerrar sesión (elimina la cookie)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 *       500:
 *         description: Error del servidor
 */
exports.logout = async (req, res) => {
  try {
    res.clearCookie('token', cookieOptions);
    res.json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({ error: error.message });
  }
};