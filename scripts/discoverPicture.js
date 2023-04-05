$(window).on("load", function () {
  "use strict";
  let wrapper = document.querySelector('#wrapper');
  let wrapperWidth = $("#wrapper").width();
  let wrapperHeight = $("#wrapper").height();
  let cellRatio = 4;
  let cellSize = wrapperWidth * cellRatio / 100;
  let columns = parseInt(wrapperWidth / cellSize)
  let rows = parseInt(wrapperHeight / cellSize)
  console.log("size w on h", wrapperWidth, wrapperHeight)
  console.log("calculated cell size", cellSize)
  console.log("amount of columns", columns);
  console.log("amount of rows", rows);
  console.log("total amount of cells", columns * rows);


  console.log("actual height:", (cellSize * rows));

  console.log("redundant width:", wrapperWidth - (cellSize * columns));
  console.log("redundant height:", wrapperHeight - (cellSize * rows));

  console.log("percantage of width: ", (100 - (cellSize * columns * 100) / wrapperWidth));
  console.log("percantage of height: ", (100 - (cellSize * rows * 100) / wrapperHeight));


  wrapper.style.height = `${(cellSize * rows * 100) / wrapperHeight}%`;
  wrapper.style.width = `${(cellSize * columns * 100) / wrapperWidth - 1}%`;

  for (let i = 0; i < rows; i++) {
      let divRow = document.createElement('div');
      divRow.className = "row";
      for (let j = 0; j < columns; j++) {
          let cell = document.createElement('div');
          cell.style.width = `${cellSize}px`;
          cell.style.height = `${cellSize}px`;
          divRow.appendChild(cell);
      }
      wrapper.appendChild(divRow);
  }


  function getColor() {
      let colors = ["red", "blue", "yellow", "green", "orange", "pink", "purple", "white"];
      return colors[getRandomInt(colors.length)]
  }

  function getRandomInt(max) {
      return Math.floor(Math.random() * max);
  }

  let boxs = document.querySelectorAll('#wrapper .row div');

  // whole pic at the back
  wrapper.classList.add('gachiStyle');

  for (const box of boxs) {
      box.classList.add("fill-white");
  }

  for (const box of boxs) {
      box.addEventListener('mouseover', function (e) {
          if (e.shiftKey) {
              e.target.classList.remove("fill-white");
              // e.target.classList.add('clear-background');
          }
      });
  }
});
