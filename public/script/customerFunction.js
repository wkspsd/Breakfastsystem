var request = new XMLHttpRequest();
var requestSet = new XMLHttpRequest();
var mainURL = "https://breakfastsystem.herokuapp.com";
//var mainURL = "http://localhost:3000";
var url = "http://localhost:3000/get_menu";
var cart_url = "";
var div = new Array(0);
var image = new Array(0);
var descri = new Array(0);
var price = 0;
var dishLong = 0;
function parseCookie() {
    var cookieObj = {};
    var cookieAry = document.cookie.split(';');
    var cookie;
    
    for (var i=0, l=cookieAry.length; i<l; ++i) {
        cookie = jQuery.trim(cookieAry[i]);
        cookie = cookie.split('=');
        cookieObj[cookie[0]] = cookie[1];
    }
    
    return cookieObj;
}
function getCookieByName(name) {
    var value = parseCookie()[name];
    if (value) {
        value = decodeURIComponent(value);
    }

    return value;
}
function init() {
  /*if (getCookieByName('connect.sid') == null)
		window.location='index.html';*/
  let d = document.getElementById("main");
  var menu = document.createElement("div");
  request.open("GET", mainURL + "/get_menu", true);
  request.onload = function () {
    var json = JSON.parse(request.response);
    dishLong = json.length;
    menu.id = "menu";
    if (localStorage.getItem("price") != null) {
      price = Number(localStorage.getItem("price"));
    }
   for (var i = 0; i < json.length; i++) {
      descri[i] = json[i].description;
      div[i] = document.createElement("div");
      image[i] = document.createElement("img");
      var foodName = document.createElement("div");
      image[i].src = `./image/plus.png`;
      image[i].style = "width: 184px";
      div[i].appendChild(image[i]);
      foodName.style = "width:100%; background-color:black; opacity:0.5; position:relative; word-wrap:break-word; color:white";
      foodName.innerHTML = "<center>" + json[i].food_name + "$" + json[i].price + "</center>";
      div[i].appendChild(foodName);
      div[i].setAttribute("food", json[i].food_name);
      div[i].setAttribute("price", json[i].price);
      if (i % 2 == 0) {
        div[i].style =
          "width: auto; border-width:3px;border-style:solid;border-color:black;padding:5px; float:left;margin-left: 10%; margin-top: 15%;white-space: nowrap; display: inline-block;";
      } else {
        div[i].style =
          "width: auto; border-width:3px;border-style:solid;border-color:black;padding:5px; float:left;margin-left: 10%; margin-top: 15%;white-space: nowrap; display: inline-block;";
      }
      div[i].id = json[i]._id;
      div[i].setAttribute("onclick", `showDes(${i})`);
      div[i].setAttribute("unclick", `recover(${i})`);
      menu.appendChild(div[i]);
      initNum(i);
    }
    d.appendChild(menu);
  };
  request.send(null);

  requestSet.open("GET", mainURL + '/get_set', true);
  requestSet.onload = function () {
    var set = JSON.parse(requestSet.response);
    for (var i = dishLong, j = 0; i < set.length + dishLong; i++, j++) {
      descri[i] = set[j].description;
      div[i] = document.createElement("div");
      image[i] = document.createElement("img");
      var foodName = document.createElement("div");
      image[i].src = `./image/plus.png`;
      image[i].style = "width: 184px";
      div[i].appendChild(image[i]);
      foodName.style =
        "width:100%; background-color:black; opacity:0.5; position:relative; word-wrap:break-word; color:white";
      foodName.innerHTML =
        "<center>" + set[i - dishLong].set_name + "$" + set[i - dishLong].price + "</center>";
      div[i].appendChild(foodName);
      div[i].setAttribute("food", set[i - dishLong].set_name);
      div[i].setAttribute("price", set[i - dishLong].price);
      if (i % 2 == 0) {
        div[i].style =
          "width: auto; border-width:3px;border-style:solid;border-color:black;padding:5px; float:left;margin-left: 10%; margin-top: 15%;white-space: nowrap; display: inline-block;" ;
      } else {
        div[i].style =
          "width: auto; border-width:3px;border-style:solid;border-color:black;padding:5px; float:left;margin-left: 10%; margin-top: 15%;white-space: nowrap; display: inline-block;";
      }
      div[i].id = set[i - dishLong]._id;
      div[i].setAttribute("onclick", `showDes(${i})`);
      div[i].setAttribute("unclick", `recover(${i})`);
      menu.appendChild(div[i]);
      initNum(i);
    }
  };
  requestSet.send(null);
}

