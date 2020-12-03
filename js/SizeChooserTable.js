const tdSizeChooser = document.getElementsByClassName('tdSizeChooser');

for (let i = 0; i < tdSizeChooser.length; i++) {
    tdSizeChooser[i].addEventListener('mouseenter', function() {
        tdSizeChooserMouseEnter(tdSizeChooser[i])
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
}