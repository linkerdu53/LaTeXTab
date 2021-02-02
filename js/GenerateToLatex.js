
const mainTable = document.getElementsByClassName('mainTable')[0];

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
    let str = "";

    str += "\\begin{table}[]\n";
    str += "\\begin{tabular}{lll}\n";

    //Récupération contenu des inputs
    /*for (let i = 0; i < array.length; i++) {
        const element = array[i];
        
    }*/

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