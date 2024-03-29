var request = new XMLHttpRequest();
var mainURL = "https://breakfastsystem.herokuapp.com"
//var mainURL = "http://localhost:3000"

var div = new Array(0);
var image = new Array(0);
var td_item_state_value = new Array(0);
var button = new Array(0);
var button1 = new Array(0);
var button2 = new Array(0);
var set_name = new Array(0);

function init() {
    request.open("GET", mainURL + "/get_menu", true);
    request.onload = function () {
        var json = JSON.parse(request.response);
        let d = document.getElementById("main");
        var menu = document.createElement("div");
        menu.id = "menu";
        for (var i = 0; i < json.length; i++) {
            var font = document.createElement("div");
            div[i] = document.createElement("div");
            image[i] = document.createElement("img");
            image[i].src = "./image/plus.png";
            image[i].style = "width: 184px";
            div[i].appendChild(image[i]);
            if (i % 2 == 0) {
                div[i].style =
                    "width: auto;  border-width:3px;border-style:solid;border-color:black;padding:5px; float:left;margin-left: 10%; margin-top: 15%; white-space: nowrap; display: inline-block;";
            } else {
                div[i].style =
                    "width: auto;  border-width:3px;border-style:solid;border-color:black;padding:5px; float:left;margin-left: 10%; margin-top: 15%; white-space: nowrap; display: inline-block;";
            }

            font.style = "width:100%;background-color:black;opacity:0.5;position:relative; word-wrap:break-word;color:white";
            font.innerHTML = "<center>" + json[i].food_name + "$" + json[i].price;
            div[i].appendChild(font);

            div[i].id = json[i]._id;
            menu.appendChild(div[i]);
            div[i].setAttribute("onclick", `edit(${i})`);
            menu.appendChild(div[i]);
        }
        var plusMenu = document.createElement("div");
        var plusImg = document.createElement("img");
        var plusfont = document.createElement("div");
        plusfont.style = "width:100%;background-color:black;opacity:0.5;position:relative; word-wrap:break-word;color:white";
        plusfont.innerHTML = "<center>新增餐點";
        plusImg.src = "./image/plus.png";
        plusImg.style = "width: 184px";
        plusMenu.appendChild(plusImg);
        plusMenu.appendChild(plusfont);
        if (json.length % 2 == 1) {
            plusMenu.style =
                "width: auto; border-width:3px;border-style:solid;border-color:black;padding:5px; float:left;margin-left: 10%; margin-top: 15%;";
        } else {
            plusMenu.style =
                "width: auto; border-width:3px;border-style:solid;border-color:black;padding:5px; float:left;margin-left: 10%; margin-top: 15%;";
        }
        plusMenu.onclick = function () {
            window.location.replace("editmenuplus.html", "新增餐點");
        };
        plusMenu.id = "regis";
        menu.appendChild(plusMenu);
        d.appendChild(menu);
    };
    request.send(null);
}

function check() {
    var message = confirm("確定要新增嗎");
    newDish = document.getElementById("newDish");
    if (message == true) {
        newDish.submit();
        window.location.replace('editmenu.html', '編輯菜單');
    }
    else {
    }
}

function edit(i) {
    var json = JSON.parse(request.response);
    localStorage.setItem("id", json[i]._id);
    localStorage.setItem("name", json[i].food_name);
    localStorage.setItem("description", json[i].description);
    localStorage.setItem("price", json[i].price);
    window.location.replace("editmenumiddle.html", "編輯餐點");
}

function editInit() {
    request.open("GET", url, true);
    request.onload = function () {
        var json = JSON.parse(request.response);
        document.getElementById("foodid").value = localStorage.getItem("id");
        document.getElementById("foodname").value = localStorage.getItem("name");
        document.getElementById("description").value = localStorage.getItem("description");
        document.getElementById("price").value = localStorage.getItem("price");
        document.getElementById("deleteid").value = localStorage.getItem("id");
        console.log(json);
    };
    request.send(null);
}

function GetoutEdit() {
    localStorage.clear();
    window.location.replace("editmenu.html", "餐點");
}

function btnOperate(op) {
    var value = Number(document.getElementById("num").value);
    if (op == '+') {
        value += 1;
    } else if (op == '-') {
        if (value <= 1) {
            value = 1;
        } else {
            value -= 1;
        }
    }
    var json = JSON.parse(request.response);
    document.getElementById("num").value = value;
    var price = document.getElementById("price").value;
    document.getElementById("price").value = json[0].price * document.getElementById("num").value;
}

