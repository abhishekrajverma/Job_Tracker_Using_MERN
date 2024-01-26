const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller.js');


router.get('/', userController.hello);
module.exports = router;    //exporting router to use it in server.js