StartTest(function (t) {
    var s;

    Ext.define('Sch.examples.RtlComponent', {
        override : 'Ext.Component',
        rtl      : true
    });
    
    t.beforeEach(function() {
        s && s.destroy();
    })

    t.it('Should align proxy correctly', function (t) {
        
        s = t.getScheduler({
            renderTo    : Ext.getBody(),
            rtl         : true,
            eventRenderer : function (item, r, tplData, row) {
                tplData.cls = "event-" + r.getId();
                return item.get('Name');
            }
        });

        t.chain(
            { action : 'drag', offset : [10, 10], target : '.event-r1', by : [10, 1], dragOnly : true },

            function (next) {
                var query = s.el.query('.event-r1');
                var proxy = Ext.getBody().down('.sch-dd-ref');
                var eventEl = Ext.fly(query[1]);
                
                t.isApprox(proxy.getLeft(), eventEl.getLeft(), 10, 'Proxy left is correct');
                t.isApprox(proxy.getY(), eventEl.getY(), 1, 'Proxy top is correct');
                next();
            },
            { action : 'mouseup' }
        );
    });



    t.it('Should scroll view when drag to edge', function (t) {

        s = t.getScheduler({
            renderTo    : Ext.getBody(),
            rtl         : true,
            resourceStore   : t.getResourceStore({
                data    : [{ Id : 'r1', Name : 'Albert' }]
            }),
            eventStore      : t.getEventStore({}, 1)
        });

        var view = s.getSchedulingView();
        var scrollWidth = view.el.dom.scrollWidth;
        var scrollValue;

        t.chain(
            { waitForEventsToRender : s },
            function (next) {
                scrollValue = view.getScroll().left;
                next();
            },
            { drag : '.sch-event', toOffset : [3, 10], to : view, dragOnly : true },
            { waitFor : function () {
                return view.getScroll().left > scrollValue;
            }},
            function (next) {
                var position = s.el.down('.sch-event.sch-dd-ref').getX();
                t.ok(position < view.el.getX(), 'Proxy positioned correctly');
                next();
            },
            { moveMouseTo : view, offset : ['100%-3', 10] },
            { waitFor : function () {
                // in RTL scroll on component contain inverted value
                return view.getScroll().left === 0;
            }},
            function (next) {
                var el = s.el.down('.sch-event.sch-dd-ref');
                var viewRight = view.el.getX() + view.el.getWidth();
                t.ok(el.getX() < viewRight && el.getX() + el.getWidth() > viewRight, 'Proxy positioned correctly');
                next();
            },
            { action : 'mouseup' }
        )
    });

    t.it('Should align proxy correctly when view scrolled', function (t) {

        s = t.getScheduler({
            renderTo    : Ext.getBody(),
            rtl         : true,
            eventRenderer : function (item, r, tplData, row) {
                tplData.cls = "event-" + r.getId();
                return item.get('Name');
            }
        });

        var position;

        t.chain(
            { waitForEventsToRender : s },
            function (next) {
                s.getSchedulingView().scrollBy(1000);
                next();
            },
            { drag : '.event-r5', by : [-100, 0] },
            function (next) {
                position = s.el.down('.event-r5').getX();
                next();
            },
            { drag : '.event-r5', by : [-20, 0], dragOnly : true},
            function (next) {
                var currentPosition = s.el.down('.event-r5.sch-dd-ref').getX();
                t.isApprox(currentPosition, position, 25, '');
                next();
            },
            { action : 'mouseup' }
        );
    });

    t.it('Drag and drop with showExactDropPosition w/o snapRelativeToEventStartDate (horizontal)', function (t) {
        
        s = t.getScheduler({
            renderTo       : Ext.getBody(),
            startDate      : new Date(2011, 0, 3),
            viewPreset  : 'hourAndDay',
            rtl         : true,
            eventStore  : Ext.create('Sch.data.EventStore', {
                data : [{
                    Id      : 1,
                    Name    : 'Event',
                    ResourceId  : 'r1',
                    StartDate   : new Date(2011, 0, 3, 4, 13, 18),
                    EndDate     : new Date(2011, 0, 3, 6)
                }]
            }),
            dragConfig  : { showExactDropPosition : true }
        });
        
        var tickWidth   = s.getSchedulingView().timeAxisViewModel.getTickWidth();
        var record      = s.eventStore.getAt(0);

        t.chain(
            { drag : '.sch-event', by : [0.2 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 4), 'Event hasn\'t changed place');
                next();
            },
            { drag : '.sch-event', by : [0.5 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 3, 30), 'Event changed place');
                next();
            },
            { drag : '.sch-event', by : [0.2 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 3, 30), 'Event hasn\'t changed place');
                next();
            }
        );
    });
    
    t.it('Drag and drop with showExactDropPosition w/ snapRelativeToEventStartDate (horizontal)', function (t) {
        
        s = t.getScheduler({
            renderTo       : Ext.getBody(),
            startDate      : new Date(2011, 0, 3),
            viewPreset  : 'hourAndDay',
            rtl         : true,
            eventStore  : Ext.create('Sch.data.EventStore', {
                data : [{
                    Id      : 1,
                    Name    : 'Event',
                    ResourceId  : 'r1',
                    StartDate   : new Date(2011, 0, 3, 4, 13, 18),
                    EndDate     : new Date(2011, 0, 3, 6)
                }]
            }),
            dragConfig  : { showExactDropPosition : true },
            snapRelativeToEventStartDate    : true
        });
        
        var tickWidth   = s.getSchedulingView().timeAxisViewModel.getTickWidth();
        var record      = s.eventStore.getAt(0);

        t.chain(
            { drag : '.sch-event', by : [-0.2 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 4, 13, 18), 'Event hasn\'t changed place');
                next();
            },
            { drag : '.sch-event', by : [-0.5 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 4, 43, 18), 'Event changed place');
                next();
            },
            { drag : '.sch-event', by : [-0.2 * tickWidth, 0] },
            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 4, 43, 18), 'Event hasn\'t changed place');
                next();
            }
        );
    });

    // IE 9.0.8112.16421, update version 9.0.28 and less have rendering bug that doesn't allow siesta
    // to drag '.sch-event' if scheduler configured with viewport plugin, it works with
    // update version 9.0.46 and also works manually. Solution is not to do this test in IE9

    if (Ext.isIE9) {
        return;
    }

    // https://app.assembla.com/spaces/bryntum/tickets/2916-rtl-broken-if-scheduler-is-in-a-viewport/details#
    t.it('Drag and drop horizontal, with scheduler in viewport', function (t) {

        s = t.getScheduler({
            startDate  : new Date(2011, 0, 3),
            viewPreset : 'hourAndDay',
            rtl        : true,
            plugins    : 'viewport',
            renderTo   : document.body,
            eventStore : Ext.create('Sch.data.EventStore', {
                data : [ {
                    Id         : 1,
                    Name       : 'Event',
                    ResourceId : 'r1',
                    StartDate  : new Date(2011, 0, 3, 4),
                    EndDate    : new Date(2011, 0, 3, 6)
                } ]
            })
        });

        var tickWidth = s.getSchedulingView().timeAxisViewModel.getTickWidth();
        var record    = s.eventStore.getAt(0);

        t.chain(
            { drag : '.sch-event', by : [ -tickWidth, 0 ] },

            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 5), 'Event shifted 1 hour into future');
            }
        );
    });

    t.it('Should align proxy correctly when in viewport', function (t) {
        s = t.getScheduler({
            renderTo      : Ext.getBody(),
            rtl           : true,
            plugins       : 'viewport',
            eventRenderer : function (item, r, tplData, row) {
                tplData.cls = "event-" + r.getId();
                return item.get('Name');
            }
        });


        t.chain(
            { action : 'drag', offset : [10, 10], target : '.event-r1', by : [10, 1], dragOnly : true },

            function (next) {
                var query   = s.el.query('.event-r1');
                var proxy   = Ext.getBody().down('.sch-dd-ref');
                var eventEl = Ext.fly(query[1]);

                t.isApprox(proxy.getLeft(), eventEl.getLeft(), 10, 'Proxy left is correct');
                t.isApprox(proxy.getY(), eventEl.getY(), 1, 'Proxy top is correct');
                next();
            },
            { action : 'mouseup' }
        );
    });

    t.it('Drag and drop vertical mode', function (t) {

        s = t.getScheduler({
            startDate  : new Date(2011, 0, 3),
            viewPreset : 'hourAndDay',
            rtl        : true,
            mode       : 'vertical',
            plugins    : 'viewport',
            // renderTo: document.body,
            eventStore : Ext.create('Sch.data.EventStore', {
                data : [ {
                    Id         : 1,
                    Name       : 'Event',
                    ResourceId : 'r1',
                    StartDate  : new Date(2011, 0, 3, 4),
                    EndDate    : new Date(2011, 0, 3, 6)
                } ]
            })
        });

        var tickWidth = s.getSchedulingView().timeAxisViewModel.getTickWidth();
        var record    = s.eventStore.getAt(0);

        t.chain(
            { drag : '.sch-event', by : [ -100, tickWidth ] },

            function (next) {
                t.is(record.getStartDate(), new Date(2011, 0, 3, 5), 'Event changed date');
                t.is(record.getResource().getName(), 'Linda', 'Event changed resource');
                next();
            }
        );
    });
});