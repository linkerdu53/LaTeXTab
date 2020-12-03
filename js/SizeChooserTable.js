const tdSizeChooser = document.getElementsByClassName('tdSizeChooser');

for (let i = 0; i < tdSizeChooser.length; i++) {
    tdSizeChooserAddEvent(tdSizeChooser[i]);
}

function tdSizeChooserAddEvent(cible) {
    cible.addEventListener('mouseenter', function() {
        tdSizeChooserMouseEnter(cible)
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

    if(cibleCol == columnSize) {
        tdSizeChooserAddColumn(columnSize);
    }
    if(cibleRow == rowSize) {
        tdSizeChooserAddRow(columnSize);
    }
}

function tdSizeChooserAddColumn(columnSize) {

    let tdLastCol = document.querySelectorAll("[data-col='"+columnSize+"']")
    console.log(tdLastCol);
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

function tdSizeChooserAddRow() {

}