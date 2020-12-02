import { casesSelection } from './InputSelection.js';


const boldButton = document.getElementById("bold");

boldButton.addEventListener('click', function() {
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.fontWeight = "bold";
    }
});