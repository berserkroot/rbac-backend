const express = require('express');
const router = express.Router();
const permission = require('../controllers/permissionController');
const { verifyToken, hasPermission } = require('../middleware/auth');

router.get('/', verifyToken, hasPermission('permissions', 'read'), permission.getAll);
router.post('/', verifyToken, hasPermission('permissions', 'create'), permission.create);
router.put('/:id', verifyToken, hasPermission('permissions', 'update'), permission.update);
router.delete('/:id', verifyToken, hasPermission('permissions', 'delete'), permission.delete);

module.exports = router;