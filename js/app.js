console.log("Aliens are ready to rock on! so are we!");
var game;

$(document).ready(function(){

var audio4 = new Audio('audio/Houston.mp3');
audio4.play();

var audio5 = new Audio('audio/starwars.mp3');
setTimeout(function(){ audio5.play(); }, 14000);


  //start game on SPACE PRESS
  $(window).keypress(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault();
      console.log('Space pressed');

  //pause Houston audio
  audio4.pause();
  audio5.pause();


  //start timer
  $('.js-timing').show();
  game.timer();

  //start killsScore
  $('.js-kills-score').show();
  game.bugsKilled();
  //hide message section
      $("#js-message-section").css('display', 'none');
  //hide starting game message
          $('#js-starting-command').hide();
  //show game container
      $('#js-game-container').show();

  //show message for stopping the music
      $('#stop-song').show();

}

});

//initializing Game
  game = new Game();
  game.catchBugs();
  game.gameOver();

});