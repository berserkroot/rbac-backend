const { Role, Permission } = require('../models');
const { Op } = require('sequelize');

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtener todos los roles con paginación y filtros
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Elementos por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nombre o descripción
 *       - in: query
 *         name: level
 *         schema:
 *           type: integer
 *         description: Filtrar por nivel de jerarquía
 *     responses:
 *       200:
 *         description: Lista paginada de roles con sus permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RoleWithPermissions'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *       500:
 *         description: Error del servidor
 */
exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const levelFilter = req.query.level ? parseInt(req.query.level) : null;
    const userLevel = req.userLevel || 4;

    const where = {};
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }
    if (levelFilter) {
      where.level = levelFilter;
    }
    where.level = { [Op.lte]: userLevel };

    const { count, rows } = await Role.findAndCountAll({
      where,
      include: [{ model: Permission, attributes: ['id', 'name'] }],
      order: [['level', 'ASC']],
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
    console.error('Error en getAll:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - level
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               level:
 *                 type: integer
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de nombres de permisos
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleWithPermissions'
 *       500:
 *         description: Error del servidor
 */
exports.create = async (req, res) => {
  try {
    const { name, description, level, permissions } = req.body;
    const role = await Role.create({ name, description, level });

    if (permissions) {
      const perms = await Permission.findAll({ where: { name: permissions } });
      await role.addPermissions(perms);
    }

    const roleWithPerms = await Role.findByPk(role.id, { include: [Permission] });
    res.status(201).json(roleWithPerms);
  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Actualizar un rol
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               level:
 *                 type: integer
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Rol actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleWithPermissions'
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error del servidor
 */
exports.update = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: 'Rol no encontrado' });

    const { name, description, level, permissions } = req.body;
    if (name) role.name = name;
    if (description) role.description = description;
    if (level) role.level = level;
    await role.save();

    if (permissions) {
      const perms = await Permission.findAll({ where: { name: permissions } });
      await role.setPermissions(perms);
    }

    const updated = await Role.findByPk(role.id, { include: [Permission] });
    res.json(updated);
  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Eliminar un rol
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: No se pueden eliminar roles del sistema
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error del servidor
 */
exports.delete = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: 'Rol no encontrado' });

    const systemRoles = ['root', 'administrador', 'gestor', 'usuario'];
    if (systemRoles.includes(role.name)) {
      return res.status(400).json({ error: 'No puede eliminar roles del sistema' });
    }

    await role.destroy();
    res.json({ message: 'Rol eliminado' });
  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({ error: error.message });
  }
};