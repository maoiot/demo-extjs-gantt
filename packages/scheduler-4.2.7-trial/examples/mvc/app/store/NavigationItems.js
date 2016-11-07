Ext.define("DEMO.store.NavigationItems", {
    extend : 'Ext.data.Store',
    model  : 'DEMO.model.NavigationItem',

    storeId : 'NavigationItems',

    data   : [
        { id : 'schedule',      name : 'Schedule' },
        { id : 'employeeList',  name : 'Employee List' }
    ]
});