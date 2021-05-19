import { tableMatrice, tableSize } from "./Table.js";

let casesSelection = [];

const tdInputText = document.getElementsByClassName("tdInputText");

function InputSelectBg(cible) {
    if (!cible.classList.contains("casesColorOn"))
        cible.style.backgroundColor = "#82C0F9";
}

function InputDeselectBg(cible) {
    if (!cible.classList.contains("casesColorOn"))
        cible.style.backgroundColor = "";
}

function SelectOneInput(cible) {
    //Empeche la duplication
    if (!casesSelection.includes(cible)) {
        let parent = cible.parentElement;
        parent.style.backgroundColor = "grey";
        cible.classList.add("selected")

        casesSelection.push(cible);

        // Suppression fond sur la case focus précédemment
        if (casesSelection.length > 1) {
            InputDeselectBg(casesSelection[casesSelection.length - 2]);
        }
        // Ajout fond sur la case focus
        InputSelectBg(cible);
    }
}

function SelectAllInput() {
    //Si tout les inputs déjà focus alors toutes désélectionnées
    if (casesSelection.length == tdInputText.length) {
        DeselectAllInput();
    }
    else {
        for (let i = 0; i < tdInputText.length; i++) {
            SelectOneInput(tdInputText[i])
        }
    }
}

function SelectColumn(columnId) {
    //On compte combien de cases de la colonne sont déjà sélectionnées. Si elles le sont toutes alors on les désélectionnes.
    let nbCasesColSelect = 0;
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].parentNode.dataset.col == columnId){
            nbCasesColSelect++;
        }
    }
  
    if(nbCasesColSelect != tableSize.row && ctrl == 0) {
        DeselectAllInput();
    }

    for (let j = 0; j < tableSize.row; j++) {
        if(nbCasesColSelect != tableSize.col) {
            SelectOneInput(tableMatrice[j][columnId - 1]);
        }
        else {  
            DeselectOneInput(tableMatrice[j][columnId - 1]);
        }    
    } 
}

function SelectRow(rowId) {
    //On compte combien de cases de la rangée sont déjà sélectionnées. Si elles le sont toutes alors on les désélectionnes.    
    let nbCasesRowSelect = 0
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].parentNode.dataset.row == rowId){
            nbCasesRowSelect++;
        }
    }

    if(nbCasesRowSelect != tableSize.col && ctrl == 0) {
        DeselectAllInput();
    }

    for (let j = 0; j < tableSize.col; j++) {
        if(nbCasesRowSelect != tableSize.row) {
            SelectOneInput(tableMatrice[rowId - 1][j]);
        }
        else {  
            DeselectOneInput(tableMatrice[rowId - 1][j]);
        }    
    }  
}

function DeselectAllInput() {
    for (let i = 0; i < tdInputText.length; i++) {
        DeselectOneInput(tdInputText[i])
    }
    casesSelection = [];
}

function DeselectOneInput(cible) {
    let parent = cible.parentElement;
    parent.style.backgroundColor = "";
    cible.classList.remove("selected")
    casesSelection.splice(casesSelection.indexOf(cible), 1)

    InputDeselectBg(cible)
}

let ctrl = 0;

document.addEventListener('keydown', function (event) {
    if (event.key == 'Control') {
        ctrl = 1;
    }
})

document.addEventListener('keyup', function (event) {
    if (event.key == 'Control') {
        ctrl = 0;
    }
})

$('table').mousedown(function (event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
});

function AddEventCtrlClic(tdInputCible) {
    tdInputCible.addEventListener('click', function (event) {
        if (ctrl == 1) {
            let focusedElement = document.activeElement;

            if (focusedElement.className == "tdInputText") {
                if (casesSelection.includes(focusedElement) == false) { //Si input de départ (input focus) pas dans la sélection alors on l'ajoute
                    SelectOneInput(focusedElement);
                }
                else if (event.target == focusedElement) { //Si on clique dessus alors on l'enlève de la sélection
                    DeselectOneInput(focusedElement);
                    document.activeElement.blur();
                }
            }

            if (event.target != focusedElement) { //Si on clique sur input qui n'est pas celui de départ ou s'il n'y en a pas de départ (aucun input focus)
                if (casesSelection.includes(event.target) == false) { //Si non présent dans la sélection alors on l'ajoute
                    SelectOneInput(event.target);
                    event.target.focus();
                }
                else {
                    DeselectOneInput(event.target);
                }
            }
        }
    })
    tdInputCible.addEventListener('focus', function (event) {
        if (ctrl != 1) {
        DeselectAllInput();
        SelectOneInput(event.target);
        }
    })
}

export { SelectAllInput, AddEventCtrlClic, SelectColumn, SelectRow, casesSelection, DeselectAllInput };