import { GenerateToLatex } from './GenerateToLatex.js';
import { casesSelection } from './InputSelection.js';
import { TableMatrice } from './Table.js';

const tdInputText = document.getElementsByClassName("tdInputText");

function CheckBordureRight(input) {
    let nbCol = parseInt(tdInputText[tdInputText.length - 1].parentNode.dataset.col);
    if (parseInt(input.parentNode.dataset.col) !== nbCol) {
        let inputDroit = tdInputText[(parseInt(input.parentNode.dataset.row) - 1) * nbCol + (parseInt(input.parentNode.dataset.col) + 1) - 1];
        if (!input.classList.contains("borderRightOn")) {
            if (inputDroit.classList.contains("borderLeftOn") && !inputDroit.classList.contains("selected")) {
                inputDroit.style.borderLeft = "";
                inputDroit.classList.remove("borderLeftOn");
            }
        }
        else if (!inputDroit.classList.contains("borderLeftOn")) {
            inputDroit.style.borderLeft = "solid";
            inputDroit.classList.add("borderLeftOn");
        }
    }
}

function CheckBordureLeft(input) {
    let nbCol = parseInt(tdInputText[tdInputText.length - 1].parentNode.dataset.col);
    if (parseInt(input.parentNode.dataset.col) !== 1) {
        let inputGauche = tdInputText[(parseInt(input.parentNode.dataset.row) - 1) * nbCol + (parseInt(input.parentNode.dataset.col) -1) - 1];
        if (!input.classList.contains("borderLeftOn")) {
            if (inputGauche.classList.contains("borderRightOn") && !inputGauche.classList.contains("selected")) {             
                inputGauche.style.borderRight = "";
                inputGauche.classList.remove("borderRightOn");
            }
        }
        else if (!inputGauche.classList.contains("borderRightOn")) {
            inputGauche.style.borderRight = "solid";
            inputGauche.classList.add("borderRightOn");
        }
    }
}

function CheckBordureTop(input) {
    let nbCol = parseInt(tdInputText[tdInputText.length - 1].parentNode.dataset.col);
    if (parseInt(input.parentNode.dataset.row) !== 1) {
        let inputDessus = tdInputText[(parseInt(input.parentNode.dataset.row) - 2) * nbCol + parseInt(input.parentNode.dataset.col) - 1];
        if (!input.classList.contains("borderTopOn")) {
            if (inputDessus.classList.contains("borderBottomOn") && !inputDessus.classList.contains("selected")) {             
                inputDessus.style.borderBottom = "";
                inputDessus.classList.remove("borderBottomOn");
            }
        }
        else if (!inputDessus.classList.contains("borderBottomOn")) {
            inputDessus.style.borderBottom = "solid";
            inputDessus.classList.add("borderBottomOn");
        }
    }
}

function CheckBordureBottom(input) {
    let nbCol = parseInt(tdInputText[tdInputText.length - 1].parentNode.dataset.col);
    let nbRow = parseInt(tdInputText[tdInputText.length - 1].parentNode.dataset.row);
    if (parseInt(input.parentNode.dataset.row) !== nbRow) {
        let inputDessous = tdInputText[parseInt(input.parentNode.dataset.row) * nbCol + parseInt(input.parentNode.dataset.col) - 1];
        let matrice = TableMatrice
        /*console.log(matrice)
        console.log("test")
        console.log(nbCol)
        console.log(nbRow)
        console.log(input.parentNode.dataset.row)
        console.log(input.parentNode.dataset.col)
        console.log(parseInt(input.parentNode.dataset.row) * nbCol + parseInt(input.parentNode.dataset.col) - 1)
        console.log(input.parentNode)
        console.log(inputDessous)*/
        if (!input.classList.contains("borderBottomOn")) {
            if (inputDessous.classList.contains("borderTopOn") && !inputDessous.classList.contains("selected")) {
                inputDessous.style.borderTop = "";
                inputDessous.classList.remove("borderTopOn");
            }
        }
        else if (!inputDessous.classList.contains("borderTopOn")) {
            inputDessous.style.borderTop = "solid";
            inputDessous.classList.add("borderTopOn");
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