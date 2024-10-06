const canvas = document.getElementById("signature-pad");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let currentColor = "#000000";

function resizeCanvas() {
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function startDrawing(e) {
	isDrawing = true;
	draw(e);
}

function stopDrawing() {
	isDrawing = false;
	ctx.beginPath();
}

function draw(e) {
	if (!isDrawing) return;

	const rect = canvas.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	ctx.lineWidth = 2;
	ctx.lineCap = "round";
	ctx.strokeStyle = currentColor;

	ctx.lineTo(x, y);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(x, y);
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Touch events for mobile devices
canvas.addEventListener("touchstart", (e) => {
	e.preventDefault();
	const touch = e.touches[0];
	startDrawing(touch);
});
canvas.addEventListener("touchmove", (e) => {
	e.preventDefault();
	const touch = e.touches[0];
	draw(touch);
});
canvas.addEventListener("touchend", stopDrawing);

// Color options
const colorOptions = document.querySelectorAll(".color-option");
colorOptions.forEach((option) => {
	option.addEventListener("click", () => {
		currentColor = option.getAttribute("data-color");
		colorOptions.forEach((opt) => (opt.style.border = "2px solid #fff"));
		option.style.border = "2px solid #333";
	});
});

// Clear button
const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Download button
const downloadBtn = document.getElementById("download-btn");
downloadBtn.addEventListener("click", () => {
	const dataURL = canvas.toDataURL("image/png");
	const link = document.createElement("a");
	link.download = "signature.png";
	link.href = dataURL;
	link.click();
});

// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navbarMenu = document.querySelector(".navbar-menu");

hamburger.addEventListener("click", () => {
	navbarMenu.classList.toggle("active");
	hamburger.classList.toggle("active");
});
