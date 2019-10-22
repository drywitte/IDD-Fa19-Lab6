// WebSocket connection setup
var socket = io();
var questionRecieved = false;
// keep count of question, used for IF condition.
var output = document.getElementById('output'); // store id="output" in output variable
output.innerHTML = "<h1 id=response> </h1>"; // ouput first question
var timer;


function loading() {
  console.log("should be loading");
  let loaderHTML = document.getElementById('loader');
  loaderHTML = document.getElementById('loader');
  let loader = loaderHTML.innerText + ".";
  loaderHTML.innerText = loader;
}

function sendMessage() {
  var input = document.getElementById("input").value;
  socket.emit('message', input);
  document.getElementById("input").value = "";
  document.getElementById("input").style.display = "none";
  timer = window.setInterval(loading, 400);
  document.getElementById('loader').style.display = "block";
}

//push enter key (using jquery), to run bot function.
$(document).keypress(function(e) {
  if (e.which == 13 && questionRecieved === true) {
    questionRecieved = false;
    sendMessage(); // run bot function when enter key pressed
  }
});

function changeText(input) {
  document.getElementById('response').textContent = input;
}

socket.on('answer', function(msg) {
  console.log('Incomming answer:', msg);
  clearInterval(timer);
  document.getElementById('loader').style.display = "none";
  document.getElementById('loader').innerText = "Loading..";
  changeText(msg);
  document.getElementById('loader').innerText = "";
});
socket.on('question', function(msg) {
  console.log('Incomming Question:', msg);
  questionRecieved = true;
  document.getElementById("input").style.display = "block";
  changeText(msg);
});

socket.on('changeBG', function(msg) {
  console.log('Changeing backgroundColor to:', msg);
  document.body.style.backgroundColor = msg;
});

socket.on('changeFont', function(msg) {
  console.log('Changeing Font to:', msg);
  var h1 = document.getElementById('response');
  h1.style.color = 'white';


  //document.body.style.backgroundColor = msg;
});
socket.on('connect', function() { // We let the server know that we are up and running also from the client side;
  socket.emit('loaded');
  document.getElementById("input").style.display = "none"; // Here we wait for the first question to appear
});
