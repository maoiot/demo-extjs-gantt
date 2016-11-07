StartTest(function (t) {
    t.it('Plugin should refresh gap when store is filtered', function (t) {
        var scheduler     = t.getScheduler({
            renderTo      : Ext.getBody(),
            plugins       : ['scheduler_timegap'],
            resourceStore : t.getResourceStore({
                data    : [
                    { Id : 'r1',  Name : 'Albert' }
                ]
            }),
            eventStore    : t.getEventStore({
                data    : [
                    { StartDate : new Date (2011, 0, 4), EndDate : new Date(2011, 0, 5), ResourceId : 'r1' },
                    { StartDate : new Date (2011, 0, 6), EndDate : new Date(2011, 0, 7), ResourceId : 'r1' }
                ]
            })
        });

        t.chain(
            { waitForSelector : '.sch-zone' },
            function (next) {
                t.selectorCountIs('.sch-zone', scheduler.getSchedulingView().getSecondaryCanvasEl().dom, 3, '3 zones rendered');

                scheduler.eventStore.filter(function (record) {
                    return record === scheduler.eventStore.last();
                });

                next();
            },
            { waitFor : function () {
                return t.$('.sch-zone').length === 2;
            }},
            function (next) {
                t.pass('1 zone removed');
            }
        )
    })
})