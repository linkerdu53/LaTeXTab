import { nextChar } from './GestionLettre.js'
import { AddEventInput } from './TableInput.js'
import { GenerateToLatex } from './GenerateToLatex.js'
import { CheckBordureAll } from './CheckBordure.js'
import { AddEventSelectColumn } from './TableSelectColumn.js'
import { AddEventSelectRow } from './TableSelectRow.js'
import { TableToMatrice, tableSize, tableMatrice } from './Table.js'

function AddColumn(colInsertNumber) {
    let eltTrHead = document.getElementById("trHead")
    let thHeadList = eltTrHead.children

    //Ajout <th scope="col"> dans <thead>
    let newth = document.createElement("th")
    newth.scope = 'col'
    newth.className = 'user-select-none contextMenu'
    //Tooltips
    newth.setAttribute("role", "button")
    newth.setAttribute("data-toggle", "tooltip")
    newth.setAttribute("data-placement", "top")
    newth.setAttribute("title", "Sélectioner la colonne")
    $(newth).tooltip()
    //Ajout Lettre
    newth.innerText = thHeadList[colInsertNumber + 1].innerText
    //Ajout event pour select la colonne
    AddEventSelectColumn(newth, colInsertNumber + 1)

    eltTrHead.insertBefore(newth, thHeadList[colInsertNumber + 1])

    //Mise à jour du dernier th scope="col" dans le thead
    thHeadList[1].innerText = 'A'
    for (let i = 2; i < thHeadList.length; i++) {
        thHeadList[i].innerText = nextChar(thHeadList[i - 1].innerText)
    }

    //+1 pour les valeurs des dataset.col >= à colInsertNumber
    updateData('col', colInsertNumber + 1)

    //Ajout <td><input type="text"></td> dans <tr>
    for (let i = 0; i < tableSize.row; i++) {
        const newTd = document.createElement("td")
        newTd.dataset.row = i + 1
        newTd.dataset.col = colInsertNumber + 1
        newTd.classList.add("tdMainTable")

        const newInput = document.createElement("input")
        newInput.type = 'text'
        newInput.classList.add("tdInputText")
        AddEventInput(newInput)

        newTd.appendChild(newInput)

        let tr = tableMatrice[i][0].parentElement.parentElement; //récupère tr[i]
        tr.insertBefore(newTd, tableMatrice[i][colInsertNumber - 1].parentElement.nextElementSibling)
    }

    //Mise à jour de colspan pour le dernier tr
    document.getElementById("lastTr").children[1].colSpan = tableSize.col + 1

    tableSize.col++

    TableToMatrice()

    CheckBordureAll()
}

function AddRow(rowInsertNumber) {
    let newtr = document.createElement("tr")
    //Création <th scope="row">
    let newth = document.createElement("th")
    newth.scope = 'row'
    newth.className = 'align-middle user-select-none contextMenu'
    newth.setAttribute("role", "button")
    //Tooltips
    newth.setAttribute("role", "button")
    newth.setAttribute("data-toggle", "tooltip")
    newth.setAttribute("data-placement", "left")
    newth.setAttribute("title", "Sélectioner la rangée")
    $(newth).tooltip()
    newth.innerText = rowInsertNumber + 1

    AddEventSelectRow(newth, rowInsertNumber + 1)
    
    newtr.appendChild(newth)

    //+1 pour les valeurs des dataset.row >= à rowInsertNumber
    updateData('row', rowInsertNumber + 1)

    //Ajout bon nombre de <td><input type="text"></td> dans <tr>
    for (let i = 0; i < tableSize.col; i++) {
        const newTd = document.createElement("td")
        newTd.dataset.row = rowInsertNumber + 1
        newTd.dataset.col = i + 1
        newTd.classList.add("tdMainTable")

        const newInput = document.createElement("input")
        newInput.type = 'text'
        newInput.classList.add("tdInputText")

        AddEventInput(newInput)

        newTd.appendChild(newInput)
        newtr.appendChild(newTd)
    }
    let trList = document.getElementById("bodyMainTable").children
    trList[0].parentElement.insertBefore(newtr, trList[rowInsertNumber])
    
    //Mise à jour de rowspan pour le dernier td du premier tr de tbody
    tableMatrice[0][tableSize.col - 1].parentElement.nextElementSibling.rowSpan = tableSize.row + 1

    //Mise à jour des nombres des th des tr
    for (let i = 0; i < trList.length; i++) {
        trList[i].children[0].innerText = i + 1
    }
    
    tableSize.row++

    TableToMatrice()

    CheckBordureAll()
}

