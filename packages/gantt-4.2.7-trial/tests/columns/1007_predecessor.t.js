StartTest(function(t) {

    var editing         = Ext.create('Sch.plugin.TreeCellEditing');
    var startDate       = new Date(2013, 0, 1)
    var DATE            = Sch.util.Date;

    var g               = t.getGantt({
        renderTo    : Ext.getBody(),

        startDate   : startDate,
        endDate     : DATE.add(startDate, DATE.WEEK, 10),

        columns     : [
            {
                xtype       : 'treecolumn',
                dataIndex   : 'Id'
            },
            {
                xtype       : 'predecessorcolumn'
            }
        ],
        plugins     : editing,
        taskStore   : new Gnt.data.TaskStore({
            proxy       : {
                type        : 'memory',
                data        : [
                    { Id : 1, Name : 'Foo', StartDate : startDate, Duration : 10, leaf : true },
                    { Id : 2, Name : 'Bar', StartDate : startDate, Duration : 10, leaf : true },
                    { Id : 3, Name : 'Baz', StartDate : startDate, Duration : 10, leaf : true }
                ]
            }
        }),

        dependencyStore : new Gnt.data.DependencyStore({ data : [
            {
                From   : 1,
                To     : 3,
                Type   : 3
            },
            {
                From   : 2,
                To     : 3,
                Type   : 3
            }
        ]})
    });

    var editor;

    t.chain(
        { waitForSelector : '.sch-dependency-arrow' },

        function (next) {
            t.selectorCountIs('.sch-dependency-arrow', 2, 'Should find 2 dependencies rendered');

            editing.startEditByPosition({ row : 2, column : 1 });

            t.waitForSelector('.gnt-field-dependency', next);
        },

        function (next) {
            editor = editing.getActiveEditor();
            editor.setValue('1FF');
            g.lockedGrid.setActionableMode(false);

            next()
        },

        // the dependency DOM elements are removed with animations - need to wait for `selectorCountIs` to be correct
        { waitForAnimations : [] },

        function (next) {
            editing.startEditByPosition({ row : 2, column : 1 });

            t.waitForComponentVisible(editor, next);
        },

        function (next) {
            t.selectorCountIs('.sch-dependency-arrow', 1, 'Should find 1 FF dependency rendered');

            editor.setValue('');
            editing.completeEdit();
            next();
        },

        {
            waitForSelectorNotFound : '.sch-dependency-arrow',
            desc                    : 'No dependencies rendered after clearing editor'
        }
    )
});
