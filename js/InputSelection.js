function InputSelectBg(cible) {
    var parent = cible.parentElement;
    parent.style.backgroundColor = "#17a2b8";
    cible.style.backgroundColor = "#17a2b8";
}

function InputDeselectBg(cible) {
    var parent = cible.parentElement;
    parent.style.backgroundColor = "";
    cible.style.backgroundColor = "";
}

function SelectMultiple(cible) {
    const tdInputText = document.getElementsByClassName("tdInputText");

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
let mouseDown = 0;
var cible;

document.addEventListener('keydown', function (event) {
    if (event.key == 'Control') {
        ctrl = 1;
    }
})
document.addEventListener('keyup', function () {
    ctrl = 0;
})
document.addEventListener('mousedown', function (event) {
    if (ctrl == 1) {
        DeselectMultiple();
        event.preventDefault();
    }
    mouseDown = 1;
})
document.addEventListener('mouseup', function () {
    mouseDown = 0;
})

const tdInputText = document.getElementsByClassName("tdInputText");

for (let i = 0; i < tdInputText.length; i++) {
    tdInputText[i].addEventListener('mouseover', function(event) { 
        cible = event.target;
        if (ctrl == 1 && mouseDown == 1) {
            SelectMultiple(cible);
        }
    });
}

export { InputSelectBg, InputDeselectBg };