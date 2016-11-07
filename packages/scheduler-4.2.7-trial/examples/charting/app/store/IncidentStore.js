Ext.define('App.store.IncidentStore', {
    extend  : 'Ext.data.Store',
    fields  : [
        {name : 'Date', type : 'date'},
        'ResourceId',
        'NbrIncidents'
    ],
    storeId : 'incidentstore',
    sorters : {
        property  : 'Date',
        direction : "ASC"
    },
    
    data    : (function () {
        var data  = [];
        var start = new Date(2017, 0, 1);

        for (var i = 0; i < 1000; i += 1) {
            data.push({
                Date         : Sch.util.Date.add(start, Sch.util.Date.DAY, i),
                ResourceId   : 'c' + Math.round(Math.random() * 5) + 1,
                NbrIncidents : (Math.random() * 10 > 7 ? Math.round(Math.random() * 10) : 0)
            });
        }
        return data;
    })()
});