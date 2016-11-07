StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    t.it('Should render custom time range', function (t) {
        scheduler = t.getScheduler({
            mode        : 'calendar',
            width       : 600,
            renderTo    : Ext.getBody(),
            startDate   : new Date(2014, 4, 26),
            startTime   : 10,
            endTime     : 19,
            eventStore  : t.getEventStore({
                data    : [{
                    Id          : 1,
                    StartDate   : new Date(2014, 4, 26),
                    EndDate     : new Date(2014, 4, 27),
                    Cls         : 'event1'
                }, {
                    Id          : 2,
                    StartDate   : new Date(2014, 4, 26, 9),
                    EndDate     : new Date(2014, 4, 26, 11),
                    Cls         : 'event2'
                }, {
                    Id          : 3,
                    StartDate   : new Date(2014, 4, 26, 18),
                    EndDate     : new Date(2014, 4, 26, 20),
                    Cls         : 'event3'
                }, {
                    Id          : 4,
                    StartDate   : new Date(2014, 4, 27, 15),
                    EndDate     : new Date(2014, 4, 28, 15),
                    Cls         : 'event4'
                }, {
                    Id          : 5,
                    StartDate   : new Date(2014, 4, 30, 9),
                    EndDate     : new Date(2014, 4, 30, 12),
                    Cls         : 'event5'
                }]
            })
        });

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                t.is(scheduler.getStore().getCount(), 9, 'Correct amount of rows');

                var rowHeight = scheduler.timeAxisViewModel.getViewRowHeight();

                t.is(scheduler.el.down('.event1').getHeight(), 9 * rowHeight, 'Event 1 has correct height');
                t.is(scheduler.el.down('.event2').getHeight(), rowHeight, 'Event 2 has correct height');
                t.is(scheduler.el.down('.event3').getHeight(), rowHeight, 'Event 3 has correct height');

                var event4Els = scheduler.getSchedulingView().getElementsFromEventRecord(scheduler.eventStore.getAt(3));
                t.is(event4Els[0].getHeight(), 4 * rowHeight, 'First part of event 4 has correct height');
                t.is(event4Els[1].getHeight(), 5 * rowHeight, 'Last part of event 4 has correct height');

                t.selectorCountIs('.event5', 1, 'event 5 rendered correctly');

                next();
            }
        );
    });

    t.it('Should render any amount of days with day preset', function (t) {
        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            width       : 600,
            height      : 400,
            timeAxis    : {
                autoAdjust  : false
            },
            calendarViewPreset  : 'day',
            mode        : 'calendar',
            startDate   : new Date(2016, 1, 1)
        });

        var normalGrid = scheduler.normalGrid;

        t.waitForRowsVisible(scheduler,
            function () {
                t.is(scheduler.timeAxis.getStart(), new Date(2016, 1, 1), 'Start date is correct');
                t.is(scheduler.timeAxis.getEnd(), new Date(2016, 1, 2), 'End date is correct');
                t.is(normalGrid.getVisibleColumns().length, 1, '1 column rendered');

                var newStart = new Date(2016, 1, 1),
                    newEnd = new Date(2016, 1, 4);

                scheduler.setTimeSpan(newStart, newEnd);
                t.is(scheduler.timeAxis.getStart(), newStart, 'Start date is correct');
                t.is(scheduler.timeAxis.getEnd(), newEnd, 'End date is correct');
                t.is(normalGrid.getVisibleColumns().length, 3, '3 columns rendered');

                newStart = new Date(2016, 1, 1);
                newEnd = new Date(2016, 1, 14);

                scheduler.setTimeSpan(newStart, newEnd);
                t.is(scheduler.timeAxis.getStart(), newStart, 'Start date is correct');
                t.is(scheduler.timeAxis.getEnd(), newEnd, 'End date is correct');
                t.is(normalGrid.getVisibleColumns().length, 13, '13 columns rendered');
            }
        );
    });

    t.it('Should render events in custom span correctly', function (t) {
        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            width       : 600,
            height      : 400,
            timeAxis    : {
                autoAdjust  : false
            },
            calendarViewPreset  : 'day',
            mode        : 'calendar',
            startDate   : new Date(2016, 1, 1),
            endDate     : new Date(2016, 1, 3),
            eventStore  : t.getEventStore({
                data    : [
                    { StartDate : new Date(2016, 1, 1, 2), EndDate : new Date(2016, 1, 1, 4) },
                    { StartDate : new Date(2016, 1, 2, 2), EndDate : new Date(2016, 1, 2, 4) }
                ]
            })
        });

        t.waitForRowsVisible(scheduler,
            function () {
                var calendarColumnWidth = scheduler.timeAxisViewModel.calendarColumnWidth;
                scheduler.el.select('.sch-event').each(function (el) {
                    t.isApprox(el.getWidth(), calendarColumnWidth - 4, 1, 'Event width is correct')
                });

                scheduler.setTimeSpan(new Date(2016, 1, 1), new Date(2016, 1, 10));
                scheduler.eventStore.add([
                    { StartDate : new Date(2016, 1, 3, 2), EndDate : new Date(2016, 1, 3, 4) },
                    { StartDate : new Date(2016, 1, 4, 2), EndDate : new Date(2016, 1, 4, 4) },
                    { StartDate : new Date(2016, 1, 5, 2), EndDate : new Date(2016, 1, 5, 4) },
                    { StartDate : new Date(2016, 1, 6, 2), EndDate : new Date(2016, 1, 6, 4) },
                    { StartDate : new Date(2016, 1, 7, 2), EndDate : new Date(2016, 1, 7, 4) },
                    { StartDate : new Date(2016, 1, 8, 2), EndDate : new Date(2016, 1, 8, 4) },
                    { StartDate : new Date(2016, 1, 9, 2), EndDate : new Date(2016, 1, 9, 4) }
                ]);

                t.selectorCountIs('.sch-event', 9, '9 events found');
                calendarColumnWidth = scheduler.timeAxisViewModel.calendarColumnWidth;
                scheduler.el.select('.sch-event').each(function (el) {
                    t.isApprox(el.getWidth(), calendarColumnWidth - 4, 1, 'Event width is correct')
                });

                t.monkeyTest(scheduler.getSchedulingView().el, 10, 'Release monkeys');
            }
        );
    });
});
