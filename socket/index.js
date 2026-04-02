const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

let io;

/**
 * Inicializa el servidor Socket.io y configura autenticación y salas.
 * @param {http.Server} server - Servidor HTTP de Express
 * @returns {Server} Instancia de Socket.io
 */
function initialize(server) {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST']
    }
  });

  // Middleware de autenticación para Socket.io (lee token desde cookie)
  io.use((socket, next) => {
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
  });

  io.on('connection', (socket) => {
    const userId = socket.user.id;
    console.log(`🔌 Socket conectado: usuario ${userId} (${socket.id})`);

    // Unir al socket a la sala personal del usuario
    socket.join(`user:${userId}`);

    socket.on('disconnect', () => {
      console.log(`🔌 Socket desconectado: usuario ${userId}`);
    });
  });

  return io;
}

/**
 * Obtiene la instancia de Socket.io (para usar en otros módulos).
 * @returns {Server}
 */
function getIO() {
  if (!io) {
    throw new Error('Socket.io no ha sido inicializado. Llama a initialize() primero.');
  }
  return io;
}

module.exports = { initialize, getIO };