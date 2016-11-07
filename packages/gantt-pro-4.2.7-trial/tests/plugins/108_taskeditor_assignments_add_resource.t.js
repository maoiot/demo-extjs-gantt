StartTest(function(t) {

    // #2617 - Add new resource window hidden behind task editor

    t.it('Finds assignments in the `Resources` tab grid', function (t) {
        var taskEditor = new Gnt.plugin.TaskEditor();

        var g = t.getGantt2({
            renderTo        : Ext.getBody(),
            resourceStore   : t.getResourceStore(),
            assignmentStore : t.getAssignmentStore(),
            forceFit        : true,
            plugins         : taskEditor
        });

        var grid = taskEditor.taskEditor.assignmentGrid;

        t.chain(
            { waitForTasksAndDependenciesToRender : g },

            function (next) {
                t.waitForComponentVisible(taskEditor, next);
                taskEditor.showTask(g.taskStore.getNodeById(117));
            },

            function (next) {
                t.waitForComponentVisible(grid, next);
                taskEditor.taskEditor.setActiveTab(grid);
            },

            function (next) {
                grid.insertAssignment();
                t.waitFor(function () {
                    return grid.cellEditing.getActiveEditor();
                }, next);
            },

            {
                type   : 'newresource',
                target : function () {
                    return grid.cellEditing.getActiveEditor();
                }
            },

            // We cannot use [ENTER] here to stop editing, because in 6.0.2 siesta
            // will also close the windows immediately
            { click : function () { return grid.view; } },

            { waitForComponentVisible : 'messagebox', desc : 'Add resource messagebox showed' },

            function () {
                g.destroy();
            }
        );
    });

});
