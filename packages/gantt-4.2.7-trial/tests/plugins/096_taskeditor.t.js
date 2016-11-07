StartTest(function (t) {

    var gantt;

    t.beforeEach(function () {
        gantt && gantt.destroy();
    });

    //ticket #2173
    t.it('Task editor should fire events', function (t) {
        var taskEditor = new Gnt.plugin.TaskEditor();

        var Ext = t.getExt();

        gantt = t.getGantt2({
            renderTo      : Ext.getBody(),
            resourceStore : t.getResourceStore(),
            forceFit      : true,
            plugins       : taskEditor
        });

        var taskStore = gantt.getTaskStore();
        var task      = taskStore.getNodeById(117);

        t.firesOk({
            observable : taskEditor,
            events     : {
                show             : 1,
                loadtask         : 1,
                beforeupdatetask : 1,
                afterupdatetask  : 1,
                validate         : 1
            }
        });

        t.chain(
            { waitForTasksAndDependenciesToRender : gantt },

            function (next) {
                t.doubleClick(gantt.getSchedulingView().getElementFromEventRecord(task), next);
            },

            { waitForComponentVisible : taskEditor },

            function () {
                var durationField = taskEditor.down('[$className=Gnt.field.Duration]');
                durationField.setValue({ value : 7, unit : 'd' });
                taskEditor.completeEditing();
            }
        );
    });

    t.it('Task editor assertions', function (t) {
        var taskEditor = new Gnt.plugin.TaskEditor();

        var Ext = t.getExt();

        gantt = t.getGantt2({
            renderTo      : Ext.getBody(),
            resourceStore : t.getResourceStore(),
            forceFit      : true,
            plugins       : taskEditor
        });

        var taskStore = gantt.getTaskStore();
        var task      = taskStore.getNodeById(117);

        var newTask = new Gnt.model.Task({
            Name        : 'Phantom task',
            PercentDone : 30,
            StartDate   : new Date(2010, 1, 1),
            EndDate     : new Date(2010, 1, 7),
            leaf        : true
        });

        task.addTaskAbove(newTask);

        var startDateField, durationField;

        t.chain(
            { waitForTasksAndDependenciesToRender : gantt },

            function (next) {
                t.doubleClick(gantt.getSchedulingView().getElementFromEventRecord(task), next);
            },

            { waitForComponentVisible : taskEditor },

            function (next) {
                startDateField = taskEditor.down('[$className=Gnt.field.StartDate]');
                durationField  = taskEditor.down('[$className=Gnt.field.Duration]');

                t.diag('Change start date & duration');

                startDateField.setValue(new Date(2010, 1, 1));
                durationField.setValue({ value : 7, unit : 'd' });
                taskEditor.completeEditing();

                t.is(task.getStartDate(), new Date(2010, 1, 1), 'Start date changed');
                t.is(task.getDuration(), 7, 'Duration changed');
                t.is(task.getDurationUnit(), 'd', 'Duration unit is right');

                next();
            },

            function (next) {
                t.diag('Edit phantom task');
                t.doubleClick(gantt.getSchedulingView().getElementFromEventRecord(newTask), next);
            },

            { waitForComponentVisible : taskEditor },

            function (next) {
                var percentField = taskEditor.down('[$className=Gnt.field.Percent]');
                var endDateField = taskEditor.down('[$className=Gnt.field.EndDate]');

                t.is(startDateField.getRawValue(), '02/01/2010', 'Correct start date');
                t.is(endDateField.getRawValue(), '02/06/2010', 'Correct end date');
                t.is(percentField.getValue(), 30, 'Correct percent completion value');

                t.diag('Change start date & duration');

                startDateField.setValue(new Date(2010, 1, 3));
                durationField.setValue({ value : 7, unit : 'd' });

                next();
            },

            function (next) {
                var assignmentGrid = taskEditor.down('[$className=Gnt.widget.AssignmentEditGrid]');

                t.is(assignmentGrid.taskId, newTask.getId(), 'Assignment grid got phantom task id');

                taskEditor.completeEditing();

                t.is(newTask.getStartDate(), new Date(2010, 1, 3), 'Start date changed');
                t.is(newTask.getDuration(), 7, 'Duration changed');
                t.is(newTask.getDurationUnit(), 'd', 'Duration unit is right');

                next();
            },
            function (next) {
                t.diag('Hide nodes');
                t.doubleClick(gantt.getSchedulingView().getElementFromEventRecord(task), next);
            },
            { waitForComponentVisible : taskEditor },
            function (next) {
                taskEditor.taskEditor.setActiveTab(1);
                // have to render combobox to fill store
                taskEditor.taskEditor.dependencyGrid.insertDependency();
                next();
            },
            function (next) {
                var store = taskEditor.taskEditor.dependencyGrid.tasksCombo.getStore();

                t.ok(store.getById(120), 'Record #120 is in combo');
                t.ok(store.getById(121), 'Record #121 is in combo');

                taskStore.hideNodesBy(function (node) {
                    return node.get('Id') == 120 || node.get('Id') == 121;
                });

                next();
            },
            { waitFor : 100 },
            function () {
                var store = taskEditor.taskEditor.dependencyGrid.tasksCombo.getStore();

                t.notOk(store.getById(120), 'Record #120 is NOT in combo');
                t.notOk(store.getById(121), 'Record #121 is NOT in combo');
            }
        );
    });

    t.it('Dependency grid shows task IDs', function (t) {

        var taskEditor = new Gnt.plugin.TaskEditor();

        gantt = t.getGantt2({
            title         : 'ID',
            renderTo      : Ext.getBody(),
            resourceStore : t.getResourceStore(),
            forceFit      : true,
            plugins       : taskEditor
        });

        var task = gantt.taskStore.getNodeById(115),
            grid,
            store;

        t.chain(
            { waitForTasksAndDependenciesToRender : gantt },

            function (next) {
                t.doubleClick(gantt.getSchedulingView().getElementFromEventRecord(task), next);
            },
            { waitForComponentVisible : taskEditor },
            function () {
                taskEditor.taskEditor.setActiveTab(1);
                grid  = taskEditor.taskEditor.dependencyGrid;
                grid.insertDependency();
                store = grid.tasksCombo.getStore();

                for (var i = 0; i < store.getCount(); i++) {
                    var record = store.getAt(i);
                    grid.tasksCombo.select(record);
                    grid.setActionableMode(false);

                    t.matchGridCellContent(grid, 0, 0, record.getId(), 'Rendered value is correct');
                    grid.insertDependency();
                }
            }
        );
    });

    t.it('Dependency grid shows task sequence numbers', function (t) {

        var taskEditor = new Gnt.plugin.TaskEditor({
            dependencyGridConfig : { useSequenceNumber : true }
        });

        gantt = t.getGantt2({
            title         : 'SN',
            renderTo      : Ext.getBody(),
            resourceStore : t.getResourceStore(),
            forceFit      : true,
            plugins       : taskEditor
        });

        var task = gantt.taskStore.getNodeById(115),
            grid,
            store;

        t.chain(
            { waitForTasksAndDependenciesToRender : gantt },

            function (next) {
                t.doubleClick(gantt.getSchedulingView().getElementFromEventRecord(task), next);
            },

            { waitForComponentVisible : taskEditor },

            function () {
                taskEditor.taskEditor.setActiveTab(1);
                grid  = taskEditor.taskEditor.dependencyGrid;
                grid.insertDependency();
                store = grid.tasksCombo.getStore();

                for (var i = 0; i < store.getCount(); i++) {
                    var record = store.getAt(i);
                    grid.tasksCombo.select(record);
                    grid.setActionableMode(false);

                    t.matchGridCellContent(grid, 0, 0, record.originalRecord.getSequenceNumber(), 'Rendered value is correct');
                    grid.insertDependency();
                }
            }
        );
    });

    t.it('ReadOnly field should set readonly mode', function (t) {

        var taskEditor = new Gnt.plugin.TaskEditor({});

        gantt = t.getGantt2({
            title         : 'SN',
            renderTo      : Ext.getBody(),
            resourceStore : t.getResourceStore(),
            forceFit      : true,
            plugins       : taskEditor
        });

        var task = gantt.taskStore.getNodeById(115);

        function assertReadOnlyFields(tab, value, query, exclude) {

            t.diag(tab.title);

            var items = tab.query(query);

            Ext.Array.forEach(items, function (field) {
                var assertValue = Ext.Array.contains(exclude || [], field.name) ? !value : value;
                t.is(field.readOnly, assertValue, field.getName() + ' readonly ' + assertValue);
            });
        }

        t.chain(
            { waitForTasksAndDependenciesToRender : gantt },

            function (next) {
                t.doubleClick(gantt.getSchedulingView().getElementFromEventRecord(task), next);
            },

            { waitForComponentVisible : taskEditor },

            function (next) {

                var tab = taskEditor.taskEditor.setActiveTab(3);

                //make sure these field were readonly before
                assertReadOnlyFields(tab, false, 'field', ['wbsCode', task.calendarIdField]);

                next();
            },

            function (next) {

                var tab           = taskEditor.taskEditor.setActiveTab(3);
                var readOnlyField = tab.down('readonlyfield');

                readOnlyField.setValue(true);

                assertReadOnlyFields(tab, true, 'field', [readOnlyField.name]);

                tab = taskEditor.taskEditor.setActiveTab(4);
                assertReadOnlyFields(tab, true, 'htmleditor');

                tab = taskEditor.taskEditor.setActiveTab(0);
                assertReadOnlyFields(tab, true, 'field');

                tab = taskEditor.taskEditor.setActiveTab(1);
                t.is(tab.down('toolbar').isVisible(), false, 'Predecessor buttons not visible');

                tab = taskEditor.taskEditor.setActiveTab(2);
                t.is(tab.down('toolbar').isVisible(), false, 'Assignment buttons not visible');

                next();
            },

            function () {

                var tab           = taskEditor.taskEditor.setActiveTab(3);
                var readOnlyField = tab.down('readonlyfield');

                readOnlyField.setValue(false);

                assertReadOnlyFields(tab, false, 'field', ['wbsCode', task.calendarIdField]);

                tab = taskEditor.taskEditor.setActiveTab(4);
                assertReadOnlyFields(tab, false, 'htmleditor');

                tab = taskEditor.taskEditor.setActiveTab(0);
                assertReadOnlyFields(tab, false, 'field');

                tab = taskEditor.taskEditor.setActiveTab(1);
                t.is(tab.down('toolbar').isVisible(), true, 'Predecessor buttons are visible');

                tab = taskEditor.taskEditor.setActiveTab(2);
                t.is(tab.down('toolbar').isVisible(), true, 'Assignment buttons are visible');
            }
        );
    });

    //ticket #2357
    t.it('Dependency grid in successor mode', function (t) {

        var taskStore  = new Gnt.data.TaskStore({
            dependencyStore : new Gnt.data.DependencyStore({
                data : [{From : 1, To : 2}]
            }),
            root : {
                children : [
                    { Id : 1,  Name : 'One' },
                    { Id : 2,  Name : 'Two' }
                ]
            }
        });

        var task             = taskStore.getNodeById(1);
        var taskEditorPlugin = new Gnt.plugin.TaskEditor({
            taskStore            : t.getTaskStore(),
            task                 : task,
            dependencyGridConfig : {
                direction : 'successors'
            }
        });

        gantt = t.getGantt2({
            renderTo      : Ext.getBody(),
            forceFit      : true,
            plugins       : taskEditorPlugin
        });

        var depGrid = taskEditorPlugin.down('dependencygrid');

        taskEditorPlugin.show();
        taskEditorPlugin.down('taskeditor').setActiveItem(depGrid);

        t.is(depGrid.title, 'Successors');

        t.chain(
            { waitForSelector : '.gnt-dependencygrid .x-grid-cell-inner:textEquals(2)' }
        );
    });

    t.it('Dependency grid should insert dependency', function (t) {
        var taskEditor = new Gnt.plugin.TaskEditor();

        gantt = t.getGantt2({
            title         : 'ID',
            renderTo      : Ext.getBody(),
            resourceStore : t.getResourceStore(),
            forceFit      : true,
            plugins       : taskEditor
        });

        var task = gantt.taskStore.getNodeById(115),
            grid;

        t.chain(
            { waitForTasksAndDependenciesToRender : gantt },

            function (next) {
                t.doubleClick(gantt.getSchedulingView().getElementFromEventRecord(task), next);
            },
            { waitForComponentVisible : taskEditor },
            function (next) {
                taskEditor.taskEditor.setActiveTab(1);
                grid  = taskEditor.taskEditor.dependencyGrid;
                grid.insertDependency();
                next();
            },
            { type : '[DOWN][ENTER][ENTER]' },
            function () {
                t.notOk(grid.cellEditing.getActiveEditor(), 'No visible editors');
                t.notOk(grid.actionableMode, 'Actionable mode disabled on grid');
                t.notOk(grid.view.actionableMode, 'Actionable mode disabled on view');
            }
        );
    });

    t.it('editBaseline config should work', function (t) {

        function scenario(t, editBaseline) {
            gantt = t.getGantt({
                renderTo        : Ext.getBody(),
                baselineVisible : true,
                taskStore       : t.getTaskStore({
                    DATA : [
                        {
                            Id                : 1,
                            StartDate         : '2010-01-05',
                            Duration          : 1,
                            BaselineStartDate : '2010-01-06',
                            BaselineEndDate   : '2010-01-07',
                            leaf              : true
                        },
                        {
                            Id                : 2,
                            StartDate         : '2010-01-05',
                            Duration          : 1,
                            BaselineStartDate : '2010-01-06',
                            BaselineEndDate   : '2010-01-07',
                            Cls               : 'task2',
                            leaf              : true
                        }
                    ]
                }),
                width   : 400,
                columns : [{ xtype : 'namecolumn' }],
                plugins : [{
                    ptype           : 'gantt_taskeditor',
                    taskFormConfig  : {
                        showBaseline        : true,
                        editBaseline        : editBaseline,
                        baselineStartConfig : {
                            itemId : 'bstart'
                        },
                        baselineFinishConfig : {
                            itemId : 'bfinish'
                        },
                        baselinePercentDoneConfig : {
                            itemId : 'bpercentdone'
                        }
                    }
                }]
            });

            function assertFields(next) {
                t.is(t.cq1('#bstart').readOnly, !editBaseline, 'BaselineStartDate readOnly is ok');
                t.is(t.cq1('#bfinish').readOnly, !editBaseline, 'BaselineEndDate readOnly is ok');
                t.is(t.cq1('#bpercentdone').readOnly, !editBaseline, 'BaselinePercentDone readOnly is ok');

                next();
            }

            t.chain(
                { dblclick : '.sch-gantt-item' },

                assertFields,

                { click : '>>button[text=Cancel]' },
                { dblclick : '.task2' },

                assertFields
            )
        }

        t.it('editBaseline false works ok', function (t) {
            scenario(t, false);
        });

        t.it('editBaseline true works ok', function (t) {
            scenario(t, true);
        });
    });

    t.it('Task editor should allow custom user warning', function (t) {

        function showSimpleMessage(taskeditor, proceedCallback) {
            var me = this;

            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function (buttonId) {
                if (buttonId == 'yes') {
                    proceedCallback();
                    me.hide();
                }
            });

            return false;
        }

        var win;

        function showComplexMessage() {
            win = new Ext.window.Window({
                title  : 'test',
                width  : 100,
                height : 100
            }).show();

            return false;
        }

        function scenario(t, target) {
            t.chain(
                { waitForEventsToRender : gantt },

                // start edit, enter invalid data, try to save, cancel
                { dblclick : '.sch-gantt-task-bar' },
                { click : "enddatefield => .x-form-trigger" },
                { click : ".x-datepicker-date:textEquals(1)" },
                { click : '>>#teOkBtn' },
                function (next) {
                    t.ok(Ext.Msg.isVisible(), 'Ext.Msg is visible');
                    t.is(Ext.Msg.getTitle(), 'Information', 'Window title is correct');
                    next();
                },
                { click : '>>#ok' },
                { click : '>>button[text=Cancel]', desc : 'Close task editor' },

                // now show simple user-provided warning
                { dblclick : '.sch-gantt-task-bar' },
                function (next) {
                    target.on('beforeupdatetask', showSimpleMessage);
                    next();
                },
                { click : '>>#teOkBtn' },
                function (next) {
                    t.ok(Ext.Msg.isVisible(), 'Ext.Msg is visible');
                    t.is(Ext.Msg.getTitle(), 'Confirm', 'Window title is correct');

                    // drop listener
                    target.un('beforeupdatetask', showSimpleMessage);
                    next();
                },
                { click : '>>#no' },
                { click : '>>button[text=Cancel]', desc : 'Close task editor' },

                // show complex user-provided warning
                { dblclick : '.sch-gantt-task-bar' },
                function (next) {
                    gantt.taskEditor.showErrorMessage = Ext.emptyFn;
                    target.on('beforeupdatetask', showComplexMessage);
                    next();
                },
                { click : '>>#teOkBtn' },

                function (next) {
                    target.un('beforeupdatetask', showComplexMessage);
                    delete gantt.taskEditor.showErrorMessage;

                    t.notOk(Ext.Msg.isVisible(), 'Default confirmation is not visible');
                    t.is(Ext.WindowManager.getActive().getTitle(), 'test', 'Window title is correct');
                    win.close();
                }
            );
        }

        t.it('Should work ok when listeners bound to plugin', function (t) {
            gantt = t.getGantt2({
                renderTo    : Ext.getBody(),
                startDate   : new Date(2010, 1, 1),
                plugins     : [{
                    ptype   : 'gantt_taskeditor',
                    pluginId: 'taskeditor'
                }]
            });

            scenario(t, gantt.getPlugin('taskeditor'));
        });

        t.it('Should work ok when listeners bound to widget', function (t) {
            gantt = t.getGantt2({
                renderTo    : Ext.getBody(),
                startDate   : new Date(2010, 1, 1),
                plugins     : [{
                    ptype   : 'gantt_taskeditor',
                    pluginId: 'taskeditor'
                }]
            });

            var plugin = gantt.getPlugin('taskeditor');

            scenario(t, plugin.taskEditor);
        });
    });
});
