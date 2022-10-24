// Take search bar input and fetch image from scaleSerp Google API

var imageContainer = document.getElementById("image");
var searchbar = document.querySelector(".search");
var message = document.getElementById("message");
searchbar.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    message.style.display = "none";
    var getData = searchbar.value;
    var input = getData.replace(/ /g, "%20");
    getImage(input);
  }
});


// Loading screen while fetching image

const getImage = (input) => {
  const apiKey = "9445FAF150214D1296DE7B7312F18AF5"; // Temporary Public API Key, if request run low, visit https://app.scaleserp.com/ 
  imageContainer.src = "../img/loading.gif";
  fetch(
    `https://api.scaleserp.com/search?api_key=${apiKey}&search_type=images&images_size=medium&q=${input}` // We'll consistently update this api key
  )
    .then((response) => {
      response.json().then((data) => {
        console.log(data.images_results);
        for (let i = 0; i < 4; i++) {
          // Necessary to filter out low resolution images that otherwise wouldn't load
          if (data.image_results[i].width > 400) {
            const image = data.image_results[i].image;
            imageContainer.src = image;
          }
        }
      });
    })
    .catch((error) => {
      throw error;
    });
};
