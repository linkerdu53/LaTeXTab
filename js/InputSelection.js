let casesSelection = [];

const tdInputText = document.getElementsByClassName("tdInputText");

function InputSelectBg(cible) {
    cible.style.backgroundColor = "#82C0F9";
}

function InputDeselectBg(cible) {
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
    let nbCasesColSelect = 0
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].parentNode.dataset.col == columnId){
            nbCasesColSelect++;
        }
    }
    let colLength = tdInputText[tdInputText.length - 1].parentNode.dataset.row;
    for (let j = 0; j < tdInputText.length; j++) {
        if(tdInputText[j].parentNode.dataset.col == columnId) {
            if(nbCasesColSelect != colLength) {
                SelectOneInput(tdInputText[j]);
            }
            else {
                DeselectOneInput(tdInputText[j]);
            }
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
    let rowLength = tdInputText[tdInputText.length - 1].parentNode.dataset.col;
    for (let j = 0; j < tdInputText.length; j++) {
        if(tdInputText[j].parentNode.dataset.row == rowId) {
            if(nbCasesRowSelect != rowLength) {
                SelectOneInput(tdInputText[j]);
            }
            else {
                DeselectOneInput(tdInputText[j]);
            }
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
let clic = 0;

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

export { SelectAllInput, AddEventCtrlClic, SelectColumn, SelectRow, casesSelection };