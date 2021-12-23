var mongoose=require('mongoose');

var userSchema=new mongoose.Schema({
    user_id:String,
    user_name:String,
    age:Number,
    gender:String,
    account:String,
    password:String
});

new usermodel=mongoose.model("user",userSchema);


module.exports=usermodel;