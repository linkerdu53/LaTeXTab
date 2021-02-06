import { GenerateToLatex } from './GenerateToLatex.js';
import { casesSelection } from './InputSelection.js';
import { InputAutoSize } from './TableInput.js';

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
    let cpt = 0;
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.fontWeight == "bold"){
            cpt++;
        }
        if (cpt == casesSelection.length){
            cpt = 0;
        }
    }
    
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.fontWeight == "bold") {
            if (cpt == 0) {
                casesSelection[i].style.fontWeight = "normal";
            }
            else {
                casesSelection[i].style.fontWeight = "bold";
            }
        } else {
            casesSelection[i].style.fontWeight = "bold";
            casesSelection[i].classList.add("boldOn");
        }
    }
    UpdateInputSize();

    GenerateToLatex();
});

italicButton.addEventListener('click', function() {
    let cpt = 0;
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.fontStyle == "italic"){
            cpt++;
        }
        if (cpt == casesSelection.length){
            cpt = 0;
        }
    }
    
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.fontStyle == "italic") {
            if (cpt == 0) {
                casesSelection[i].style.fontStyle = "normal";
            }
            else {
                casesSelection[i].style.fontStyle = "italic";
            }
        } else {
            casesSelection[i].style.fontStyle = "italic";
            casesSelection[i].classList.add("italicOn");
        }
    }
    UpdateInputSize();

    GenerateToLatex();
});

underlineButton.addEventListener('click', function() {
    let cpt = 0;
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.textDecoration == "underline"){
            cpt++;
        }
        if (cpt == casesSelection.length){
            cpt = 0;
        }
    }
    
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.textDecoration == "underline") {
            if (cpt == 0) {
                casesSelection[i].style.textDecoration = "inherit";
            }
            else {
                casesSelection[i].style.textDecoration = "underline";
            }
        } else {
            casesSelection[i].style.textDecoration = "underline";
            casesSelection[i].classList.add("underlineOn");
        }
    }
    UpdateInputSize();

    GenerateToLatex();
});

textLeftButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.textAlign = "left";
        casesSelection[i].classList.add("alignLeftOn");
        casesSelection[i].classList.remove("alignRightOn");
        casesSelection[i].classList.remove("alignCenterOn");
    }
    GenerateToLatex();
});

textCenterButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.textAlign = "center";
        casesSelection[i].classList.add("alignCenterOn");
        casesSelection[i].classList.remove("alignRightOn");
         casesSelection[i].classList.remove("alignLeftOn");
    }
    GenerateToLatex();
});

textRightButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.textAlign = "right";
        casesSelection[i].classList.add("alignRightOn");
        casesSelection[i].classList.remove("alignCenterOn");
        casesSelection[i].classList.remove("alignLeftOn");
    }
    GenerateToLatex();
});

borderAllButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.border == "medium solid") {
            casesSelection[i].style.border = "";
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
    GenerateToLatex();
});

borderLeftButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderLeft == "medium solid") {
            casesSelection[i].style.borderLeft = "";
            casesSelection[i].classList.remove("borderLeftOn");
        } else {
            casesSelection[i].style.borderLeft = "solid";
            casesSelection[i].classList.add("borderLeftOn");
        }
    }
    GenerateToLatex();
});

borderRightButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderRight == "medium solid") {
            casesSelection[i].style.borderRight = "";
            casesSelection[i].classList.remove("borderRightOn");
        } else {
            casesSelection[i].style.borderRight = "solid";
            casesSelection[i].classList.add("borderRightOn");
        }
    }
    GenerateToLatex();
});

borderTopButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderTop == "medium solid") {
            casesSelection[i].style.borderTop = "";
            casesSelection[i].classList.remove("borderTopOn");
        } else {
            casesSelection[i].style.borderTop = "solid";
            casesSelection[i].classList.add("borderTopOn");
        }
    }
    GenerateToLatex();
});

borderBottomButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderBottom == "medium solid") {
            casesSelection[i].style.borderBottom = "";
            casesSelection[i].classList.remove("borderBottomOn");
        } else {
            casesSelection[i].style.borderBottom = "solid";
            casesSelection[i].classList.add("borderBottomOn");
        }
    }
    GenerateToLatex();
});

function UpdateInputSize() {
    for (let i = 0; i < casesSelection.length; i++) {
        InputAutoSize(casesSelection[i]);
    }
}