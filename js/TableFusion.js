import { casesSelection, DeselectAllInput } from './InputSelection.js';
import { AddEventInput } from './TableInput.js';
import { TableToMatrice } from './Table.js'

const tdInputText = document.getElementsByClassName('tdInputText');

//Test si les 2 strings contiennent au moins 1 nombre en commun
function IsStrsContains1EltInString(str1, str2) {
    if (str1.split(' ').map( Number ).some(v => str2.split(' ').map( Number ).includes(v))) {
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
    let casesDejaAttribuee = []
    //Parcours de gauche à droite et de haut en bas
    let i = 0
    while(casesSort.length > 1) {
        //Test si case est sélectionnée
        let voisinCote = 0 // 0 = pas de voisin seul, 1 = voisin en dessous, 2 = voisin à droite
        //Si c'est le cas alors on créer un groupe puis on check les voisins pour fusionner
        tdGroups.push([casesSort[i].parentNode])
        casesDejaAttribuee.push(casesSort[i])
        //Comme sur Excel si la case en-dessous est sélectionnée ou à droite est  aussi sélectionné alors on fusionnera avec celle en-dessous
        //Voisin en-dessous
        let caseNewTdGroupe = casesSort[i].parentNode
        let casePrecedente = casesSort[i].parentNode
        let newRowNumber = casesSort[i].parentNode.dataset.row.split(" ").map(Number)
        newRowNumber = newRowNumber[newRowNumber.length - 1]
        newRowNumber = (newRowNumber + 1).toString()
        for (let j = 0; j < tdInputText.length; j++) {
            if (IsStrsContains1EltInString(tdInputText[j].parentNode.dataset.row, newRowNumber) && IsStrsContains1EltInString(tdInputText[j].parentNode.dataset.col, caseNewTdGroupe.dataset.col)) {
                if (casesSelection.includes(tdInputText[j]) && tdInputText[j].parentNode.dataset.col == casesSort[i].parentNode.dataset.col) {
                    voisinCote = 1
                }
                break;
            }
        }
        //Si la case en-dessous n'est pas sélectionnée alors on regarde la case de droite
        if (voisinCote == 0) {
            //Voisin à droite
            let newColNumber = casesSort[i].parentNode.dataset.col.split(" ").map(Number)
            newColNumber = newColNumber[newColNumber.length - 1]
            newColNumber = (newColNumber + 1).toString()
            for (let j = 0; j < tdInputText.length; j++) {
                if (IsStrsContains1EltInString(tdInputText[j].parentNode.dataset.row, caseNewTdGroupe.dataset.row) && IsStrsContains1EltInString(tdInputText[j].parentNode.dataset.col, newColNumber)) {
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
                    let newRowNumber = casePrecedente.dataset.row.split(" ").map(Number)
                    newRowNumber = newRowNumber[newRowNumber.length - 1]
                    newRowNumber = (newRowNumber + 1).toString()
                    if (tdInputText[j].parentNode.dataset.row == newRowNumber && tdInputText[j].parentNode.dataset.col == caseNewTdGroupe.dataset.col && casesDejaAttribuee.includes(tdInputText[j]) == false) {
                        if (casesSelection.includes(tdInputText[j]) && tdGroups[tdGroups.length - 1].includes(tdInputText[j].parentNode) == false) { //Si selectionnee
                            casePrecedente = tdInputText[j].parentNode
                            tdGroups[tdGroups.length - 1].push(tdInputText[j].parentNode)
                            casesSort.splice(casesSort.indexOf(tdInputText[j]), 1)
                            casesDejaAttribuee.push(tdInputText[j])
                        }
                        else {
                            break;
                        }
                    }
                }
                else { //A droite (voisinCote == 2)
                    //Si case sur même ligne et colonne juste à côté
                    let newColNumber = casePrecedente.dataset.col.split(" ").map(Number)
                    newColNumber = newColNumber[newColNumber.length - 1]
                    newColNumber = (newColNumber + 1).toString()
                    if (tdInputText[j].parentNode.dataset.row == caseNewTdGroupe.dataset.row && tdInputText[j].parentNode.dataset.col == newColNumber && casesDejaAttribuee.includes(tdInputText[j]) == false) {
                        if (casesSelection.includes(tdInputText[j]) && tdGroups[tdGroups.length - 1].includes(tdInputText[j].parentNode) == false) { //Si selectionnee
                            casePrecedente = tdInputText[j].parentNode
                            tdGroups[tdGroups.length - 1].push(tdInputText[j].parentNode)
                            casesSort.splice(casesSort.indexOf(tdInputText[j]), 1)
                            casesDejaAttribuee.push(tdInputText[j])
                        }
                        else {
                            break;
                        }
                    }
                }
            }
            casesSort.splice(casesSort.indexOf(casesSort[i]), 1)
        }
        //Sinon case sélectionnée n'est pas fusionnable et donc on la sort de la liste
        else {
            casesSort.shift()
        }
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

            //GESTION colSpan OU RowSpan
            //Si fusion entre plusieurs lignes
            if (IsStrsContains1EltInString(tdGroups[i][0].dataset.row, tdGroups[i][1].dataset.row)) {
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
            
            //Ajout des class etc
            newTd.classList.add("tdMainTable")
            const newInput = document.createElement("input")
            newInput.type = 'text'
            newInput.classList.add("tdInputText");

            //GESTION Taille de l'input
            if (IsStrsContains1EltInString(tdGroups[i][0].dataset.row, tdGroups[i][1].dataset.row)) { //Si sur la même ligne
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
                newInput.style.width = newWidth + 'px'
                if (tdGroups[i][0].children[0].style.lineHeight) {
                    newInput.style.lineHeight = tdGroups[i][0].children[0].style.lineHeight
                }
            }
            else { //Si sur la même colonne
                if (tdGroups[i][0].children[0].style.minWidth) {
                    newInput.style.minWidth = tdGroups[i][0].children[0].style.minWidth
                    newInput.style.width = tdGroups[i][0].children[0].style.minWidth
                }

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
                if (tdGroups[i][0].children[0].style.width) {
                    newInput.style.width = tdGroups[i][0].children[0].style.width
                }
            }

            //On remet le contenu la l'input de gauche
            newInput.value = tdGroups[i][0].children[0].value

            //On remet les attributs si la case la plus à gauche les avait
            if (tdGroups[i][0].children[0].classList.contains("borderLeftOn")) {
                newInput.style.borderLeft = "solid"
                newInput.classList.add("borderLeftOn")
            }
            if (tdGroups[i][0].children[0].classList.contains("borderRightOn")) {
                newInput.style.borderRight = "solid"
                newInput.classList.add("borderRightOn")
            }
            if (tdGroups[i][0].children[0].classList.contains("borderTopOn")){
                newInput.style.borderTop = "solid";
                newInput.classList.add("borderTopOn")
            } 
            if (tdGroups[i][0].children[0].classList.contains("borderBottomOn")) {
                newInput.style.borderBottom = "solid"
                newInput.classList.add("borderBottomOn")
            }
            if (tdGroups[i][0].children[0].classList.contains("boldOn")) {
                newInput.style.fontWeight = "bold"
                newInput.classList.add("boldOn")
            }
            if (tdGroups[i][0].children[0].classList.contains("italicOn")) {
                newInput.style.fontStyle = "italic"
                newInput.classList.add("italicOn")
            }
            if (tdGroups[i][0].children[0].classList.contains("underlineOn")) {
                newInput.style.textDecoration = "underline"
                newInput.classList.add("underlineOn")
            }
            if (tdGroups[i][0].children[0].classList.contains("alignLeftOn")) {
                newInput.style.textAlign = "left"
                newInput.classList.add("alignLeftOn")
            }
            if (tdGroups[i][0].children[0].classList.contains("alignCenterOn")) {
                newInput.style.textAlign = "center"
                newInput.classList.add("alignCenterOn")
            }
            if (tdGroups[i][0].children[0].classList.contains("alignRightOn")) {
                newInput.style.textAlign = "right"
                newInput.classList.add("alignRightOn")
            }
            if (tdGroups[i][0].children[0].classList.contains("colorOn")) {
                newInput.style.color = tdGroups[i][0].children[0].style.color
                newInput.classList.add("colorOn")
            }
            if (tdGroups[i][0].children[0].classList.contains("casesColorOn")) {
                newInput.style.backgroundColor = tdGroups[i][0].children[0].style.backgroundColor
                newInput.classList.add("casesColorOn")
            }
            if (tdGroups[i][0].children[0].classList.contains("modeMathOn")) {
                newInput.classList.add("modeMathOn")
            }

            //Insertion dans la page
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

export { Fusion }