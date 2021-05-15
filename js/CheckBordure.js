import { tableMatrice } from './Table.js';
import { tableSize } from "./Table.js";

//Check la bordure gauche de la case à droite de input
function CheckBordureRight(input) {
    let dataRow = input.parentNode.dataset.row.split(" ").map(Number)
    let dataCol = input.parentNode.dataset.col.split(" ").map(Number)
    //On ne test pas si input est sur la colonne la plus à droite
    if (dataCol[dataCol.length - 1] !== tableSize.col) {
        let matrice = tableMatrice
        for (let i = 0; i < dataRow.length; i++) {
            let inputDroit = matrice[dataRow[i] - 1][dataCol[dataCol.length - 1]]
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
                }
            }
        }
    }
}

//Check la bordure droite de la case à gauche de input
function CheckBordureLeft(input) {
    let dataRow = input.parentNode.dataset.row.split(" ").map(Number)
    let dataCol = input.parentNode.dataset.col.split(" ").map(Number)
    //On ne test pas si input est sur la colonne la plus à gauche
    if (dataCol[0] !== 1) {
        let matrice = tableMatrice
        for (let i = 0; i < dataRow.length; i++) {
            let inputGauche = matrice[dataRow[i] - 1][dataCol[0] - 2]        
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
                }
            }
        }
    }
}

//Check la bordure du bas de la case au dessus de input
function CheckBordureTop(input) {
    let dataRow = input.parentNode.dataset.row.split(" ").map(Number)
    let dataCol = input.parentNode.dataset.col.split(" ").map(Number)
    //On ne test pas si input est sur la première ligne
    if (dataRow[0] !== 1) {
        let matrice = tableMatrice
        for (let i = 0; i < dataCol.length; i++) {
            let inputDessus = matrice[dataRow[0] - 2][dataCol[i] - 1]
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
                }
            }
        }
    }
}

//Check la bordure du haut de la case en dessous de input
function CheckBordureBottom(input) {
    let dataRow = input.parentNode.dataset.row.split(" ").map(Number)
    let dataCol = input.parentNode.dataset.col.split(" ").map(Number)
    //On ne test pas si input est sur la dernière ligne
    if (dataRow[dataRow.length - 1] !== tableSize.row) {
        let matrice = tableMatrice
        for (let i = 0; i < dataCol.length; i++) {
            let inputDessous = matrice[dataRow[dataRow.length - 1]][dataCol[i] - 1]
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
                }
            }
        }
    }
}

function CheckBordureAll() {
    for (let i = 0; i < tableSize.row; i++) {
        for (let j = 0; j < tableSize.col; j++) {
            //Check la bordure gauche de la case à droite de tableMatrice[i][j]
            CheckBordureRight(tableMatrice[i][j])
            //Check la bordure droite de la case à gauche de tableMatrice[i][j]
            CheckBordureLeft(tableMatrice[i][j])
            //Check la bordure du bas de la case au dessus de tableMatrice[i][j]
            CheckBordureTop(tableMatrice[i][j])
            //Check la bordure du haut de la case en dessous de tableMatrice[i][j]
            CheckBordureBottom(tableMatrice[i][j])
        }
    }
}

export { CheckBordureRight, CheckBordureLeft, CheckBordureTop, CheckBordureBottom, CheckBordureAll};