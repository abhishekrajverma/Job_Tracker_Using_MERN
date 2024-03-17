import exprees from 'express';
import employerController from '../controllers/employers.conroller.js';
import  { validateUserCreation, handleValidationErrors } from '../middleware/validationMiddleware.js'; // import the validation middleware used to validate user input
import verifyEmployer from '../utils/VerifyEmployer.js';
const router = exprees.Router();

router.post('/create',validateUserCreation,handleValidationErrors, employerController.createEmployer);
router.post('/login', employerController.signInEmployer);
router.post('/google-login', employerController.googleSignInEmployer);
router.get('/listings/:id', verifyEmployer, employerController.getUserListings); // get user listings route
router.get('/sign-out', employerController.signOutEmployer); // sign out route

export default router;