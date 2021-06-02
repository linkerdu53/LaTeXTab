import { AddEventInput } from "./TableInput.js"

const tdInputText = document.getElementsByClassName("tdInputText");

let tableSize = {row: 3, col: 3}

let tableMatrice = []
tableMatrice = TableToMatrice()

//Init les events focus, input, blur et quand ctrl sur les 9 inputs de base
for (let i = 0; i < tableSize.row; i++) {
    for (let j = 0; j < tableSize.col; j++) {
        AddEventInput(tableMatrice[i][j])
    }  
}

function TableToMatrice() {
    let matrice = [];
    for (let i = 0; i < tableSize.row; i++) {
        matrice.push([]);
        for (let j = 0; j < tableSize.col; j++) {
            for (let k = 0; k < tdInputText.length; k++) {
                if (IsStringContain1Number(tdInputText[k].parentNode.dataset.row, i + 1) && IsStringContain1Number(tdInputText[k].parentNode.dataset.col, j + 1)) {
                    matrice[i][j] = tdInputText[k]
                    break
                }
            }
        }
    }
    tableMatrice = matrice.slice()
    return tableMatrice
}

function IsStringContain1Number(str, nb) {
    if (str.split(' ').map( Number ).some(strnb => strnb == nb)) {
        return true
    } else {
        return false
    }
}

export { TableToMatrice, tableMatrice, tableSize }