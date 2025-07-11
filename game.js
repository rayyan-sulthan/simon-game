var buttonColors = ["red", "blue", "green", "yellow"];            // to store the colors of the buttons
var gamePattern = [];                                             // to store the game pattern
var userPattern = [];                                             // to store the user pattern

var started = false;                                              // to check if the game has started or not
var level = 0;                                                    // to store the level of the game

// to start the game when a is pressed
$(document).on("keypress", function(check){                      // to check if a key is pressed
    if (check.key === "a"){                                      // to check if the key pressed is a
        if (started === false) {                                 // to check if the game has not started yet
        gameSequence();                                          // to start the game sequence
        started = true;                                          // to set the started variable to true
    }
}    
});

// function to increase the game pattern for level increase
function gameSequence(){
    userPattern = [];                                              // to reset the user pattern for the new level
    level++;                                                       // to increase the level when the game pattern is increased
    $("#level-title").text("Level " + level);                      // to update the level title on the screen
    var randomNumber = Math.floor(Math.random()*4);                // to create a random number between 0 to 3 length = 4 for 4 box
    var randomChosenColor = buttonColors[randomNumber];            // to get the random color pattern to store in the game pattern
    gamePattern.push(randomChosenColor);                           // to increase the game pattern for increasing the level
    
    //for the flash animation for the chosen button for the game pattern 
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // to play sound when the button is chosen to increase the game pattern
    playSound(randomChosenColor);
}

// user click
$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");                       // to get the id of the button clicked by the user
    userPattern.push(userChosenColor);                              // to add the user chosen color to the user pattern
    animatePress(userChosenColor);                                  // to animate the button when clicked
    playSound(userChosenColor);                                     // to play sound when the button is clicked
    checkAnswer(userPattern.length - 1);                            // to check the user pattern with the game pattern
});

// to check the user pattern with the game pattern
function checkAnswer(value){
    if (userPattern[value] === gamePattern[value]) {                // to check if the user pattern is equal to the game pattern
        if( userPattern.length === gamePattern.length) {            // to check if the user pattern length is equal to the game pattern length
            setTimeout(function() {                                 // to creae time delay for the next level
                gameSequence();                                     // to increase the game pattern for the next level
            }, 1000);                                               // to delay the next level by 1 second
        }
    } else{
        playSound("wrong");
        $("body").addClass("game-over");                            // to add the game over class to the body for game over animation
        setTimeout(function(){
            $("body").removeClass("game-over");                     // to remove the game over class from the body after the animation
        },200)
        startOver();                                                // to start the game after gameover
    }
        
}
// function to start the game after game over
function startOver(){
    $("#level-title").text("Game Over, Press Any Key to Restart");  // to update the gameover and command to start game again
    level = 0;                                                      // to reset the level to 0
    gamePattern = [];                                               // to reset the game pattern to empty
    userPattern = [];                                               // to reset the user pattern to empty                         
    started = false;
}

//  funtion animation when the button is clicked
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");                     // to add the pressed class to the button when clicked
    setTimeout(function(){                                         // to create a time delay for the pressed class
        $("#" + currentColor).removeClass("pressed");              // to remove the pressed class from the button after the time delay
    },100)
}
// function to play sound
function playSound(sound){
    var audio = new Audio("sounds/" + sound + ".mp3");             // to create a new audio object with the sound file
    audio.play();                                                  // to play the sound
}