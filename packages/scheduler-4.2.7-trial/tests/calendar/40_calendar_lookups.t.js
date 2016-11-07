StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();

        scheduler = t.getScheduler({
            mode       : 'calendar',
            renderTo   : Ext.getBody(),
            startDate  : new Date(2014, 4, 26),
            eventStore : t.getEventStore({
                data : [ {
                    Id         : 1,
                    StartDate  : new Date(2014, 4, 28, 2),
                    EndDate    : new Date(2014, 4, 29, 2),
                    ResourceId : 'r1',
                    Name       : 'Event 1',
                    Cls        : 'sch-event1'
                }, {
                    Id         : 2,
                    StartDate  : new Date(2014, 4, 29, 2),
                    EndDate    : new Date(2014, 4, 29, 4),
                    ResourceId : 'r2',
                    Name       : 'Event 2',
                    Cls        : 'sch-event2'
                } ]
            })
        });
    });

    t.it('Should perform correct lookups', function (t) {
        var view = scheduler.getSchedulingView();

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {

                t.diag('Should lookup single column event node')
                var event = scheduler.eventStore.getById(2);

                var node = view.getElementsFromEventRecord(event, event.getResource(), 2)[ 0 ];
                t.notOk(node, 'No node found in 3rd column');
                node = view.getElementsFromEventRecord(event, event.getResource(), 3)[ 0 ];
                t.is(node, view.el.down('.sch-event2'), 'Ccorrect node found');

                node = view.getElementsFromEventRecord(event, null, 3)[ 0 ];
                t.is(node, view.el.down('.sch-event2'), 'Correct node found');

                t.diag('Should lookup multicolumn event node')
                event = scheduler.eventStore.getById(1);

                node = view.getElementsFromEventRecord(event, event.getResource(), 2)[ 0 ];
                t.is(node, view.el.down('.sch-event1'), 'Correct node found in 2nd column');
                node = view.getElementsFromEventRecord(event, event.getResource(), 3)[ 0 ];
                t.is(node, view.el.query('.sch-event1', false)[ 1 ], 'Ccorrect node found');

                node = view.getElementsFromEventRecord(event);
                t.isDeeply(node, view.el.query('.sch-event1', false), 'Ccorrect node found');
            }
        );
    });

    t.it('Changing resource should not affect correct lookups', function (t) {
        var view = scheduler.getSchedulingView();

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                var event = scheduler.eventStore.first();

                event.setResourceId('r2');

                var node = view.getElementsFromEventRecord(event, event.getResource(), 2)[ 0 ];
                t.is(node, view.el.down('.sch-event1'), 'Ccorrect node found');
            }
        )
    });
});