"use strict";

var date = new Date();
var hr = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();

var hrPosition = hr * (360 / 12) + min * (360 / 60) / 12;
var minPosition = min * (360 / 60) + sec * (360 / 60) / 60;
var secPosition = sec * (360 / 60);

var HOURHAND_TRANSITION = document.querySelector(".clockbox.transition .hour");
var MINUTEHAND_TRANSITION = document.querySelector(".clockbox.transition .minute");
var SECONDHAND_TRANSITION = document.querySelector(".clockbox.transition .second");

var HOURHAND_NOTRANSITION = document.querySelector(".clockbox.notransition .hour");
var MINUTEHAND_NOTRANSITION = document.querySelector(".clockbox.notransition .minute");
var SECONDHAND_NOTRANSITION = document.querySelector(".clockbox.notransition .second");

var HOURHAND_TURNBACK = document.querySelector(".clockbox.turnback .hour");
var MINUTEHAND_TURNBACK = document.querySelector(".clockbox.turnback .minute");
var SECONDHAND_TURNBACK = document.querySelector(".clockbox.turnback .second");

function runTheClock_Normal() {
    hrPosition = hrPosition + 3 / 360; // (1/3600: ) * (360/12: 1step) 
    minPosition = minPosition + 6 / 60; // (1/60:) * (360/60: 1step)
    secPosition = secPosition + 360 / 60; //(360 degree / 60s : 1step)

    hourhand(hrPosition);
    minutehand(minPosition);
    secondhand(secPosition);
}

function hourhand(hrPosition) {
    HOURHAND_TRANSITION.style.transform = "rotate(" + hrPosition + "deg)";
    HOURHAND_NOTRANSITION.style.transform = "rotate(" + hrPosition + "deg)";
}

function minutehand(minPosition) {
    MINUTEHAND_TRANSITION.style.transform = "rotate(" + minPosition + "deg)";
    MINUTEHAND_NOTRANSITION.style.transform = "rotate(" + minPosition + "deg)";
}
function secondhand(secPosition) {
    SECONDHAND_TRANSITION.style.transform = "rotate(" + secPosition + "deg)";
    SECONDHAND_NOTRANSITION.style.transform = "rotate(" + secPosition + "deg)";
}

function runTheclock_TurnBack() {
    var date = new Date();
    var hr = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    var hrPosition = hr * (360 / 12) + min * (360 / 60) / 12;
    var minPosition = min * (360 / 60) + sec * (360 / 60) / 60;
    var secPosition = sec * (360 / 60);

    HOURHAND_TURNBACK.style.transform = "rotate(" + hrPosition + "deg)";
    MINUTEHAND_TURNBACK.style.transform = "rotate(" + minPosition + "deg)";
    SECONDHAND_TURNBACK.style.transform = "rotate(" + secPosition + "deg)";
}

var runTheClock = function runTheClock() {
    runTheClock_Normal();
    runTheclock_TurnBack();
};

var interval = setInterval(runTheClock, 1000);