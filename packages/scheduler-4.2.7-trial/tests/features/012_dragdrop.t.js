StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    var getScheduler = function (config) {
        return t.getScheduler(Ext.apply(config, {
            viewConfig  : {
                eventAnimations : false
            }
        }))
    };

    t.it('Drag and drop with validator function', function (t) {
        var counter = 0;

        var dragFn = function (records, resource, start, duration, e) {

            if ((counter % 10) === 0) {
                t.isInstanceOf(arguments[0][0], Sch.model.Event, 'Correct function arguments 1');
                t.isInstanceOf(arguments[1], Sch.model.Resource, 'Correct function arguments 2');
                t.isInstanceOf(arguments[2], Date, 'Correct function arguments 3');
                t.ok(typeof arguments[3] === 'number');
                t.isInstanceOf(arguments[4], Ext.EventObjectImpl, 'Correct function arguments 4');
            }

            counter++;

            return start <= new Date(2011, 0, 6);
        };

        scheduler = getScheduler({
            dndValidatorFn : dragFn,
            renderTo       : Ext.getBody(),

            eventStore     : new Sch.data.EventStore({
                data : [
                    {
                        Id         : 1,
                        ResourceId : 'r1',
                        StartDate  : new Date(2011, 0, 6),
                        EndDate    : new Date(2011, 0, 7)
                    }
                ]
            })
        });

        var evt = scheduler.eventStore.first();

        t.chain(
            { drag : '.sch-event', by : [100, 0] },

            function (next) {
                t.isGreater(evt.getEndDate(), new Date(2011, 0, 6), 'Task dragged properly');

                next();
            },

            { drag : '.sch-event', by : [300, 0] },

            { moveCursorTo : '.sch-event' },

            function (next) {
                t.isLess(evt.getEndDate(), new Date(2011, 0, 8), 'Task not not dragged.');

                // We rely on mousemove being fired during drag drop, for tooltip alignment and ScrollManager
                // http://www.sencha.com/forum/showthread.php?287568-mousemove-not-fired-during-drag-drop&p=1051171#post1051171
                t.todo(function(t) {
                    t.firesAtLeastNTimes(scheduler.getSchedulingView().el, 'mousemove', 5);
                });

                next();
            },

            { drag : '.sch-event', by : [20, 0] }
        );
    });

    t.it('Multiple selected events having same start date keep them equal after DnD', function (t) {
        scheduler = getScheduler({
            renderTo       : Ext.getBody(),
            multiSelect    : true,
            viewPreset       : 'hourAndDay',
            startDate        : new Date(2011, 11, 2, 8),
            endDate          : new Date(2011, 11, 2, 18),

            eventStore     : new Sch.data.EventStore({
                data : [
                    {
                        Id         : 1,
                        ResourceId : 'r1',
                        StartDate  : new Date(2011, 11, 2, 9),
                        EndDate    : new Date(2011, 11, 2, 10, 30)
                    },
                    {
                        Id         : 2,
                        ResourceId : 'r2',
                        StartDate  : new Date(2011, 11, 2, 9),
                        EndDate    : new Date(2011, 11, 2, 10, 30)
                    }
                ]
            })
        });

        var evt1 = scheduler.eventStore.first(),
            evt2 = scheduler.eventStore.last();

        scheduler.getEventSelectionModel().select(scheduler.eventStore.getRange());

        t.chain(
            { drag : '.sch-event', by : [100, 0] },

            function (next) {
                t.isGreater(evt1.getEndDate(), new Date(2011, 0, 6), 'Event #1 dragged successfully');
                t.is(evt1.getStartDate(), evt2.getStartDate(), 'Event #1 start equals event #2 start');
                t.is(evt1.getEndDate(), evt2.getEndDate(), 'Event #1 finish equals event #2 finish');
            }
        );
    });

    t.it('Drag and drop with constraining dates (horizontal)', function (t) {
        scheduler = getScheduler({
            renderTo       : Ext.getBody(),
            startDate      : new Date(2011, 0, 3),
            eventStore     : new Sch.data.EventStore({
                data : [
                    {
                        Id         : 1,
                        ResourceId : 'r1',
                        StartDate  : new Date(2011, 0, 6),
                        EndDate    : new Date(2011, 0, 7)
                    }
                ]
            }),

            // Constrain events within their current day
            getDateConstraints : function (resourceRecord, eventRecord) {
                if (eventRecord) {
                    return {
                        start : new Date(2011, 0, 6),
                        end   : new Date(2011, 0, 7)
                    };
                }
            }
        });

        t.wontFire(scheduler.eventStore, 'update');

        t.chain(
            { waitForRowsVisible : scheduler },

            function(next) {
                t._region = scheduler.el.down('.sch-event').getRegion();

                next();
            },

            { drag : '.sch-event', by : [-50, 0], dragOnly: true },

            function (next) {
                t.isApprox(scheduler.el.down('.sch-dragproxy .sch-event').getLeft(), t._region.left, 1,'Task constrained left properly');

                next();
            },

            { action : 'mouseUp' },

            { drag : '.sch-event', by : [30, 0], dragOnly: true },

            function (next) {
                t.isApprox(scheduler.el.down('.sch-dragproxy .sch-event').getRight(), t._region.right, 1,'Task constrained right properly');
                next();
            },

            { action : 'mouseUp' }
        );
    });

    t.it('Drag and drop with showExactDropPosition w/o snapRelativeToEventStartDate (horizontal)', function (t) {
        scheduler = getScheduler({
            renderTo       : Ext.getBody(),
            startDate      : new Date(2011, 0, 3),
            viewPreset  : 'hourAndDay',
            eventStore  : Ext.create('Sch.data.EventStore', {
                data : [{
                    Id      : 1,
                    Name    : 'Event',
                    ResourceId  : 'r1',
                    StartDate   : new Date(2011, 0, 3, 4, 13, 18),
                    EndDate     : new Date(2011, 0, 3, 6)
                }]
            }),
            dragConfig  : { showExactDropPosition : true }
        });

        var tickWidth   = scheduler.getSchedulingView().timeAxisViewModel.getTickWidth();
        var record      = scheduler.eventStore.getAt(0);

        t.chain(
            { waitForRowsVisible : scheduler },

            { drag : '.sch-event', by : [-0.2 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 4), 'Event hasn\'t changed place');
                next();
            },
            { drag : '.sch-event', by : [-0.5 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 3, 30), 'Event changed place');
                next();
            },
            { drag : '.sch-event', by : [-0.2 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 3, 30), 'Event hasn\'t changed place');
            }
        );
    });

    t.it('Drag and drop with showExactDropPosition w/ snapRelativeToEventStartDate (horizontal)', function (t) {
        scheduler = getScheduler({
            renderTo       : Ext.getBody(),
            startDate      : new Date(2011, 0, 3),
            viewPreset  : 'hourAndDay',
            eventStore  : Ext.create('Sch.data.EventStore', {
                data : [{
                    Id      : 1,
                    Name    : 'Event',
                    ResourceId  : 'r1',
                    StartDate   : new Date(2011, 0, 3, 4, 13, 18),
                    EndDate     : new Date(2011, 0, 3, 6)
                }]
            }),
            dragConfig  : { showExactDropPosition : true },
            snapRelativeToEventStartDate    : true
        });

        var tickWidth   = scheduler.getSchedulingView().timeAxisViewModel.getTickWidth();
        var record      = scheduler.eventStore.getAt(0);

        t.chain(
            { waitForRowsVisible : scheduler },

            { drag : '.sch-event', by : [0.2 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 4, 13, 18), 'Event hasn\'t changed place');
                next();
            },
            { drag : '.sch-event', by : [0.5 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 4, 43, 18), 'Event changed place');
                next();
            },
            { drag : '.sch-event', by : [0.2 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 4, 43, 18), 'Event hasn\'t changed place');
            }
        );
    });

    t.it('Drag and drop with constraining dates (vertical)', function (t) {
        scheduler = getScheduler({
            renderTo       : Ext.getBody(),
            startDate      : new Date(2011, 0, 3),
            eventStore     : new Sch.data.EventStore({
                data : [
                    {
                        Id         : 1,
                        ResourceId : 'r1',
                        StartDate  : new Date(2011, 0, 6),
                        EndDate    : new Date(2011, 0, 7)
                    }
                ]
            }),

            orientation     : 'vertical',

            // Constrain events within their current day
            getDateConstraints : function (resourceRecord, eventRecord) {
                if (eventRecord) {
                    return {
                        start : new Date(2011, 0, 6),
                        end   : new Date(2011, 0, 7)
                    };
                }
            }
        });

        t.wontFire(scheduler.eventStore, 'update');

        t.chain(
            { waitForRowsVisible : scheduler },

            function(next) {
                t._region = scheduler.el.down('.sch-event').getRegion();

                next();
            },

            { drag : '.sch-event', by : [0, -50], dragOnly: true },

            function (next) {
                t.isApprox(scheduler.el.down('.sch-dragproxy .sch-event').getTop(), t._region.top, 1,'Task constrained top properly');

                next();
            },

            { action : 'mouseUp' },

            { drag : '.sch-event', by : [0, 30], dragOnly: true },

            {
                waitFor : function () {
                    return scheduler.el.down('.sch-dragproxy .sch-event').getBottom() - t._region.bottom <= 1;
                },
                desc: 'Task constrained bottom properly'
            },

            { action : 'mouseUp' }
        );
    });

    t.it('Proxy should follow mouse after scroll (vertical)', function (t) {
        scheduler = getScheduler({
            renderTo        : Ext.getBody(),
            resourceStore   : t.getResourceStore2({}, 30)
        });

        var v = scheduler.getSchedulingView();
        var xy = [];
        var proxy;

        t.chain(
            { drag : '.sch-event', by : [0, 30], dragOnly: true },
            function (next) {
                proxy = Ext.getBody().down('.sch-dd-ref');
                xy = proxy.getXY();
                next();
            },
            function (next) {
                t.scrollVerticallyTo(v.el, 100, next);
            },
            function (next) {
                var newXY = proxy.getXY();
                t.is(newXY[0], xy[0], 'Horizontal position hasn\'t changed');
                t.is(newXY[1], xy[1], 'Vertical position hasn\'t changed');
                next();
            },
            { moveMouseBy : [[30, 0]] },
            function (next) {
                var newXY = proxy.getXY();
                t.is(newXY[0], xy[0] + 30, 'Horizontal position hasn\'t changed');
                t.is(newXY[1], xy[1], 'Vertical position hasn\'t changed');
                next();
            },
            { action : 'mouseUp' }
        );
    });

    t.it('Proxy should follow mouse after scroll (horizontal)', function (t) {
        scheduler = getScheduler({
            renderTo        : Ext.getBody(),
            resourceStore   : t.getResourceStore2({}, 30)
        });

        var v = scheduler.getSchedulingView();
        var xy = [];
        var proxy;

        t.chain(
            { drag : '.sch-event', by : [0, 30], dragOnly: true },
            function (next) {
                proxy = Ext.getBody().down('.sch-dd-ref');
                xy = proxy.getXY();
                next();
            },
            function (next) {
                t.scrollHorizontallyTo(v.el, 100, next);
            },
            function (next) {
                var newXY = proxy.getXY();
                t.is(newXY[0], xy[0], 'Horizontal position hasn\'t changed');
                t.is(newXY[1], xy[1], 'Vertical position hasn\'t changed');
                next();
            },
            { moveMouseBy : [[0, 30]] },
            function (next) {
                var newXY = proxy.getXY();
                t.is(newXY[0], xy[0], 'Horizontal position hasn\'t changed');
                t.is(newXY[1], xy[1] + 30, 'Vertical position hasn\'t changed');
                next();
            },
            { action : 'mouseUp' }
        );
    });
    
    t.it('Should display correct drop position with snapToIncrement (horizontal)', function (t) {
        scheduler = getScheduler({
            renderTo        : Ext.getBody(),
            viewPreset      : 'weekAndDayLetter',
            snapToIncrement : true,
            dragConfig      : {
                showExactDropPosition   : true
            },
            eventRenderer   : function (item, record, tplData, row) {
                tplData.cls = 'sch-event' + record.getId();
                return item.getName();
            }
        });
        
        var testBox;
        
        t.chain(
            { waitForSelector : '.sch-eventr1' },
            function (next) {
                testBox = scheduler.el.down('.sch-eventr1').getBox();
                next();
            },
            { drag : '.sch-eventr1', by : [10, 0], dragOnly : true },
            function (next) {
                var proxyBox = scheduler.el.down('.x-dd-drag-ghost .sch-event').getBox();
                t.isDeeply(proxyBox, testBox, 'Proxy positioned correctly');
                next();
            },
            { moveCursorBy : [[-20, 0]] },
            function (next) {
                var proxyBox = scheduler.el.down('.x-dd-drag-ghost .sch-event').getBox();
                t.isDeeply(proxyBox, testBox, 'Proxy positioned correctly');
                next();
            },
            { action : 'mouseUp' }
        );
    });
    
    t.it('Should display correct drop position with snapToIncrement (horizontal)', function (t) {
        scheduler = getScheduler({
            renderTo        : Ext.getBody(),
            viewPreset      : 'weekAndDayLetter',
            orientation     : 'vertical',
            snapToIncrement : true,
            dragConfig      : {
                showExactDropPosition   : true
            },
            eventRenderer   : function (item, record, tplData) {
                tplData.cls = 'sch-event' + record.getId();
                return item.getName();
            }
        });
        
        var testBox;
        
        t.chain(
            { waitForSelector : '.sch-eventr1' },
            function (next) {
                testBox = scheduler.el.down('.sch-eventr1').getBox();
                next();
            },
            { drag : '.sch-eventr1', by : [0, 10], dragOnly : true },
            function (next) {
                var proxyBox = scheduler.el.down('.x-dd-drag-ghost .sch-event').getBox();
                t.isDeeply(proxyBox, testBox, 'Proxy positioned correctly');
                next();
            },
            { moveCursorBy : [[0, -20]] },
            function (next) {
                var proxyBox = scheduler.el.down('.x-dd-drag-ghost .sch-event').getBox();
                t.isDeeply(proxyBox, testBox, 'Proxy positioned correctly');
                next();
            },
            { action : 'mouseUp' }
        );
    });
});
