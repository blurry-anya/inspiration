$(window).on('load', function () {
    "use strict";

    const ballsSection = document.querySelector("#balls-animation");

    const sectionWidth = ballsSection.offsetWidth;
    const sectionHeight = ballsSection.offsetHeight;

    const startPositionX = sectionWidth / 2;
    const startPositionY = sectionHeight / 2;

    function Ball(x = 0, y = 0, width = 10, height = 10, directionX = 1, directionY = 1, speed = 1, id = 0, move = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.directionX = directionX;
        this.directionY = directionY;
        this.speed = speed;
        this.id = id;
        this.isMove = false;
    }

    const ballWidth = 30;
    const ballHeight = 30;
    const ballSpeed = 3;

    const borderX = sectionWidth - ballWidth - 10;
    const borderY = sectionHeight - ballHeight;

    console.log(startPositionX, startPositionY)
    console.log(borderX, borderY)

    let getRandomDirection = () => {
        let res = getRandomInt(2);
        return res <= 0 ? res -= 1 : res;
    }

    let balls = [], ballsObjects = [];
    for (let i = 0, index = 1; i < 20; i++) {
        balls.push(document.createElement("div"));
        ballsObjects.push(new Ball(startPositionX + index, startPositionY + index, ballWidth, ballHeight,
            getRandomDirection() * (index / 3), getRandomDirection() * (index / 3), ballSpeed, i, false));
        index += 1;
    }

    balls.map(ball => ball.className = "ball");
    balls.map(ball => ball.style.backgroundColor = getRandomColor());
    balls.map(ball => ball.style.width = `${ballWidth}px`);
    balls.map(ball => ball.style.height = `${ballWidth}px`);
    balls.map(ball => ball.style.left = `${startPositionX}`);
    balls.map(ball => ball.style.top = `${startPositionY}`);
    balls.map(ball => ballsSection.appendChild(ball));

    let stopFlag = true;
    document.querySelector(".start-btn").addEventListener("click", function () {
        stopFlag = !stopFlag ? true : false;
        loop();

        if(!stopFlag){
            this.innerText = "Impressive, but can you stop the time?";
        } else {
            this.innerText = "Wow, that was so cool!";
            setTimeout(()=>{
                this.innerText = "Let's continue? :)";
            }, 2000)
        }
    });

    function loop() {
        if(!stopFlag){
            window.requestAnimationFrame(loop);
            // console.log("running");
            ballsObjects.forEach(ballObject => {
                if (ballObject.x > borderX || ballObject.x < 0) { // bounce at right and left
                    ballObject.directionX *= -1;
                }
                if (ballObject.y > borderY || ballObject.y < 0) { // bounce at bottom and top
                    ballObject.directionY *= -1;
                }
                ballObject.x += ballObject.directionX * ballObject.speed;
                ballObject.y += ballObject.directionY * ballObject.speed;
    
                balls[ballObject.id].style.left = `${ballObject.x}px`;
                balls[ballObject.id].style.top = `${ballObject.y}px`;
    
                ballObject.isMove = true;
            });
        } else {
            window.cancelAnimationFrame(loop);
        }
    }

    balls.forEach(ball => {
        ball.addEventListener('click', () =>{
            ball.classList.add('add-smile');
            setTimeout(() => {
                ball.classList.remove('add-smile');
            }, 2000);
        })
    });

    function getRandomColor() {
        let colors = ["#FAFFD8", "#ECFFB0", "#9AA899", "#54577C", "#4A7B9D", "#482C3D", "#AC3931", "#596157", "#CFD186", "#5B8C5A"];
        return colors[getRandomInt(colors.length)]
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
});