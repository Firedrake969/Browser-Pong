/***********************************************************************

BROWSER PONG
===========================
Most JavaScript by Firedrake969.  Some by turkey3.  Most CSS by turkey3, and some by Firedrake969.  Originally part of -FlamingGobble-, but now the code is turning into my own game.  Turkey3 made the AI motion.
***********************************************************************/

$(document).keydown(function (e) {
    if (e.keyCode === 68) {
        key = 1;
    } else if (e.keyCode === 65) {
        key = 2;
    }
});

$(document).keyup(function() {
    key = 0;
});

$(document).mouseenter(function () {
    $("#ball").click(function () {
        if (starting) {
            setInterval(function () {
                ballMove();
                //Check for walls
                ballBounce($('#ball').position().left < 0 || $('#ball').position().left > 500);
                //Bounce off paddles
                paddleBounce();
                //AI MOTION
                aiMove();
                detectGoal();
                //Player smooth movement
                if (key == 1 && $('#player').position().left < 430) {
                    $('#player').css("left", $('#player').position().left + playerSpeed + 'px');
                } else if (key == 2 && $('#player').position().left > 10) {
                    $('#player').css("left", $('#player').position().left - playerSpeed + 'px');
                }
            }, 5);
        }
        starting = false;
    });
}); 
