"use strict";

window.EVT = new EventEmitter2();
var testWrapper = document.querySelector(".test-wrapper");
var testArea = document.querySelector("#test-area");
var originText = document.querySelector("#origin-text p").innerHTML;
var resetButton = document.querySelector("#reset");
var theTimer = document.querySelector(".timer");
var timer = [0, 0, 0, 0];
var intervalId;
var timerRunning = false;
/* Utility */
// Add leading zero to numbers 9 or below (purely for aesthetics)
function leadingZero(time) {
    if (time < 9) {
        time = "0" + time;
    }
    return time;
}

/* Main */

// Run a standard minute/second/hundredths timer
function runTimer() {
    var currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor(timer[3] / 100 / 60); //minutes
    timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60); // seconds
    timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}
function doStart() {
    intervalId = setInterval(runTimer, 10);
}
EVT.on("start", doStart);
function keyPressHandle() {
    var textEnteredLength = this.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        EVT.emit("start");
    }
}
testArea.addEventListener("keypress", keyPressHandle, false);

function doStop() {
    clearInterval(intervalId);
}
EVT.on("stop", doStop);
// Match the text entered with the provided text on the page:
function spellCheck() {
    var textEntered = this.value;
    var originTextMatch = originText.substring(0, textEntered.length);

    if (textEntered == originText) {
        testWrapper.style.borderColor = "#429890";
        EVT.emit("stop");
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCF3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }
}
testArea.addEventListener("keyup", spellCheck, false);

// Reset everything:
function reset() {
    clearInterval(intervalId);
    intervalId = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}
resetButton.addEventListener("click", reset, false);