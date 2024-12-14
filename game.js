// Select the canvas and its context
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

// Variables to track drawing state
let isDrawing = false;

// Resize canvas dynamically
function resizeCanvas() {
    const size = Math.min(window.innerWidth, 300); // Limit size to 300px max
    canvas.width = size;
    canvas.height = size;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Start drawing
function startDrawing(event) {
    isDrawing = true;
    saveState(); // Save canvas state for undo
    ctx.beginPath(); // Start a new path
    const { x, y } = getCanvasCoordinates(event);
    ctx.moveTo(x, y); // Move cursor to starting point
}

// Stop drawing
function stopDrawing() {
    isDrawing = false;
}

// Draw on canvas
function draw(event) {
    if (!isDrawing) return;
    const { x, y } = getCanvasCoordinates(event);
    ctx.lineTo(x, y);
    ctx.stroke();
}

// Get the x, y coordinates relative to the canvas
function getCanvasCoordinates(event) {
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches ? event.touches[0] : event;
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
}

// Save and clear canvas
let undoStack = [];
function saveState() {
    undoStack.push(canvas.toDataURL());
}
document.getElementById("clearButton").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveState();
});

// Prevent scrolling on touch events for canvas
["touchstart", "touchmove", "touchend", "touchcancel"].forEach((event) => {
    canvas.addEventListener(event, (e) => e.preventDefault(), { passive: false });
});

// Event listeners for drawing
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

canvas.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent scrolling
    startDrawing(e);
}, { passive: false });

canvas.addEventListener("touchmove", (e) => {
    e.preventDefault(); // Prevent scrolling
    draw(e);
}, { passive: false });

canvas.addEventListener("touchend", (e) => {
    e.preventDefault(); // Prevent scrolling
    stopDrawing();
}, { passive: false });

canvas.addEventListener("touchcancel", (e) => {
    e.preventDefault(); // Prevent scrolling
    stopDrawing();
}, { passive: false });