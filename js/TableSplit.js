import { casesSelection, DeselectAllInput } from './InputSelection.js';
import { AddEventInput } from './TableInput.js';
import { TableToMatrice, tableMatrice, tableSize } from './Table.js'

function Split() {
    for (let i = 0; i < casesSelection.length; i++) {
        let dataRow = casesSelection[i].parentElement.dataset.row.split(" ").map(Number)
        let dataCol = casesSelection[i].parentElement.dataset.col.split(" ").map(Number)
        casesSelection[i].parentElement.removeAttribute("colSpan")
        casesSelection[i].parentElement.removeAttribute("rowSpan")
        casesSelection[i].parentElement.dataset.row = dataRow[0]
        casesSelection[i].parentElement.dataset.col = dataCol[0]
        for (let j = 0; j < dataRow.length; j++) {
            for (let k = 0; k < dataCol.length; k++) {
                const newInput = document.createElement("input")
                newInput.type = 'text'
                newInput.classList.add("tdInputText")
                newInput.style.minWidth = "20px"
                newInput.style.width = "30px"
                AddEventInput(newInput)

                if (k == 0) {
                    tableMatrice[dataRow[j] - 1][dataCol[k] - 1].parentElement.appendChild(newInput)
                }
                else {
                    const newTd = document.createElement("td")
                    newTd.classList.add("tdMainTable")
                    newTd.dataset.row = dataRow[j]
                    newTd.dataset.col = dataCol[k]
                    if (dataRow[j] == 1) {
                        tableMatrice[dataRow[j] - 1][dataCol[k] - 1].parentElement.parentElement.insertBefore(newTd, tableMatrice[dataRow[j] - 1][dataCol[k] - 1].parentElement.parentElement.lastElementChild)
                    }
                    else {
                        tableMatrice[dataRow[j] - 1][dataCol[k] - 1].parentElement.parentElement.appendChild(newTd)
                    }
                    newTd.appendChild(newInput)
                }
            }
        }
        casesSelection[i].remove()
    }


    //Toutes les cases sélectionnées sont retirées
    DeselectAllInput()

    //Mise à jour de la matrice du tableau
    TableToMatrice()
}

export { Split }