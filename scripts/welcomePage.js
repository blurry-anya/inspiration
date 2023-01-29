$(window).on('load', function () {
    "use strict";


    let initialBalls = [];

    for (let index = 0; index < 10; index++) {
        let ball = document.createElement("div");
        ball.className = "ball";
        ball.style.backgroundColor = getColor();
        initialBalls.push(ball);
    }

    console.log(initialBalls);



    // welcomeCanvas.addEventListener("click", function(event){
    //     let ball = document.createElement("div");
    //     ball.className = "ball";
    //     ball.style.backgroundColor = getColor();
    //     welcomeWindow.appendChild(ball)
    // })

    const FPS = 200;
    let sizeBall = 6;
    let ballX, ballY;
    let xVel, yVel;
    let color = getColor();

    let welcomeCanvas = document.getElementById("welcome-page");
    let context = welcomeCanvas.getContext("2d");

    setInterval(update, 50 / FPS);

    ballX = welcomeCanvas.width / 2;
    ballY = welcomeCanvas.height / 2;

    //ball starting speed - between 25 and 100 pps (pixels per second)
    xVel = Math.floor(Math.random() * 76 + 25) / FPS;
    yVel = Math.floor(Math.random() * 76 + 25) / FPS;

    if (Math.floor(Math.random * 2) == 0) {
        xVel = -xVel;
    }

    if (Math.floor(Math.random * 2) == 0) {
        yVel = -yVel;
    }

    function update() {
        // move the ball
        ballX += xVel;
        ballY += yVel;

        if (ballX - sizeBall / 2 < 0 && xVel < 0) {
            xVel = -xVel;
        }
        if (ballX + sizeBall / 2 > welcomeCanvas.width && xVel > 0) {
            xVel = -xVel;
        }
        if (ballY - sizeBall / 2 < 0 && yVel < 0) {
            yVel = -yVel;
        }
        if (ballY + sizeBall / 2 > welcomeCanvas.height && yVel > 0) {
            yVel = -yVel;
        }


        context.fillStyle = "#F2E1C1";
        context.fillRect(0, 0, welcomeCanvas.width, welcomeCanvas.height);
        // context.fillStyle = color;
        // context.fillRect(ballX - sizeBall / 2, ballY - sizeBall / 2, sizeBall, sizeBall);
        
        context.beginPath();
        context.arc(ballX, ballY, sizeBall, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
    }



    function getColor() {
        let colors = ["red", "blue", "yellow", "green", "orange", "pink", "purple", "white"];
        return colors[getRandomInt(colors.length)]
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
});