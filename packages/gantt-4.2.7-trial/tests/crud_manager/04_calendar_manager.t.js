/*global MyCalendar*/
StartTest(function (t) {

    //

    t.it('Can omit fields in "appendChild" call', function (t) {

        t.expectGlobals('MyCalendar');

        Ext.define('MyCalendar', {
            extend : 'Gnt.data.Calendar',
            daysPerMonth : 6,
            daysPerWeek : 5,
            hoursPerDay : 4,
            weekendsAreWorkdays : true,
            weekendFirstDay : 1,
            weekendSecondDay : 2,
            defaultAvailability : ['01:23-22:22']
        });

        var calendarManager = new Gnt.data.CalendarManager({
            calendarClass : 'MyCalendar'
        });

        calendarManager.getRoot().appendChild({
            Id : 100,
            Name : 'c100',
            children : [
                {
                    Id : 101,
                    Name : 'c101',
                    CalendarClass : 'Gnt.data.calendar.BusinessTime',
                    children : [
                        {
                            Id : 102,
                            CalendarClass : 'Gnt.data.Calendar',
                            Name : 'c102'
                        }
                    ]
                }
            ]
        });

        var c100 = calendarManager.getNodeById(100);
        var c100calendar = c100.getCalendar();

        t.isInstanceOf(c100calendar, MyCalendar, 'c100: proper calendar class');
        t.is(c100.getName(), 'c100', 'c100: correct Name');

        t.notOk(c100.getDaysPerMonth(), 'c100: correct DaysPerMonth');
        t.notOk(c100.getDaysPerWeek(), 'c100: correct DaysPerWeek');
        t.notOk(c100.getHoursPerDay(), 'c100: correct HoursPerDay');
        t.notOk(c100.getWeekendsAreWorkdays(), 'c100: correct WeekendsAreWorkdays');
        t.notOk(c100.getWeekendFirstDay(), 'c100: correct WeekendFirstDay');
        t.notOk(c100.getWeekendSecondDay(), 'c100: correct WeekendSecondDay');
        t.notOk(c100.getDefaultAvailability(), 'c100: correct DefaultAvailability');

        t.is(c100calendar.daysPerMonth, 6, 'c100 calendar: correct daysPerMonth');
        t.is(c100calendar.daysPerWeek, 5, 'c100 calendar: correct daysPerWeek');
        t.is(c100calendar.hoursPerDay, 4, 'c100 calendar: correct hoursPerDay');
        t.is(c100calendar.weekendsAreWorkdays, true, 'c100 calendar: correct weekendsAreWorkdays');
        t.is(c100calendar.weekendFirstDay, 1, 'c100 calendar: correct weekendFirstDay');
        t.is(c100calendar.weekendSecondDay, 2, 'c100 calendar: correct weekendSecondDay');
        t.isDeeply(c100calendar.defaultAvailability, ['01:23-22:22'], 'c100 calendar: correct defaultAvailability');


        var c101 = calendarManager.getNodeById(101);
        var c101calendar = c101.getCalendar();

        t.isInstanceOf(c101calendar, Gnt.data.calendar.BusinessTime, 'c101: proper calendar class');
        t.is(c101.getName(), 'c101', 'c101: correct Name');

        t.notOk(c101.getDaysPerMonth(), 'c101: correct DaysPerMonth');
        t.notOk(c101.getDaysPerWeek(), 'c101: correct DaysPerWeek');
        t.notOk(c101.getHoursPerDay(), 'c101: correct HoursPerDay');
        t.notOk(c101.getWeekendsAreWorkdays(), 'c101: correct WeekendsAreWorkdays');
        t.notOk(c101.getWeekendFirstDay(), 'c101: correct WeekendFirstDay');
        t.notOk(c101.getWeekendSecondDay(), 'c101: correct WeekendSecondDay');
        t.notOk(c101.getDefaultAvailability(), 'c101: correct DefaultAvailability');

        t.is(c101calendar.daysPerMonth, 20, 'c101 calendar: correct daysPerMonth');
        t.is(c101calendar.daysPerWeek, 5, 'c101 calendar: correct daysPerWeek');
        t.is(c101calendar.hoursPerDay, 8, 'c101 calendar: correct hoursPerDay');
        t.is(c101calendar.weekendsAreWorkdays, false, 'c101 calendar: correct weekendsAreWorkdays');
        t.is(c101calendar.weekendFirstDay, 6, 'c101 calendar: correct weekendFirstDay');
        t.is(c101calendar.weekendSecondDay, 0, 'c101 calendar: correct weekendSecondDay');
        t.isDeeply(c101calendar.defaultAvailability, ['08:00-12:00', '13:00-17:00'], 'c101 calendar: correct defaultAvailability');

        var c102 = calendarManager.getNodeById(102);
        var c102calendar = c102.getCalendar();

        t.isInstanceOf(c102calendar, Gnt.data.Calendar, 'c102: proper calendar class');
        t.is(c102.getName(), 'c102', 'c102: correct Name');

        t.notOk(c102.getDaysPerMonth(), 'c102: correct DaysPerMonth');
        t.notOk(c102.getDaysPerWeek(), 'c102: correct DaysPerWeek');
        t.notOk(c102.getHoursPerDay(), 'c102: correct HoursPerDay');
        t.notOk(c102.getWeekendsAreWorkdays(), 'c102: correct WeekendsAreWorkdays');
        t.notOk(c102.getWeekendFirstDay(), 'c102: correct WeekendFirstDay');
        t.notOk(c102.getWeekendSecondDay(), 'c102: correct WeekendSecondDay');
        t.notOk(c102.getDefaultAvailability(), 'c102: correct DefaultAvailability');

        t.is(c102calendar.daysPerMonth, 30, 'c102 calendar: correct daysPerMonth');
        t.is(c102calendar.daysPerWeek, 7, 'c102 calendar: correct daysPerWeek');
        t.is(c102calendar.hoursPerDay, 24, 'c102 calendar: correct hoursPerDay');
        t.is(c102calendar.weekendsAreWorkdays, false, 'c102 calendar: correct weekendsAreWorkdays');
        t.is(c102calendar.weekendFirstDay, 6, 'c102 calendar: correct weekendFirstDay');
        t.is(c102calendar.weekendSecondDay, 0, 'c102 calendar: correct weekendSecondDay');
        t.isDeeply(c102calendar.defaultAvailability, ['00:00-24:00'], 'c102 calendar: correct defaultAvailability');
    });
});
