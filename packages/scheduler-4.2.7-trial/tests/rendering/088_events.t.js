StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    t.it('Grid rows are visible when event store is empty', function (t) {
        scheduler = t.getScheduler({
            eventStore : t.getEventStore(null, 0),
            startDate : new Date()
        });
        
        scheduler.render(Ext.getBody());
        
        // we could wait for 'refresh' event, but this event is fired twice due to another bug: 
        // https://www.assembla.com/spaces/bryntum/tickets/1814
        t.waitForRowsVisible(scheduler, function () {
            t.pass('Rows are visible');
        });
    });

    t.it('SchedulingView will fire `refresh` only once when rendered', function (t) {
        scheduler = t.getScheduler();

        var view = scheduler.getSchedulingView();

        view.on('refresh', function () {
            view.on('refresh', function () {
                t.fail('Refresh was called more than once');
            });

            t.waitFor(1000, function () {
            });
        }, scheduler, { single : true });

        scheduler.render(Ext.getBody());
    });

    t.it('SchedulingView drag drop, resize or row update should not cause a layout as the event record is updated', function (t) {

        function getLayoutCount(ct) {
            var count = 0;

            Ext.each(ct.query('[layoutCounter]').concat(ct), function (c) {
                count += c.layoutCounter
            });

            return count;
        }

        scheduler = t.getScheduler({
            renderTo           : document.body,
            enableDragCreation : false,
            resizeConfig       : {
                // Updating tooltips also cause layouts, ignore
                showTooltip : false
            },
            dragConfig         : {
                // Updating tooltips also cause layouts, ignore
                showTooltip : false
            }
        });

        var before;

        t.chain(
            { waitForEventsToRender : scheduler },

            function (next) {

                t.assertNoLayoutTriggered(function () {
                    var view = scheduler.getSchedulingView();
                    view.repaintEventsForResource(scheduler.resourceStore.first())

                }, null, 'view.repaintEventsForResource should not cause a relayout')

                before = getLayoutCount(scheduler);

                next();
            },

            { drag : '.sch-event', by : [10, 0] },

            function (next) {
                t.is(getLayoutCount(scheduler), before, 'drag drop should not cause layouts');

                next();
            },

            { drag : '.sch-resizable-handle-end', by : [10, 0] },

            function () {
                t.is(getLayoutCount(scheduler), before, 'resize should not cause layouts');
            }
        );

    });

});
