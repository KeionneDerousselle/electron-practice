
const video = require('../vendor/video');

function formatImgTag(doc, bytes){
    const div = doc.createElement('div');
    div.classList.add('photo');

    const close = doc.createElement('div');
    close.classList.add('photoClose');

    const img = new Image();
    img.classList.add('photoImg');
    img.src = bytes;

    div.appendChild(img);
    div.appendChild(close);
    
    return div;
}

window.addEventListener('DOMContentLoaded', () => {
    const videoEl = document.getElementById('video');
    const canvasEl = document.getElementById('canvas');
    const recordEl = document.getElementById('record');
    const photoEl = document.querySelector('.photosContainer');
    const counterEl = document.getElementById('counter');

    const canvasContext = canvasEl.getContext('2d');

    video.init(navigator, videoEl);

    recordEl.addEventListener('click', () => {
        const bytes = video.captureBytes(videoEl, canvasContext, canvasEl)
        photosEl.appendChild(formatImgTag(document, bytes));
    });
});