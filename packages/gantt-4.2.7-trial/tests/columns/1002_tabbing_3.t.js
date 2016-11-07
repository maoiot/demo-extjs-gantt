StartTest(function (t) {
    var g;

    t.beforeEach(function () {
        g && g.destroy();
    });

    t.it('Editor should process correct task while tabbing', function (t) {
        var editingPlugin = new Sch.plugin.TreeCellEditing({ clicksToEdit : 1 });

        g = t.getGantt({
            renderTo         : Ext.getBody(),
            plugins          : editingPlugin,
            width            : 500,
            lockedGridConfig : {
                width : 400
            },
            columns          : [
                { width : 100, xtype : 'treecolumn', dataIndex : 'Name', field : {} },
                { width : 100, xtype : 'startdatecolumn' },
                { width : 100, xtype : 'enddatecolumn' },
                { width : 100, xtype : 'percentdonecolumn' }
            ],
            taskStore        : t.getTaskStore({
                DATA : [{
                    Id        : 1,
                    Name      : 'Task 1',
                    StartDate : new Date(2010, 0, 3),
                    EndDate   : new Date(2010, 0, 4),
                    leaf      : true
                }, {
                    Id        : 2,
                    Name      : 'Task 2',
                    StartDate : new Date(2010, 0, 5),
                    EndDate   : new Date(2010, 0, 6),
                    leaf      : true
                }]
            })
        });

        var task    = g.taskStore.getById(1);
        var counter = 0;

        var rowListeners = editingPlugin.on({
            // Ext 5+ fires beforeedit on new editor before edit on old, in 6.0.2 they restored old behavior and
            // beforeedit fires after edit on previous
            beforeedit  : function () {
                ++counter;
            },
            edit        : function (plugin, context) {
                // do not run this assertion for IE10 and less due to CellEditor patch and 6.0.2+
                if (!(Ext.isIE10m || Ext.getVersion().isGreaterThan('6.0.2'))) {
                    t.is(counter, 2, 'beforeedit for new editor is fired before edit on previous');
                }
                --counter;
                t.is(context.record, task, 'Task is correct in context');
                t.is(context.column.getEditor().task, task, 'Task is correct on field instance');
            },
            destroyable : true
        });

        t.chain(
            { waitForEventsToRender : g },
            {
                click : function () {
                    return t.getCell(g.lockedGrid, 0, 1);
                }
            },
            // tab between row editors
            { type : '[TAB]', target : '.x-field-form-focus' },
            { type : '[TAB]', target : '.x-field-form-focus' },

            function (next) {
                rowListeners.destroy();
                counter      = 0;
                rowListeners = editingPlugin.on({
                    beforeedit  : function (plugin, context) {
                        ++counter;
                        t.is(context.record, g.taskStore.getById(2), 'Task is correct in context');
                    },
                    edit        : function (plugin, context) {
                        t.is(counter, 0, 'beforeedit for new editor in new row is fired after edit on previous row');
                        t.is(context.record, task, 'Task is correct in context');
                    },
                    destroyable : true
                });
                t.diag('Leaving row');
                next();
            },
            // row is changed
            { type : '[TAB]' },
            function (next) {
                rowListeners.destroy();
                next();
            }
        )
    });


    // https://www.assembla.com/spaces/bryntum/tickets/2699-tab-after-edit-duration-creates-new-empty-row--should-focus-next-cell--%28siesta-test-inside%29/details#

    // Fixed for Ext JS 6.0.1 which has a very different cell editing implementation
    if (Ext.versions.extjs.isGreaterThan('6.0.1')) {

        t.it("Extra row after edit + TAB", function (t) {

            var crudManager = new Gnt.data.CrudManager({
                transport : {
                    load : {
                        method : 'GET',
                        url    : 'data/bigdataset2.js'
                    }
                },

                /**
                 * Creates a critical line dependency between all leafs
                 * @param callback
                 */
                createDependencies : function (callback) {
                    var tasks = this.getTaskStore(),
                        ds    = this.getDependencyStore(),
                        arr   = [],
                        next;

                    tasks.getRoot().cascadeBy(function (entry) {
                        if (entry.isLeaf()) {
                            next = this.getNextLeaf(entry);
                            if (next) {
                                arr.push({
                                    From : entry.getId(),
                                    To   : next.getId()
                                })
                            }
                        }
                    }, this);

                    ds.add(arr);
                    ds.commitChanges();
                    callback();
                },

                /**
                 * Returns the provided tasks next sibling even if it is on another parent node.
                 */
                getNextLeaf        : function (task) {
                    var nextTask = task.nextSibling;
                    if (nextTask) {
                        return nextTask;
                    }
                    var section = task.parentNode.nextSibling;
                    while (nextTask === null && section !== null) {
                        nextTask = section.firstChild;
                        section  = section.nextSibling
                    }
                    return nextTask
                }
            });

            g = new Gnt.panel.Gantt({
                renderTo       : Ext.getBody(),
                plugins        : [
                    'viewport',
                    'scheduler_treecellediting'
                ],
                crudManager    : crudManager,
                columns        : [
                    {
                        xtype : 'durationcolumn'
                    },
                    {
                        xtype : 'startdatecolumn',
                        tdCls : 'startcell'
                    }
                ]
            });

            crudManager.getTaskStore().on('load', function () {
                crudManager.createDependencies(function () {
                    g.expandAll();
                });
            }, this);

            crudManager.load();

            var record;

            var editEventFired = false;

            g.on('edit', function (editor, context) {
                if (context.field === 'StartDate' && context.rowIdx === 1) {
                    editEventFired = true;
                }
            });

            t.chain(
                { waitForSelector : '.sch-dependency', timeout : 20000 },

                { dblclick : "ganttpanel treepanel => table.x-grid-item:nth-child(2) .x-grid-cell:nth-child(1)", offset : [30, 15], desc : 'Cell clicked' },

                { setValue : 100, target : '>>editor durationfield', desc : 'Duration set to 100' },

                { action : "type", text : "[TAB]", desc : 'TAB key was typed' },

                {
                    waitFor : function () {
                        // After tabbing editor is restored and then collapsed again because focus goes to body.
                        // Reproducible in IE11 emulating IE9 (when tabbing in iframe), and almost not reproducible
                        // in native IE9.
                        return editEventFired || t.$('.startcell input:focus').length > 0;
                    }
                },

                function (next) {
                    var scrollable = g.lockedGrid.view.getScrollable();
                    scrollable.scrollTo(null, scrollable.getMaxPosition().y);

                    record = g.taskStore.getById('83281175');
                    g.lockedGrid.ensureVisible(record, { callback : next });
                    //t.waitFor(function () {
                    //    return scrollable.getPosition().y === scrollable.getMaxPosition().y;
                    //}, next);
                },

                { dblclick : function () {
                    return g.lockedGrid.view.getCell(record, 0);
                }},

                { setValue : 11, target : '>>editor durationfield', desc : 'Duration set to 11' },

                { action : "type", text : "[TAB]", desc : 'TAB key was typed' },

                { waitForSelector : '.startcell input:focus', desc : 'Start Date editor showed up' },

                function () {
                    t.is(record.getDuration(), 11, 'Duration is correct');
                }
            );
        });
    }
});