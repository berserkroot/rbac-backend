const express = require('express');
const router = express.Router();
const role = require('../controllers/roleController');
const { verifyToken, hasPermission } = require('../middleware/auth');

router.get('/', verifyToken, hasPermission('roles', 'read'), role.getAll);
router.post('/', verifyToken, hasPermission('roles', 'create'), role.create);
router.put('/:id', verifyToken, hasPermission('roles', 'update'), role.update);
router.delete('/:id', verifyToken, hasPermission('roles', 'delete'), role.delete);

module.exports = router;