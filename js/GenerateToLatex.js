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

            matrice[i][j].fusionRow = 0;
            if(matrice[i][j].row.length != 1) {
                matrice[i][j].fusionRow = 1;
            }
            matrice[i][j].fusionCol = 0;
            if(matrice[i][j].col.length != 1) {
                matrice[i][j].fusionCol = 1;
            }

            if (input.classList.contains("boldOn")) { 
                matrice[i][j].bold = 1;
            }
            if (input.classList.contains("italicOn")) { 
                matrice[i][j].italic = 1;
            }
            if (input.classList.contains("underlineOn")) { 
                matrice[i][j].underline = 1;
            }
            if (input.classList.contains("modeMathOn")) {
                matrice[i][j].math = 1;
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
                //Test pour cases fusionnées, bordure gauche seulement pour la case la + à gauche de la fusion
                if (matrice[i][j].col[0] == j + 1) {
                    matrice[i][j].borderLeft = 1;
                }
            }
            if (input.classList.contains("borderRightOn")) {
                //Test pour cases fusionnées, bordure droite seulement pour la case la + à droite de la fusion
                if (matrice[i][j].col[matrice[i][j].col.length - 1] == j + 1) {
                    matrice[i][j].borderRight = 1;
                }
            }
            if (input.classList.contains("borderTopOn")) {
                //Test pour cases fusionnées, bordure haute seulement pour la case la + haute de la fusion
                if (matrice[i][j].row[0] == i + 1) {
                    matrice[i][j].borderTop = 1;
                }
            }
            if (input.classList.contains("borderBottomOn")) {
                //Test pour cases fusionnées, bordure basse seulement pour la case la + basse de la fusion
                if (matrice[i][j].row[matrice[i][j].row.length - 1] == i + 1) {
                    matrice[i][j].borderBottom = 1;
                }
            }
        }
    }
    return matrice;
}

function rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// On gere le toogle pour que le tableau prenne la largeur de la page
var largeurCheck = 0;
$(document).ready(function(){
    $('input[type="checkbox"]').click(function(){
      GenerateToLatex();
    });
});

