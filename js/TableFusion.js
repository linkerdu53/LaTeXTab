import { casesSelection } from './InputSelection.js';

function Fusion() {
    // Pas assez de cases à fusionner
    if (casesSelection.length < 2) {
        return
    }
    // Regroupage des cases à fusioner
    let casesSort = casesSelection.slice()
    casesSort.sort((a, b) => { return a.parentNode.dataset.col - b.parentNode.dataset.col })
    casesSort.sort((a, b) => { return a.parentNode.dataset.row - b.parentNode.dataset.row })
    let inputsGroups = []
    inputsGroups.push([casesSort[0]])
    for (let i = 0; i < casesSort.length; i++) {
        //Test si sur la même ligne et à coté
        console.log(inputsGroups[inputsGroups.length - 1])
        console.log(inputsGroups[0][0])
        console.log(inputsGroups[inputsGroups.length - 1][inputsGroups[0].length - 1])
        console.log(inputsGroups[inputsGroups.length - 1][inputsGroups[inputsGroups.length - 1].length])
        if (casesSort[i].parentNode.dataset.row == inputsGroups[inputsGroups.length - 1][inputsGroups[inputsGroups.length - 1].length].parentNode.dataset.row && casesSort[i].parentNode.dataset.col == inputsGroups[inputsGroups.length - 1].parentNode.dataset.col + 1) {
            inputsGroups[inputsGroups.length].push(casesSort[i])
        }
        //Test si sur la même colonne et en dessous
        else if (casesSort[i].parentNode.dataset.row == inputsGroups[inputsGroups.length - 1].parentNode.dataset.row + 1 && casesSort[i].parentNode.dataset.col == inputsGroups[inputsGroups.length - 1].parentNode.dataset.col) {
            inputsGroups[inputsGroups.length].push(casesSort[i])
        }
        //Sinon on créer une nouvelle zone
        else {
            inputsGroups.push(casesSort[i])
        }
    }

    console.log(inputsGroups)

    //Une fois les cases regroupée par zones
    for (let i = 0; i < inputsGroups.length; i++) {
        
    }
}

export { Fusion }