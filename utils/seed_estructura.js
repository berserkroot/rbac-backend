const { sequelize } = require('../models');

const createStructure = async () => {
  try {
    // Sincroniza todos los modelos con la base de datos
    // { alter: true } ajusta columnas sin borrar datos (cuidado en producción)
    await sequelize.sync({ alter: true });
    console.log('✅ Estructura de base de datos creada/actualizada correctamente');
  } catch (error) {
    console.error('❌ Error creando estructura:', error);
  } finally {
    process.exit();
  }
};

createStructure();