function GenerateToLatex() {
    if(document.getElementById("customSwitch1").checked === true) {
        largeurCheck = 1;
    }
    else {
        largeurCheck = 0;
    }

    let matrice = GetTableData();
    let strMessage = "";
    let strPackage = "";
    let strLaTeX = ""
    let str = "" //Concaténation de strMessage + strPackage + strLaTeX

    strMessage += "% Vous devez ajouter les 2 packages suivants pour avoir les lettres avec accents par exemple :\n";
    strPackage += "% \\usepackage[utf8]{inputenc}\n";
    strPackage += "% \\usepackage[T1]{fontenc}\n";

    if (largeurCheck == 1) {
        strMessage += "% Vous devez ajouter les 2 packages suivants pour faire prendre la largeur au tableau:\n"
        strPackage += "% \\usepackage{graphicx}\n"
        strPackage += "% \\usepackage{array}\n\n"
    }
    if (matrice.some(row => row.some(col => col['underline'] === 1))) {
        strMessage += "% Vous devez ajouter les 2 packages suivants pour pouvoir souligner :\n"
        strPackage += "% \\usepackage[normalem]{ulem}\n"
        strPackage += "% \\useunder{\\uline}{\\ul}{}\n\n"
    }
    if (matrice.some(row => row.some(col => col['textColor'] === 1))) {
        strMessage += "% Vous devez ajouter le package suivant pour pouvoir colorer le texte :\n"
        strPackage += "% \\usepackage[table,xcdraw]{xcolor}\n\n"
    }
    if (matrice.some(row => row.some(col => col['row'].length > 1))) {
        strMessage += "% Vous devez ajouter le package suivant pour pouvoir fusionner de haut en bas :\n"
        strPackage += "% \\usepackage{multirow}\n\n"
    }
    if (matrice.some(row => row.some(col => col['math'] === 1))) {
        strMessage += "% Vous devez ajouter le package suivant pour pouvoir utiliser l'écriture mathématique :\n"
        strPackage += "% \\usepackage{amsmath,amsfonts,amssymb}\n\n"
    }
    if (matrice.some(row => row.some(col => col['textColor'] === 1))) {
        strMessage += "% Vous devez ajouter le package suivant pour pouvoir colorer le texte :\n"
        strPackage += "% \\usepackage[table,xcdraw]{xcolor}\n\n"
    }

    //On remplie 2 tableaux de bordure pour les colonnes et rangées
    let fullBorderColonne = Array(matrice[0].length + 1).fill(0);
    let fullBorderRow = Array(tableSize.row + 1).fill(0);
    for (let i = 0; i < tableSize.row; i++) {
        for (let j = 0; j < tableSize.col; j++) {
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

    //On génère 2 matrices qui permettent de savoir s'il faut mettre des bordures ou non
    let matriceBorduresLignes = Array(tableSize.row + 1).fill().map(() => Array(matrice[0].length).fill(false))
    let matriceBorduresColonnes = Array(tableSize.row).fill().map(() => Array(matrice[0].length + 1).fill(false))
    for (let i = 0; i < tableSize.row; i++) {
        for (let j = 0; j < tableSize.col; j++) {
            if (matrice[i][j].borderTop == 1) {
                matriceBorduresLignes[i][j] = true
            }
            if (matrice[i][j].borderBottom == 1) {
                matriceBorduresLignes[i + 1][j] = true
            }
            if (matrice[i][j].borderLeft == 1) {
                matriceBorduresColonnes[i][j] = true
            }
            if (matrice[i][j].borderRight == 1) {
                matriceBorduresColonnes[i][j + 1] = true
            }
        }
    }

    if (largeurCheck == 1) {
        strLaTeX += "\\centering\n\\resizebox{\\linewidth}{!}{%\n";
    }
 
    strLaTeX += "\\begin{tabular}{ ";

    //Si bordure sur toute la colonne
    //La 1ère
    if (fullBorderColonne[0] === tableSize.row) {
        strLaTeX += "|";
    }
    //Les suivantes
    for (let i = 1; i < matrice[0].length + 1; i++) {
        if (largeurCheck == 1) {
            strLaTeX += ">{\\hspace{0pt}}m{0.2\\linewidth}";
        }
        else {
            strLaTeX += " l ";
        }
        if (fullBorderColonne[i] === tableSize.row) {
            strLaTeX += "|";
        }
    }   
    strLaTeX+= "}\n";

    //Ligne de la bordure du haut
    strLaTeX += ligneBordure(0, matrice[0], fullBorderRow, matriceBorduresLignes[0])
 
    for (let i = 0; i < tableSize.row; i++) {
        for (let j = 0; j < tableSize.col; j++) {
            let nbCrochets = 0;
 
            //GESTION de \\multicolumn{}{ contenu dans bordureColonneEtAlignement()
            //Si cases sur une ligne non fusionnées OU si cases sur une ligne fusionnées alors on ne regarde que la dernière case
            if (matrice[i][j].col.length == 1 || (matrice[i][j].col.length > 1 && matrice[i][j].col[matrice[i][j].col.length - 1] == j + 1)) {
                //Si alignement OU si bordures mais pas sur toute la colonne OU si case sur une ligne fusionnées
                if (matrice[i][j].alignCenter == 1 || matrice[i][j].alignRight == 1 ||
                    (j == 0 && fullBorderColonne[0] != 0 && fullBorderColonne[0] != tableSize.row) || (fullBorderColonne[j + 1] != 0 && fullBorderColonne[j + 1] != tableSize.row) ||
                    matrice[i][j].col.length > 1
                ) {
                    strLaTeX += bordureColonneEtAlignement(matrice, i, j)
                    nbCrochets++
                }
            }

            // Avec cases fusionnées sur la ligne (gauche à droite) alors seulement pour la dernière case de la ligne fusionnée
            if (matrice[i][j].col.length == 1 || (matrice[i][j].col.length > 1 && matrice[i][j].col[matrice[i][j].col.length - 1] == j + 1) || (matrice[i][j].row.length == 1 && matrice[i][j].col.length == 1)) {
                // Avec la fusion de colonne (haut en bas), on empeche de remplir les cases en-dessous de la 1ère de la fusion
                if (matrice[i][j].row.length == 1 || (matrice[i][j].row.length > 1 && matrice[i][j].row[0] == i + 1) || (matrice[i][j].row.length == 1 && matrice[i][j].col.length == 1)) {
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
                    if (matrice[i][j].math == 1 && matrice[i][j].value != "") {
                        strLaTeX += "$";
                    }

                    //Ecriture de l'input
                    //On gère les caractères spéciaux
                    let listCaracteres = ['&', '"', '_','^', '$', '~', '#', '{', '[', '|', '`', '^', '@', ']', '}', '§', '<', '>', '²', '°', '%'];
                    let newChaine = "";
                    for (let k = 0; k < matrice[i][j].value.length; k++) {
                        if (listCaracteres.includes(matrice[i][j].value[k])) {  
                            newChaine += "\\";
                            newChaine += matrice[i][j].value[k];
                        }
                        else {
                            newChaine += matrice[i][j].value[k];
                        }
                    }
                    strLaTeX += newChaine;
                    
                    //Fin écriture mathématiques
                    if (matrice[i][j].math == 1 && matrice[i][j].value != "") {
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
            if (matrice[i][j].col.length == 1 || (matrice[i][j].col.length > 1 && matrice[i][j].col[matrice[i][j].col.length - 1] == j + 1)) {
                //Pas de & si dernière case de la ligne
                if (j != tableSize.col - 1) {
                    strLaTeX += " & ";
                }
            }
        }
        strLaTeX += " \\\\";
        strLaTeX += "\n";

        //Ajout de \hline OU \cline{?-?} si nécessaire
        strLaTeX += ligneBordure(i + 1, matrice[i], fullBorderRow, matriceBorduresLignes[i + 1])
    }

    strLaTeX += "\\end{tabular}\n";
    if (largeurCheck == 1) {
        strLaTeX += "}\n";
    }

    //On récupère la zone de texte et on supprime ce qu'il y a à l'intérieur
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

function ligneBordure(ligne, ligneMatrice, fullBorderRow, matriceBorduresLignes) {
    let strLaTeX = ""
    //Si la ligne est entièrement avec une bordure
    if (fullBorderRow[ligne] === ligneMatrice.length) {
        strLaTeX += "\\hline\n";
    }
    else if(fullBorderRow[ligne] > 0) { //Si seulement une ou plusieurs partie de la ligne du haut est avec une bordure
        let nbBorder = 0;
        for (let j = 0; j < ligneMatrice.length; j++) {
            if ((ligne == 0 && matriceBorduresLignes[j] == true) || (ligne =! 0 && matriceBorduresLignes[j] == true)) {
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
            else if (((ligne == 0 && matriceBorduresLignes[j] == true) || (ligne =! 0 && matriceBorduresLignes[j] == true)) && nbBorder != 0) {
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
    return strLaTeX
}

function bordureColonneEtAlignement(matrice, ligne, col) {
    let strLaTeX = ""
    strLaTeX += "\\multicolumn{"
    strLaTeX += matrice[ligne][col].col.length + "}{"
    //Si case fusionnée alors on regarde la case la plus à gauche de la fusion
    if (matrice[ligne][col].borderLeft == 1 || matrice[ligne][matrice[ligne][col].col[0] - 1].borderLeft == 1) {
        strLaTeX += "| "
    }
    if (matrice[ligne][col].alignLeft == 1) {
        strLaTeX += "l";
    }
    else if (matrice[ligne][col].alignCenter == 1) {
        strLaTeX += "c";
    }
    else if (matrice[ligne][col].alignRight == 1) {
        strLaTeX += "r";
    }
    if (matrice[ligne][col].borderRight == 1) {
        strLaTeX += " |";
    }
    strLaTeX += "}{";

    return strLaTeX
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