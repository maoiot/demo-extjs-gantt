StartTest(function(t) {

    t.it('Resource #1 calculates utilization report correctly', function (t) {
        var resourceStore = t.getResourceStore({
            data : [
                { Id : 'r1' },
                { Id : 'r2' }
            ]
        });

        var assignmentStore = t.getAssignmentStore({
            data    : [
                {
                    Id         : 'a1',
                    ResourceId : 'r1',
                    TaskId     : 't1'
                },
                {
                    Id         : 'a2',
                    ResourceId : 'r2',
                    TaskId     : 't2',
                    Units      : 50
                },
                {
                    Id         : 'a3',
                    ResourceId : 'r2',
                    TaskId     : 't3',
                    Units      : 50
                }
            ]
        });

        t.getTaskStore({
            resourceStore   : resourceStore,
            assignmentStore : assignmentStore,
            DATA            : [
                {
                    Id           : 't1',
                    StartDate    : '2015-11-30 08:00:00',
                    EndDate      : '2015-12-02 17:00:00',
                    Duration     : 57, // 16 + 24 + 17
                    DurationUnit : 'h',
                    leaf         : true
                },
                {
                    Id           : 't2',
                    StartDate    : '2015-11-30 08:00:00',
                    EndDate      : '2015-12-02 17:00:00',
                    Duration     : 57, // 16 + 24 + 17
                    DurationUnit : 'h',
                    leaf         : true
                },
                {
                    Id           : 't3',
                    StartDate    : '2015-11-30 08:00:00',
                    EndDate      : '2015-12-03 00:00:00',
                    Duration     : 64, // 16 + 24 + 24
                    DurationUnit : 'h',
                    leaf         : true
                }
            ]
        });

        t.isDeeply(
            resourceStore.getById('r1').getUtilizationInfo(new Date(2015, 10, 30), new Date(2015, 11, 03)),
            {
                allocationMs      : 57*3600000,
                allocationDeltaMs : 0,
                isOverallocated   : false,
                isUnderallocated  : true,
                isUtilized        : true,
                assignmentInfo    : {
                    a1 : {
                        allocationMs      : 57*3600000,
                        allocationDeltaMs : 0,
                        isOverallocated   : false,
                        isUnderallocated  : false,
                        isUtilized        : true
                    }
                },
                taskInfo : {
                    t1 : {
                        allocationMs      : 57*3600000,
                        allocationDeltaMs : 0,
                        isOverallocated   : false,
                        isUnderallocated  : false,
                        isUtilized        : true
                    }
                }
            },
            'proper r1 getUtilizationInfo result'
        );

        t.isDeeply(
            resourceStore.getById('r2').getUtilizationInfo(new Date(2015, 10, 30), new Date(2015, 11, 03)),
            {
                allocationMs      : (28.5 + 32)*3600000,
                allocationDeltaMs : 0,
                isOverallocated   : false,
                isUnderallocated  : true,
                isUtilized        : true,
                assignmentInfo    : {
                    a2 : {
                        allocationMs      : 28.5*3600000,
                        allocationDeltaMs : 0,
                        isOverallocated   : false,
                        isUnderallocated  : true,
                        isUtilized        : true
                    },
                    a3 : {
                        allocationMs      : 32*3600000,
                        allocationDeltaMs : 0,
                        isOverallocated   : false,
                        isUnderallocated  : true,
                        isUtilized        : true
                    }
                },
                taskInfo : {
                    t2 : {
                        allocationMs      : 28.5*3600000,
                        allocationDeltaMs : 0,
                        isOverallocated   : false,
                        isUnderallocated  : true,
                        isUtilized        : true
                    },
                    t3 : {
                        allocationMs      : 32*3600000,
                        allocationDeltaMs : 0,
                        isOverallocated   : false,
                        isUnderallocated  : true,
                        isUtilized        : true
                    }
                }
            },
            'proper r2 getUtilizationInfo result'
        );
    });

});
