import { casesSelection } from './InputSelection.js';


const boldButton = document.getElementById("bold");

boldButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.fontWeight == "bold") {
            casesSelection[i].style.fontWeight = "normal";
        } else {
            casesSelection[i].style.fontWeight = "bold";
        }
    }
});

const boldButton = document.getElementById("italic");

boldButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        if (casesSelection[i].style.fontWeight == "bold") {
            casesSelection[i].style.fontWeight = "normal";
        } else {
            casesSelection[i].style.fontWeight = "bold";
        }
    }
});