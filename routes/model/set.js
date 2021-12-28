const mongoose=require('mongoose');

var setschema=new mongoose.Schema({
    set_name:String,
    price:Number,
    description:String,
    food_id:{type:Array,"default":[]}
});

var setmodel= mongoose.model('set',setschema);
module.exports=setmodel;