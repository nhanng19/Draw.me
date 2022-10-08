// Canvas functionality

let canvas = document.getElementById("canvas");
canvas.width = 960
canvas.height = 1000
let ctx = canvas.getContext("2d", {preserveDrawingBuffer: true});
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
let restore_array = [];
let start_index = -1;
let stroke_color = 'black';
let stroke_width = "2";
let is_drawing = false;


function start(event) {
  is_drawing = true;
  ctx.beginPath();
  ctx.moveTo(getX(event), getY(event));
  event.preventDefault();
  document.body.style.cursor = "url('./cursor.cur'), auto";
}

function draw(event) {
  if (is_drawing) {
    ctx.lineTo(getX(event), getY(event));
    ctx.strokeStyle = stroke_color;
    ctx.lineWidth = stroke_width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }
  event.preventDefault();
}

function stop(event) {
  if (is_drawing) {
    ctx.stroke();
    ctx.closePath();
    is_drawing = false;
  }
  event.preventDefault();
  restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  start_index += 1;
}

function getX(event) {
  if (event.pageX == undefined) {return event.targetTouches[0].pageX - canvas.offsetLeft}
  else {return event.pageX - canvas.offsetLeft}
  }


function getY(event) {
  if (event.pageY == undefined) {return event.targetTouches[0].pageY - canvas.offsetTop}
  else {return event.pageY - canvas.offsetTop}
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);


// Restore image data per index

function Restore() {
  if (start_index <= 0) {
    Clear()
  } else {
    start_index += -1;
    restore_array.pop();
    if ( event.type != 'mouseout' ) {
      ctx.putImageData(restore_array[start_index], 0, 0);
    }
  }
}


// Reset canvas to white color and reset index count

function Clear() {
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    restore_array = [];
    start_index = -1;
}

// Currently only console.log canvas' url. Need to make it store db in mySQL

function Post() {
  const imageData = canvas.toDataURL("image.png")
  console.log(imageData)
}

// Save canvas as a PNG. Currently does not work, will try to fix

function Png() {
  var dataURL = canvas.toDataURL("image/png");
  var newTab = window.open('about:blank','image from canvas');
  newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
}

// Function to render model images, can definitely make it more dynamic

function mona() {
    document.getElementById('image').src="./img/mona.jpg"
}

function star() {
    document.getElementById('image').src="./img/star.png"
}

function scream() {
    document.getElementById('image').src="./img/scream.png"
}

function gothic() {
    document.getElementById('image').src="./img/gothic.png"
}

function man() {
    document.getElementById('image').src="./img/man.png"
}

function vincent() {
    document.getElementById('image').src="./img/vincent.png"
}

//Change button colors of selected image

var btns = document.getElementsByClassName("btn");  
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}

// Key shortcut Ctrl + Z to undo an image


document.addEventListener('keydown', (e) => {  
  e.preventDefault();
  if ((e.metaKey || e.ctrlKey) && e.code === 'KeyZ') {
    Restore()
  }
})

// Key shortcut Ctrl + X to undo an image

document.addEventListener('keydown', (e) => {  
  e.preventDefault();
  if ((e.metaKey || e.ctrlKey) && e.code === 'KeyX') {
    Clear()
  }
});
