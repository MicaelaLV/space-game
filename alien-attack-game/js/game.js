// GAME CONSTRUCTOR
function Game() {

  //this.levelsList = [new Level(1), new Level(3)]

    //creating empty array of bugs
  this.bugsCollection = [];
    //console.log(this.bugsCollection);

    //setting a counter on the bugs number
  this.bugNumber = 0;

    //functions to add bugs in the array with their methods
  this.addBugs = function () {
      console.log('Adding new bug to the collection');
  var bug = new Bug();
  this.bugsCollection.push(bug);

    //adding bugs dynamically within the game container
  $('#js-game-container').append($('<div>')
                         .addClass('js-bug')
                         .attr('id', this.bugNumber));

    //adding one per each bug to the bug counter
  this.bugNumber++;
  };


  this.addBugs();

    console.log(this.bugsCollection);

  this.bugsCollection[0].animateBug($('.js-bug'));

}



//timer
Game.prototype.timer = function() {
    this.timer = 10;
    var intervalId = setInterval(function() {
      if (this.timer > 0) {

        $('.js-countdown').show();
        console.log('in timer', this.timer);
        $("#timer").text("00:" + this.timer);
      } else {
        $("#timer").text("00:" + this.timer);
        clearInterval(intervalId);

      }
      this.timer--;
    }.bind(this), 1000);
};


function Bug() {

  console.log('Bug Constructor called');
}



//animate the bug
Bug.prototype.animateBug = function($target) {
    console.log('Animating BUG');
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

      console.log('you clicked on the bug');
  //remove bug image & add splat

    game.timer += 10
    console.log(game.timer)

    $(this).removeClass("js-bug").addClass('js-killed');

  //wait 3 seconds & clean blood
    setTimeout(function(){
      $(this).remove();
      game.bugsCollection = [];
    }.bind(this), 500);


  //add new bug
      game.addBugs();

    console.log(game.bugsCollection);

    game.bugsCollection[0].animateBug($('.js-bug'));

    });
}


  //Game over

  Game.prototype.gameOver = function () {
    $('.main').css('display', 'none');
  };
