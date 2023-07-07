const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let isInitialLoad = true;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let initialCountLoad = 5;
let imagesCountAfterInitialLoad = 30;

const apiKey = '6kcVUDDNn-Xn06YN795rn72QjrK-1RD6LkoZ5036GGA';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCountLoad}`;

function updateApiUrlWithNewCount(count) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
}

function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log(imagesLoaded);
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener('load', imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();

    if (isInitialLoad) {
      updateApiUrlWithNewCount(imagesCountAfterInitialLoad);
      isInitialLoad = false;
    }
  } catch (error) {
    alert(error);
  }
}

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
