StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    var setup = function (config) {
        return t.getScheduler(Ext.apply({
            renderTo    : Ext.getBody(),
            mode        : 'calendar',
            timeAxis    : { autoAdjust : false },
            startDate   : new Date(2010, 1, 1),
            endDate     : new Date(2010, 1, 15),
            eventStore  : t.getEventStore({
                data    : [
                    {
                        Id          : 1,
                        StartDate   : new Date(2010, 1, 1, 2),
                        EndDate     : new Date(2010, 1, 1, 4),
                        ResourceId  : 'r1',
                        Cls         : 'event1',
                        Name        : 'Test'
                    },
                    {
                        Id          : 2,
                        StartDate   : new Date(2010, 1, 2, 2),
                        EndDate     : new Date(2010, 1, 2, 4),
                        ResourceId  : 'r2',
                        Cls         : 'event2',
                        Name        : 'Test'
                    },
                    {
                        Id          : 3,
                        StartDate   : new Date(2010, 1, 3, 2),
                        EndDate     : new Date(2010, 1, 3, 4),
                        ResourceId  : 'r3',
                        Cls         : 'event3',
                        Name        : 'Test'
                    }
                ]
            })
        }, config));
    };

    t.it('Should not draw filtered columns', function (t) {
        scheduler = setup();

        var view = scheduler.getSchedulingView();

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                t.waitForEvent(view, 'refresh', next);
                scheduler.timeAxis.filterBy(function (tick) {
                    // include only even days (tue/thu/sat/sun)
                    return tick.start.getDay() % 2 === 0;
                });
            },
            function (next) {
                var columns = scheduler.normalGrid.getVisibleColumns();
                t.is(columns.length, 8, '8 Days displayed');

                t.is(columns[0].start, new Date(2010, 1, 2));
                t.is(columns[0].end, new Date(2010, 1, 3));
                t.is(columns[1].start, new Date(2010, 1, 4));
                t.is(columns[1].end, new Date(2010, 1, 5));
                t.is(columns[2].start, new Date(2010, 1, 6));
                t.is(columns[2].end, new Date(2010, 1, 7));
                t.is(columns[3].start, new Date(2010, 1, 7));
                t.is(columns[3].end, new Date(2010, 1, 8));

                t.is(columns[4].start, new Date(2010, 1, 9));
                t.is(columns[4].end, new Date(2010, 1, 10));
                t.is(columns[5].start, new Date(2010, 1, 11));
                t.is(columns[5].end, new Date(2010, 1, 12));
                t.is(columns[6].start, new Date(2010, 1, 13));
                t.is(columns[6].end, new Date(2010, 1, 14));
                t.is(columns[7].start, new Date(2010, 1, 14));
                t.is(columns[7].end, new Date(2010, 1, 15));

                t.selectorNotExists('.event1', 'Event 1 is not rendered');
                t.selectorNotExists('.event3', 'Event 3 is not rendered');
                next();
            },
            {
                drag   : function () {
                    return t.safeSelect('.x-grid-item[data-recordindex=2] .sch-timetd:nth-child(3)', scheduler.el.dom)
                },
                offset : [20, 1],
                by     : [0, 80]
            },
            function (next) {
                var event = scheduler.eventStore.last();
                t.is(event.getStartDate(), new Date(2010, 1, 6, 2), 'Event start date is correct');
                t.is(event.getEndDate(), new Date(2010, 1, 6, 4), 'Event end date is correct');
                t.selectorExists('.x-grid-item[data-recordindex=0] .sch-timetd:nth-child(3) .sch-event', 'Event rendered in correct column');
                next();
            },
            { moveMouseTo : '.sch-timelineview', offset : ['100%-19', '50%'], desc : 'Should live ok close to right edge' }
        )
    });

    t.it('Drag create should work ok in filtered calendar', function (t) {
        scheduler = setup({
            eventStore : t.getEventStore(null, 0)
        });

        var view = scheduler.getSchedulingView();

        var stepGenerator = function (column, i) {
            i++;
            return [
                {
                    drag   : '.x-grid-item[data-recordindex=2] .sch-timetd:nth-child(' + i + ')',
                    offset : [20, 1],
                    by     : [0, 80]
                },
                function (next) {
                    var event = scheduler.eventStore.last();
                    t.is(event.getStartDate(), new Date(2010, 1, column.start.getDate(), 2), i + ': Event start is correct');
                    t.is(event.getEndDate(), new Date(2010, 1, column.start.getDate(), 4), i + ': Event end is correct');
                    t.selectorExists('.x-grid-item[data-recordindex=0] .sch-timetd:nth-child(' + i + ') .sch-event', i + ': Event rendered in correct column');
                    next();
                },
                {
                    drag : '.x-grid-item[data-recordindex=0] .sch-timetd:nth-child(' + i + ') .sch-event',
                    by   : [0, 40]
                },
                function (next) {
                    var event = scheduler.eventStore.last();
                    t.is(event.getStartDate(), new Date(2010, 1, column.start.getDate(), 3), i + ': Event start is correct');
                    t.is(event.getEndDate(), new Date(2010, 1, column.start.getDate(), 5), i + ': Event end is correct');
                    next();
                }
            ];
        };

        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                t.waitForEvent(view, 'refresh', next);
                view.timeAxis.filterBy(function (tick) {
                    // include only even days (tue/thu/sat/sun)
                    return tick.start.getDay() % 2 === 0;
                });
            },
            function (next) {
                var columns = scheduler.normalGrid.getVisibleColumns(),
                    steps   = [];

                for (var i = 0; i < columns.length; i++) {
                    var col = columns[i];
                    steps.push(stepGenerator(col, i));
                }

                t.chain(steps);
            }
        )
    });
});