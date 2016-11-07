StartTest(function (t) {
    var scheduler;
    var fired;

    function setup(config) {
        config = config || {};

        scheduler && scheduler.destroy();

        scheduler = t.getScheduler(Ext.apply({
            enableDragCreation : false,
            renderTo           : Ext.getBody(),
            dragConfig         : {
                showTooltip : false
            }
        }, config));

        fired = {
            'beforeeventdrag' : 0,
            'eventdragstart'  : 0,
            'eventdrop'       : 0,
            'aftereventdrop'  : 0
        };

        scheduler.on({
            'beforeeventdrag' : function () {
                if (arguments[0] instanceof Sch.view.SchedulerGridView &&
                    arguments[1] instanceof Sch.model.Event && !!arguments[2].getTarget) {
                    fired.beforeeventdrag++;
                }
            },
            'eventdragstart'  : function () {
                if (arguments[0] instanceof Sch.view.SchedulerGridView &&
                    arguments[1] instanceof Array &&
                    arguments[1][0] instanceof Sch.model.Event) {
                    fired.eventdragstart++;
                }
            },
            'eventdrop'       : function () {
                if (arguments[0] instanceof Sch.view.SchedulerGridView &&
                    arguments[1] instanceof Array &&
                    arguments[1][0] instanceof Sch.model.Event &&
                    arguments[2] === false)  // The 'isCopy' argument
                {
                    fired.eventdrop++;
                }
            },
            'aftereventdrop'  : function () {
                if (arguments[0] instanceof Sch.view.SchedulerGridView) {
                    fired.aftereventdrop++;
                }
            }
        });
    }

    var getDragOffset = function () {
        return scheduler.getOrientation() === 'horizontal' ? [50, 0] : [0, 50];
    }

    var getTestSteps = function (t) {
        return [
            { drag : '.sch-event', by : getDragOffset },

            function (next, el) {
                var draggedRecord = t.draggedRecord = scheduler.getSchedulingView().resolveEventRecord(el);

                for (var o in fired) {
                    t.ok(fired[o] === 1, Ext.String.format("'{0}' event fired", o));
                }

                t.ok(draggedRecord.get('StartDate') > draggedRecord.modified.StartDate, 'StartDate changed');
                t.ok(draggedRecord.get('EndDate') > draggedRecord.modified.EndDate, 'EndDate changed');

                t.diag('Prevent drag using Draggable = false');
                draggedRecord.set('Draggable', false);

                draggedRecord.commit();
                t.ok(!draggedRecord.dirty, 'Task not dirty after commit');

                for (var o in fired) {
                    fired[o] = 0;
                }

                // https://www.assembla.com/spaces/bryntum/tickets/1524#/activity/ticket
                var dragProxyEl = scheduler.el.down('.sch-dragproxy');
                t.is(dragProxyEl.getLeft(true), 0, 'left style reset');
                t.is(dragProxyEl.getTop(true), 0, 'top style reset');

                next();
            },

            { action : 'drag', by : getDragOffset },

            function (next) {
                t.diag('Prevent drag using beforeeventdrag handler');
                t.draggedRecord.set('Draggable', true);
                t.draggedRecord.commit();

                scheduler.on('beforeeventdrag', function () {
                    return false;
                });
                next();
            },

            { drag : '.sch-event', by : getDragOffset },

            function (next) {
                delete fired.beforeeventdrag;

                // Make sure no events were fired, e.g. operation didn't start
                for (var o in fired) {
                    t.ok(fired[o] === 0, Ext.String.format("'{0}' event not fired since false was returned by beforeeventdrag handler", o));
                }
                t.is(scheduler.eventStore.getModifiedRecords(), 0, 'Task not dirty since task was not moved.');

                // https://www.assembla.com/spaces/bryntum/tickets/1524#/activity/ticket
                var dragProxyEl = scheduler.el.down('.sch-dragproxy');
                t.is(dragProxyEl.getLeft(true), 0, 'left style reset');
                t.is(dragProxyEl.getTop(true), 0, 'top style reset');
            }
        ];
    }

    t.iit('Plain horizontal scheduler', function (t) {
        setup();

        t.chain(getTestSteps(t))
    });

    t.it('Tree scheduler', function (t) {
        setup({
            __tree : true
        });

        t.chain(getTestSteps(t));
    });

    t.it('Vertical scheduler', function (t) {
        setup({
            orientation : 'vertical'
        });

        t.chain(getTestSteps(t));
    });
})    