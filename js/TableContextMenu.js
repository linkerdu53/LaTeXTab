//FROM https://dgoguerra.github.io/bootstrap-menu/demos.html
import { AddColumn, AddRow, SupprColumn, SupprRow } from './TableButton.js'

let menu = new BootstrapMenu('.contextMenu', {
    fetchElementData: function($rowElem) {
        let id
        let type
        //Test si clic sur ligne
        if ($rowElem[0].parentElement.parentElement.nodeName == "TBODY") {
            type = 'row'
            let trBodyList = document.getElementById("bodyMainTable").children
            id = Array.from(trBodyList).indexOf($rowElem[0].parentElement)
        }
        else {
            type = 'col'
            let thHeadList = document.getElementById("trHead").children
            id = Array.from(thHeadList).indexOf($rowElem[0]) - 1
        }
        return [type, id];
    },
    actions: [
        {
            name: function(data) {
                let type = 'colonne'
                if (data[0] == 'row') {
                    type = 'ligne'
                }
                return 'Ajouter une ' + type + ' avant'
            },
            iconClass: 'bi bi-pencil-fill',
            classNames: 'action-success',
            onClick: function(data) {
                if (data[0] == 'row') {
                    AddRow(data[1])
                }
                else {
                    AddColumn(data[1])
                }
            }
        },
        {
            name: function(data) {
                let type = 'colonne'
                if (data[0] == 'row') {
                    type = 'ligne'
                }
                return 'Ajouter une ' + type + ' après'
            },            iconClass: 'bi bi-pencil-fill',
            classNames: 'action-success',
            onClick: function(data) {
                if (data[0] == 'row') {
                    AddRow(data[1] + 1)
                }
                else {
                    AddColumn(data[1] + 1)
                }
            }
        },
        {
            name: function(data) {
                let type = 'colonne'
                if (data[0] == 'row') {
                    type = 'ligne'
                }
                return 'Supprimer cette ' + type
            },
            iconClass: 'bi bi-trash',
            classNames: 'action-danger',
            onClick: function(data) {
                if (data[0] == 'row') {
                    SupprRow(data[1])
                }
                else {
                    SupprColumn(data[1])
                }
            }
        }
    ]
});