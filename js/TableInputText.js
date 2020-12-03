import { casesSelection } from './InputSelection.js';


const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlineButton = document.getElementById("underline");
const textLeftButton = document.getElementById("text-left");
const textCenterButton = document.getElementById("text-center");
const textRightButton = document.getElementById("text-right");
const fontButton = document.getElementById("font");
const separateButton = document.getElementById("separate");
const fusionButton = document.getElementById("fusion");
const infoButton = document.getElementById("info");
const allButton = document.getElementById("all");


boldButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.fontWeight == "bold") {
            casesSelection[i].style.fontWeight = "normal";
        } else {
            casesSelection[i].style.fontWeight = "bold";
        }
    }
});

italicButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.fontStyle == "italic") {
            casesSelection[i].style.fontStyle = "normal";
        } else {
            casesSelection[i].style.fontStyle = "italic";
        }
    }
});

underlineButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.textDecoration == "underline") {
            casesSelection[i].style.textDecoration = "inherit";
        } else {
            casesSelection[i].style.textDecoration = "underline";
        }
    }
});


textLeftButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.textAlign = "left";
    }
});

textCenterButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.textAlign = "center";
    }
});

textRightButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.textAlign = "right";
    }
});

allButton.addEventListener('dblclick', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.textAlign = "right";
    }
});

