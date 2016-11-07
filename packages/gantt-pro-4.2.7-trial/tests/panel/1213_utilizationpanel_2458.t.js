StartTest(function(t) {

    t.it("Resource utilization panel should render resource assignments when time axis is zoomed to hourly level", function(t) {
        var resourceStore = new Gnt.data.ResourceStore({
            data: [
                { Id : 1, Name : 'R1' }
            ]
        });

        var assignmentStore = new Gnt.data.AssignmentStore();

        var taskStore = new Gnt.data.TaskStore({
            resourceStore   : resourceStore,
            assignmentStore : assignmentStore,
            weekendsAreWorkdays : true,
            root            : {
                children : [
                    {
                        Id        : 1,
                        StartDate : '2015-01-07',
                        Duration  : 10,
                        Name      : 'T1'
                    }
                ]
            }
        });

        var panel = new Gnt.panel.ResourceUtilization({
            renderTo         : document.body,
            height           : 300,
            viewPreset       : 'weekAndDayLetter',
            startDate        : new Date(2015, 0, 5),
            endDate          : new Date(2015, 0, 12),
            taskStore        : taskStore
        });

        panel.expandAll();

        t.chain(
            function(next) {
                // It's important to add assignment dynamicaly instead of providing it as data for the store,
                // otherwise issue won't reveal
                assignmentStore.add(
                    { Id : 1, ResourceId : 1, TaskId : 1 }
                );
                next();
            },
            // Waiting for assignment row to appear
            {
                waitFor : 'selector',
                args : ['.gnt-utilizationrow-task', panel]
            },
            // Checking assignment data is present and it's visible
            function(next) {
                t.selectorNotExists(
                    '.gnt-utilizationrow-task .gnt-resource-utilization-interval-notutilized',
                    "Assignment surrogate event is rendered with utilization intervals visible"
                );
                next();
            },
            // Zooming to hourly level
            function(next) {
                panel.zoomToLevel(15);
                // Waiting for assignment event to refresh
                panel.getSchedulingView().on({
                    'itemupdate' : function(record, index, node) {
                        var assignment = record.getOriginalAssignment();
                        if (assignment && assignment.getId() == 1) {
                            next();
                        }
                    }
                });
            },
            // Checking assignment data is present and it's visible
            function(next) {
                t.selectorNotExists(
                    '.gnt-utilizationrow-task .gnt-resource-utilization-interval-notutilized',
                    "Assignment surrogate event is rendered with utilization intervals visible"
                );
            }
        );
    });
});
