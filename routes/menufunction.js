const { ObjectID } = require('bson');
const { json, redirect } = require('express/lib/response');
const singlemodel=require('./model/single');
const setmodel=require('./model/set');
const { set } = require('mongoose');

//新增餐點
exports.editmenuplus=function(req,res){
    console.log(req.body.foodname);
    singlemodel.create({
        food_name:req.body.foodname,
        price:req.body.price,
        description:req.body.description
    },function(err){
        if(err)
        {
            console.log("add fail");
        }
        else
        {
            console.log("add success");
        }
    });
    res.redirect('editmenu.html')
}

//店家刪除餐點
exports.delete_single=function(req,res){

    singlemodel.findByIdAndDelete(req.body.deleteid,function(err){
        if(err)
        {
            console.log("delete fail");
        }
        else
        {
            console.log("delete success");
        }
    })
    res.redirect('editmenu.html');
}

//獲取全部餐點資料
exports.get_menu=function(req,res){
    singlemodel.find({},function(err,result){
        //console.log(result);
        console.log(req.session.user);
        res.send(result);
    });
}

//店家修改餐點
exports.modify_single=function(req,res){
    singlemodel.findByIdAndUpdate(req.body.foodid,{
        food_name:req.body.foodname,
        price:req.body.price,
        description:req.body.description
    },function(err){
        if(err){
            console.log("modify fail");
        }
        else{
            console.log("modify success");
        }
    });
    res.redirect('editmenu.html');
}
//店家新增套餐
exports.new_set=function(req,res){
    console.log(req.body);
    if(Array.isArray(req.body.foodarray))
    {
        setmodel.create({
            set_name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            food_id:req.body.foodarray
        },function(err){
            if(err)throw err;
    })
}
    res.redirect('/manage.html');
}

//刪除套餐
exports.delete_set=function(req,res){
    set.findByIdAndDelete(req.body.deleteid,function(err){
        if(err) throw err;
    })
    res.redirect('./manage.html')
}

//獲取所有套餐資訊
exports.get_set=function(req,res){
    setmodel.find({},function(err,result){
        if(err) throw err;
        res.send(result);
    })
}

//修改套餐資訊
exports.modify_set=function(req,res){
    setmodel.findByIdAndUpdate(req.body.setid,{
        set_name:req.body.setname,
        price:req.body.price,
        description:req.body.description,
        food_id:req.body.foodarray
    });
    res.redirect('./manage.html');
}