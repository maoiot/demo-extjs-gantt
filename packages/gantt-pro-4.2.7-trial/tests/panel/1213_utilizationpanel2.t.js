StartTest(function (t) {

    // Checks that utilization grid doesn't raise an exception when a task starts/finishes outside of the timeaxis #2340

    t.livesOk(function () {
        var resourceStore = new Gnt.data.ResourceStore({
            data: [
                { Id : 1, Name : 'Mike' },
                { Id : 2, Name : 'foo' }
            ]
        });

        var assignmentStore = new Gnt.data.AssignmentStore({
            data: [
                { Id : 1, ResourceId : 1, TaskId : 1 },
                { Id : 2, ResourceId : 2, TaskId : 2 }
            ]
        });

        var taskStore = new Gnt.data.TaskStore({
            resourceStore   : resourceStore,
            assignmentStore : assignmentStore,
            root            : {
                children : [
                    {
                        Id        : 1,
                        StartDate : '2015-01-07',
                        Duration  : 10
                    },
                    {
                        Id        : 2,
                        StartDate : '2014-12-24',
                        Duration  : 10
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
    }, 'Shows tasks starting (finishing) outside of the timeaxis w/o an exception');

});