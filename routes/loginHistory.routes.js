const express = require('express');
const router = express.Router();
const loginHistoryController = require('../controllers/loginHistoryController');
const { verifyToken } = require('../middleware/auth');

// Middleware para verificar que el usuario tenga rol root o administrador
const checkAdminOrRoot = (req, res, next) => {
  const userRoles = req.user?.Roles?.map(r => r.name) || [];
  if (userRoles.includes('root') || userRoles.includes('administrador')) {
    return next();
  }
  return res.status(403).json({ error: 'No tienes permisos para ver el historial de login' });
};

// Ruta protegida: solo root y administradores
router.get('/', verifyToken, checkAdminOrRoot, loginHistoryController.getHistory);

module.exports = router;