var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
var userfunction=require('./userfunction');
//---------------------------userfunction----------------------------------------------------
router.post('/reg', userfunction.register);
router.post('/check_login',userfunction.check_login);
router.post('/logout',userfunction.logout);
//
module.exports = router;
