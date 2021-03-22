import { casesSelection } from './InputSelection.js';
import { AddEventInput } from './TableInput.js';

function Fusion() {
    // Pas assez de cases à fusionner
    if (casesSelection.length < 2) {
        return
    }
    // Regroupage des cases à fusioner
    let casesSort = casesSelection.slice()
    casesSort.sort((a, b) => { return a.parentNode.dataset.col - b.parentNode.dataset.col })
    casesSort.sort((a, b) => { return a.parentNode.dataset.row - b.parentNode.dataset.row })
    let tdGroups = []
    tdGroups.push([casesSort[0].parentNode])
    for (let i = 1; i < casesSort.length; i++) {
        //Test si sur la même ligne et à coté du groupe précédent
        if (casesSort[i].parentNode.dataset.row == tdGroups[tdGroups.length - 1][tdGroups[tdGroups.length - 1].length - 1].dataset.row && casesSort[i].parentNode.dataset.col - 1 == tdGroups[tdGroups.length - 1][tdGroups[tdGroups.length - 1].length - 1].dataset.col) {
            tdGroups[tdGroups.length - 1].push(casesSort[i].parentNode)
        }
        //Test si sur la même colonne et en dessous
        else if (casesSort[i].parentNode.dataset.row - 1 == tdGroups[tdGroups.length - 1][tdGroups[tdGroups.length - 1].length - 1].dataset.row && casesSort[i].parentNode.dataset.col == tdGroups[tdGroups.length - 1][tdGroups[tdGroups.length - 1].length - 1].dataset.col) {
            tdGroups[tdGroups.length - 1].push(casesSort[i].parentNode)
        }
        //Sinon on créer une nouvelle zone
        else {
            tdGroups.push([casesSort[i].parentNode])
        }
    }

    //Une fois les cases regroupée par zones
    for (let i = 0; i < tdGroups.length; i++) {
        if (tdGroups[i].length > 1) { // Il faut + d'une case pour fusionner
            const newTd = document.createElement("td")
            newTd.dataset.row = tdGroups[i][0].dataset.row
            newTd.dataset.col = tdGroups[i][0].dataset.col
            if (tdGroups[i][0].dataset.row == tdGroups[i][1].dataset.row) { //Si sur la même ligne
                newTd.colSpan = tdGroups[i].length
            }
            else {
                newTd.rowSpan = tdGroups[i].length
            }
            newTd.classList.add("tdMainTable")
            const newInput = document.createElement("input")
            newInput.type = 'text'
            newInput.classList.add("tdInputText");
            if (tdGroups[i][0].dataset.row == tdGroups[i][1].dataset.row) { //Si sur la même ligne
                let newWidth = 0
                for (let j = 0; j < tdGroups[i].length; j++) {
                    newWidth += parseInt(tdGroups[i][j].children[0].style.width)
                }
                newInput.style.minWidth = newWidth + 'px'
            }
            else {
                let newHeight = 0
                for (let j = 0; j < tdGroups[i].length; j++) {
                    if (tdGroups[i][j].children[0].style.lineHeight) {
                        newHeight += parseInt(tdGroups[i][j].children[0].style.lineHeight)
                    }
                    else {
                        newHeight += 32
                    }
                }
                newInput.style.lineHeight = newHeight + 'px'
            }
            AddEventInput(newInput)

            newTd.appendChild(newInput)

            tdGroups[i][0].parentNode.insertBefore(newTd, tdGroups[i][0])

            for (let j = 0; j < tdGroups[i].length; j++) {
                tdGroups[i][j].remove()
            }
        }
    }
}

export { Fusion }