const { Notification, User } = require('../models');
const { Op } = require('sequelize');
const { getIO } = require('../socket'); // 👈 importar io

const toISODate = (date) => {
  if (!date) return new Date().toISOString(); // fallback
  const d = new Date(date);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
};

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Obtener notificaciones del usuario autenticado
 *     tags: [Notifications]
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
 *           default: 20
 *         description: Elementos por página
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [info, success, warning, error]
 *         description: Filtrar por tipo
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
 *         description: Lista de notificaciones paginadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Notification'
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
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const type = req.query.type;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    const where = { user_id: userId };
    if (type) where.type = type;
    if (fromDate) where.created_at = { [Op.gte]: new Date(fromDate) };
    if (toDate) {
      const endDate = new Date(toDate + ' 23:59:59');
      where.created_at = { ...where.created_at, [Op.lte]: endDate };
    }

    const { count, rows } = await Notification.findAndCountAll({
      where,
      order: [['created_at', 'DESC']],
      limit,
      offset
    });

    const formattedRows = rows.map(row => ({
      ...row.toJSON(),
      created_at: toISODate(row.created_at),
      updated_at: toISODate(row.updated_at)
    }));

    res.json({
      data: formattedRows,
      meta: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Error obteniendo notificaciones:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /notifications/recent:
 *   get:
 *     summary: Obtener las 10 notificaciones más recientes
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notificaciones recientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Error del servidor
 */
exports.getRecent = async (req, res) => {
  try {
    const userId = req.userId;
    const notifications = await Notification.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
      limit: 10
    });

    const formatted = notifications.map(row => ({
      ...row.toJSON(),
      created_at: toISODate(row.created_at),
      updated_at: toISODate(row.updated_at)
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error obteniendo notificaciones recientes:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /notifications/unread-count:
 *   get:
 *     summary: Obtener cantidad de notificaciones no leídas
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conteo de no leídas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *       500:
 *         description: Error del servidor
 */
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.userId;
    const count = await Notification.count({
      where: { user_id: userId, read: false }
    });
    res.json({ count });
  } catch (error) {
    console.error('Error obteniendo conteo de no leídas:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /notifications/{id}/read:
 *   put:
 *     summary: Marcar una notificación como leída
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Notificación marcada como leída
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error del servidor
 */
exports.markAsRead = async (req, res) => {
  try {
    const userId = req.userId;
    const notificationId = req.params.id;

    const notification = await Notification.findOne({
      where: { id: notificationId, user_id: userId }
    });

    if (!notification) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }

    await notification.update({ read: true });

    // Emitir evento para actualizar el contador de no leídas en el frontend
    try {
      const io = getIO();
      const unreadCount = await Notification.count({
        where: { user_id: userId, read: false }
      });
      io.to(`user:${userId}`).emit('notification_read', {
        notificationId: notification.id,
        unreadCount
      });
    } catch (err) {
      console.error('Error emitiendo evento de notificación leída:', err.message);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error marcando como leída:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Eliminar una notificación
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Notificación eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error del servidor
 */
exports.deleteNotification = async (req, res) => {
  try {
    const userId = req.userId;
    const notificationId = req.params.id;

    const deleted = await Notification.destroy({
      where: { id: notificationId, user_id: userId }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error eliminando notificación:', error);
    res.status(500).json({ error: error.message });
  }
};