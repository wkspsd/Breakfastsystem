const req = require('express/lib/request');
var mongoose=require('mongoose');
const usermodel=require('./model/user');
exports.resgiser=function(req,res){
    usermodel.findOne({account:{$eq:req.account}},function(err,result)
    {
        if(result.length!=0)//帳號已存在
        {
            console.log("user_accout exist");
        }
        else//帳號不存在
        {
            var new_user=new usermodel({
                user_id:"123",
                user_name:req.user_name,
                age:req.age,
                gender:req.gender,
                account:req.account,
                password:req.password
            });
            new_user.insert(function(err){
                if(err)
                    console.log("register add user fail");
            });
        }
    })
};