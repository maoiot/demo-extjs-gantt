Ext.define('MyApp.store.CrudManager', {
    extend      : 'Sch.data.CrudManager',
    autoLoad    : true,
    transport   : {
        load        : {
            url             : 'services/load',
            method          : 'GET',
            paramName       : 'q'
        },
        sync        : {
            url             : 'services/sync',
            method          : 'POST'
        }
    }
});
