const tdInputText = document.getElementsByClassName("tdInputText");

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

/*
$('input').on('mousedown touchstart', function(event) {
  event.preventDefault();
});
$('input').on('mousemove touchmove', function(event) {
  event.preventDefault();
});
$(window.document).on('mouseup touchend', function(event) {
  event.target.focus();
});

*/

const mainTable = document.getElementsByClassName("mainTable")[0];
let inputDebut = null;

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
    document.addEventListener('mouseover', function (event) {
        if (mouseDown == 1 && inputDebut === null) {
            inputDebut = event.target;
        }
        tdInputMouseEnter(event.target)
    })
}

let mouseDown = 0;
document.body.onmousedown = function() {
    mouseDown++;
}
document.body.onmouseup = function() {
    mouseDown--;
    inputDebut = null;
}

function tdInputMouseEnter(cible) {
    if (mouseDown == 1 && cible.className == "tdInputText") {
        let cibleRow = parseInt(cible.parentNode.dataset.row);
        let cibleCol = parseInt(cible.parentNode.dataset.col);
        DeselectAllInput();
        for (let i = 0; i < tdInputText.length; i++) {
            let tdData = tdInputText[i].parentNode.dataset;
            //Partie haute
            if(tdData.row >= cibleRow && tdData.row <= inputDebut.dataset.row) {
                //Partie gauche
                if(tdData.col >= cibleCol && tdData.col <= inputDebut.dataset.col) {
                    SelectOneInput(tdInputText[i]);
                }
                //Partie droite
                else if(tdData.col <= cibleCol && tdData.col >= inputDebut.dataset.col) {
                    SelectOneInput(tdInputText[i]);
                }
            }
            //Partie basse
            else if(tdData.row <= cibleRow && tdData.row >= inputDebut.dataset.row) {
                //Partie gauche
                if(tdData.col >= cibleCol && tdData.col <= inputDebut.dataset.col) {
                    SelectOneInput(tdInputText[i]);
                }
                //Partie droite
                else if(tdData.col <= cibleCol && tdData.col >= inputDebut.dataset.col) {
                    SelectOneInput(tdInputText[i]);
                }
            }
        }
    }
}

export { InputSelectBg, SelectAllInput, InputDeselectBg, AddEventCtrlClic, SelectColumn, SelectRow, casesSelection };