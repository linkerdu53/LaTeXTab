import { casesSelection, SelectAllInput, DeselectAllInput } from './InputSelection.js';


const tdInputText = document.getElementsByClassName('tdInputText');

function CleanInput(cible) {
    cible.value = ""
    cible.style = ""
}

function CleanSelectedInputs() {
    for (let i = 0; i < casesSelection.length; i++) {
        CleanInput(casesSelection[i]);
    }
}

function CleanAllInputs() {
    for (let i = 0; i < tdInputText.length; i++) {
        CleanInput(tdInputText[i]);
    }
}

$(window).bind('beforeunload',function(){
    SelectAllInput();
    CleanSelectedInputs();
    DeselectAllInput();
    document.getElementById("customSwitch1").checked = false;
});

export { CleanSelectedInputs, CleanAllInputs }
