const { json } = require('express/lib/response');
const singlemodel=require('./model/single');


exports.get_menu=function(req,res){
    singlemodel.find({},function(err,result){
        console.log(result);
        console.log(json(result));
    });
    res.json(result);
}

exports.editmenuplus=function(req,res){
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

exports.delete_single=function(req,res){
    singlemodel.findByIdAndDelete(req.body.food_id,function(err){
        if(err){
            console.log(err);
        }
    })
    res.redirect('editmenu.html')
}
