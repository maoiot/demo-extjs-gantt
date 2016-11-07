StartTest(function (t) {

    var scheduler;

    function doTest(t, config) {
        config = config || {};

        scheduler && scheduler.destroy();

        scheduler = t[config.tree ? "getSchedulerTree" : "getScheduler"](Ext.apply({
            renderTo   : Ext.getBody(),
            viewPreset : 'dayAndWeek',
            width      : 500,
            height     : 100,
            columns    : [
                { text : 'Name', sortable : true, width : 100, dataIndex : 'Name' },
                { text : 'Foo', sortable : true, width : 200, dataIndex : 'Foo' },
                { text : 'Bar', sortable : true, width : 50, dataIndex : 'Bar' }
            ]
        }, config));

        t.chain(
            { waitForRowsVisible : scheduler },

            function (next) {
                // Make sure things work as expected after a view change
                scheduler.switchViewPreset('monthAndYear', new Date(2010, 0, 1), new Date(2010, 2, 1));

                // by default we expect 4 "columnresize" : two resize that we explicitly do by dragging and two of the timeaxis column caused by normal grid resize
                t.willFireNTimes(scheduler, 'columnresize', 2, 'columnresize event should bubble');

                next();
            },
            {
                drag   : '>>[text=Foo]',
                offset : [0, 10],
                by     : [50, 0]
            },
            function (next) {
                t.isApprox(t.cq1('[text=Name]').getWidth(), 150, 1, 'Column correctly resized 1st time');
                next();
            },
            {
                // we can't start drag from exactly the same point where previous drag has stopped
                // (bug or "feature" in Ext?) so we need to move cursor on additional 1px
                drag   : '>>[text=Foo]',
                offset : [0, 11],
                by     : [-50, 0]
            },
            function () {
                t.isApprox(t.cq1('[text=Name]').getWidth(), 100, 1, 'Column correctly resized 2nd time');
            }
        );
    }

    t.it('Plain scheduler grid', doTest);

    t.it('Scheduler tree', function (t) {
        doTest(t, { tree : true });
    });

    t.it('Scheduler tree fixed locked width', function (t) {
        doTest(t, {
            // two "columnresize" events expected since locked grid size stays the same and no normal grid resize happen
            columnresizeNumber : 2,
            tree               : true,
            layout             : 'border',
            lockedGridConfig   : {
                width : 300
            }
        });
    })
});
