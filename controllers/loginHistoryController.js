const { LoginHistory, User } = require('../models');
const { Op } = require('sequelize');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: connect.sid
 *       description: Cookie de sesión (express-session)
 *
 * /login-history:
 *   get:
 *     summary: Obtener historial de inicios de sesión (con paginación y filtros)
 *     tags: [Login History]
 *     security:
 *       - cookieAuth: []
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
 *           default: 20
 *         description: Elementos por página
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filtrar por ID de usuario (solo root/administrador)
 *       - in: query
 *         name: success
 *         schema:
 *           type: boolean
 *         description: Filtrar por éxito (true/false)
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de inicio (YYYY-MM-DD)
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de fin (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de registros de login con paginación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       ip_address:
 *                         type: string
 *                       user_agent:
 *                         type: string
 *                       success:
 *                         type: boolean
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       User:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           username:
 *                             type: string
 *                           email:
 *                             type: string
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
 *       401:
 *         description: No autenticado (cookie inválida o ausente)
 *       403:
 *         description: No autorizado para ver el historial solicitado
 *       500:
 *         description: Error interno del servidor
 */
exports.getHistory = async (req, res) => {
  try {
    // Verificar que req.user existe (debe venir del middleware)
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    const currentUser = req.user;
    const roles = currentUser.Roles?.map(r => r.name) || [];
    const isRootOrAdmin = roles.includes('root') || roles.includes('administrador');

    // Paginación
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const where = {};

    if (!isRootOrAdmin) {
      where.user_id = currentUser.id;
    } else {
      const userId = req.query.userId ? parseInt(req.query.userId) : null;
      if (userId) where.user_id = userId;
    }

    // Filtro éxito
    if (req.query.success !== undefined && req.query.success !== '') {
      where.success = req.query.success === 'true';
    }

    // Filtros de fecha
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    if (fromDate) {
      const start = new Date(fromDate);
      start.setHours(0, 0, 0, 0);
      where.created_at = { [Op.gte]: start };
    }
    if (toDate) {
      const end = new Date(toDate);
      end.setHours(23, 59, 59, 999);
      where.created_at = where.created_at
        ? { ...where.created_at, [Op.lte]: end }
        : { [Op.lte]: end };
    }

    const { count, rows } = await LoginHistory.findAndCountAll({
      where,
      include: [{ model: User, attributes: ['id', 'username', 'email'] }],
      order: [['created_at', 'DESC']],
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
    console.error('Error en getHistory:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener el historial' });
  }
};