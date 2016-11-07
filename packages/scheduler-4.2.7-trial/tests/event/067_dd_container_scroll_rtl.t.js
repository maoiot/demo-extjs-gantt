StartTest(function (t) {
    t.diag("Test if the scrollable element is scrolled during drag drop operations, both vertically and horizontally");

    Sch.util.ScrollManager.hthresh = 40;

    var scheduler;

    function createScheduler(cfg) {
        scheduler && scheduler.destroy();

        scheduler = t.getScheduler(Ext.apply({
            deferRowRender : false,
            height         : 200,
            width          : 400,
            rtl            : true,
            renderTo       : document.body,
            dragConfig     : { showTooltip : false }
        }, cfg));

        scheduler.eventStore.first().set({
            ResourceId : scheduler.resourceStore.first().get('Id'),
            StartDate  : scheduler.getStart()
        });
    }

    t.it("Should increase scroll horizontally, when dragging event to the left edge", function (t) {

        createScheduler();

        t.chain(
            { waitForEventsToRender : scheduler },

            function (next) {
                var         viewEl = scheduler.getSchedulingView().el;

                t.isGreater(viewEl.child('.x-grid-item-container').getWidth(), viewEl.getWidth(), 'Enough width to scroll');
                t.isDeeply(scheduler.getSchedulingView().getScroll(), { left : 0, top : 0 }, 'Scroll initally 0');

                next();
            },

            { drag : '.sch-event', to : scheduler.getSchedulingView(), toOffset : [ 10, '50%' ], dragOnly : true },

            {
                waitFor : function () {
                    return scheduler.getSchedulingView().getScroll().left > 0;
                }
            },

            { action : 'mouseUp' },

            function (next) {
                t.isGreater(scheduler.getSchedulingView().getScrollX(), 0, 'Scroll > 0');

                next();
            }
        )
    });

    t.it("Should decrease scroll horizontally, when dragging event to the right edge", function (t) {

        createScheduler();

        t.chain(
            { waitForEventsToRender : scheduler },

            function (next) {
                scheduler.getSchedulingView().setScrollX(50);

                next();
            },

            { drag : '.sch-event', to : scheduler.getSchedulingView(), toOffset : [ '100%-10', '50%' ], dragOnly : true },

            {
                waitFor : function () {
                    return scheduler.getSchedulingView().getScroll().left === 0;
                }
            },

            { action : 'mouseUp' },

            { waitForAnimations : [] }
        )
    });

    // IE 9.0.8112.16421, update version 9.0.28 and less have rendering bug that doesn't allow siesta
    // to drag '.sch-event' if scheduler configured with viewport plugin, it works with
    // update version 9.0.46 and also works manually. Solution is not to do this test in IE9

    if (Ext.isIE9) {
        return;
    }

    t.it("Viewport: Should scroll horizontally, when dragging event to the left/right edge of the view", function (t) {

        createScheduler({ plugins : 'viewport'});

        t.chain(
            { waitForEventsToRender : scheduler },

            function (next) {
                var         viewEl = scheduler.getSchedulingView().el;

                t.isGreater(viewEl.child('.x-grid-item-container').getWidth(), viewEl.getWidth(), 'Enough width to scroll');
                t.isDeeply(scheduler.getSchedulingView().getScroll(), { left : 0, top : 0 }, 'Scroll initally 0');

                next();
            },

            { drag : '.sch-event', to : scheduler.getSchedulingView(), toOffset : [ 10, '10%' ], dragOnly : true },

            {
                waitFor : function () {
                    return scheduler.getSchedulingView().getScroll().left > 0;
                }
            },

            { action : 'mouseUp' },

            function (next) {
                t.isGreater(scheduler.getSchedulingView().getScrollX(), 0, 'Scroll > 0');

                next();
            }
        )
    });

    t.it("Viewport: Should scroll horizontally, when dragging event to the left/right edge of the view", function (t) {

        createScheduler({ plugins : 'viewport'});

        t.chain(
            { waitForEventsToRender : scheduler },

            function (next) {
                scheduler.getSchedulingView().setScrollX(50);

                next();
            },

            { drag : '.sch-event', to : scheduler.getSchedulingView(), toOffset : [ '100%-10', '10%' ], dragOnly : true },

            {
                waitFor : function () {
                    return scheduler.getSchedulingView().getScroll().left === 0;
                }
            },

            { action : 'mouseUp' },

            { waitForAnimations : [] }
        )
    });
});
