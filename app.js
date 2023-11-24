const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const lineWidthInput = document.getElementById("line-width");
const colorInput = document.getElementById("line-color");

const drawBtn = document.getElementById("draw-button");
const eraserBtn = document.getElementById("eraser-button");
const destroyBtn = document.getElementById("destroy-button");
const fillOrStrokeBtn = document.getElementById("fill-or-stroke");
const colorOptionsBtn = Array.from(
  document.getElementsByClassName("color-option")
);

canvas.width = 800;
canvas.height = 800;
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = lineWidthInput.value;

let isPainting = false;
let isDraw = false;
let isEraser = false;
let isStroke = true;

function onLineWidthChange() {
  ctx.beginPath();
  ctx.lineWidth = lineWidthInput.value;
}

function onLineColorChange() {
  ctx.beginPath();
  ctx.strokeStyle = colorInput.value;
  ctx.fillStyle = colorInput.value;
}

function onFillOrStrokeBtnClick() {
  if (isStroke) {
    isStroke = false;
    fillOrStrokeBtn.innerText = "fill";
  } else {
    isStroke = true;
    fillOrStrokeBtn.innerText = "Stroke";
  }
}

function onDrawBtnClick() {
  isDraw = true;
  if (isDraw) {
    function onPaintStart(e) {
      ctx.beginPath();
      isPainting = true;
      ctx.moveTo(e.offsetX, e.offsetY);
    }
    function onPainting(e) {
      if (isPainting) {
        ctx.lineTo(e.offsetX, e.offsetY);

        ctx.stroke();
      }
    }
    function onPaintEnd() {
      if (isStroke) {
        isPainting = false;
      } else {
        isPainting = false;
        ctx.fill();
      }
    }
  }
  canvas.addEventListener("mousedown", onPaintStart);
  canvas.addEventListener("mousemove", onPainting);
  canvas.addEventListener("mouseup", onPaintEnd);
  canvas.addEventListener("mouseout", onPaintEnd);
}

function onEraserBtnClick() {
  isEraser = true;
  isDraw = false;
  if (isEraser) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    colorInput.value = "#FFFFFF";
  }
}

function onEraserEnd() {
  isEraser = false;
}

function onDestroyBtnClick() {
  if (window.confirm("모든 작업을 없애시겠습니까?")) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 800, 800);
  }
}

function onColorOptionBtnClick(e) {
  ctx.beginPath();
  ctx.strokeStyle = e.target.dataset.color;
  ctx.fillStyle = e.target.dataset.color;
  colorInput.value = e.target.dataset.color;
}

canvas.addEventListener("mouseout", onEraserEnd);

lineWidthInput.addEventListener("change", onLineWidthChange);
colorInput.addEventListener("change", onLineColorChange);

drawBtn.addEventListener("click", onDrawBtnClick);
eraserBtn.addEventListener("click", onEraserBtnClick);
destroyBtn.addEventListener("click", onDestroyBtnClick);
fillOrStrokeBtn.addEventListener("click", onFillOrStrokeBtnClick);

colorOptionsBtn.forEach((colorInput) =>
  colorInput.addEventListener("click", onColorOptionBtnClick)
);
