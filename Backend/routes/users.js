const express = require('express');
const router = express.Router();
const passport = require('passport');
const { validateUserCreation,handleValidationErrors } = require('../middleware/validationMiddleware');


const userController = require('../controllers/user_controllers');


router.post('/creating',validateUserCreation,handleValidationErrors, userController.create);

// use passport as a middleware to authenticate
router.post("/sign", passport.authenticate(
    'local',
    { failureRedirect: '/login-failure' }
), userController.createSession)
router.get('/abhi', userController.abhi);
router.get('/login-failure', userController.loginFailure);

module.exports = router;    //exporting router to use it in server.js