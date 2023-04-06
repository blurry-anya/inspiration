
const colorGameLink = document
  .querySelector("#goToColorGame")
  .addEventListener("click", () => {
    removeColorGame();
    const colorGame = document.querySelector("#color-game");
    colorGame.classList.remove("invisible");
    colorGame.classList.add("flex-centered");
    document.querySelector("#balls-animation").classList.add('invisible')
    stopFlag = true;
    removePictureGame();

    initColorGame();
  });

const bouncingBallsLink = document
  .querySelector("#goToBouncingBalls")
  .addEventListener("click", () => {
    const colorGame = document.querySelector("#color-game");
    colorGame.classList.add("invisible");
    colorGame.classList.remove("flex-centered");
    document.querySelector("#picture-game").classList.add('invisible');
    document.querySelector("#picture-game").classList.remove("flex-centered");
    document.querySelector("#balls-animation").classList.remove('invisible')
    removeColorGame();
    removePictureGame();
  });

const pictureGameLink = document
  .querySelector("#goToPictureGame")
  .addEventListener("click", () => {
    removePictureGame();
    const colorGame = document.querySelector("#color-game");
    const bouncingBallsGame = document.querySelector("#balls-animation");
    colorGame.classList.add("invisible");
    bouncingBallsGame.classList.add("invisible");
    colorGame.classList.remove("flex-centered");
    document.querySelector("#picture-game").classList.remove('invisible')
    document.querySelector("#picture-game").classList.add('flex-centered')
    initPictureGame();

    stopFlag = true;
    removeColorGame();
  });


