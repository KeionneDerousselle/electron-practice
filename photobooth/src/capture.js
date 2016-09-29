navigator.getUserMedia = navigator.webkitGetUserMedia

function handleSuccess(videoEl, stream)
{
    videoEl.src = window.URL.createObjectURL(stream);
}

function handleError(error){
    console.log('Camer error: ', error);
}

window.addEventListener('DOMContentLoaded', () => {
    const videoEl = document.getElementById('video');
    const canvasEl = document.getElementById('canvas');
    const recordEl = document.getElementById('record');
    const photoEl = document.querySelector('.photosContainer');
    const counterEl = document.getElementById('counter');

    const constraints = {
        audio: false,
        video:{
            mandatory:{
                minWidth: 853,
                minHeight: 480,
                maxWidth: 853,
                maxHeight: 480
            }
        }
    };

    navigator.getUserMedia(constraints, stream => handleSuccess(videoEl, stream), error => handleError(error));
});