const rateLimit = require('express-rate-limit');

exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'development' ? 10000 : 1000,
  message: { error: 'Demasiadas peticiones, intente más tarde' },
  skip: (req) => process.env.NODE_ENV === 'development'
});

exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'development' ? 100 : 10,
  message: { error: 'Demasiados intentos, espere 15 minutos' }
});