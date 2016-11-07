StartTest(function (t) {

    // Clear all stores before each subtest
    t.beforeEach(function () {
        Ext.Array.forEach(Ext.StoreManager.getRange(), function (store) {
            !store.isEmptyStore && store.destroy();
        });
    })

    // this test might be used in the Gantt Standard build which doesn't include Gnt.panel.ResourceUtilization class
    if (Gnt.panel.ResourceUtilization) {

        t.it('ResourceUtilization panel Should destroy internal stores of the timeline component', function (t) {
            var resourceStore = new Gnt.data.ResourceStore({
                data : [
                    { Id : 1, Name : 'Mike' },
                    { Id : 2, Name : 'foo' }
                ]
            });

            var assignmentStore = new Gnt.data.AssignmentStore({
                data : [
                    { Id : 1, ResourceId : 1, TaskId : 1 },
                    { Id : 2, ResourceId : 2, TaskId : 2 }
                ]
            });

            var taskStore = new Gnt.data.TaskStore({
                resourceStore   : resourceStore,
                assignmentStore : assignmentStore
            });

            var storeCountBefore = Ext.StoreManager.getCount();

            var panel = new Gnt.panel.ResourceUtilization({
                renderTo   : document.body,
                height     : 300,
                viewPreset : 'weekAndDayLetter',
                startDate  : new Date(2015, 0, 5),
                endDate    : new Date(2015, 0, 12),
                taskStore  : taskStore
            });

            panel.destroy();

            t.expect(Ext.StoreManager.getCount()).toBe(storeCountBefore);
        });

    }

    // this test might be used in the Gantt Standard build which doesn't include Gnt.panel.TimelineScheduler class
    if (Gnt.panel.TimelineScheduler) {

        t.it('Timeline panel Should destroy internal stores of the component', function (t) {

            var taskStore = new Gnt.data.TaskStore();

            var storeCountBefore = Ext.StoreManager.getCount();

            var timeline = new Gnt.panel.TimelineScheduler({
                height    : 100,
                renderTo  : Ext.getBody(),
                taskStore : taskStore
            });

            timeline.destroy();

            t.expect(Ext.StoreManager.getCount()).toBe(storeCountBefore);
        });

    }

    t.it('Gantt panel should destroy stores of the component when destroyStores is set', function (t) {

        var storeCountBefore = Ext.StoreManager.getCount();

        var timeline = new Gnt.panel.Gantt({
            height        : 100,
            renderTo      : Ext.getBody(),
            destroyStores : true,
            taskStore     : new Gnt.data.TaskStore(),
            plugins       : t.getAllPlugins(),
            columns       : t.getAllColumns()
        });

        timeline.destroy();

        t.expect(Ext.StoreManager.getCount()).toBe(storeCountBefore);
    });
});