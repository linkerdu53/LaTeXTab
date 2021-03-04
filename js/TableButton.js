import { nextChar } from './GestionLettre.js';
import { AddEventInput } from './TableInput.js';
import { GenerateToLatex } from './GenerateToLatex.js';
import { AddEventSelectColumn } from './TableSelectColumn.js'
import { AddEventSelectRow } from './TableSelectRow.js'

const mainTable = document.getElementsByClassName('mainTable')[0];
const mainTbody = mainTable.querySelectorAll("tbody")[0];
const tdMainTable = mainTable.getElementsByClassName('tdMainTable');

function AddColumn() {
    let columnSize = parseInt(tdMainTable[tdMainTable.length - 1].dataset.col); 

    var th = mainTable.querySelectorAll("th[scope='col']");
    var thNb = th.length;

    var eltTrHead = document.getElementById("trHead");
    var eltThLast = document.getElementById("thLast");
    
    //Ajout <th scope="col"> dans <thead>
    var newth = document.createElement("th");
    newth.scope = 'col';
    newth.className = 'user-select-none';
    newth.setAttribute("role", "button");
    newth.innerText = eltThLast.childNodes[0].nodeValue;
    AddEventSelectColumn(newth, thNb - 1);
    eltTrHead.insertBefore(newth, eltThLast);

    //Mise à jour du dernier th scope="col" dans le thead
    eltThLast.childNodes[0].nodeValue = nextChar(eltThLast.childNodes[0].nodeValue);

    //Ajout <td><input type="text"></td> dans <tbody>
    var eltTbody = mainTable.getElementsByTagName('tbody');
    var trTbodyChilds = eltTbody[0].querySelectorAll('tr') //récupère les tr présent dans tbody

    for (let index = 0; index < trTbodyChilds.length - 1; index++) {
        const newTd = document.createElement("td");
        newTd.dataset.row = index + 1;
        newTd.dataset.col = columnSize + 1;
        newTd.classList.add("tdMainTable");
        const newInput = document.createElement("input");
        newInput.type = 'text';
        newInput.classList.add("tdInputText");
        AddEventInput(newInput);

        newTd.appendChild(newInput);

        var trChild = trTbodyChilds[index]; //récupère tr[i]
        var tdTrChilds = trChild.querySelectorAll('td') //filtre pour ne garder que les td
        var lastTd = tdTrChilds[tdTrChilds.length - 1]; // récupères dernier td dans tr[i]

        //if car td de plus dans le premier tr car contient bouton pour ajouter
        if (index == 0) {
            trChild.insertBefore(newTd, lastTd);
        }
        else {
            trChild.appendChild(newTd);
        }
    }

    //Mise à jour de colspan pour le dernier tr
    var lastTd = trTbodyChilds[trTbodyChilds.length - 1].querySelectorAll('td');
    lastTd[0].colSpan = thNb - 1;
}

function AddRow() {
    let rowSize = parseInt(tdMainTable[tdMainTable.length - 1].dataset.row);
    
    var theadThNb = mainTable.querySelectorAll("th[scope='col']").length;
    var tbodyThNb = mainTable.querySelectorAll("th[scope='row']").length;
    //Ajout <th scope="row">
    var newtr = document.createElement("tr");
    var newth = document.createElement("th");
    newth.scope = 'row';
    newth.className = 'align-middle user-select-none';
    newth.setAttribute("role", "button");
    newth.innerText = tbodyThNb;
    AddEventSelectRow(newth, tbodyThNb);
    newtr.appendChild(newth);

    const tdInputText  = document.getElementsByClassName('tdInputText');

    //Ajout bon nombre de <td><input type="text"></td>
    for (let index = 0; index < theadThNb - 2; index++) {
        const newTd = document.createElement("td");
        newTd.dataset.row = rowSize + 1;
        newTd.dataset.col = index + 1;
        newTd.classList.add("tdMainTable");

        const newInput = document.createElement("input");
        newInput.type = 'text';
        newInput.classList.add("tdInputText");
        
        let lePlusLong = 0;
        for (let i = 0; i < tdInputText.length; i++) {
            if (tdInputText[i].parentElement.dataset.col == (index + 1)) {
                //On récupère l'input le plus long de la colonne où sera l'input
                if (parseInt(tdInputText[i].style.width) > lePlusLong) {
                    lePlusLong = tdInputText[i].style.width;
                }            
            }
        }
        if (lePlusLong === 0) {
            lePlusLong = 30 + 'px'
        }
        newInput.style.width = lePlusLong;

        AddEventInput(newInput);

        newTd.appendChild(newInput);
        newtr.appendChild(newTd);
    }

    var tbodyNodes = mainTable.getElementsByTagName("tbody");
    var eltLastTr = document.getElementById("lastTr");

    tbodyNodes[0].insertBefore(newtr, eltLastTr);

    //Mise à jour de rowspan pour le dernier td du premier tr de tbody
    var trChilds = tbodyNodes[0].querySelectorAll("tr");
    var tdChilds = trChilds[0].querySelectorAll("td");
    var lastTd = tdChilds[tdChilds.length - 1];
    lastTd.rowSpan = tbodyThNb;

    //Mise à jour du text (nombre) pour le premier td du dernier tr de tbody
    var lastTrChild = eltLastTr.childNodes;
    lastTrChild[1].innerText = tbodyThNb + 1;
}

function SupprColumn() {
    var eltTrHead = document.getElementById("trHead");
    var eltThLast = document.getElementById("thLast");
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
    var lastTd = document.getElementById('lastTr').children[1];
    lastTd.colSpan = lastTd.colSpan - 1;
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