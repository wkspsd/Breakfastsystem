var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const userfunction=require('./userfunction');
const mealfunction=require('./mealfunction');
//---------------------------userfunction----------------------------------------------------
router.post('/reg', userfunction.register);
router.post('/check_login',userfunction.check_login);
router.post('/logout',userfunction.logout);
//---------------------------mealfunction----------------------------------------------------
router.post('/addmeal',mealfunction.addmeal);
router.get('/showAllmeals',mealfunction.showAllmeals);
module.exports = router;
