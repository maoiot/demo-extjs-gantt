StartTest(function (t) {
    var gantt;

    t.beforeEach(function (t, next) {
        gantt && gantt.destroy();

        gantt = t.getGantt({
            renderTo    : Ext.getBody(),
            width       : 400,
            height      : 400,
            selModel    : { type : 'gantt_spreadsheet' },
            columns     : [
                { xtype : 'namecolumn' }
            ]
        });

        t.waitForRowsVisible(gantt, next);
    });

    t.it('Should use wbs column instead of row numberer', function (t) {
        var selModel = gantt.getSelectionModel(),
            selected;

        t.chain(
            { click : function () { return t.getCell(gantt, 1, 0); } },
            function (next) {
                selected = selModel.getSelected();

                t.ok(selected.isRows, 'Row selection is active');
                t.is(selected.getCount(), 1, 'One row selected');
                next();
            },
            {
                drag    : function () { return t.getCell(gantt, 2, 0); },
                to      : function () { return t.getCell(gantt, 4, 0); }
            },
            function () {
                selected = selModel.getSelected();

                t.ok(selected.isRows, 'Row selection is active');
                t.is(selected.getCount(), 3, 'Three rows selected');
            }
        )
    });
});