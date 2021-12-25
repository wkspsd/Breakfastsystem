var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const userfunction=require('./userfunction');
const menufunction=require('./menufunction');
//---------------------------userfunction----------------------------------------------------
router.post('/reg', userfunction.register);
router.post('/check_login',userfunction.check_login);
router.post('/logout',userfunction.logout);
//---------------------------menufunction----------------------------------------------------
router.post('/editmenuplus.html',menufunction.editmenuplus);
router.get('/get_menu',menufunction.get_menu);
router.post('/delete_single',menufunction.delete_single);
module.exports = router;
