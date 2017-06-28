// GAME CONSTRUCTOR
function Game() {
  this.bugsCollection = [];
    //console.log(this.bugsCollection);
  this.bugNumber = 0;

  this.addBugs = function () {
    console.log('Adding new bug to the collection');
    var bug = new Bug(1);
    this.bugsCollection.push(bug);
    $('#js-game-container').append($('<div>')
                           .addClass('js-bug')
                           .attr('id', this.bugNumber));
    this.bugNumber++;
  };

  this.addBugs();
  console.log(this.bugsCollection);
  this.bugsCollection[0].animateBug($('.js-bug'));



}



// //timer
// Game.prototype.timer = function() {
//
//     var i = 10;
//     var intervalId = setInterval(function() {
//       if (i > 0) {
//         document.getElementById("timer").innerHtml = "00:" + i;
//       } else {
//         document.getElementById("t««imer").innerHtml = "00:" + (0);
//         clearInterval(intervalId);
//       }
//       i--;
//     }, 1000);
// };
//

function Bug(life) {
  //creating bug dynamically
  console.log('Bug Constructor called');

  //implement life & damage functions
  this.life = life;

  this.receiveDamage = function(damage) {
    this.life = this.life - damage;
      if(this.life > 0) {
        //return life - damage
      } else {
        //game over
      }
    };
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

        var speedModifier = 0.2;

        var speed = Math.ceil(greatest / speedModifier);

        return speed;
  };

  //create a new position
  Bug.prototype.makeNewPosition = function($container) {
      // Get viewport dimensions
      $container = $('#js-game-container');
      var h = $container.height()-250;
      var w = $container.width()-250;
      //console.log("the height is " + h, "The width is " + w);
      var nh = Math.floor(Math.random() * h);
      var nw = Math.floor(Math.random() * w);

      return [nh, nw];
  };



//stop the spot
//use the calcSpeed and modify the speedModifier to 0 so the bug will stop there.
//stop every element with this class js-killed

//click on instant death
Game.prototype.catchBugs =
  $(document).on('click','.js-bug', function(evt){
    console.log('you clicked on the bug');
    $(this).removeClass("js-bug").addClass('js-killed');
    game.addBugs();
    console.log(game.bugsCollection);
    game.bugsCollection[0].animateBug($('.js-bug'));

  });
