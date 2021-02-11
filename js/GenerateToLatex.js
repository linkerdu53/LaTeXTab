
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
            if (input.classList.contains("alignLeftOn")) { 
                matrice[i][j].alignLeft = 1;
            }
            if (input.classList.contains("alignCenterOn")) { 
                matrice[i][j].alignCenter = 1;
            }
            if (input.classList.contains("alignRightOn")) { 
                matrice[i][j].alignRight = 1;
            }
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

    str += "\\begin{tabular}{ ";
    for (let i = 0; i < matrice[0].length; i++) {
        str += "l ";
    }   
    str+= "}\n";

    for (let i = 0; i < matrice.length; i++) {
        
        let fullBorderRow = 0;
        for (let j = 0; j < matrice[i].length; j++) {
            if (matrice[i][j].borderLeft && matrice[i][j].borderRight && matrice[i][j].borderTop && matrice[i][j].borderBottom) {
                fullBorderRow++;
            }
        }
        if (fullBorderRow === matrice[i].length) {
            str += "\\hline\n";
        }

        for (let j = 0; j < matrice[i].length; j++) {

            let nbCrochets = 0;
            //Align center
            if (matrice[i][j].alignCenter == 1) {
                str += "\\multicolumn{1}{c}{";
                nbCrochets++;
            }
            //Align right
            if (matrice[i][j].alignRight == 1) {
                str += "\\multicolumn{1}{r}{";
                nbCrochets++;
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
        if (i < matrice.length - 1) {
            str += "\\\\";
        }
        str += "\n";
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