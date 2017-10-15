let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(timerLength){
    clearInterval(countdown);
    let currentTime = Date.now()
    let endTime = currentTime + timerLength * 1000;// Convert seconds to milliseconds
    displayTimeLeft(timerLength);
    displayEndTime(endTime);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((endTime - Date.now()) / 1000);

        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000); // Run every seconds
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(milliseconds){

    let endTime = new Date(milliseconds);
    let hours = endTime.getHours();
    let minutes = endTime.getMinutes();
    let seconds = endTime.getSeconds();
    endTimeDisplay.textContent = `Be back at: ${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds  < 10 ? '0' : ''}${seconds}`;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer ));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins*60);
    this.reset(); // Reset form / input
})