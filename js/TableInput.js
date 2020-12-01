function InputAutoSize(cible) {
    cible.style.width = ((cible.value.length + 1) * 8) + 8 + 'px';
}

var tdInputText  = document.getElementsByClassName('tdInputText');

for (let i = 0; i < tdInputText.length; i++) {
    tdInputText[i].addEventListener('keypress', function() {
        InputAutoSize(tdInputText[i])
    });
}