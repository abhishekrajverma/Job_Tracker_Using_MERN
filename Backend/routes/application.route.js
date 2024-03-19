import express from 'express';
const router = express.Router(); 
import applicationController from "../controllers/application.controller.js";
import verifyUser from '../utils/VerifyUser.js';

router.post('/creating',verifyUser, applicationController.createApplication); // create application route
router.get('/all/:id',verifyUser, applicationController.getAllApplications); // g
export default router; // export the router to use it in server.js