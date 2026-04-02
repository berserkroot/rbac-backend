const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const twoFactor = require('../controllers/twoFactorController');
const recovery = require('../controllers/recoveryController'); 
const { authLimiter } = require('../middleware/rateLimiter');
const { registerRules, loginRules, validate } = require('../validators');
const { verifyToken } = require('../middleware/auth');
const multer = require('multer');
const upload = multer(); 

router.post('/register', registerRules, validate, auth.register);
router.post('/login', loginRules, validate, authLimiter, auth.login);
router.get('/me', verifyToken, auth.getMe);
router.post('/change-password', verifyToken, auth.changePassword);
router.post('/logout-all', verifyToken, auth.logoutAll);
router.post('/logout', verifyToken, auth.logout);

// 2FA endpoints
router.post('/enable-2fa', verifyToken, twoFactor.enable2FA);
router.post('/verify-2fa', verifyToken, twoFactor.verifyAndEnable2FA);
router.post('/disable-2fa', verifyToken, twoFactor.disable2FA);
router.post('/verify-2fa-login', twoFactor.verify2FALogin);

// Recuperación con archivo
router.post('/generate-recovery-key', verifyToken, recovery.generateRecoveryFile);
router.post('/reset-with-recovery-file', upload.single('file'), recovery.resetWithRecoveryFile);

module.exports = router;