function MakingorderInit() {
    request.open("GET", mainURL + "/show_all_active_order", true);
    request.onload = function () {
        var json = JSON.parse(request.response);
        console.log(json);
        var table = document.getElementById("table");
        var tbody = document.createElement("tbody");

        for (var i = 0; i < json.length; i++) {

            var tr_item = document.createElement("tr");             //中文標示 訂單編號 欲取餐時間 訂單狀態
            var td_item_order = document.createElement("td");
            td_item_order.innerHTML = "<center>訂單編號";
            var td_item_arrive_time = document.createElement("td");
            td_item_arrive_time.innerHTML = "<center>欲取餐時間";
            var td_item_state = document.createElement("td");
            td_item_state.innerHTML = "<center>訂單狀態";
            tr_item.appendChild(td_item_order);
            tr_item.appendChild(td_item_arrive_time);
            tr_item.appendChild(td_item_state);

            var tr_item_food = document.createElement("tr");        //中文標示 食物名稱 數量 餐點狀態
            var td_item_food_name = document.createElement("td");
            td_item_food_name.innerHTML = "<center>食物名稱";
            var td_item_food_amount = document.createElement("td");
            td_item_food_amount.innerHTML = "<center>數量"
            var td_item_food_state = document.createElement("td");
            td_item_food_state.innerHTML = "<center>餐點狀態";
            tr_item_food.appendChild(td_item_food_name);
            tr_item_food.appendChild(td_item_food_amount);
            tr_item_food.appendChild(td_item_food_state);


            var tr_item_value = document.createElement("tr");           //訂單編號 欲取餐時間 訂單狀態 的值
            var td_item_order_value = document.createElement("td");
            tr_item_value.style = "background:white;"
            td_item_order_value.innerHTML = "<center>" + json[i].order_no;
            var td_item_arrive_time_value = document.createElement("td");
            var hour = Number(json[i].arrive_time[11] + json[i].arrive_time[12]);
            var minute = json[i].arrive_time[14] + json[i].arrive_time[15];
            console.log(hour);
            console.log(minute);
            
            if (hour > 24) hour -= 24;
            td_item_arrive_time_value.innerHTML = `<center>${hour}:${minute}`;
            // "<center>" + json[i].pickupTime;
            td_item_state_value[i] = document.createElement("td");
            td_item_state_value[i].setAttribute("align", "center");


            button[i] = document.createElement("button");
            button[i].setAttribute("class", "btn btn-warning");

            if (json[i].state == 1)
                button[i].innerHTML = "<center>" + "未完成";
            else
                button[i].innerHTML = "<center>" + "未取單";

            button[i].setAttribute("onclick", `state(${i})`);
            td_item_state_value[i].appendChild(button[i]);
            tr_item_value.appendChild(td_item_order_value);
            tr_item_value.appendChild(td_item_arrive_time_value);
            tr_item_value.appendChild(td_item_state_value[i]);

            tbody.appendChild(tr_item);
            tbody.appendChild(tr_item_value);
            tbody.appendChild(tr_item_food);

            for (var j = 0; j < json[i].food_array.length; j++) {           //訂單內餐點的資訊
                var tr_food = document.createElement("tr");
                tr_food.style = "background:white;"
                var td_food_name = document.createElement("td");
                td_food_name.innerHTML = "<center>" + json[i].food_array[j].food_name;
                var td_food_amount = document.createElement("td");
                td_food_amount.innerHTML = "<center>" + json[i].food_array[j].food_num;
                var food_button = document.createElement("button");
                var td_food_state = document.createElement("td");
                td_food_state.setAttribute("align", "center");
                if (json[i].food_array[j].finished == false) {
                    food_button.innerHTML = "<center>未完成"
                    food_button.setAttribute("class", "btn btn-warning");
                    food_button.setAttribute("onclick", `singleState(${i}, ${j})`)
                    td_food_state.appendChild(food_button);
                }
                else {
                    td_food_state.innerHTML = "<center>已完成";
                }
                tr_food.appendChild(td_food_name);
                tr_food.appendChild(td_food_amount);
                tr_food.appendChild(td_food_state);
                tbody.appendChild(tr_food);
            }

            var tr_price = document.createElement("tr");
            var td_price = document.createElement("td");
            td_price.colSpan = "3";
            td_price.innerHTML = `<center>價錢: ${json[i].price}`;
            tr_price.appendChild(td_price);
            tbody.append(tr_price);

            var tr_divide = document.createElement("tr");               //分隔訂單
            var td1_divide = document.createElement("td");
            td1_divide.colSpan = "3";
            td1_divide.innerHTML = "<center>------------";
            tr_divide.appendChild(td1_divide);


            tbody.appendChild(tr_divide);
        }
        table.appendChild(tbody);
    }
    request.send(null);
}

