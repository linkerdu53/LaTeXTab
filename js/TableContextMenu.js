//FROM https://dgoguerra.github.io/bootstrap-menu/demos.html
let demo5Rows = {
    '1': { first_name: 'John', last_name: 'Martin', is_editable: true },
    '2': { first_name: 'Peter', last_name: 'Roberts', is_editable: true },
    '3': { first_name: 'Stuart', last_name: 'Smith', is_editable: false }
};
  
let menu = new BootstrapMenu('.contextMenu', {
    fetchElementData: function($rowElem) {
        //var rowId = $rowElem.data('rowId');
        let rowId = 1;
        return demo5Rows[rowId];
    },
    actions: [
        {
            name: function(row) {
                // custom action name, with the name of the selected user
                if (row.is_editable) {
                    return 'Edit ' + row.first_name;
                }
                // basic HTML can also be rendered in the action name
                return '<i>Not editable</i>';
            },
            iconClass: 'bi bi-pencil-fill',
            classNames: function(row) {
                // add the 'action-success' class only if the row is editable
                return { 'action-success': row.is_editable };
            },
            onClick: function(row) {
                //toastr.info("'Edit description' clicked on '" + row.first_name + "'");
            },
            isEnabled: function(row) {
                return row.is_editable;
            }
        },
        {
            // custom action name, with the name of the selected user
            name: function(row) {
                return 'Message ' + row.first_name;
            },
            iconClass: 'bi bi-envelope',
            onClick: function(row) {
                //toastr.info("'Message " + row.first_name + "' clicked on '" + row.first_name + "'");
            }
        },
        {
            name: 'Block account',
            iconClass: 'bi bi-trash',
            // always add the class 'action-danger'
            classNames: 'action-danger',
            onClick: function(row) {
                //toastr.info("'Delete row' clicked on '" + row.first_name + "'");
            }
        }
    ]
});