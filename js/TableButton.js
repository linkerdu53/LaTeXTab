import { nextChar } from './GestionLettre.js';
import { AddEventInput } from './TableInput.js';

const mainTable = document.getElementsByClassName('mainTable')[0];

function AddColumn() {
    var th = mainTable.querySelectorAll("th[scope='col']");
    var thNb = th.length;

    var eltTrHead = document.getElementById("trHead");
    var eltThLast = document.getElementById("thLast");
    
    //Ajout <th scope="col"> dans <thead>
    var newth = document.createElement("th");
    newth.scope = 'col';
    newth.innerText = eltThLast.childNodes[0].nodeValue;
    eltTrHead.insertBefore(newth, eltThLast);

    //Mise à jour du dernier th scope="col" dans le thead
    eltThLast.childNodes[0].nodeValue = nextChar((eltThLast.childNodes[0].nodeValue));

    //Ajout <td><input type="text"></td> dans <tbody>
    var eltTbody = mainTable.getElementsByTagName('tbody');
    var trTbodyChilds = eltTbody[0].querySelectorAll('tr') //récupère les tr présent dans tbody

    for (let index = 0; index < trTbodyChilds.length - 1; index++) {
        const newTd = document.createElement("td");
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
    var theadThNb = mainTable.querySelectorAll("th[scope='col']").length;
    var tbodyThNb = mainTable.querySelectorAll("th[scope='row']").length;
    //Ajout <th scope="row">
    var newtr = document.createElement("tr");
    var newth = document.createElement("th");
    newth.scope = 'row';
    newth.className = 'align-middle';
    newth.innerText = tbodyThNb;
    newtr.appendChild(newth);

    //Ajout bon nombre de <td><input type="text"></td>
    for (let index = 0; index < theadThNb - 2; index++) {
        const newTd = document.createElement("td");
        const newInput = document.createElement("input");
        newInput.type = 'text';
        newInput.classList.add("tdInputText");
        AddEventInput(newInput);

        newTd.appendChild(newInput);
        newtr.appendChild(newTd);
    }

    var tbodyNodes = document.getElementsByTagName("tbody");
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

var buttonAddColumn = document.getElementById('button-add-column');
var buttonAddRow = document.getElementById('button-add-row');
  
if (buttonAddColumn) {
    buttonAddColumn.addEventListener('click', function() {
        AddColumn()
    }, false);
}
if (buttonAddRow) {
    buttonAddRow.addEventListener('click', function() {
        AddRow()
    }, false);
}