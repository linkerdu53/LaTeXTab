import { GenerateToLatex } from './GenerateToLatex.js';
import { casesSelection } from './InputSelection.js';

const tdInputText = document.getElementsByClassName("tdInputText");

function CheckBordureRight() {
    var nbCol = tdInputText[tdInputText.length - 1].parentNode.dataset.col;
    for (let i = 0; i < tdInputText.length - 1; i++)
    {
        if (!tdInputText[i].classList.contains("borderRightOn"))
        {
            if (tdInputText[i + 1].classList.contains("borderLeftOn"))
            {
                if (i%nbCol != nbCol - 1) {               
                    tdInputText[i + 1].style.borderLeft = "";
                    tdInputText[i + 1].classList.remove("borderLeftOn");
                }
            }   
        }
        else {
            if (!tdInputText[i + 1].classList.contains("borderLeftOn"))
            {
                if (i%nbCol != nbCol - 1) {      
                    tdInputText[i + 1].style.borderLeft = "solid";
                    tdInputText[i + 1].classList.add("borderLeftOn");
                }
            } 
        }
    }
}

function CheckBordureLeft() {
    var nbCol = tdInputText[tdInputText.length - 1].parentNode.dataset.col;
    for (let i = tdInputText.length-1; i > 0; i--)
    {
        if (!tdInputText[i].classList.contains("borderLeftOn"))
        {
            if (tdInputText[i - 1].classList.contains("borderRightOn"))
            {
                if (i%nbCol != 0) {               
                    tdInputText[i - 1].style.borderRight = "";
                    tdInputText[i - 1].classList.remove("borderRightOn");
                }
            }   
        }
        else {
            if (!tdInputText[i - 1].classList.contains("borderRightOn"))
            {
                if (i%nbCol != 0) {
                    tdInputText[i - 1].style.borderRight = "solid";
                    tdInputText[i - 1].classList.add("borderRightOn");
                }
            } 
        }
    }
}

function CheckBordureTop() {
    var nbCol = tdInputText[tdInputText.length - 1].parentNode.dataset.col;
    for (let i = tdInputText.length-1; i > nbCol-1; i--)
    {
        if (!tdInputText[i].classList.contains("borderTopOn"))
        {
            if (tdInputText[i - nbCol].classList.contains("borderBottomOn"))
            {             
                tdInputText[i - nbCol].style.borderBottom = "";
                tdInputText[i - nbCol].classList.remove("borderBottomOn");
            }   
        }
        else {
            if (!tdInputText[i - nbCol].classList.contains("borderBottomOn"))
            {
                tdInputText[i - nbCol].style.borderBottom = "solid";
                tdInputText[i - nbCol].classList.add("borderBottomOn");
            } 
        }
    }
}

function CheckBordureBottom() {
    var nbCol = tdInputText[tdInputText.length - 1].parentNode.dataset.col;
    for (let i = 0; i < tdInputText.length - nbCol; i++)
    {
        var tmp = i + parseInt(nbCol);
        if (!tdInputText[i].classList.contains("borderBottomOn"))
        {
            if (tdInputText[tmp].classList.contains("borderTopOn"))
            {              
                tdInputText[tmp].style.borderTop = "";
                tdInputText[tmp].classList.remove("borderTopOn");
                
            }   
        }
        else {
            if (!tdInputText[tmp].classList.contains("borderTopOn"))
            {
                tdInputText[tmp].style.borderTop = "solid";
                tdInputText[tmp].classList.add("borderTopOn");
            } 
        }
    }
}

function CheckBordureAll() {

    CheckBordureRight();
    CheckBordureTop();
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.border = "solid";
        casesSelection[i].classList.add("borderLeftOn");
        casesSelection[i].classList.add("borderRightOn");
        casesSelection[i].classList.add("borderTopOn");
        casesSelection[i].classList.add("borderBottomOn");
    }
    CheckBordureLeft();
    CheckBordureBottom();
 
}

function CheckBordureOff() {

    CheckBordureRight();
    CheckBordureTop();
    for (let i = 0; i < casesSelection.length; i++) {
        casesSelection[i].style.border = "";
        casesSelection[i].classList.remove("borderLeftOn");
        casesSelection[i].classList.remove("borderRightOn");
        casesSelection[i].classList.remove("borderTopOn");
        casesSelection[i].classList.remove("borderBottomOn");
    }
    CheckBordureLeft();
    CheckBordureBottom();
}

function CheckBordureClass() {
    for (let i = 0; i < tdInputText.length; i++) {
        if ((tdInputText[i].classList.contains("borderLeftOn")) && (tdInputText[i].classList.contains("borderRightOn")) && (tdInputText[i].classList.contains("borderTopOn")) && (tdInputText[i].classList.contains("borderBottomOn"))) {
            tdInputText[i].style.border = "solid";
        }
    }
}

export { CheckBordureRight, CheckBordureLeft, CheckBordureTop, CheckBordureBottom, CheckBordureAll, CheckBordureOff, CheckBordureClass};