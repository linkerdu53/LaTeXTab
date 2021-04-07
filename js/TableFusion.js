import { casesSelection } from './InputSelection.js';
import { AddEventInput } from './TableInput.js';

//Test si les 2 strings contiennent au moins 1 nombre en commun
function IsStrsContains1Elt(row1, row2) {
    if (row1.split(' ').some(v => row2.includes(v))) {
        return true
    } else {
        return false
    }
}

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
    console.log(casesSort)
    //On parcours de gauche à droite et de haut en bas
    for (let i = 1; i < casesSort.length; i++) {
        //Test si sur la même ligne et à coté du groupe précédent
        let caseRow = casesSort[i].parentNode.dataset.row
        let caseCol = casesSort[i].parentNode.dataset.col
        let lastGroupRow = tdGroups[tdGroups.length - 1][tdGroups[tdGroups.length - 1].length - 1].dataset.row
        let lastGroupCol = tdGroups[tdGroups.length - 1][tdGroups[tdGroups.length - 1].length - 1].dataset.col
        if (IsStrsContains1Elt(caseRow, lastGroupRow)) {
            tdGroups[tdGroups.length - 1].push(casesSort[i].parentNode)
        }
        //Test si sur la même colonne et en dessous
        else if (IsStrsContains1Elt(caseCol, lastGroupCol)) {
            tdGroups[tdGroups.length - 1].push(casesSort[i].parentNode)
        }
        //Sinon on créer une nouvelle zone
        else {
            tdGroups.push([casesSort[i].parentNode])
        }
    }

    console.log(tdGroups)

    //Une fois les cases regroupée par zones
    for (let i = 0; i < tdGroups.length; i++) {
        if (tdGroups[i].length > 1) { // Il faut + d'une case pour fusionner
            const newTd = document.createElement("td")

            //On stock le premier et le dernier
            newTd.dataset.row = tdGroups[i][0].dataset.row + ' ' + tdGroups[i][tdGroups[i].length - 1].dataset.row
            newTd.dataset.col = tdGroups[i][0].dataset.col + ' ' + tdGroups[i][tdGroups[i].length - 1].dataset.col
            if (IsStrsContains1Elt(tdGroups[i][0].dataset.row, tdGroups[i][1].dataset.row)) {
                for (let j = 0; j < tdGroups[i].length; j++) {
                    newTd.colSpan += tdGroups[i][j].dataset.col.split(" ").length
                }
                newTd.colSpan-- //Car colSpan init à 1
            }
            else {
                newTd.rowSpan = tdGroups[i].length
            }
            newTd.classList.add("tdMainTable")
            const newInput = document.createElement("input")
            newInput.type = 'text'
            newInput.classList.add("tdInputText");
            if (IsStrsContains1Elt(tdGroups[i][0].dataset.row, tdGroups[i][1].dataset.row)) { //Si sur la même ligne
                let newWidth = 0
                for (let j = 0; j < tdGroups[i].length; j++) {
                    if (tdGroups[i][j].children[0].style.width) {
                        newWidth += parseInt(tdGroups[i][j].children[0].style.width) + 7
                    }
                    else if (tdGroups[i][j].children[0].style.minWidth) {
                        newWidth += parseInt(tdGroups[i][j].children[0].style.minWidth) + 7
                    }
                    else {
                        newWidth += 40
                    }
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
                        newHeight += 40
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