Ext.define('App.model.Car', {
    extend : 'Sch.model.Resource',
    fields : [
        { name : 'Seats' },
        { name : 'NextScheduledService', type : 'date' },
        { name : 'Enabled', type : 'boolean' }
    ]
});