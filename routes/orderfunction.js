const ordermodel=require("./model/order");
var order_no=1;
exports.send_cart=function(req,res){
    var foodarray=new Array();
    var food
    console.log(req.body);
    for(var i=0;i<req.body.cartid.length;i++)
    {
        food={
            id: req.body.cartid[i],
            name: req.body.cartname[i], 
            amount: req.body.cartnum[i],
            finished:false 
        }
        foodarray.push(food);
    }
    var str = req.body.appt;
    var time = str.match( /(\d+)\:(\d+)/ );
    var date = new Date();
    date.setHours(parseInt(time[1]))
    date.setMinutes(parseInt(time[2]))
    ordermodel.create({
        order_id:date.toString()+"-"+String(order_no),
        user_id:req.session.user,
        date:new Date(),
        state:Number(req.body.price),
        food_array:foodarray,
        arrive_time:date
    },function(err){
        if(err) throw err;
        else{
            
        }
    })
    order_no++;
    res.redirect('/menu.html');
}