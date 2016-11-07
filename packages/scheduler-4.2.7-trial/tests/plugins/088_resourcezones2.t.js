StartTest(function(t) {
    t.it('Should allow filters to be placed on the resource zone store', function(t) {
        var zoneStore = Ext.create('Sch.data.EventStore', {
            data      : [
                { ResourceId : 1, StartDate : new Date(2014, 9, 10), EndDate : new Date(2014, 9, 11) }
            ]
        });

        var scheduler     = new Sch.panel.SchedulerGrid({
            renderTo      : Ext.getBody(),

            width         : 200,
            height        : 200,

            startDate     : new Date(2014, 9, 10),
            endDate       : new Date(2014, 10, 10),

            resourceStore : t.getResourceStore({
                data : [{ Id : 1, Name : 'Terminal A' }]
            }),

            eventStore    : t.getEventStore({ data : [] }),

            plugins       : [
                {
                    ptype : 'scheduler_resourcezones',
                    store : zoneStore
                }
            ],

            columns      : [{ dataIndex : 'Name' }]
        });

        t.waitForRowsVisible(scheduler, function () {
            // hide all zones
            zoneStore.filterBy(function () { return false; });

            t.selectorNotExists('.sch-schedulerview .sch-resourcezone'); // this fails because the zone is still visible
        });

    });
});
