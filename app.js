const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

ctx.arc(100, 100, 20, 0.3 * Math.PI, 1.3 * Math.PI);
ctx.fill();
