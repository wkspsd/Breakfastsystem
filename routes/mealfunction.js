const mealmodel=require('./model/meal');


exports.showAllmeals=function(req,res){
    mealmodel.find({},function(err,result){
        console.log(result);
    })
}

exports.addmeal=function(req,res){
    mealmodel.create({
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
}