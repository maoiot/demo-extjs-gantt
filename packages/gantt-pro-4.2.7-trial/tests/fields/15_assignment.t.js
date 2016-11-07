StartTest(function (t) {
    var gantt;

    t.beforeEach(function (t, next) {
        gantt && gantt.destroy();

        gantt = t.getGantt({
            renderTo    : Ext.getBody(),
            taskStore   : t.getTaskStore({
                DATA    : [{ Id : 1, leaf : true }],
                resourceStore   : t.getResourceStore()
            }),
            plugins     : {
                ptype   : 'scheduler_treecellediting',
                clicksToEdit : 1
            },
            columns     : [{ xtype : 'resourceassignmentcolumn' }]
        });

        t.waitForRowsVisible(gantt, next);
    });

    t.it('Should focus assignment grid on editing start', function (t) {
        t.chain(
            { click : function () { return t.getCell(gantt, 0, 0); }},
            { type : '[DOWN]' },
            function () {
                var grid = t.cq1('assignmentgrid');

                var position = grid.view.navigationModel.getPosition();
                t.is(position.colIdx, 0, 'Column is correct');
                t.is(position.rowIdx, 1, 'Row is correct');
            }
        )
    });
});