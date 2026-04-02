const express = require('express');
const router = express.Router();
const appSettingController = require('../controllers/appSettingController');
const { verifyToken } = require('../middleware/auth');

// Ruta pública para obtener configuraciones (sin verificación de token)
router.get('/', appSettingController.getAll);

// Ruta protegida para actualizar (solo root - se maneja en el controlador o con hasPermission)
router.put('/', verifyToken, appSettingController.update);

module.exports = router;