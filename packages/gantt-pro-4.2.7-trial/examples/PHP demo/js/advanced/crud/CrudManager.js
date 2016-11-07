Ext.define('Gnt.examples.advanced.crud.CrudManager', {
    extend          : 'Gnt.data.CrudManager',
    alias           : 'crudmanager.advanced-crudmanager',
    autoLoad        : true,
    transport       : {
        load : {
            method      : 'GET',
            paramName   : 'q',
            url         : 'php/read.php'
        },
        sync : {
            method      : 'POST',
            url         : 'php/save.php'
        }
    }
});
