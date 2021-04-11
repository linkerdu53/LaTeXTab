import { GenerateToLatex } from './GenerateToLatex.js';
import { casesSelection } from './InputSelection.js';
import { tableMatrice } from './Table.js';
import { tableSize } from "./Table.js";

const tdInputText = document.getElementsByClassName("tdInputText");

//Check la bordure à gauche de la case à droite de la case tdInputText[i]
function CheckBordureRight(input) {
    if (parseInt(input.parentNode.dataset.col) !== tableSize.col) {
        let matrice = tableMatrice
        let inputDroit = matrice[parseInt(input.parentNode.dataset.row) - 1][parseInt(input.parentNode.dataset.col)]
        if (!inputDroit.classList.contains("selected") || ( inputDroit.classList.contains("selected") && input.classList.contains("selected") )) {
            if (!input.classList.contains("borderRightOn")) {
                if (inputDroit.classList.contains("borderLeftOn")) {
                    inputDroit.style.borderLeft = "";
                    inputDroit.classList.remove("borderLeftOn");
                }
            }
            else if (!inputDroit.classList.contains("borderLeftOn")) {
                inputDroit.style.borderLeft = "solid";
                inputDroit.classList.add("borderLeftOn");
                console.log("BordureDroit")
                console.log(inputDroit)
            }
        }
    }
}

//Check la bordure droite de la case à gauche de la case tdInputText[i]
function CheckBordureLeft(input) {
    if (parseInt(input.parentNode.dataset.col) !== 1) {
        let matrice = tableMatrice
        let inputGauche = matrice[parseInt(input.parentNode.dataset.row) - 1][parseInt(input.parentNode.dataset.col) - 2]        
        if (!inputGauche.classList.contains("selected") || ( inputGauche.classList.contains("selected") && input.classList.contains("selected") )) {
            if (!input.classList.contains("borderLeftOn")) {
                if (inputGauche.classList.contains("borderRightOn")) {             
                    inputGauche.style.borderRight = "";
                    inputGauche.classList.remove("borderRightOn");
                }
            }
            else if (!inputGauche.classList.contains("borderRightOn")) {
                inputGauche.style.borderRight = "solid";
                inputGauche.classList.add("borderRightOn");
                console.log("BordureGauche")
                console.log(inputGauche)
            }
        }
    }
}

//Check la bordure du bas de la case au dessus de la case tdInputText[i]
function CheckBordureTop(input) {
    if (parseInt(input.parentNode.dataset.row) !== 1) {
        let matrice = tableMatrice
        let inputDessus = matrice[parseInt(input.parentNode.dataset.row) - 2][parseInt(input.parentNode.dataset.col) - 1]
        if (!inputDessus.classList.contains("selected") || ( inputDessus.classList.contains("selected") && input.classList.contains("selected") )) {
            if (!input.classList.contains("borderTopOn")) {
                if (inputDessus.classList.contains("borderBottomOn")) {
                    inputDessus.style.borderBottom = "";
                    inputDessus.classList.remove("borderBottomOn");
                }
            }
            else if (!inputDessus.classList.contains("borderBottomOn")) {
                inputDessus.style.borderBottom = "solid";
                inputDessus.classList.add("borderBottomOn");
                console.log("BordureDessus")
                console.log(inputDessus)
            }
        }
    }
}

//Check la bordure du haut de la case en dessous de la case tdInputText[i]
function CheckBordureBottom(input) {
    if (parseInt(input.parentNode.dataset.row) !== tableSize.row) {
        let matrice = tableMatrice
        let inputDessous = matrice[parseInt(input.parentNode.dataset.row)][parseInt(input.parentNode.dataset.col) - 1]
        if (!inputDessous.classList.contains("selected") || ( inputDessous.classList.contains("selected") && input.classList.contains("selected") )) {
            if (!input.classList.contains("borderBottomOn")) {
                if (inputDessous.classList.contains("borderTopOn")) {
                    inputDessous.style.borderTop = "";
                    inputDessous.classList.remove("borderTopOn");
                }
            }
            else if (!inputDessous.classList.contains("borderTopOn")) {
                inputDessous.style.borderTop = "solid";
                inputDessous.classList.add("borderTopOn");
                console.log("BordureDessous")
                console.log(inputDessous)
            }
        }
    }
}

function CheckBordureAll() {
    for (let i = 0; i < tdInputText.length; i++) {
        //Check la bordure à gauche de la case à droite de la case tdInputText[i]
        CheckBordureRight(tdInputText[i]);
        //Check la bordure droite de la case à gauche de la case tdInputText[i]
        CheckBordureLeft(tdInputText[i]);
        //Check la bordure du bas de la case au dessus de la case tdInputText[i]
        CheckBordureTop(tdInputText[i]);
        //Check la bordure du haut de la case en dessous de la case tdInputText[i]
        CheckBordureBottom(tdInputText[i]);
    }
}

export { CheckBordureRight, CheckBordureLeft, CheckBordureTop, CheckBordureBottom, CheckBordureAll};