StartTest(function(t) {

    //======================================================================================================================================================================================================================================================
    t.diag('Sanity');

    t.ok(Sch.panel.SchedulerGrid, "Sch.panel.SchedulerGrid is here");
    t.ok(Sch.mixin.TimelineView, "Sch.mixin.TimelineView is here");

    // when releasing we check if Sch.VERSION is injected
    if (t.harness.getQueryParam('release') == 1) {
        var version = new Ext.Version(Sch.VERSION);

        t.ok(version.major, 'version is provided ['+ version.major +']');
    }

    t.it('Should be ok to instantiate a scheduler without any configs', function(t) {
        var pnl = new Sch.panel.SchedulerGrid();

        t.isInstanceOf(pnl.resourceStore, Sch.data.ResourceStore);
        t.isInstanceOf(pnl.eventStore, Sch.data.EventStore);
    });

    t.it('Should be ok to instantiate a scheduler with store alias configs', function(t) {
        var pnl = new Sch.panel.SchedulerGrid({
            resourceStore : { type : 'resourcestore', foo : 1},
            eventStore : { type : 'eventstore', bar : 2}
        });

        t.isInstanceOf(pnl.resourceStore, Sch.data.ResourceStore);
        t.isInstanceOf(pnl.eventStore, Sch.data.EventStore);

        t.is(pnl.resourceStore.foo, 1);
        t.is(pnl.eventStore.bar, 2);
    });
});
