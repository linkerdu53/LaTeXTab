function AddColumn() {
    var th = document.querySelectorAll("th[scope='col']");
    thNb = th.length;

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
    var eltTbody = document.getElementsByTagName('tbody');
    var trTbodyChilds = eltTbody[0].querySelectorAll('tr') //récupère les tr présent dans tbody

    for (let index = 0; index < trTbodyChilds.length - 1; index++) {
        var newTd = document.createElement("td");
        var newInput = document.createElement("input");
        newInput.type = 'text';
        newInput.type = 'text';
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
    var theadThNb = document.querySelectorAll("th[scope='col']").length;
    var tbodyThNb = document.querySelectorAll("th[scope='row']").length;
    //Ajout <th scope="row">
    var newtr = document.createElement("tr");
    var newth = document.createElement("th");
    newth.scope = 'row';
    newth.className = 'align-middle';
    newth.innerText = tbodyThNb;
    newtr.appendChild(newth);

    //Ajout bon nombre de <td><input type="text"></td>
    for (let index = 0; index < theadThNb - 2; index++) {
        var newTd = document.createElement("td");
        var newInput = document.createElement("input");
        newInput.type = 'text';
        newInput.type = 'text';
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
    lastTd.rowSpan = tbodyThNb - 1;

    //Mise à jour du text (nombre) pour le premier td du dernier tr de tbody
    lastTrChild = eltLastTr.childNodes;
    lastTrChild[1].innerText = tbodyThNb + 1;
}
   
var buttonAddColumn  = document.getElementById('button-add-column');
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


function nextChar(c) {
    var u = c.toUpperCase();
    if (same(u,'Z')){
        var txt = '';
        var i = u.length;
        while (i--) {
            txt += 'A';
        }
        return (txt+'A');
    } else {
        var p = "";
        var q = "";
        if(u.length > 1){
            p = u.substring(0, u.length - 1);
            q = String.fromCharCode(p.slice(-1).charCodeAt(0));
        }
        var l = u.slice(-1).charCodeAt(0);
        var z = nextLetter(l);
        if(z==='A'){
            return p.slice(0,-1) + nextLetter(q.slice(-1).charCodeAt(0)) + z;
        } else {
            return p + z;
        }
    }
}

function nextLetter(l){
    if(l<90){
        return String.fromCharCode(l + 1);
    }
    else{
        return 'A';
    }
}

function same(str,char){
    var i = str.length;
    while (i--) {
        if (str[i]!==char){
            return false;
        }
    }
    return true;
}