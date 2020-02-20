'use strict';

const video = document.querySelector('video');
const playBtn = document.querySelector('.fa-play');
const pauseBtn = document.querySelector('.fa-pause');
const volume = document.querySelector('.volume');
const timing = document.querySelector('.timing');
const currentTimeEl = document.querySelector('.currentTime');

let progressId = null;
let wasVideoPlaying = false;
window.addEventListener('load', function () {
    timing.min = 0;
    timing.max = video.duration;
});

pauseBtn.addEventListener('click', function () {
    if (!video.paused) {
        video.pause();
        clearInterval(progressId);
    }
});

playBtn.addEventListener('click', function () {
    if (video.paused) {
        video.play();
        progressId = setInterval(changeProgress, 100);
    }
});

timing.addEventListener('change', function () {
    video.currentTime = timing.value;
    if(wasVideoPlaying) {
        video.play();
        progressId = setInterval(changeProgress, 100);
    } else {
        changeProgress();
    }
});

timing.addEventListener('mousedown', function(event) {
    clearInterval(progressId);
    wasVideoPlaying = !video.paused;
    if (wasVideoPlaying) {
        video.pause();
    }
});

function changeProgress() {
    timing.value = video.currentTime;
    currentTimeEl.innerText = video.currentTime;
}

video.addEventListener('ended', () => {
    clearInterval(progressId);
})

volume.addEventListener('change', () => {
    video.volume = volume.value;
})