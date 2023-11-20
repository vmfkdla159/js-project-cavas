const theLineWidth = document.querySelector("#line-width");
const theLineColor = document.querySelector("#line-color");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const canvas = document.querySelector("canvas");
const modeBtn = document.getElementById("mode-btn");
const clearBtn = document.getElementById("clear-btn");
const eraserBtn = document.getElementById("eraser-btn");
const saveBtn = document.getElementById("save-btn");
const fontOptions = document.getElementById("font-option");

const colorArray = Array.from(document.getElementsByClassName("color-option"));
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

let isPainting = false;
let isFilling = false;
let isEraser = true;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = theLineWidth.value;

function mouseMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startingPaint() {
  isPainting = true;
}

function endingPaint() {
  isPainting = false;
}

function lineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function lineColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function clickColor(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  theLineColor.value = colorValue;
}

function onClickModeBtn() {
  if (isFilling) {
    modeBtn.innerText = "fill";

    isFilling = false;
  } else {
    modeBtn.innerText = "draw";
    isFilling = true;
  }
}

function fillingMode() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function canvasClear() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  return;
}

function onClickEraserBtn() {
  ctx.strokeStyle = "white";
  modeBtn.innerText = "fill";
  isFilling = false;
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    file.value = null;
  };
}

function onTextDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}
-0 +
  function onSaveBtnClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "*.png";
    a.click();
  };

canvas.addEventListener("dblclick", onTextDoubleClick);
fileInput.addEventListener("change", onFileChange);
canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mousedown", startingPaint);
canvas.addEventListener("mouseup", endingPaint);
canvas.addEventListener("mouseleave", endingPaint);
theLineWidth.addEventListener("change", lineWidthChange);
theLineColor.addEventListener("change", lineColorChange);
modeBtn.addEventListener("click", onClickModeBtn);
canvas.addEventListener("click", fillingMode);
clearBtn.addEventListener("click", canvasClear);
eraserBtn.addEventListener("click", onClickEraserBtn);
saveBtn.addEventListener("click", onSaveBtnClick);
fontOptions.addEventListener("change", onFontChange);

colorArray.forEach((theLineColor) => {
  theLineColor.addEventListener("click", clickColor);
});
