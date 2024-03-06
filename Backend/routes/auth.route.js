import express from 'express';
const router = express.Router();    
import authController from '../controllers/auth.controller.js';
import  { validateUserCreation, handleValidationErrors } from '../middleware/validationMiddleware.js'; // import the validation middleware used to validate user input

router.post('/creating',validateUserCreation, handleValidationErrors, authController.create); 
router.post('/sign-in', authController.signIn); // sign in route
router.post('/google', authController.googleSignIn); // google sign in route
router.get('/sign-out', authController.signOut); // sign out route

  //exporting router to use it in server.js
export default router;