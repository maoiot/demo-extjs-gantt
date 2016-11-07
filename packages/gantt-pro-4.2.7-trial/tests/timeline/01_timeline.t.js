StartTest(function(t) {

    t.expectGlobals('MyTask');

    var taskStore, timeline;

    function task (id) { return id.isModel ? id : taskStore.getNodeById(Math.abs(id)); }

    function assertTasks (t) {
        var assertion, not, visibleNum = 0;

        for (var i = 1; i < arguments.length; i++) {
            var record      = task(arguments[i]);

            if (arguments[i] < 0) {
                assertion   = 'notOk';
                not         = 'NOT';
            } else {
                assertion   = 'ok';
                not         = '';

                visibleNum++;
                // assert that the record is in the panel eventStore
                if (!timeline.eventStore.contains(record)) t.fail('no event #'+ record.getId() +' found');
            }

            t[assertion](timeline.normalGrid.view.getElementFromEventRecord( record ), 'task #'+ record.getId() +' is '+ not +' in the timeline');
         }

        t.is(timeline.eventStore.getCount(), visibleNum, 'proper number of events in eventStore');
    }


    // use custom model to ensure ShowInTimeline is not hardcoded anywhere
    Ext.define('MyTask', {
        extend              : 'Gnt.model.Task',
        showInTimelineField : 'foo'
    })

    t.beforeEach(function () {
        timeline && timeline.destroy();
        taskStore && taskStore.destroy();

        taskStore = t.getTaskStore({
            model   : 'MyTask',
            DATA    : [
                {
                    Id        : 1,
                    Name      : '#1',
                    leaf      : true,
                    StartDate : new Date(2015, 7, 3),
                    Duration  : 2,
                    foo       : true
                },
                {
                    Id        : 2,
                    Name      : '#2',
                    leaf      : true,
                    StartDate : new Date(2015, 7, 6),
                    Duration  : 2
                },
                {
                    Id        : 3,
                    Name      : '#3',
                    leaf      : true,
                    StartDate : new Date(2015, 7, 5),
                    Duration  : 0,
                    foo       : true
                },
                {
                    Id        : 4,
                    Name      : '#4',
                    leaf      : true,
                    StartDate : new Date(2015, 7, 4),
                    Duration  : 0,
                    foo       : true
                }
            ]
        });

        timeline    = new Gnt.panel.TimelineScheduler({
            height      : 100,
            width       : 400,
            renderTo    : Ext.getBody(),
            taskStore   : taskStore
        });
    })


    t.it('Timeline panel reacts on ShowInTimeline field change', function (t) {
        t.waitForRowsVisible(timeline.normalGrid, function () {
            t.chain(
                function (next) {
                    assertTasks(t, 1, -2, 3, 4);

                    t.isApprox(timeline.getRowHeight(), 55, 'row height is correct');

                    t.isLessOrEqual(timeline.getStart(), task(1).getStartDate(), 'timespan start date is correct');
                    t.isLessOrEqual(task(3).getEndDate(), timeline.getEnd(), 'timespan end date is correct');

                    t.waitForEvent(timeline.timeAxis, 'reconfigure', next);
                    task(2).setShowInTimeline(true);
                },

                function (next) {
                    assertTasks(t, 1, 2, 3, 4);

                    t.isApprox(timeline.getRowHeight(), 55, 'row height is correct');
                    t.isLessOrEqual(timeline.getStart(), task(1).getStartDate(), 'timespan start date is correct');
                    t.isLessOrEqual(task(2).getEndDate(), timeline.getEnd(), 'timespan end date is correct');

                    t.waitForEvent(timeline.timeAxis, 'reconfigure', next);
                    task(2).setShowInTimeline(false);
                },

                function () {
                    assertTasks(t, 1, -2, 3, 4);

                    t.isApprox(timeline.getRowHeight(), 55, 'row height is correct');
                    t.isLessOrEqual(timeline.getStart(), task(1).getStartDate(), 'timespan start date is restored back');
                    t.isLessOrEqual(task(3).getEndDate(), timeline.getEnd(), 'timespan end date is restored back');
                }
            );
        });
    });

    t.it('Timeline panel reacts on edge tasks start/end field change', function (t) {
        t.waitForRowsVisible(timeline.normalGrid, function () {
            t.chain(
                function (next) {
                    t.waitForEvent(timeline.timeAxis, 'reconfigure', next);
                    task(1).setStartDate(new Date(2015, 6, 31), true, true);
                },

                function (next) {
                    assertTasks(t, 1, -2, 3, 4);

                    t.isApprox(timeline.getRowHeight(), 55, 'row height is correct');
                    t.isLessOrEqual(timeline.getStart(), task(1).getStartDate(), 'timespan start date is based on task #1 start');
                    t.isLessOrEqual(task(3).getEndDate(), timeline.getEnd(), 'timespan end date is based on task #3 end');

                    t.waitForEvent(timeline.timeAxis, 'reconfigure', next);
                    task(1).setEndDate(new Date(2015, 7, 6), false, true);
                },

                function () {
                    assertTasks(t, 1, -2, 3, 4);

                    t.isApprox(timeline.getRowHeight(), 55, 'row height is correct');
                    t.isLessOrEqual(timeline.getStart(), task(1).getStartDate(), 'timespan start date is based on task #1 start');
                    t.isLessOrEqual(task(1).getEndDate(), timeline.getEnd(), 'timespan end date is based on task #1 end');
                }
            );
        });
    });

    t.it('Timeline panel reacts on non-edge tasks start/end field change', function (t) {
        t.waitForRowsVisible(timeline.normalGrid, function () {
            t.wontFire(timeline.timeAxis, 'reconfigure', 'update of a "middle" task start/end doesnt cause timespan change');

            task(4).setStartDate(new Date(2015, 7, 4), true, true);

            assertTasks(t, 1, -2, 3, 4);

            t.isApprox(timeline.getRowHeight(), 55, 'row height is correct');
            t.isLessOrEqual(timeline.getStart(), task(1).getStartDate(), 'timespan start date is based on task #1 start');
            t.isLessOrEqual(task(3).getEndDate(), timeline.getEnd(), 'timespan end date is based on task #3 end');
        });
    });

    t.it('Timeline panel reacts on edge tasks adding', function (t) {
        t.waitForRowsVisible(timeline.normalGrid, function () {
            t.chain(
                function (next) {
                    t.waitForEvent(timeline.timeAxis, 'reconfigure', next);

                    taskStore.getRoot().appendChild({ Id : 5, Name : '#5', StartDate : new Date(2015, 6, 31), Duration : 1, foo : true });
                },
                function () {
                    assertTasks(t, 1, -2, 3, 4, 5);

                    t.isApprox(timeline.getRowHeight(), 55, 'row height is correct');
                    t.isLessOrEqual(timeline.getStart(), task(5).getStartDate(), 'timespan start date is correct');
                    t.isLessOrEqual(task(3).getEndDate(), timeline.getEnd(), 'timespan end date is correct');
                }
            );
        });
    });

    t.it('Timeline panel reacts on non-edge tasks adding', function (t) {
        t.waitForRowsVisible(timeline.normalGrid, function () {
            t.chain(
                function (next) {
                    t.wontFire(timeline.timeAxis, 'reconfigure', 'adding of a "middle" task doesnt cause timespan change');
                    t.waitForEvent(timeline.getSchedulingView(), 'refresh', next);

                    taskStore.getRoot().appendChild({ Id : 5, Name : '#5', StartDate : new Date(2015, 7, 4), Duration : 1, foo : true });
                },
                function () {
                    assertTasks(t, 1, -2, 3, 4, 5);

                    t.isApprox(timeline.getRowHeight(), 28, 'row height is correct');
                    t.isLessOrEqual(timeline.getStart(), task(1).getStartDate(), 'timespan start date is correct');
                    t.isLessOrEqual(task(3).getEndDate(), timeline.getEnd(), 'timespan end date is correct');
                }
            );
        });
    });

    t.it('Timeline panel refreshes once on repeating non-edge tasks adding', function (t) {
        t.waitForRowsVisible(timeline.normalGrid, function () {
            t.chain(
                function (next) {
                    t.waitForEvent(timeline.getSchedulingView(), 'refresh', next);
                    t.willFireNTimes(timeline.getSchedulingView(), 'refresh', 1, '1 refresh fired (because of setRowHeight() call');

                    taskStore.getRoot().appendChild({ Id : 5, Name : '#5', StartDate : new Date(2015, 7, 4), Duration : 1, foo : true });
                    taskStore.getRoot().appendChild({ Id : 6, Name : '#6', StartDate : new Date(2015, 7, 4), Duration : 1, foo : true });
                    taskStore.getRoot().appendChild({ Id : 7, Name : '#7', StartDate : new Date(2015, 7, 4), Duration : 1, foo : true });
                    taskStore.getRoot().appendChild({ Id : 8, Name : '#8', StartDate : new Date(2015, 7, 4), Duration : 1, foo : true });
                },
                function (next) {
                    assertTasks(t, 1, -2, 3, 4, 5, 6, 7, 8);

                    t.isApprox(timeline.getRowHeight(), 11, 'row height is correct');
                    t.isLessOrEqual(timeline.getStart(), task(1).getStartDate(), 'timespan start date is correct');
                    t.isLessOrEqual(task(3).getEndDate(), timeline.getEnd(), 'timespan end date is correct');

                    next();
                },
                { waitFor : 500 }
            );
        });
    });

    // TODO: here we check that refresh happens twice but these assertions are not dogmas ..if we manage to make it refresh only once
    t.it('Timeline panel refreshes twice on repeating edge tasks adding', function (t) {
        t.waitForRowsVisible(timeline.normalGrid, function () {
            t.chain(
                function (next) {
                    // timeline.getSchedulingView().on('refresh', function(){ debugger });
                    t.waitForEvent(timeline.getSchedulingView(), 'refresh', next);
                    t.willFireNTimes(timeline.getSchedulingView(), 'refresh', 2, '2 refreshes fired (one for zooming and one for setRowHeight() call');

                    taskStore.getRoot().appendChild({ Id : 5, Name : '#5', StartDate : new Date(2015, 7, 4), Duration : 1, foo : true });
                    taskStore.getRoot().appendChild({ Id : 6, Name : '#6', StartDate : new Date(2015, 7, 4), Duration : 1, foo : true });
                    taskStore.getRoot().appendChild({ Id : 7, Name : '#7', StartDate : new Date(2015, 7, 4), Duration : 1, foo : true });
                    taskStore.getRoot().appendChild({ Id : 8, Name : '#8', StartDate : new Date(2015, 7, 4), Duration : 1, foo : true });
                    taskStore.getRoot().appendChild({ Id : 9, Name : '#9', StartDate : new Date(2015, 6, 31), Duration : 1, foo : true });
                },
                function (next) {
                    assertTasks(t, 1, -2, 3, 4, 5, 6, 7, 8, 9);

                    t.isApprox(timeline.getRowHeight(), 11, 'row height is correct');
                    t.isLessOrEqual(timeline.getStart(), task(9).getStartDate(), 'timespan start date is correct');
                    t.isLessOrEqual(task(3).getEndDate(), timeline.getEnd(), 'timespan end date is correct');

                    next();
                },
                { waitFor : 500 }
            );
        });
    });

    t.it('Timeline panel reacts on edge tasks removals', function (t) {
        t.waitForRowsVisible(timeline.normalGrid, function () {
            var task1 = task(1);

            t.chain(
                function (next) {
                    t.waitForEvent(timeline.timeAxis, 'reconfigure', next);

                    task1.remove();
                },
                function () {
                    t.notOk(timeline.normalGrid.view.getElementFromEventRecord(task1), 'task #1 is NOT in the timeline');
                    assertTasks(t, -2, 3, 4);

                    t.isApprox(timeline.getRowHeight(), 55, 'row height is correct');
                    t.isLessOrEqual(timeline.getStart(), task(3).getStartDate(), 'timespan start date is correct');
                    t.isLessOrEqual(task(3).getEndDate(), timeline.getEnd(), 'timespan end date is correct');
                }
            );
        });
    });

    t.it('Timeline panel reacts on non-edge tasks removals', function (t) {
        t.waitForRowsVisible(timeline.normalGrid, function () {
            var task4 = task(4);

            t.wontFire(timeline.timeAxis, 'reconfigure', 'removal of a "middle" task doesnt cause timespan change');

            task4.remove();

            t.waitFor(
                function () { return !timeline.normalGrid.view.getElementFromEventRecord(task4); },
                function () {
                    t.notOk(timeline.normalGrid.view.getElementFromEventRecord(task4), 'task #4 is NOT in the timeline');
                    assertTasks(t, 1, -2, 3);

                    t.isApprox(timeline.getRowHeight(), 55, 'row height is correct');
                    t.isLessOrEqual(timeline.getStart(), task(3).getStartDate(), 'timespan start date is correct');
                    t.isLessOrEqual(task(3).getEndDate(), timeline.getEnd(), 'timespan end date is correct');
                }
            );

        });
    });

    t.it('Timeline panel re-fits tasks on its height change', function (t) {
        t.waitForRowsVisible(timeline.normalGrid, function () {

            t.chain(
                function (next) {
                    t.waitForEvent(timeline.view, 'refresh', next);

                    timeline.setHeight(145);
                },
                function () {
                    assertTasks(t, 1, -2, 3, 4);

                    t.isApprox(timeline.getRowHeight(), 100, 'row height is correct');

                    t.isLessOrEqual(timeline.getStart(), task(1).getStartDate(), 'timespan start date is correct');
                    t.isLessOrEqual(task(3).getEndDate(), timeline.getEnd(), 'timespan end date is correct');
                }
            );

        });
    });
});
