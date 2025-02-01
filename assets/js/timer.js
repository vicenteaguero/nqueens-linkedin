// assets/js/timer.js

let timerInterval;
let seconds = 0;

function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const remainingSeconds = sec % 60;
    return (minutes < 10 ? "0" : "") + minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}

function startTimer() {
    seconds = 0;
    document.getElementById("timer-display").textContent = formatTime(seconds);
    timerInterval = setInterval(() => {
        seconds++;
        document.getElementById("timer-display").textContent = formatTime(seconds);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Disable any interaction with the board
function blockBoard() {
    const table = document.querySelector("table.board");
    if (table) {
        table.style.pointerEvents = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generate-button");

    // Start timer when "Generate" is clicked
    generateButton.addEventListener("click", () => {
        stopTimer(); // clear any existing timer
        startTimer();
    });

    // Observe changes to the "solved" element
    const solvedElement = document.getElementById("solved");
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type === "childList") {
                if (mutation.target.textContent.includes("Congratulations!")) {
                    stopTimer();
                    blockBoard();
                }
            }
        }
    });

    observer.observe(solvedElement, { childList: true });
});