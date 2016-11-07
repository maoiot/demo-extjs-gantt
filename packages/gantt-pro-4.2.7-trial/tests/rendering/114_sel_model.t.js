StartTest(function(t) {
    var gantt;

    t.beforeEach(function () {
        gantt && gantt.destroy();
    });

    var verifyRowSelection = function (t, count) {
        var cls = '.' + Ext.grid.View.prototype.selectedItemCls;
        t.selectorCountIs(cls, gantt.getSchedulingView(), count, 'Should be only ' + count + ' row(s) selected');
        t.selectorCountIs(cls, gantt.lockedGrid.getView(), count, 'Should be only ' + count + ' row(s) selected');
    };

    var verifyCellSelection = function (t, count) {
        var view = gantt.lockedGrid.getView();
        t.selectorCountIs('.' + view.selectedCellCls, view, count, 'Should be only ' + count + ' cell(s) selected');
    };

    t.it('Selection should remain when record is added', function (t) {
        gantt = t.getGantt({
            renderTo    : Ext.getBody()
        });

        t.waitForEventsToRender(gantt, function () {
            var taskStore       = gantt.taskStore;
            var task117         = taskStore.getNodeById('117');

            gantt.getSelectionModel().select(task117);

            // insert task above
            task117.parentNode.insertBefore({
                Id          : '1000',
                leaf        : true,
                StartDate   : new Date(2010, 1, 2),
                EndDate     : new Date(2010, 1, 4)
            }, task117);

            // see #123
            verifyRowSelection(t, 1);
        });
    });

    t.it('Selection should remain when selected record is removed', function (t) {
        var scenario = function (t, method) {
            gantt = t.getGantt({
                renderTo        : Ext.getBody(),
                keepSelection   : true,
                selModel        : 'spreadsheet',
                taskStore       : t.getTaskStore({
                    DATA : [
                        {
                            StartDate   : new Date(2010, 0, 5),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 1,
                            Name        : 1,
                            leaf        : true
                        },
                        {
                            StartDate   : new Date(2010, 0, 5),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 2,
                            Name        : 2,
                            leaf        : true
                        },
                        {
                            StartDate   : new Date(2010, 0, 5),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 3,
                            Name        : 3,
                            leaf        : true
                        },
                        {
                            StartDate   : new Date(2010, 0, 5),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 4,
                            Name        : 4,
                            leaf        : true
                        },
                        {
                            StartDate   : new Date(2010, 0, 5),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 5,
                            Name        : 5,
                            leaf        : true
                        },
                        {
                            StartDate   : new Date(2010, 0, 5),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 6,
                            Name        : 6,
                            leaf        : true
                        },
                        {
                            StartDate   : new Date(2010, 0, 5),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 7,
                            Name        : 7,
                            leaf        : true
                        },
                        {
                            StartDate   : new Date(2010, 0, 5),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 8,
                            Name        : 8,
                            leaf        : true
                        }
                    ]
                })
            });

            var taskStore = gantt.taskStore;

            var id = function (id) { return taskStore.getById(id); };

            var selModel = gantt.getSelectionModel();

            t.chain(
                { waitForEventsToRender : gantt },
                // cells
                { click : function () { return t.getCell(gantt, 1, 1); } },
                function (next) {
                    taskStore[method](id(2));
                    t.isDeeply(selModel.getSelected().getRange(), [[1,1],[1,1]], 'Correct range selected');
                    verifyCellSelection(t, 1);
                    next();
                },
                { click : function () { return t.getCell(gantt, 6, 1); } },
                function (next) {
                    taskStore[method](id(8));
                    t.isDeeply(selModel.getSelected().getRange(), [[1,5],[1,5]], 'Correct range selected');
                    verifyCellSelection(t, 1);
                    next();
                },
                {
                    drag : function () { return t.getCell(gantt, 0, 1); },
                    to : function () { return t.getCell(gantt, 5, 1); },
                    desc : 'Select cells in first column'
                },
                function (next) {
                    // remove pre-last task
                    taskStore[method](id(6));
                    t.isDeeply(selModel.getSelected().getRange(), [[1,0],[1,4]], 'Correct range selected');
                    verifyCellSelection(t, 5);
                    next();
                },
                // rows
                { click : function () { return t.getCell(gantt, 1, 0); } },
                function (next) {
                    taskStore[method](id(3));
                    t.is(selModel.getSelection()[0].getId(), 4, 'Correct task selected');
                    verifyRowSelection(t, 1);
                    next();
                },
                { click : function () { return t.getCell(gantt, 3, 0); } },
                function (next) {
                    taskStore[method](id(7));
                    verifyRowSelection(t, 1);
                    next();
                },
                {
                    drag : function () { return t.getCell(gantt, 0, 0); },
                    to : function () { return t.getCell(gantt, 2, 0); },
                    desc : 'Select cells in first column'
                },
                function () {
                    // remove pre-last task
                    taskStore[method](id(5));
                    t.is(selModel.getSelection()[0].getId(), 1, 'Correct task selected');
                    t.is(selModel.getSelection()[1].getId(), 4, 'Correct task selected');
                    verifyRowSelection(t, 2);
                }
            );
        };

        t.it('Selection should not be cleared using remove method', function (t) {
            scenario(t, 'remove');
        });

        t.it('Selection should not be cleared using removeTasks method', function (t) {
            scenario(t, 'removeTasks');
        });

        t.it('Should select nothing after remove if nothing was selected', function (t) {
            gantt = t.getGantt({
                renderTo        : Ext.getBody(),
                keepSelection   : true,
                selModel        : 'spreadsheet',
                taskStore       : t.getTaskStore({
                    DATA : [
                        {
                            StartDate   : new Date(2010, 0, 5),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 1,
                            Name        : 1,
                            leaf        : true
                        },
                        {
                            StartDate   : new Date(2010, 0, 5),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 2,
                            Name        : 2,
                            leaf        : true
                        },
                        {
                            StartDate   : new Date(2010, 0, 5),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 3,
                            Name        : 3,
                            leaf        : true
                        }
                    ]
                })
            });

            var selModel = gantt.getSelectionModel();
            var taskStore = gantt.taskStore;
            var id = function (id) { return taskStore.getById(id); };

            t.chain(
                { waitForRowsVisible : gantt },
                function () {
                    taskStore.remove(id(2));
                    t.notOk(selModel.getSelected(), 'Nothing is selected after remove');

                    taskStore.removeTasks(id(3));
                    t.notOk(selModel.getSelected(), 'Nothing is selected after removeTasks');
                }
            );
        });
    });

    t.it('Should change selection on node collapse', function (t) {
        gantt = t.getGantt({
            renderTo    : Ext.getBody(),
            selModel    : 'spreadsheet',
            keepSelection : true,
            taskStore   : t.getTaskStore({
                DATA : [
                    {
                        StartDate   : new Date(2010, 0, 5),
                        EndDate     : new Date(2010, 0, 7),
                        Id          : 1,
                        Name        : 1,
                        leaf        : true
                    },
                    {
                        StartDate   : new Date(2010, 0, 5),
                        EndDate     : new Date(2010, 0, 7),
                        Id          : 2,
                        Name        : 2,
                        expanded    : true,
                        children    : [
                            {
                                StartDate   : new Date(2010, 0, 5),
                                EndDate     : new Date(2010, 0, 7),
                                Id          : 3,
                                Name        : 3,
                                leaf        : true
                            },
                            {
                                StartDate   : new Date(2010, 0, 5),
                                EndDate     : new Date(2010, 0, 7),
                                Id          : 4,
                                Name        : 4,
                                leaf        : true
                            }
                        ]
                    },
                    {
                        StartDate   : new Date(2010, 0, 5),
                        EndDate     : new Date(2010, 0, 7),
                        Id          : 5,
                        Name        : 5,
                        leaf        : true
                    }
                ]
            })
        });

        var selModel = gantt.getSelectionModel();

        t.chain(
            { waitForRowsVisible : gantt },
            function (next) {
                selModel.selectCells([1,2],[1,2]);
                next();
            },
            { click : ".sch-gantt-parent-cell .x-tree-elbow-img" },
            function () {
                var selected = selModel.getSelected();
                t.isDeeply(selected.getRange(), [[1,1],[1,1]], 'Correct cell is selected');
            }
        )
    });

    t.it('Should delete records correctly if nothing selected', function (t) {
        var scenario = function (t, method) {
            gantt = t.getGantt({
                renderTo        : Ext.getBody(),
                keepSelection   : true,
                selModel        : 'spreadsheet',
                taskStore       : t.getTaskStore({
                    DATA : [
                        {
                            StartDate   : new Date(2010, 0, 5),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 1,
                            Name        : 1,
                            leaf        : true
                        },
                        {
                            StartDate   : new Date(2010, 0, 5),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 2,
                            Name        : 2,
                            leaf        : true
                        },
                        {
                            StartDate   : new Date(2010, 0, 5),
                            EndDate     : new Date(2010, 0, 7),
                            Id          : 3,
                            Name        : 3,
                            leaf        : true
                        }
                    ]
                })
            });

            var taskStore = gantt.taskStore;
            var selModel = gantt.getSelectionModel();

            t.chain(
                { waitForRowsVisible : gantt },
                { click : function () { return t.getCell(gantt, 1, 0); } },
                function (next) {
                    selModel.deselectAll();

                    t.livesOk(function () {
                        taskStore[method](taskStore.getById(2));
                    });
                    next();
                },
                { click : function () { return t.getCell(gantt, 1, 1); } },
                function (next) {
                    selModel.deselectAll();

                    t.livesOk(function () {
                        taskStore[method](taskStore.getById(3));
                    });
                    next();
                }
            );
        };

        t.it('Should delete using "remove" method', function (t) {
            scenario(t, 'remove');
        });

        t.it('Should delete using "removeTasks" method', function (t) {
            scenario(t, 'removeTasks');
        });
    });
});