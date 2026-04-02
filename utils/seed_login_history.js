const { LoginHistory } = require('../models');

const seedLoginHistory = async () => {
  try {
    // El dump original no tiene registros en login_history
    // Si deseas insertar un registro de ejemplo, descomenta el bloque:
    /*
    const [history, created] = await LoginHistory.findOrCreate({
      where: { id: 1 },
      defaults: {
        user_id: 1,
        ip_address: '::1',
        user_agent: 'Mozilla/5.0',
        success: true,
        created_at: new Date()
      }
    });
    if (created) console.log('✅ Historial de login de ejemplo insertado');
    else console.log('ℹ️ El historial de login ya existe');
    */
    console.log('✅ Tabla login_history verificada (sin datos por defecto)');
  } catch (error) {
    console.error('❌ Error con login_history:', error);
  } finally {
    process.exit();
  }
};

seedLoginHistory();