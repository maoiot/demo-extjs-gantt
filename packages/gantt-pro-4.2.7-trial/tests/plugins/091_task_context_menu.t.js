StartTest(function (t) {

    var gantt;

    t.beforeEach(function() {
        gantt && gantt.destroy();
    })

    t.it('Should be able to use all actions of the menu', function (t) {
        var menu = new Gnt.plugin.TaskContextMenu({
            triggerEvent : ['taskcontextmenu', 'containercontextmenu']
        });

        gantt = t.getGantt({
            lockedGridConfig : { width : 150 },
            renderTo         : Ext.getBody(),
            forceFit         : true,
            plugins          : menu
        });

        t.chain(
            { waitForTasksAndDependenciesToRender : gantt },
            { rightClick : t.getFirstLeafTaskEl(gantt) },
            { waitForComponentVisible : menu, desc : 'Context menu shown after task bar contextmenu click' },

            function (next) {
                var store = gantt.taskStore,
                    root  = store.getRootNode();

                var firstTask = gantt.resolveTaskRecord(t.getFirstLeafTaskEl(gantt));

                menu.addTaskAboveAction();
                t.is(gantt.getSchedulingView().el.select('.' + Ext.grid.View.prototype.selectedItemCls).getCount(), 1, '1 row selected (bug #123)');

                menu.addMilestone();
                var newTask   = firstTask.nextSibling;
                t.ok(newTask.isMilestone(), 'Milestone added');

                t.isStartEnd(newTask, firstTask.getEndDate(), firstTask.getEndDate(), 'Correct dates for milestone');

                menu.toggleMilestone();
                t.ok(firstTask.isMilestone(), 'Converted to milestone');
                t.is(firstTask.getDuration(), 0, 'Correct duration for milestone');

                menu.toggleMilestone();
                t.notOk(firstTask.isMilestone(), 'Converted to regular task');
                t.is(firstTask.getDuration(), 1, 'Correct duration for milestone');


                menu.addTaskBelowAction();
                menu.addSubtask();
                menu.addSuccessor();
                menu.addPredecessor();
                menu.editLeftLabel();
                menu.editRightLabel();
                menu.deleteTask();
                menu.hide();

                root.removeAll();
                menu.hide();
                t.ok(!menu.isVisible(), 'Context menu hidden');

                next();
            },
            //wait for 100ms here to zones to disappear, otherwise we can click on the timespan zone by accident
            //(since all tasks were removed from store they will be reachable)
            'waitFor(100)',
            { rightClick : gantt.getSchedulingView().el },

            function () {
                t.ok(menu.isVisible(), 'Context menu shown after contextmenu click on empty gantt body');
                menu.addTaskAboveAction();
                gantt.destroy();
                t.notOk(menu.el, 'Menu element destroyed');
            }
        );
    });

    t.it('Should function correctly when no tasks exist', function (t) {
        var menu2 = new Gnt.plugin.TaskContextMenu();

        gantt = t.getGantt({
            renderTo   : Ext.getBody(),
            viewConfig : { forceFit : true },
            startDate  : new Date(1980, 1, 1),
            endDate    : new Date(1980, 6, 1),
            forceFit   : true,
            plugins    : menu2
        });

        t.chain(
            { waitForRowsVisible : gantt },
            { rightClick : t.getFirstScheduleRowEl(gantt) },
            { waitForComponentVisible : menu2, desc : 'Context menu shown after row contextmenu click' },

            function (next) {
                var store = gantt.taskStore,
                    root  = store.getRootNode();

                menu2.hide();

                root.removeAll();
                next();
            },

            { click : null },

            function (next) {
                t.ok(!menu2.isVisible(), 'Context menu hidden');
                next();
            },

            { rightClick : null },

            function (next) {
                t.ok(menu2.isVisible(), 'Context menu shown after contextmenu click on empty gantt body');

                menu2.hide();
                next();
            },

            { rightClick : gantt.lockedGrid.getView().el },

            function (next) {
                t.ok(menu2.isVisible(), 'Context menu shown after contextmenu click on empty locked grid body');
                next();
            },
            function () {
                gantt.destroy();
            }
        )
    });

    // #1371
    t.it('Task context does not work for a tasks store root node', function (t) {
        var menu = new Gnt.plugin.TaskContextMenu();

        gantt = t.getGantt({
            rootVisible      : true,
            lockedGridConfig : { width : 100 },
            renderTo         : Ext.getBody(),
            forceFit         : true,
            plugins          : menu
        });

        t.chain(
            { waitForRowsVisible : gantt },
            { rightClick : t.getFirstScheduleRowEl(gantt) },
            // give it enough time to show
            { waitFor : 2000 },
            function (next) {
                t.notOk(menu.isVisible(), 'Context menu hidden');
                next();
            },
            function () {
                gantt.destroy();
            }
        );
    });

    // #1889
    t.it('Task context menu disappears when clicking another grid row', function (t) {
        var menu = new Gnt.plugin.TaskContextMenu();

        gantt = t.getGantt({
            lockedGridConfig : { width : 100 },
            renderTo         : Ext.getBody(),
            forceFit         : true,
            plugins          : menu,
            eventRenderer    : function (record) {
                return { cls : 'task-' + record.getId() }
            }
        });

        t.chain(
            { waitForRowsVisible : gantt },
            { rightClick : gantt.el.down('.task-114') },
            { waitForComponentVisible : menu, desc : 'context menu showed' },
            { click : gantt.el.down('.task-117'), offset : [10, 5] },
            { waitForComponentNotVisible : menu, desc : 'Click on task closed menu' },

            { rightClick : gantt.el.down('.task-114') },
            { waitForComponentVisible : menu, desc : 'context menu showed' },
            { click : t.getNthScheduleRowEl(gantt, 1), offset : [10, 10] }, // provide offset to not interfere w/ the opened menu
            { waitForComponentNotVisible : menu, desc : 'Click on scheduling area closed menu' },
            function () {
                gantt.destroy();
            }
        );
    });

    // #2057
    t.it('Task context menu disables corresponding menu entry when left/right editor is absent', function (t) {
        var menu = new Gnt.plugin.TaskContextMenu();

        gantt = t.getGantt({
            renderTo       : Ext.getBody(),
            plugins        : menu,
            leftLabelField : {
                dataIndex : 'Name',
                editor    : { xtype : 'textfield' }
            },
            eventRenderer  : function (record) {
                return { cls : 'foo-' + record.getId() }
            }
        });

        t.chain(
            { waitForRowsVisible : gantt },
            { rightClick : '.foo-114' },
            { waitForComponentVisible : menu, desc : 'Context menu showed' },

            function () {
                t.notOk(t.cq1('#editLeftLabel').isDisabled(), 'Left label editing enabled');
                t.ok(t.cq1('#editRightLabel').isDisabled(), 'Right label editing disabled');
                gantt.destroy();
            }
        );
    });

    // ReadOnly #342
    t.it('Task context menu disables corresponding menu entries when task is readonly', function (t) {
        var menu    = new Gnt.plugin.TaskContextMenu(),
            addMenu = menu.query('#addTaskMenu')[0];

        gantt = t.getGantt({
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

        var task = gantt.taskStore.getNodeById(117);
        task.setReadOnly(true);

        t.chain(
            { waitForRowsVisible : gantt },
            { rightClick : '.task-117' },
            { waitForComponentVisible : menu, desc : 'Context menu showed' },

            function (next) {
                t.ok(t.cq1('#deleteTask').isDisabled(), 'Delete task is disabled');
                t.ok(t.cq1('#editRightLabel').isDisabled(), 'Left label editing is disabled');
                t.ok(t.cq1('#toggleMilestone').isDisabled(), 'Toggle Milestone is disabled');
                t.ok(t.cq1('#splitTask').isDisabled(), 'Splitting task is disabled');
                next();
            },
            { moveCursorTo : '>> #addTaskMenu' },
            { waitForComponentVisible : addMenu, desc : 'Add menu showed' },

            function (next) {
                t.notOk(t.cq1('#addTaskAbove').isDisabled(), 'Add task above is enabled');
                t.notOk(t.cq1('#addTaskBelow').isDisabled(), 'Add task below is enabled');
                t.notOk(t.cq1('#addMilestone').isDisabled(), 'Add Milestone is enabled');
                t.ok(t.cq1('#addSubtask').isDisabled(), 'Add subtask is disabled');
                t.notOk(t.cq1('#addSuccessor').isDisabled(), 'Add successor is enabled');
                t.notOk(t.cq1('#addPredecessor').isDisabled(), 'Add successor is enabled');
                next();
            },

            function (next) {
                menu.hide();
                task.parentNode.setReadOnly(true);
                next();
            },

            { rightClick : '.task-117' },
            { waitForComponentVisible : menu, desc : 'Context menu showed' },
            { moveCursorTo : '>> #addTaskMenu' },
            { waitForComponentVisible : addMenu, desc : 'Add menu showed' },

            function (next) {
                t.ok(t.cq1('#addTaskAbove').isDisabled(), 'Add task above is disabled');
                t.ok(t.cq1('#addTaskBelow').isDisabled(), 'Add task below is disabled');
                t.ok(t.cq1('#addSuccessor').isDisabled(), 'Add successor is disabled');
                t.ok(t.cq1('#addPredecessor').isDisabled(), 'Add successor is disabled');
                gantt.destroy();
            }
        );
    });

});
