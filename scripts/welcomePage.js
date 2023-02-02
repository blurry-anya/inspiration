$(window).on('load', function () {
    "use strict";

    // code for pasting js into css starts
    // credit: https://stackoverflow.com/questions/59573722/how-can-i-set-a-css-keyframes-in-javascript
    let dynamicStyles = null;

    function addAnimation(body) {
        if (!dynamicStyles) {
            dynamicStyles = document.createElement('style');
            dynamicStyles.type = 'text/css';
            document.head.appendChild(dynamicStyles);
        }

        dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
    }
    // code for pasting js into css ends

    const ballsSection = document.querySelector("#balls-animation");
    console.log(ballsSection.offsetWidth);

    const startPositionX = ballsSection.offsetWidth/2;
    const startPositionY = ballsSection.offsetHeight/2;

    const borderX = ballsSection.offsetWidth - 20;
    const borderY = ballsSection.offsetHeight - 20;

    console.log(startPositionX, startPositionY)
    console.log(borderX, borderY)
    

    addAnimation(`
        @keyframes ball-moves-x {
            from{
                right: ${startPositionX}px;
            } to {
                right: ${borderX}px;
            }
        }
    `);

    addAnimation(`
        @keyframes ball-moves-y {
            from{
                top: ${startPositionY}px;
            } to {
                top: ${startPositionY}px;
            }
        }
    `);
    
    

    let ball = document.createElement("div");
    ball.className = "ball";
    ball.style.backgroundColor = getColor();
    
    console.log(ball);

    

    document.querySelector(".start-btn").addEventListener("click",function(){
        ballsSection.appendChild(ball);
        ball.style.animation = "2s linear 0s infinite alternate ball-moves-x, 2s linear 0s infinite alternate ball-moves-y";
    });

    // let main = document.querySelector("main");

    // let balls = [];
    // for (let i = 0; i < 5; i++) {
    //     balls.push(document.createElement("div"));
    // }

    // balls.map(ball => ball.className = "ball");
    // balls.map(ball => ball.style.backgroundColor = getColor());
    // balls.map(ball => ball.style.animation = "4s linear 0s infinite alternate move-eye");
    // balls.map(ball => main.appendChild(ball));


    // console.log(balls)


    function getColor() {
        let colors = ["red", "blue", "yellow", "green", "orange", "pink", "purple", "white"];
        return colors[getRandomInt(colors.length)]
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
});