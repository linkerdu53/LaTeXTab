import { SelectColumn } from './InputSelection.js';
import { AddColumn, SupprColumn } from './TableButton.js';

const columnButton = document.querySelectorAll("th[scope='col']");
//i = 1 car columnButton[0] est l'angle haut gauche du tableau et length - 1 car angle haut droit ne sont pas colonnes d'inputs
for (let i = 1; i < columnButton.length - 1; i++) {
    AddEventSelectColumn(columnButton[i], i);
    addColumnIn(columnButton[i], i);
}

function AddEventSelectColumn(target, columnId) {
    target.addEventListener('click', function() { SelectColumn(columnId) });
}


function addColumnIn(target, columnId) {
    target.addEventListener('click', function() { 
        AddColumn();
        console.log(columnId);
    });

}

export { AddEventSelectColumn, addColumnIn }

