$(window).on('load', function () {
    "use strict";

    const ballsSection = document.querySelector("#balls-animation");
    let ballCounter = document.querySelector('#balls-counter');

    const sectionWidth = ballsSection.offsetWidth;
    const sectionHeight = ballsSection.offsetHeight;

    const startPositionX = sectionWidth / 2;
    const startPositionY = sectionHeight / 2;

    const maxBallAmount = 25;

    let started = false;

    class Ball {
        constructor(x = 0, y = 0, width = 10, height = 10, directionX = 1, directionY = 1, speed = 1, id = 0) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.directionX = directionX;
            this.directionY = directionY;
            this.speed = speed;
            this.id = id;
        }
    }

    const ballWidth = 30;
    const ballHeight = 30;
    const ballSpeed = 3;

    const borderX = sectionWidth - ballWidth - 10;
    const borderY = sectionHeight - ballHeight;

    const getRandomDirection = () => {
        let res = getRandomInt(2);
        return res <= 0 ? res -= 1 : res;
    }

    let balls = [], ballsObjects = [];
    for (let i = 0, index = 1; i < 10; i++) {
        balls.push(document.createElement("div"));
        ballsObjects.push(new Ball(startPositionX + index, startPositionY + index, ballWidth, ballHeight,
            getRandomDirection() * (index / 3), getRandomDirection() * (index / 3), ballSpeed, i));
        index += 1;
    }

    balls.map(ball => ball.className = "ball");
    balls.map(ball => ball.style.backgroundColor = getRandomColor());
    balls.map(ball => ball.style.width = `${ballWidth}px`);
    balls.map(ball => ball.style.height = `${ballWidth}px`);
    balls.map(ball => ball.style.left = `${startPositionX}`);
    balls.map(ball => ball.style.top = `${startPositionY}`);
    balls.map(ball => ballsSection.appendChild(ball));

    balls.forEach(ball => {
        ball.addEventListener('click', () => {
            addEmoji(ball);
        });
    });

    let stopFlag = true;
    document.querySelector(".start-btn").addEventListener("click", function () {
        stopFlag = !stopFlag ? true : false;
        loop();

        ballCounter.innerText = balls.length;

        if (!stopFlag) {
            setMessage('started');
        } else {
            setMessage('paused');
        }
    });

    function loop() {
        started = true;
        if (!stopFlag) {
            window.requestAnimationFrame(loop);
            console.log("animation is running");
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
            });
        } else {
            window.cancelAnimationFrame(loop);
            console.log("animation is stopped");
        }
    }

    // to check if clicked on empty place or btn/p/div
    const ignoreClickElements = (event) => {
        return event.target.classList.contains('ball') ||
        event.target.classList.contains('btn') ||
        event.target.classList.contains('balls-counter-wrapper') ||
        event.target.classList.contains('animation-panel') ||
        event.target.id === 'balls-remove' ||
        event.target.id === 'balls-clear';
    }

    // adds new ball
    ballsSection.addEventListener('click', (event) => {
        if (balls.length < maxBallAmount &&
            started &&
            !ignoreClickElements(event))  {

            const header = document.querySelector('header');
            const currentXPos = event.pageX - ballWidth / 2;
            const currentYPos = event.pageY - header.offsetHeight;
            const newBallObject = new Ball(currentXPos, currentYPos, ballWidth, ballHeight,
                getRandomDirection() * (getRandomInt(20, 1) / 3),
                getRandomDirection() * (getRandomInt(20, 1) / 3),
                ballSpeed, ballsObjects.length);

            ballsObjects.push(newBallObject);
            const newBall = document.createElement('div');
            newBall.className = "ball";
            newBall.style.backgroundColor = getRandomColor();
            newBall.style.width = `${ballWidth}px`;
            newBall.style.height = `${ballWidth}px`;
            newBall.style.left = `${newBallObject.x}px`;
            newBall.style.top = `${newBallObject.y}px`;
            balls.push(newBall);
            ballsSection.appendChild(newBall);
            ballCounter.innerText = balls.length;

            newBall.addEventListener('click', () => {
                addEmoji(newBall);
            });

            if (balls.length === maxBallAmount) {
                const counterLabel = document.querySelector('.balls-counter-wrapper');
                counterLabel.classList.add("limited");
            }
        } else {
            // restart blinking animation when user keeps clicking
            const counterLabel = document.querySelector('.balls-counter-wrapper');
            if (counterLabel.classList.contains('limited') &&
                balls.length === maxBallAmount &&
                !event.target.classList.contains('ball')) {
                counterLabel.classList.remove("limited");
                setTimeout(() => counterLabel.classList.add("limited"), 50)
            }
        }
    });

    document.querySelector('#balls-remove').addEventListener('click', () => {
        if(started && balls.length !== 0){
            const removeIndex = getRandomInt(balls.length);
            balls[removeIndex].remove();
            balls.splice(removeIndex, 1);
            ballsObjects.splice(removeIndex, 1);
            ballCounter.innerText = balls.length;
            refreshIds(ballsObjects);
        }
        if(balls.length === 0){
            setMessage('removedAll');
            stopFlag = true;
        }
        if(balls.length < maxBallAmount){
            const counterLabel = document.querySelector('.balls-counter-wrapper');
            counterLabel.classList.remove("limited");
        }
    });

    // clearing arrays and dom
    document.querySelector('#balls-clear').addEventListener('click', () => {
        if(started){
            balls.forEach(ball => {
                ball.remove();
            });
            balls = [];
            ballsObjects = [];
            ballCounter.innerText = 0;
            stopFlag = true;
            setMessage('cleared');
        }
    });

    // refreshing is needed because loop() animation is run using ids of each ballObject
    function refreshIds(objectsArray){
        objectsArray.map((item, index) => item.id = index);
    }

    const setMessage = (type) => {
        const messageBtn = document.querySelector(".start-btn");
        switch(type){
            case 'started':
                messageBtn.innerText = 'Impressive, but can you stop the time?';
            break;
            case 'paused':
                messageBtn.innerText = 'Wow, that was so cool! Wanna continue?';
            break;
            case 'cleared':
                messageBtn.innerText = 'Oh, you need to create more balls..';
            break;
            case 'removedAll':
                messageBtn.innerText = 'It seems you\'ve deleted all the balls..';
            break;
            default:
                messageBtn.innerText = 'Are you cool enough to click me?';
        }
    }

    function addEmoji(element) {
        element.innerHTML = getRandomEmoji();
    }

    function getRandomEmoji() {
        let emojis = [
            `<i class="fa-solid fa-face-smile white-text"></i>`,
            `<i class="fa-solid fa-face-surprise white-text"></i>`,
            `<i class="fa-solid fa-face-rolling-eyes white-text"></i>`,
            `<i class="fa-solid fa-face-meh white-text"></i>`,
            `<i class="fa-solid fa-face-kiss-wink-heart white-text"></i>`,
            `<i class="fa-solid fa-face-grin-hearts white-text"></i>`,
            `<i class="fa-solid fa-face-grin-beam-sweat white-text"></i>`,
            `<i class="fa-solid fa-face-flushed white-text"></i>`,
            `<i class="fa-solid fa-face-sad-cry white-text"></i>`,
            `<i class="fa-solid fa-face-grin-stars white-text"></i>`
        ];
        return emojis[getRandomInt(emojis.length)]
    }

    function getRandomColor() {
        let colors = ["#716F81", "#B97A95", "#9AA899", "#54577C", "#4A7B9D", "#482C3D", "#AC3931", "#596157", "#CFD186", "#5B8C5A"];
        return colors[getRandomInt(colors.length)]
    }

    function getRandomInt(max, add = 0) {
        return Math.floor(Math.random() * max + add);
    }
});