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
    tdSizeChooserResetBackground();

    tdSizeChooserSetBackground(cible.dataset.row, cible.dataset.col);
    let rowSize = tdSizeChooser[tdSizeChooser.length - 1].dataset.row;
    let columnSize = tdSizeChooser[tdSizeChooser.length - 1].dataset.col;
    if(cible.dataset.col == columnSize) {
        tdSizeChooserAddColumn(columnSize);
    }
    if(cible.dataset.row == rowSize) {
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
        newTd.dataset.col = parseInt(columnSize) + 1;
        tdSizeChooserAddEvent(newTd);

        let trParent = tdLastCol[i].parentElement;
        trParent.appendChild(newTd);
    }
}

function tdSizeChooserAddRow() {

}