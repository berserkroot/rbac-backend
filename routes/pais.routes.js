const express = require('express');
const router = express.Router();
const paisController = require('../controllers/paisController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, paisController.getAll);

module.exports = router;