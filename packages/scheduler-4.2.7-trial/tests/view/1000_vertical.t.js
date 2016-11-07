StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    // https://www.assembla.com/spaces/bryntum/tickets/1260#/activity/ticket:
    t.it('Adding a column before panel is rendered should work', function (t) {
        scheduler = t.getScheduler({
            resourceStore : Ext.create('Sch.data.ResourceStore'),
            orientation   : 'vertical'
        });

        scheduler.resourceStore.add({ Name : "ONE" });

        scheduler.render(document.body);

        t.is(scheduler.normalGrid.headerCt.items.getCount(), 1, 'One column found')
    });

    t.it('Should draw events in buffered vertical view', function (t) {
        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            mode        : 'vertical',
            viewPreset  : 'hourAndDay',

            // Remove this config when buffered vertical scheduler is supported
            // https://www.assembla.com/spaces/bryntum/tickets/2632
            bufferedRenderer: false,
            startDate   : new Date(2010, 0, 1),
            endDate     : new Date(2010, 0, 20),
            eventStore  : t.getEventStore({
                data    : [
                    {
                        StartDate   : new Date(2010, 0, 19, 20),
                        EndDate     : new Date(2010, 0, 19, 22),
                        ResourceId  : 'r2',
                        Cls         : 'e1'
                    }
                ]
            })
        });

        var view = scheduler.getSchedulingView();

        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                t.waitForEvent(view, 'scrollend', next);
                view.on('scheduleclick', function (view, date) {
                    t.ok(Ext.Date.between(date, new Date(2010, 0, 19, 22), new Date(2010, 0, 19, 23)), 'Correct date clicked');
                }, view, { single : true });
                view.scrollTo(null, view.el.dom.scrollHeight);
            },
            { click : function () {
                return scheduler.getSchedulingView().el;
            }, offset : ['10%', '100%-65'] },
            function () {
                var node = view.getElementsFromEventRecord(scheduler.eventStore.first())[0];

                t.ok(node, 'Event node is found');
            }
        )
    });

    t.it('Should load resources correctly', function (t) {
        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            mode    : 'vertical',
            eventStore : t.getEventStore({
                proxy   : {
                    type    : 'memory',
                    data    : [
                        { Id : 1, ResourceId : 1, StartDate : '2010-01-04' },
                        { Id : 2, ResourceId : 2, StartDate : '2010-01-05' }
                    ]
                }
            }),
            resourceStore : new Sch.data.ResourceStore({
                autoLoad : false,
                proxy   : {
                    type    : 'memory',
                    data    : [
                        { Id : 1, Name : 'Albert' },
                        { Id : 2, Name : 'Ben' }
                    ]
                }
            })
        });

        t.chain(
            { waitFor : 200 },
            function (next) {
                t.waitForEvent(scheduler.resourceStore, 'load', next);
                scheduler.resourceStore.load();
            },
            function () {
                t.isGreater(scheduler.getSchedulingView().getWidth(), 0, 'Normal view is visible');
            }
        );
    });

    t.it('Should not throw exception while navigating', function (t) {
        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            mode        : 'vertical'
        });

        t.chain(
            { click : ".sch-verticaltimeaxis-cell" },
            { type : "[RIGHT][PAGE-DOWN]" },
            { click : function () { return t.getCell(scheduler.lockedGrid, 1, 0); } },
            { click : ".sch-timetd" },
            { type : "[PAGE-DOWN][UP]" }
        );
    });
});