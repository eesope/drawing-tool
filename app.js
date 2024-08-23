const canvas = document.querySelector("canvas");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(document.getElementsByClassName("color-option")); // make array to use forEach 
const modeBTN = document.getElementById("mode-btn");
const destroyBTN = document.getElementById("destroy-btn");
const eraserBTN = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBTN = document.getElementById("save")

canvas.width = 800;
canvas.height = 800;

// painting brush
const brush = canvas.getContext("2d");

brush.lineWidth = lineWidth.value;
brush.lineCap = "round"

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
        brush.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function onDestroyClick() {
    brush.fillStyle = "white";
    brush.fillRect(0, 0, canvas.width, canvas.height);
}

function onEraserClick() {
    brush.strokeStyle = "white";
    isFilling = false;
    modeBTN.innerText = "Fill"
}

function onFileChange(event) {
    const file = event.target.files[0]
    const url = URL.createObjectURL(file)
    const image = new Image();
    image.src = url
    image.onload = function () {
        brush.drawImage(image, 0, 0, canvas.width, canvas.height)
        fileInput.value = null;
    }
}

function onDoubleClick(event) {
    const text = textInput.value;
    if (text !== "") {
        brush.save(); // saving current brush state
        brush.lineWidth = 1;
        brush.font = "40px monospace"
        brush.fillText(text, event.offsetX, event.offsetY);
        brush.restore(); // restoring previous brush state
    }
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a")
    a.href = url
    a.download = "myDrawing.png"
    a.click();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);

canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting); // monitor whether the mouse pointer leave the canvas
canvas.addEventListener("click", onCanvasClick);

canvas.addEventListener("dblclick", onDoubleClick)

lineWidth.addEventListener("change", onLineWidthChange);

color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBTN.addEventListener("click", onModeClick);
destroyBTN.addEventListener("click", onDestroyClick);
eraserBTN.addEventListener("click", onEraserClick);
saveBTN.addEventListener("click", onSaveClick)

fileInput.addEventListener("change", onFileChange)