function plusDish(i) {
  var temp = +localStorage.getItem(localStorage.key(i));
  temp++;
  localStorage.setItem(localStorage.key(i), temp);
  window.location.reload();
}

function minusDish(i) {
  var temp = +localStorage.getItem(localStorage.key(i));
  if (temp == 1) {
    temp = 1;
  } else {
    temp--;
  }
  localStorage.setItem(localStorage.key(i), temp);
  window.location.reload();
}

function initNum(i) {
  if (localStorage.getItem(div[i].getAttribute("food")) != null) {
    div[i].setAttribute(
      "num",
      localStorage.getItem(div[i].getAttribute("food"))
    );
  } else {
    div[i].setAttribute("num", 0);
  }
}

function initNum(i) {
  if (localStorage.getItem(div[i].getAttribute("food")) != null) {
    div[i].setAttribute("num", localStorage.getItem(div[i].getAttribute("food")));
  } else {
    div[i].setAttribute("num", 0);
  }
}

function addDish(i) {
  var cart = document.getElementById("cart");
  var putIn = document.createElement("input");
  var temp = +div[i].getAttribute("num");
  ++temp;
  price += Number(div[i].getAttribute("price"));
  localStorage.setItem("price", price);
  localStorage.setItem(div[i].getAttribute("food"), temp);
  localStorage.setItem(div[i].getAttribute("food") + " id", div[i].id);
  div[i].setAttribute("num", temp);
  putIn.type = "hidden";
  putIn.value = div[i].id;
  putIn.id = div[i].getAttribute("food");
  putIn.name = "Cart";
  cart.appendChild(putIn);
  document
    .getElementById(div[i].id)
    .setAttribute("onclick", `addAlreadyDish(${i})`);
}

function addAlreadyDish(i) {
  var cart = document.getElementById("cart");
  var alreadyDish = document.getElementById(`div[${i}].food_name`);
  var temp = +div[i].getAttribute("num");
  ++temp;
  localStorage.setItem(div[i].getAttribute("food"), temp);
  div[i].setAttribute("num", temp);
  if (alreadyDish != null) {
    var putIn = document.createElement("input");
    putIn.type = "hidden";
    putIn.value = div[i].id;
    putIn.id = div[i].getAttribute("food");
    putIn.name = "Cart";
    cart.appendChild(putIn);
  }
}

function showDes(i) {
  image[i].style = "opacity:0.2;background-color : black;width: 184px";
  var des = document.createElement("span");
  des.innerText = descri[i];
  des.style = "position: absolute;margin-bottom: 0;margin-top:-100px";
  des.id = div[i].id + "des";
  div[i].appendChild(des);
  document.getElementById(div[i].id).setAttribute("onclick", `addDish(${i})`);
  window.setTimeout(`recover(${i})`, 2000);
}

function recover(i) {
  image[i].style = "width: 184px";
  div[i].removeChild(document.getElementById(div[i].id + "des"));
  document.getElementById(div[i].id).setAttribute("onclick", `showDes(${i})`);
}

function clearAll() {
  localStorage.clear();
  var json = JSON.parse(request.response);
  for (var i = 0; i < json.length; i++) {
    div[i].num = 0;
  }
}
function clearAllincart() {
  localStorage.clear();
  window.location.replace("menu.html");
}
function cartInit() {
  
  var p = document.getElementById("price");
  if (localStorage.getItem("price") != null) {
    price = Number(localStorage.getItem("price"));
  }
  p.setAttribute("value", price);
  something =false;

  if (localStorage.length != 0) {
    something = true;
  }

  if (something) {
    ifSomething();
  } else {
    ifNothing();
  }

}


