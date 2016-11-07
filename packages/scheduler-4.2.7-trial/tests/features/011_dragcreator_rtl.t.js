StartTest(function (t) {
    Ext.define('Sch.examples.RtlComponent', {
        override : 'Ext.Component',
        rtl      : true
    });

    var s;

    var resourceStore = new Sch.data.ResourceStore({
        data : [
            {Id: 1, Name: 'Foo'},
            {Id: 2, Name: 'Bar'}
        ]
    });

    t.it("Should trigger scroll when creating event close to timeaxis edges", function (t) {
        s && s.destroy();

        s = t.getScheduler({
            startDate     : new Date(2011, 0, 3),
            endDate       : new Date(2011, 3, 3),
            width         : 500,
            height        : 200,
            rtl           : true,
            renderTo      : Ext.getBody(),
            viewPreset    : 'weekAndMonth',
            resourceStore : resourceStore,
            eventStore    : new Sch.data.EventStore()
        });

        var view    = s.getSchedulingView();

        t.firesAtLeastNTimes(s.getSchedulingView().el, 'scroll', 1);

        t.is(view.getScroll().left, 0, 'Scroll 0 initially');

        var scrollWidth = view.el.dom.scrollWidth;

        t.chain(
            { waitForRowsVisible : s },

            { drag : s.normalGrid.view, fromOffset : ['100%-5', 2], to : s.normalGrid.view, toOffset : [5, 10], dragOnly : true },

            { waitFor : function () {
                return view.getScrollX() >= 200;
            } },

            // if we do not move mouse from edge to stop scrolling, test may fail in FF
            { moveMouseBy : [[10, 0]] },

            function(next) {
                t.ok(s.getSchedulingView().dragCreator.dragging, 'Still in dragging mode after scroll happened');
                t.isGreater(view.el.down('.sch-dragcreator-proxy').getWidth(), view.el.getWidth() - 30 + view.getScrollX(), 'Proxy el should gain width after scrolling, at least one increment');

                next()
            },

            { action : 'mouseUp' },

            function (next) {
                var newEvent = s.eventStore.first();
                t.wontFire(view.el, 'scroll');

                t.is(view.el.dom.scrollWidth, scrollWidth, 'Scroll width has not changed');

                t.isGreaterOrEqual(view.getScrollX(), 100, 'Scrolled right at least one increment');

                t.is(newEvent.getStartDate(), new Date(2011, 0, 3));

                next();
            },

            { drag : s.normalGrid.view, fromOffset : ['100%-20', 40], by : [-100, 0] },

            function () {
                t.is(s.eventStore.getCount(), 2, 'Two events created');
            }
        );
    });

    t.it('Proxy should not move after scroll (horizontal)', function (t) {
        s && s.destroy();

        s = t.getScheduler({
            renderTo        : Ext.getBody(),
            rtl             : true,
            resourceStore   : t.getResourceStore2({}, 30)
        });

        var v = s.getSchedulingView();
        var proxy, rect, el;

        t.chain(
            { waitForEventsToRender : s },
            { drag      : s.normalGrid.view, fromOffset : ['100%-2', 2], by : [-100, 0], dragOnly : true },
            function (next) {
                el = v.el.query('.sch-dragcreator-proxy')[0];
                rect = el.getBoundingClientRect();
                t.isLess(v.getScroll().top, rect.top, 'DragCreator proxy is visible');
                t.scrollVerticallyTo(v.el, 40, 0, next);
            },
            function (next) {
                var newRect = el.getBoundingClientRect();
                t.is(newRect.top + 40, rect.top, 'DragCreator proxy is not visible');
                next();
            },
            { action : 'mouseUp' }
        );
    });
});
