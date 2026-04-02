const jwt = require('jsonwebtoken');
const { User } = require('../models');

const verifyToken = async (req, res, next) => {
  try {
    let token = null;

    // 1. Obtener token de la cookie (HttpOnly)
    if (req.cookies?.token) {
      token = req.cookies.token;
    }
    // 2. Si no, del header Authorization (Bearer)
    else {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      return res.status(401).json({ error: 'No autenticado: token no proporcionado' });
    }

    // 3. Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Obtener usuario con roles y permisos
    const user = await User.findByPk(decoded.id, {
      include: [
        {
          model: require('../models').Role,
          include: ['Permissions']
        }
      ]
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // 5. Verificar token_version (para logout-all)
    if (decoded.token_version !== undefined && user.token_version !== decoded.token_version) {
      return res.status(401).json({ error: 'Sesión expirada. Inicie sesión nuevamente.' });
    }

    // 6. Adjuntar datos a la request
    req.userId = user.id;
    req.user = user;
    req.userLevel = Math.max(...(user.Roles?.map(r => r.level) || [0]), 0);

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    console.error('Error en verifyToken:', error);
    return res.status(401).json({ error: 'Error de autenticación' });
  }
};

// Verificar permiso específico
const hasPermission = (resource, action) => {
  return async (req, res, next) => {
    try {
      const user = req.user; // ya cargado por verifyToken
      const roles = user.Roles?.map(r => r.name) || [];
      if (roles.includes('root')) return next();

      const permissions = user.Roles.flatMap(role =>
        role.Permissions.map(p => `${p.resource}:${p.action}`)
      );

      const required = `${resource}:${action}`;
      if (!permissions.includes(required)) {
        return res.status(403).json({ error: 'No tiene permiso para esta acción' });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

// Propietario o permiso
const isOwnerOrHasPermission = (resource, action) => {
  return async (req, res, next) => {
    const userId = parseInt(req.params.id);
    if (req.userId === userId) return next();
    return hasPermission(resource, action)(req, res, next);
  };
};

module.exports = { verifyToken, hasPermission, isOwnerOrHasPermission };