Ext.define('App.store.Event', {
    extend  : 'Sch.data.EventStore',
    storeId : 'event',
    data    : [
        {
            StartDate  : new Date(2016, 3, 11, 8),
            EndDate    : new Date(2016, 3, 11, 10),
            Name       : 'Make the app',
            Cls        : 'TheEvent',
            ResourceId : 'r1'
        },
        {
            StartDate  : new Date(2016, 3, 11, 13),
            EndDate    : new Date(2016, 3, 11, 16),
            Name       : 'Meeting',
            ResourceId : 'r1'
        },
        {
            StartDate  : new Date(2016, 3, 11, 12),
            EndDate    : new Date(2016, 3, 11, 16),
            Name       : 'UX meeting',
            ResourceId : 'r2'
        },
        {
            StartDate  : new Date(2016, 3, 12, 7),
            EndDate    : new Date(2016, 3, 12, 11),
            Name       : 'Client demo',
            ResourceId : 'r2'
        },
        {
            StartDate  : new Date(2016, 3, 13, 12),
            EndDate    : new Date(2016, 3, 13, 16),
            Name       : 'Training',
            ResourceId : 'r3'
        },
        {
            StartDate  : new Date(2016, 3, 14, 8),
            EndDate    : new Date(2016, 3, 14, 11),
            Name       : 'Make coffee',
            ResourceId : 'r3'
        },
        {
            StartDate  : new Date(2016, 3, 14, 12),
            EndDate    : new Date(2016, 3, 14, 14),
            Name       : 'Doctors appointment',
            ResourceId : 'r4'
        },
        {
            StartDate  : new Date(2016, 3, 15, 8),
            EndDate    : new Date(2016, 3, 15, 10),
            Name       : 'Company meeting',
            ResourceId : 'r4'
        }
    ]
});