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

      var speedModifier = 0.2;

      var speed = Math.ceil(greatest / speedModifier);

      return speed;
};

//create a new position
Game.prototype.makeNewPosition = function($container) {
    // Get viewport dimensions (remove the dimension of the div)
    $container = $('#container');
    var h = $container.height() - 150;
    var w = $container.width() - 150;
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];
};

//click on death
Game.prototype.catchBugs =
    $(".a").on('click', function(evt){
      console.log("you've clicked the bug");
    });
