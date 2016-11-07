StartTest(function(t) {

    //======================================================================================================================================================================================================================================================
    t.diag('Setup');

    var dataSet             = t.getSampleDataSet1();
    var taskStore           = dataSet.taskStore;
    var dependencyStore     = dataSet.dependencyStore;
    var resourceStore       = dataSet.resourceStore;
    var assignmentStore     = dataSet.assignmentStore;
    var calendar            = dataSet.calendar;
    var task1               = taskStore.getNodeById(1);
    var assignment1         = assignmentStore.getById('Assnmt1');
    var resource1           = resourceStore.getById('Res1');

    //======================================================================================================================================================================================================================================================
    t.it('Data model - stores', function (t) {
        t.is(taskStore.getResourceStore(), resourceStore, 'Correct resource store found');
        t.is(taskStore.getAssignmentStore(), assignmentStore, 'Correct assignment store found');
        t.is(taskStore.getCalendar(), calendar, 'Correct calendar found');

        t.is(resourceStore.getTaskStore(), taskStore, 'Correct back-reference');
        t.is(assignmentStore.getTaskStore(), taskStore, 'Correct back-reference');
    })

    //======================================================================================================================================================================================================================================================
    t.it('Data model - task', function (t) {

        t.isDeeply(
            // sorting the resources by Id to have the predictable order
            t.sortByInternalId(task1.getResources()),
            [
                resourceStore.getById('Res1'),
                resourceStore.getById('Res2')
            ],
            'Correct resources returned for Task1'
        );

        t.isDeeply(
            // sorting the resources by Id to have the predictable order
            t.sortByInternalId(task1.getAssignments()),
            [
                assignmentStore.getById('Assnmt1'),
                assignmentStore.getById('Assnmt2')
            ],
            'Correct assignments returned for Task1'
        );
    })

    //======================================================================================================================================================================================================================================================
    t.it('Data model - assignment', function (t) {


        t.is(assignment1.getTask(), task1, 'Correct task returned for assignment1');
        t.is(assignment1.getResource(), resource1, 'Correct resource returned for assignment1');


        t.is(task1.getAssignmentFor(resource1), assignment1, 'Correct assignment instance found')
    });

    //======================================================================================================================================================================================================================================================
    t.it('Data model - calendars', function (t) {

        t.is(task1.getCalendar(), calendar, 'task1 has global calendar');
        // asking for own calendar
        t.is(task1.getCalendar(true), null, 'task1 has no own calendar');

        t.is(taskStore.getNodeById(4).getCalendar(), Gnt.data.Calendar.getCalendar('Task4'), 'Task4 has its own calendar');

        t.is(resource1.getCalendar(), calendar, 'Resource1 has global calendar');
        // asking for own calendar
        t.is(resource1.getCalendar(true), null, 'Resource1 has no own calendar');

        t.is(resourceStore.getById('Res5').getCalendar(), Gnt.data.Calendar.getCalendar('Res5'), 'Resource5 has its own calendar');
    });


    //======================================================================================================================================================================================================================================================
    t.it('Mutation assign via task methods', function (t) {

        t.throwsOk(function () {
            // we treat all calls to console.error as failures, and console.error is used in the Ext.Error.raise
            window.console = window.console || {};
            console.error  = function () {
            }

            // trying to assign the same resource twice
            task1.assign(resource1)

            delete console.error

        }, "Resource can't be assigned twice to the same task", 'Correct exception thrown');

    })

    //======================================================================================================================================================================================================================================================
    t.it('Mutation unassign via task methods', function (t) {

        // unassigning by resource instance
        task1.unAssign(resource1);

        t.isDeeply(task1.getResources(), [ resourceStore.getById('Res2') ], 'Now only the Res2 is assigned to Task1');

        // unassigning by resource id
        task1.unAssign('Res2');

        t.isDeeply(task1.getResources(), [], 'Now only the Res2 is assigned to Task1');
        t.isDeeply(task1.getAssignments(), [], 'Now only Task1 has no assignments');
    })

    //======================================================================================================================================================================================================================================================
    t.it('Mutation assign via resource methods', function (t) {

        resource1.assignTo(task1)

        t.isDeeply(task1.getResources(), [ resource1 ], 'Now Res1 is assigned to Task1');
    })

    //======================================================================================================================================================================================================================================================
    t.it('Mutation unassign via resource methods', function (t) {

        resource1.unAssignFrom(task1)

        t.isDeeply(task1.getResources(), [], 'Now only the Res2 is assigned to Task1');
    })

    //======================================================================================================================================================================================================================================================
    t.it('Working with phantom records', function (t) {

        var newResource = new Gnt.model.Resource({
            Name : 'Bob'
        });

        var assignmentsCountBefore = assignmentStore.getCount();

        task1.assign(newResource);

        t.isDeeply(
            task1.getResources(),
            [
                newResource
            ],
            'Phantom resource assigned correctly'
        );

        t.is(assignmentStore.getCount(), assignmentsCountBefore + 1, "New assignment was added to the assignment store");

        t.isnt(resourceStore.indexOf(newResource), -1, 'New resource was added to the resource store');

        t.is(task1.getAssignments().length, 1, '1 new assignment for task1');
        t.ok(task1.getAssignments()[ 0 ].phantom, 'New assignment record is phantom too');

        t.is(task1.getAssignmentFor(newResource), task1.getAssignments()[ 0 ], 'Correct assignment instance found')
    });

    //======================================================================================================================================================================================================================================================
    t.it('Providing resource store and assignment stores to the gantt panel instance instead of task store (should be set on task store as well)', function (t) {

        var taskStore2          = t.getTaskStore();
        var resourceStore2      = t.getResourceStore();
        var dependencyStore2    = t.getDependencyStore();
        var assignmentStore2    = t.getAssignmentStore();

        var ganttPanel          = t.getGantt({
            taskStore           : taskStore2,
            dependencyStore     : dependencyStore2,
            resourceStore       : resourceStore2,
            assignmentStore     : assignmentStore2
        });

        t.is(taskStore2.getResourceStore(), resourceStore2, 'Correct resource store found');
        t.is(taskStore2.getAssignmentStore(), assignmentStore2, 'Correct assignment store found');

        t.is(resourceStore2.getTaskStore(), taskStore2, 'Correct back-reference');
        t.is(assignmentStore2.getTaskStore(), taskStore2, 'Correct back-reference');
    })

    t.it('Task with 100% done should be considered as manually scheduled', function (t) {

        var task = new Gnt.model.Task();

        t.notOk(task.isManuallyScheduled())

        task.setPercentDone(100)

        t.ok(task.isManuallyScheduled())

        task.setPercentDone(101)

        t.ok(task.isManuallyScheduled())

        task.setPercentDone(99)

        t.notOk(task.isManuallyScheduled())
    })
})
