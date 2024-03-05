import express from 'express';
const router = express.Router();    
import authController from '../controllers/auth.controller.js';
import  { validateUserCreation, handleValidationErrors } from '../middleware/validationMiddleware.js';

router.post('/creating',validateUserCreation, handleValidationErrors, authController.create);
router.post('/sign-in', authController.signIn);
router.post('/google', authController.googleSignIn);

  //exporting router to use it in server.js
export default router;