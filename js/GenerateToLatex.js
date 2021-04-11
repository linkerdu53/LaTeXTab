import { tableSize } from "./Table.js";
import { IsStrsContains1Elt } from "./TableFusion.js"

const tdInputText = document.getElementsByClassName("tdInputText");

function GetTableData() {
    let matrice = [];

    for (let i = 0; i < tableSize.row; i++) {
        matrice.push([]);
        let input = 0;
        for (let j = 0; j < tableSize.col; j++) {
            for (let k = 0; k < tdInputText.length; k++) {
                if (IsStrsContains1Elt(tdInputText[k].parentNode.dataset.row, (i+1).toString()) && IsStrsContains1Elt(tdInputText[k].parentNode.dataset.col, (j+1).toString())) {
                    input = tdInputText[k]
                    break
                }
            }

            matrice[i][j] = {};
            matrice[i][j].value = input.value;

            matrice[i][j].row = input.parentNode.dataset.row.split(" ").map(Number)
            matrice[i][j].col = input.parentNode.dataset.col.split(" ").map(Number)

            if (input.classList.contains("boldOn")) { 
                matrice[i][j].bold = 1;
            }
            if (input.classList.contains("italicOn")) { 
                matrice[i][j].italic = 1;
            }
            if (input.classList.contains("underlineOn")) { 
                matrice[i][j].underline = 1;
            }

            if (input.classList.contains("colorOn") && input.style.color !== "") { 
                matrice[i][j].textColor = 1;
                let matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
                let match = matchColors.exec(input.style.color);
                matrice[i][j].textColorCode = rgbToHex(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
            }
            matrice[i][j].alignLeft = 0;
            matrice[i][j].alignCenter = 0;
            matrice[i][j].alignRight = 0;
            if (input.classList.contains("alignCenterOn")) { 
                matrice[i][j].alignCenter = 1;
            }
            else if (input.classList.contains("alignRightOn")) { 
                matrice[i][j].alignRight = 1;
            }
            else { 
                matrice[i][j].alignLeft = 1;
            }
            matrice[i][j].borderLeft = 0;
            matrice[i][j].borderRight = 0;
            matrice[i][j].borderTop = 0;
            matrice[i][j].borderBottom = 0;
            if (input.classList.contains("borderLeftOn")) { 
                matrice[i][j].borderLeft = 1;
            }
            if (input.classList.contains("borderRightOn")) { 
                matrice[i][j].borderRight = 1;
            }
            if (input.classList.contains("borderTopOn")) { 
                matrice[i][j].borderTop = 1;
            }
            if (input.classList.contains("borderBottomOn")) { 
                matrice[i][j].borderBottom = 1;
            }
        }
    }

    return matrice;
}

function rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function GenerateToLatex() {
    let matrice = GetTableData();
    console.log(matrice)
    let strMessage = "";
    let strPackage = "";
    let strLaTeX = ""
    let str = "" //Concaténation de strMessage + strPackage + strLaTeX
    if (matrice.some(row => row.some(col => col['underline'] === 1))) {
        strMessage += "% Vous devez ajouter les 2 packages suivants pour pouvoir souligner :\n"
        strPackage += "% \\usepackage[normalem]{ulem}\n";
        strPackage += "% \\useunder{\\uline}{\\ul}{}\n\n\n"
    }
    if (matrice.some(row => row.some(col => col['textColor'] === 1))) {
        strMessage += "% Vous devez ajouter le package suivant pour pouvoir colorer le texte :\n"
        strPackage += "% \\usepackage[table,xcdraw]{xcolor}\n\n\n";
    }
    if (matrice.some(row => row.some(col => col['row'].length > 1))) {
        strMessage += "% Vous devez ajouter le package suivant pour pouvoir fusionner de haut en bas :\n"
        strMessage += "% \\usepackage{multirow}\n\n\n"
    }

    let modeMaths = document.getElementById('modeMaths').checked;
    if (modeMaths === true) {
        strPackage += "% \\usepackage{amsmath,amsfonts,amssymb}\n\n";
    }
    //On remplie 2 tableaux de bordure pour les colonnes et rangées
    let fullBorderColonne = Array(matrice[0].length + 1).fill(0);
    let fullBorderRow = Array(matrice.length + 1).fill(0);
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            if (j === 0 && matrice[i][0].borderLeft) {
                fullBorderColonne[0]++;
            }
            if (matrice[i][j].borderRight) {
                fullBorderColonne[j + 1]++;
            }

            if (i == 0 && matrice[0][j].borderTop) {
                fullBorderRow[0]++;
            }
            if (matrice[i][j].borderBottom) {
                fullBorderRow[i + 1]++;
            }
        }
    }

    strLaTeX += "\\begin{tabular}{ ";

    //Si bordure sur toute la colonne à gauche
    if (fullBorderColonne[0] === matrice.length) {
        strLaTeX += "|";
    }
    for (let i = 0; i < matrice[0].length; i++) {
        strLaTeX += " l ";
        if (fullBorderColonne[i + 1] === matrice.length) {
            strLaTeX += "|";
        }
    }   
    strLaTeX+= "}\n";

    //Si la ligne du haut est entièrement avec une bordure
    if (fullBorderRow[0] === matrice[0].length) {
        strLaTeX += "\\hline\n";
    }
    else if(fullBorderRow[0] > 0) { //Si seulement une ou plusieurs partie de la ligne du haut est avec une bordure
        let nbBorder = 0;
        for (let j = 0; j < matrice[0].length; j++) {
            if (matrice[0][j].borderTop == 1) {
                if (nbBorder == 0) {
                    strLaTeX += "\\cline{";
                    strLaTeX += j + 1;
                    strLaTeX += "-"
                    nbBorder = j + 1;
                }
                else {
                    nbBorder++;
                }
            }
            else if (matrice[0][j].borderTop == 0 && nbBorder != 0) {
                strLaTeX += nbBorder;
                strLaTeX += "}";
                nbBorder = 0;
            }
        }
        if (nbBorder != 0) {
            strLaTeX += nbBorder;
            strLaTeX += "}";
        }
        strLaTeX += "\n";
    }
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            let nbCrochets = 0;
            if (matrice[i][j].alignCenter == 1 || matrice[i][j].alignRight == 1 || (j == 0 && fullBorderColonne[0] != 0 && fullBorderColonne[0] != matrice.length) || (fullBorderColonne[j + 1] != 0 && fullBorderColonne[j + 1] != matrice.length)) {
                //SI fusion alors seulement la 1ère case
                if (matrice[i][j].col.length > 1 && matrice[i][j].col[0] == j + 1) {
                    strLaTeX += "\\multicolumn{"
                    if (matrice[i][j].col.length > 1) {
                        strLaTeX += matrice[i][j].col.length + "}{"
                    }
                    else {
                        strLaTeX += "1}{";
                    }
                    if (j == 0 && matrice[i][j].borderLeft == 1) {
                        strLaTeX += "| "
                    }
                    if (matrice[i][j].alignLeft == 1) {
                        strLaTeX += "l";
                    }
                    else if (matrice[i][j].alignCenter == 1) {
                        strLaTeX += "c";
                    }
                    else if (matrice[i][j].alignRight == 1) {
                        strLaTeX += "r";
                    }
                    if (matrice[i][j].borderRight == 1) {
                        strLaTeX += " |}{";
                    }
                    else {
                        strLaTeX += "}{";
                    }
                    nbCrochets++;
                }
            }
            // Avec cases fusionnées sur la ligne (gauche à droite) alors seulement pour la 1ère case de la ligne fusionnée
            if ((matrice[i][j].col.length > 1 && matrice[i][j].col[0] == j + 1) || matrice[i][j].col.length == 1 || (matrice[i][j].row.length == 1 && matrice[i][j].col.length == 1)) {
                // Avec la fusion de colonne (haut en bas), on empeche de remplir les cases en-dessous de la 1ère de la fusion
                if ((matrice[i][j].row.length > 1 && matrice[i][j].row[0] == i + 1) || matrice[i][j].row.length == 1 || (matrice[i][j].row.length == 1 && matrice[i][j].col.length == 1)) {
                    if (matrice[i][j].row.length > 1 && matrice[i][j].row[0] == i + 1) {
                        strLaTeX += "\\multirow{" + matrice[i][j].row.length + "}{*}{";
                        nbCrochets++;
                    }
                    //Color
                    if (matrice[i][j].textColor == 1) {
                        strLaTeX += "\\color[HTML]{" + matrice[i][j].textColorCode + "}";
                    }
                    //Bold
                    if (matrice[i][j].bold == 1) {
                        strLaTeX += "\\textbf{";
                        nbCrochets++;
                    }
                    //Italic
                    if (matrice[i][j].italic == 1) {
                        strLaTeX += "\\textit{";
                        nbCrochets++;
                    }
                    //Underline
                    if (matrice[i][j].underline == 1) {
                        strLaTeX += "{\\ul ";
                        nbCrochets++;
                    }
                    //Début écriture mathématiques
                    if (modeMaths === true && matrice[i][j].value != "") {
                        strLaTeX += "$";
                    }
                    strLaTeX += matrice[i][j].value;

                    //Fin écriture mathématiques
                    if (modeMaths === true && matrice[i][j].value != "") {
                        strLaTeX += "$";
                    }
                }
            }
            //Fermeture des crochets
            for (let k = 0; k < nbCrochets; k++) {
                strLaTeX += "}";
            }

            //Suivant
            //Si case sur une même ligne fusionnées alors pas de & sauf pour la dernière case de la fusion
            if ((matrice[i][j].col.length > 1 && matrice[i][j].col[matrice[i][j].col.length - 1] == j + 1) || matrice[i][j].col.length == 1) {
                if (j != matrice[i].length - 1) {
                    strLaTeX += " & ";
                }
            }
        }
        strLaTeX += " \\\\";
        strLaTeX += "\n";

        //Si la ligne basse de i est entièrement avec une bordure
        if (fullBorderRow[i + 1] === matrice[0].length) {
            strLaTeX += "\\hline\n";
        }
        else if(fullBorderRow[i + 1] > 0) { //Si seulement une ou plusieurs partie de la ligne basse de i est avec une bordure
            let nbBorder = 0;
            for (let j = 0; j < matrice[i].length; j++) {
                if (matrice[i][j].borderBottom == 1) {
                    if (nbBorder == 0) {
                        strLaTeX += "\\cline{";
                        strLaTeX += j + 1;
                        strLaTeX += "-"
                        nbBorder = j + 1;
                    }
                    else {
                        nbBorder++;
                    }
                }
                else if (matrice[i][j].borderBottom == 0 && nbBorder != 0) {
                    strLaTeX += nbBorder;
                    strLaTeX += "}";
                    nbBorder = 0;
                }
            }
            if (nbBorder != 0) {
                strLaTeX += nbBorder;
                strLaTeX += "}";
            }
            strLaTeX += "\n";
        }
    }

    strLaTeX += "\\end{tabular}\n";

    const resDiv = document.getElementById('generateLatex')
    while (resDiv.hasChildNodes()) {
        resDiv.removeChild(resDiv.firstChild);
    }

    str = strMessage + strPackage + strLaTeX;
    //Compte le nombre de saut de ligne pour connaitre hauteur TextArea
    let nbrowsTextArea = (str.match(/\n/g) || []).length + 1;

    const newTextArea = document.createElement("textarea");
    newTextArea.rows = nbrowsTextArea;
    newTextArea.cols = 50;
    newTextArea.value = str;
    newTextArea.className = "form-control";
    newTextArea.id = "to-copy";

    resDiv.appendChild(newTextArea);
    
    return [ strPackage, strLaTeX ];
}

function OverviewLatex() {
    let values = GenerateToLatex();

    let packageCode = values[0].replace(/%/g, ""); //On enlève les % du code LaTeX qui commentaient les packages à ajouter
    packageCode = encodeURIComponent(packageCode);
    let latexCode = encodeURIComponent(values[1]);

    let url = "https://latexonline.cc/compile?text=\\documentclass[10pt,a4paper]{article}" + packageCode + "\\begin{document}"+ latexCode +"\\end{document}&force=true";
    
    const IframeLateX = document.getElementById("IframeLaTeX");
    IframeLateX.parentNode.classList.remove("d-none");
    IframeLateX.src = url;

    document.getElementById("boutonPDF").innerText = "Actualiser le PDF";
}

export { GenerateToLatex, OverviewLatex};