Ext.define("DEMO.store.Employees", {
    extend      : 'Sch.data.ResourceStore',
    storeId     : 'Employees',
    model       : 'DEMO.model.Employee',
    autoLoad    : true,
    sorters     : 'Name',
    autoSync    : false,
    batch       : false,
    proxy       : {
        type    : 'ajax',
        api     : {
            read    : 'data/employees.js',
            create  : 'TODO/Create',
            destroy : 'TODO/Delete',
            update  : 'TODO/Update'
        },
        reader  : {
            type            : 'json',
            rootProperty    : 'data'
        },
        writer  : {
            rootProperty    : 'data',
            type            : 'json',
            encode          : true,
            writeAllFields  : true
        }
    }
});
