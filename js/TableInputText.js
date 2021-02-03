import { casesSelection } from './InputSelection.js';


const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlineButton = document.getElementById("underline");
const textLeftButton = document.getElementById("text-left");
const textCenterButton = document.getElementById("text-center");
const textRightButton = document.getElementById("text-right");
const borderAllButton = document.getElementById("border-all");
const borderLeftButton = document.getElementById("border-left");
const borderRightButton = document.getElementById("border-right");
const borderBottomButton = document.getElementById("border-bottom");
const borderTopButton = document.getElementById("border-top");
const copyButton = document.getElementById("copyButton");


boldButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.fontWeight == "bold") {
            casesSelection[i].style.fontWeight = "normal";
            casesSelection[i].classList.remove("boldOn");
        } else {
            casesSelection[i].style.fontWeight = "bold";
            casesSelection[i].classList.add("boldOn");
        }
    }
});

italicButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.fontStyle == "italic") {
            casesSelection[i].style.fontStyle = "normal";
            casesSelection[i].classList.remove("italicOn");
        } else {
            casesSelection[i].style.fontStyle = "italic";
            casesSelection[i].classList.add("italicOn");
        }
    }
});

underlineButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.textDecoration == "underline") {
            casesSelection[i].style.textDecoration = "inherit";
            casesSelection[i].classList.remove("underlineOn");
        } else {
            casesSelection[i].style.textDecoration = "underline";
            casesSelection[i].classList.add("underlineOn");
        }
    }
});


textLeftButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.textAlign = "left";
        casesSelection[i].classList.add("alignLeftOn");
        casesSelection[i].classList.remove("alignRightOn");
        casesSelection[i].classList.remove("alignCenterOn");
    }
});

textCenterButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.textAlign = "center";
        casesSelection[i].classList.add("alignCenterOn");
        casesSelection[i].classList.remove("alignRightOn");
         casesSelection[i].classList.remove("alignLeftOn");
    }
});

textRightButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.textAlign = "right";
        casesSelection[i].classList.add("alignRightOn");
        casesSelection[i].classList.remove("alignCenterOn");
        casesSelection[i].classList.remove("alignLeftOn");
    }
});

borderAllButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.border == "medium solid") {
            casesSelection[i].style.border = "none";
            casesSelection[i].classList.remove("borderLeftOn");
            casesSelection[i].classList.remove("borderRightOn");
            casesSelection[i].classList.remove("borderTopOn");
            casesSelection[i].classList.remove("borderBottomOn");
        } else {
            casesSelection[i].style.border = "solid";
            casesSelection[i].classList.add("borderLeftOn");
            casesSelection[i].classList.add("borderRightOn");
            casesSelection[i].classList.add("borderTopOn");
            casesSelection[i].classList.add("borderBottomOn");
        }
    }
});

borderLeftButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderLeft == "medium solid") {
            casesSelection[i].style.borderLeft = "none";
            casesSelection[i].classList.remove("borderLeftOn");
        } else {
            casesSelection[i].style.borderLeft = "solid";
            casesSelection[i].classList.add("borderLeftOn");
        }
    }
});

borderRightButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderRight == "medium solid") {
            casesSelection[i].style.borderRight = "none";
            casesSelection[i].classList.remove("borderRightOn");
        } else {
            casesSelection[i].style.borderRight = "solid";
            casesSelection[i].classList.add("borderRightOn");
        }
    }
});

borderTopButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderTop == "medium solid") {
            casesSelection[i].style.borderTop = "none";
            casesSelection[i].classList.remove("borderTopOn");
        } else {
            casesSelection[i].style.borderTop = "solid";
            casesSelection[i].classList.add("borderTopOn");
        }
    }
});

borderBottomButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderBottom == "medium solid") {
            casesSelection[i].style.borderBottom = "none";
            casesSelection[i].classList.remove("borderBottomOn");
        } else {
            casesSelection[i].style.borderBottom = "solid";
            casesSelection[i].classList.add("borderBottomOn");
        }
    }
});


