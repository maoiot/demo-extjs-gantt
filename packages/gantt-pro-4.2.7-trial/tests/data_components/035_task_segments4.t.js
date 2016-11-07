StartTest(function(t) {

    // #2711 - Dependencies are refreshed when tabbing in advanced sample

    // In the first 3 sub-tests we check that calling of setStartDate/setEndDate/setDuration that doesn't change corresponding fields
    // doesn't make "Segments" field dirty.

    t.it('Calling of task.setStartDate(task.getStartDate)) doesn`t make Segments dirty', function (t) {

        var taskStore       = t.getTaskStore({
            DATA            : [
                {
                    Id          : 1,
                    StartDate   : '2012-09-03',
                    Segments    : [
                        {
                            Id          : 1,
                            StartDate   : '2012-09-03',
                            Duration    : 2
                        },
                        {
                            Id          : 2,
                            StartDate   : '2012-09-06',
                            Duration    : 3
                        }
                    ],
                    leaf        : true
                }
            ]
        });

        var task = taskStore.getNodeById(1);

        task.setStartDate(task.getStartDate(), true, true, function (cancel) {
            t.notOk(task.modified, 'task is not modified');
        })
    });

    t.it('Calling of task.setEndDate(task.getEndDate)) doesn`t make Segments dirty', function (t) {

        var taskStore       = t.getTaskStore({
            DATA            : [
                {
                    Id          : 1,
                    StartDate   : '2012-09-03',
                    Segments    : [
                        {
                            Id          : 1,
                            StartDate   : '2012-09-03',
                            Duration    : 2
                        },
                        {
                            Id          : 2,
                            StartDate   : '2012-09-06',
                            Duration    : 3
                        }
                    ],
                    leaf        : true
                }
            ]
        });

        var task = taskStore.getNodeById(1);

        task.setEndDate(task.getEndDate(), true, true, function (cancel) {
            t.notOk(task.modified, 'task is not modified');
        })
    });

    t.it('Calling of task.setDuration(task.getDuration)) doesn`t make Segments dirty', function (t) {

        var taskStore       = t.getTaskStore({
            DATA            : [
                {
                    Id          : 1,
                    StartDate   : '2012-09-03',
                    Segments    : [
                        {
                            Id          : 1,
                            StartDate   : '2012-09-03',
                            Duration    : 2
                        },
                        {
                            Id          : 2,
                            StartDate   : '2012-09-06',
                            Duration    : 3
                        }
                    ],
                    leaf        : true
                }
            ]
        });

        var task = taskStore.getNodeById(1);

        task.setDuration(task.getDuration(), task.getDurationUnit(), function (cancel) {
            t.notOk(task.modified, 'task is not modified');
        })
    });


    // #2730 - Incorrect splitting of tasks having scheduling mode other than "Normal"

    t.it('Task end date is aligned w/ the last segment end after split (for not "Normally" scheduled tasks)', function (t) {

        var taskStore   = t.getTaskStore({
            DATA        : [
                {
                    leaf           : true,
                    Id             : 'FixedDuration',
                    StartDate      : "2016-03-22",
                    Duration       : 2,
                    SchedulingMode : 'FixedDuration'
                },
                {
                    leaf           : true,
                    Id             : 'DynamicAssignment',
                    StartDate      : "2016-03-22",
                    Duration       : 2,
                    SchedulingMode : 'DynamicAssignment'
                }
            ]
        });

        // split tasks and ensure end dates are correct
        taskStore.getRoot().eachChild(function (task) {
            task.split(new Date(2016, 2, 23));

            t.is(task.getStartDate(), new Date(2016, 2, 22), 'correct ' + task.getId() + ' task start date');
            t.is(task.getEndDate(), new Date(2016, 2, 25), 'correct ' + task.getId() + ' task end date');
            t.is(task.getDuration(), 2, 'correct ' + task.getId() + ' task duration');

            t.is(task.getFirstSegment().getStartDate(), task.getStartDate(), 'correct ' + task.getId() + ' first segment start date');
            t.is(task.getLastSegment().getEndDate(), task.getEndDate(), 'correct ' + task.getId() + ' last segment end date');
        });

    });


    t.it('Task end date is aligned w/ the last segment end after merge (for not "Normally" scheduled tasks)', function (t) {

        var taskStore   = t.getTaskStore({
            resourceStore : t.getResourceStore({
                data : [{ Id : 'r1' }]
            }),
            assignmentStore : t.getAssignmentStore({
                data : [{ Id : 'a1', ResourceId : 'r1', TaskId : 'EffortDriven' }]
            }),
            DATA        : [
                {
                    leaf           : true,
                    Id             : 'FixedDuration',
                    StartDate      : "2016-03-22",
                    Duration       : 2,
                    SchedulingMode : 'FixedDuration',
                    Segments       : [
                        {
                            Id          : 1,
                            StartDate   : "2016-03-22",
                            Duration    : 1
                        },
                        {
                            Id          : 2,
                            StartDate   : "2016-03-24",
                            Duration    : 1
                        }
                    ]
                },
                {
                    leaf           : true,
                    Id             : 'DynamicAssignment',
                    StartDate      : "2016-03-22",
                    Duration       : 2,
                    SchedulingMode : 'DynamicAssignment',
                    Segments       : [
                        {
                            Id          : 1,
                            StartDate   : "2016-03-22",
                            Duration    : 1
                        },
                        {
                            Id          : 2,
                            StartDate   : "2016-03-24",
                            Duration    : 1
                        }
                    ]
                },
                {
                    leaf           : true,
                    Id             : 'EffortDriven',
                    StartDate      : "2016-03-22",
                    Duration       : 2,
                    Effort         : 1,
                    EffortUnit     : 'd',
                    SchedulingMode : 'EffortDriven',
                    Segments       : [
                        {
                            Id          : 1,
                            StartDate   : "2016-03-22",
                            Duration    : 1
                        },
                        {
                            Id          : 2,
                            StartDate   : "2016-03-24",
                            Duration    : 1
                        }
                    ]
                }
            ]
        });

        // merge tasks and ensure end date are correct
        taskStore.getRoot().eachChild(function (task) {
            task.merge(task.getFirstSegment(), task.getLastSegment());

            t.is(task.getStartDate(), new Date(2016, 2, 22), 'correct ' + task.getId() + ' task start date');
            t.is(task.getEndDate(), new Date(2016, 2, 25), 'correct ' + task.getId() + ' task end date');
            t.is(task.getDuration(), 3, 'correct ' + task.getId() + ' task duration');

            t.notOk(task.isSegmented(), task.getId() + ' is no longer segmented');
        });

    });

    t.it('Task end date is aligned w/ the last segment end after implicit merge (for not "Normally" scheduled tasks)', function (t) {

        var taskStore   = t.getTaskStore({
            resourceStore : t.getResourceStore({
                data : [{ Id : 'r1' }]
            }),
            assignmentStore : t.getAssignmentStore({
                data : [{ Id : 'a1', ResourceId : 'r1', TaskId : 'EffortDriven' }]
            }),
            DATA        : [
                {
                    leaf           : true,
                    Id             : 'FixedDuration',
                    StartDate      : "2016-03-22",
                    Duration       : 2,
                    SchedulingMode : 'FixedDuration',
                    Segments       : [
                        {
                            Id          : 1,
                            StartDate   : "2016-03-22",
                            Duration    : 1
                        },
                        {
                            Id          : 2,
                            StartDate   : "2016-03-24",
                            Duration    : 1
                        }
                    ]
                },
                {
                    leaf           : true,
                    Id             : 'DynamicAssignment',
                    StartDate      : "2016-03-22",
                    Duration       : 2,
                    SchedulingMode : 'DynamicAssignment',
                    Segments       : [
                        {
                            Id          : 1,
                            StartDate   : "2016-03-22",
                            Duration    : 1
                        },
                        {
                            Id          : 2,
                            StartDate   : "2016-03-24",
                            Duration    : 1
                        }
                    ]
                },
                {
                    leaf           : true,
                    Id             : 'EffortDriven',
                    StartDate      : "2016-03-22",
                    Duration       : 2,
                    Effort         : 2,
                    EffortUnit     : 'd',
                    SchedulingMode : 'EffortDriven',
                    Segments       : [
                        {
                            Id          : 1,
                            StartDate   : "2016-03-22",
                            Duration    : 1
                        },
                        {
                            Id          : 2,
                            StartDate   : "2016-03-24",
                            Duration    : 1
                        }
                    ]
                }
            ]
        });

        // merge tasks and ensure end date are correct
        taskStore.getRoot().eachChild(function (task) {
            task.getLastSegment().setStartDate(new Date(2016, 2, 23));

            t.is(task.getStartDate(), new Date(2016, 2, 22), 'correct ' + task.getId() + ' task start date');
            t.is(task.getEndDate(), new Date(2016, 2, 24), 'correct ' + task.getId() + ' task end date');
            t.is(task.getDuration(), 2, 'correct ' + task.getId() + ' task duration');

            t.notOk(task.isSegmented(), task.getId() + ' is no longer segmented');
        });

    });

    t.it('Task end date is aligned w/ the last segment end after implicit merge for an "EffortDriven" task which has inconsistent Duration vs Effort state', function (t) {

        var taskStore   = t.getTaskStore({
            resourceStore : t.getResourceStore({
                data : [{ Id : 'r1' }]
            }),
            assignmentStore : t.getAssignmentStore({
                data : [{ Id : 'a1', ResourceId : 'r1', TaskId : 'EffortDriven' }]
            }),
            DATA        : [
                {
                    leaf           : true,
                    Id             : 'EffortDriven',
                    StartDate      : "2016-03-22",
                    // Here we have Duration 3d while Effort is 2d
                    // Since we have one 100% allocated resource (calendar is the same for both project and the resource)
                    // the duration should be 2d
                    //
                    // In the test we cause implicit segments merge by shifting the 2nd one to the 1st one end.
                    // We expect the task duraton will be 2d
                    Duration       : 3,
                    Effort         : 2,
                    EffortUnit     : 'd',
                    SchedulingMode : 'EffortDriven',
                    Segments       : [
                        {
                            Id          : 1,
                            StartDate   : "2016-03-22",
                            Duration    : 1
                        },
                        {
                            Id          : 2,
                            StartDate   : "2016-03-24",
                            Duration    : 2
                        }
                    ]
                }
            ]
        });

        // merge tasks and ensure end date are correct
        var task = taskStore.getNodeById('EffortDriven');

        task.getLastSegment().setStartDate(new Date(2016, 2, 23));

        t.is(task.getStartDate(), new Date(2016, 2, 22), 'correct ' + task.getId() + ' task start date');
        t.is(task.getEndDate(), new Date(2016, 2, 24), 'correct ' + task.getId() + ' task end date');
        t.is(task.getDuration(), 2, 'correct ' + task.getId() + ' task duration');

        t.notOk(task.isSegmented(), task.getId() + ' is no longer segmented');

    });

});
