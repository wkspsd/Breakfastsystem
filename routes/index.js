var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const userfunction=require('./userfunction');
const menufunction=require('./menufunction');

//---------------------------userfunction----------------------------------------------------
router.post('/reg', userfunction.register);//註冊
router.post('/check_login',userfunction.check_login);//登入檢查
router.post('/logout',userfunction.logout);//登出

//---------------------------menufunction----------------------------------------------------
router.post('/editmenuplus.html',menufunction.editmenuplus);//店主增加菜色
router.get('/get_menu',menufunction.get_menu);//顧客登入時獲取所有菜色
router.post('/delete_single',menufunction.delete_single);//
module.exports = router;
