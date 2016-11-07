describe('Indent tests', function (t) {

    var g;

    var getFocusedRow = function (gantt, task) {
        window.focus();
        var activeElement = t.activeElement();
        var itemSelector = Gnt.view.Gantt.prototype.itemSelector;
        var focusedEl = Ext.fly(activeElement).up(itemSelector);

        return focusedEl && (focusedEl.dom === gantt.lockedGrid.view.getNode(task) ||
            focusedEl.dom === gantt.normalGrid.view.getNode(task));
    };

    var assertFocusedRow = function (t, gantt, task, title) {
        t.ok(getFocusedRow(gantt, task), title);
    };

    t.beforeEach(function () {
        g && g.destroy();
    });

    t.it('After indent, row selection/focus should be kept', function (t) {

        g = t.getGantt({
            lockedGridConfig : {
                width : 100
            },
            height           : 200,
            renderTo         : Ext.getBody(),
            root             : {
                children : [
                    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                    { Id : 1, leaf : true },
                    { Id : 2, leaf : true }
                ]
            }
        });


        var task2 = g.taskStore.getNodeById(2);
        var vertScroll;
        var lockedView = g.lockedGrid.view;

        t.chain(
            { waitForRowsVisible : g },

            function (next) {
                t.firesOnce(lockedView, 'refresh');

                // Seems focusRow is now async
                t.waitFor(function () {
                    return lockedView.el.dom.scrollTop > 0
                }, next);

                // focusItem is disabled in IE by us
                if (Ext.isIE) {
                    lockedView.scrollBy(0, 1000);
                } else {
                    lockedView.focusRow(task2);
                }
            },

            function (next) {
                vertScroll = lockedView.el.dom.scrollTop;

                // focusItem is disabled in IE by us
                if (!Ext.isIE) {
                    assertFocusedRow(t, g, task2, 'Focus correct after calling focusRow');
                }
                t.waitForEvent(g.taskStore, 'indentationchange', next);
                g.taskStore.indent(task2);
            },

            {
                desc    : 'task2 node got focused',
                waitFor : function () {
                    return Ext.isIE ? true : getFocusedRow(g, task2);
                }
            },

            function (next) {
                // focusItem is disabled in IE by us
                if (!Ext.isIE) {
                    assertFocusedRow(t, g, task2, "Correct row re-focused after indent");
                }

                t.is(lockedView.el.dom.scrollTop, vertScroll, 'Vertical scroll should not change');
            }
        );
    });

    t.it('After outdent, row selection/focus should be kept', function (t) {

        g = t.getGantt({
            lockedGridConfig : {
                width : 100
            },
            height           : 200,
            renderTo         : Ext.getBody(),
            root             : {
                children : [
                    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                    { Id : 1, leaf : true },
                    { Id : 2, leaf : true }
                ]
            }
        });

        var task2 = g.taskStore.getNodeById(2);
        var vertScroll;
        var lockedView = g.lockedGrid.view;

        t.chain(
            { waitForRowsVisible : g },

            function (next) {
                t.firesOnce(lockedView, 'refresh');

                // Seems focusRow is now async
                t.waitFor(function () {
                    return lockedView.el.dom.scrollTop > 0
                }, next);

                // focusItem is disabled in IE by us
                if (Ext.isIE) {
                    lockedView.scrollBy(0, 1000);
                } else {
                    lockedView.focusRow(task2);
                }
            },

            function (next) {
                vertScroll = lockedView.el.dom.scrollTop;
                g.normalGrid.view.focusRow(task2);

                // focusItem is disabled in IE by us
                if (!Ext.isIE) {
                    assertFocusedRow(t, g, task2, "Correct row focused after indent");
                }
                t.waitForEvent(g.taskStore, 'indentationchange', next);
                g.taskStore.outdent(task2);
            },

            function (next) {

                // The Ext JS table panel will focus one of the locked/normal row els
                if (!Ext.isIE) {
                    assertFocusedRow(t, g, task2, "Correct row focused after outdent");
                }

                t.is(lockedView.el.dom.scrollTop, vertScroll, 'Vertical scroll should not change when removing last row');
            }
        );
    });

    t.it('After outdent, row selection/focus should be kept', function (t) {
        var getSelectedRecords = function () {
            var tasks = [];

            var selModel = g.getSelectionModel();

            if (selModel instanceof Ext.grid.selection.SpreadsheetModel) {
                var selected = selModel.getSelected();

                if (selected instanceof Ext.grid.selection.Rows) {
                    tasks = selected.getRecords();
                } else if (selected instanceof Ext.grid.selection.Cells) {
                    selected.eachRow(function (record) {
                        tasks.push(record);
                    });
                }
            } else {
                tasks = selModel.getSelection();
            }
            return tasks;
        };

        var scenario = function (t, selection) {
            g = t.getGantt({
                lockedGridConfig : {
                    width : 100
                },
                selModel         : selection,
                height           : 200,
                renderTo         : Ext.getBody(),
                root             : {
                    children : [
                        { Id : 1, leaf : true },
                        { Id : 2, leaf : true }
                    ]
                }
            });

            var task2 = g.taskStore.getNodeById(2);

            var taskStore = g.taskStore;
            var selModel = g.getSelectionModel();



            var steps = [

                function (next) {
                    t.waitForEvent(taskStore, 'indentationchange', next);
                    task2.indent();
                },
                { waitFor : function () {
                    return getSelectedRecords()[0] == task2;
                } },
                function (next) {
                    t.waitForEvent(taskStore, 'indentationchange', next);
                    task2.outdent();
                },
                { waitFor : function () {
                    return getSelectedRecords()[0] == task2;
                } },

                function (next) {
                    t.waitForEvent(taskStore, 'indentationchange', next);
                    taskStore.indent([task2]);
                },
                { waitFor : function () {
                    return getSelectedRecords()[0] == task2;
                } },
                function (next) {
                    t.waitForEvent(taskStore, 'indentationchange', next);
                    taskStore.outdent([task2]);
                },
                { waitFor : function () {
                    return getSelectedRecords()[0] == task2;
                } }
            ];

            t.chain(
                { waitForRowsVisible : g },
                { click : function () { return t.getCell(g, 1, 0); } },
                selection !== 'spreadsheet' ? steps :
                    [
                        steps,
                        { click : function () { return t.getCell(g, 1, 1); } },
                        steps
                    ]
            );
        };

        t.it('Should keep selection with rowselection model', function (t) {
            scenario(t, 'rowmodel');
        });

        // https://www.assembla.com/spaces/bryntum/tickets/2564
        t.it('Should keep selection with spreadsheet model', function (t) {
            scenario(t, 'spreadsheet');
        });
    });

    t.it('No refreshes should be performed with buffered view when indenting', function (t) {

        g = t.getGantt({
            height   : 200,
            renderTo : Ext.getBody(),
            root     : {
                children : [
                    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                    { Id : 1, leaf : true },
                    { Id : 2, leaf : true },
                    { Id : 3, leaf : true },
                    { Id : 4, leaf : true },
                    { Id : 5, leaf : true },
                    { Id : 6, leaf : true }
                ]
            }
        });

        var id = function (id) {
            return g.taskStore.getNodeById(id);
        };

        t.waitForRowsVisible(g, function () {
            var before          = t.getTotalLayoutCounter();
            var refreshCount    = 0;

            g.getSchedulingView().on('refresh', function() {
                refreshCount++;
            })

            g.taskStore.indent([id(1), id(2), id(3), id(4), id(5), id(6)]);

            t.waitFor(500, function() {
                // We got much more layouts, but no extra refresh anymore.
                // We use suspendLayouts to limit the amount of Ext layouts
                t.isLess(t.getTotalLayoutCounter(), before + 10, 'Should not cause excessive layouts for indent');

                t.isLessOrEqual(refreshCount, 1, 'Should not cause excessive refreshes for indent operation');
            })
        });
    });

    t.it('Should support indent/outdent while filtered - no buffered rendering', function (t) {

        g = t.getGantt({
            renderTo         : Ext.getBody(),
            bufferedRenderer : false,
            taskStore : new Gnt.data.TaskStore({
                root             : {
                    expanded : true,
                    children : [
                        {
                            Id                : 1000,
                            StartDate         : "2010-01-13",
                            EndDate           : "2010-02-13",
                            Name              : "Project A",
                            TaskType          : "Gnt.examples.advanced.model.Project",
                            ManuallyScheduled : true,
                            AllowDependencies : true,
                            expanded          : true,
                            children          : [
                                {
                                    Name     : 'parent 2',
                                    expanded : true,
                                    children : [
                                        {},
                                        {},
                                        {
                                            Id   : 4,
                                            leaf : true,
                                            Name : 'child1'
                                        },
                                        {
                                            leaf : true,
                                            Name : 'child2'
                                        },
                                        {}
                                    ]
                                }
                            ]
                        }
                    ]
                }
            })
        });

        t.waitForRowsVisible(g, function () {
            t.selectorExists('.x-grid-item:nth-child(5):contains(child1)');

            g.taskStore.filterTreeBy(function(node) { return node.getName().match('chil'); });

            t.selectorExists('.x-grid-item:nth-child(3):contains(child1)');

            var refreshCount    = 0;

            g.getSchedulingView().on('refresh', function() {
                refreshCount++;
            })

            g.taskStore.outdent(g.taskStore.getNodeById(4));

            t.selectorExists('.x-grid-item:nth-child(4):contains(child1)');

            t.is(refreshCount, 1, '1 refresh fired');

            // https://www.assembla.com/spaces/bryntum/tickets/2171#/activity/ticket
            t.is(g.lockedGrid.view.getNodes().length, 4, 'Just 4 nodes in the tree');
            t.selectorExists('.x-grid-item:first-child:contains(Project A)');
            t.selectorExists('.x-grid-item:last-child:contains(child1)')
        });
    });

    t.it('Should support indent/outdent while filtered', function (t) {

        g = t.getGantt({
            renderTo         : Ext.getBody(),
            bufferedRenderer : true,
            taskStore        : new Gnt.data.TaskStore({
                root : {
                    expanded : true,
                    children : [
                        {
                            Id                : 1000,
                            StartDate         : "2010-01-13",
                            EndDate           : "2010-02-13",
                            Name              : "Project A",
                            TaskType          : "Gnt.examples.advanced.model.Project",
                            ManuallyScheduled : true,
                            AllowDependencies : true,
                            expanded          : true,
                            children          : [
                                {
                                    Name     : 'parent 2',
                                    expanded : true,
                                    children : [
                                        {},
                                        {},
                                        {},
                                        {
                                            Id   : 4,
                                            leaf : true,
                                            Name : 'child'
                                        },
                                        {
                                            Id   : 5,
                                            leaf : true,
                                            Name : 'child'
                                        },
                                        {
                                            Id   : 6,
                                            leaf : true,
                                            Name : 'child'
                                        },
                                        {
                                            Id   : 7,
                                            leaf : true,
                                            Name : 'chie'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            })
        });

        var refreshCount = 0;

        t.chain(
            { waitForRowsVisible : g },

            function (next) {
                g.taskStore.filterTreeBy(function (node) {
                    return node.getName().match('chil');
                });

                g.getSchedulingView().on('refresh', function () {
                    refreshCount++;
                })

                t.isCalledOnce('filterTreeBy', g.taskStore);

                t.waitForEvent(g.taskStore, 'indentationchange', next);

                g.taskStore.indent([g.taskStore.getNodeById(5), g.taskStore.getNodeById(6), g.taskStore.getNodeById(7)]);
            },

            function (next) {
                t.isLessOrEqual(refreshCount, 2, '1 full, 1 filter-refresh seen');

                t.is(g.lockedGrid.getView().getNodes().length, 5);
                t.selectorExists('.x-grid-item:first-child:contains(Project A)');
                t.selectorExists('.x-grid-item:last-child:contains(child)')
            }
        );
    });

    t.it('Should indent tasks with start-to-end dependencies', function (t) {
        g = t.getGantt({
            renderTo    : Ext.getBody(),
            taskStore   : t.getTaskStore({
                DATA    : [
                    {
                        Id        : 1,
                        StartDate : '2010-01-04',
                        EndDate   : '2010-01-05',
                        expanded  : true,
                        children  : [
                            {
                                Id        : 2,
                                StartDate : '2010-01-04',
                                EndDate   : '2010-01-05',
                                expanded  : true,
                                children  : [
                                    {
                                        Id        : 3,
                                        StartDate : '2010-01-04',
                                        EndDate   : '2010-01-05',
                                        leaf      : true
                                    },
                                    {
                                        Id        : 4,
                                        StartDate : '2010-01-04',
                                        EndDate   : '2010-01-05',
                                        leaf      : true
                                    },
                                    {
                                        Id        : 5,
                                        StartDate : '2010-01-04',
                                        EndDate   : '2010-01-05',
                                        leaf      : true
                                    },
                                    {
                                        Id        : 6,
                                        StartDate : '2010-01-04',
                                        EndDate   : '2010-01-05',
                                        leaf      : true
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }),
            dependencyStore : t.getDependencyStore({
                data    : [
                    { From : 3, To : 4 },
                    { From : 4, To : 5 }
                ]
            })
        });

        t.waitForEventsToRender(g, function () {
            // indent nodes having ids 4,5,6
            g.taskStore.indent(g.taskStore.getRange(3, 5));
        });
    });
});
