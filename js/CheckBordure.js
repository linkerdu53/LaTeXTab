import { GenerateToLatex } from './GenerateToLatex.js';

var tdInputText = document.getElementsByClassName("tdInputText");

function CheckBordureRight() {
    for (let i = 0; i < tdInputText.length; i++)
    {
        if (tdInputText[i].classList.contains("borderLeftOn"))
        {
            tdInputText[i].style.borderLeft = "";
            tdInputText[i].classList.remove(borderLeftOn);
        }
    }
}


export { CheckBordureRight };