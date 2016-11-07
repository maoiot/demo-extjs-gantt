StartTest(function(t) {

    // #2501 - Last child Task outdent doesn't adjust its summary start/end

    t.it('Sets a parent task duration to 1 day after the last child outdent', function (t) {

        var taskStore   = new Gnt.data.TaskStore({
            root : {
                expanded : true,
                children : [{
                    Id          : 1,
                    StartDate   : '2015-12-21',
                    Duration    : 5,
                    expanded    : true,
                    children    : [
                        {
                            Id          : 11,
                            StartDate   : '2015-12-21',
                            Duration    : 5,
                            leaf        : true
                        }
                    ]
                }]
            }
        });

        taskStore.getNodeById(11).outdent();

        t.is(taskStore.getNodeById(1).getDuration(), 1, "#1 proper duration");
        t.is(taskStore.getNodeById(1).getDurationUnit(), 'd', "#1 proper duration unit");
        t.is(taskStore.getNodeById(1).getStartDate(), new Date(2015, 11, 21), "#1 proper start");
        t.is(taskStore.getNodeById(1).getEndDate(), new Date(2015, 11, 22), "#1 proper end");

        t.is(taskStore.getNodeById(11).getDuration(), 5, "#11 proper duration");
        t.is(taskStore.getNodeById(11).getDurationUnit(), 'd', "#11 proper duration unit");
        t.is(taskStore.getNodeById(11).getStartDate(), new Date(2015, 11, 21), "#11 proper start");
        t.is(taskStore.getNodeById(11).getEndDate(), new Date(2015, 11, 26), "#11 proper end");

    });

});
