const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PasswordHistory = sequelize.define('PasswordHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  underscored: true,
  timestamps: true,
  updatedAt: false
});

module.exports = PasswordHistory;