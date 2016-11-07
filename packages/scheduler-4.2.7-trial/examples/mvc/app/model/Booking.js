Ext.define('DEMO.model.Booking', {
    extend  : 'Sch.model.Event',
    fields  : [
        { name : 'StartDate',   type: 'date', dateFormat: 'time' },
        { name : 'EndDate',     type: 'date', dateFormat: 'time' }
    ]
});