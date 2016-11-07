StartTest(function (t) {

    var scheduler,
        top = 0, left = 0;

    var setup = function () {
        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            eventRenderer : function (item, r, tplData, row) {
                tplData.cls = "event-" + item.getId();
                return item.get('Name');
            },
            listeners : {
                dragcreateend : function (scheduler, newEventRecord) {
                    newEventRecord.setId('foo');
                }
            }
        });
    };

    var storeAnchorPosition = function (next, t) {
        t.waitForElementVisible('.x-tip-anchor.x-tip-anchor-bottom', function (anchor) {
            top = anchor.style.top;
            left = anchor.style.left;
            next();
        });
    };

    var assertAnchorPosition =  function (next, t) {
        t.waitForElementVisible('.x-tip-anchor.x-tip-anchor-bottom', function (anchor) {
            t.is(anchor.style.top, top, 'Anchor top is correct');
            t.is(anchor.style.left, left, 'Anchor left is correct');
            next();
        });
    };

    t.afterEach(function (t) {

        scheduler && scheduler.destroy();
        top = left = 0;

    });

    t.it('Assert dragtip', function (t) {

        setup();

        t.chain(
            {waitForEventsToRender : scheduler},
            {
                drag : '.event-2',
                by : [-200, 0],
                dragOnly : true
            },
            function (next) {
                storeAnchorPosition(next, t);
            },
            {
                action : 'mouseUp'
            },
            // the following commented action was used as a workaround for #2346
            // (which seems to be not reproducible anymore)
            // remove it after the test become stable
            //{ moveMouseTo : '.event-1' },
            {
                drag : '.event-2',
                by : [20, 0],
                dragOnly : true
            },
            function (next) {
                assertAnchorPosition(next, t);
            },
            {
                action : 'mouseUp'
            }
        );
    });

    t.it('Assert createtip', function (t) {

        setup();

        t.chain(
            { waitForEventsToRender : scheduler},
            {
                drag : scheduler.normalGrid.view,
                fromOffset : [2, 50],
                by : [50, 0],
                dragOnly : true
            },
            function (next) {
                storeAnchorPosition(next, t)
            },
            {
                action : 'mouseUp'
            },
            function (next) {
                var eventStore = scheduler.eventStore;
                eventStore.remove(eventStore.getById('foo'));
                next();
            },
            {
                drag : scheduler.normalGrid.view,
                fromOffset : [2, 50],
                by : [50, 0],
                dragOnly : true
            },
            function (next) {
                assertAnchorPosition(next, t);
            },
            {
                action : 'mouseUp'
            }
        );
    });
});
