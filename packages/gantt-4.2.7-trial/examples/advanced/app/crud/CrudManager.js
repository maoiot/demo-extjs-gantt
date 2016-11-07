Ext.define('Gnt.examples.advanced.crud.CrudManager', {
    extend          : 'Gnt.data.CrudManager',
    alias           : 'crudmanager.advanced-crudmanager',
    autoLoad        : true,
    transport       : {
        load : {
            method      : 'GET',
            paramName   : 'q',
            url         : 'data/load.json'
        },
        sync : {
            method      : 'POST',
            url         : 'data/sync.json'
        }
    }
});
