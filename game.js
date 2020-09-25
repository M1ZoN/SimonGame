const BUTTONCOLOURS = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

const playSound = (color) => {
  switch (color) {
    case "red":
      let redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "blue":
      let blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "green":
      let greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "yellow":
      let yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
  }
};

const makeFlash = (color) => {
  $("#" + color)
    .fadeOut(100)
    .fadeIn(100);
};

const soundAndAnimate = (color) => {
  playSound(color);
  makeFlash(color);
};

const nextSequence = () => {
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = BUTTONCOLOURS[randomNumber];
  soundAndAnimate(randomChosenColor);
  gamePattern.push(randomChosenColor);
};

const handleClick = (event) => {
  if (gamePattern.length > userClickedPattern.length) {
    let userChosenColor = event.target.id;
    playSound(userChosenColor);
    $("#" + userChosenColor).addClass("pressed");
    setTimeout(() => {
      $("#" + userChosenColor).removeClass("pressed");
    }, 100);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
};

$(".btn").on("click", handleClick);

const startGame = () => {
  if (start === false) {
    $("#start-button").addClass("hide-start");
    start = true;
    nextSequence();
  }
};

$(document).on("keydown", startGame);
$("#start-button").on("click", () => {
  $("#start-button").addClass("pressed");
  setTimeout(() => {
    $("#start-button").removeClass("pressed");
  }, 100);
  setTimeout(() => {
    $("#start-button").addClass("hide-start");
    startGame();
  }, 200);
});

const startOver = () => {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  start = false;
};

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (currentLevel + 1 === level) {
      setTimeout(() => {
        $("#level-title").text("Correct!");
        $("body").addClass("correct-answer");
        setTimeout(() => {
          $("body").removeClass("correct-answer");
        }, 200);
      }, 200);
      setTimeout(() => {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    let wrongAudio = new Audio("sounds/wrong.mp3");
    setTimeout(() => {
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("#start-button").removeClass("hide-start");
      startOver();
      wrongAudio.play();
      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);
    }, 120);
  }
};
