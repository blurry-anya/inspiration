const initPictureGame = () => {
  "use strict";
  let wrapper = document.querySelector(".image-wrapper");
  let wrapperWidth = $(".image-wrapper").width();
  let wrapperHeight = $(".image-wrapper").height();
  let cellRatio = 4;
  let cellSize = (wrapperWidth * cellRatio) / 100;
  let columns = parseInt(wrapperWidth / cellSize);
  let rows = parseInt(wrapperHeight / cellSize);

  wrapper.style.height = `${cellSize * rows}px`;
  wrapper.style.width = `${cellSize * columns}px`;

  for (let i = 0; i < rows; i++) {
    let divRow = document.createElement("div");
    divRow.className = "row";
    for (let j = 0; j < columns; j++) {
      let cell = document.createElement("div");
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      divRow.appendChild(cell);
    }
    wrapper.appendChild(divRow);
  }

  let boxs = document.querySelectorAll(".image-wrapper .row div");

  // whole pic at the back
  wrapper.classList.add("picture-bgr");

  for (const box of boxs) {
    box.classList.add("fill-background");
  }

  for (const box of boxs) {
    box.addEventListener("mouseover", function (e) {
      if (e.shiftKey) {
        console.log("mouse over and shift");
        e.target.classList.remove("fill-background");
      }
    });
  }

  document.querySelector("#image-url").addEventListener("change", (event) => {
    removePictureGame();
    initPictureGame();
    document.querySelector(".picture-bgr").style.backgroundImage =
      `url('${event.target.value}')`;
  });
};

const removePictureGame = () => {
  $(".image-wrapper .cell").remove();
  $(".image-wrapper .row").remove();
};

// function getColor() {
//   let colors = [
//     "red",
//     "blue",
//     "yellow",
//     "green",
//     "orange",
//     "pink",
//     "purple",
//     "white",
//   ];
//   return colors[getRandomInt(colors.length)];
// }

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }
