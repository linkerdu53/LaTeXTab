import { IsStrsContains1Elt } from "./TableFusion.js"
import { UpdateInputSize } from "./TableInput.js"

const tdInputText = document.getElementsByClassName("tdInputText");

let tableSize = {row: 3, col: 3}

let tableMatrice = []
tableMatrice = TableToMatrice()

//Met les inputs à la bonne taille s'ils ont déjà du contenu au chargement de la page
UpdateInputSize(tdInputText);

function TableToMatrice() {
    let matrice = [];
    for (let i = 0; i < tableSize.row; i++) {
        matrice.push([]);
        for (let j = 0; j < tableSize.col; j++) {
            for (let k = 0; k < tdInputText.length; k++) {
                if (IsStrsContains1Elt(tdInputText[k].parentNode.dataset.row, (i+1).toString()) && IsStrsContains1Elt(tdInputText[k].parentNode.dataset.col, (j+1).toString())) {
                    matrice[i][j] = tdInputText[k]
                    break
                }
            }
        }
    }
    tableMatrice = matrice.slice()
    return tableMatrice
}

export { TableToMatrice, tableMatrice, tableSize }