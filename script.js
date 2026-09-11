//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
const loading = document.createElement("div");
loading.id = "loading";
loading.innerText = "Loading...";
output.appendChild(loading);

const error = document.createElement("div");
error.id = "error";
output.appendChild(error);

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(`Failed to download image: ${url}`);
    };
    img.src = url;
  });
}
function downloadImages() {

  loading.style.display = "block";
  error.innerText = "";

  const promises = images.map(image => {
    return downloadImage(image.url);
  });

  Promise.all(promises)
    .then(downloadedImages => {

      loading.style.display = "none";

      downloadedImages.forEach(img => {
        output.appendChild(img);
      });

    })
    .catch(err => {

      loading.style.display = "none";
      error.innerText = err;

    });
}


downloadImages();
