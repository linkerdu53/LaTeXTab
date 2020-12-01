function InputAutoSize(cible) {
    console.log(cible);
    //cible.style.width = ((cible.value.length + 1) * 12) + 8 + 'px';
    cible.style.width = cible.value.length + "ch";
}

function AddEventKeyPress(cible) {
    cible.addEventListener('keypress', function() {
        InputAutoSize(cible)
    });
}

const tdInputText  = document.getElementsByClassName('tdInputText');

for (let i = 0; i < tdInputText.length; i++) {
    AddEventKeyPress(tdInputText[i])
}

export { InputAutoSize, AddEventKeyPress };