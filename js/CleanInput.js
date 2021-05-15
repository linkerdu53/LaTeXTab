import { casesSelection, SelectAllInput, DeselectAllInput } from './InputSelection.js'
import { tableMatrice, tableSize } from './Table.js'

function CleanInput(cible) {
    cible.value = ""
    cible.style = ""
    cible.classList = ""
    cible.classList.add("tdInputText")
}

function CleanSelectedInputs() {
    for (let i = 0; i < casesSelection.length; i++) {
        CleanInput(casesSelection[i]);
    }
}

function CleanAllInputs() {
    for (let i = 0; i < tableSize.row; i++) {
        for (let j = 0; j < tableSize.col; j++) {
            CleanInput(tableMatrice[i][j]);
        }
    }
}

$(window).bind('beforeunload',function(){
    SelectAllInput()
    CleanSelectedInputs()
    DeselectAllInput()
    document.getElementById("customSwitch1").checked = false
});

export { CleanSelectedInputs, CleanAllInputs }
