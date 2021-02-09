import { GenerateToLatex } from './GenerateToLatex.js';
import { casesSelection } from './InputSelection.js';

const fontColorButton = document.getElementById("fontColor");

var colorWell;
var defaultColor = "#0000ff";

window.addEventListener("load", startup, false);

function startup() {
    colorWell = document.getElementById("colorWell");
    colorWell.value = defaultColor;
    colorWell.addEventListener("input", update, false);
    colorWell.select();
}

function update(event) {
    if (fontColorButton) {
      fontColorButton.style.color = event.target.value;
    }
}

fontColorButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.color = fontColorButton.style.color;
    }
});