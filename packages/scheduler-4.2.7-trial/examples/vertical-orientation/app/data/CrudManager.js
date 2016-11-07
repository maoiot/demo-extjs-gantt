Ext.define('Sch.examples.vertical.data.CrudManager', {
    extend          : 'Sch.data.CrudManager',
    alias           : 'crudmanager.advanced-crudmanager',
    autoLoad        : true,
    transport       : {
        load : {
            method      : 'GET',
            paramName   : 'q',
            url         : 'data/load.json'
        }
    }
});
