const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  nombres: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  apellidos: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  foto: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  twoFactorEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  twoFactorSecret: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  document_type: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'document_type'
  },
  document_number: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'document_number'
  },
  calle: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  numero: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  entre: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'entre'
  },
  avenida: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  localidad: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  municipio: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  provincia: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  id_pais: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'pais',
      key: 'id'
    },
    field: 'id_pais'
  },
  // ========== RECUPERACIÓN CON ARCHIVO ==========
  recovery_key_hash: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  recovery_key_created_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  // ========== BLOQUEO POR INTENTOS FALLIDOS ==========
  failed_login_attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  locked_until: {
    type: DataTypes.DATE,
    allowNull: true
  },
  // ========== POLÍTICAS DE CONTRASEÑA ==========
  password_changed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  // ========== CIERRE DE SESIÓN EN TODOS LOS DISPOSITIVOS ==========
  token_version: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  },
  underscored: true,
  timestamps: true
});

User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;