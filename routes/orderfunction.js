const ordermodel=require("./model/order").ordermodel;
var order_no=1;
exports.accept_order=function(req,res){
    console.log("accept order call");
    console.log(JSON.parse(req.body.order));
    var foods=[];
    var postdata=JSON.parse(req.body.order);
    var str = postdata.appt;
    var time = str.match( /(\d+)\:(\d+)/ );
    var date = new Date();
    date.setHours(parseInt(time[1]))
    date.setMinutes(parseInt(time[2]))
    console.log(postdata.food_array);
    for(var i=0;i<postdata.food_array.length;i++)
    {
        foods.push(postdata.food_array[i]);
        foods[i].finished=false
    }
    ordermodel.create({
        order_no:order_no,
        user_id:postdata.user_id,
        date:new Date(),
        state:1,
        price:Number(postdata.price),
        food_array:foods,
        arrive_time:date
    },function(err){
        if(err) throw err;
    })
    order_no++;
    res.send("WER");
}

exports.get_order=function(req,res){//正式成為訂單
    var user=req.session.user;
    ordermodel.findOne({user_id:{$eq:user}},function(err,result){
        console.log(result);
        res.send(JSON.stringify(result));
    })
}


exports.get_current_order=function(req,res){//查看製作清單 回傳所有當前訂單
    ordermodel.find({},function(err,result){
        console.log(result);
        res.send(JSON.stringify(result));
    })
}


exports.markdone=function(req,res){
    ordermodel.updateOne({order_no:req.body.order_no,"food_array.food_id":req.body.item},{$set:{"food_array.$.finished":true}},function(err){
        if(err) throw err;
    });
    res.redirect("/makingorder.html");
}