//  Interval Exercise (follow the instructions below).
var j = 0;
var newbackground;
var winCount = 0;
var lossCount = 0;
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

var colors = [
  ["rgb(180, 150, 8)", "rgb(133, 223, 255)", "rgb(29, 235, 38)", "rgb(193, 227, 148)"],
  ["rgb(182, 91, 230)", "rgb(210, 166, 147)", "rgb(154, 136, 115)", "rgb(131, 200, 52)"],
  ["rgb(80, 66, 171)", "rgb(227, 47, 124)", "rgb(79, 226, 240)", "rgb(249, 193, 70)"],
  ["rgb(176, 67, 18)", "rgb(187, 155, 45)", "rgb(187, 204, 71)", "rgb(25, 82, 176)"],
  ["rgb(142, 27, 156)", "rgb(221, 237, 34)", "rgb(215, 144, 88)", "rgb(191, 244, 203)"],
  ["rgb(110, 112, 135)", "rgb(209, 188, 249)", "rgb(199, 19, 19)", "rgb(99, 33, 46)"],
  ["rgb(245, 7, 215)", "rgb(184, 34, 237)", "rgb(230, 91, 28)", "rgb(207, 151, 78)"],
  ["rgb(37, 201, 7)", "rgb(87, 119, 235)", "rgb(157, 10, 98)", "rgb(11, 63, 124)"]
];

//  Our trivia object.
var trivia = {

  time: 60,
  remaining: 0,

  reset: function() {
    clearInterval(counter);
    $("#scoreboard").html("<p>Wins: " + winCount + "</p>" + "<p>Losses: " + lossCount + "</p>" + "<p>Remaining: " + trivia.remaining + "</p>")
    $(".container").hide();
  },

  start: function() {
    trivia.time = 60;
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
    newbackground = colors[j][Math.floor((Math.random() * 4))];
    $("#one").css("background", newbackground);
    $("#scoreboard").html(" ");
    $('#myForm input').prop('checked', false);
    console.log(newbackground);
    j++
  },

  userGuess: function() {
    $('#myForm input').on('click', function() {
      var guessValue = $('input[name=radioName]:checked', '#myForm').val();
      console.log(guessValue);

      if(guessValue == newbackground) {
        trivia.scoreWin();
        setTimeout(trivia.questions, 2000);

      } else {
        trivia.scoreLoss();
        setTimeout(trivia.questions, 1000);
        // $(this).prop('checked', false);
      }
    });
  },

  stop: function() {

    //  TODO: Use clearInterval to stop the count here.


  },

  scoreWin: function() {
    $("#scoreboard").html("<p>Great job!</p>");
    winCount++;
    trivia.remaining = colors.length - winCount - lossCount,
    console.log("Wins: " + winCount + " || Losses: " + lossCount + "|| Remaining: " + trivia.remaining);
  },
  scoreLoss: function() {
    $("#scoreboard").html("<p>Incorrect</p>");
    lossCount++;
    trivia.remaining = colors.length - winCount - lossCount,
    console.log("Wins: " + winCount + " || Losses: " + lossCount + "|| Remaining: " + trivia.remaining);
  },


  count: function() {

    //  TODO: increment time by 1, remember we cant use "this" here.
    trivia.time--;

    if(trivia.time < 55) {
      trivia.reset();
      console.log("finish");
    }

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
