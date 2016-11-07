StartTest(function (t) {
    var s;

    t.beforeEach(function () {
        s && s.destroy();
    });

    t.it('Should do simple resize', function (t) {
        s = t.getScheduler({
            orientation : 'vertical',
            startDate   : new Date(2011, 0, 4),
            renderTo    : Ext.getBody()
        });

        s.eventStore.removeAll();
        s.eventStore.add({
            ResourceId : s.resourceStore.first().getId(),
            StartDate  : new Date(2011, 0, 4),
            EndDate    : new Date(2011, 0, 5)
        });

        var evt         = s.eventStore.first();
        var tickWidth   = s.timeAxisViewModel.getTickWidth();

        t.chain(
            { waitFor : 'rowsVisible' },

            { moveCursorTo : '.sch-event' },

            { drag : '.sch-resizable-handle-end', by : [0, tickWidth] },

            function (next) {
                t.is(evt.getEndDate(), new Date(2011, 0, 6), 'Event resized');

                next();
            },

            { drag : '.sch-resizable-handle-end', by : [0, tickWidth] },

            function () {
                t.is(evt.getEndDate(), new Date(2011, 0, 7), 'Event resized 2nd time');
            }
        );
    });

    // This should've failed in 6.0.1, but siesta cannot make it fail
    // To debug siesta remove override for onFocusEnter in Sch.patches.TableView and do these steps manually
    // https://www.assembla.com/spaces/bryntum/tickets/2628
    t.it('Resize should not change vertical scroll', function (t) {
        s = t.getScheduler({
            orientation : 'vertical',
            startDate   : new Date(2011, 0, 4),
            endDate     : new Date(2011, 0, 15),
            renderTo    : Ext.getBody(),
            eventStore  : new Sch.data.EventStore({
                data    : [{
                    ResourceId : 'r1',
                    StartDate  : new Date(2011, 0, 4),
                    EndDate    : new Date(2011, 0, 5, 12),
                    Cls        : 'e1'
                }]
            })
        });

        var view        = s.getSchedulingView(),
            scrollValue = 100;

        t.chain(
            { waitForEventsToRender : s },
            function (next) {
                view.scrollTo(null, scrollValue);
                next();
            },
            {
                waitFor     : function () {
                    return view.getScrollY() == scrollValue && s.lockedGrid.view.getScrollY() == scrollValue;
                },
                desc        : 'Scrolled to '+ scrollValue
            },
            {
                moveMouseTo : '.e1',
                offset      : ['50%', '99%'],
                desc        : 'Move mouse over the event element bottom part to display resize handler'
            },
            {
                drag        : '.sch-resizable-handle-end',
                by          : [0, 20],
                desc        : 'Drag resize handler'
            },
            function () {
                t.is(view.getScrollY(), scrollValue, 'Vertical scroll is not changed');
            }
        )
    });

    var scenario = function (t, config) {
        s = t.getScheduler(Ext.apply({
            orientation : 'vertical',
            viewPreset  : 'weekAndDayLetter',
            startDate   : new Date(2011, 0, 4),
            renderTo    : Ext.getBody(),
            resizeConfig : {
                showExactResizePosition : true
            },
            viewConfig : {
                // animations fail in chrome 40
                // https://code.google.com/p/chromium/issues/detail?id=454960
                eventAnimations : false
            },
            rowHeight   : 40,
            eventStore  : new Sch.data.EventStore({
                data    : [{
                    ResourceId : 'r1',
                    StartDate  : new Date(2011, 0, 4),
                    EndDate    : new Date(2011, 0, 5),
                    Cls        : 'sch-e1'
                }]
            })
        }, config));

        var height = 60;

        s.getSchedulingView().setRowHeight(height);

        var testBox;

        t.chain(
            { waitForSelector : '.sch-e1' },
            function (next) {
                testBox = s.el.down('.sch-e1').getBox();
                next();
            },
            { moveCursorTo : '.sch-e1' },
            { drag : '.sch-resizable-handle-end', by : [0, 15], dragOnly : true },
            function (next) {
                var box = s.el.down('.sch-e1').getBox();
                t.isDeeply(box, testBox, 'Vertical size hasn\'t changed');
                next();
            },
            { moveCursorBy : [[0, 20]] },
            function (next) {
                var box = s.el.down('.sch-e1').getBox();
                testBox.height = height * 2;
                testBox.bottom = testBox.top + testBox.height;
                t.isDeeply(box, testBox, 'Vertical size is correct');
                next();
            },
            { action : 'mouseUp' },

            // add new event, second in column
            function (next) {
                s.eventStore.add({
                    ResourceId : 'r1',
                    StartDate  : new Date(2011, 0, 5),
                    EndDate    : new Date(2011, 0, 6),
                    Cls        : 'sch-e2'
                });
                next();
            },
            function (next) {
                testBox = s.el.down('.sch-e1').getBox();
                next();
            },
            { drag : '.sch-e1 .sch-resizable-handle-end', by : [0, 20], dragOnly : true },
            function (next) {
                var box = s.el.down('.sch-e1').getBox();
                t.isDeeply(box, testBox, 'Vertical size is correct');
                next();
            },
            { moveCursorBy : [[0, 20]] },
            function (next) {
                var box = s.el.down('.sch-e1').getBox();
                testBox.height = height * 3;
                testBox.bottom = testBox.top + testBox.height;
                t.isDeeply(box, testBox, 'Vertical size is correct');
                next();
            },
            { action : 'mouseup' }
        );
    };

    t.it('Should do show exact resize position w/ snap to increment', function (t) {
        scenario(t, {
            snapToIncrement : true
        });
    });

    t.it('Should do show exact resize position w/o snap to increment', function (t) {
        scenario(t, {
            snapToIncrement : false
        });
    });
});
