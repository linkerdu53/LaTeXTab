function AddColumn() {
    var th = document.querySelectorAll("th[scope='col']");
    thNb = th.length;

    //Ajout <th scope="col"> dans <thead>
    var newth = document.createElement("th");
    newth.scope = 'col';
    newth.innerText = "test";
    var eltTrHead = document.getElementById("trHead");
    var eltThLast = document.getElementById("thLast");

    eltTrHead.insertBefore(newth, eltThLast);

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
    var th = document.querySelectorAll("th[scope='row']");
    thNb = th.length;
    console.log(thNb);

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