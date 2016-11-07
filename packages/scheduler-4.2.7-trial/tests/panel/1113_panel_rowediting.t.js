StartTest(function(t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    // #2371
    t.it('RowEditing plugin usage does not cause exception', function (t) {
        scheduler = t.getScheduler({
            lockedGridConfig : {
                plugins : 'rowediting'
            },
            renderTo         : Ext.getBody()
        });

        t.chain(
            { waitForRowsVisible : scheduler },
            { click : function () { return t.getCell(scheduler, 0, 0); }, offset : [10, 5] }
        );
    });

    t.it('RowEditing plugin should not throw exception when configured on both grids', function (t) {
        scheduler = t.getScheduler({
            plugins  : 'rowediting',
            renderTo : Ext.getBody()
        });

        t.chain(
            { waitForRowsVisible : scheduler },
            { dblclick : function () { return t.getCell(scheduler, 0, 0); } }
        );
    });
});
