StartTest(function(t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    t.it('datachanged/refresh events on eventStore do not affect view scroll', function (t) {
        var resourceStore = Ext.create('Sch.data.ResourceStore', {
                model : 'Sch.model.Resource',
                data : [
                    {Id : 'c1', Name : 'Foo'},
                    {Id : 'c2', Name : 'Boo'}
                ]
            }),

        // Store holding all the events
            eventStore = t.getEventStore({
                data : [
                    {ResourceId: 'c1', Name : 'Mike', StartDate : "2010-12-09 07:45", EndDate : "2010-12-09 11:00"},
                    {ResourceId: 'c2', Name : 'Linda', StartDate : "2010-12-09 07:45", EndDate : "2010-12-09 11:00"}
                ]
            });

        scheduler = t.getScheduler({
            viewPreset      : 'hourAndDay',
            startDate       : new Date(2010, 11, 9, 8),
            endDate         : new Date(2010, 11, 9, 20),
            rowHeight       : 100,
            height          : 200,
            resourceStore   : resourceStore,
            eventStore      : eventStore,
            renderTo        : Ext.getBody()
        });


        var sv = scheduler.getSchedulingView(),
            lv = scheduler.lockedGrid.getView();

        t.chain(
            { waitForEventsToRender : scheduler },

            function(next) {
                t.waitForEvent(lv, 'scrollend', next);
                sv.scrollTo(0, 100);
            },
            function () {
                eventStore.fireEvent('datachanged');
                t.is(lv.el.dom.scrollTop, sv.el.dom.scrollTop, 'Scroll intact after eventStore datachanged event');

                eventStore.fireEvent('refresh');
                t.is(lv.el.dom.scrollTop, sv.el.dom.scrollTop, 'Scroll intact after eventStore refresh event');
            }
        );
    });

    t.it('Cell editing do not change normal view scroll', function (t) {
        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            plugins     : 'cellediting',
            columns     : [{ dataIndex : 'Name', width : 100, editor : 'textfield' }]
        });

        var view = scheduler.getSchedulingView();
        var scrollPosition;

        t.chain(
            { waitForEventsToRender : scheduler },

            function (next) {
                t.waitForEvent(view, 'scrollend', next);
                view.scrollTo(100, 0);
            },

            { clickToEditCell : [scheduler, 0, 0] },

            function () {
                t.is(view.getScrollX(), 100, 'Scroll position is intact');
            }
        )
    });
});
