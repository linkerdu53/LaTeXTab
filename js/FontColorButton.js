import { GenerateToLatex } from './GenerateToLatex.js';
import { casesSelection } from './InputSelection.js';

window.addEventListener("load", startup, false);

const fontColorButton = document.getElementById("fontColor");
fontColorButton.addEventListener('click', function() {
    textColor()
})

function startup() {
    let defaultColor = "#000000";
    let colorWell = document.getElementById("colorWell");
    colorWell.value = defaultColor;
    colorWell.addEventListener("input", update, false);
    colorWell.select();
}

function update(event) {
    if (fontColorButton) {
        fontColorButton.style.color = event.target.value;
        textColor()
    }
}

function textColor() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.color = fontColorButton.style.color;
        casesSelection[i].style.borderColor = 'rgb(0, 0, 0)'
        if (casesSelection[i].style.color == 'rgb(0, 0, 0)') {
            casesSelection[i].classList.remove("colorOn");
        }
        else {
            casesSelection[i].classList.add("colorOn");
        }
    }
    GenerateToLatex();
}