const tdInputText = document.getElementsByClassName("tdInputText");

function InputSelectBg(cible) {
    cible.style.backgroundColor = "#82C0F9";
}

function InputDeselectBg(cible) {
    cible.style.backgroundColor = "";
}

function SelectOneInput(cible) {
    var parent = cible.parentElement;
    parent.style.backgroundColor = "grey";
    casesSelection.push(cible);

    if (casesSelection.length > 1) {
        InputDeselectBg(casesSelection[casesSelection.length - 2]);
    }
    InputSelectBg(cible);
}

function SelectAllInput() {
    
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

    document.addEventListener('mouseover', function (event) {
        tdInputMouseEnter(event.target)
    })
}

var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}

function tdInputMouseEnter(cible) {
    if (mouseDown == 1 && cible.className == "tdInputText" && casesSelection.includes(cible) == 0) {
        console.log(cible);
        cible.blur();
        let cibleRow = parseInt(cible.dataset.row);
        let cibleCol = parseInt(cible.dataset.col);
        SelectOneInput(cible);
    }
}

export { InputSelectBg, SelectAllInput, InputDeselectBg, AddEventCtrlClic, casesSelection };