StartTest(function(t) {

    // #2914 - Incorrect critical path calculation

    var taskStore       = t.getTaskStore({
        DATA : [
            { Id : 1, StartDate : '2016-06-20', Duration : 1, leaf : true },
            { Id : 2, StartDate : '2016-06-21', Duration : 1, leaf : true },
            { Id : 3, StartDate : '2016-06-22', Duration : 1, leaf : true }
        ],
        dependencyStore : t.getDependencyStore({
            data : [
                { From : 1, To : 2 },
                { From : 2, To : 3 }
            ]
        })
    });

    var criticalPaths = taskStore.getCriticalPaths();

    t.is(criticalPaths.length, 1);
    t.is(criticalPaths[0].length, 3);
    t.is(criticalPaths[0][0], taskStore.getNodeById(3));
    t.is(criticalPaths[0][1], taskStore.getNodeById(2));
    t.is(criticalPaths[0][2], taskStore.getNodeById(1));

    taskStore.getNodeById(2).setStartDate(new Date(2016, 5, 22));

    criticalPaths = taskStore.getCriticalPaths();

    t.is(criticalPaths.length, 1);
    t.is(criticalPaths[0].length, 2);
    t.is(criticalPaths[0][0], taskStore.getNodeById(3));
    t.is(criticalPaths[0][1], taskStore.getNodeById(2));

});
