StartTest(function(t) {

    // #2673
    // https://www.assembla.com/spaces/bryntum/tickets/2673-redo-task-move-does-not-update-rollup-for-collapsed-children/details
    //
    // We have a handler for this kind of updates, i.e. if rollup task child is updated then parent task row should
    // be updated too, but it's attached to view's 'itemupdate' event which is not called if rollup task is hidden,
    // because it's parent task is collapsed
    t.describe("Redoing changes in rollup task should be properly reflected by collapsed parent task", function(t) {

        var taskStore = new Gnt.data.TaskStore({
            cascadeChanges  : true,
            root            : {
                expanded : true,
                children : [{
                    "Id"        : 1,
                    "StartDate" : "2010-02-02",
                    "expanded"  : false,
                    "children"  : [{
                        "Id"        : 2,
                        "StartDate" : "2010-02-02",
                        "Duration"  : 1,
                        "leaf"      : true
                    }, {
                        "Id"        : 3,
                        "StartDate" : "2010-02-04",
                        "Duration"  : 1,
                        "Rollup"    : true,
                        "leaf"      : true
                    }]
                }]
            }
        });

        var undoManager = new Gnt.data.undoredo.Manager({
            stores : [taskStore]
        });
        undoManager.start();

        var gantt = t.getGantt2({
            renderTo        : Ext.getBody(),
            startDate       : new Date(2010, 0, 29),
            taskStore       : taskStore,
            showRollupTasks : true
        });

        t.chain(
            { waitFor : 'rowsVisible' },

            function(next) {
                var initialRollupX,
                    redoneRollupX;

                undoManager.startTransaction();
                taskStore.getNodeById(1).shift(Sch.util.Date.DAY, 3);
                undoManager.endTransaction();

                // Getting initial rollup markup position
                initialRollupX = gantt.getSchedulingView().getEl().down('.sch-rollup-task').getLeft();

                // Doing the trick
                undoManager.undo();
                undoManager.redo();

                // Getting redone rollup markup position
                redoneRollupX = gantt.getSchedulingView().getEl().down('.sch-rollup-task').getLeft();

                // Comaparing
                t.is(initialRollupX, redoneRollupX, "Rollup markup horizontal position is correct after undo/redo");
            }
        );
    })
});
