import { AddColumn, AddRow, SupprColumn, SupprRow } from './TableButton.js';

const tableSizeChooser = document.getElementsByClassName('tableSizeChooser')[0];

const tdSizeChooser = tableSizeChooser.getElementsByClassName('tdSizeChooser');

const rowDimSizeChooser = document.getElementById('rowDimSizeChooser');
const colDimSizeChooser = document.getElementById('colDimSizeChooser');

for (let i = 0; i < tdSizeChooser.length; i++) {
    tdSizeChooserAddEvent(tdSizeChooser[i]);
}

function tdSizeChooserAddEvent(cible) {
    cible.addEventListener('mouseenter', function() {
        tdSizeChooserMouseEnter(cible)
    });
    cible.addEventListener('click', function() {
        createTable(cible)
    });
}

function tdSizeChooserResetBackground() {
    for (let i = 0; i < tdSizeChooser.length; i++) {
        tdSizeChooser[i].style.background = "";
    }
}

function tdSizeChooserSetBackground(row, col) {
    for (let i = 0; i < tdSizeChooser.length; i++) {
        if(tdSizeChooser[i].dataset.row <= row && tdSizeChooser[i].dataset.col <= col) {
            tdSizeChooser[i].style.background = "blue";
        }
    }
}

function tdSizeChooserMouseEnter(cible) {
    let cibleRow = parseInt(cible.dataset.row);
    let cibleCol = parseInt(cible.dataset.col);

    let rowSize = parseInt(tdSizeChooser[tdSizeChooser.length - 1].dataset.row);
    let columnSize = parseInt(tdSizeChooser[tdSizeChooser.length - 1].dataset.col);

    tdSizeChooserResetBackground();
    tdSizeChooserSetBackground(cibleRow, cibleCol);

    if(cibleRow == rowSize) {
        tdSizeChooserAddRow(rowSize, columnSize);
    }
    if(cibleCol == columnSize) {
        tdSizeChooserAddColumn(columnSize);
    }

    if(cibleRow <= rowSize - 2) {
        let nbRowToDel = rowSize - cibleRow - 1;
        if (cibleRow == 1) {
            nbRowToDel--;
        }
        tdSizeChooserSupprRow(nbRowToDel);
    }
    if(cibleCol <= columnSize - 2) {
        let nbColToDel = columnSize - cibleCol - 1;
        if (cibleCol == 1) {
            nbColToDel--;
        }
        tdSizeChooserSupprColumn(nbColToDel);
    }
    rowDimSizeChooser.textContent = cibleRow;
    colDimSizeChooser.textContent = cibleCol;
}

function tdSizeChooserAddColumn(columnSize) {

    let tdLastCol = tableSizeChooser.querySelectorAll("[data-col='"+columnSize+"']")
    for (let i = 0; i < tdLastCol.length; i++) {
        const newTd = document.createElement("td");
        newTd.classList.add("tdSizeChooser");
        newTd.dataset.row = i + 1;
        newTd.dataset.col = columnSize + 1;
        tdSizeChooserAddEvent(newTd);

        let trParent = tdLastCol[i].parentElement;
        trParent.appendChild(newTd);
    }
}

function tdSizeChooserAddRow(rowSize, columnSize) {

    let tbody = tableSizeChooser.querySelectorAll("tbody")[0];

    const newTr = document.createElement("tr");

    for (let i = 0; i < columnSize; i++) {
        const newTd = document.createElement("td");
        newTd.classList.add("tdSizeChooser");
        newTd.dataset.row = rowSize + 1;
        newTd.dataset.col = i + 1;
        tdSizeChooserAddEvent(newTd);

        newTr.appendChild(newTd);
    }
    tbody.appendChild(newTr);
}

function tdSizeChooserSupprColumn(nbColToDel) {

    let tbody = tableSizeChooser.querySelectorAll("tbody")[0];
    let listTr = tbody.children;
    for (let i = 0; i < nbColToDel; i++) {
        for (let j = 0; j < listTr.length; j++) {
            listTr[j].children[listTr[j].children.length - 1].remove();
        }
    }
}

function tdSizeChooserSupprRow(nbRowToDel) {

    let tbody = tableSizeChooser.querySelectorAll("tbody")[0];
    for (let i = 0; i < nbRowToDel; i++) {
        tbody.children[tbody.children.length - 1].remove();
    }
}

function createTable(cible) {
    let cibleRow = parseInt(cible.dataset.row);
    let cibleCol = parseInt(cible.dataset.col);
    
    const mainTable = document.getElementsByClassName('mainTable')[0];

    let listTh = mainTable.querySelectorAll("th[scope='col']");
    let listTr = mainTable.querySelectorAll('tr');

    let colDiff = cibleCol - (listTh.length - 2); //-2 car row th et row button
    let rowDiff = cibleRow - (listTr.length - 2); //-2 car row head et row button

    if (colDiff > 0) {
        for (let i = 0; i < colDiff; i++) {
            AddColumn();
        }
    }

    if (rowDiff > 0) {
        for (let i = 0; i < rowDiff; i++) {
            AddRow();
        }
    }

    if (colDiff < 0) {
        for (let i = 0; i < colDiff * -1; i++) {
            SupprColumn();
        }
    }

    if (rowDiff < 0) {
        for (let i = 0; i < rowDiff * -1; i++) {
            SupprRow();
        }
    }
}