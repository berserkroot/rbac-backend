const { AppSetting, PasswordHistory } = require('../models');
const bcrypt = require('bcryptjs');

const getPolicy = async () => {
  const settings = await AppSetting.findAll({
    where: {
      key: [
        'password_min_length',
        'password_require_uppercase',
        'password_require_number',
        'password_require_symbol',
        'password_expiry_days',
        'password_history_limit'
      ]
    }
  });
  const policy = {};
  settings.forEach(s => { policy[s.key] = s.value; });
  return policy;
};

const validatePassword = async (password, userId = null) => {
  const policy = await getPolicy();
  const minLength = parseInt(policy.password_min_length) || 8;
  if (password.length < minLength) {
    throw new Error(`La contraseña debe tener al menos ${minLength} caracteres.`);
  }
  if (policy.password_require_uppercase === 'true' && !/[A-Z]/.test(password)) {
    throw new Error('La contraseña debe contener al menos una letra mayúscula.');
  }
  if (policy.password_require_number === 'true' && !/[0-9]/.test(password)) {
    throw new Error('La contraseña debe contener al menos un número.');
  }
  if (policy.password_require_symbol === 'true' && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    throw new Error('La contraseña debe contener al menos un símbolo.');
  }

  if (userId) {
    const historyLimit = parseInt(policy.password_history_limit) || 20;
    const history = await PasswordHistory.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
      limit: historyLimit
    });
    for (const record of history) {
      const match = await bcrypt.compare(password, record.password_hash);
      if (match) {
        throw new Error(`No puedes usar una contraseña que hayas usado en las últimas ${historyLimit} veces.`);
      }
    }
  }
  return true;
};

const addToHistory = async (userId, passwordHash) => {
  await PasswordHistory.create({ user_id: userId, password_hash: passwordHash });
};

const isPasswordExpired = async (user) => {
  if (!user.password_changed_at) return false;
  const policy = await getPolicy();
  const expiryDays = parseInt(policy.password_expiry_days) || 90;
  if (expiryDays === 0) return false; // nunca expira
  const expiryDate = new Date(user.password_changed_at);
  expiryDate.setDate(expiryDate.getDate() + expiryDays);
  return new Date() > expiryDate;
};

module.exports = {
  getPolicy,
  validatePassword,
  addToHistory,
  isPasswordExpired
};