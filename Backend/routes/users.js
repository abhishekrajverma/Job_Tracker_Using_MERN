const express = require('express');
const router = express.Router();
const passport = require('passport');
const { validateUserCreation,handleValidationErrors } = require('../middleware/validationMiddleware');



const authController = require('../controllers/auth.controller.js');


router.post('/creating',validateUserCreation,handleValidationErrors, authController.create);

// use passport as a middleware to authenticate
router.post("/sign", passport.authenticate(
    'local',
    { failureRedirect: '/login-failure' }
), authController.createSession)

router.get('/login-failure', authController.loginFailure);

//router.get('/sign-out', authController.destroySession);

module.exports = router;    //exporting router to use it in server.js