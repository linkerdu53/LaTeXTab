import { GenerateToLatex } from './GenerateToLatex.js';

const tdInputText = document.getElementsByClassName("tdInputText");

function CheckBordureRight() {
    for (let i = 1; i < tdInputText.lentgh; i++)
    {
        if (tdInputText[i].classList.contains("borderLeftOn"))
        {
            tdInputText[i].style.borderLeft = "";
            tdInputText[i].classList.remove(borderLeftOn);
        }
    }
}


export { CheckBordureRight };