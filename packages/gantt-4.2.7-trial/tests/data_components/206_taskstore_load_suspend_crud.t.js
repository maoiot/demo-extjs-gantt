StartTest(function(t) {

    // #2710 - TaskStore doesn't suspend CRUD listeners properly during its loading

    t.it('Task store suspends cascading and parents recalculating during its loading w/ load() method call when "asynchronousLoad" is `true`', function (t) {

        var taskStore = new Gnt.data.TaskStore({
            proxy           : 'ajax',
            dependencyStore : new Gnt.data.DependencyStore({
                data : [{ Id : 1, From : 1, To : 2 }]
            })
        });

        // The issue happened only when the task store had "asynchronousLoad" set to true.
        // Which happens when a store uses Ajax proxy initially.
        taskStore.setProxy(new Ext.data.proxy.Memory());

        taskStore.proxy.data = [
            {
                Id        : 1,
                leaf      : true,
                StartDate : '2016-03-08',
                Duration  : 1
            },
            {
                Id        : 2,
                StartDate : '2016-03-10',
                Duration  : 1,
                expanded  : true,
                children  : [
                    {
                        Id        : 21,
                        leaf      : true,
                        StartDate : '2016-03-11',
                        Duration  : 2
                    }
                ]
            }
        ];


        t.waitForEvent(taskStore, 'load', function () {
            t.notOk(taskStore.getModifiedRecords().length, 'no modified tasks after load');

            var task2 = taskStore.getNodeById(2)

            t.is(task2.getStartDate(), new Date(2016, 2, 10), 'task2 kept its start date');
            t.is(task2.getDuration(), 1, 'task2 kept its duration');

            var task21 = taskStore.getNodeById(21);

            t.is(task21.getStartDate(), new Date(2016, 2, 11), 'task21 kept its start date');
            t.is(task21.getDuration(), 2, 'task21 kept its duration');

        });


        taskStore.load();
    });

});
