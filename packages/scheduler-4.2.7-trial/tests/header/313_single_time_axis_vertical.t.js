StartTest(function(t) {

    t.it('Double clicking any time vertical header row should fire an event', function (t) {
        var scheduler = t.getScheduler({
            orientation     : 'vertical',
            bbar            : [{
                xtype   : 'button',
                text    : 'horizontal',
                handler : function () {
                    scheduler.setMode('horizontal')
                }
            }],
            renderTo        : Ext.getBody()
        });

        t.willFireNTimes(scheduler, 'timeheaderdblclick', 3);

        t.chain(
            function (next) {
                scheduler.on('timeheaderdblclick', function(sender, start, end, rowIndex, e) {
                    t.ok(sender instanceof Ext.grid.GridPanel, 'Time column is lockedGrid ok');
                    t.isDateEqual(start, new Date(2011, 0, 3), 'StartDate ok');
                    t.isDateEqual(end, new Date(2011, 0, 4), 'EndDate ok');
                    t.is(rowIndex, 0, 'We have clicked on the cell in first row');
                    t.ok(e.getTarget, 'e ok');

                }, null, { single : true });

                next();
            },
            { dblclick : '.x-grid-inner-locked .x-grid-cell-inner' },
            function (next) {
                t.diag('Changing orientation to horizontal');
                t.waitForEvent(scheduler.normalGrid.view, 'refresh', next);
                scheduler.setOrientation('horizontal');
            },
            function (next) {
                scheduler.on('timeheaderdblclick', function(sender, start, end, rowIndex, e) {
                    t.ok(sender instanceof Sch.view.HorizontalTimeAxis, 'Row header type ok');
                }, null, { single : true, delay : 10 });
                // we need a delay here, because our "dblclick" listener is attached to the timeaxis column's "el"
                // and as of 4.2.1 ExtJS also attaches "dblclick" on the "titleEl"
                // so w/o delay, our listener is processed first, switches orientation/destroys the column
                // and Sencha's listener is in inconsistent state
                next();
            },
            { dblclick : '.x-grid-inner-locked .x-grid-cell-inner' },
            { dblclick : '.sch-simple-timeheader' },

            function (next) {
                t.diag('Changing orientation to vertical, doing dblclick again');
                t.waitForEvent(scheduler.normalGrid.view, 'refresh', next);
                scheduler.setOrientation('vertical');
            },
            function (next) {
                scheduler.on('timeheaderdblclick', function(sender, start, end, rowIndex, e) {
                    t.ok(sender instanceof Ext.grid.GridPanel, 'Time column is lockedGrid ok');
                    t.isDateEqual(start, new Date(2011, 0, 3), 'StartDate ok');
                    t.isDateEqual(end, new Date(2011, 0, 4), 'EndDate ok');
                    t.is(rowIndex, 0, 'We have clicked on the cell in first row');
                    t.ok(e.getTarget, 'e ok');
                }, null, { single : true });
                next();
            },
            { dblclick : '.x-grid-inner-locked .x-grid-cell-inner' }
        )
    });
});
