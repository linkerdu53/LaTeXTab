function AddColumn() {

}
function AddRow() {

}

var buttonAddColumn  = document.getElementById('button-add-column');
var buttonAddRow = document.getElementById('button-add-row');
  
if (buttonAddColumn) {
    buttonAddColumn.addEventListener('click', function() {
        AddColumn()
    }, false);
}
if (buttonAddRow) {
    buttonAddRow.addEventListener('click', function() {
        AddRow()
    }, false);
}