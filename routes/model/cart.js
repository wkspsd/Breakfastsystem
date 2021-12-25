const mongoose=require('mongoose');

var cartschema=new mongoose.Schema({
    user_id:String,
    food_id:Object,
    set_id:Object
});

var cartmodel=mongoose.model('cart',cartschema);

module.exports=cartmodel;