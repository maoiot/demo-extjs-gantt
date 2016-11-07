StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    t.it('should have a resizeTracker property with an updateDimensions method', function (t) {
        var res = new Ext.resizer.Resizer({
            target : document.body
        });

        // We overwrite a private "updateDimensions" method in Sch.feature.ResizeZone, make sure it exists
        t.ok(res.resizeTracker, 'resizeTracker found')
        t.ok(res.resizeTracker.updateDimensions, 'resizeTracker.updateDimensions found')
    })

    t.it('Should resize', function (t) {
        var counter = 0;

        var resizeFn = function (resource, record, start, end, e) {

            if ((counter % 10) === 0) {
                t.ok(arguments[0] instanceof Sch.model.Resource &&
                    arguments[1] instanceof Sch.model.Event &&
                    arguments[2] instanceof Date &&
                    arguments[3] instanceof Date &&
                    ( arguments[4] ? arguments[4] instanceof Ext.EventObjectImpl : true), 'Correct function arguments');
            }
            counter++;

            if (end > new Date(2011, 0, 9)) {
                return false;
            }
            return true;
        };

        scheduler && scheduler.destroy()

        scheduler = t.getScheduler({
            resizeValidatorFn : resizeFn,
            height            : 150,
            renderTo          : document.body,
            eventStore        : Ext.create('Sch.data.EventStore', {
                data : [
                    {
                        Id         : 1,
                        Name       : 'Event',
                        ResourceId : 'r1',
                        StartDate  : new Date(2011, 0, 4),
                        EndDate    : new Date(2011, 0, 6)
                    }
                ]
            })
        });

        var evt = scheduler.eventStore.first();

        t.chain(
            { moveCursorTo : '.sch-event' },

            { drag : '.sch-resizable-handle-end', by : [100, 0] },

            function (next) {
                t.isGreaterOrEqual(evt.getEndDate(), new Date(2011, 0, 7), 'Existing event resized correctly');

                next();
            },

            { drag : '.sch-resizable-handle-end', by : [100, 0] },

            function () {
                t.isLess(evt.getEndDate(), new Date(2011, 1, 9), 'Existing event not resized.');
            }
        );
    });

    t.it('Should resize with showExactResizePosition w/o snapRelativeToEventStartDate', function (t) {

        scheduler = t.getScheduler({
            renderTo     : Ext.getBody(),
            startDate    : new Date(2011, 0, 3),
            viewPreset   : 'hourAndDay',
            height       : 150,
            eventStore   : Ext.create('Sch.data.EventStore', {
                data : [
                    {
                        ResourceId : 'r1',
                        StartDate  : new Date(2011, 0, 3, 4, 13, 18),
                        EndDate    : new Date(2011, 0, 3, 6)
                    }
                ]
            }),
            resizeConfig : { showExactResizePosition : true }
        });

        var tickWidth = scheduler.getSchedulingView().timeAxisViewModel.getTickWidth();
        var record = scheduler.eventStore.first();

        t.chain(
            // resizing start
            { drag : '.sch-event .sch-resizable-handle-start', by : [-0.2 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 4), 'Event wasn\'t resized');
                next();
            },
            { drag : '.sch-event .sch-resizable-handle-start', by : [-0.5 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 3, 30), 'Event resized');
                next();
            },
            { drag : '.sch-event .sch-resizable-handle-start', by : [-0.2 * tickWidth, 0] },

            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 3, 30), 'Event wasn\'t resized');
                next();
            },

            // resizing end
            { drag : '.sch-event .sch-resizable-handle-end', by : [0.2 * tickWidth, 0] },

            function (next) {
                t.is(record.getEndDate(), new Date(2011, 0, 3, 6), 'Event wasn\'t resized');
                next();
            },

            { drag : '.sch-event .sch-resizable-handle-end', by : [0.5 * tickWidth, 0] },

            function (next) {
                t.is(record.getEndDate(), new Date(2011, 0, 3, 6, 30), 'Event resized');
                next();
            },

            { drag : '.sch-event .sch-resizable-handle-end', by : [0.2 * tickWidth, 0] },

            function (next) {
                t.is(record.getEndDate(), new Date(2011, 0, 3, 6, 30), 'Event wasn\'t resized');
                next();
            }
        );
    });

    t.it('Should resize with showExactResizePosition w/ snapRelativeToEventStartDate', function (t) {

        scheduler = t.getScheduler({
            renderTo                     : Ext.getBody(),
            startDate                    : new Date(2011, 0, 3),
            viewPreset                   : 'hourAndDay',
            height                       : 150,
            eventStore                   : Ext.create('Sch.data.EventStore', {
                data : [
                    {
                        Id         : 1,
                        Name       : 'Event',
                        ResourceId : 'r1',
                        StartDate  : new Date(2011, 0, 3, 4, 13, 18),
                        EndDate    : new Date(2011, 0, 3, 6, 16, 23)
                    }
                ]
            }),
            snapRelativeToEventStartDate : true,
            resizeConfig                 : { showExactResizePosition : true }
        });

        var tickWidth = scheduler.getSchedulingView().timeAxisViewModel.getTickWidth();
        var record = scheduler.eventStore.getAt(0);

        t.chain(
            // resizing start
            { drag : '.sch-event .sch-resizable-handle-start', by : [-0.2 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 4, 13, 18), 'Event wasn\'t resized');
                next();
            },
            { drag : '.sch-event .sch-resizable-handle-start', by : [-0.5 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 3, 43, 18), 'Event resized');
                next();
            },
            { drag : '.sch-event .sch-resizable-handle-start', by : [-0.2 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 3, 43, 18), 'Event wasn\'t resized');
                next();
            },
            // resizing end
            { drag : '.sch-event .sch-resizable-handle-end', by : [0.2 * tickWidth, 0] },
            function (next) {
                t.is(record.getEndDate(), new Date(2011, 0, 3, 6, 16, 23), 'Event wasn\'t resized');
                next();
            },
            { drag : '.sch-event .sch-resizable-handle-end', by : [0.5 * tickWidth, 0] },
            function (next) {
                t.is(record.getEndDate(), new Date(2011, 0, 3, 6, 46, 23), 'Event resized');
                next();
            },
            { drag : '.sch-event .sch-resizable-handle-end', by : [0.2 * tickWidth, 0] },
            function (next) {
                t.is(record.getEndDate(), new Date(2011, 0, 3, 6, 46, 23), 'Event wasn\'t resized');
                next();
            }
        );
    });

    t.it('Resizing event should not move vertically (horizontal scheduler)', function (t) {
        scheduler && scheduler.destroy()

        scheduler = t.getScheduler({
            renderTo      : Ext.getBody(),
            startDate     : new Date(2011, 0, 3),
            viewPreset    : 'hourAndDay',
            resourceStore : t.getResourceStore2({}, 30),
            height        : 150,
            eventStore    : Ext.create('Sch.data.EventStore', {
                data : [
                    {
                        Id         : 1,
                        Name       : 'Event1',
                        Cls        : 'sch-event1',
                        ResourceId : 'r1',
                        StartDate  : new Date(2011, 0, 3, 4, 13, 18),
                        EndDate    : new Date(2011, 0, 3, 6, 16, 23)
                    },
                    {
                        Id         : 2,
                        Name       : 'Event2',
                        Cls        : 'sch-event2',
                        ResourceId : 'r1',
                        StartDate  : new Date(2011, 0, 3, 5, 13, 18),
                        EndDate    : new Date(2011, 0, 3, 7, 16, 23)
                    }
                ]
            })
        });

        var view = scheduler.getSchedulingView();
        var el, y, relativeY;

        t.chain(
            { waitForRowsVisible : scheduler },
            // resizing start
            function (next) {
                el = view.el.down('.sch-event1');
                relativeY = el.getY() - el.parent().getY();
                next();
            },
            { drag : '.sch-event1 .sch-resizable-handle-end', by : [20, 0], dragOnly : true },
            function (next) {
                el = view.el.down('.sch-event1');
                y = el.getY();
                t.scrollVerticallyTo(view.el, 100, 0, next);
            },
            function (next) {
                t.is(el.getY() - el.parent().getY(), relativeY, 'Cell-relative position hasn\'t changed');
                t.is(el.getY() + 100, y, 'First event\'scheduler position hasn\'t changed')
                next();
            },
            { action : 'mouseUp' },
            function (next) {
                t.scrollVerticallyTo(view.el, -100, 0, next);
            },

            // drag second
            function (next) {
                el = view.el.down('.sch-event2');
                relativeY = el.getY() - el.parent().getY();
                next();
            },
            { drag : '.sch-event2 .sch-resizable-handle-end', by : [20, 0], dragOnly : true },
            function (next) {
                el = view.el.down('.sch-event2');
                y = el.getY();
                t.scrollVerticallyTo(view.el, 100, 0, next);
            },
            function (next) {
                t.is(el.getY() - el.parent().getY(), relativeY, 'Cell-relative position hasn\'t changed');
                t.is(el.getY() + 100, y, 'Second event\'scheduler position hasn\'t changed')
                next();
            },
            { action : 'mouseUp' }
        );
    });
});
