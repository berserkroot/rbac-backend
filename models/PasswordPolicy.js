const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PasswordPolicy = sequelize.define('PasswordPolicy', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  min_length: {
    type: DataTypes.INTEGER,
    defaultValue: 8,
    allowNull: false
  },
  require_uppercase: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  require_lowercase: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  require_number: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  require_symbol: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  expiration_days: {
    type: DataTypes.INTEGER,
    defaultValue: 90,
    allowNull: false
  },
  password_history_count: {
    type: DataTypes.INTEGER,
    defaultValue: 20,
    allowNull: false
  }
}, {
  timestamps: true,
  underscored: true,
  tableName: 'password_policies'
});

module.exports = PasswordPolicy;