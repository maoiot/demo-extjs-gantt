StartTest(function (t) {
    
    var resourceStore = new Gnt.data.ResourceStore({
            data: [
                { Id : 1, Name : 'Mike' },
                { Id : 2, Name : 'foo' }
            ]
        }),
        assignmentStore = new Gnt.data.AssignmentStore({
            data: [
                { Id : 1, ResourceId : 1, TaskId : 1 },
                { Id : 2, ResourceId : 2, TaskId : 2 }
            ]
        }),
        taskStore = new Gnt.data.TaskStore({
            resourceStore   : resourceStore,
            assignmentStore : assignmentStore,
            root            : {
                children : [
                    {
                        Id        : 1,
                        StartDate : '2016-04-11',
                        Duration  : 4
                    },
                    {
                        Id        : 2,
                        StartDate : '2016-04-11',
                        Duration  : 4
                    }
                ]
            }
        }),
        resourceUtilizationStore  = Ext.create('Gnt.data.ResourceUtilizationStore', {
                underUtilizationThreshold : 99,
                overUtilizationThreshold  : 100,
                taskStore                 : taskStore,
                timeAxis                  : new Sch.data.TimeAxis()
        }),
        resourceUtilizationEventStore = resourceUtilizationStore.getEventStore();

    resourceUtilizationStore.fillStore();

    t.it('Assert summary row', function (t) { 
        
        t.chain(
            function (next) {
                t.is(resourceUtilizationEventStore.getCount(), 4, 'Store count is 4');
                assignmentStore.removeAt(1);
                next();
            },
            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                t.is(resourceUtilizationEventStore.getCount(), 2, 'Store count is 2');
                assignmentStore.add({  ResourceId : 2, TaskId : 2 });
                next();
            },
            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                t.is(resourceUtilizationEventStore.getCount(), 4, 'Store count is 4');
            }
        );
    });
});