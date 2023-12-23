const express = require('express');
const router = express.Router();
const { validateUserCreation,handleValidationErrors } = require('../middleware/validationMiddleware');


const userController = require('../controllers/user_controllers');


router.post('/creating',validateUserCreation,handleValidationErrors, userController.create);
router.get('/login', userController.login);


module.exports = router;    //exporting router to use it in server.js