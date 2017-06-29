//____________________________________________________________ GAME CONSTRUCTOR
function Game() {

    //creating a collection of bugs
  this.bugsCollection = [];

    //functions to add bugs
  this.addBugs = function () {
    var bug = new Bug();
    this.bugsCollection.push(bug);

    //adding bugs dynamically within the game container
  $('#js-game-container').append($('<div>')
                         .addClass('js-bug')
                         .attr('id', this.bugsKilled));

    //adding one per each bug to the bug counter
  };

this.addBugs();
this.bugsCollection[0].animateBug($('.js-bug'));

  for(var i = 0; i < 60; i++){
    this.addBugs(i);
    this.bugsCollection[0].animateBug($('.js-bug'));
  }
}

//____________________________________________________________ GAME PROTOTYPES

//_______________________________________________________________________TIMER
Game.prototype.timer = function() {
    this.timer = 60;
    var intervalId = setInterval(function() {
      if (this.timer > 0) {
        $('.js-timing').show();
        $("#timer").text(this.timer);
        this.gameOver();
      } else {
        this.gameOver();

        $("#timer").text(this.timer);
        clearInterval(intervalId);
      }
      this.timer--;
    }.bind(this), 1000);
};

//_________________________________________________________________KILLS SCORE
Game.prototype.bugsKilled = function(){
  //$('.js-kills-score').show();
  this.bugsKilled = 0;
};

//______________________________________________________________BUG CONSTRUCTOR
function Bug() {
}

//animate the bug
Bug.prototype.animateBug = function($target) {
    var newq = this.makeNewPosition($target.parent());
    var oldq = $target.offset();
    var speed = this.calcSpeed([oldq.top, oldq.left], newq);
    $target.animate({
        top: newq[0],
        left: newq[1]
    }, speed, function() {
        this.animateBug($target);
    }.bind(this));
  };

  //calculate its speed
  Bug.prototype.calcSpeed = function(prev, next) {
        var x = Math.abs(prev[1] - next[1]);
        var y = Math.abs(prev[0] - next[0]);
        var greatest = x > y ? x : y;
        var speedModifier = 0.5;
        var speed = Math.ceil(greatest / speedModifier);
    return speed;
  };

  //create a new position
  Bug.prototype.makeNewPosition = function($container) {
      // Get viewport dimensions
      $container = $('#js-game-container');
      var h = $container.height()-150;
      var w = $container.width()-150;
      var nh = Math.floor(Math.random() * h);
      var nw = Math.floor(Math.random() * w);
    return [nh, nw];
  };


//click on instant death
Game.prototype.catchBugs = function(){
  var game = this;
  $(document).on('click','.js-bug', function(evt){

    //play scream
    var audio2 = new Audio('audio/pain.wav');
      audio2.play();
    //play splat
    var audio = new Audio('audio/splat.wav');
      audio.play();

    //remove bug & add blood spot
    $(this).removeClass("js-bug").addClass('js-killed');

    //wait 0.5 seconds & clean blood
    setTimeout(function(){
      $(this).remove();
      game.bugsCollection.pop();
      console.log(game.bugsCollection);
      game.bugsKilled+=100;
      $("#js-bugsKillScore").empty();
      var score = $('#js-bugsKillScore')[0];
      $(score).append(game.bugsKilled);
      console.log($('#js-bugsKillScore')[0]);
      console.log(game.bugsKilled);
    }.bind(this), 500);

  //add new bug
      game.bugsCollection[0].animateBug($('.js-bug'));
    });
};


Game.prototype.gameOver = function() {
  if (game.bugsKilled === 100000) {
    return console.log('YOU WON');
  } else if(game.timer === 0){
    return console.log('GAME OVER');
  }
};
