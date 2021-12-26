const { json } = require('express/lib/response');
const singlemodel=require('./model/single');

//獲取全部餐點資料
exports.get_menu=function(req,res){
    singlemodel.find({},function(err,result){
        console.log(result);
        res.send(result);
    });
}
//新增餐點
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
//店家刪除餐點
exports.delete_single=function(req,res){
    singlemodel.findByIdAndDelete(req.body.deleteid,function(err){
        if(err){
            console.log(err);
        }
    })
    res.redirect('editmenu.html')
}
