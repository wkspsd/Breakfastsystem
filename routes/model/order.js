const mongoose=require('mongoose');

var orderschema=new mongoose.Schema({
    order_no:Number,
    user_id:String,
    date:Date,
    state:Number,//1.製作中->2.完成->3.已領取
    food_array:{type:Array,default:[]},
    price:Number,
    arrive_time:Date
})

var ordermodel=mongoose.model('order',orderschema);

var historyordermodel=mongoose.model('historyorder',orderschema);

module.exports={ordermodel,historyordermodel};