StartTest(function(t) {

    // #2621 - CalendarManager breaks calendars defaultAvailability inheritance

    t.it('Calendars created by CalendarManager support defaultAvailability and weekendsAreWorkdays inheritance', function (t) {

        var calendarManager = Ext.create('Gnt.data.CalendarManager', {
            calendarClass : 'Gnt.data.calendar.BusinessTime'
        });

        var parent = calendarManager.getRoot().appendChild({
            Id                  : 'parent',
            DefaultAvailability : ['00:00-01:00'],
            WeekendsAreWorkdays : true
        });

        var child = parent.appendChild({
            Id : 'child'
        });


        t.notOk(child.getDefaultAvailability(), 'model has no DefaultAvailability');
        t.notOk(child.getCalendar().hasOwnProperty('defaultAvailability'), 'child calendar has no defaultAvailability property');

        t.is(child.getCalendar().parent, parent.getCalendar(), 'proper parent calendar set');

        // ensure that defaultAvailability setting was inherited properly
        for (var i = 0; i < 7; i++) {
            t.isDeeply(child.getCalendar().getDefaultCalendarDay(i).getAvailability(true), ['00:00-01:00'], i+'th weekday has proper default availability');
        }
    });
});
