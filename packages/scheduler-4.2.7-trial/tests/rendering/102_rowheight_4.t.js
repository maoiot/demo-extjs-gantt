StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    t.it('Row height should be ok after swtiching orientation', function (t) {
        var resourceStore = Ext.create('Sch.data.ResourceStore', {
            model : 'Sch.model.Resource',
            data  : [
                {Id : 'c1', Name : 'Foo1'},
                {Id : 'c2', Name : 'Foo2'},
                {Id : 'c3', Name : 'Foo3'}
            ]
        });

        // Store holding all the events
        var eventStore = t.getEventStore({
            data : [
                {ResourceId : 'c1', Name : 'Mike', StartDate : "2010-12-09 07:45", EndDate : "2010-12-09 11:00"},
                {ResourceId : 'c1', Name : 'Linda', StartDate : "2010-12-09 07:45", EndDate : "2010-12-09 11:00"}
            ]
        });

        scheduler = t.getScheduler({
            viewPreset                  : 'hourAndDay',
            startDate                   : new Date(2010, 11, 9, 8),
            endDate                     : new Date(2010, 11, 9, 20),
            height                      : 400,
            mode                        : 'vertical',
            resourceStore               : resourceStore,
            eventStore                  : eventStore
        });

        scheduler.render(Ext.getBody());

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                scheduler.setOrientation('horizontal');
                next();
            },
            { waitForEventsToRender : scheduler },
            function (next) {
                eventStore.add({ResourceId : 'c1', Name : 'Test', StartDate : "2010-12-09 07:45", EndDate : "2010-12-09 11:00"});
                t.rowHeightsAreInSync(scheduler, 'Row heights in sync after adding task');
            }
        );
    });

    t.it('Row height should be ok when resource have unscheduled events', function (t) {
        var resourceStore = t.getResourceStore({
            data    : [
                { Id : 'r1', Name : 'Albert' },
                { Id : 'r2', Name : 'Ben' }
            ]
        });

        var eventStore = t.getEventStore({
            data    : [
                { Id : 1, StartDate : new Date(2011, 0, 6), EndDate : new Date(2011, 0, 7), ResourceId : 'r1' },
                { Id : 2, StartDate : new Date(2011, 0, 6), EndDate : null, ResourceId : 'r1' },
                { Id : 3, StartDate : new Date(2011, 0, 6), EndDate : new Date(2011, 0, 7), ResourceId : 'r2' }
            ]
        });

        var dependencyStore = t.getDependencyStore({
            data    : [
                { Id : 1, From : 3, To : 1, Type : 0 }
            ]
        });

        scheduler = new Sch.panel.SchedulerGrid({
            renderTo        : Ext.getBody(),
            startDate       : new Date(2011, 0, 3),
            endDate         : new Date(2011, 0, 10),
            columns         : [{
                dataIndex   : 'Name',
                width       : 100,
                text        : 'Name'
            }],
            width           : 800,
            height          : 400,
            resourceStore   : resourceStore,
            dependencyStore : dependencyStore,
            eventStore      : eventStore
        });

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                t.waitForEvent(scheduler.lockedGrid.view, 'refresh', next);
                scheduler.lockedGrid.view.refresh();
            },
            function (next) {
                t.waitForEvent(scheduler.lockedGrid.view, 'refresh', next);
                scheduler.lockedGrid.view.refresh();
                scheduler.normalGrid.view.refresh();
            },
            function (next) {
                t.rowHeightsAreInSync(scheduler, 'Row heights synced');
                t.waitForEvent(scheduler, 'modechange', next);
                scheduler.setMode('vertical');
            },
            function () {

            }
        )
    });
});
