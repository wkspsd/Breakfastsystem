const req = require('express/lib/request');
var mongoose=require('mongoose');
const usermodel=require('./model/user');
const session=require('express-session');
const bcrypt=require('bcrypt');
//註冊
exports.register=function(req,res){
    usermodel.findOne({account:{$eq:req.body.account}},function(err,result)
    {
        console.log("result is "+result);
        if(result)//帳號已存在
        {
            console.log("user_accout exist");
            //res.send({success:false});
            res.redirect('./reg.html');
        }
        else//帳號不存在
        {
            usermodel.create({
                user_name:req.body.username,
                age:req.body.age,
                gender:req.body.gender,
                account:req.body.account,
                password:bcrypt.hashSync(req.body.password,5)
            },function(err){
                console.log(err);
            })
            console.log("user: "+req.body.username+" create!");
            //res.send({success:true});
            res.redirect('index.html');
        }
    })
}

//登入檢查
exports.check_login=function(req,res){
    if(req.body.account=="shopkeeper"&& req.body.password=="shopkeeper")
    {
        req.session.user="shopkeeper";
        res.redirect('manage.html');
    }
    else
    {
        usermodel.findOne({account:{$eq:req.body.account}},function(err,result)
        {
            if(err) throw err;
            if(result && bcrypt.compareSync(req.body.password,result.password))//如果找得到符合比對的資料
            {
                console.log("login success");
                req.session.user=result._id;
                res.redirect('/menu.html');
            }
            else
            {
                console.log("login fail");
                res.redirect('/index.html');
            }
        });
    }
}

//登出
exports.logout=function(req,res){
    req.session.destroy();
    res.redirect('index.html');
}