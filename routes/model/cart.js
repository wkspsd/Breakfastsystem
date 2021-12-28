const mongoose=require('mongoose');

var cartschema=new mongoose.Schema({
    user_id:String,
    single_id:{type:Array,"default":[]},
    set_id:{type:Array,"default":[]}
});

var cartmodel=mongoose.model('cart',cartschema);

module.exports=cartmodel;