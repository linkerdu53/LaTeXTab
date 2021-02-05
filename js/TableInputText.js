import { GenerateToLatex } from './GenerateToLatex.js';
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
        }
    }
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
        }
    }
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
        }
    }
    GenerateToLatex();
});


textLeftButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.textAlign = "left";
    }
    GenerateToLatex();
});

textCenterButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.textAlign = "center";
    }
    GenerateToLatex();
});

textRightButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.textAlign = "right";
    }
    GenerateToLatex();
});