function ifSomething() {
  var d = document.getElementById("main");
  var form = document.createElement("form");
  form.id = "finalCart";
  form.action = "/accept_order";
  form.method = "POST"
  var table = document.createElement("table");
  table.className = "table table-striped";
  form.appendChild(table);
  d.appendChild(form);

  var thead = document.createElement("thead");
  table.appendChild(thead);

  var tr = document.createElement("tr");
  thead.appendChild(tr);

  var th_name = document.createElement("th");
  th_name.scope = "col";
  th_name.innerText = "餐點名稱";
  tr.appendChild(th_name);

  var th_number = document.createElement("th");
  th_number.scope = "col";
  th_number.innerText = "數量";
  tr.appendChild(th_number);

  var tbody = document.createElement("tbody");
  table.appendChild(tbody);

  var cartLength = 0;

  var j=1;

  for(var i = 0; i<localStorage.length;i++){
    if(localStorage.key(i).charAt(localStorage.key(i).length-1)!="d"){
      cartLength++;
    }
  }

  for (var i = 0; i < localStorage.length; i++) {

    if(localStorage.key(i).charAt(localStorage.key(i).length-1)=="d" || localStorage.key(i) == "price"){
      continue;
    }

    var tr_food = document.createElement("tr");
    var td_food_name = document.createElement("td");
    var input_food_name = document.createElement("input");
    var input_name = document.createElement("input");

    input_food_name.hidden = true;
    input_food_name.value = localStorage.getItem(localStorage.key(i) + " id");
    input_food_name.name = 'cartid';
    input_name.hidden = true;
    input_name.value = localStorage.key(i);
    input_name.name = 'cartname';
    td_food_name.innerText = localStorage.key(i);
    td_food_name.appendChild(input_food_name);
    td_food_name.appendChild(input_name);

    var td_food_number = document.createElement("td");
    var input_food_number = document.createElement("input");

    input_food_number.hidden = true;
    input_food_number.value = localStorage.getItem(localStorage.key(i));
    input_food_number.name = 'cartnum';
    td_food_number.innerText = localStorage.getItem(localStorage.key(i));
    td_food_number.appendChild(input_food_number);

    tr_food.appendChild(td_food_name);
    tr_food.appendChild(td_food_number);
    tbody.appendChild(tr_food);
    j++;
  }
}

function ifNothing() {
  var p = document.createElement("p");
  p.innerText="購物車裡沒有東西";
  document.getElementById("main").appendChild(p);
}

function sendingFinalCart() {
  var data={};
  $.ajax({
    method:"get",
    url:"/get_username"
  }).done(function(res){
    console.log(res);
      var fid=[],fname=[],fnum=[];
      document.getElementsByName("cartid").forEach(function(e){fid.push(e.value)})
      document.getElementsByName("cartname").forEach(function(e){fname.push(e.value)})
      document.getElementsByName("cartnum").forEach(function(e){fnum.push(e.value)})
      var food_array=[];
      for(var i=0;i<fid.length;i++)
      {
        food_array.push({
          food_id:fid[i],
          food_name:fname[i],
          food_num:fnum[i]
        })
      }
      data={
        type:3,
        user_id:res.username,
        food_array:food_array,
        price:document.getElementById("price").value,
        appt:document.getElementById("appt").value
      }
      socket.send(JSON.stringify(data));
  })
  localStorage.clear();
  window.location.replace("/menu.html");
  console.log("Order send");
}

