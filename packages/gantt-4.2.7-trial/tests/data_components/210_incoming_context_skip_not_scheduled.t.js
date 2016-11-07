StartTest(function (t) {

    // #2535 - Availability iterator might raise exception for dependent tasks

    // By the test scenario:
    // task #1 is not scheduled properly and should not affect its successor task #3
    // So we shift task #1 and then check that task #3 is not affected

    function it (config) {
        t.it(config.desc, function (t) {

            var dependencyStore = t.getDependencyStore({
                data : config.dependencies
            });

            var taskStore = t.getTaskStore({
                dependencyStore : dependencyStore,
                cascadeChanges  : true,
                DATA            : config.tasks
            });

            // snapshot task #3 data
            var originalData = Ext.apply({}, taskStore.getNodeById(3).data);

            // shift task #1
            taskStore.getNodeById(1).shift(Sch.util.Date.DAY, 100);

            t.isDeeply(taskStore.getNodeById(3).data, originalData, 'task #3 stayed intact');
        });
    }

    var Types = Gnt.model.Dependency.Type;

    it({
        desc  : 'StartToStart dependency ignored if successor is not scheduled properly',
        tasks : [
            {
                Id        : 1,
                leaf      : true,
                EndDate   : '2016-04-12'
            },
            {
                Id        : 2,
                leaf      : true,
                StartDate : '2016-04-11',
                Duration  : 1
            },
            {
                Id        : 3,
                leaf      : true,
                StartDate : '2016-04-12',
                Duration  : 1
            }
        ],
        dependencies : [
            { From : 1, To : 3, Lag : 1, Type : Types.StartToStart },
            { From : 2, To : 3, Lag : 1, Type : Types.StartToStart }
        ]
    });


    it({
        desc  : 'StartToEnd dependency ignored if successor is not scheduled properly',
        tasks : [
            {
                Id        : 1,
                leaf      : true,
                EndDate   : '2016-04-15'
            },
            {
                Id        : 2,
                leaf      : true,
                StartDate : '2016-04-11',
                Duration  : 1
            },
            {
                Id        : 3,
                leaf      : true,
                StartDate : '2016-04-11',
                Duration  : 1
            }
        ],
        dependencies : [
            { From : 1, To : 3, Lag : 1, Type : Types.StartToEnd },
            { From : 2, To : 3, Lag : 1, Type : Types.StartToEnd }
        ]
    });


    it({
        desc  : 'EndToStart dependency ignored if successor is not scheduled properly',
        tasks : [
            {
                Id        : 1,
                leaf      : true,
                StartDate : '2016-04-12'
            },
            {
                Id        : 2,
                leaf      : true,
                StartDate : '2016-04-11',
                Duration  : 1
            },
            {
                Id        : 3,
                leaf      : true,
                StartDate : '2016-04-13',
                Duration  : 1
            }
        ],
        dependencies : [
            { From : 1, To : 3, Lag : 1, Type : Types.EndToStart },
            { From : 2, To : 3, Lag : 1, Type : Types.EndToStart }
        ]
    });


    it({
        desc  : 'EndToEnd dependency ignored if successor is not scheduled properly',
        tasks : [
            {
                Id        : 1,
                leaf      : true,
                StartDate : '2016-04-12'
            },
            {
                Id        : 2,
                leaf      : true,
                StartDate : '2016-04-11',
                Duration  : 1
            },
            {
                Id        : 3,
                leaf      : true,
                StartDate : '2016-04-12',
                Duration  : 1
            }
        ],
        dependencies : [
            { From : 1, To : 3, Lag : 1, Type : Types.EndToEnd },
            { From : 2, To : 3, Lag : 1, Type : Types.EndToEnd }
        ]
    });

});
