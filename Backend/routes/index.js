import express from 'express';
const router = express.Router();
import authRoute from './auth.route.js';

//for any further routes, access from here
//syntax- router.use('/routerName', './routerFile')
//router.use('/users', require('./users.route.js'));
router.use('/auth', authRoute);

console.log("hello from routes");

export default router;