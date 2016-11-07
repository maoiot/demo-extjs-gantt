StartTest(function (t) {
    var gantt;

    t.beforeEach(function () {
        gantt && gantt.destroy();
    });

    var verifyViewSelection = function (t, selectedCount) {
        var selectedCls = '.' + Ext.grid.View.prototype.selectedCellCls;
        t.selectorCountIs(selectedCls, gantt.lockedGrid.getView(), selectedCount, 'Should be only ' + selectedCount + ' row(s) selected');
    };

    t.it('Cell selection should be intact after indent/outdent', function (t) {
        var selModel, taskStore, view;

        var id = function (id) { return taskStore.getById(id); };

        var validateSelectedCache = function (t) {
            t.notOk(gantt._lastCellSelectedRange, 'Selection cache removed');
            t.notOk(gantt._lastCellSelectedRecords, 'Selection cache removed');
        };

        t.beforeEach(function (t, next) {
            gantt && gantt.destroy();

            gantt = t.getGantt({
                renderTo    : Ext.getBody(),
                selModel    : 'spreadsheet',
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
                            children    : [
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
                                }
                            ]
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

            selModel = gantt.getSelectionModel();
            taskStore = gantt.taskStore;
            view = gantt.lockedGrid.view;

            t.waitForRowsVisible(gantt, next);
        });

        t.it('Indent/outdent to collapsed parent node using model method', function (t) {
            t.chain(
                function (next) {
                    selModel.selectCells([1,4], [1,4]);
                    t.waitForEvent(view, 'refresh', next);
                    id(7).indent();
                },
                function () {
                    verifyViewSelection(t, 1);
                    validateSelectedCache(t);
                    t.isDeeply(selModel.selected.getRange(), [[1,6],[1,6]], 'Correct cell is selected');
                    t.is(view.getNodes().length, 8, 'Task 4 is expanded');
                }
            );
        });

        t.it('Indent/outdent to collapsed parent node using store method', function (t) {
            t.chain(
                function (next) {
                    selModel.selectCells([1,4], [1,4]);
                    t.waitForEvent(view, 'refresh', next);
                    taskStore.indent([id(7)]);
                },
                function () {
                    verifyViewSelection(t, 1);
                    validateSelectedCache(t);
                    t.isDeeply(selModel.selected.getRange(), [[1,6],[1,6]], 'Correct cell is selected');
                    t.is(view.getNodes().length, 8, 'Task 4 is expanded');
                }
            );
        });

        t.it('Indent/outdent to leaf node', function (t) {
            var range = [[1, 1], [3, 2]];

            t.chain(
                function (next) {
                    selModel.selectCells(range[0], range[1]);
                    t.waitForEvent(view, 'refresh', next);
                    id(3).indent();
                },
                function (next) {
                    verifyViewSelection(t, 6);
                    validateSelectedCache(t);
                    t.isDeeply(selModel.getSelected().getRange(), range, 'Same cells selected');
                    t.waitForEvent(view, 'refresh', next);
                    id(3).outdent();
                },
                function (next) {
                    t.isDeeply(selModel.getSelected().getRange(), range, 'Same cells selected');
                    t.waitForEvent(view, 'refresh', next);
                    taskStore.indent([id(2), id(3), id(4)]);
                },
                function (next) {
                    verifyViewSelection(t, 6);
                    validateSelectedCache(t);
                    t.isDeeply(selModel.getSelected().getRange(), range, 'Same cells selected');
                    t.waitForEvent(view, 'refresh', next);
                    taskStore.outdent([id(2), id(3), id(4)]);
                },
                function () {
                    verifyViewSelection(t, 6);
                    validateSelectedCache(t);
                }
            );
        });

        t.it('Expanding middle node should adjust selection', function (t) {
            // Sencha does not support spreadsheet for trees, but we need to fix it for indentation only
            // https://www.sencha.com/forum/showthread.php?309542
            t.chain(
                function (next) {
                    selModel.selectCells([1,2], [1,8]);
                    t.waitForEvent(view, 'refresh', next);
                    id(7).indent();
                },
                function () {
                    verifyViewSelection(t, 2);
                    validateSelectedCache(t);
                    t.isDeeply(selModel.selected.getRange(), [[1,2],[1,3]], 'Cell selection is correct');
                    t.is(view.getNodes().length, 8, 'Task 4 is expanded');
                }
            );
        });
    });
});