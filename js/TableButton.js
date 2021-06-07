import { nextChar } from './GestionLettre.js';
import { AddEventInput } from './TableInput.js';
import { GenerateToLatex } from './GenerateToLatex.js';
import { CheckBordureAll } from './CheckBordure.js';
import { AddEventSelectColumn } from './TableSelectColumn.js'
import { AddEventSelectRow } from './TableSelectRow.js'
import { TableToMatrice, tableSize, tableMatrice } from './Table.js'

const mainTable = document.getElementsByClassName('mainTable')[0];
const mainTbody = mainTable.querySelectorAll("tbody")[0];

function AddColumn() {
    let eltTrHead = document.getElementById("trHead");
    let eltThLast = eltTrHead.children[eltTrHead.children.length - 1];

    //Ajout <th scope="col"> dans <thead>
    let newth = document.createElement("th");
    newth.scope = 'col';
    newth.className = 'user-select-none contextMenu';
    //Tooltips
    newth.setAttribute("role", "button");
    newth.setAttribute("data-toggle", "tooltip");
    newth.setAttribute("data-placement", "top");
    newth.setAttribute("title", "Sélectioner la colonne");
    $(newth).tooltip();
    //Ajout Lettre
    newth.innerText = eltThLast.childNodes[0].nodeValue;
    //Ajout event pour select la colonne
    AddEventSelectColumn(newth, tableSize.col + 1);

    eltTrHead.insertBefore(newth, eltThLast);

    //Mise à jour du dernier th scope="col" dans le thead
    eltThLast.childNodes[0].nodeValue = nextChar(eltThLast.childNodes[0].nodeValue);

    //Ajout <td><input type="text"></td> dans <tr>
    for (let i = 0; i < tableSize.row; i++) {
        const newTd = document.createElement("td");
        newTd.dataset.row = i + 1;
        newTd.dataset.col = tableSize.col + 1;
        newTd.classList.add("tdMainTable");

        const newInput = document.createElement("input");
        newInput.type = 'text';
        newInput.classList.add("tdInputText");
        AddEventInput(newInput);

        newTd.appendChild(newInput);

        let tr = tableMatrice[i][0].parentElement.parentElement; //récupère tr[i]
        if (i == 0) { //if car td de plus dans le premier tr car contient bouton pour ajouter
            tr.insertBefore(newTd, tableMatrice[i][tableSize.col - 1].parentElement.nextElementSibling);
        }
        else {
            tr.appendChild(newTd);
        }
    }
    //Mise à jour de colspan pour le dernier tr
    document.getElementById("lastTr").children[1].colSpan = tableSize.col + 1;

    tableSize.col++

    TableToMatrice()

    CheckBordureAll();
}

function AddRow() {
    let newtr = document.createElement("tr");
    //Création <th scope="row">
    let newth = document.createElement("th");
    newth.scope = 'row';
    newth.className = 'align-middle user-select-none contextMenu';
    newth.setAttribute("role", "button");
    //Tooltips
    newth.setAttribute("role", "button");
    newth.setAttribute("data-toggle", "tooltip");
    newth.setAttribute("data-placement", "left");
    newth.setAttribute("title", "Sélectioner la rangée");
    $(newth).tooltip();
    newth.innerText = tableSize.row + 1;

    AddEventSelectRow(newth, tableSize.row + 1);
    
    newtr.appendChild(newth);

    //Ajout bon nombre de <td><input type="text"></td> dans <tr>
    for (let i = 0; i < tableSize.col; i++) {
        const newTd = document.createElement("td");
        newTd.dataset.row = tableSize.row + 1;
        newTd.dataset.col = i + 1;
        newTd.classList.add("tdMainTable");

        const newInput = document.createElement("input");
        newInput.type = 'text';
        newInput.classList.add("tdInputText");

        AddEventInput(newInput);

        newTd.appendChild(newInput);
        newtr.appendChild(newTd);
    }
    let lastTr = document.getElementById("lastTr");
    lastTr.parentElement.insertBefore(newtr, lastTr)
    //Mise à jour de rowspan pour le dernier td du premier tr de tbody
    tableMatrice[0][tableSize.col - 1].parentElement.nextElementSibling.rowSpan = tableSize.row + 1;

    //Mise à jour du nombre pour le dernier th du dernier tr
    lastTr.childNodes[1].innerText = tableSize.row + 2;
    
    tableSize.row++

    TableToMatrice()

    CheckBordureAll();
}

function SupprColumn() {
    let eltTrHead = document.getElementById("trHead");
    let eltThLast = eltTrHead.children[eltTrHead.children.length - 1];
    eltTrHead.children[eltTrHead.children.length - 2].remove();
    eltThLast.childNodes[0].nodeValue = nextChar(eltTrHead.children[eltTrHead.children.length - 2].childNodes[0].nodeValue);

    let listTr = mainTbody.children;
    for (let j = 0; j < listTr.length - 1; j++) {
        if (j == 0) {
            listTr[j].children[listTr[j].children.length - 2].remove();
        }
        else {
            listTr[j].children[listTr[j].children.length - 1].remove();
        }
    }
    //Mise à jour de colspan pour le dernier tr
    document.getElementById("lastTr").children[1].colSpan = tableSize.col - 1;

    tableSize.col--

    TableToMatrice()
}

function SupprRow() {
    mainTbody.children[mainTbody.children.length - 2].remove();
    //Mise à jour du text (nombre) pour le premier td du dernier tr de tbody
    var tbodyThNb = mainTable.querySelectorAll("th[scope='row']").length;
    var eltLastTr = document.getElementById("lastTr");
    var lastTrChild = eltLastTr.childNodes;
    lastTrChild[1].innerText = tbodyThNb;

    //Mise à jour de rowspan pour le dernier td du premier tr de tbody
    var trChilds = mainTable.querySelectorAll("tr")[1];
    var lastTd = trChilds.children[trChilds.children.length - 1];
    lastTd.rowSpan = lastTd.rowSpan - 1;

    tableSize.row--

    TableToMatrice()
}

var buttonAddColumn = document.getElementById('button-add-column');
var buttonAddRow = document.getElementById('button-add-row');
  
if (buttonAddColumn) {
    buttonAddColumn.addEventListener('click', function() {
        AddColumn();
        GenerateToLatex();
    }, false);
}
if (buttonAddRow) {
    buttonAddRow.addEventListener('click', function() {
        AddRow();
        GenerateToLatex();
    }, false);
}

export { AddColumn, AddRow, SupprColumn, SupprRow };