StartTest(function (t) {
    Ext.define('Sch.examples.RtlComponent', {
        override : 'Ext.Component',
        rtl      : true
    });
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    t.it('Locked grid should be rendered fine', function (t) {
        scheduler = t.getScheduler({
            width       : 500,
            height      : 200,
            startDate   : new Date(2009, 1, 1),
            endDate     : new Date(2009, 1, 4),
            resourceStore: t.getResourceStore({
                data    : [
                    { Id : 'r1', Name : 'r1' }
                ]
            }),
            eventStore  : t.getEventStore({
                data    : [
                    { Id : 1, ResourceId : 'r1', StartDate : new Date(2009, 0, 29), EndDate : new Date(2009, 1, 2), Cls : 'sch-e1' },
                    { Id : 2, ResourceId : 'r1', StartDate : new Date(2009, 1, 3), EndDate : new Date(2009, 1, 5), Cls : 'sch-e2' }
                ]
            }),
            renderTo    : Ext.getBody(),
            rtl         : true
        });

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                var view = scheduler.getSchedulingView();

                var e = view.el.down('.sch-e1');
                t.is(e.getStyle('borderRightStyle'), 'dashed', 'Right border style is ok');
                t.is(e.getStyle('borderLeftStyle'), 'solid', 'Left border style is ok');

                e = view.el.down('.sch-e2');
                t.is(e.getStyle('borderRightStyle'), 'solid', 'Right border style is ok');
                t.is(e.getStyle('borderLeftStyle'), 'dashed', 'Left border style is ok');

                var node = scheduler.lockedGrid.view.all.item(0);

                t.isApprox(node.getLeft(), scheduler.lockedGrid.el.getLeft(), 1, 'Column content is synced with view');
                t.isApprox(node.getLeft() + node.getWidth(), scheduler.lockedGrid.el.getLeft() + scheduler.lockedGrid.el.getWidth(), 1, 'Column content is synced with view');
            }
        )
    });

    // https://app.assembla.com/spaces/bryntum/tickets/2920/details?comment=1001310103#
    t.it('Normal view horizontal scroll should not be affected by locked grid vertical scrolling', function (t) {
        scheduler = t.getScheduler({
            width         : 500,
            height        : 200,
            startDate     : new Date(2009, 1, 1),
            endDate       : new Date(2009, 1, 24),
            resourceStore : t.getResourceStore({
                data : [
                    { Name : 'r1' },
                    { Name : 'r2' },
                    { Name : 'r3' },
                    { Name : 'r4' },
                    { Name : 'r5' },
                    { Name : 'r6' },
                    { Name : 'r11' },
                    { Name : 'r12' },
                    { Name : 'r13' },
                    { Name : 'r14' },
                    { Name : 'r15' },
                    { Name : 'r15' },
                    { Name : 'r1' },
                    { Name : 'r1' },
                    { Name : 'r1' },
                    { Name : 'r1' },
                    { Name : 'r1' },
                    { Name : 'r1' },
                    { Name : 'r1' },
                    { Name : 'r1' }
                ]
            }),
            renderTo      : Ext.getBody(),
            rtl           : true
        });

        t.chain(
            { waitForRowsVisible : scheduler },

            function (next) {
                var view = scheduler.getSchedulingView();

                t.wait('scroll');


                view.on('scrollend', function () {

                    // Object.defineProperty(view.el.dom, 'scrollLeft', {
                    //     set : function() {
                    //         debugger
                    //     }
                    // });

                    scheduler.lockedGrid.getView().on('scrollend', function () {
                        t.endWait('scroll');

                        t.expect(view.getScrollX()).toBe(125);
                    });

                    scheduler.lockedGrid.getView().setScrollY(120);

                }, null, { single : true });

                view.setScrollX(125);


            }
        )
    });

    t.it('Normal header should sync scroll after task dragdrop', function (t) {
        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            width       : 500,
            height      : 200,
            startDate   : new Date(2009, 1, 1),
            endDate     : new Date(2009, 1, 14),
            resourceStore: t.getResourceStore({
                data    : [
                    { Id : 'r1', Name : 'r1' }
                ]
            }),
            eventStore  : t.getEventStore({
                data    : [
                    { Id : 1, ResourceId : 'r1', StartDate : new Date(2009, 1, 12), EndDate : new Date(2009, 1, 13), Cls : 'sch-e1' }
                ]
            }),
            rtl         : true
        });

        var view = scheduler.getSchedulingView();
        var scrollWidth = view.el.dom.scrollWidth - view.getWidth();

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                view.scrollTo(scrollWidth);
                t.waitFor(function () {
                    return view.getScrollX() === scrollWidth;
                }, next);
            },
            { drag : '.sch-e1', by : [100, 0] },
            { moveMouseTo : '.sch-timetd', offset : [10, 0] },
            function () {
                t.is(view.getScrollX(), scrollWidth, 'View scroll is ok');
                t.is(view.headerCt.getScrollX(), scrollWidth, 'Header scroll is ok');
            }
        )
    });
});