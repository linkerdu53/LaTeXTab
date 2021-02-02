
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
        console.log(row);
        for (let j = 0; j < nbtd; j++) {
            matrice[i][j] = row.children[j + 1].children[0].value;
        }
    }
    console.log(matrice);

    return matrice;
}

function GenerateToLatex() {
    /*
    \begin{table}[]
    \begin{tabular}{lll}
    &  &  \\
    &  &  \\
    &  & 
    \end{tabular}
    \end{table}
    */
    let matrice = GetTableData();

    let str = "";

    str += "\\begin{table}[]\n";
    str += "\\begin{tabular}{lll}\n";

    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            str += matrice[i][j];
            str += " & ";
        }
        str += "\n";
    }

    str += "\\end{tabular}\n";
    str += "\\end{table}\n";

    const resDiv = document.getElementById('generateLatex')
    while (resDiv.hasChildNodes()) {
        resDiv.removeChild(resDiv.firstChild);
    }

    const newTextArea = document.createElement("textarea");
    newTextArea.rows = 20;
    newTextArea.cols = 50;
    newTextArea.value = str;

    resDiv.appendChild(newTextArea);
}

export { GenerateToLatex };