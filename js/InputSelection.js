function InputSelectBg(cible) {
    var parent = cible.parentElement
    parent.style.backgroundColor = "#17a2b8";
    cible.style.backgroundColor = "#17a2b8";
}

function InputDeselectBg(cible) {
    var parent = cible.parentElement
    parent.style.backgroundColor = "";
    cible.style.backgroundColor = "";
}


export { InputSelectBg, InputDeselectBg };