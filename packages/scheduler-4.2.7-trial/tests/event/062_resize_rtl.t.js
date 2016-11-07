StartTest(function (t) {

    var scheduler;

    t.beforeEach(function() {
        scheduler && scheduler.destroy();
    })

    t.it('Basic use cases', function (t) {
        scheduler = t.getScheduler({
            renderTo : Ext.getBody(),
            width    : 600,
            height   : 200,
            rtl      : true
        }, 1);

        t.chain(
            //Drag end resize handle bar 100px to the right
            { drag : '.sch-resizable-handle-end', by : [-100, 0] },

            function (next, el) {
                var record = scheduler.eventStore.first();

                t.isGreater(record.getEndDate(), record.modified.EndDate, 'Dragged end-handle, EndDate changed');
            }
        );
    });

    // IE 9.0.8112.16421, update version 9.0.28 and less have rendering bug that doesn't allow siesta
    // to drag '.sch-event' if scheduler configured with viewport plugin, it works with
    // update version 9.0.46 and also works manually. Skipping this test in IE9

    if (Ext.isIE9) {
        return;
    }

    t.it('In viewport', function (t) {

        scheduler = t.getScheduler({
            renderTo : Ext.getBody(),
            width    : 600,
            plugins  : 'viewport',
            height   : 200,
            rtl      : true
        }, 1);

        t.chain(
            //Drag end resize handle bar 100px to the right
            { drag : '.sch-resizable-handle-end', by : [-100, 0] },

            function (next, el) {
                var record = scheduler.eventStore.first();

                t.isGreater(record.getEndDate(), record.modified && record.modified.EndDate, 'Dragged end-handle, EndDate changed');
            }
        );
    });
});