import { casesSelection, DeselectAllInput } from './InputSelection.js';
import { AddEventInput } from './TableInput.js';
import { TableToMatrice, tableMatrice, tableSize } from './Table.js'

function Split() {
    for (let i = 0; i < casesSelection.length; i++) {
        let dataRow = casesSelection[i].parentElement.dataset.row.split(" ").map(Number)
        let dataCol = casesSelection[i].parentElement.dataset.col.split(" ").map(Number)
        //La case sélectionnée n'est pas fusionnée
        if (dataRow.length > 1 || dataCol.length > 1) {
            casesSelection[i].parentElement.removeAttribute("colSpan")
            casesSelection[i].parentElement.removeAttribute("rowSpan")
            casesSelection[i].parentElement.dataset.row = dataRow[0]
            casesSelection[i].parentElement.dataset.col = dataCol[0]
            for (let j = 0; j < dataRow.length; j++) {
                //On récupère les lignes du tableau, à chaque itération on passe à la suivante
                let ligneInsert = document.getElementsByClassName('mainTable')[0].querySelectorAll("tr")[dataRow[j]]
                //Pour chaque ligne, on récupère la case adjacent droite pour insérer la/les case(s) avant
                console.log(ligneInsert)
                let eltBeforeInsert
                if (j == 0) {
                    eltBeforeInsert = ligneInsert.children[dataCol[0]].nextElementSibling
                }
                else {
                    eltBeforeInsert = ligneInsert.children[dataCol[0]]
                }
                console.log(dataCol[0])
                console.log(ligneInsert.children)
                console.log(ligneInsert.children[dataCol[0]])
                console.log(eltBeforeInsert)
                for (let k = 0; k < dataCol.length; k++) {
                    const newInput = document.createElement("input")
                    newInput.type = 'text'
                    newInput.classList.add("tdInputText")
                    newInput.style.minWidth = "20px"
                    newInput.style.width = "30px"
                    AddEventInput(newInput)

                    //Pour le 1er input on garde le td donc on insère juste
                    if (j == 0 && k == 0) {
                        tableMatrice[dataRow[0] - 1][dataCol[0] - 1].parentElement.appendChild(newInput)
                    }
                    else {
                        const newTd = document.createElement("td")
                        newTd.classList.add("tdMainTable")
                        newTd.dataset.row = dataRow[j]
                        newTd.dataset.col = dataCol[k]
                        newTd.appendChild(newInput)
                        ligneInsert.insertBefore(newTd, eltBeforeInsert)
                    }
                }
            }
            casesSelection[i].remove()
        }
    }
    //Toutes les cases sélectionnées sont retirées
    DeselectAllInput()

    //Mise à jour de la matrice du tableau
    TableToMatrice()
}

export { Split }