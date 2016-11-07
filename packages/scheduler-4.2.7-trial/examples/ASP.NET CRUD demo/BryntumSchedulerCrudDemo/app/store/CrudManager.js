Ext.define('MyApp.store.CrudManager', {
    extend      : 'Sch.data.CrudManager',
    autoLoad    : true,
    transport   : {
        load        : {
            url             : 'schedulercrud/load',
            method          : 'GET',
            paramName       : 'q'
        },
        sync        : {
            url             : 'schedulercrud/sync',
            method          : 'POST'
        }
    }
});
