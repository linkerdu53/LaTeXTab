
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
    
    const resDiv = document.getElementById('generateLatex')
    //On clear
    while (resDiv.firstChild) {
        resDiv.removeChild(resDiv.lastChild);
    }
    //On ajoute
    let newtable = document.createElement('span');
    newtable.innerText = "\\begin{table}[]";    
    resDiv.appendChild(newtable);

    let sautdeligne = document.createElement('br');
    resDiv.appendChild(sautdeligne);

    newtable = document.createElement('span');
    newtable.innerText = "\\begin{tabular}{lll}";    
    resDiv.appendChild(newtable);

    sautdeligne = document.createElement('br');
    resDiv.appendChild(sautdeligne);

    //Récupération contenu des inputs


    sautdeligne = document.createElement('br');
    resDiv.appendChild(sautdeligne);

    newtable = document.createElement('span');
    newtable.innerText = "\\end{tabular}";    
    resDiv.appendChild(newtable);

    sautdeligne = document.createElement('br');
    resDiv.appendChild(sautdeligne);

    newtable = document.createElement('span');
    newtable.innerText = "\\end{table}";    
    resDiv.appendChild(newtable);
}

export { GenerateToLatex };