StartTest(function (t) {
    var g = t.getGantt({
        startDate : new Date(2010, 1, 1),
        endDate   : new Date(2010, 2, 1),
        forceFit  : true,
        renderTo  : Ext.getBody(),
        taskStore : new Gnt.data.TaskStore({
            root : {
                children : [{
                    Id        : 1,
                    StartDate : new Date(2010, 1, 1),
                    Duration  : 3,
                    children  : [
                        {
                            Id        : 11,
                            StartDate : new Date(2010, 1, 1),
                            Duration  : 3,
                            leaf      : true
                        }
                    ]
                }]
            }
        })
    });

    // Clicking a parent task bar should toggle it by default
    var task = g.taskStore.getNodeById(1);

    t.chain(
        { click : '.sch-gantt-parenttask-bar' },

        function (next) {
            t.ok(task.isExpanded());
            next()
        },

        { click : '.sch-gantt-parenttask-bar' },

        function (next) {
            t.notOk(task.isExpanded());
        }
    );
});
