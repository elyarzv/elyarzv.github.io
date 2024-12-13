// Select the canvas and its context
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

// Variables to track drawing state
let isDrawing = false;

// Start drawing when the user presses the mouse or touches
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("touchstart", startDrawing);

// Stop drawing when the user releases the mouse or stops touching
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);
canvas.addEventListener("touchend", stopDrawing);

// Draw when the user moves the mouse or finger
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", draw);

// Functions
function startDrawing(event) {
    isDrawing = true;
    ctx.beginPath(); // Start a new path for the drawing
    const { x, y } = getCanvasCoordinates(event);
    ctx.moveTo(x, y); // Move the drawing cursor to the starting point
    console.log("Start drawing at:", x, y);
}

function stopDrawing() {
    isDrawing = false;
    ctx.closePath(); // Close the path when done drawing
    console.log("Stop drawing");
}

function draw(event) {
    if (!isDrawing) return; // Don't draw if the user isn't pressing down
    const { x, y } = getCanvasCoordinates(event);
    ctx.lineWidth = 5; // Set the thickness of the line
    ctx.lineCap = "round"; // Make the line ends rounded
    ctx.strokeStyle = "#000"; // Set the line color
    ctx.lineTo(x, y); // Create a line to the current cursor position
    ctx.stroke(); // Render the line
    ctx.beginPath(); // Start a new path for continuous drawing
    ctx.moveTo(x, y); // Move the cursor to the current position
    console.log("Drawing at:", x, y);
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

// Clear the canvas
document.getElementById("clearButton").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("Canvas cleared");
});