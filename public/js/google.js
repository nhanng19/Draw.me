// Take search bar input and fetch image through our backend
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
      `/api/search-image?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const data = await response.json();
    
    if (data.imageUrl) {
      imageContainer.src = data.imageUrl;
    } else {
      throw new Error('No images found');
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    message.style.display = "block";
    message.textContent = "Failed to load image. Please try again.";
  }
};