function state(i) {
    var json = JSON.parse(request.response);
    $.post('/state_update',{
        order_no:json[i].order_no,
        user_id:json[i].user_id
    })
    socket.send(JSON.stringify({
        type:5,
        user_id:json[i].user_id
    }))
}

function singleState(i, j) {
    var json = JSON.parse(request.response);
    console.log(json);
    $.post('/mark_as_done',{
        order_no:json[i].order_no,
        item:json[i].food_array[j].food_id
    })
	window.location.reload();
}

function AllorderInit() {
    request.open("GET", mainURL + '/show_all_order', true);
    request.onload = function () {
        var json = JSON.parse(request.response);
        console.log(json);
        var All_order = document.getElementById("All_order");
        for (var i = 0; i < json.length; i++) {
            var order = document.createElement("p");
            order.innerHTML = `${json[i].date}-${json[i].order_no}`;
            order.setAttribute("class", "flip");
            order.setAttribute("onclick",`AllorderExtend(${i})`)


            var ext = document.createElement("div");
            ext.setAttribute("class", "panel" + i);
            ext.style=`margin:0px;padding:15px;text-align:center; background:#e5eecc;border:solid 1px #c3c3c3;width: 100%;height:${40*(json[i].food_array.length + 1)}px; display:none;`

            for (var j = 0; j < json[i].food_array.length; j++) {
                var text = document.createElement("p");
                text.innerHTML = json[i].food_array[j].food_name + "x" + json[i].food_array[j].food_num;
                ext.appendChild(text);
            }
            var total = document.createElement("p");
            total.innerHTML = `總共:${json[i].price}元`;
            ext.appendChild(total);
            All_order.appendChild(order);
            All_order.appendChild(ext);
        }

    }
    request.send(null);
}

function AllorderExtend(i) {
    $(".panel"+i).slideToggle("slow");
 ;
}

function NewsetInit() {
    request.open("GET", mainURL + '/get_menu', true);
    request.onload = function () {
        var json = JSON.parse(request.response);
        console.log(json);
        var usefood = document.getElementById("Usefood");
        var table = document.createElement("table");
        table.style = "width:100%";
        var tbody = document.createElement("tbody");
        for (var i = 0; i < json.length; i++) {

            var count = document.createElement("tr");
            var td0 = document.createElement("td");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            td0.innerHTML = json[i].food_name;
            td1.innerHTML = json[i].price + "元";
            button1[i] = document.createElement("button");
            button1[i].setAttribute("class", "btn btn-warning");
            button1[i].innerHTML = "<center>加入";
            button1[i].setAttribute("onclick", `AdddishtoSet(${i})`);
            td2.appendChild(button1[i]);
            count.appendChild(td0);
            count.appendChild(td1);
            count.appendChild(td2);
            tbody.appendChild(count);
        }
        table.appendChild(tbody);
        usefood.appendChild(table);
    }
    request.send(null);
}


var tr_set = new Array(0);
function AdddishtoSet(i) {
    button1[i].disabled = true;
    var json = JSON.parse(request.response);
    var Set = document.getElementById("Set");
    var table = document.getElementById("Newset_table");
    var tbody = document.getElementById("Newset_tbody");
    var PutIn = document.createElement("input");
    button2[i] = document.createElement("div");
    button2[i].innerHTML = "移除";
    button2[i].setAttribute("class", "btn btn-warning");
    button2[i].setAttribute("onclick", `del(${i})`);
    PutIn.type = "hidden";
    PutIn.value = json[i]._id;
    PutIn.name = `set[id]`;
    tr_set[i] = document.createElement("tr");
    var td0 = document.createElement("td");
    td0.innerHTML = json[i].food_name;
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    td2.appendChild(button2[i]);
    td1.innerHTML = json[i].price+"元";
    tr_set[i].appendChild(PutIn);
    tr_set[i].appendChild(td0);
    tr_set[i].appendChild(td1);
    tr_set[i].appendChild(td2);
    tbody.appendChild(tr_set[i]);
    table.appendChild(tbody);
    Set.appendChild(table);

}
function del(i) {
    button1[i].disabled = false;
    var tbody = document.getElementById("Newset_tbody");
    tbody.removeChild(tr_set[i]);
}