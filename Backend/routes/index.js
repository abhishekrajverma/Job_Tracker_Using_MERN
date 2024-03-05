import express from 'express';
const router = express.Router();
import authRoute from './auth.route.js';
import userRoute from './users.route.js';

//for any further routes, access from here
//syntax- router.use('/routerName', './routerFile')

router.use('/auth', authRoute);
router.use('/users', userRoute);

// testing the router 
console.log("hello from routes");

export default router;