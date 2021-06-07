import { nextChar } from './GestionLettre.js'
import { AddEventInput } from './TableInput.js'
import { GenerateToLatex } from './GenerateToLatex.js'
import { CheckBordureAll } from './CheckBordure.js'
import { AddEventSelectColumn } from './TableSelectColumn.js'
import { AddEventSelectRow } from './TableSelectRow.js'
import { TableToMatrice, tableSize, tableMatrice } from './Table.js'

function AddColumn() {
    let eltTrHead = document.getElementById("trHead")
    let eltThLast = eltTrHead.children[eltTrHead.children.length - 1]

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
    newth.innerText = eltThLast.childNodes[0].nodeValue
    //Ajout event pour select la colonne
    AddEventSelectColumn(newth, tableSize.col + 1)

    eltTrHead.insertBefore(newth, eltThLast)

    //Mise à jour du dernier th scope="col" dans le thead
    eltThLast.childNodes[0].nodeValue = nextChar(eltThLast.childNodes[0].nodeValue)

    //Ajout <td><input type="text"></td> dans <tr>
    for (let i = 0; i < tableSize.row; i++) {
        const newTd = document.createElement("td")
        newTd.dataset.row = i + 1
        newTd.dataset.col = tableSize.col + 1
        newTd.classList.add("tdMainTable")

        const newInput = document.createElement("input")
        newInput.type = 'text'
        newInput.classList.add("tdInputText")
        AddEventInput(newInput)

        newTd.appendChild(newInput)

        let tr = tableMatrice[i][0].parentElement.parentElement; //récupère tr[i]
        if (i == 0) { //if car td de plus dans le premier tr car contient bouton pour ajouter
            tr.insertBefore(newTd, tableMatrice[i][tableSize.col - 1].parentElement.nextElementSibling)
        }
        else {
            tr.appendChild(newTd)
        }
    }
    //Mise à jour de colspan pour le dernier tr
    document.getElementById("lastTr").children[1].colSpan = tableSize.col + 1

    tableSize.col++

    TableToMatrice()

    CheckBordureAll()
}

function AddRow() {
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
    newth.innerText = tableSize.row + 1

    AddEventSelectRow(newth, tableSize.row + 1)
    
    newtr.appendChild(newth)

    //Ajout bon nombre de <td><input type="text"></td> dans <tr>
    for (let i = 0; i < tableSize.col; i++) {
        const newTd = document.createElement("td")
        newTd.dataset.row = tableSize.row + 1
        newTd.dataset.col = i + 1
        newTd.classList.add("tdMainTable")

        const newInput = document.createElement("input")
        newInput.type = 'text'
        newInput.classList.add("tdInputText")

        AddEventInput(newInput)

        newTd.appendChild(newInput)
        newtr.appendChild(newTd)
    }
    let lastTr = document.getElementById("lastTr")
    lastTr.parentElement.insertBefore(newtr, lastTr)
    //Mise à jour de rowspan pour le dernier td du premier tr de tbody
    tableMatrice[0][tableSize.col - 1].parentElement.nextElementSibling.rowSpan = tableSize.row + 1

    //Mise à jour du nombre pour le dernier th du dernier tr
    lastTr.childNodes[1].innerText = tableSize.row + 2
    
    tableSize.row++

    TableToMatrice()

    CheckBordureAll()
}

function SupprColumn() {
    let trHead = document.getElementById("trHead")
    //Suppression avant dernier <th>
    trHead.children[tableSize.col].remove()
    //Mise à jour lettre du dernier <th>
    trHead.children[tableSize.col].innerText = nextChar(trHead.children[tableSize.col - 1].innerText)

    for (let i = 0; i < tableSize.row; i++) {
        tableMatrice[i][tableSize.col - 1].parentElement.remove()
    }
    //Mise à jour de colspan pour le dernier tr
    document.getElementById("lastTr").children[1].colSpan = tableSize.col - 1

    tableSize.col--

    TableToMatrice()
}

function SupprRow() {
    let lastTr = document.getElementById("lastTr")
    //Suppression <tr> avant lastTr
    lastTr.previousElementSibling.remove()

    //Mise à jour du nombre pour le dernier th du dernier tr
    lastTr.childNodes[1].innerText = tableSize.row

    //Mise à jour de rowspan pour le dernier td du premier tr de tbody
    tableMatrice[0][tableSize.col - 1].parentElement.nextElementSibling.rowSpan = tableSize.row - 1

    tableSize.row--

    TableToMatrice()
}

let buttonAddColumn = document.getElementById('button-add-column')
let buttonAddRow = document.getElementById('button-add-row')
  
buttonAddColumn.addEventListener('click', function() {
    AddColumn()
    GenerateToLatex()
})
buttonAddRow.addEventListener('click', function() {
    AddRow()
    GenerateToLatex()
})

export { AddColumn, AddRow, SupprColumn, SupprRow }