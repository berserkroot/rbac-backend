const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

exports.generateToken = (user, level) => {
  return jwt.sign(
    { id: user.id, email: user.email, level: level || 0, token_version: user.token_version || 0 },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

exports.getUserWithRoles = async (userId) => {
  return await User.findByPk(userId, {
    include: [Role],
    attributes: { exclude: ['password'] }
  });
};