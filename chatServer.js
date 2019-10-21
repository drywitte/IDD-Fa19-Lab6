/*
chatServer.js
Author: David Goedicke (da.goedicke@gmail.com)
Closley based on work from Nikolas Martelaro (nmartelaro@gmail.com) as well as Captain Anonymous (https://codepen.io/anon/pen/PEVYXz) who forked of an original work by Ian Tairea (https://codepen.io/mrtairea/pen/yJapwv)
*/

var express = require('express'); // web server application
var app = express(); // webapp
var http = require('http').Server(app); // connects http library to server
var io = require('socket.io')(http); // connect websocket library to server
var serverPort = 8000;
var wolfram = require('wolfram-alpha').createClient("3HKL6R-RPP632GWE4");


//---------------------- WEBAPP SERVER SETUP ---------------------------------//
// use express to create the simple webapp
app.use(express.static('public')); // find pages in public directory

// start the server and say what port it is on
http.listen(serverPort, function() {
  console.log('listening on *:%s', serverPort);
});
//----------------------------------------------------------------------------//


//---------------------- WEBSOCKET COMMUNICATION -----------------------------//
// this is the websocket event handler and say if someone connects
// as long as someone is connected, listen for messages
io.on('connect', function(socket) {
  console.log('a new user connected');
  var questionNum = 0; // keep count of question, used for IF condition.
  socket.on('loaded', function() { // we wait until the client has loaded and contacted us that it is ready to go.

    socket.emit('answer', "Hey, hello I am \"MathBot\" a simple chat bot example."); //We start with the introduction;
    setTimeout(timedQuestion, 1000, socket, "What is your name?"); // Wait a moment and respond with a question.

  });
  socket.on('message', (data) => { // If we get a new message from the client we process it;
    console.log(data);
    questionNum = bot(data, socket, questionNum).then(questionNum); // run the bot function with the new message
  });
  socket.on('disconnect', function() { // This function  gets called when the browser window gets closed
    console.log('user disconnected');
  });
});
//--------------------------CHAT BOT FUNCTION-------------------------------//
async function bot(data, socket, questionNum) {
  console.log("called function with qnum " + await questionNum);
  var input = data; // This is generally really terrible from a security point of view ToDo avoid code injection
  var answer;
  var question;
  var waitTime;
  questionNum = await questionNum;
  /// These are the main statments that make up the conversation.
  
  if (questionNum == 0) {
    console.log("Quesiton 0");
    answer = await wquery(input, questionNum);
    console.log("updating question num is" + questionNum);
    // 'Hello ' + input + ' :-)'; // output response
    waitTime = 5000;
    question = 'Tell me your age as a math question'; // load next question
  }
  else if (questionNum == 1) {
    console.log("Quesiton 1");
    answer = "That means you're " + await wquery(input) + " years old";
    waitTime = 3000;
    question = "Give me a math question";
  }
  else if (questionNum == 2) {
    console.log("Quesiton 2");
    answer = await wquery(input);
    waitTime = 3000;
    question = "Ok give me a harder math question";
  }
  else if (questionNum == 3) {
    answer = await wquery(input) + ". Ok I'm done with math now.";
    waitTime = 3000;
    question = '';
  }
  else {
    answer = 'Ok I"m done with math';
    waitTime = 0;
    question = '';
  }
 

  /// We take the changed data and distribute it across the required objects.
  questionNum += 1;
  socket.emit('answer', answer);
  setTimeout(timedQuestion, waitTime, socket, question);
  return questionNum;
}

async function wquery(input, qNum) {
  console.log("querying wolfram alpha");
  let response = await wolfram.query(input);
  console.log("response is ", response);
  try {
    if (qNum == 0) {
      answers = response[3].subpods[0].text.split("\n");
      answers = answers[1];
      answers = answers.replace("|", "=");
      answer = 'Here is a fun fact about your name:\n' + answers;
      console.log(response[3].subpods[0].text);
    }
    else{
    answer = response[1].subpods[0].text;
    }
  }
  catch (e) {
    answer = "Does not compute!";
  }
  if (answer == undefined) {
    answer = "Does not compute!";
  }
  return await answer;
}


function timedQuestion(socket, question) {
  if (question != '') {
    socket.emit('question', question);
  } else {
    console.log('No Question send!');
  }

}
//----------------------------------------------------------------------------//
