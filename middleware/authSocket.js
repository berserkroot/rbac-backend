const jwt = require('jsonwebtoken');

/**
 * Middleware para autenticar conexiones Socket.io
 */
function authSocket(socket, next) {
  const cookieHeader = socket.handshake.headers.cookie;
  if (!cookieHeader) {
    return next(new Error('Autenticación requerida: no se encontró cookie'));
  }

  const token = cookieHeader.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  if (!token) {
    return next(new Error('Autenticación requerida: token no presente'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    return next(new Error('Token inválido'));
  }
}

module.exports = authSocket;