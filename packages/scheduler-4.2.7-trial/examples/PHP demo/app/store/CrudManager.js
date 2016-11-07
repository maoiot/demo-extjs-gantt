Ext.define('MyApp.store.CrudManager', {
    extend      : 'Sch.data.CrudManager',
    autoLoad    : true,
    transport   : {
        load        : {
            url             : 'php/read.php',
            method          : 'GET',
            paramName       : 'q'
        },
        sync        : {
            url             : 'php/save.php',
            method          : 'POST'
        }
    }
});
