Ext.define("DEMO.store.Bookings", {
    extend      : 'Sch.data.EventStore',

    storeId     : 'Bookings',
    model       : 'DEMO.model.Booking',
    autoLoad    : false,
    autoSync    : false,
    batch       : false,

    proxy   : {
        type    : 'ajax',
        api     : {
            read    : 'data/bookings.js',
            create  : 'TODO/Create',
            destroy : 'TODO/Update',
            update  : 'TODO/Update'
        },
        reader  : {
            type            : 'json',
            rootProperty    : 'data'
        },
        writer  : {
            type            : 'json',
            encode          : true,
            writeAllFields  : true,
            rootProperty    : 'data'
        }
    }
});