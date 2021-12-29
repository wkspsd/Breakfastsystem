const mongoose=require('mongoose');

var orderschema=new mongoose.Schema({
    order_id:String,
    user_id:String,
    date:Date,
    state:Number,//送出->製作中->完成->已領取
    food_array:[{
        "id": String,
        "name": String, 
        "amount": Number,
        "finished": Boolean
    }],
    price:Number,
    arrive_time:Date
})

var ordermodel=mongoose.model('order',orderschema);

module.exports=ordermodel;