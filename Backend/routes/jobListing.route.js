import express from 'express';

const router = express.Router();

import jobListingController from '../controllers/jobListing.controller.js';
import { validateJobListing, handleValidationErrors } from '../middleware/jobListingValidation.js';
import verifyEmployer from '../utils/VerifyEmployer.js';

router.post('/create',validateJobListing, handleValidationErrors, jobListingController.createJobListing);
router.delete('/delete/:id', verifyEmployer,jobListingController.deleteJobListing);    // delete job listing route
router.post('/update/:id', verifyEmployer,jobListingController.updateJobListing);    // update job listing route
router.get('/get/:id', jobListingController.getJobListing);    // get job listing route

export default router;

