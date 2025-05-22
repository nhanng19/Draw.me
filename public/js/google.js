// Take search bar input and fetch image from SerpApi
const SERP_API_KEY = '3a622712c36522d8b90dd1b79dd84dda5cd08ce070c87d67671cd7332083348a'; // Get free key from https://serpapi.com/

var imageContainer = document.getElementById("image");
var searchbar = document.querySelector(".search");
var message = document.getElementById("message");

searchbar.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    message.style.display = "none";
    var searchQuery = searchbar.value.trim();
    if (searchQuery) {
      getImage(searchQuery);
    }
  }
});

const getImage = async (query) => {
  try {
    imageContainer.src = "../img/loading.gif";
    
    const response = await fetch(
      `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&tbm=isch&api_key=${SERP_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const data = await response.json();
    
    if (data.images_results && data.images_results.length > 0) {
      // Get the first image that has a good size
      const image = data.images_results.find(img => img.original_width > 400);
      if (image) {
        imageContainer.src = image.original;
      } else {
        imageContainer.src = data.images_results[0].original;
      }
    } else {
      throw new Error('No images found');
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    message.style.display = "block";
    message.textContent = "Failed to load image. Please try again.";
  }
};
