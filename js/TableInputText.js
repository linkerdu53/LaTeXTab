import { GenerateToLatex, OverviewLatex } from './GenerateToLatex.js';
import { casesSelection, DeselectAllInput } from './InputSelection.js';
import { InputAutoSize } from './TableInput.js';
import { CheckBordureRight, CheckBordureLeft, CheckBordureTop, CheckBordureBottom, CheckBordureAll } from './CheckBordure.js';
import { Fusion } from './TableFusion.js'
import { Split } from './TableSplit.js'
import { CleanSelectedInputs } from './CleanInput.js';

const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlineButton = document.getElementById("underline");
const textLeftButton = document.getElementById("text-left");
const textCenterButton = document.getElementById("text-center");
const textRightButton = document.getElementById("text-right");
const fusionButton = document.getElementById("fusion");
const splitButton = document.getElementById("split");
const borderAllButton = document.getElementById("border-all");
const borderLeftButton = document.getElementById("border-left");
const borderRightButton = document.getElementById("border-right");
const borderBottomButton = document.getElementById("border-bottom");
const borderTopButton = document.getElementById("border-top");
const copyButton = document.getElementById("copyButton");
const affichagePDF = document.getElementById('boutonPDF');
const cleanCases = document.getElementById('clean-input');
const modeMath = document.getElementById('mode-math');

//Active les tooltips sur tous les boutons
$(function () {
    $('[data-toggle="tooltip').tooltip();
});

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
                casesSelection[i].classList.remove("boldOn");
            }
            else {
                casesSelection[i].style.fontWeight = "bold";
                casesSelection[i].classList.add("boldOn");
            }
        } else {
            casesSelection[i].style.fontWeight = "bold";
            casesSelection[i].classList.add("boldOn");
        }
    }
    InputAutoSize();

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
                casesSelection[i].classList.remove("italicOn");
            }
            else {
                casesSelection[i].style.fontStyle = "italic";
                casesSelection[i].classList.add("italicOn");
            }
        } else {
            casesSelection[i].style.fontStyle = "italic";
            casesSelection[i].classList.add("italicOn");
        }
    }
    InputAutoSize();

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
                casesSelection[i].classList.remove("underlineOn");
            }
            else {
                casesSelection[i].style.textDecoration = "underline";
                casesSelection[i].classList.add("underlineOn");
            }
        } else {
            casesSelection[i].style.textDecoration = "underline";
            casesSelection[i].classList.add("underlineOn");
        }
    }
    InputAutoSize();

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

fusionButton.addEventListener('click', function() {
    Fusion();
    GenerateToLatex();
});

splitButton.addEventListener('click', function() {
    Split();
    GenerateToLatex();
});

borderAllButton.addEventListener('click', function() {
    let cpt = 0;
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.border == "medium solid"){
            cpt++;
        }
        if (cpt == casesSelection.length){
            cpt = 0;
        }
    }
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.border == "medium solid") {
            if (cpt == 0) {
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
        } else {
            casesSelection[i].style.border = "solid";
            casesSelection[i].classList.add("borderLeftOn");
            casesSelection[i].classList.add("borderRightOn");
            casesSelection[i].classList.add("borderTopOn");
            casesSelection[i].classList.add("borderBottomOn");
        }
    }
    CheckBordureAll();

    GenerateToLatex();
});

borderLeftButton.addEventListener('click', function() {
    let cpt = 0;
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderLeft == "medium solid"){
            cpt++;
        }
        if (cpt == casesSelection.length){
            cpt = 0;
        }
    }
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderLeft == "medium solid") {
            if (cpt == 0) {
                casesSelection[i].style.borderLeft = "";
                casesSelection[i].classList.remove("borderLeftOn");
            } else {
                casesSelection[i].style.borderLeft = "solid";
                casesSelection[i].classList.add("borderLeftOn");
            }
        } else {
            casesSelection[i].style.borderLeft = "solid";
            casesSelection[i].classList.add("borderLeftOn");
        }
        CheckBordureLeft(casesSelection[i]);
    }
    GenerateToLatex();
});

borderRightButton.addEventListener('click', function() {
    let cpt = 0;
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderRight == "medium solid"){
            cpt++;
        }
        if (cpt == casesSelection.length){
            cpt = 0;
        }
    }
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderRight == "medium solid") {
            if (cpt == 0) {
                casesSelection[i].style.borderRight = "";
                casesSelection[i].classList.remove("borderRightOn");
               
            } else {
                casesSelection[i].style.borderRight = "solid";
                casesSelection[i].classList.add("borderRightOn");
            }
            
        } else {
            casesSelection[i].style.borderRight = "solid";
            casesSelection[i].classList.add("borderRightOn");
        }
        CheckBordureRight(casesSelection[i]);
    }
    GenerateToLatex();
});

borderTopButton.addEventListener('click', function() {
    let cpt = 0;
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderTop == "medium solid"){
            cpt++;
        }
        if (cpt == casesSelection.length){
            cpt = 0;
        }
    }
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderTop == "medium solid") {
            if (cpt == 0) {
                casesSelection[i].style.borderTop = "";
                casesSelection[i].classList.remove("borderTopOn");
            } else {
                casesSelection[i].style.borderTop = "solid";
                casesSelection[i].classList.add("borderTopOn");
            }
        } else {
            casesSelection[i].style.borderTop = "solid";
            casesSelection[i].classList.add("borderTopOn");
        }
        CheckBordureTop(casesSelection[i]);
    }
    GenerateToLatex();
});

borderBottomButton.addEventListener('click', function() {
    let cpt = 0;
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderBottom == "medium solid"){
            cpt++;
        }
        if (cpt == casesSelection.length){
            cpt = 0;
        }
    }
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.borderBottom == "medium solid") {
            if (cpt == 0) {
                casesSelection[i].style.borderBottom = "";
                casesSelection[i].classList.remove("borderBottomOn");
            } else {
                casesSelection[i].style.borderBottom = "solid";
                casesSelection[i].classList.add("borderBottomOn");
            }
        } else {
            casesSelection[i].style.borderBottom = "solid";
            casesSelection[i].classList.add("borderBottomOn");
        }
        CheckBordureBottom(casesSelection[i]);
    }
    GenerateToLatex();
});

modeMath.addEventListener('click', function() {
    let cpt = 0;
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].classList.contains("modeMathOn")) {
            cpt++;
        }
        if (cpt == casesSelection.length){
            cpt = 0;
        }
    }
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].classList.contains("modeMathOn")) {
            if (cpt == 0) {
                casesSelection[i].classList.remove("modeMathOn");
            } else {
                casesSelection[i].classList.add("modeMathOn");
            }
        } else {
            casesSelection[i].classList.add("modeMathOn");
        }
    }
    GenerateToLatex();
});

copyButton.addEventListener('click', function() {
    const textToCopy = document.getElementById("to-copy");
    textToCopy.select();
	document.execCommand('copy');
	return false;
});

affichagePDF.addEventListener('click', function() {
    OverviewLatex();
});

cleanCases.addEventListener('click', function() {
    CleanSelectedInputs();
    DeselectAllInput();
    GenerateToLatex();
});

