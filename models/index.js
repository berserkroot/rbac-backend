const sequelize = require('../config/database');
const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const RolePermission = require('./RolePermission');
const Pais = require('./Pais');
const AppSetting = require('./AppSetting');
const Notification = require('./Notification');
const PasswordHistory = require('./PasswordHistory');
const LoginHistory = require('./LoginHistory'); // 👈 nuevo

// Relaciones User - Role
User.belongsToMany(Role, { through: 'UserRoles', foreignKey: 'user_id' });
Role.belongsToMany(User, { through: 'UserRoles', foreignKey: 'role_id' });

// Relaciones Role - Permission
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'role_id' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permission_id' });

// Relación User - Pais
User.belongsTo(Pais, { foreignKey: 'id_pais', as: 'pais' });
Pais.hasMany(User, { foreignKey: 'id_pais' });

// Relación User - Notification
User.hasMany(Notification, { foreignKey: 'user_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

// Relación User - PasswordHistory
User.hasMany(PasswordHistory, { foreignKey: 'user_id' });
PasswordHistory.belongsTo(User, { foreignKey: 'user_id' });

// Relación User - LoginHistory
User.hasMany(LoginHistory, { foreignKey: 'user_id' });
LoginHistory.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  Role,
  Permission,
  RolePermission,
  Pais,
  AppSetting,
  Notification,
  PasswordHistory,
  LoginHistory // 👈 exportar
};