function updateData(insertionType, insertNumber) {
    for (let i = 0; i < tableSize.row; i++) {
        for (let j = 0; j < tableSize.col; j++) {
            //Test type d'insertion
            if (insertionType == 'row') {
                //Pour chaque ligne, on test si dataset.row contient un nombre > insertNumber dans se cas +1 sinon rien
                let row = tableMatrice[i][j].parentNode.dataset.row.split(" ").map(Number)
                //Si case fusionnée alors +1 seulement quand rendu à la dernière ligne de la case fusionnée
                if (row[row.length - 1] == i + 1) {
                    for (let k = 0; k < row.length; k++) {
                        if (row[k] >= insertNumber) {
                            row[k]++
                        }
                    }
                    tableMatrice[i][j].parentNode.dataset.row = row.join(" ")
                }
            }
            else {
                //Pour chaque colonne, on test si dataset.col contient un nombre > insertNumber dans se cas +1 sinon rien
                let col = tableMatrice[i][j].parentNode.dataset.col.split(" ").map(Number)
                //Si case fusionnée alors +1 seulement quand rendu à la dernière colonne de la case fusionnée
                if (col[col.length - 1] == j + 1) {
                    for (let k = 0; k < col.length; k++) {
                        if (col[k] >= insertNumber) {
                            col[k]++
                        }
                    }
                    tableMatrice[i][j].parentNode.dataset.col = col.join(" ")
                }
            }
        }
    }
}

function SupprColumn(colRemoveNumber) {
    let thHeadList = document.getElementById("trHead").children
    //Suppression avant dernier <th>
    thHeadList[colRemoveNumber + 1].remove()
    //Mise à jour lettre des <th>
    thHeadList[1].innerText = 'A'
    for (let i = 2; i < thHeadList.length; i++) {
        thHeadList[i].innerText = nextChar(thHeadList[i - 1].innerText)
    }
    //Suppression des <td> de la colonne
    for (let i = 0; i < tableSize.row; i++) {
        tableMatrice[i][colRemoveNumber].parentElement.remove()
    }
    //Mise à jour de colspan pour le dernier tr
    document.getElementById("lastTr").children[1].colSpan = tableSize.col - 1

    tableSize.col--

    TableToMatrice()
}

function SupprRow(rowRemoveNumber) {
    let trList = document.getElementById("bodyMainTable").children
    //Suppression <tr> avant lastTr
    trList[rowRemoveNumber].remove()

    //Mise à jour des nombres des th des tr
    for (let i = 0; i < trList.length; i++) {
        trList[i].children[0].innerText = i + 1
    }

    //Mise à jour de rowspan pour le dernier td du premier tr de tbody
    tableMatrice[0][tableSize.col - 1].parentElement.nextElementSibling.rowSpan = tableSize.row - 1

    tableSize.row--

    TableToMatrice()
}

let buttonAddColumn = document.getElementById('button-add-column')
let buttonAddRow = document.getElementById('button-add-row')
  
buttonAddColumn.addEventListener('click', function() {
    AddColumn(tableSize.col)
    GenerateToLatex()
})
buttonAddRow.addEventListener('click', function() {
    AddRow(tableSize.row)
    GenerateToLatex()
})

export { AddColumn, AddRow, SupprColumn, SupprRow }