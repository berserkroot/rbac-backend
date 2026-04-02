require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const http = require('http');
const path = require('path');
const { sequelize } = require('./models');
const { apiLimiter } = require('./middleware/rateLimiter');
const { initialize: initSocket } = require('./socket');

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
const permissionRoutes = require('./routes/permission.routes');
const uploadRoutes = require('./routes/upload.routes');
const paisRoutes = require('./routes/pais.routes');
const appSettingRoutes = require('./routes/appSetting.routes');
const notificationRoutes = require('./routes/notification.routes');
const passwordPolicyRoutes = require('./routes/passwordPolicy.routes');
const loginHistoryRoutes = require('./routes/loginHistory.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger/swagger');

const app = express();

// ===============================
// 1. Configuración de CORS (importante para cookies)
// ===============================
const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:5173',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origen (curl, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS bloqueado para origen: ${origin}`);
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,      // Permitir envío de cookies
  optionsSuccessStatus: 200
}));

// ===============================
// 2. Seguridad básica (Helmet)
// ===============================
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// ===============================
// 3. Middlewares estándar
// ===============================
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());        // Necesario para leer cookies
app.use(apiLimiter);            // Rate limiting

// ===============================
// 4. Archivos estáticos (uploads) con CORS explícito
// ===============================
app.use('/uploads', (req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.sendStatus(200);
  }
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
}, express.static(path.join(__dirname, 'uploads')));

// ===============================
// 5. Rutas de la API
// ===============================
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/paises', paisRoutes);
app.use('/api/settings', appSettingRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/password-policy', passwordPolicyRoutes);
app.use('/api/login-history', loginHistoryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// ===============================
// 6. Health check y ruta raíz de API
// ===============================
app.get('/api', (req, res) => {
  res.json({
    message: 'API RBAC funcionando',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      roles: '/api/roles',
      permissions: '/api/permissions'
    }
  });
});

// ===============================
// 7. Manejo de rutas no encontradas (404)
// ===============================
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// ===============================
// 8. Manejador global de errores
// ===============================
app.use((err, req, res, next) => {
  console.error('❌ Error no capturado:', err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// ===============================
// 9. Inicialización del servidor con Socket.io
// ===============================
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
const io = initSocket(server);   // Asumiendo que socket.js exporta initialize

sequelize.sync({ alter: false }).then(() => {
  console.log('📦 MySQL conectado correctamente');
  server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}/api`);
    console.log(`🔌 Socket.io escuchando en el mismo puerto`);
    console.log(`📄 Documentación Swagger: http://localhost:${PORT}/api-docs`);
  });
}).catch(err => {
  console.error('❌ Error al conectar la base de datos:', err.message);
  process.exit(1);
});