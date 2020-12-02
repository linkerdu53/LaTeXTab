function InputSelectBg(cible) {
    cible.style.backgroundColor = "#17a2b8";
}

function InputDeselectBg(cible) {
    cible.style.backgroundColor = "";
}

function SelectMultiple(cible) {
    var parent = cible.parentElement;
    parent.style.backgroundColor = "orange";
}

function DeselectMultiple() {
    const tdInputText = document.getElementsByClassName("tdInputText");
    for (let i = 0; i < tdInputText.length; i++) {
        var parent = tdInputText[i].parentElement;
        parent.style.backgroundColor = ""; 
    }
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

function AddEventCtrlClic(tdInputCible) {
    tdInputCible.addEventListener('click', function (event) {
        if (ctrl == 1) {
            clic = 1;
        }
        else {
            clic = 0;
            DeselectMultiple();
        }

        if (ctrl == 1 && clic == 1) {
            SelectMultiple(event.target);
        }
    })
}

export { InputSelectBg, InputDeselectBg, AddEventCtrlClic };