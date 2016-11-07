Ext.define('DEMO.controller.EmployeeList', {
    extend  : 'Ext.app.Controller',

    models  : [
        'Employee'
    ],

    stores  : [
        'Employees'
    ],

    views   : [
        'EmployeeList'
    ],

    init : function () {

        this.control({
            'EmployeeList button[action=AddEmployee]' : {
                click : this.onAddNewResource
            },

            'EmployeeList' : {
                RemoveResource : this.onRemoveResource
            }
        });
    },

    onAddNewResource : function() {
        this.getEmployeesStore().insert(0, {
            Name    : 'New guy',
            Salary  : 0
        });
    },

    onRemoveResource : function(grid, rowIndex) {
        grid.getStore().removeAt(rowIndex);
    }
});