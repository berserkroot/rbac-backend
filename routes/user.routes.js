const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const { verifyToken, hasPermission, isOwnerOrHasPermission } = require('../middleware/auth');
const { userRules, idParamRule, validate } = require('../validators');

router.get('/', verifyToken, hasPermission('users', 'read'), user.getAll);
router.get('/:id', verifyToken, idParamRule, validate, isOwnerOrHasPermission('users', 'read'), user.getById);
router.post('/', verifyToken, userRules, validate, hasPermission('users', 'create'), user.create);
router.put('/:id', verifyToken, idParamRule, validate, isOwnerOrHasPermission('users', 'update'), user.update);
router.delete('/:id', verifyToken, idParamRule, validate, hasPermission('users', 'delete'), user.delete);

module.exports = router;