import { SelectOneInput } from './InputSelection.js';

const buttonColonne = document.querySelectorAll("th[scope='col']");
//i = 1 car buttonColonne[0] est l'angle haut gauche du tableau et length - 1 car angle haut droit ne sont pas colonnes d'inputs
for (let i = 1; i < buttonColonne.length - 1; i++) {
    buttonColonne[i].addEventListener('click', function () {
        const tdInputText = document.getElementsByClassName("tdInputText");
        for (let j = 0; j < tdInputText.length; j++) {
            //On récupère le parent de l'input qui contient le numéro de la colonne et on compare avec i qui est le num de la colonne où est le bouton
            if(tdInputText[j].parentNode.dataset.col == i) {
                SelectOneInput(tdInputText[j]);
            }
        }
    })
}