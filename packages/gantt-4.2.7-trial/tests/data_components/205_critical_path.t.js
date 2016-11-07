StartTest(function(t) {

    // #2588 - Incorrect critical path calculation

    var taskStore       = t.getTaskStore({
        DATA : [
            { Id : 1, StartDate : '2016-02-01', Duration : 5, leaf : true },
            { Id : 2, StartDate : '2016-02-01', Duration : 10, leaf : true },
            { Id : 3, StartDate : '2016-02-12', Duration : 1, leaf : true }
        ],
        dependencyStore : t.getDependencyStore({
            data : [
                { From : 2, To : 3, Type : 3 }
            ]
        })
    });

    // add one more dependency ..dependency order in the store is important for the bug
    taskStore.getDependencyStore().add({ From : 1, To : 3 });

    var criticalPaths = taskStore.getCriticalPaths();

    // This one hangs in iternal deepDiff recursion in siesta
    // https://app.assembla.com/spaces/bryntum/tickets/2589-isdeeply-stuck-in-infinite-loop/details#
    t.isDeeply(
        taskStore.getCriticalPaths(), 
        [ [ taskStore.getNodeById(2) ], [ taskStore.getNodeById(3), taskStore.getNodeById(2) ] ], 
        'proper critical paths found'
    );

});
