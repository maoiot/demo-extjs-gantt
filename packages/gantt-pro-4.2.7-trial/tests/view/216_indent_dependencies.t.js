StartTest('Indenting a task with dependencies can cause tricky issues', function (t) {

    // 3 tricky things about indent:
    // ---------------
    // 1. Need to suspend the events before indenting to prevent the taskStore from doing a cascade and thereby triggering UI updates
    // before the indent operation has completed (node first removed, then appended).

    // 2. By suspending events, we break the Sencha behavior since the store clears the removeContext object, we
    // put it back after the indent call
    // http://www.sencha.com/forum/showthread.php?270802-4.2.1-NodeInterface-removeContext-needs-to-be-passed-as-an-arg

    // 3. After indent, but before resumeEvents, we must also iterate and drop existing invalid dependencies since a parent task cannot have
    // dependencies to its children etc.

    // See task model "indent" method for further info

    var gantt;

    t.beforeEach(function () {
        gantt && gantt.destroy();

        var ds = [
            {
                "Id"        : 1,
                "Name"      : "Implementation Phase 1",
                "StartDate" : "2010-02-01",
                "expanded"  : true,
                "Duration"  : 3,
                "children"  : [
                    {
                        "Id"        : 2,
                        "Name"      : 2,
                        "leaf"      : true,
                        "StartDate" : "2010-02-01",
                        "Duration"  : 1
                    },
                    {
                        "Id"        : 3,
                        "Name"      : 3,
                        "StartDate" : "2010-02-02",
                        "expanded"  : true,
                        "Duration"  : 2,
                        "children"  : [
                            {
                                "Id"        : 4,
                                "Name"      : 4,
                                "leaf"      : true,
                                "StartDate" : "2010-02-02",
                                "Duration"  : 1
                            },
                            {
                                "Id"        : 5,
                                "Name"      : 5,
                                "leaf"      : true,
                                "StartDate" : "2010-02-02",
                                "Duration"  : 1
                            },
                            {
                                "Id"        : 6,
                                "Name"      : 6,
                                "leaf"      : true,
                                "StartDate" : "2010-02-02",
                                "Duration"  : 1
                            },
                            {
                                "Id"        : 7,
                                "Name"      : 7,
                                "leaf"      : true,
                                "StartDate" : "2010-02-03",
                                "Duration"  : 1
                            }
                        ]
                    }
                ]
            }
        ];

        gantt = t.getGantt({
            renderTo        : Ext.getBody(),

            lockedGridConfig    : {
                width   : 120
            },

            startDate       : new Date(2010, 0, 29),

            taskStore       : new Gnt.data.TaskStore({
                cascadeChanges  : true,
                root            : {
                    children : ds
                }
            }),

            dependencyStore : new Gnt.data.DependencyStore({
                data : [
                    {"From" : 2, "To" : 3, "Id" : 1 },
                    {"From" : 2, "To" : 4},
                    {"From" : 2, "To" : 5},
                    {"From" : 2, "To" : 6},
                    {"From" : 6, "To" : 7, "Id" : 2 }
                ]
            })
        });
    });

    t.it('Indent/outdent should remove invalid dependencies', function (t) {
        var ts = gantt.taskStore;

        function validate() {

            t.is(gantt.dependencyStore.getCount(), 1);
            t.is(gantt.dependencyStore.first().getId(), 2);

            t.is(gantt.lockedGrid.getView().getNodes().length, 7, 'Correct amount of nodes');

            t.is(ts.getNodeById(1).getStartDate(), new Date(2010, 1, 2), 'Task 1 Start');
            t.is(ts.getNodeById(2).getStartDate(), new Date(2010, 1, 2), 'Task 2 Start');
            t.is(ts.getNodeById(3).getStartDate(), new Date(2010, 1, 2), 'Task 3 Start');
            t.is(ts.getNodeById(4).getStartDate(), new Date(2010, 1, 2), 'Task 4 Start');
            t.is(ts.getNodeById(5).getStartDate(), new Date(2010, 1, 2), 'Task 5 Start');
            t.is(ts.getNodeById(6).getStartDate(), new Date(2010, 1, 2), 'Task 6 Start');
            t.is(ts.getNodeById(7).getStartDate(), new Date(2010, 1, 3), 'Task 7 Start');

            t.is(ts.getNodeById(1).getEndDate(), new Date(2010, 1, 4), 'Task 1 End');
            t.is(ts.getNodeById(2).getEndDate(), new Date(2010, 1, 4), 'Task 2 End');
            t.is(ts.getNodeById(3).getEndDate(), new Date(2010, 1, 4), 'Task 3 End');
            t.is(ts.getNodeById(4).getEndDate(), new Date(2010, 1, 3), 'Task 4 End');
            t.is(ts.getNodeById(5).getEndDate(), new Date(2010, 1, 3), 'Task 5 End');
            t.is(ts.getNodeById(6).getEndDate(), new Date(2010, 1, 3), 'Task 6 End');
            t.is(ts.getNodeById(7).getEndDate(), new Date(2010, 1, 4), 'Task 7 End');
        }

        t.chain(
            { waitFor : 'TasksAndDependenciesToRender' },

            function() {
                // Set "convertEmptyParentToLeaf" to 'false' for the task #3 to disable behaviour when we set a summary task duration to 1 day
                // after it has no longer any children (which happens in this test after outdent() step).
                // And we want to have the same assertions in validate() function so we disable this feature to keep tasks data intact.
                ts.getNodeById(2).convertEmptyParentToLeaf = false;

                // This makes all dependencies from 16 (new parent) invalid since target tasks are now children
                ts.indent(ts.getNodeById(3));

                validate();

                // Since both model and the store are doing suspendEvents, we need to make sure both calls work
                ts.getNodeById(3).outdent();

                validate();

                ts.getNodeById(3).indent();

                validate();
            }
        );
    });
});