function orderInit() {
  request.open("GET", mainURL + "/my_active_order", true);
  request.onload = function () {
    var json = JSON.parse(request.response);
    console.log(json);
    var d = document.getElementById("main");
    var table = document.createElement("table");
    table.style = "margin-top:1%";
    table.className = "table table-striped";
    d.appendChild(table);

    var thead = document.createElement("thead");
    table.appendChild(thead);

    var tr = document.createElement("tr");
    thead.appendChild(tr);

    var th_name = document.createElement("th");
    th_name.scope = "col";
    th_name.innerText = "餐點名稱";
    tr.appendChild(th_name);

    var th_number = document.createElement("th");
    th_number.scope = "col";
    th_number.innerText = "數量";
    tr.appendChild(th_number);

    var tbody = document.createElement("tbody");
    tbody.style = "center = true;";
    table.appendChild(tbody);

    for (var i = 0; i < json.food_array.length; i++) {
      var tr_food = document.createElement("tr");
      tr_food.id = `${i}`;
      var td_food_name = document.createElement("td");
      td_food_name.innerText = json.food_array[i].food_name;
      var td_food_number = document.createElement("td");
      td_food_number.innerText = json.food_array[i].food_num;
      tr_food.appendChild(td_food_name);
      tr_food.appendChild(td_food_number);
      tbody.appendChild(tr_food);
    }

    var hour = Number(json.arrive_time[11] + json.arrive_time[12]);
    var minute = json.arrive_time[14] + json.arrive_time[15];
    
    if (hour > 24) hour -= 24;
    var footer = document.getElementById("footer");
    footer.innerHTML = `總計: ${json.price}元 預計取餐時間: ${hour}:${minute}`
  }
  request.send(null);
}

function calCost(d, flag) {
  var lastCost = 0;
  parseInt(lastCost);
  var footer = document.createElement("footer");
  footer.style = "position: absolute;bottom: 0px; width: 100%;";
  var readyAt = document.createElement("p");
  readyAt.className = "h3";
  readyAt.innerText = "Ready at:";
  footer.appendChild(readyAt);
  var hr = document.createElement("hr");
  footer.appendChild(hr);
  var cost = document.createElement("p");
  cost.className = "h3";
  request.open("GET", urlDish, true);
  request.onload = function () {
    var json = JSON.parse(request.response);
    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).charAt(localStorage.key(i).length - 1) == "d") {
        continue;
      }
      for (var j = 0; j < json.length; j++) {
        if (localStorage.key(i) == json[j].food_name) {
          lastCost += parseInt(json[j].price * localStorage.getItem(localStorage.key(i)), 10);
        }
      }
    }
  };

  requestSet.open("GET", urlSettest, true);
  requestSet.onload = function () {
    var json = JSON.parse(requestSet.response);
    console.log(json);
    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).charAt(localStorage.key(i).length - 1) == "d") {
        continue;
      }
      for (var j = 0; j < json.length; j++) {
        if (localStorage.key(i) == json[j].set_name) {
          lastCost += parseInt(json[j].price * localStorage.getItem(localStorage.key(i)), 10);
        }
      }
    }
    cost.innerText = `Cost: ${lastCost}元`;
  };
  
  footer.appendChild(cost);
  if (flag) {
    var send = document.createElement("input");
    send.className = "btn btn-warning";
    send.value = "送出";
    send.type = "button";
    send.style = "position: absolute;bottom: 0px;right: 0px;";
    send.setAttribute("onclick", "sendingFinalCart()");
    footer.appendChild(send);
    var cancel = document.createElement("button");
    cancel.className = "btn btn-warning";
    cancel.innerText = "取消";
    cancel.type = "button";
    cancel.style = "position: absolute;bottom: 0px;right: 100px;";
    cancel.setAttribute("onclick", "window.location='menu.html'");
    footer.appendChild(cancel);
  } else {
    var cancel = document.createElement("button");
    cancel.className = "btn btn-warning";
    cancel.innerText = "返回";
    cancel.type = "button";
    cancel.style = "position: absolute;bottom: 0px;right: 0px;";
    cancel.setAttribute("onclick", "window.location='menu.html'");
    footer.appendChild(cancel);
  }

  d.appendChild(footer);
  request.send(null);
}
