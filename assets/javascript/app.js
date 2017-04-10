//  Interval Exercise (follow the instructions below).
var j = 0;
var newbackground;
//  This code will run as soon as the page loads.
$(document).ready(function(){

  //  Click events are done for us:
  $(".container").hide();
  $("#stop").click(trivia.stop);
  $("#reset").click(trivia.reset);
  $("#display").click(trivia.start);
  $("#display").click(trivia.questions);
  trivia.userGuess();
});
//  Variable that will hold our setInterval that runs the trivia

var colors = [["rgb(25, 187, 230)", "rgb(184, 34, 237)", "rgb(29, 235, 38)", "rgb(232, 162, 27)"],
["rgb(78, 32, 193)", "rgb(184, 34, 237)", "rgb(199, 19, 19)", "rgb(131, 200, 52)"],
["rgb(25, 187, 230)", "rgb(184, 34, 237)", "rgb(29, 235, 38)", "rgb(232, 162, 27)"]];

//  Our trivia object.
var trivia = {

  time: 180,

  reset: function() {

    trivia.time = 180;
    trivia.lap = 1;

    //  TODO: Change the "display" div to "00:00."
    $('#display').html('03:00');
    $('#laps').html(' ');

  },

  start: function() {

    //  TODO: Use setInterval to start the count here.
    counter = setInterval(trivia.count, 1000);
    $("#display").css("background", "rgb(90, 224, 247)");
    $(".container").show();
  },

  questions: function() {
    for(var i = 0; i < colors[j].length; i++) {
      $("#radio_"+[i+1]).text(colors[j][i]);
      $("#radio"+[i+1]).attr("value", colors[j][i]);
    };
    newbackground = colors[j][Math.floor((Math.random() * 4) + 1)];
    $("#one").css("background", newbackground);
    j++
  },

  userGuess: function() {
    $('#myForm input').on('click', function() {
      var guessValue = $('input[name=radioName]:checked', '#myForm').val();
      console.log(guessValue);

      if(guessValue == newbackground) {
        alert("We're getting there!");
        trivia.questions();
      }
    });
  },

  stop: function() {

    //  TODO: Use clearInterval to stop the count here.
    clearInterval(counter);
  },

  count: function() {

    //  TODO: increment time by 1, remember we cant use "this" here.
    trivia.time--;

    //  TODO: Get the current time, pass that into the trivia.timeConverter function,
    //        and save the result in a variable.

    var converted = trivia.timeConverter(trivia.time);

    //  TODO: Use the variable you just created to show the converted time in the "display" div.
    $('#display').html(converted);
  },

  //  THIS FUNCTION IS DONE FOR US!
  //  We do not need to touch it.

  timeConverter: function(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};
