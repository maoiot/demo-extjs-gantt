Ext.define('App.store.CarStore', {
    extend  : 'Sch.data.ResourceStore',
    model   : 'App.model.Car',
    storeId : 'carstore',
    sorters : {
        property  : 'Name',
        direction : "ASC"
    },
    data    : [
        {Id : 'c1', Name : 'BMW #1', Seats : 4, NextScheduledService : new Date(new Date().getFullYear()+1, 2, 3), Enabled : true},
        {Id : 'c2', Name : 'BMW #2', Seats : 4, NextScheduledService : new Date(new Date().getFullYear()+1, 2, 3), Enabled : true},
        {Id : 'c3', Name : 'BMW #3', Seats : 2, NextScheduledService : new Date(new Date().getFullYear()+1, 4, 3), Enabled : true},
        {Id : 'c4', Name : 'BMW #4', Seats : 2, NextScheduledService : new Date(new Date().getFullYear()+1, 11, 7), Enabled : true},
        {Id : 'c5', Name : 'BMW #5', Seats : 2, NextScheduledService : new Date(new Date().getFullYear()+1, 10, 3), Enabled : true},
        {Id : 'c6', Name : 'BMW #6', Seats : 4, NextScheduledService : new Date(new Date().getFullYear()+1, 5, 6), Enabled : false}
    ]
});