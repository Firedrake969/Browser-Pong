/***********************************************************************

BROWSER PONG
===========================
Most JavaScript by Firedrake969.  Some by turkey3.  Most CSS by turkey3, and some by Firedrake969.  Originally part of -FlamingGobble-, but now the code is turning into my own game.  Turkey3 made the AI motion.
***********************************************************************/
var ballDir = (Math.floor(Math.random() * (360) + 1)) * (Math.PI / 180);
var player = $('#player');
var cpu = $("#cpu");
var ball = $("#ball");
var starting = true;
var dist = 2;
var playerSpeed = 3;
var scorePlayer = 0;
var scoreOpponent = 0;
var cpuSpeed = 0;
var randOffset = 15;
var key = 0;

function ballBounce(condition) {
    if (condition) {
        ball.css("left", Math.round(ball.position().left + Math.sin(ballDir) * (0 - dist)) + "px");

        if (condition) {
            ballDir = ((Math.floor(Math.random() * ((2 * randOffset) + 1)) - randOffset) + (180 - ((180 / Math.PI) * ballDir))) * (Math.PI / 180);
        } else {
            ballDir = ((Math.floor(Math.random() * ((2 * randOffset) + 1)) - randOffset) + (0 - ((180 / Math.PI) * ballDir))) * (Math.PI / 180);
        }
        ball.css("left", Math.round(ball.position().left + Math.sin(ballDir) * dist) + "px");
    }
}

function aiMove() {
    if (ball.position().left > cpu.position().left + 30) {
        if (ball.position().left - cpu.position().left + 30 < 120) {
            if (ball.position().top - cpu.position().top < 120) {
                cpuSpeed = 2;
            } else {
                cpuSpeed = 2 - (Math.random() / 2); //from 1.5-2
            }
        } else {
            if (ball.position().top - cpu.position().top > 250) {
                cpuSpeed = 1;
            } else if (ball.position().top - cpu.position().top > 160) {
                cpuSpeed = 1.5;
            } else {
                cpuSpeed = 2;
            }
        }
    } else {
        if (cpu.position().left - ball.position().left + 30 < 120) {
            if (ball.position().top - cpu.position().top < 120) {
                cpuSpeed = -2;
            } else {
                cpuSpeed = -2 + (Math.random() / 2);
            }
        } else {
            if (ball.position().top - cpu.position().top > 250) {
                cpuSpeed = -1;
            } else if (ball.position().top - cpu.position().top > 160) {
                cpuSpeed = -1.5;
            } else {
                cpuSpeed = -2;
            }
        }
    }
    cpu.css("left", (cpu.position().left + cpuSpeed) + "px");
    if (cpu.position().left < 5) {
        cpu.css("left", "5px");
    }
    if (cpu.position().left > 440) {
        cpu.css("left", "435px");
    }
}

function reset() {
    ball.css('top', 190 + 'px');
    ball.css('left', 250 + 'px');
    ballDir = (Math.floor(Math.random() * (360) + 1)) * (Math.PI / 180);
    dist = 2;
}

function detectGoal() {
    if (ball.position().top < 15) {
        scorePlayer += 1;
        $("#playerScore").text(scorePlayer);
        reset();
    }
    if (ball.position().top > 380) {
        scoreOpponent += 1;
        $("#cpuScore").text(scoreOpponent);
        reset();
    }
}

function ballMove() {
    ball.css("top", Math.round(ball.position().top - (dist * Math.sin(ballDir))) + 'px');
    ball.css("left", Math.round(ball.position().left + (dist * Math.cos(ballDir))) + 'px');
}

function paddleBounce() {
    if (ball.position().left < player.position().left + 70 && ball.position().left + 10 > player.position().left && ball.position().top > 350) {
        ballDir = (Math.abs(180 - (ballDir * (180 / Math.PI)))) * (Math.PI / 180);
    }
    if (ball.position().left < cpu.position().left + 70 && ball.position().left + 10 > cpu.position().left && ball.position().top < 30) {
        ballDir = ((180 + (ballDir * (180 / Math.PI)))) * (Math.PI/180);
    }
}

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
                ballBounce(ball.position().left < 0 || ball.position().left > 500);
                //Bounce off paddles
                paddleBounce();
                //AI MOTION
                aiMove();
                detectGoal();
                //Player smooth movement
                if (key == 1 && player.position().left < 430) {
                    player.css("left", player.position().left + playerSpeed + 'px');
                } else if (key == 2 && player.position().left > 10) {
                    player.css("left", player.position().left - playerSpeed + 'px');
                }
            }, 5);
        }
        starting = false;
    });
});
