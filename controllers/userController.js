const { User, Role, Pais, sequelize } = require('../models');
const { Op } = require('sequelize');
const { createNotification } = require('../services/notificationService');
const { validatePassword, addToHistory } = require('../services/passwordPolicyService');

const allowedUpdateFields = [
  'username', 'nombres', 'apellidos', 'email', 'isActive', 'document_type', 'document_number',
  'calle', 'numero', 'entre', 'avenida', 'localidad', 'municipio', 'provincia', 'pais_id', 'foto'
];

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener lista de usuarios con paginación y filtros
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Buscar por username, nombres, apellidos o email
 *       - in: query
 *         name: role
 *         schema: { type: string }
 *         description: Filtrar por nombre de rol
 *     responses:
 *       200:
 *         description: Lista paginada de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data: { type: array, items: { $ref: '#/components/schemas/User' } }
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total: { type: integer }
 *                     page: { type: integer }
 *                     limit: { type: integer }
 *                     pages: { type: integer }
 *       500:
 *         description: Error del servidor
 */
exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const roleFilter = req.query.role || '';
    // userLevel viene del middleware verifyToken (máximo nivel de rol del usuario autenticado)
    const userLevel = req.userLevel || 4;

    const where = {};
    if (search) {
      where[Op.or] = [
        { username: { [Op.like]: `%${search}%` } },
        { nombres: { [Op.like]: `%${search}%` } },
        { apellidos: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }

    // Filtrar usuarios cuyo nivel máximo de rol sea <= userLevel
    const levelSubquery = sequelize.literal(`(
      SELECT MAX(r.level)
      FROM userroles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = User.id
    ) <= ${userLevel}`);
    where[Op.and] = where[Op.and] ? [where[Op.and], levelSubquery] : [levelSubquery];

    const include = [
      { model: Role, attributes: ['name', 'level'] },
      { model: Pais, as: 'pais', attributes: ['id', 'nombre', 'codigo'] }
    ];

    if (roleFilter) {
      include[0].where = { name: roleFilter };
      include[0].required = true;
    }

    const { count, rows } = await User.findAndCountAll({
      where,
      include,
      attributes: { exclude: ['password'] },
      order: [['id', 'ASC']],
      limit,
      offset,
      distinct: true
    });

    res.json({
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Error en getAll usuarios:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Datos del usuario
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
exports.getById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Role, attributes: ['name', 'level'] },
        { model: Pais, as: 'pais', attributes: ['id', 'nombre', 'codigo'] }
      ],
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *               username: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               nombres: { type: string }
 *               apellidos: { type: string }
 *               document_type: { type: string }
 *               document_number: { type: string }
 *               calle: { type: string }
 *               numero: { type: string }
 *               entre: { type: string }
 *               avenida: { type: string }
 *               localidad: { type: string }
 *               municipio: { type: string }
 *               provincia: { type: string }
 *               pais_id: { type: integer }
 *               roles: { type: array, items: { type: string }, description: 'Lista de nombres de roles' }
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       400:
 *         description: Error de validación (contraseña, email duplicado)
 *       500:
 *         description: Error del servidor
 */
exports.create = async (req, res) => {
  try {
    const { username, email, password, roles, pais_id, ...rest } = req.body;
    const userData = { username, email, password, ...rest };
    if (pais_id !== undefined && pais_id !== '' && !isNaN(parseInt(pais_id))) {
      userData.id_pais = parseInt(pais_id);
    }

    await validatePassword(password);

    const user = await User.create(userData);
    user.password_changed_at = new Date();
    await user.save();

    await addToHistory(user.id, user.password);

    if (roles && roles.length > 0) {
      const roleInstances = await Role.findAll({ where: { name: roles } });
      await user.addRoles(roleInstances);
    } else {
      const defaultRole = await Role.findOne({ where: { name: 'usuario' } });
      if (defaultRole) await user.addRole(defaultRole);
    }

    await createNotification(user.id, {
      title: 'Bienvenido al sistema',
      message: `Hola ${user.username}, tu cuenta ha sido creada exitosamente.`,
      type: 'info',
      link: '/profile'
    });

    const userWithDetails = await User.findByPk(user.id, {
      include: [
        { model: Role, attributes: ['name', 'level'] },
        { model: Pais, as: 'pais', attributes: ['id', 'nombre', 'codigo'] }
      ],
      attributes: { exclude: ['password'] }
    });

    res.status(201).json(userWithDetails);
  } catch (error) {
    console.error('Error en create usuario:', error);
    if (error.message && (error.message.includes('contraseña') || error.message.includes('mayúscula') || error.message.includes('número') || error.message.includes('símbolo') || error.message.includes('historial'))) {
      return res.status(400).json({ error: error.message });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El email o nombre de usuario ya existe' });
    }
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               isActive: { type: boolean }
 *               nombres: { type: string }
 *               apellidos: { type: string }
 *               document_type: { type: string }
 *               document_number: { type: string }
 *               calle: { type: string }
 *               numero: { type: string }
 *               entre: { type: string }
 *               avenida: { type: string }
 *               localidad: { type: string }
 *               municipio: { type: string }
 *               provincia: { type: string }
 *               pais_id: { type: integer }
 *               roles: { type: array, items: { type: string } }
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */
exports.update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const { username, email, isActive, roles, password, pais_id } = req.body;

    if (username) user.username = username;
    if (email) user.email = email;
    if (isActive !== undefined) user.isActive = isActive;

    if (password) {
      await validatePassword(password, user.id);
      user.password = password;
      user.password_changed_at = new Date();
      await addToHistory(user.id, user.password);
      await user.increment('token_version'); // Invalidar sesiones del usuario
    }

    if (pais_id !== undefined && pais_id !== '' && !isNaN(parseInt(pais_id))) {
      user.id_pais = parseInt(pais_id);
    } else {
      user.id_pais = null;
    }

    for (const field of allowedUpdateFields) {
      if (req.body[field] !== undefined && field !== 'username' && field !== 'email' && field !== 'isActive' && field !== 'pais_id') {
        user[field] = req.body[field];
      }
    }

    await user.save();

    if (roles && Array.isArray(roles)) {
      const roleInstances = await Role.findAll({ where: { name: roles } });
      await user.setRoles(roleInstances);
    }

    const updatedUser = await User.findByPk(user.id, {
      include: [
        { model: Role, attributes: ['name', 'level'] },
        { model: Pais, as: 'pais', attributes: ['id', 'nombre', 'codigo'] }
      ],
      attributes: { exclude: ['password'] }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error en update usuario:', error);
    if (error.message && (error.message.includes('contraseña') || error.message.includes('mayúscula') || error.message.includes('número') || error.message.includes('símbolo') || error.message.includes('historial'))) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *       400:
 *         description: No se puede eliminar el único usuario root
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
exports.delete = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const userRoles = await user.getRoles();
    if (userRoles.some(r => r.name === 'root')) {
      const rootRole = await Role.findOne({ where: { name: 'root' }, include: [User] });
      if (rootRole.Users.length <= 1) {
        return res.status(400).json({ error: 'No puede eliminar el único root' });
      }
    }

    await user.destroy();
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error en delete usuario:', error);
    res.status(500).json({ error: error.message });
  }
};