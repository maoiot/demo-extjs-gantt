StartTest(function(t) {
    var g;

    t.beforeEach(function () {
        g && g.destroy();
    });

    t.it('Should edit cell', function (t) {
        var ed = Ext.create('Sch.plugin.TreeCellEditing', { clicksToEdit: 1 });

        g = t.getGantt({
            viewPreset      : 'weekAndDayLetter',
            renderTo        : Ext.getBody(),
            plugins         : ed,
            columns         : [
                {
                    xtype       : 'namecolumn',
                    width       : 100,
                    editor      : {}
                },
                {
                    xtype : 'durationcolumn'
                }
            ]
        });

        var editor = g.lockedGrid.headerCt.getHeaderAtIndex(0).getEditor();

        var editorElXY, record;

        t.chain(
            { waitForEventsToRender : g },

            { click : Ext.grid.View.prototype.itemSelector + ':nth-child(2) .x-grid-cell' },

            { waitForComponentVisible : editor },

            function (next) {
                record      = g.taskStore.getRoot().firstChild.firstChild;

                editorElXY  = editor.el.getXY();

                // Make sure the editor is visible
                t.elementIsTopElement(editor.el, true, 'Editor visible after cell click');

                // Now we call refreshSize() which eventually flushes layouts
                g.lockedGrid.getView().refreshSize();

                next();
            },

            { waitFor : 500 },

            function (next) {
                t.elementIsAt(editor.el.dom, editorElXY, 'Editor kept its position after layouts flushing');

                editor.setValue('foo');

                ed.completeEdit();

                t.is(record.getName(), 'foo', 'Could edit name and update value');

                g.setReadOnly(true);

                next();
            },

            { click : Ext.grid.View.prototype.itemSelector + ':nth-child(2) .x-grid-cell' },
            { waitFor : 500 },

            function () {
                t.elementIsNotVisible(editor.el, 'Editor is not displayed. ReadOnly working for locked grid.');
            }
        );
    });

    t.it('Should edit segmented task correctly', function (t) {
        var ed = Ext.create('Sch.plugin.TreeCellEditing', { clicksToEdit: 1 });

        g = t.getGantt({
            renderTo        : Ext.getBody(),
            plugins         : ed,
            startDate       : new Date(2010, 1, 1),
            columns         : [
                { xtype   : 'enddatecolumn' },
                { xtype   : 'durationcolumn' }
            ],
            taskStore       : t.getTaskStore({
                DATA : [{
                    "Id"                : 1,
                    "leaf"              : true,
                    "Name"              : "Investigate",
                    "PercentDone"       : 50,
                    "StartDate"         : "2010-02-01",
                    "Segments"          : [
                        {
                            "Id"                : 1,
                            "StartDate"         : "2010-02-01",
                            "Duration"          : 1
                        },
                        {
                            "Id"                : 2,
                            "StartDate"         : "2010-02-03",
                            "Duration"          : 2
                        }
                    ]
                }]
            })
        });

        var task = g.taskStore.getNodeById(1);

        t.chain(
            { waitForEventsToRender : g },
            { click : Ext.grid.View.prototype.itemSelector + ':nth-child(1) .x-grid-cell' },
            { waitForCQVisible : 'enddatefield' },
            // clicking on view does not stop editing in 5.1.2, click on header
            // https://www.sencha.com/forum/showthread.php?308045-Container-click-will-not-stop-editing
            { click : '.sch-column-header' },
            function (next) {
                t.notOk(task.dirty, 'Task should not be dirty');
                t.ok(Ext.Object.isEmpty(task.modified), 'Task has no modified fields');
                task.reject();
                next();
            },
            { click : Ext.grid.View.prototype.itemSelector + ':nth-child(1) .x-grid-cell:nth-child(2)' },
            { waitForCQVisible : 'durationfield' },
            { click : '.sch-column-header' },
            function (next) {
                t.notOk(task.dirty, 'Task should not be dirty');
                t.ok(Ext.Object.isEmpty(task.modified), 'Task has no modified fields');
                task.reject();
                next();
            }
        );
    });

    // test for https://www.assembla.com/spaces/bryntum/tickets/2716
    t.it('Should not loose focus after editing', function (t) {
        if (Ext.isIE10) {
            // In IE10 focus is incorrect in iframe after editing is done.
            // Popup doesn't work either (probably due to quirks mode)
            // https://www.assembla.com/spaces/bryntum/tickets/2783-popup-window-opens-in-quirks-mode
            return;
        }
        g = t.getGantt({
            renderTo        : Ext.getBody(),
            plugins         : 'scheduler_treecellediting',
            columns         : [{
                xtype       : 'namecolumn',
                width       : 100,
                editor      : 'textfield'
            }]
        });

        t.chain(
            { waitForEventsToRender : g },
            { click : function () { return t.getCell(g, 1, 0); } },
            { type : '[ENTER]' },
            { waitForSelectorAtCursor : 'input:focus' },
            { type : 'name[ENTER][ENTER]' },
            { waitForSelectorAtCursor : 'input:focus' },
            function () {
                t.pass('Editing is restarted');
            }
        );
    });

    // TODO: get rid of the following condition after 6.0.1 support is dropped
    // fixed for 6.0.1 only (by copying setPosition() from 6.0.2, see Sch.patches.NavigationModel)
    // fixing this is 6.0.0 is much more complicated
    if (Ext.getVersion().isGreaterThan('6.0.1')) {
        t.it('Should start editing after click in normal view', function (t) {
            g = t.getGantt({
                renderTo  : Ext.getBody(),
                plugins   : {
                    ptype        : 'scheduler_treecellediting',
                    clicksToEdit : 1
                },
                startDate : new Date(2010, 1, 1),
                columns   : [
                    { xtype : 'namecolumn' }
                ],
                taskStore : t.getTaskStore({
                    DATA : [
                        {
                            "Id"        : 1,
                            "leaf"      : true,
                            "StartDate" : "2010-02-01"
                        },
                        {
                            "Id"        : 2,
                            "leaf"      : true,
                            "StartDate" : "2010-02-01"
                        }
                    ]
                })
            });

            t.chain(
                { waitForEventsToRender: g },
                {
                    click : function () {
                        return t.getCell(g, 0, 0);
                    },
                    desc  : 'Click to start edit'
                },
                {
                    click : '.sch-gantt-item',
                    desc  : 'Click in normal view to stop editing'
                },
                {
                    click : function () {
                        return t.getCell(g, 0, 0);
                    },
                    desc  : 'Click to start edit again'
                },
                {
                    waitForSelector : 'input:focus',
                    desc            : 'editor showed up'
                }
            )
        });
    }
});
