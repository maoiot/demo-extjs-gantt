Ext.define('App.store.CarBooking', {
    extend  : 'Sch.data.EventStore',
    storeId : 'carbooking',
    data    : [
        {ResourceId : 'c1', Name : 'Mike', StartDate : "2017-01-27", EndDate : "2017-02-22"},
        {ResourceId : 'c2', Name : 'Linda', StartDate : "2017-05-02", EndDate : "2017-06-28"},
        {ResourceId : 'c3', Name : 'Don', StartDate : "2017-01-11", EndDate : "2017-01-26"},
        {ResourceId : 'c4', Name : 'Karen', StartDate : "2017-02-09", EndDate : "2017-03-29"},
        {ResourceId : 'c5', Name : 'Doug', StartDate : "2017-06-01", EndDate : "2017-06-18"},
        {ResourceId : 'c6', Name : 'Peter', StartDate : "2017-03-09", EndDate : "2017-03-20"}
    ]
});