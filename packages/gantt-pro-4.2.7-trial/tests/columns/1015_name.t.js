StartTest(function(t) {

    var gantt = t.getGantt({
        renderTo    : Ext.getBody(),
        taskStore   : t.getTaskStore({
            DATA    : [
                { Id : 3, leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1 },
                { Id : 4, leaf : false, StartDate : new Date(2010, 1, 1), Duration : 1 }
            ]
        }),

        columns : [
            {
                xtype       : 'namecolumn'
            }
        ]
    });


    t.chain(
        { waitForRowsVisible : gantt },

        function () {
            t.hasNotCls(gantt.lockedGrid.view.getCellByPosition({ row : 0, column : 0 }), 'sch-gantt-parent-cell');
            t.hasCls(gantt.lockedGrid.view.getCellByPosition({ row : 1, column : 0 }), 'sch-gantt-parent-cell');
        }
    );
});
