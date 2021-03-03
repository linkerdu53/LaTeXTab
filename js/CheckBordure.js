import { GenerateToLatex } from './GenerateToLatex.js';

var tdInputText = document.getElementsByClassName("tdInputText");

function CheckBordureRight() {
    //console.log(tdInputText.length);
    console.log(tdInputText[0].classList);
    if (tdInputText[0].classList.contains("borderLeftOn"))
    {
        console.log("oui oui oui"); 
    }
    for (let i = 0; i < tdInputText.lentgh; i++)
    {
        console.log(tdInputText[i].classList);
        console.log("2");
        /*if (tdInputText[i].classList.contains("borderLeftOn"))
        {
            tdInputText[i].style.borderLeft = "";
            tdInputText[i].classList.remove(borderLeftOn);
        }*/
    }
    console.log("3");
}


export { CheckBordureRight };