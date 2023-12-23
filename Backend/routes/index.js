const express = require('express');

const router = express.Router();

//for any further routes, access from here
//syntax- router.use('/routerName', './routerFile')
router.use('/users', require('./users'));

console.log("hello from routes");

module.exports = router;