import express from 'express';

const router = express.Router();

import jobListingController from '../controllers/jobListing.controller.js';
import { validateJobListing, handleValidationErrors } from '../middleware/jobListingValidation.js';

router.post('/create',validateJobListing, handleValidationErrors, jobListingController.createJobListing);

export default router;

