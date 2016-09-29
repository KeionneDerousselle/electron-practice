const { ipcRenderer: ipc , shell, remote} = require('electron');

const countdown = require('./countdown');
const video = require('./video');
const flash = require('./flash');
const images = remote.require('./images');
const effects = require('./effects');

let canvasTarget;
let seriously;
let videoSrc;

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
    const photosEl = document.querySelector('.photosContainer');
    const counterEl = document.getElementById('counter');
    const flashEl = document.getElementById('flash');

    seriously = new Seriously();
    videoSrc = seriously.source('#video');
    canvasTarget = seriously.target('#canvas');
    effects.choose(seriously, videoSrc, canvasTarget, 'ascii');

    video.init(navigator, videoEl);

    recordEl.addEventListener('click', () => {
        countdown.start(counterEl, 3, () => {
            flash(flashEl);
            const bytes = video.captureBytesFromLiveCanvas(canvasEl);
            ipc.send('image-captured', bytes);
            photosEl.appendChild(formatImgTag(document, bytes));
        });
    });

    photosEl.addEventListener('click', event => {
        const removeImage = event.target.classList.contains('photoClose');
        const selector = removeImage ? '.photoClose' : '.photoImg';

        const photos = Array.from(document.querySelectorAll(selector));
        const index = photos.findIndex(el => el == event.target);

        if(index > -1){
            if(removeImage){
                ipc.send('image-remove', index);
            }
            else{
                shell.showItemInFolder(images.getFromCache(index))
            }
        }

    });
});

ipc.on('image-removed', (event, index) => {
    document.getElementById('photos').removeChild(Array.from(document.querySelectorAll('.photo'))[index]);
});