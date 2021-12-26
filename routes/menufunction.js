const { json } = require('express/lib/response');
const singlemodel=require('./model/single');

//獲取全部餐點資料
exports.get_menu=function(req,res){
    singlemodel.find({},function(err,result){
        //console.log(result);
        res.send(result);
    });
}
//新增餐點
exports.editmenuplus=function(req,res){
    singlemodel.create({
        food_name:req.body.food_name,
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
    singlemodel.findOneAndDelete({_id:{$eq:req.body.food_id}},function(err){
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
//店家修改餐點
exports.modify_single=function(req,res){
    console.log("food_name:"+req.body.foodname);
    singlemodel.findOneAndUpdate({food_name:{$eq:req.body.foodname}},{$set:{
        food_name:req.body.foodname,
        price:req.body.price,
        description:req.body.description
    }},function(err){
        if(err){
            console.log("modify fail");
        }
        else{
            console.log("modify success");
        }
    });
    res.redirect('editmenu.html');
}