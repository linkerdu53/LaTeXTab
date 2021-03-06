
const mainTable = document.getElementsByClassName('mainTable')[0];

function GetTableData() {
    let matrice = [];
    const tbody = mainTable.childNodes[3];
    let nbrow = tbody.children.length - 1;

    for (let i = 0; i < nbrow; i++) {
        matrice.push([]);
        let row = tbody.children[i];
        let nbtd;
        if (i == 0) {
            nbtd = row.children.length - 2;
        }
        else {
            nbtd = row.children.length - 1;
        }
        for (let j = 0; j < nbtd; j++) {
            let input = row.children[j + 1].children[0];

            matrice[i][j] = {};
            matrice[i][j].value = input.value;
            if (input.classList.contains("boldOn")) { 
                matrice[i][j].bold = 1;
            }
            if (input.classList.contains("italicOn")) { 
                matrice[i][j].italic = 1;
            }
            if (input.classList.contains("underlineOn")) { 
                matrice[i][j].underline = 1;
            }
            if (input.classList.contains("colorOn")) { 
                matrice[i][j].textColor = 1;
                let matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
                let match = matchColors.exec(input.style.color);
                console.log(match)
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

    let str = "";
    if (matrice.some(row => row.some(col => col['underline'] === 1))) {
        str += "% Vous devez ajouter les 2 packages suivants pour pouvoir souligner :\n"
        str += "% \\usepackage[normalem]{ulem}\n";
        str += "% \\useunder{\\uline}{\\ul}{}\n\n\n"
    }
    if (matrice.some(row => row.some(col => col['textColor'] === 1))) {
        str += "% Vous devez ajouter le package suivant pour pouvoir colorer le texte :\n"
        str += "% \\usepackage[table,xcdraw]{xcolor}\n\n\n";
    }

    let modeMaths = document.getElementById('modeMaths').checked;
    if (modeMaths === true) {
        str += "% \\usepackage{amsmath,amsfonts,amssymb}\n\n";
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

    str += "\\begin{tabular}{ ";

    //Si bordure sur toute la colonne à gauche
    if (fullBorderColonne[0] === matrice.length) {
        str += "|";
    }
    for (let i = 0; i < matrice[0].length; i++) {
        str += " l ";
        if (fullBorderColonne[i + 1] === matrice.length) {
            str += "|";
        }
    }   
    str+= "}\n";

    //Si la ligne du haut est entièrement avec une bordure
    if (fullBorderRow[0] === matrice[0].length) {
        str += "\\hline\n";
    }
    else if(fullBorderRow[0] > 0) { //Si seulement une ou plusieurs partie de la ligne du haut est avec une bordure
        let nbBorder = 0;
        for (let j = 0; j < matrice[0].length; j++) {
            if (matrice[0][j].borderTop == 1) {
                if (nbBorder == 0) {
                    str += "\\cline{";
                    str += j + 1;
                    str += "-"
                    nbBorder = j + 1;
                }
                else {
                    nbBorder++;
                }
            }
            else if (matrice[0][j].borderTop == 0 && nbBorder != 0) {
                str += nbBorder;
                str += "}";
                nbBorder = 0;
            }
        }
        if (nbBorder != 0) {
            str += nbBorder;
            str += "}";
        }
        str += "\n";
    }
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            let nbCrochets = 0;
            if (matrice[i][j].alignCenter == 1 || matrice[i][j].alignRight == 1 || (j == 0 && fullBorderColonne[0] != 0 && fullBorderColonne[0] != matrice.length) || (fullBorderColonne[j + 1] != 0 && fullBorderColonne[j + 1] != matrice.length)) {
                str += "\\multicolumn{1}{";
                if (j == 0 && matrice[i][j].borderLeft == 1) {
                    str += "| "
                }
                if (matrice[i][j].alignLeft == 1) {
                    str += "l";
                }
                else if (matrice[i][j].alignCenter == 1) {
                    str += "c";
                }
                else if (matrice[i][j].alignRight == 1) {
                    str += "r";
                }
                if (matrice[i][j].borderRight == 1) {
                    str += " |}{";
                }
                else {
                    str += "}{";
                }
                nbCrochets++;
            }
            //Color
            if (matrice[i][j].textColor == 1) {
                str += "\\color[HTML]{" + matrice[i][j].textColorCode + "}";
            }
            //Bold
            if (matrice[i][j].bold == 1) {
                str += "\\textbf{";
                nbCrochets++;
            }
            //Italic
            if (matrice[i][j].italic == 1) {
                str += "\\textit{";
                nbCrochets++;
            }
            //Underline
            if (matrice[i][j].underline == 1) {
                str += "{\\ul ";
                nbCrochets++;
            }
            //Début écriture mathématiques
            if (modeMaths === true && matrice[i][j].value != "") {
                str += "$";
            }
            str += matrice[i][j].value;

            //Fin écriture mathématiques
            if (modeMaths === true && matrice[i][j].value != "") {
                str += "$";
            }
            //Fermeture bold/italic
            for (let k = 0; k < nbCrochets; k++) {
                str += "}";
            }

            //Suivant

            if (j != matrice[i].length - 1) {
                str += " & ";
            }           
        }
        str += " \\\\";
        str += "\n";

        //Si la ligne basse de i est entièrement avec une bordure
        if (fullBorderRow[i + 1] === matrice[0].length) {
            str += "\\hline\n";
        }
        else if(fullBorderRow[i + 1] > 0) { //Si seulement une ou plusieurs partie de la ligne basse de i est avec une bordure
            let nbBorder = 0;
            for (let j = 0; j < matrice[i].length; j++) {
                if (matrice[i][j].borderBottom == 1) {
                    if (nbBorder == 0) {
                        str += "\\cline{";
                        str += j + 1;
                        str += "-"
                        nbBorder = j + 1;
                    }
                    else {
                        nbBorder++;
                    }
                }
                else if (matrice[i][j].borderBottom == 0 && nbBorder != 0) {
                    str += nbBorder;
                    str += "}";
                    nbBorder = 0;
                }
            }
            if (nbBorder != 0) {
                str += nbBorder;
                str += "}";
            }
            str += "\n";
        }
    }

    str += "\\end{tabular}\n";

    const resDiv = document.getElementById('generateLatex')
    while (resDiv.hasChildNodes()) {
        resDiv.removeChild(resDiv.firstChild);
    }

    //Compte le nombre de saut de ligne pour connaitre hauteur TextArea
    let nbrowsTextArea = (str.match(/\n/g) || []).length + 1;

    const newTextArea = document.createElement("textarea");
    newTextArea.rows = nbrowsTextArea;
    newTextArea.cols = 50;
    newTextArea.value = str;
    newTextArea.className = "form-control";
    newTextArea.id = "to-copy";

    resDiv.appendChild(newTextArea);
}

export { GenerateToLatex };