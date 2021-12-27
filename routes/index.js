var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const userfunction=require('./userfunction');
const menufunction=require('./menufunction');
const orderfunction=require('./orderfunction');
//---------------------------userfunction----------------------------------------------------
router.post('/reg', userfunction.register);//註冊
router.post('/check_login',userfunction.check_login);//登入檢查
router.post('/logout',userfunction.logout);//登出

//---------------------------menufunction----------------------------------------------------
router.post('/editmenuplus.html',menufunction.editmenuplus);
router.get('/get_menu',menufunction.get_menu);
router.post('/delete_single',menufunction.delete_single);
router.post('/modify_single',menufunction.modify_single);
router.post('/new_set',menufunction.new_set);
//---------------------------carfunction-----------------------------------------------------
router.post('/send_cart',orderfunction.send_cart);
module.exports = router;
