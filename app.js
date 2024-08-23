const canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 800;

// painting brush
const brush = canvas.getContext("2d");

const colors = [
    "#eccc68",
    "##ffa502",
    "#ff7f50",
    "#ff6348",
    "#ff4757",
    "#ff6b81",
    "#7bed9f",
    "#2ed573",
    "#70a1ff",
    "#1e90ff",
    "#5352ed",
    "#3742fa",
    "#ffffff",
    "#f1f2f6",
    "#dfe4ea",
    "#ced6e0",
    "#a4b0be",
    "#747d8c",
    "#57606f",
    "#2f3542",
]

brush.lineWidth = 2;
let isPainting = false;

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
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);

canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting); // monitor whether the mouse pointer leave the canvas

