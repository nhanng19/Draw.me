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


