StartTest(function (t) {
    var gantt, i;

    var verifySelected = function (t, startCell, endCell) {
        var selected = gantt.selModel.getSelected();
        t.is(selected.startCell.rowIdx, startCell[0], 'Start cell row index is correct');
        t.is(selected.startCell.colIdx, startCell[1], 'Start cell column index is correct');

        t.is(selected.endCell.rowIdx, endCell[0], 'End cell row index is correct');
        t.is(selected.endCell.colIdx, endCell[1], 'End cell column index is correct');
    };

    t.beforeEach(function () {
        gantt && gantt.destroy();
    });

    t.it('Should disable treeviewdragdrop plugin', function (t) {
        gantt = t.getGantt({
            renderTo    : Ext.getBody(),
            selModel    : 'spreadsheet'
        });

        t.chain(
            { waitForEventsToRender : gantt },
            { click : function () {
                return t.getCell(gantt, 1, 2);
            }},
            { waitForElementTop : '.x-ssm-extender-drag-handle' },
            { moveMouseTo : function () {
                return t.getCell(gantt, 3, 4);
            }},
            function (next) {
                t.selectorCountIs('.x-grid-cell-selected', 1, 'Only 1 cell is selected visually');

                var selected = gantt.selModel.getSelected();
                t.isDeeply(selected.startCell, selected.endCell, '1 cell is returned by selection model');

                next();
            },
            { drag : function () {
                return t.getCell(gantt, 3, 4);
            }, to : function () {
                return t.getCell(gantt, 1, 2);
            }},
            function () {
                t.selectorCountIs('.x-grid-cell-selected', 9, '9 cells are selected visually');

                verifySelected(t, [3, 4], [1, 2]);
            }
        );
    });

    t.it('Task context menu should work with spreadsheet model', function (t) {
        gantt = t.getGantt({
            renderTo    : Ext.getBody(),
            plugins     : ['gantt_taskcontextmenu'],
            selModel    : 'spreadsheet'
        });

        var origCount = gantt.store.getCount();

        t.chain(
            { waitForEventsToRender : gantt },
            { drag : function () {
                return t.getCell(gantt, 2, 4);
            }, to : function () {
                return t.getCell(gantt, 0, 2);
            }},
            { rightclick : function () {
                return t.getCell(gantt, 0, 2);
            }},
            { click : '#deleteTask => .x-menu-item-text' },
            function (next) {
                t.is(gantt.lockedGrid.view.getNodes().length, origCount-3, '3 records deleted');
                next();
            },
            { click : function () {
                return t.getCell(gantt, 2, 0);
            }},
            { rightclick : function () {
                return t.getCell(gantt, 2, 0);
            }},
            { click : '#deleteTask => .x-menu-item-text' }
        )
    });

    t.it('Should constrain spreadsheet model only to locked grid', function (t) {
        gantt = t.getGantt({
            renderTo    : Ext.getBody(),
            selModel    : 'spreadsheet'
        });

        t.chain(
            { waitForEventsToRender : gantt },
            { drag : function () {
                return t.getCell(gantt, 2, 4);
            }, to : function () {
                return t.getRow(gantt.normalGrid, 2);
            }, dragOnly : true, toOffset : [10, 10] },
            { moveMouseTo : function () {
                return t.getRow(gantt.normalGrid, 5);
            }, offset : [10, 10] },
            function (next) {
                t.selectorCountIs('.x-grid-cell-selected', 1, '1 cell is selected visually');

                verifySelected(t, [2, 4], [2, 4]);
                next();
            },
            { moveMouseTo : function () {
                return t.getCell(gantt, 5, 4);
            }},
            function (next) {
                t.selectorCountIs('.x-grid-cell-selected', 4, '4 cells are selected visually');

                verifySelected(t, [2, 4], [5, 4]);
                next();
            },
            { action : 'mouseUp' },
            { waitForElementTop : '.x-ssm-extender-drag-handle' }
        )
    });

    t.it('Should not start selection in normal view', function (t) {
        gantt = t.getGantt({
            renderTo    : Ext.getBody(),
            selModel    : 'spreadsheet'
        });

        t.chain(
            { waitForEventsToRender : gantt },
            { drag : function () {
                return t.getRow(gantt.normalGrid, 2);
            }, to : function () {
                return t.getRow(gantt.normalGrid, 5);
            }, fromOffset : [10, 10], toOffset : [10, 10], dragOnly : true },
            function (next) {
                t.selectorNotExists('.x-grid-cell-selected', 'No cells selected');
                t.notOk(gantt.selModel.getSelected(), 'Selection is empty');
                next();
            },
            { moveMouseTo : function () {
                return t.getCell(gantt.lockedGrid, 5, 4);
            }},
            function (next) {
                t.selectorNotExists('.x-grid-cell-selected', 'No cells selected');
                t.notOk(gantt.selModel.getSelected(), 'Selection is empty');
                next();
            },
            { action : 'mouseUp' }
        )
    });

    t.it('Selection extender should not allow to select cells in normal view', function (t) {
        gantt = t.getGantt({
            renderTo    : Ext.getBody(),
            selModel    : 'spreadsheet'
        });

        t.chain(
            { waitForEventsToRender : gantt },
            { click : function () {
                return t.getCell(gantt, 2, 3);
            }},
            { drag : '.x-ssm-extender-drag-handle', by : [200, 0] },
            function () {
                verifySelected(t, [2, 3], [2, 4]);
            }
        )
    });

    t.it('Selection replicator should copy dependencies and assignments', function (t) {
        gantt = t.getGantt({
            renderTo    : Ext.getBody(),
            selModel    : 'spreadsheet',
            plugins     : ['gantt_selectionreplicator'],
            taskStore   : t.getTaskStore({
                DATA    : [
                    {
                        Id                  : 1,
                        Name                : 'New task 1',
                        StartDate           : '2010-01-20',
                        Duration            : 10,
                        leaf                : true
                    },
                    {
                        Id                  : 2,
                        Name                : 'New task 2',
                        StartDate           : '2010-01-20',
                        Duration            : 10,
                        leaf                : true
                    },
                    {
                        Id                  : 3,
                        Name                : 'New task 3',
                        StartDate           : '2010-01-20',
                        Duration            : 10,
                        leaf                : true
                    },
                    {
                        Id                  : 4,
                        Name                : 'New task 4',
                        StartDate           : '2010-01-20',
                        Duration            : 10,
                        leaf                : true
                    }
                ]
            }),
            dependencyStore : t.getDependencyStore({
                data    : [
                    { From : 1, To : 3 },
                    { From : 3, To : 4 }
                ]
            }),
            resourceStore : t.getResourceStore({
                data    : [
                    { Id : 1, Name : '1' },
                    { Id : 2, Name : '2' }
                ]
            }),
            assignmentStore : t.getAssignmentStore({
                data    : [
                    { ResourceId : 1, TaskId : 1 },
                    { ResourceId : 2, TaskId : 1 }
                ]
            }),
            columns     : [
                { xtype : 'predecessorcolumn' },
                { xtype : 'successorcolumn' },
                { xtype : 'resourceassignmentcolumn' }
            ]
        });

        t.chain(
            { waitForEventsToRender : gantt },
            { click : ".sch-assignment-cell" },

            { drag : ".x-ssm-extender-drag-handle", by : [0, 42] },

            // check if assignments are copied
            function (next) {
                var task1 = gantt.taskStore.getById(1);
                var task2 = gantt.taskStore.getById(2);
                var task3 = gantt.taskStore.getById(3);

                var assignments1 = task1.getAssignments();
                var assignments2 = task2.getAssignments();
                var assignments3 = task3.getAssignments();

                t.is(assignments2.length, assignments1.length, 'Correct amount of assignments');
                t.is(assignments3.length, assignments1.length, 'Correct amount of assignments');
                t.is(gantt.assignmentStore.getCount(), 6, 'total 4 assignments found');

                for (i = 0; i < assignments1.length; i++) {
                    t.is(assignments2[i].getResourceId(), assignments1[i].getResourceId(), 'Resource is ok');
                    t.is(assignments2[i].getUnits(), assignments1[i].getUnits(), 'Units are ok');

                    t.is(assignments3[i].getResourceId(), assignments1[i].getResourceId(), 'Resource is ok');
                    t.is(assignments3[i].getUnits(), assignments1[i].getUnits(), 'Units are ok');
                }
                next();
            },

            { drag : function () {
                return t.getCell(gantt, 2, 1);
            }, to : function () {
                return t.getCell(gantt, 2, 2);
            }},

            { drag : ".x-ssm-extender-drag-handle", by : [0, -42] },

            // check if invalid dep is not copied
            function () {
                var task1 = gantt.taskStore.getById(1);
                var task2 = gantt.taskStore.getById(2);
                var task3 = gantt.taskStore.getById(3);
                var task4 = gantt.taskStore.getById(4);

                t.isDeeply(task1.getSuccessors(), [task3, task2], 'First task has correct successors');
                t.isDeeply(task4.getPredecessors(), [task3, task2], 'Last task has correct predecessors');
            }
        )
    });

    t.it('Should ignore certain columns when replicating multiple rows', function (t) {
        gantt = t.getGantt({
            columns : [
                { width : 80, xtype : 'startdatecolumn' },
                { width : 80, xtype : 'baselinestartdatecolumn' },
                { width : 80, xtype : 'durationcolumn' },
                { width : 80, xtype : 'constrainttypecolumn' },
                { width : 80, xtype : 'percentdonecolumn' },
                { width : 80, xtype : 'predecessorcolumn' },
                { width : 80, xtype : 'successorcolumn' },
                { width : 80, xtype : 'resourceassignmentcolumn' },
                { width : 80, xtype : 'schedulingmodecolumn' }
            ],
            renderTo : Ext.getBody(),
            lockedGridConfig : {
                width : 900
            },
            selModel    : 'spreadsheet',
            plugins     : ['gantt_selectionreplicator'],
            taskStore   : t.getTaskStore({
                data    : [
                    {
                        BaselineEndDate     : '2010-02-01',
                        Id                  : 1,
                        leaf                : true,
                        Name                : 'New task 1',
                        Resizable           : false,
                        PercentDone         : 50,
                        StartDate           : '2010-01-18',
                        BaselineStartDate   : '2010-01-25',
                        Duration            : 10,
                        ConstraintDate      : '2010-01-18',
                        CalendarId          : 'testcal',
                        Note                : 'Should be copied',
                        // this field wouldn't be copied because respective column lacks dataIndex
                        //ManuallyScheduled   : true,
                        SchedulingMode      : 'FixedDuration',
                        Rollup              : true
                        // checkboxes are not copied by clipboard I guess we shouldn't do that either
                        //ShowInTimeline      : true
                    },
                    {
                        BaselineEndDate     : '2010-02-04',
                        Id                  : 2,
                        leaf                : true,
                        Name                : 'New task 2',
                        Resizable           : false,
                        PercentDone         : 60,
                        StartDate           : '2010-01-19',
                        BaselineStartDate   : '2010-01-26',
                        Duration            : 12,
                        ConstraintDate      : '2010-01-19',
                        CalendarId          : 'testcal',
                        Note                : 'Should be copied',
                        // this field wouldn't be copied because respective column lacks dataIndex
                        //ManuallyScheduled   : true,
                        SchedulingMode      : 'FixedDuration',
                        Rollup              : true
                        // checkboxes are not copied by clipboard I guess we shouldn't do that either
                        //ShowInTimeline      : true
                    },
                    {
                        Id                  : 3,
                        Name                : 'New task 2',
                        StartDate           : '2010-01-01',
                        Duration            : 10,
                        leaf                : true
                    },
                    {
                        Id                  : 4,
                        Name                : 'New task 2',
                        StartDate           : '2010-01-01',
                        Duration            : 10,
                        leaf                : true
                    },
                    {
                        Id                  : 5,
                        Name                : 'New task 2',
                        StartDate           : '2010-01-01',
                        Duration            : 10,
                        leaf                : true
                    }
                ]
            }),
            dependencyStore : t.getDependencyStore({
                data : [
                    { From : 4, To : 1 },
                    { From : 1, To : 5 },
                    { From : 4, To : 2 },
                    { From : 2, To : 5 }
                ]
            }),
            resourceStore : t.getResourceStore(),
            assignmentStore : t.getAssignmentStore({
                data : [
                    { TaskId : 1, ResourceId : 'r1' },
                    { TaskId : 2, ResourceId : 'r1' }
                ]
            })
        });

        t.chain(
            { waitForEventsToRender : gantt },
            { drag : function () {
                return t.getCell(gantt, 0, 1);
            }, to : function () {
                return t.getCell(gantt, 1, 9);
            }},
            { drag : '.x-ssm-extender-drag-handle', by : [0, 21] },
            function (next) {
                var task = gantt.taskStore.getById(3);

                t.is(task.getStartDate(), new Date(2010, 0, 20), 'Start date is correct');
                t.is(task.getBaselineStartDate(), new Date(2010, 0, 27), 'Baseline start date is correct');
                t.is(task.getDuration(), 14, 'Duration is correct');
                t.is(task.getConstraintType(), '', 'Constraint not changed');
                t.is(task.getPercentDone(), 70, 'Percent done is correct');

                t.notOk(task.getPredecessors().length, 'No predecessors copied');
                t.notOk(task.getSuccessors().length, 'No successors copied');
                t.notOk(task.getResources().length, 'No resource assignments copied');

                t.is(task.getSchedulingMode(), 'Normal', 'Scheduling mode is correct');
                next();
            }
        )
    });

    t.it('Should fire selection change events when keeping selection', function (t) {
        var scenario = function (t, method) {
            gantt = t.getGantt({
                renderTo    : Ext.getBody(),
                selModel    : 'spreadsheet',
                keepSelection   : true,
                taskStore   : t.getTaskStore({
                    DATA : [
                        {
                            StartDate   : new Date(2010, 0, 6),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 1,
                            Name        : 1,
                            leaf        : true
                        },
                        {
                            StartDate   : new Date(2010, 0, 6),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 2,
                            Name        : 2,
                            leaf        : true
                        },
                        {
                            StartDate   : new Date(2010, 0, 6),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 3,
                            Name        : 3,
                            leaf        : true
                        },
                        {
                            StartDate   : new Date(2010, 0, 6),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 4,
                            Name        : 4,
                            leaf        : true
                        }
                    ]
                })
            });

            var taskStore = gantt.taskStore;
            var selModel = gantt.getSelectionModel();

            var isExt60 = Ext.getVersion().equals('6.0.0.640');

            t.chain(
                { waitForRowsVisible : gantt },
                function (next) {
                    selModel.selectCells([1,1],[1,1]);
                    t.firesOk({
                        observable : gantt,
                        // removeTasks will trigger additional selectionchange event
                        events : { selectionchange : (method === 'remove' && !isExt60) ? 1 : 2 },
                        during : function () {
                            taskStore[method](taskStore.getById(2));
                        }
                    });

                    var record = taskStore.getById(3);
                    selModel.selectRows(record);

                    t.firesOk({
                        observable : gantt,
                        events : { selectionchange : method === 'remove' ? 1 : 2 },
                        during : function () {
                            taskStore[method](record);
                        }
                    });
                }
            )
        };

        t.it('Should fire when using remove method', function (t) {
            scenario(t, 'remove');
        });

        t.it('Should fire when using removeTasks method', function (t) {
            scenario(t, 'removeTasks');
        });
    });
});