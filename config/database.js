const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'sistema_rbac',  // nombre BD
  'root',          // usuario
  '',              // contraseña (cámbiala si tienes una)
  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
      underscored: true
    }
  }
);

module.exports = sequelize;