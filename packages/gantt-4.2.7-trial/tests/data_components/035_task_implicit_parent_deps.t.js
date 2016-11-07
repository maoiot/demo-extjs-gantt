StartTest(function (t) {

    var dependencyStore, taskStore;

    function task(id) { return taskStore.getNodeById(id); }

    t.beforeEach(function () {
        dependencyStore = Ext.create("Gnt.data.DependencyStore", {
            proxy : 'memory',

            data : [
                { From : 1, To : 3 }
            ]
        });

        taskStore = Ext.create("Gnt.data.TaskStore", {
            dependencyStore : dependencyStore,
            cascadeChanges  : true,
            cascadeDelay    : 0,

            proxy : 'memory',

            root : {
                expanded : true,

                children : [
                    {
                        Id        : 1,
                        expanded  : true,
                        StartDate : '2016-01-25',
                        Duration  : 2,

                        children : [
                            {
                                Id        : 11,
                                leaf      : true,
                                StartDate : '2016-01-25',
                                Duration  : 1
                            },
                            {
                                Id        : 12,
                                leaf      : true,
                                StartDate : '2016-01-26',
                                Duration  : 1
                            }
                        ]
                    },
                    {
                        Id        : 3,
                        expanded  : true,
                        StartDate : '2016-01-27',
                        Duration  : 2,

                        children  : [
                            {
                                Id        : 31,
                                leaf      : true,
                                StartDate : '2016-01-27',
                                Duration  : 1
                            },
                            {
                                Id        : 32,
                                leaf      : true,
                                StartDate : '2016-01-28',
                                Duration  : 1
                            }
                        ]
                    },
                    {
                        Id        : 4,
                        leaf      : true,
                        StartDate : '2016-01-25',
                        Duration  : 1
                    }
                ]
            }
        });
    });

    // #2566 - Summary task dependencies inheritance
    t.it('Takes into account inherited parents dependencies when a child is being aligned', function (t) {

        // commit changes caused by initial tasks normalization (to not interfere w/ further taskStore.getModifiedRecords() call)
        taskStore.commitChanges();

        dependencyStore.add({ From : 11, To : 31 });

        t.notOk(taskStore.getModifiedRecords().length, 'adding 11->31 dependency didn`t cause tasks realigning');

        t.diag('Shift task #1 one day to the right');

        task(1).setStartDate(new Date(2016, 0, 26));

        t.is(task(1).getStartDate(), new Date(2016, 0, 26), 'proper task #1 start');
        t.is(task(1).getDuration(), 2, 'proper task #1 duration');
        t.is(task(11).getStartDate(), new Date(2016, 0, 26), 'proper task #11 start');
        t.is(task(11).getDuration(), 1, 'proper task #11 duration');
        t.is(task(12).getStartDate(), new Date(2016, 0, 27), 'proper task #12 start');
        t.is(task(12).getDuration(), 1, 'proper task #12 duration');
        t.is(task(3).getStartDate(), new Date(2016, 0, 28), 'proper task #3 start');
        t.is(task(3).getDuration(), 2, 'proper task #3 duration');
        t.is(task(31).getStartDate(), new Date(2016, 0, 28), 'proper task #31 start');
        t.is(task(31).getDuration(), 1, 'proper task #31 duration');
        t.is(task(32).getStartDate(), new Date(2016, 0, 29), 'proper task #32 start');
        t.is(task(32).getDuration(), 1, 'proper task #32 duration');

        t.diag('Shift task #11 one day to the left');

        task(11).setStartDate(new Date(2016, 0, 25));

        t.is(task(1).getStartDate(), new Date(2016, 0, 25), 'proper task #1 start');
        t.is(task(1).getDuration(), 3, 'proper task #1 duration');
        t.is(task(11).getStartDate(), new Date(2016, 0, 25), 'proper task #11 start');
        t.is(task(11).getDuration(), 1, 'proper task #11 duration');
        t.is(task(12).getStartDate(), new Date(2016, 0, 27), 'proper task #12 start');
        t.is(task(12).getDuration(), 1, 'proper task #12 duration');
        t.is(task(3).getStartDate(), new Date(2016, 0, 28), 'proper task #3 start');
        t.is(task(3).getDuration(), 2, 'proper task #3 duration');
        t.is(task(31).getStartDate(), new Date(2016, 0, 28), 'proper task #31 start');
        t.is(task(31).getDuration(), 1, 'proper task #31 duration');
        t.is(task(32).getStartDate(), new Date(2016, 0, 29), 'proper task #32 start');
        t.is(task(32).getDuration(), 1, 'proper task #32 duration');

        t.diag('Shift task #11 back one day to the right');

        task(11).setStartDate(new Date(2016, 0, 26));

        t.is(task(1).getStartDate(), new Date(2016, 0, 26), 'proper task #1 start');
        t.is(task(1).getDuration(), 2, 'proper task #1 duration');
        t.is(task(11).getStartDate(), new Date(2016, 0, 26), 'proper task #11 start');
        t.is(task(11).getDuration(), 1, 'proper task #11 duration');
        t.is(task(12).getStartDate(), new Date(2016, 0, 27), 'proper task #12 start');
        t.is(task(12).getDuration(), 1, 'proper task #12 duration');
        t.is(task(3).getStartDate(), new Date(2016, 0, 28), 'proper task #3 start');
        t.is(task(3).getDuration(), 2, 'proper task #3 duration');
        t.is(task(31).getStartDate(), new Date(2016, 0, 28), 'proper task #31 start');
        t.is(task(31).getDuration(), 1, 'proper task #31 duration');
        t.is(task(32).getStartDate(), new Date(2016, 0, 29), 'proper task #32 start');
        t.is(task(32).getDuration(), 1, 'proper task #32 duration');

    });

    // #1505 - Task moved into a summary task has to be constrained by summary's incoming dependencies
    t.it('Aligns a task being added to a parent by task.indent() call', function (t) {
        task(4).indent();

        t.is(task(3).getStartDate(), new Date(2016, 0, 27), 'proper task #3 start');
        t.is(task(3).getDuration(), 2, 'proper task #3 duration');
        t.is(task(31).getStartDate(), new Date(2016, 0, 27), 'proper task #31 start');
        t.is(task(31).getDuration(), 1, 'proper task #31 duration');
        t.is(task(32).getStartDate(), new Date(2016, 0, 28), 'proper task #32 start');
        t.is(task(32).getDuration(), 1, 'proper task #32 duration');
        t.is(task(4).getStartDate(), new Date(2016, 0, 27), 'proper task #4 start');
        t.is(task(4).getDuration(), 1, 'proper task #4 duration');
    });

    // #1505 - Task moved into a summary task has to be constrained by summary's incoming dependencies
    t.it('Aligns a task being moved to another parent by appendChild() call', function (t) {
        task(3).appendChild(task(4));

        t.is(task(3).getStartDate(), new Date(2016, 0, 27), 'proper task #3 start');
        t.is(task(3).getDuration(), 2, 'proper task #3 duration');
        t.is(task(31).getStartDate(), new Date(2016, 0, 27), 'proper task #31 start');
        t.is(task(31).getDuration(), 1, 'proper task #31 duration');
        t.is(task(32).getStartDate(), new Date(2016, 0, 28), 'proper task #32 start');
        t.is(task(32).getDuration(), 1, 'proper task #32 duration');
        t.is(task(4).getStartDate(), new Date(2016, 0, 27), 'proper task #4 start');
        t.is(task(4).getDuration(), 1, 'proper task #4 duration');
    });

    // #1505 - Task moved into a summary task has to be constrained by summary's incoming dependencies
    t.it('Aligns a task being added by appendChild() call', function (t) {
        task(3).appendChild({
            Id        : 44,
            StartDate : '2016-01-25',
            Duration  : 1
        });

        t.is(task(3).getStartDate(), new Date(2016, 0, 27), 'proper task #3 start');
        t.is(task(3).getDuration(), 2, 'proper task #3 duration');
        t.is(task(31).getStartDate(), new Date(2016, 0, 27), 'proper task #31 start');
        t.is(task(31).getDuration(), 1, 'proper task #31 duration');
        t.is(task(32).getStartDate(), new Date(2016, 0, 28), 'proper task #32 start');
        t.is(task(32).getDuration(), 1, 'proper task #32 duration');
        t.is(task(44).getStartDate(), new Date(2016, 0, 27), 'proper task #4 start');
        t.is(task(44).getDuration(), 1, 'proper task #4 duration');
    });
});
