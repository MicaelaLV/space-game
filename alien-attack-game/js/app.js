console.log("Aliens are ready to rock on! so are we!");
var game;
$(document).ready(function(){


  //start game on SPACE PRESS
  $(window).keypress(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault();
      console.log('Space pressed');
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
      $('#js-game-container').css('display', 'inherit');
}

//gun sound
    $('div#js-game-container').on('click', function(evt){
      var audio3 = new Audio('audio/gun.mp3');
        audio3.play();
    });

  });

//initializing Game
  game = new Game();
  game.catchBugs();
});
