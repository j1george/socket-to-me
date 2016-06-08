<<<<<<< HEAD
// var socket = new WebSocket("ws://10.143.254.4:8080/", "echo-protocol")
// var socket = new WebSocket("ws://10.143.183.69:8080/", "echo-protocol")
// var socket = new WebSocket("ws://192.168.0.15:8080/", "echo-protocol")
var socket = new WebSocket("ws://localhost:8080/", "echo-protocol")

var buffer = '';
var scrolled = false;
=======
var socket = new WebSocket("ws://10.143.35.126:8080/", "direction-protocol")
>>>>>>> 43f875cb2a4043928c33847641e5e6cd81cb41bf
socket.onopen = function (event) {
  // console.log(document.getElementById('msg').innerHTML);
  socket.send('<br>Connected!');


  var objDiv = document.getElementById('log');
  objDiv.scrollTop = objDiv.scrollHeight;
  setInterval('updateScroll',1000);
}

socket.onmessage = function (message) {
  // console.log(message.data);
  document.getElementById('log').innerHTML = message.data;
  buffer = message.data;

  updateScroll();
}

socket.onmessage = function (event) {
  $('#move').text(event.data);
    moveNewPosition(event.data);
    
}

// get values to animate

function moveNewPosition(key){
    
    switch (key){
        case "left":
            $("#move").animate({left: '-=50px'}, "slow");
            break;
        case "right":
            $("#move").animate({left: '+=50px'}, "slow");
            break;
        case "up":
            $("#move").animate({top: '-=50px'}, "slow");
            break;
        case "down":
            $("#move").animate({top: '+=50px'}, "slow");
            break; 
    }
}


window.onkeydown = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    switch(key){
      case 37:
        console.log("left was pressed");
        socket.send("left");
        break;
      case 38:
        console.log("up was pressed");
        socket.send("up");
        break;
      case 39:
        console.log("right was pressed");
        socket.send("right");
        break;
      case 40:
        console.log("down was pressed");
        socket.send("down");
        break;
    }

    // focus on chat box on 'enter' keypress
    if (key == 13) {
      document.getElementById("msg").focus();
    }

}

window.myFunction = function(){
  if(document.getElementById('msg').value != ''){
    socket.send('<br>'+document.getElementById('msg').value+'');

    document.getElementById('msg').value= '';

    document.getElementById("msg").focus();
  }

  return false; // to prevent page from refreshing after submitting form
}

// focus on chat box when window loads
window.onload = function() {
  document.getElementById("msg").focus();
}

// scrolls to the bottom of the chat log
function updateScroll() {
  if(!scrolled) {
    var element = document.getElementById('log');
    element.scrollTop = element.scrollHeight;
  }
}

//animateDiv();
//
//
//function makeNewPosition(){
//    
//    // Get viewport dimensions (remove the dimension of the div)
//    var h = $(window).height() - 50;
//    var w = $(window).width() - 50;
//    
//    var nh = Math.floor(Math.random() * h);
//    var nw = Math.floor(Math.random() * w);
//    
//    return [nh,nw];    
//    
//}
//
//function animateDiv(){
//    var newq = makeNewPosition();
//    $('#move').animate({ top: newq[0], left: newq[1] }, function(){
//      animateDiv();        
//    });  
//};
//
