
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
            if (input.classList.contains("bold") == bold) { 
                matrice[i][j].bold = 1;
            }
        }
    }

    return matrice;
}

function GenerateToLatex() {
    let matrice = GetTableData();

    let str = "";

    str += "\\begin{table}[]\n";
    str += "\\begin{tabular}{";
    for (let i = 0; i < matrice[0].length; i++) {
        str += "l";
    }   
    str+= "}\n";

    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {

            //Si gras
            if (matrice[i][j].bold == 1) {
                str += "\\textbf{";
                str += matrice[i][j].value;
                str += "}";
            }
            else {
                str += matrice[i][j].value;
            }
            //Si italique

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
    str += "\\end{table}\n";

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

    resDiv.appendChild(newTextArea);
}

export { GenerateToLatex };