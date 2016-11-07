StartTest(function(t) {

    var gantt;
    var task;
    var editing;

    var isExt6 = Ext.getVersion().getMajor() === 6;

    function setup (config) {
        gantt && gantt.destroy();

        config  = config || {};
        editing = Ext.create('Sch.plugin.TreeCellEditing', { clicksToEdit : 1 });

        gantt = t.getGantt({
            renderTo    : Ext.getBody(),
            taskStore   : new Gnt.data.TaskStore({
                root : {
                    children : [
                        {
                            Id              : 1,
                            leaf            : true,
                            Note            : '<p>Test</p>',
                            StartDate       : new Date(2015, 4, 15, 11),
                            Duration        : 2
                        }
                    ]
                }
            }),
            plugins : editing,
            columns : [
                Ext.apply({
                    xtype : 'notecolumn'
                }, config.column)
            ]
        });

        task    = gantt.getTaskStore().getNodeById(1);
    }

    t.it('Column works properly w/o previewFn provided', function (t) {
        setup();

        var locked = gantt.lockedGrid;

        t.chain(
            { waitForRowsVisible : gantt },
            { waitForGridContent : [locked, 0, 0, 'Test'] },
            { click : '.x-grid-cell' },
            { waitForSelectorAtCursor : 'input' },
            function (next) {
                editing.getActiveEditor().setValue('');

                if (isExt6) {
                    locked.setActionableMode(false);
                } else {
                    editing.completeEdit();
                }

                next();
            },
            { waitForGridContent : [locked, 0, 0, ''] },
            function (next) {
                t.is(task.getNote(), '', 'task value is empty');
                next();
            },
            { click : '.x-grid-cell' },
            { waitForSelectorAtCursor : 'input' },
            function (next) {
                editing.getActiveEditor().setValue('Foo');

                if (isExt6) {
                    locked.setActionableMode(false);
                } else {
                    editing.completeEdit();
                }

                next();
            },
            { waitForGridContent : [locked, 0, 0, 'Foo'] }
        );
    });

    t.it('Column works properly with previewFn provided', function (t) {

        setup({
            column   : {
                previewFn : function (value) {
                    return Ext.isEmpty(value) ? 'empty' : 'notempty';
                }
            }
        });

        var locked = gantt.lockedGrid;

        t.chain(
            { waitForRowsVisible : gantt },
            { waitForGridContent : [locked, 0, 0, 'notempty'] },
            { click : '.x-grid-cell' },
            { waitForSelectorAtCursor : 'input' },
            function (next) {
                editing.getActiveEditor().setValue('');
                t.is(task.getNote(), '<p>Test</p>', 'task still not updated');

                if (isExt6) {
                    locked.setActionableMode(false);
                } else {
                    editing.completeEdit();
                }

                t.is(task.getNote(), '', 'task value is empty');

                next();
            },
            { waitForGridContent : [locked, 0, 0, 'empty'] },
            { click : '.x-grid-cell' },
            { waitForSelectorAtCursor : 'input' },

            function (next) {
                editing.getActiveEditor().setValue('Foo');

                if (isExt6) {
                    locked.setActionableMode(false);
                } else {
                    editing.completeEdit();
                }

                t.is(task.getNote(), 'Foo', 'task value is empty');
                t.matchGridCellContent(locked, 0, 0, 'notempty', 'Column displays "notempty"');
            }
        );
    });
});