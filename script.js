const canvas = function () {
	const canvas = document.querySelector("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;

	let isDrawing = false;
	let currentColor = "black";

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

		const rect = canvas.getBoundingClientRect(); //get boundries of canvas
		const x = e.clientX - rect.left; //gives the mouse point on x axis
		const y = e.clientY - rect.top; //gives the mouse point on y axis

		ctx.lineCap = "round";
		ctx.strokeStyle = currentColor; // Use the current color

		ctx.lineTo(x, y);
		ctx.stroke();
		ctx.beginPath(); //path reset
		ctx.moveTo(x, y);
	}

	function setLineWidth(width) {
		ctx.lineWidth = width;
	}

	function setColor(color) {
		currentColor = color;
	}

	function clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	function downloadCanvas() {
		const link = document.createElement("a");
		link.download = "signature.png";
		link.href = canvas.toDataURL();
		link.click();
	}

	// Returns the necessary functions to use it outside the object
	return {
		canvas: canvas,
		startDrawing: startDrawing,
		draw: draw,
		stopDrawing: stopDrawing,
		setLineWidth: setLineWidth,
		setColor: setColor,
		clearCanvas: clearCanvas,
		downloadCanvas: downloadCanvas,
	};
};

// Store the returned object from the canvas function
const canvasObj = canvas();

canvasObj.canvas.addEventListener("mousedown", canvasObj.startDrawing);
canvasObj.canvas.addEventListener("mousemove", canvasObj.draw);
canvasObj.canvas.addEventListener("mouseup", canvasObj.stopDrawing);
canvasObj.canvas.addEventListener("mouseout", canvasObj.stopDrawing);


const colors = document.querySelectorAll(".colors div");
colors.forEach((color) => {
	color.addEventListener("click", () => {
		const selectedColor = color.style.backgroundColor;
		canvasObj.setColor(selectedColor);
	});
});

//changing the line width
const strokes = document.querySelectorAll(".strokes div");
strokes.forEach((stroke) => {
	stroke.addEventListener("click", () => {
		if (stroke.classList.contains("stroke1")) {
			canvasObj.setLineWidth(2);
		} else if (stroke.classList.contains("stroke2")) {
			canvasObj.setLineWidth(6);
		} else if (stroke.classList.contains("stroke3")) {
			canvasObj.setLineWidth(10);
		}
	});
});

// Clear and download functions
document.querySelector(".clear").addEventListener("click", () => {
	canvasObj.clearCanvas();
});

document.querySelector(".download").addEventListener("click", () => {
	canvasObj.downloadCanvas();
});
