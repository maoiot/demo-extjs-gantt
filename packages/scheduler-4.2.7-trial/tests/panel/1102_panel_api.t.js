StartTest(function (t) {
    var scheduler;

    Ext.define('Sch.column.MyColumn', {
        extend : 'Sch.column.Day',
        flex   : null,
        width  : 100
    });

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    t.it('Basic API tests', function (t) {
        scheduler = t.getScheduler({
            height     : 150, // Force vert scrollbar
            viewPreset : 'dayAndWeek',
            cls        : 'first',
            renderTo   : Ext.getBody(),
            startDate  : new Date(2000, 0, 1),
            endDate    : new Date(2000, 4, 1)
        });

        // http://www.sencha.com/forum/showthread.php?273800-4.2.2-Locking-grid-not-respecting-certain-cfg-s
        t.knownBugIn('5.1', function (t) {
            t.isStrict(scheduler.normalGrid.enableColumnMove, false, 'NormalGrid config setting enableColumnMove');
            t.isStrict(scheduler.normalGrid.enableColumnResize, false, 'NormalGrid config setting enableColumnResize');
            t.isStrict(scheduler.normalGrid.enableColumnHide, false, 'NormalGrid config setting enableColumnHide');
        });

        var viewEl = scheduler.getSchedulingView().el;

        t.ok(scheduler.getTimeAxis() instanceof Sch.data.TimeAxis, 'getTimeAxis ok');

        t.is(scheduler.getStart(), new Date(2000, 0, 1), 'setStart/getStart ok');

        t.chain(
            { waitForRowsVisible : scheduler },

            function (next) {

                t.scrollVerticallyTo(viewEl, 10, next)
            },

            function (next) {
                scheduler.shiftNext(2);

                t.is(scheduler.getStart(), new Date(2000, 0, 3), 'shiftNext ok');

                t.is(viewEl.dom.scrollTop, 10, 'Normal grid: Vertical scroll intact after timeaxis update');

                scheduler.shiftPrevious(2);
                t.is(scheduler.getStart(), new Date(2000, 0, 1), 'shiftPrevious ok');

                scheduler.setEnd(new Date(2000, 1, 1));
                t.is(scheduler.getEnd(), new Date(2000, 1, 1), 'setEnd/getEnd ok');

                scheduler.goToNow();
                var today = new Date();
                today     = Ext.Date.clearTime(today);
                t.is(scheduler.getStart(), today, 'goToNow ok');

                t.notOk(scheduler.isReadOnly(), 'getReadOnly ok');
                scheduler.setReadOnly(true);
                t.ok(scheduler.isReadOnly(), 'setReadOnly ok');

                scheduler.setTimeSpan(new Date(2000, 1, 1), new Date(2000, 2, 2));

                t.waitForScrollLeftChange(viewEl, next);
                scheduler.scrollToDate(new Date(2000, 2, 2), true);
            },
            function (next, scrollValue) {
                t.isGreater(scrollValue, 0, 'Scrolled right direction');
                scheduler.getSchedulingView().fitColumns();

                next()
            },
            //Execute subtest with clicks here no sporadic fails
            function (next) {
                t.willFireNTimes(scheduler, 'itemclick', 2);
                next();
            },
            { click : '.first .x-grid-inner-locked .x-grid-view', offset : [ 20, '50%' ] },
            { click : '.first .sch-timelineview', offset : [ 20, '50%' ] }
        );
        //Execute subtest with clicks here will give sporadic fails
        //t.it('should fire item click as usual', function(t) {
        //    t.willFireNTimes(scheduler, 'itemclick', 2);
        //
        //    t.chain(
        //        { click : '.first .x-grid-inner-locked .x-grid-view', offset : [20, '50%']},
        //        { click : '.first .sch-timelineview', offset : [20, '50%']}
        //    )
        //})
    });

    t.it('Should change timespan if scrollToDate is called with a non-rendered date', function (t) {
        scheduler = t.getScheduler({
            height    : 100,
            startDate : new Date(2010, 1, 1),
            endDate   : new Date(2010, 3, 1),
            renderTo  : document.body
        });

        t.chain(
            { waitForRowsVisible : scheduler },
            function () {
                t.waitForScrollLeftChange(scheduler.getSchedulingView().el, function () {
                    t.isGreater(scheduler.getSchedulingView().getHorizontalScroll(), 0, 'Should have scrolled too');
                });

                scheduler.scrollToDate(new Date(2008, 1, 1));

                t.ok(scheduler.timeAxis.dateInAxis(new Date(2008, 1, 1)), 'Timeaxis adjusted');
            }
        )
    });

    t.it('Should scroll date to center (without infinite scroll)', function (t) {
        scheduler = t.getScheduler({
            height    : 100,
            startDate : new Date(2014, 0, 1),
            endDate   : new Date(2014, 1, 1),
            renderTo  : document.body
        });

        var view = scheduler.getSchedulingView();
        var date;

        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                date = new Date(2014, 2, 0);
                t.waitForEvent(view, 'scrollend', next);
                scheduler.scrollToDateCentered(date);
            },

            // HACK Each grid is completely destroyed prior to next test starting, yet Firefox has stability issues
            // with 'Should scroll date to center (without infinite scroll)' which passes if run separately
            { waitFor : function() {
                return Math.abs(scheduler.getViewportCenterDate() - date) <= 433000;
            } },
            function (next) {
                t.isApprox(scheduler.getViewportCenterDate(), date, 433000, 'Centered date is correct');

                date = new Date(2013, 11, 15);
                t.waitForEvent(view, 'refresh', next);
                scheduler.scrollToDateCentered(date);
            },
            { waitFor : function() {
                return Math.abs(scheduler.getViewportCenterDate() - date) <= 433000;
            } },
            function (next) {
                t.isApprox(scheduler.getViewportCenterDate(), date, 433000, 'Centered date is correct');

                date = new Date(2014, 0, 15);
                t.waitForEvent(view, 'refresh', next);
                scheduler.scrollToDateCentered(date);
            },
            { waitFor : function() {
                return Math.abs(scheduler.getViewportCenterDate() - date) <= 433000;
            } },
            function (next) {
                t.isApprox(scheduler.getViewportCenterDate(), date, 433000, 'Centered date is correct');
            }
        );
    });

    t.it('Should scroll date to center (with infinite scroll)', function (t) {
        scheduler = t.getScheduler({
            height         : 100,
            infiniteScroll : true,
            startDate      : new Date(2014, 0, 1),
            endDate        : new Date(2014, 1, 1),
            renderTo       : document.body
        });

        var view = scheduler.getSchedulingView();
        var date;

        t.chain(
            { waitForRowsVisible : scheduler },

            function (next) {
                date = new Date(2013, 11, 15);
                t.waitForEvent(view, 'scrollend', next);
                scheduler.scrollToDateCentered(date);
            },

            function (next) {
                t.isApprox(scheduler.getViewportCenterDate(), date, 433000, 'Centered date is correct');

                date = new Date(2014, 3, 0);
                t.waitForEvent(view, 'refresh', next);
                scheduler.scrollToDateCentered(date);
            },

            function (next) {
                t.isApprox(scheduler.getViewportCenterDate(), date, 433000, 'Centered date is correct');

                date = new Date(2014, 5, 15);
                t.waitForEvent(view, 'refresh', next);
                scheduler.scrollToDateCentered(date);
            },

            function (next) {
                t.isApprox(scheduler.getViewportCenterDate(), date, 433000, 'Centered date is correct');
            }
        );
    });

    t.it('Should scroll calendar to date', function (t) {
        scheduler = t.getScheduler({
            renderTo            : Ext.getBody(),
            startDate           : new Date(2016, 5, 6),
            endDate             : new Date(2016, 5, 20),
            timeAxis            : { autoAdjust : false },
            calendarColumnClass : 'Sch.column.MyColumn',
            mode                : 'calendar'
        });

        var view = scheduler.getSchedulingView();

        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                scheduler.scrollToDate(new Date(2016, 5, 9));
                t.is(view.getScroll().left, 300, 'Left scroll is ok');
                scheduler.scrollToDate(new Date(2016, 5, 19));
                t.is(view.getScroll().left + view.getWidth() - Ext.getScrollbarSize().width, view.el.dom.scrollWidth,
                    'Scrolled to right-most position');
                scheduler.scrollToDate(new Date(2016, 5, 9, 12));
                t.is(view.getScroll().left, 300, 'Left scroll is ok');
                t.is(view.getScroll().top, 12 * 40, 'Top scroll is ok');
            }
        );
    });

    t.it('ScrollToDateCentered should not hang calendar', function (t) {
        scheduler = t.getScheduler({
            renderTo  : Ext.getBody(),
            startDate : new Date(2016, 5, 6),
            endDate   : new Date(2016, 5, 13),
            startTime : 6,
            mode      : 'calendar'
        });

        t.waitForRowsVisible(function () {
            scheduler.scrollToDateCentered(new Date(2016, 5, 9));
            t.is(scheduler.getStartDate(), new Date(2016, 5, 6, 6), 'Start date not changed');
            t.is(scheduler.getEndDate(), new Date(2016, 5, 13), 'End date not changed');
            t.is(scheduler.getSchedulingView().getScroll().top, 0, 'Top scroll not changed');
        });
    });

    t.it('ScrollToDateCentered should work in calendar', function (t) {
        scheduler = t.getScheduler({
            renderTo            : Ext.getBody(),
            startDate           : new Date(2016, 5, 6),
            endDate             : new Date(2016, 5, 20),
            timeAxis            : { autoAdjust : false },
            calendarColumnClass : 'Sch.column.MyColumn',
            mode                : 'calendar'
        });

        t.waitForRowsVisible(function () {
            var view   = scheduler.getSchedulingView();
            var scroll = view.getScroll();

            scheduler.scrollToDateCentered(new Date(2016, 5, 9));
            t.isDeeply(view.getScroll(), scroll, 'Scroll not changed');

            var date = new Date(2016, 5, 9, 16);
            scheduler.scrollToDateCentered(date);
            t.isApprox(view.getHeight() / 2 + view.getScroll().top, view.getCoordinateFromDate(date), 'Date centered');

            date = new Date(2016, 5, 12, 15);
            scheduler.scrollToDateCentered(date);
            var column = scheduler.normalGrid.getVisibleColumns()[ 6 ];
            t.isApprox(view.getScroll().left + view.getWidth() / 2, column.getLocalX(), 'Centered horizontally');
            t.isApprox(view.getHeight() / 2 + view.getScroll().top, view.getCoordinateFromDate(date), 'Centered vertically');

            date = new Date(2016, 5, 19, 10);
            scheduler.scrollToDateCentered(date);
            t.is(view.getScroll().left + view.getWidth(), view.el.dom.scrollWidth + Ext.getScrollbarSize().width,
                'Scrolled to right-most position');
            t.isApprox(view.getHeight() / 2 + view.getScroll().top, view.getCoordinateFromDate(date), 'Centered vertically');
        });
    });

    // #2372 - scrollToCoordinate bug
    t.it('Scroll to scheduler start works ok', function (t) {
        scheduler = t.getScheduler({
            renderTo : Ext.getBody()
        });

        t.chain(
            { waitForEventsToRender : scheduler },

            function (next) {
                t.firesOnce(scheduler.getSchedulingView(), 'itemclick');
                scheduler.scrollToDate(scheduler.getStart());
                next();
            },

            { click : '.sch-event' }
        )
    });

    t.it('Should handle all weekStartDay options', function (t) {
        var configs = [], i = 0;

        // Try a few of the presets using day or lower time unit
        Ext.Array.each([ 'hourAndDay', 'dayAndWeek', 'weekAndDayLetter' ], function (preset) {
            // Try all weekStartDay options
            for (var weekStartDay = 0; weekStartDay < 7; weekStartDay++) {

                for (var date = 0; date < 7; date++) {

                    // Try all week days as the startDate each weekStartDay option
                    configs.push({
                        weekStartDay  : weekStartDay,
                        startDate     : new Date(2014, 3, 6 + date),
                        startDateDate : date,
                        viewPreset    : preset
                    });
                }
            }
        });

        t.chain(
            Ext.Array.map(configs, function () {
                return function (next) {
                    var cfg   = configs[ i ];
                    scheduler = t.getScheduler(cfg);

                    t.expect(scheduler.getStartDate().getDay()).toBe(cfg.viewPreset === 'weekAndDayLetter' ? cfg.weekStartDay : cfg.startDateDate);
                    scheduler.destroy();

                    i++;

                    t.waitFor(10, next);
                }
            })
        )
    });
});

