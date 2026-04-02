const { Notification, User } = require('../models');
const { getIO } = require('../socket'); // 👈 importar función para obtener instancia de io

async function createNotification(userId, data) {
  try {
    console.log(`[notify] Creando notificación para usuario ${userId}: ${data.title}`);

    // Verificar usuario
    const user = await User.findByPk(userId);
    if (!user) {
      console.error(`[notify] Usuario ${userId} no existe`);
      return null;
    }

    const notification = await Notification.create({
      user_id: userId,
      title: data.title,
      message: data.message,
      type: data.type || 'info',
      link: data.link || null
    });

    console.log(`[notify] Notificación creada con ID ${notification.id}`);

    // Emitir evento en tiempo real a la sala del usuario
    try {
      const io = getIO();
      io.to(`user:${userId}`).emit('new_notification', notification.toJSON());
    } catch (err) {
      console.error('[notify] Error emitiendo evento Socket.io:', err.message);
    }

    return notification;
  } catch (error) {
    console.error('[notify] Error creando notificación:', error);
    return null;
  }
}

module.exports = { createNotification };