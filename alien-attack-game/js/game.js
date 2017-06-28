function Game() {

}

//animate the bug
Game.prototype.animateBug = function($target) {
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
Game.prototype.calcSpeed = function(prev, next) {
      var x = Math.abs(prev[1] - next[1]);
      var y = Math.abs(prev[0] - next[0]);

      var greatest = x > y ? x : y;

      var speedModifier = 0.5;

      var speed = Math.ceil(greatest / speedModifier);

      return speed;
};

//create a new position
Game.prototype.makeNewPosition = function($container) {
    // Get viewport dimensions
    $container = $('#js-game-container');
    var h = $container.height()-250;
    var w = $container.width()-250;
    //console.log("the height is " + h, "The width is " + w);
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];
};


//timer
Game.prototype.timer = function() {

    var i = 10;
    var intervalId = setInterval(function() {
      if (i > 0) {
        document.getElementById("timer").innerHtml = "00:" + i;
      } else {
        document.getElementById("timer").innerHtml = "00:" + (0);
        clearInterval(intervalId);
      }
      i--;
    }, 1000);
};


//stop the spot
//use the calcSpeed and modify the speedModifier to 0 so the bug will stop there.

//click on instant death
Game.prototype.catchBugs =
    $("#bug").on('click', function(evt){
      $('#bug').removeClass("js-bug").addClass('js-killed');

      console.log('you clicked on the bug');

    });
