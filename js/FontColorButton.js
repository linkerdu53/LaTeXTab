import { GenerateToLatex } from './GenerateToLatex.js';
import { casesSelection } from './InputSelection.js';

window.addEventListener("load", startup, false);

const fontColorButton = document.getElementById("fontColor");
fontColorButton.addEventListener('click', function() {
    textColor()
})

const casesColorButton = document.getElementById("casesColor");
casesColorButton.addEventListener('click', function() {
    casesColor()
})

function startup() {
    let defaultColor = "#000000";
    let colorWell = document.getElementById("colorWell");
    let colorWell2 = document.getElementById("colorWell2");
    colorWell.value = defaultColor;
    colorWell.addEventListener("input", update, false);
    colorWell.select();
    colorWell2.value = defaultColor;
    colorWell2.addEventListener("input", update2, false);
    colorWell2.select();

}

function update(event) {
    if (fontColorButton) {
        fontColorButton.style.color = event.target.value;
        textColor()
    }
}

function update2(event) {
    if (casesColorButton) {
        casesColorButton.style.color = event.target.value;
        casesColor()
    }
}

function textColor() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.color = fontColorButton.style.color;
        casesSelection[i].style.borderColor = "";
        if (casesSelection[i].style.color == 'rgb(0, 0, 0)') {
            casesSelection[i].classList.remove("colorOn");
        }
        else {
            casesSelection[i].classList.add("colorOn");
        }
    }
    GenerateToLatex();
}

function casesColor() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.backgroundColor = casesColorButton.style.color;
        casesSelection[i].style.borderColor = "";
        if (casesSelection[i].style.backgroundColor == 'rgb(255, 255, 255)' || casesSelection[i].style.backgroundColor == "") {
            casesSelection[i].classList.remove("casesColorOn");
        }
        else {
            casesSelection[i].classList.add("casesColorOn");
        }
    }
    GenerateToLatex();
}