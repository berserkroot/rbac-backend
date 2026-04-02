const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { verifyToken } = require('../middleware/auth');
const appUploadController = require('../controllers/appUploadController');


router.post('/profile-photo', verifyToken, uploadController.uploadProfilePhoto);
router.delete('/profile-photo', verifyToken, uploadController.deleteProfilePhoto); 
router.post('/app/:type', verifyToken, appUploadController.uploadAppAsset);

module.exports = router;