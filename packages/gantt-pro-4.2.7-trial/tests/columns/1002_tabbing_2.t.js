
StartTest(function(t) {

    //======================================================================================================================================================================================================================================================
    t.diag('Setup')

    var editing = Ext.create('Sch.plugin.TreeCellEditing', { clicksToEdit: 1 });

    var g = t.getGantt({
        renderTo : Ext.getBody(),
        plugins  : editing,
        columns  : [
            { xtype : 'treecolumn', hidden : true },
            { xtype : 'enddatecolumn', tdCls : 'end' },
            { xtype : 'durationcolumn', tdCls : 'duration' }
        ]
    });

    t.waitForEventsToRender(g, function () {
        var taskStore    = g.taskStore,
            firstTask    = taskStore.getRootNode().childNodes[ 0 ].childNodes[ 0 ];

        // 2 day duration for this task                 NOTE: Exclusive end date
        firstTask.setStartEndDate(new Date(2010, 1, 8), new Date(2010, 1, 10));

        // Edit end date field, bump it +1 day which changes duration too. Then duration is being edited by the TAB press
        t.chain(
            { clickToEditCell : [g.lockedGrid, 1,  0] },

            function(next) {
                 //NOTE: When editing in the date editor, end dates are Inclusive
                editing.getActiveEditor().field.setValue(new Date(2010, 1, 12));
                next()
            },

            { clickToEditCell : [g.lockedGrid, 1,  1] },

            function(next) {
                t.is(firstTask.getDuration(), 4, 'Duration reflected in task model');
                t.is(editing.getActiveEditor().getValue(), 4, 'Duration editor has updated duration value');
            }
        );
    })
});
