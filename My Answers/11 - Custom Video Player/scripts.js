const video = document.querySelector(`video.viewer`);

const play = document.querySelector(`.player__button`);
const ranges = document.querySelectorAll(`.player__slider`);
const skipButtons = document.querySelectorAll(`[data-skip]`);
const progressFilled = document.querySelector(`.progress__filled`);
const progress = document.querySelector(`.progress`);
const fulscreen = document.querySelector(`.fullscreen_button`); 

function togglePlay(e){
    if(video.paused){ 
        video.play();
    }
    else{
        video.pause();
    }
}

function updateButton(e){
    const icon = this.paused ? `►` : `❚❚`;
    play.textContent = icon;
}

function handleRangeUpdate(e){
    video[this.name] = this.value;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress(e){
    const percent = ((video.currentTime / video.duration) * 100);
    progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function makeFullScreen(e){
    // go full-screen
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

play.addEventListener(`click`, togglePlay);
video.addEventListener(`click`, togglePlay);
video.addEventListener(`play`, updateButton);
video.addEventListener(`pause`, updateButton);
video.addEventListener(`timeupdate`, handleProgress);

ranges.forEach(range => range.addEventListener(`mousemove`, handleRangeUpdate));

let mousedown = false;
skipButtons.forEach(button => button.addEventListener(`click`, skip));
progress.addEventListener(`click`, scrub);
progress.addEventListener(`mousemove`,(e) => mousedown && scrub(e));
progress.addEventListener(`mousedown`, () => mousedown = true);
progress.addEventListener(`mouseup`, () => mousedown = false);

fulscreen.addEventListener(`click`, makeFullScreen);