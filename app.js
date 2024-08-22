const canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 800;

// painting brush
const brush = canvas.getContext("2d");

const colors = [
    "##ffa502",
    "#ff7f50",
    "#ff6348",
    "#ff4757",
    "#2ed573",
    "#1e90ff",
    "#3742fa",
    "#a4b0be",
    "#2f3542",
    "#f1f2f6",
]

brush.lineWidth = 2;

function onclick(event) {
    brush.beginPath();
    brush.moveTo(0, 0);

    const color = colors[Math.floor(Math.random() * colors.length)];
    brush.strokeStyle = color;

    brush.lineTo(event.offsetX, event.offsetY);
    brush.stroke();
}
canvas.addEventListener("mousemove", onclick);