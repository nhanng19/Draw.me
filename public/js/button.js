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
