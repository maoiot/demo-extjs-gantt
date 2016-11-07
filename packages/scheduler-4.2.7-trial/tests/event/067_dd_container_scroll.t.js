StartTest(function (t) {
    t.diag("Test if the scrollable element is scrolled during drag drop operations, both vertically and horizontally");

    var scheduler;
    var viewEl;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();

        scheduler = t.getScheduler({ deferRowRender : false, height: 200, width: 400, dragConfig: { showTooltip: false} });

        scheduler.eventStore.first().set({
            ResourceId  : scheduler.resourceStore.first().get('Id'),
            StartDate   : scheduler.getStart()
        });

        scheduler.render(Ext.getBody());

        viewEl = scheduler.getSchedulingView().el;
    });

    t.it("Should scroll vertically, when dragging event to the top/bottom edge of the view", function (t) {

        t.chain(
            { waitForEventsToRender : scheduler },

            function (next) {
                t.isGreater(viewEl.child('.x-grid-item-container').getWidth(), viewEl.getWidth(), 'Enough width to scroll');
                t.isGreater(viewEl.child('.x-grid-item-container').getHeight(), viewEl.getHeight(), 'Enough height to scroll');
                t.isDeeply(viewEl.getScroll(), { left: 0, top: 0 }, 'Scroll initally 0');

                next();
            },

            { drag : '.sch-event', to : viewEl, toOffset : ['50%', '100%-23'], dragOnly : true },

            { waitFor : 'ScrollTopChange', args : viewEl, timeout : 30000 },

            function (next) {
                t.isGreater(viewEl.getScroll().top, 0, 'Scrolled down ok');

                next();
            },

            { waitFor : 1000 },

            { action : 'mouseUp' },

            { waitFor : 1000 },

            { waitForAnimations : [] },

            { drag : '.sch-event', to : viewEl, toOffset : ['50%', 10], dragOnly : true },

            { waitFor : 'ScrollTopChange', args : viewEl, timeout : 30000 },

            { action : 'mouseUp' },

            { waitForAnimations : [] },

            { waitFor : 1000 }
        )
    });

    t.it("Should scroll horizontally, when dragging event to the left/right edge of the view", function (t) {
        Sch.util.ScrollManager.hthresh = 40;

        t.chain(
            { waitForEventsToRender : scheduler },

            function (next) {
                t.isGreater(viewEl.child('.x-grid-item-container').getWidth(), viewEl.getWidth(), 'Enough width to scroll');
                t.isGreater(viewEl.child('.x-grid-item-container').getHeight(), viewEl.getHeight(), 'Enough height to scroll');
                t.isDeeply(viewEl.getScroll(), { left: 0, top: 0 }, 'Scroll initally 0');

                next();
            },

            { drag : '.sch-event', to : viewEl, toOffset : ['100%-30', '50%'], dragOnly : true },

            { waitFor : function () {
                return viewEl.getScroll().left > 0;
            }},

            // move mouse back a little to not trigger another scroll accidentally
            // it may lead to cancelled dragdrop and next drag will set scroll to 0 and will fail the test
            { moveMouseBy : [[-30, 0]] },

            { waitFor : 1000 },

            { action : 'mouseUp' },

            { waitFor : 1000 },

            { waitForAnimations : [] },

            { drag : '.sch-event', to : viewEl, toOffset : [30, '50%'], dragOnly : true },

            { waitFor : function () {
                return viewEl.getScroll().left === 0;
            }},

            { action : 'mouseUp' },

            { waitForAnimations : [] }
        )
    })
});
