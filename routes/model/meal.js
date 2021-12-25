const mongoose=require('mongoose');

var mealschema=new mongoose.Schema({
    food_name:String,
    price:Number,
    description:String
});

var mealmodel=mongoose.model('meal',mealschema);

module.exports=mealmodel;