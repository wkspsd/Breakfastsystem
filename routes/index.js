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
router.get('/get_username',userfunction.get_username);
//---------------------------menufunction----------------------------------------------------
router.post('/editmenuplus.html',menufunction.editmenuplus);
router.get('/get_menu',menufunction.get_menu);
router.post('/delete_single',menufunction.delete_single);
router.post('/modify_single',menufunction.modify_single);
router.post('/new_set',menufunction.new_set);
router.get('/get_Set',menufunction.get_set);
router.post('/delete_set',menufunction.delete_set);
router.post('/modify_set',menufunction.modify_set);
//---------------------------carfunction-----------------------------------------------------
router.post('/accept_order',orderfunction.accept_order);
router.get('/my_active_order',orderfunction.get_order);
router.get('/show_all_active_order',orderfunction.get_current_order);
router.post('/mark_as_done',orderfunction.markdone);
router.post('/state_update',orderfunction.state_update);
router.post('/order_complete',orderfunction.order_complete)
router.get('/show_all_order',orderfunction.get_histroy);
module.exports = router;
