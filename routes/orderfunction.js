const ordermodel=require("./model/order").ordermodel;
const historyordermodel=require("./model/order").historyordermodel
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
    res.send("end");
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
        res.send(JSON.stringify(result));
    })
}


exports.markdone=function(req,res){//更新訂單某項菜色至完成
    console.log("mark single")
    console.log(req.body)
    ordermodel.updateOne({order_no:req.body.order_no,"food_array.food_id":req.body.item},{$set:{"food_array.$.finished":true}},function(err){
        if(err) throw err;
    });
    res.redirect("/makingorder.html");
}

exports.state_update=function(req,res){//更新訂單狀態
    ordermodel.updateOne({order_no:req.body.order_no},{$inc:{state:1}},function(err,result){
        ordermodel.findOne({order_no:{$eq:req.body.order_no}},function(err,result){
            if(result.state==3){//如果state=3說明已經交出去 成為歷史訂單
                historyordermodel.create({
                    order_no:result.order_no,
                    user_id:result.user_id,
                    date:result.date,
                    food_array:result.food_array,
                    price:result.price,
                    arrive_time:result.arrive_time
                },function(err){
                    if(err) throw err;
                })
                ordermodel.findOneAndDelete({order_no:req.body.order_no},function(err){
                    if(err) throw err;
                })
            }
        })
       
    });
}

exports.get_histroy=function(req,res){
    historyordermodel.find({},function(err,result){
        res.send(JSON.stringify(result));
    })
}

exports.order_complete=function(req,res){
    console.log("接下來是訂單data")
    ordermodel.findOne({order_no:req.body.order_no},function(err,result){
        console.log(result)
        historyordermodel.create({
            order_no:result.order_no,
            user_id:result.user_id,
            date:result.date,
            food_array:result.food_array,
            price:result.price,
            arrive_time:result.arrive_time
        },function(err){
            if(err) throw err;
        })
        })
        res.send("end")
}