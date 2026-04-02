const { Permission } = require('../models');
const { Op } = require('sequelize');

/**
 * @swagger
 * /permissions:
 *   get:
 *     summary: Obtener todos los permisos con paginación y filtros
 *     tags: [Permissions]
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
 *         name: resource
 *         schema:
 *           type: string
 *         description: Filtrar por recurso
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *         description: Filtrar por acción
 *     responses:
 *       200:
 *         description: Lista paginada de permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Permission'
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
    const resourceFilter = req.query.resource || '';
    const actionFilter = req.query.action || '';

    const where = {};
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }
    if (resourceFilter) {
      where.resource = resourceFilter;
    }
    if (actionFilter) {
      where.action = actionFilter;
    }

    const { count, rows } = await Permission.findAndCountAll({
      where,
      order: [['resource', 'ASC'], ['action', 'ASC']],
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
 * /permissions:
 *   post:
 *     summary: Crear un nuevo permiso
 *     tags: [Permissions]
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
 *               - resource
 *               - action
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               resource:
 *                 type: string
 *               action:
 *                 type: string
 *     responses:
 *       201:
 *         description: Permiso creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       500:
 *         description: Error del servidor
 */
exports.create = async (req, res) => {
  try {
    const perm = await Permission.create(req.body);
    res.status(201).json(perm);
  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /permissions/{id}:
 *   put:
 *     summary: Actualizar un permiso
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del permiso
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
 *               resource:
 *                 type: string
 *               action:
 *                 type: string
 *     responses:
 *       200:
 *         description: Permiso actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Permiso no encontrado
 *       500:
 *         description: Error del servidor
 */
exports.update = async (req, res) => {
  try {
    const perm = await Permission.findByPk(req.params.id);
    if (!perm) return res.status(404).json({ error: 'Permiso no encontrado' });
    await perm.update(req.body);
    res.json(perm);
  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /permissions/{id}:
 *   delete:
 *     summary: Eliminar un permiso
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del permiso
 *     responses:
 *       200:
 *         description: Permiso eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Permiso no encontrado
 *       500:
 *         description: Error del servidor
 */
exports.delete = async (req, res) => {
  try {
    const perm = await Permission.findByPk(req.params.id);
    if (!perm) return res.status(404).json({ error: 'Permiso no encontrado' });
    await perm.destroy();
    res.json({ message: 'Permiso eliminado' });
  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({ error: error.message });
  }
};