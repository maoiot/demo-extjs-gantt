StartTest(function(t) {

    var g = t.getGantt({
        height      : 200,
        startDate   : null,
        endDate     : null,
        renderTo    : Ext.getBody(),
        taskStore   : t.getTaskStore({
            DATA : [
                {
                    Id              : 1,
                    leaf            : true,
                    StartDate       : new Date(2015, 7, 3),
                    Duration        : 2,
                    ShowInTimeline  : true
                },
                {
                    Id              : 2,
                    leaf            : true,
                    StartDate       : new Date(2015, 7, 6),
                    Duration        : 2
                }
            ]
        }),
        columns : [{
            xtype : 'showintimelinecolumn'
        }]
    });

    var taskStore = g.getTaskStore();

    t.waitForRowsVisible(g, function () {

        var locked = g.lockedGrid;

        t.matchGridCellContent(locked, 0, 0, 'checked', 'Column displays correct value');
        t.ok(t.getCell(locked, 1, 0).child('div').dom.innerHTML.indexOf('checked') == -1, 'Column displays correct value');

        t.chain(
            { click : '.x-grid-item:nth-child(1) .x-grid-cell:nth-child(1)' },

            function (next) {
                t.notOk(taskStore.getNodeById(1).getShowInTimeline(), 'task #1: ShowInTimeline false');
                t.notOk(taskStore.getNodeById(2).getShowInTimeline(), 'task #2: ShowInTimeline false');

                t.ok(t.getCell(locked, 0, 0).child('div').dom.innerHTML.indexOf('checked') == -1, 'Column displays correct value');
                t.ok(t.getCell(locked, 1, 0).child('div').dom.innerHTML.indexOf('checked') == -1, 'Column displays correct value');

                next();
            },

            { click : '.x-grid-item:nth-child(2) .x-grid-cell:nth-child(1)' },

            function (next) {
                t.notOk(taskStore.getNodeById(1).getShowInTimeline(), 'task #1: ShowInTimeline false');
                t.ok(taskStore.getNodeById(2).getShowInTimeline(), 'task #2: ShowInTimeline true');

                t.ok(t.getCell(locked, 0, 0).child('div').dom.innerHTML.indexOf('checked') == -1, 'Column displays correct value');
                t.matchGridCellContent(locked, 1, 0, 'checked', 'Column displays correct value');
                next();
            }
        );

    });
});
