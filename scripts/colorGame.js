const initColorGame = () => {
  const colorsArray = ["#CFD186", "#5B8C5A", "#4A7B9D", "#AC3931", "#482C3D"];

  let wrapper = document.querySelector(".table-wrapper");
  let wrapperWidth = $(".table-wrapper").width();
  let wrapperHeight = $(".table-wrapper").height();
  let cellRatio = 3;
  let cellSize = (wrapperWidth * cellRatio) / 100;
  const columns = parseInt(wrapperWidth / cellSize);
  const rows = parseInt(wrapperHeight / cellSize);

  wrapper.style.height = `${(cellSize * rows * 100) / wrapperHeight}%`;
  wrapper.style.width = `${(cellSize * columns * 100) / wrapperWidth - 1}%`;

  for (let i = 0; i < rows; i++) {
    let divRow = document.createElement("div");
    divRow.className = "row";
    for (let j = 0; j < columns; j++) {
      let cell = document.createElement("div");
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      cell.className = "cell";
      divRow.appendChild(cell);
    }
    wrapper.appendChild(divRow);
  }

  const cells = $(".table-wrapper .cell");
  const colors = $(".color-panel div");
  let activeColor;

  let i = 0;
  for (const color of colors) {
    $(color).css("background-color", colorsArray[i++]);
  }

  colors.click(function () {
    $(this).addClass("active-color");
    colors.not($(this)).removeClass("active-color");
  });

  let activeIndex = 0;
  cells[activeIndex].classList.add("active");

  $(document).keydown(function (event) {
    activeColor = $(".color-panel .active-color").css("background-color");

    $(cells[activeIndex]).removeClass("active");

    if (event.code === "KeyD" && activeIndex != cells.length - 1) {
      // && right bottom corner
      activeIndex++;
    } else if (event.code === "KeyA" && activeIndex != 0) {
      // && left top corner
      activeIndex--;
    } else if (event.code === "KeyS" && activeIndex < cells.length - columns) {
      activeIndex += columns;
    } else if (event.code === "KeyS" && activeIndex >= cells.length - columns) {
      // && bottom line to top line
      activeIndex -= columns * (rows - 1);
    } else if (event.code === "KeyW" && activeIndex >= columns) {
      activeIndex -= columns;
    } else if (event.code === "KeyW" && activeIndex <= columns) {
      // && top line to bottom line
      activeIndex += columns * (rows - 1);
    } else if (event.code === "Space") {
      // filling the cell
      $(cells[activeIndex]).css("background-color", activeColor);
    }
    $(cells[activeIndex]).addClass("active");
  });

  cells.click(function (event) {
    $(cells[activeIndex]).removeClass("active");
    $(this).addClass("active");
    $(cells).not($(this)).remove("active");
    activeIndex = $(this).parent().index() * columns + $(this).index();
  });
};

const removeColorGame = () => {
  $(".table-wrapper .cell").remove();
  $(".table-wrapper .row").remove();
};
