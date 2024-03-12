import exprees from 'express';
import employerController from '../controllers/employers.conroller.js';
import  { validateUserCreation, handleValidationErrors } from '../middleware/validationMiddleware.js'; // import the validation middleware used to validate user input
const router = exprees.Router();

router.post('/create',validateUserCreation,handleValidationErrors, employerController.createEmployer);
router.post('/login', employerController.signInEmployer);
router.post('/google-login', employerController.googleSignInEmployer);


export default router;