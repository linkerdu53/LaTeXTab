import { SelectRow } from './InputSelection.js';

const rowButton = document.querySelectorAll("th[scope='row']");
//length - 1 car angle bas gauche n'est pas une rangée d'inputs
for (let i = 0; i < rowButton.length - 1; i++) {
    AddEventSelectRow(rowButton[i], i + 1);
}

function AddEventSelectRow(target, rowId) {
    target.addEventListener('click', function() { SelectRow( rowId ) });
}

export { AddEventSelectRow }