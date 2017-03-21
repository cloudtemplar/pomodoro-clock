// Globals
// I need this variable set as global to clearInterval().
var timeinterval = 0;


function changeTime(operation) {
  var minutesField = $('.min');
  var minutesValue = minutesField.text();

  if (+minutesValue - 1 > 0 && +minutesValue + 1 <= 60) {
    if (operation == 'sub') {
      minutesField.text(('0' + (+minutesValue - 1)).slice(-2));
    } else if (operation == 'add') {
      minutesField.text(('0' + (+minutesValue + 1)).slice(-2));
    }
  }
}


function readTimeEndpoint() {
  var minutesField = $('.min');
  var minutesValue = minutesField.text();
  var secondsField = $('.sec');
  var secondsValue = secondsField.text();
  
  // Get current time in miliseconds.
  var timeNow = new Date().getTime();
  // Read time set on the clock and convert it to miliseconds.
  var minutes = +minutesValue * 60 * 1000;
  var seconds = +secondsValue * 1000;
  // Add set endpoint to the current time and convert it to the time string.
  var time = timeNow + minutes + seconds;
  var date = new Date(time);
  return date;
}

function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(endtime){
  var messageBox = $('#message-box');
  messageBox.slideUp();
  timeinterval = setInterval(function(){
    var t = getTimeRemaining(endtime);
    var minutes = $('.min');
    var seconds = $('.sec');
    minutes.text(('0' + t.minutes).slice(-2));
    seconds.text(('0' + t.seconds).slice(-2));
    if(t.total<=1){
      clearInterval(timeinterval);
      messageBox.text("Time's up!")
      messageBox.slideDown();
      setTime('05', '00');
    }
  },1000);
}

function setTime(min, sec) {
  $('.min').text(min);
  $('.sec').text(sec);
}

// Globals
// I need this variable set as global to clearInterval().
var timeinterval = 0;


function changeTime(operation) {
  var minutesField = $('.min');
  var minutesValue = minutesField.text();

  if (+minutesValue - 1 > 0 && +minutesValue + 1 <= 60) {
    if (operation == 'sub') {
      minutesField.text(('0' + (+minutesValue - 1)).slice(-2));
    } else if (operation == 'add') {
      minutesField.text(('0' + (+minutesValue + 1)).slice(-2));
    }
  }
}


function readTimeEndpoint() {
  var minutesField = $('.min');
  var minutesValue = minutesField.text();
  var secondsField = $('.sec');
  var secondsValue = secondsField.text();
  
  // Get current time in miliseconds.
  var timeNow = new Date().getTime();
  // Read time set on the clock and convert it to miliseconds.
  var minutes = +minutesValue * 60 * 1000;
  var seconds = +secondsValue * 1000;
  // Add set endpoint to the current time and convert it to the time string.
  var time = timeNow + minutes + seconds;
  var date = new Date(time);
  return date;
}

function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(endtime){
  var messageBox = $('#message-box');
  messageBox.slideUp();
  timeinterval = setInterval(function(){
    var t = getTimeRemaining(endtime);
    var minutes = $('.min');
    var seconds = $('.sec');
    minutes.text(('0' + t.minutes).slice(-2));
    seconds.text(('0' + t.seconds).slice(-2));
    if(t.total<=1){
      clearInterval(timeinterval);
      messageBox.text("Time's up!")
      messageBox.slideDown();
      notifyMe();
      setTime('05', '00');
    }
  },1000);
}

function setTime(min, sec) {
  $('.min').text(min);
  $('.sec').text(sec);
}

function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Time's up!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Time's up!");
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}Notification.requestPermission().then(function(result) {
  console.log(result);
});function spawnNotification(theBody,theIcon,theTitle) {
  var options = {
      body: theBody,
      icon: 'img/clock.png'
  }
  var n = new Notification(theTitle,options);
}

$(document).ready(function() {

  $('#message-box').hide();
  setTime('25', '00');
  $('#decrement-time').click(function() {
    changeTime('sub');
  });
  $('#increment-time').click(function() {
    changeTime('add');
  });
  $('#reset').click(function() {
    clearInterval(timeinterval);
    setTime('25', '00');
  });
  $('#go').click(function() {
    var endtime = readTimeEndpoint();
    initializeClock(endtime);
  });
});

$(document).ready(function() {

  if(window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission().then(function(permission) {
      notifyMe();
    });
  }

  $('#message-box').hide();
  setTime('25', '00');
  $('#decrement-time').click(function() {
    changeTime('sub');
  });
  $('#increment-time').click(function() {
    changeTime('add');
  });
  $('#reset').click(function() {
    clearInterval(timeinterval);
    setTime('25', '00');
  });
  $('#go').click(function() {
    var endtime = readTimeEndpoint();
    initializeClock(endtime);
  });
});