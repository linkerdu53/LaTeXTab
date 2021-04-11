const mainTable = document.getElementsByClassName('mainTable')[0];
const tdInputText = document.getElementsByClassName("tdInputText");

let tableSize = {row: 3, col: 3}

let TableMatrice = []
TableMatrice = TableToMatrice()

console.log(mainTable)
console.log(tdInputText)

function TableToMatrice() {
    let matrice = [];
    const tbody = mainTable.childNodes[3];
    let nbrow = tbody.children.length - 1;

    for (let i = 0; i < nbrow; i++) {
        matrice.push([]);
        let row = tbody.children[i];
        let nbtd;
        if (i == 0) {
            nbtd = row.children.length - 2;
        }
        else {
            nbtd = row.children.length - 1;
        }
        for (let j = 0; j < nbtd; j++) {
            let input = row.children[j + 1].children[0];
            matrice[i][j] = input;
        }
    }

    TableMatrice = matrice.slice()

    console.log(TableMatrice)
    return TableMatrice
}

