import { SelectOneInput } from './InputSelection.js';

const rowButton = document.querySelectorAll("th[scope='row']");
//length - 1 car angle bas gauche n'est pas une rangée d'inputs
for (let i = 0; i < rowButton.length - 1; i++) {
    rowButton[i].addEventListener('click', function () {
        const tdInputText = document.getElementsByClassName("tdInputText");
        for (let j = 0; j < tdInputText.length; j++) {
            //On récupère le parent de l'input qui contient le numéro de la colonne et on compare avec i + 1 qui est le num de la colonne où est le bouton
            if(tdInputText[j].parentNode.dataset.row == i + 1) {
                SelectOneInput(tdInputText[j]);
            }
        }
    })
}