console.log("Aliens are ready to rock on! so are we!");

$(document).ready(function(){


  //start game on SPACE PRESS
  $(window).keypress(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault();
      console.log('Space pressed');
  //hide message section
      $("#js-message-section").css('display', 'none');
  //hide starting game message
          $('#js-starting-command').hide();
  //show game container
      $('#js-game-container').css('display', 'inherit');
  //show timer
      $('#timer').css('display', 'inherit');
 //show bug
      $('.js-bug').css('display', 'inherit');
    }

  });

//initializing Game
  var game = new Game();
  //game.timer($('#timer'));
  //game.animateBug($('.js-bug'));

});
