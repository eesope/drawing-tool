const canvas = document.querySelector("canvas");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(document.getElementsByClassName("color-option")); // make array to use forEach 
const modeBTN = document.getElementById("mode-btn");

canvas.width = 800;
canvas.height = 800;

// painting brush
const brush = canvas.getContext("2d");

brush.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling = false;

function onMove(event) {
    if (isPainting) {
        brush.lineTo(event.offsetX, event.offsetY);
        brush.stroke();
        return;
    }

    brush.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
    isPainting = true;
}

function cancelPainting() {
    isPainting = false;
    brush.beginPath();
}

function onLineWidthChange(event) {
    brush.lineWidth = event.target.value;
}

function onColorChange(event) {
    brush.strokeStyle = event.target.value;
    brush.fillStyle = event.target.value;
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color
    brush.strokeStyle = colorValue;
    brush.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick() {
    if (isFilling) {
        isFilling = false;
        modeBTN.innerText = "Fill"
    } else {
        isFilling = true;
        modeBTN.innerText = "Draw"
    }

}

function onCanvasClick() {
    if (isFilling) {
        brush.fillRect(0, 0, 800, 800)
    }
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);

canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting); // monitor whether the mouse pointer leave the canvas
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);

color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBTN.addEventListener("click", onModeClick);