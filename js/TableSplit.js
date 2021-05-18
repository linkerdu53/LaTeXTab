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
                let eltBeforeInsert = null
                //On cherche le td que l'on va utiliser pour insérer avant celui-ci
                //On parcours les cases de la même ligne à la recherche de la case qui contient la colonne suivante de la case fusionnée dès qu'elle est trouvée on arrêt
                for (let jcol = 0; jcol < tableSize.col; jcol++) {
                    let inputCol = tableMatrice[dataRow[j] - 1][jcol].parentElement.dataset.col.split(" ").map(Number)
                    //On vérifie aussi que la case trouvée n'est pas une case fusionnée et car si c'est le cas elle n'appartient peut etre pas à ligne
                    if (inputCol[0] > dataCol[dataCol.length - 1] && tableMatrice[dataRow[j] - 1][jcol].parentElement.dataset.row.length == 1) {
                        eltBeforeInsert = tableMatrice[dataRow[j] - 1][jcol].parentElement
                        break
                    }
                }
                //Cas de la première ligne (<tr>) du tableau qui contient le <td> "+" pour ajouter une colonne
                //Et que la case fusionnée prend le dernier input de la ligne
                if (dataRow[j] == 1 && eltBeforeInsert == null) {
                    //On récupère la case "+"
                    eltBeforeInsert = tableMatrice[0][tableSize.col - 1].parentElement.nextElementSibling
                }
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