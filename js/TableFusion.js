import { casesSelection, DeselectAllInput } from './InputSelection.js';
import { AddEventInput } from './TableInput.js';
import { TableToMatrice } from './Table.js'

const tdInputText = document.getElementsByClassName('tdInputText');

//Test si les 2 strings contiennent au moins 1 nombre en commun
function IsStrsContains1Elt(str1, str2) {
    if (str1.split(' ').some(v => str2.includes(v))) {
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
    casesSort.sort((a, b) => { return a.parentNode.dataset.col.split(' ')[0] - b.parentNode.dataset.col.split(' ')[0] })
    casesSort.sort((a, b) => { return a.parentNode.dataset.row.split(' ')[0] - b.parentNode.dataset.row.split(' ')[0] })

    let tdGroups = []
    //Parcours de gauche à droite et de haut en bas
    for (let i = 0; i < casesSort.length; i++) {
        //Test si case est sélectionnée
        let voisinCote = 0 // 0 = pas de voisin sel, 1 = bas et 2 = droite
        //Si c'est le cas alors on créer un groupe puis on check les voisins pour fusionner
        tdGroups.push([casesSort[i].parentNode])
        //Comme sur Excel si le voisin en-dessous ou à droite est sélectionné alors on fusionnera en-dessous
        //Voisin en-dessous
        let casePrecedente = casesSort[i].parentNode;
        let newRowNumber = casesSort[i].parentNode.dataset.row.split(" ")
        newRowNumber = newRowNumber[newRowNumber.length - 1]
        newRowNumber = (parseInt(newRowNumber) + 1).toString()
        for (let j = 0; j < tdInputText.length; j++) {
            if (IsStrsContains1Elt(tdInputText[j].parentNode.dataset.row, newRowNumber) && IsStrsContains1Elt(tdInputText[j].parentNode.dataset.col, casesSort[i].parentNode.dataset.col)) {
                if (casesSelection.includes(tdInputText[j]) && tdInputText[j].parentNode.dataset.col == casesSort[i].parentNode.dataset.col) {
                    voisinCote = 1
                }
                break;
            }
        }
        //Si le voisin en-dessous n'est pas sélectionné alors on regarde celui de droite
        if (voisinCote == 0) {
            //Voisin à droite
            let newColNumber = casesSort[i].parentNode.dataset.col.split(" ")
            newColNumber = newColNumber[newColNumber.length - 1]
            newColNumber = (parseInt(newColNumber) + 1).toString()
            for (let j = 0; j < tdInputText.length; j++) {
                if (IsStrsContains1Elt(tdInputText[j].parentNode.dataset.row, casesSort[i].parentNode.dataset.row) && IsStrsContains1Elt(tdInputText[j].parentNode.dataset.col, newColNumber)) {
                    if (casesSelection.includes(tdInputText[j]) && tdInputText[j].parentNode.dataset.row == casesSort[i].parentNode.dataset.row) {
                        voisinCote = 2
                    }
                    break;
                }
            }
        }
        //Si voisin trouvé alors on continue à regarder sur la ligne ou la colonne tant les cases sélectionnée
        if (voisinCote != 0) {
            for (let j = 0; j < tdInputText.length; j++) {
                if (voisinCote == 1) { //En dessous
                    //Si case sur même colonne et ligne juste en dessous
                    let newRowNumber = casePrecedente.dataset.row.split(" ")
                    newRowNumber = newRowNumber[newRowNumber.length - 1]
                    newRowNumber = (parseInt(newRowNumber) + 1).toString()
                    if (IsStrsContains1Elt(tdInputText[j].parentNode.dataset.row, newRowNumber) && IsStrsContains1Elt(tdInputText[j].parentNode.dataset.col, casesSort[i].parentNode.dataset.col)) {
                        if (casesSelection.includes(tdInputText[j]) && tdGroups[tdGroups.length - 1].includes(tdInputText[j].parentNode) == false) { //Si selectionnee
                            casePrecedente = tdInputText[j].parentNode
                            tdGroups[tdGroups.length - 1].push(tdInputText[j].parentNode)
                            casesSort.splice(casesSort.indexOf(tdInputText[j]), 1)
                        }
                        else {
                            break;
                        }
                    }
                }
                else { //A droite
                    //Si case sur même ligne et colonne juste à côté
                    let newColNumber = casePrecedente.dataset.col.split(" ")
                    newColNumber = newColNumber[newColNumber.length - 1]
                    newColNumber = (parseInt(newColNumber) + 1).toString()
                    if (IsStrsContains1Elt(tdInputText[j].parentNode.dataset.row, casesSort[i].parentNode.dataset.row) && IsStrsContains1Elt(tdInputText[j].parentNode.dataset.col, newColNumber)) {
                        if (casesSelection.includes(tdInputText[j]) && tdGroups[tdGroups.length - 1].includes(tdInputText[j].parentNode) == false) { //Si selectionnee
                            casePrecedente = tdInputText[j].parentNode
                            tdGroups[tdGroups.length - 1].push(tdInputText[j].parentNode)
                            casesSort.splice(casesSort.indexOf(tdInputText[j]), 1)
                        }
                        else {
                            break;
                        }
                    }
                }
            }

        }
        //Sinon on passe à la case sélectionnée suivante
    }

    //Une fois les cases regroupée par zones
    for (let i = 0; i < tdGroups.length; i++) {
        if (tdGroups[i].length > 1) { // Il faut qu'il y ait + d'une case dans un groupe pour pouvoir fusionner
            const newTd = document.createElement("td")

            //On récupère les colonnes et les lignes de la nouvelle case en empechant les doublons
            let dataRow = []
            let dataCol = []
            for (let j = 0; j < tdGroups[i].length; j++) {
                if (dataRow.includes(tdGroups[i][j].dataset.row) == false) {
                    dataRow.push(tdGroups[i][j].dataset.row)
                }
                if (dataCol.includes(tdGroups[i][j].dataset.col) == false) {
                    dataCol.push(tdGroups[i][j].dataset.col)
                }
            }
            //On tranforme la tableau en un string avec un espace entre chaque chiffre
            newTd.dataset.row = dataRow.join(" ")
            newTd.dataset.col = dataCol.join(" ")

            //Si fusion entre plusieurs lignes
            if (IsStrsContains1Elt(tdGroups[i][0].dataset.row, tdGroups[i][1].dataset.row)) {
                let newColSpan = 0
                for (let j = 0; j < tdGroups[i].length; j++) {
                    newColSpan += tdGroups[i][j].dataset.col.split(" ").length
                }
                newTd.colSpan = newColSpan
                newTd.rowSpan = tdGroups[i][0].rowSpan
            }
            else { //Fusion entre plusieurs colonnes
                newTd.colSpan = tdGroups[i][0].colSpan
                let newRowSpan = 0
                for (let j = 0; j < tdGroups[i].length; j++) {
                    newRowSpan += tdGroups[i][j].dataset.row.split(" ").length
                }
                newTd.rowSpan = newRowSpan
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
                if (tdGroups[i][0].children[0].style.lineHeight) {
                    newInput.style.lineHeight = tdGroups[i][0].children[0].style.lineHeight
                }
            }
            else { //Si sur la même colonne
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
                if (tdGroups[i][0].children[0].style.minWidth) {
                    newInput.style.minWidth = tdGroups[i][0].children[0].style.minWidth
                }
            }
            AddEventInput(newInput)

            newTd.appendChild(newInput)

            tdGroups[i][0].parentNode.insertBefore(newTd, tdGroups[i][0])

            for (let j = 0; j < tdGroups[i].length; j++) {
                tdGroups[i][j].remove()
            }
        }
    }
    //Toutes les cases sélectionnées sont retirées
    DeselectAllInput()

    //Mise à jour de la matrice du tableau
    TableToMatrice()
}

export { Fusion, IsStrsContains1Elt }