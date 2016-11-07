StartTest(function (t) {

    var gantt;

    t.beforeEach(function() {
        gantt && gantt.destroy();
    })

    t.it('Task context menu disables corresponding entries when a project is selected', function (t) {
        var menu    = new Gnt.plugin.TaskContextMenu(),
            addMenu = menu.query('#addTaskMenu')[0];

        var taskStore = t.getTaskStore({
            DATA : [
                {
                    Id        : 1,
                    TaskType  : 'Gnt.model.Project',
                    StartDate : '2015-01-20',
                    EndDate   : '2015-01-21'
                }
            ]
        });

        gantt = t.getGantt({
            taskStore      : taskStore,
            startDate      : null,
            endDate        : null,
            renderTo       : Ext.getBody(),
            plugins        : menu,
            leftLabelField : {
                dataIndex : 'Name',
                editor    : { xtype : 'textfield' }
            },
            eventRenderer  : function (record) {
                return { cls : 'task-' + record.getId() }
            }
        });

        t.chain(
            { waitForRowsVisible : gantt },
            { rightClick : '.task-1' },
            { waitForComponentVisible : menu, desc : 'Context menu showed' },

            function (next) {
                t.notOk(t.cq1('#deleteTask').isDisabled(), 'Delete task is enabled');
                t.ok(t.cq1('#editRightLabel').isDisabled(), 'Left label editing is disabled');
                t.ok(t.cq1('#toggleMilestone').isDisabled(), 'Toggle Milestone is disabled');
                t.ok(t.cq1('#splitTask').isDisabled(), 'Splitting task is disabled');
                next();
            },
            { moveCursorTo : '>> #addTaskMenu' },
            { waitForComponentVisible : addMenu, desc : 'Add menu showed' },

            function (next) {
                t.ok(t.cq1('#addTaskAbove').isDisabled(), 'Add task above is disabled');
                t.ok(t.cq1('#addTaskBelow').isDisabled(), 'Add task below is disabled');
                t.ok(t.cq1('#addMilestone').isDisabled(), 'Add Milestone is disabled');
                t.notOk(t.cq1('#addSubtask').isDisabled(), 'Add subtask is enabled');
                t.ok(t.cq1('#addSuccessor').isDisabled(), 'Add successor is disabled');
                t.ok(t.cq1('#addPredecessor').isDisabled(), 'Add successor is disabled');
                next();
            }
        );
    });

});
