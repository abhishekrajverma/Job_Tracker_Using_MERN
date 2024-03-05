import express from 'express';
const router = express.Router();

import userController from '../controllers/user.controller.js';
import verifyUser from '../utils/VerifyUser.js';



router.post('/update/:id', verifyUser, userController.updateUser);

//exporting router to use it in server.js

export default router;