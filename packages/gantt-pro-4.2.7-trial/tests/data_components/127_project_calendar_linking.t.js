StartTest(function(t) {

    // Checks that calendar manager setProjectCalendar calls changes corresponding task store calendar (and vise versa) #2217

    t.it('Calendar manager setProjectCalendar() call changes the task store calendar', function (t) {

        var calendarManager = Ext.create('Gnt.data.CalendarManager', {
            root    : {
                expanded    : true,
                children    : [
                    {
                        Id                  : 100,
                        Name                : 'c100',
                        DaysPerMonth        : 30,
                        DaysPerWeek         : 7,
                        HoursPerDay         : 24,
                        WeekendsAreWorkdays : true,
                        WeekendFirstDay     : 6,
                        WeekendSecondDay    : 0,
                        DefaultAvailability : [ '00:00-24:00' ],
                        children            : [
                            {
                                Id          : 101,
                                Name        : 'c101',
                                children    : [
                                    {
                                        Id          : 102,
                                        Name        : 'c102'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        });

        var taskStore = new Gnt.data.TaskStore({
            calendarManager : calendarManager
        });

        calendarManager.setProjectCalendar(101);

        t.is(taskStore.getCalendar(), calendarManager.getProjectCalendar(), 'project calendars match');
    });

    t.it('Task store setCalendar() call changes the calendar manager project calendar', function (t) {

        var calendarManager = Ext.create('Gnt.data.CalendarManager', {
            root    : {
                expanded    : true,
                children    : [
                    {
                        Id                  : 100,
                        Name                : 'c100',
                        DaysPerMonth        : 30,
                        DaysPerWeek         : 7,
                        HoursPerDay         : 24,
                        WeekendsAreWorkdays : true,
                        WeekendFirstDay     : 6,
                        WeekendSecondDay    : 0,
                        DefaultAvailability : [ '00:00-24:00' ],
                        children            : [
                            {
                                Id          : 101,
                                Name        : 'c101',
                                children    : [
                                    {
                                        Id          : 102,
                                        Name        : 'c102'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        });

        var taskStore = new Gnt.data.TaskStore({
            calendarManager : calendarManager
        });

        taskStore.setCalendar(calendarManager.getCalendar(101));

        t.is(taskStore.getCalendar(), calendarManager.getProjectCalendar(), 'project calendars match');
    });

});
