
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

function GenerateToLatex() {
    let matrice = GetTableData();
    let matriceSize = matrice.length * matrice[0].length;

    let str = "";

    if (matrice.some(row => row.some(col => col['underlineOn'] === 1))) {
        str += "% Vous devez ajouter les 2 packages suivants pour pouvoir souligner :\n"
        str += "% \\usepackage[normalem]{ulem}\n";
        str += "% \\useunder{\\uline}{\\ul}{}\n\n\n"
    }

    let modeMaths = document.getElementById('modeMaths').checked;
    if (modeMaths === true) {
        str += "% \\usepackage{amsmath,amsfonts,amssymb}\n\n";
    }
    //On remplie 2 tableaux de bordure pour les colonnes et rangées
    let fullBorderTable = false;
    let fullBorderColonne = Array(matrice[0].length + 1).fill(0);
    let fullBorderRow = Array(matrice.length + 1).fill(0);
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            if (matrice[i][j].borderLeft) {
                fullBorderColonne[j]++;
                if (j + 1 === matrice[0].length && matrice[i][j].borderRight) {
                    fullBorderColonne[j + 1]++;
                }
            }
            if (matrice[i][j].borderTop) {
                fullBorderRow[i]++;
                if (i + 1 === matrice.length && matrice[i][j].borderBottom) {
                    fullBorderRow[i + 1]++;
                }
            }
        }
    }
    if (fullBorderRow.reduce((a, b) => a + b, 0) === (matrice.length + 1) * matrice[0].length && fullBorderColonne.reduce((a, b) => a + b, 0) === matrice.length * (matrice[0].length + 1)) {
        fullBorderTable = true;
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

    if (fullBorderRow[0] === matrice[0].length) {
        str += "\\hline\n";
    }
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {

            let nbCrochets = 0;
            //Si aligné à gauche avec bordure 
            if (fullBorderTable === false && (matrice[i][j].borderLeft == 1 || matrice[i][j].borderRight == 1) && matrice[i][j].alignLeft == 1) {
                str += "\\multicolumn{1}{";
                if (j == 0 && matrice[i][j].borderLeft == 1) {
                    str += "| "
                }
                str += "l";
                if (matrice[i][j].borderRight == 1) {
                    str += " |"
                }
                nbCrochets++;
            }
            if (matrice[i][j].alignCenter == 1 || matrice[i][j].alignRight == 1) {
                str += "\\multicolumn{1}{";
                if (fullBorderTable === false && j == 0 && matrice[i][j].borderLeft == 1) {
                    str += "| "
                }
                if (matrice[i][j].alignCenter == 1) {
                    str += "c";
                }
                else if (matrice[i][j].alignRight == 1) {
                    str += "r";
                }
                if (matrice[i][j].borderRight == 1) {
                    str += " |"
                }
                nbCrochets++;
            }
            if (fullBorderTable === false && (matrice[i][j].borderLeft == 1 || matrice[i][j].borderRight == 1) || (matrice[i][j].alignCenter == 1 || matrice[i][j].alignRight == 1)) {
                str += "}{";
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
        if (fullBorderRow[i + 1] === matrice[0].length) {
            str += "\\hline\n";
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