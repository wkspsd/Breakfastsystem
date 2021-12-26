const mongoose=require('mongoose');

var singleschema=new mongoose.Schema({
    food_name:String,
    price:Number,
    description:String,
});

var singlemodel=mongoose.model('single',singleschema);

module.exports=singlemodel;