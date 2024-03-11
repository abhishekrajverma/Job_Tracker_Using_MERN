import exprees from 'express';
import employerController from '../controllers/employers.conroller.js';
import  { validateUserCreation, handleValidationErrors } from '../middleware/validationMiddleware.js'; // import the validation middleware used to validate user input
const router = exprees.Router();

router.post('/create',validateUserCreation,handleValidationErrors, employerController.createEmployer);

export default router;