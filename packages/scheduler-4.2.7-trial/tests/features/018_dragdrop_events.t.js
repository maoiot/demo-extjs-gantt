StartTest (function (t) {

    t.describe('All drag events should be fired and handled correctly', function (t) {

        var scheduler,
            view,
            beforeFinalize = false;

        var setup       = function (config) {
            scheduler && scheduler.destroy();

            scheduler       = t.getScheduler(Ext.apply({
                renderTo        : Ext.getBody()
            }, config));

            beforeFinalize = false;

           return scheduler;
        };

        t.it('Assert dragcreate events', function (t) {

            var scheduler = setup({
                listeners : {
                    beforedragcreatefinalize : function (view, createContext, e, el, eOpts) {
                       createContext.finalize(true);
                       beforeFinalize = true;
                       return false;
                    }
                }
            });

            t.firesOnce( scheduler, 'dragcreatestart', 'dragcreatestart is fired' );
            t.firesOnce( scheduler, 'beforedragcreate', 'beforedragcreate is fired' );
            t.firesOnce( scheduler, 'beforeeventadd', 'beforeeventadd is fired' );
            t.firesOnce( scheduler, 'afterdragcreate', 'afterdragcreate is fired' );
            t.firesOnce( scheduler, 'dragcreateend', 'dragcreateend is fired' );

            t.chain(
                { waitForEventsToRender : scheduler },
                { drag      : scheduler.getSchedulingView(), fromOffset : [2, 2], by : [100, 0] },
                function (next) {
                    t.is(beforeFinalize, true, 'beforedragcreatefinalize fired');
                }
            );

        });

        t.it('Assert drag events', function (t) {

            var scheduler = setup({
                listeners : {
                    beforeeventdropfinalize : function ( scheduler, dragContext, e, eOpts) {
                        beforeFinalize = true;
                        dragContext.finalize(true);
                        return false;
                    }
                }
            });

            t.firesOnce( scheduler, 'eventdragstart', 'eventdragstart is fired' );
            t.firesOnce( scheduler, 'eventdrop', 'eventdrop is fired' );
            t.firesOnce( scheduler, 'beforeeventdrag', 'beforeeventdrag is fired' );
            t.firesOnce( scheduler, 'aftereventdrop', 'aftereventdrop is fired' );

            t.chain(
                { drag : '.sch-event', by : [100, 0] },
                function (next) {
                    t.is(beforeFinalize, true, 'beforeeventdropfinalize fired');
                }
            );

        })

        t.it('Proxy element should reset its position when drop is cancelled asynchronously', function (t) {

            var scheduler = setup({
                listeners : {
                    beforeeventdropfinalize : function ( scheduler, dragContext) {

                        setTimeout(function() {
                            dragContext.finalize(false);
                        }, 100)

                        return false;
                    }
                }
            });

            t.chain(
                { waitForEvent : [scheduler, 'aftereventdrop' ], trigger : { drag : '.sch-event', by : [20, 0] }},

                function (next) {

                    t.is(scheduler.eventStore.getModifiedRecords().length, 0, 'No modified records');

                    // https://www.assembla.com/spaces/bryntum/tickets/1524#/activity/ticket
                    var dragProxyEl = scheduler.el.down('.sch-dragproxy');
                    t.is(dragProxyEl.getLeft(true), 0, 'left style reset');
                    t.is(dragProxyEl.getTop(true), 0, 'top style reset');
                }
            );

        })

        t.it('Assert resize events', function (t) {

            var scheduler = setup({
                listeners : {
                    beforeeventresizefinalize : function ( view, resizeContext, e, eOpts) {
                        beforeFinalize = true;
                        resizeContext.finalize(true);
                        return false;

                    }
                }
            });

            t.firesOnce( scheduler, 'beforeeventresize', 'beforeeventresize is fired' );
            t.firesOnce( scheduler, 'eventresizestart', 'eventresizestart is fired' );
            t.firesOnce( scheduler, 'eventresizeend', 'eventresizeend is fired' );
            t.firesAtLeastNTimes( scheduler, 'eventpartialresize', 1, 'eventpartialresize is fired' );

            t.chain(
                { moveCursorTo : '.sch-event' },
                { drag : '.sch-resizable-handle-end', by : [100, 0] },
                function (next) {
                    t.is(beforeFinalize, true, 'beforeeventresizefinalize fired');
                }
            );
        })
    });
});
