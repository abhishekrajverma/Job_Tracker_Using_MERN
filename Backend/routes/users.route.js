import express from 'express';
const router = express.Router();

import userController from '../controllers/user.controller.js';
import verifyUser from '../utils/VerifyUser.js';


// routes for user operations 
router.post('/update/:id', verifyUser, userController.updateUser);
router.delete('/delete/:id', verifyUser, userController.deleteUser); // delete user route 

//exporting router to use it in server.js
export default router;