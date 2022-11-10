// ********************************* VARIABLES *********************************

const searchButton = document.querySelector('#searchButton');
const inputText = document.querySelector('#search-input');

const BASE_URL = 'https://api.flickr.com/services/rest?method=flickr.photos.search';
const API_KEY = '7d396033a49993d16e385cccdf052490';

// ********************************* FUNCTIONS *********************************

async function getPics(searchText) {
  try {
    const response = await fetch(
      `${BASE_URL}&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=20&text=${searchText}`
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

async function showPics() {
  removeAllPics();

  const picsData = await getPics(inputText.value);

  picsData.photos.photo.forEach((pic) => {
    const farmId = pic.farm;
    const serverId = pic.server;
    const id = pic.id;
    const secret = pic.secret;
    const imgSize = 'w';

    const imgUrl = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}_${imgSize}.jpg`;

    createPic(imgUrl);
  });
}

function createPic(imgUrl) {
  const picGallery = document.querySelector('.picture-gallery');
  const img = document.createElement('img');
  img.setAttribute('src', imgUrl);
  picGallery.append(img);
}

function removeAllPics() {
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    img.remove();
  });
}

function showMorePics(e) {
  showPics(e);
}

// ********************************* EVENT LISTENERS *********************************

searchButton.addEventListener('click', showPics);
