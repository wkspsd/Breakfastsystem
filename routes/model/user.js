var mongoose=require('mongoose');

var userSchema=new mongoose.Schema({
    user_name:String,
    age:Number,
    gender:String,
    account:String,
    password:String
});

var usermodel=mongoose.model('user',userSchema);


module.exports=usermodel;