var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
var userfunction=require('./userfunction');

router.POST('/user_register', userfunction.register);

module.exports = router;
