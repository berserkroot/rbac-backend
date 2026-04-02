const express = require('express');
const router = express.Router();
const policyController = require('../controllers/passwordPolicyController');
const { verifyToken } = require('../middleware/auth');
const { hasPermission } = require('../middleware/auth');

// Solo root puede acceder
router.get('/', verifyToken, hasPermission('settings', 'read'), policyController.getPolicy);
router.put('/', verifyToken, hasPermission('settings', 'update'), policyController.updatePolicy);

module.exports = router;