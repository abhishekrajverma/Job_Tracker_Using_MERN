const express = require('express');
const router = express.Router();    
const authController = require('../controllers/auth.controller.js');
const { validateUserCreation,handleValidationErrors } = require('../middleware/validationMiddleware');

router.post('/creating',validateUserCreation,handleValidationErrors, authController.create);
router.post('/sign-in', authController.signIn);
router.post('/google', authController.googleSignIn);

module.exports = router;    //exporting router to use it in server.js