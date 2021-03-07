import { GenerateToLatex } from './GenerateToLatex.js';
import { casesSelection } from './InputSelection.js';

const tdInputText = document.getElementsByClassName("tdInputText");

function CheckBordureRight(input) {
    let nbCol = parseInt(tdInputText[tdInputText.length - 1].parentNode.dataset.col);
    if (parseInt(input.parentNode.dataset.col) !== nbCol) {
        let inputDroit = tdInputText[(parseInt(input.parentNode.dataset.row) - 1) * nbCol + (parseInt(input.parentNode.dataset.col) + 1) - 1];
        if (!input.classList.contains("borderRightOn")) {
            if (inputDroit.classList.contains("borderLeftOn")) {
                inputDroit.style.borderLeft = "";
                inputDroit.classList.remove("borderLeftOn");
            }
        }
        else {
            if (!inputDroit.classList.contains("borderLeftOn")) {
                inputDroit.style.borderLeft = "solid";
                inputDroit.classList.add("borderLeftOn");
            }
        }
    }
}

function CheckBordureLeft(input) {
    let nbCol = parseInt(tdInputText[tdInputText.length - 1].parentNode.dataset.col);
    if (parseInt(input.parentNode.dataset.col) !== 1) {
        let inputGauche = tdInputText[(parseInt(input.parentNode.dataset.row) - 1) * nbCol + (parseInt(input.parentNode.dataset.col) -1) - 1];
        if (!input.classList.contains("borderLeftOn")) {
            if (inputGauche.classList.contains("borderRightOn")) {             
                inputGauche.style.borderRight = "";
                inputGauche.classList.remove("borderRightOn");
            }
        }
        else {
            if (!inputGauche.classList.contains("borderRightOn")) {
                    inputGauche.style.borderRight = "solid";
                    inputGauche.classList.add("borderRightOn");
            }
        }
    }
}

function CheckBordureTop(input) {
    let nbCol = parseInt(tdInputText[tdInputText.length - 1].parentNode.dataset.col);
    if (parseInt(input.parentNode.dataset.row) !== 1) {
        let inputDessus = tdInputText[(parseInt(input.parentNode.dataset.row) - 2) * nbCol + parseInt(input.parentNode.dataset.col) - 1];
        if (!input.classList.contains("borderTopOn")) {
            if (inputDessus.classList.contains("borderBottomOn")) {             
                inputDessus.style.borderBottom = "";
                inputDessus.classList.remove("borderBottomOn");
            }
        }
        else {
            if (!inputDessus.classList.contains("borderBottomOn")) {
                inputDessus.style.borderBottom = "solid";
                inputDessus.classList.add("borderBottomOn");
            }
        }
    }
}

function CheckBordureBottom(input) {
    let nbCol = parseInt(tdInputText[tdInputText.length - 1].parentNode.dataset.col);
    let nbRow = parseInt(tdInputText[tdInputText.length - 1].parentNode.dataset.row);
    if (parseInt(input.parentNode.dataset.row) !== nbRow) {
        let inputDessous = tdInputText[parseInt(input.parentNode.dataset.row) * nbCol + parseInt(input.parentNode.dataset.col) - 1];
        if (!input.classList.contains("borderBottomOn")) {
            if (inputDessous.classList.contains("borderTopOn")) {
                inputDessous.style.borderTop = "";
                inputDessous.classList.remove("borderTopOn");
            }
        }
        else {
            if (!inputDessous.classList.contains("borderTopOn")) {
                inputDessous.style.borderTop = "solid";
                inputDessous.classList.add("borderTopOn");
            }
        }
    }
}

function CheckBordureAll() {
    for (let i = 0; i < casesSelection.length; i++) {
        //Check la bordure à gauche de la case à droite
        CheckBordureRight(casesSelection[i]);
        //Check la bordure droite de la case à gauche
        CheckBordureLeft(casesSelection[i]);
        //Check la bordure du bas de la case au dessus
        CheckBordureTop(casesSelection[i]);
        //Check la bordure du haut de la case en dessous
        CheckBordureBottom(casesSelection[i]);
    }
}

function CheckBordureClass() {
    for (let i = 0; i < tdInputText.length; i++) {
        if ((tdInputText[i].classList.contains("borderLeftOn")) && (tdInputText[i].classList.contains("borderRightOn")) && (tdInputText[i].classList.contains("borderTopOn")) && (tdInputText[i].classList.contains("borderBottomOn"))) {
            tdInputText[i].style.border = "solid";
        }
    }
}

export { CheckBordureRight, CheckBordureLeft, CheckBordureTop, CheckBordureBottom, CheckBordureAll, CheckBordureClass};