
var j = 0;
var newbackground;
var winCount = 0;
var lossCount = 0;

$(document).ready(function(){


  $(".container").hide();
  $("#display").click(trivia.start);
  $("#display").click(trivia.questions);

  trivia.userGuess();
});


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


var trivia = {

  time: 60,
  remaining: 0,



  start: function() {
    j = 0;
    trivia.time = 60;
    winCount = 0;
    lossCount = 0;
    trivia.remaining = colors.length - winCount - lossCount
    counter = setInterval(trivia.count, 1000);
    $("#display").css("color", "rgb(219, 12, 235)");
    $(".container").show();
    $("#scoreboard").html(" ");
  },

  questions: function() {

      if(trivia.remaining===0){
        trivia.reset();
      } else {
        for(var i = 0; i < colors[j].length; i++) {
          $("#radio_"+[i+1]).text(colors[j][i]);
          $("#radio"+[i+1]).attr("value", colors[j][i]);
        }
        newbackground = colors[j][Math.floor((Math.random() * 4))];
        $("#one").css("background", newbackground);
        $("#scoreboard").html(" ");
        $('#myForm input').prop('checked', false);
        console.log(newbackground);
        j++
      }


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
        setTimeout(trivia.questions, 2000);
      }
    });
  },

  scoreWin: function() {
    $("#scoreboard").html("<p>You got it!</p>");
    winCount++;
    trivia.remaining = colors.length - winCount - lossCount,
    console.log("Wins: " + winCount + " || Losses: " + lossCount + "|| Remaining: " + trivia.remaining);
  },
  scoreLoss: function() {
    $("#scoreboard").html("<p>Nope, it was: " + newbackground + "</p>");
    lossCount++;
    trivia.remaining = colors.length - winCount - lossCount,
    console.log("Wins: " + winCount + " || Losses: " + lossCount + "|| Remaining: " + trivia.remaining);
  },

  count: function() {


    trivia.time--;

    if(trivia.time < 1) {
      trivia.reset();
      $('#display').html("Click here to restart");
    } else {
      var converted = trivia.timeConverter(trivia.time);
      $('#display').html("Time remaining: " + converted);
    }
  },

  reset: function() {
    clearInterval(counter);
    $("#scoreboard").html("<p>Correct Answers: " + winCount + "</p>" + "<p>Incorrect Answers: " + lossCount + "</p>" + "<p>Unanswered: " + trivia.remaining + "</p>")
    $(".container").hide();
    $("#display").html("Click here to restart");

  },


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
