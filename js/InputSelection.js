function InputSelectBg(cible) {
    cible.style.backgroundColor = "#82C0F9";
}

function InputDeselectBg(cible) {
    cible.style.backgroundColor = "";
}

function SelectOneInput(cible) {
    if (!casesSelection.includes(cible)) {
        let parent = cible.parentElement;
        parent.style.backgroundColor = "grey";
        casesSelection.push(cible);

        if (casesSelection.length > 1) {
            InputDeselectBg(casesSelection[casesSelection.length - 2]);
        }
        InputSelectBg(cible);
    }
}

function SelectAllInput() {
    const tdInputText = document.getElementsByClassName("tdInputText");
    if (casesSelection.length == tdInputText.length) {
        DeselectAllInput();
    }
    else {
        DeselectAllInput();
        for (let i = 0; i < tdInputText.length; i++) {
            var parent = tdInputText[i].parentElement;
            parent.style.backgroundColor = "grey";
    
            casesSelection.push(tdInputText[i]);
        }
    }
   

}

function SelectColumn(columnId) {
    const tdInputText = document.getElementsByClassName("tdInputText");
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
    const tdInputText = document.getElementsByClassName("tdInputText");
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
    const tdInputText = document.getElementsByClassName("tdInputText");
    for (let i = 0; i < tdInputText.length; i++) {
        var parent = tdInputText[i].parentElement;
        parent.style.backgroundColor = "";

        InputDeselectBg(tdInputText[i])
    }
    casesSelection = [];
}

function DeselectOneInput(cible) {
    var parent = cible.parentElement;
    parent.style.backgroundColor = ""; 
    let cibleIndex = casesSelection.indexOf(cible);
    casesSelection.splice(cibleIndex, 1)

    InputDeselectBg(cible)
}

let casesSelection = [];

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
            clic = 1;
        }
        else {
            clic = 0;
            DeselectAllInput();
            SelectOneInput(event.target);
        }

        if (ctrl == 1 && clic == 1) {
            var focusedElement = document.activeElement;

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
}

export { InputSelectBg, SelectAllInput, InputDeselectBg, AddEventCtrlClic, SelectColumn, SelectRow, casesSelection };