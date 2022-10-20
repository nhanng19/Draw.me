// Canvas functionality

let canvas = document.getElementById("canvas");
canvas.width = 960;
canvas.height = 1000;
let ctx = canvas.getContext("2d", { preserveDrawingBuffer: true });
ctx.fillStyle = "#FAF0E6";
ctx.fillRect(0, 0, canvas.width, canvas.height);
let restoreArray = [];
let startIndex = -1;
let strokeColor = "black";
let strokeWidth = "2";
let isDrawing = false;

// Return current x-coordinate of mouse position

function getX(e) {
  return e.pageX - canvas.offsetLeft;
}

// Return current y-coordinate of mouse position

function getY(e) {
  return e.pageY - canvas.offsetTop;
}

function start(e) { // activate drawing by listening to a mouseclick
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(getX(e), getY(e)); // move to cursor's space coordinate
  e.preventDefault();
}

// Start drawing

function draw(e) { // start drawing on your mouse's coordinate spaces
  if (isDrawing) {
    ctx.lineTo(getX(e), getY(e));
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke(); // render the path from moveTo and lineTo
  }
  e.preventDefault();
}

function stop(e) { // set drawing state to false when user let go of mouse hold
  if (isDrawing) {
    ctx.stroke();
    ctx.closePath();
    isDrawing = false;
  }
  e.preventDefault();
  restoreArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // push current imageData to our array for later restoration purposes
  startIndex += 1;
}

// Restore image data per index

function Restore() {
  if (startIndex <= 0) {
    Clear();
  } else {
    startIndex += -1;
    restoreArray.pop();
    if (event.type != "mouseout") {
      ctx.putImageData(restoreArray[startIndex], 0, 0);
    }
  }
}

// Reset canvas to white color and reset index count

function Clear() {
  ctx.fillStyle = "#FAF0E6";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  restoreArray = [];
  startIndex = -1;
}

canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);

// Key shortcut Ctrl + Z to undo an image

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if ((e.metaKey || e.ctrlKey) && e.code === "KeyZ") {
    Restore();
  }
});

// Key shortcut Ctrl + X to undo an image

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if ((e.metaKey || e.ctrlKey) && e.code === "KeyX") {
    Clear();
  }
});

// toDataURL retreives canvas's base64 image/png data url

function Post() {
  const link = canvas.toDataURL();
  $.post("/api/drawings", { link });
  setTimeout(() => {
    location.href = "profile";
  }, 500);
}

// Post comment to api

function postComment() {
  const comment_body = document.getElementById("comment").value;
  const currentURL = document.URL;
  const myURL = new URL(currentURL);
  const drawing_id = myURL.pathname.replace(/\D/g, "");
  $.post("/comment", { comment_body: comment_body, drawing_id: drawing_id });
  setTimeout(() => {
    location.reload();
    return false;
  }, 500);
}

// Save canvas as a PNG.

var Png = function () {
  var link = document.createElement("a");
  link.download = "drawing.png";
  link.href = document.getElementById("canvas").toDataURL();
  link.click();
};

// Function to render model images

function mona() {
  document.getElementById("image").src = "../img/mona.jpg";
}

function star() {
  document.getElementById("image").src = "../img/star.png";
}

function scream() {
  document.getElementById("image").src = "../img/scream.png";
}

function gothic() {
  document.getElementById("image").src = "../img/gothic.png";
}

function man() {
  document.getElementById("image").src =
    "https://iartprints.com/art-imgs/rene_magritte/son_of_man_1964-42089.jpg";
}

function vincent() {
  document.getElementById("image").src =
    "https://cdn.britannica.com/36/69636-050-81A93193/Self-Portrait-artist-panel-board-Vincent-van-Gogh-1887.jpg";
}

//Change button colors of selected image

var btns = document.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
