//  Interval Exercise (follow the instructions below).

//  This code will run as soon as the page loads.
$(document).ready(function(){

  //  Click events are done for us:
  $(".container").hide();
  $("#stop").click(trivia.stop);
  $("#reset").click(trivia.reset);
  $("#display").click(trivia.start);
  $("#display").click(trivia.questions);

});
//  Variable that will hold our setInterval that runs the trivia

var colors = ["rgb(25, 187, 230)", "rgb(184, 34, 237)", "rgb(29, 235, 38)", "rgb(232, 162, 27)"];

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
    for(var i = 0; i < colors.length; i++) {
      $("#radio_"+[i+1]).text(colors[i]);
    }
    var guessValue = $('input[name=optradio]:checked', '#myForm').val();

    $('#myForm input').on('click', function() {
       alert($('input[name=optradio:checked', '#myForm').val());
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
