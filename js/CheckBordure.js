import { GenerateToLatex } from './GenerateToLatex.js';

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

function checkBordureAll() {
    CheckBordureBottom();
    CheckBordureRight();
    CheckBordureLeft();
    CheckBordureTop();
 
}

export { CheckBordureRight, CheckBordureLeft, CheckBordureTop, CheckBordureBottom, checkBordureAll };