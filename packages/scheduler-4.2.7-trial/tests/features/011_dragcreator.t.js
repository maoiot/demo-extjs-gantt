StartTest(function (t) {
    var counter = 0;
    
    var s;

    var resourceStore = new Sch.data.ResourceStore({
        data : [
            {
                Id   : 1,
                Name : 'Foo'
            }
        ]
    });

    var createFn = function (resource, start, end, e) {

        //limiting number of assertions
        if (counter < 2) {
            t.ok(arguments[0] instanceof Sch.model.Resource &&
                arguments[1] instanceof Date &&
                arguments[2] instanceof Date &&
               ( arguments[3] ? arguments[3] instanceof Ext.EventObjectImpl : true), 'Correct function arguments');

        }
        counter++;

        if (end > new Date(2011, 0, 10)) {
            return false;
        }
    };

    t.it("Should not create an event if createValidator returns false", function (t) {
        s && s.destroy();
        
        s = t.getScheduler({
            startDate         : new Date(2011, 0, 3),
            endDate           : new Date(2011, 3, 3),
            width             : 500,
            height            : 130,
            createValidatorFn : function () { return false; },
            renderTo          : Ext.getBody(),
            viewPreset        : 'weekAndMonth',
            resourceStore     : resourceStore,
            eventStore        : new Sch.data.EventStore()
        });

        s.eventStore.removeAll();

        var view = s.getSchedulingView();

        t.isStrict(view.enableDragCreation, true, 'Should see enableDragCreation configured correctly on the view');

        t.wontFire(s.eventStore, 'add');
        t.wontFire(s, 'scheduleclick');

        t.chain(
            { waitForRowsVisible : s },

            { drag : view, fromOffset : [2, 2], by : [300, 0] }
        );
    });

    t.it("Should create an event if createValidator returns true", function (t) {
        s && s.destroy();
        
        s = t.getScheduler({
            margin            : '60 0 0 0',
            startDate         : new Date(2011, 0, 3),
            endDate           : new Date(2011, 3, 3),
            width             : 500,
            height            : 130,
            createValidatorFn : createFn,
            renderTo          : Ext.getBody(),
            viewPreset        : 'weekAndMonth',
            resourceStore     : resourceStore,
            eventStore        : new Sch.data.EventStore()
        });

        t.willFireNTimes(s.eventStore, 'add', 2);
        t.wontFire(s, 'scheduleclick');

        var view = s.getSchedulingView();

        t.chain(
            { waitForRowsVisible : s },

            { drag : view, fromOffset : [2, 2], by : [100, 0], dragOnly : true },

            function (next) {
                var tip = view.dragCreator.dragTip;
                t._tipPos = [tip.el.getX(), tip.el.getBottom()];

                t.isApprox(t._tipPos[0], view.el.getX(), 10, 'Tip x should be aligned with proxy');
                t.isApprox(t._tipPos[1], view.el.getY(), 10, 'Tip y should be aligned with proxy');

                next()
            },

            { action    : 'mouseUp' },

            function(next) {
                s.eventStore.removeAll();
                next()
            },

            { drag : view, fromOffset : [2, 2], by : [100, 0], dragOnly : true },

            function (next) {
                var tip = s.getSchedulingView().dragCreator.dragTip;
                t._tipPos = [tip.el.getX(), tip.el.getBottom()];

                t.isApprox(t._tipPos[0], view.el.getX(), 10, 'Tip x should be aligned with proxy');
                t.isApprox(t._tipPos[1], view.el.getY(), 10, 'Tip y should be aligned with proxy');

                next()
            },

            { action    : 'mouseUp' },

            function () {
                t.is(s.eventStore.getCount(), 1, '1 new event added');
                var event = s.eventStore.first();

                t.is(event.getStartDate(), new Date(2011, 0, 3), 'StartDate read ok');
                t.is(event.getEndDate(), new Date(2011, 0, 10), 'EndDate read ok');

                t.hasStyle(s.el.down('.sch-dragcreator-proxy'), 'top', '-10000px', 'Proxy should be outside view');
            }
        );
    });

    t.it("Should trigger scroll when creating event close to timeaxis edges", function (t) {
        s && s.destroy();
        
        s = t.getScheduler({
            startDate     : new Date(2011, 0, 3),
            endDate       : new Date(2011, 3, 3),
            width         : 500,
            height        : 130,
            renderTo      : Ext.getBody(),
            viewPreset    : 'weekAndMonth',
            resourceStore : resourceStore,
            eventStore    : new Sch.data.EventStore()
        });

        var view = s.getSchedulingView();

        var viewEl = view.el;

        t.firesAtLeastNTimes(viewEl, 'scroll', 1);

        t.is(viewEl.getScroll().left, 0, 'Scroll 0 initially');

        t.chain(
            { waitForRowsVisible : s },

            { drag : view, fromOffset : [2, 2], to : view, toOffset : ["100%-5", 10], dragOnly : true },

            {
                waitFor : function () {
                    return viewEl.getScroll().left >= 200;
                }
            },

            // At this point we should have scrolled exactly one scroll increment (defaults to 100 in Sch.util.ScrollManager)
            {
                waitFor: function () {
                    return viewEl.down('.sch-dragcreator-proxy').getWidth() > viewEl.getWidth() - 10 + viewEl.getScroll().left;
                },
                desc : 'Proxy el gained width'
            },

            function(next) {
                t.ok(view.dragCreator.dragging, 'Still in dragging mode after scroll happened');
                next()
            },

            { moveMouseBy : [[-30, 0]] },

            { action : 'mouseUp' },

            function () {
                var newEvent = s.eventStore.first();
                t.wontFire(viewEl, 'scroll');

                t.isGreaterOrEqual(viewEl.getScroll().left, 100, 'Scrolled right at least one increment');

                t.is(newEvent.getStartDate(), new Date(2011, 0, 3));
            }
        );
    });

    t.it("Should find enableDragCreation false configured correctly on the view", function (t) {
        s && s.destroy();
        s = t.getScheduler({
            enableDragCreation : false
        });

        t.isStrict(s.getSchedulingView().enableDragCreation, false, 'Should find enableDragCreation false configured correctly on the view')
    });
    
    t.it('Proxy should not move after scroll (horizontal)', function (t) {
        s && s.destroy();
        
        s = t.getScheduler({
            renderTo        : Ext.getBody(),
            resourceStore   : t.getResourceStore2({}, 30)
        });
        
        var v = s.getSchedulingView();
        var xy = [];
        var proxy, rect, el;
        
        t.chain(
            { waitForEventsToRender : s },
            { drag      : s.normalGrid.view, fromOffset : [2, 2], by : [100, 0], dragOnly : true },
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

    t.it('Hovertip should be disabled during dragcreate', function (t) {
        s && s.destroy();

        s = t.getScheduler({
            renderTo        : Ext.getBody()
        });

        t.chain(
            { waitForRowsVisible : s },
            { drag : "table.x-grid-item:nth-child(3) .sch-timetd", offset : [5, 19], by : [90, 6], dragOnly : true },
            function (next) {
                var tip = s.normalGrid.view.dragCreator.hoverTip;
                t.ok(tip.isDisabled(), 'Tip is disabled');
                t.elementIsNotVisible(tip.el, 'hover tip is hidden');
                next();
            },
            { action : 'mouseup' }
        )
    });
});
