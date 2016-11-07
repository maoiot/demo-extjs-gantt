StartTest(function (t) {
    var scheduler;

    var testingScenario = function (t, config) {

        t.beforeEach(function () {
            scheduler && scheduler.destroy();

            scheduler = t.getScheduler(Ext.apply({
                renderTo : Ext.getBody()
            }, config));
        });

        // 0 < x < 1
        var WIDTH_APPROXIMATION = 0.15;
        // dispertion from center
        var TIME_APPROXIMATION  = 2;

        t.it('`zoomToSpan` should work #1', function (t) {

            var dates = [
                { start: new Date(2001, 0, 1), end: new Date(2031, 0, 2) },
                { start: new Date(2001, 0, 1), end: new Date(2021, 0, 2) },
                { start: new Date(2001, 0, 1), end: new Date(2011, 0, 2) },
                { start: new Date(2001, 0, 1), end: new Date(2005, 0, 2) },

                { start: new Date(2001, 0, 1), end: new Date(2001, 11, 1) },
                { start: new Date(2001, 0, 1), end: new Date(2001, 5, 1) },

                { start: new Date(2001, 0, 1), end: new Date(2001, 0, 31) },
                { start: new Date(2001, 0, 1), end: new Date(2001, 0, 21) },
                { start: new Date(2001, 0, 1), end: new Date(2001, 0, 11) },

                { start: new Date(2001, 0, 1, 0), end: new Date(2001, 0, 1, 23) },
                { start: new Date(2001, 0, 1, 0), end: new Date(2001, 0, 1, 18) },
                { start: new Date(2001, 0, 1, 0), end: new Date(2001, 0, 1, 6) },

                { start: new Date(2001, 0, 1, 0), end: new Date(2001, 0, 1, 0, 50) },
                { start: new Date(2001, 0, 1, 0), end: new Date(2001, 0, 1, 0, 30) },
                { start: new Date(2001, 0, 1, 0), end: new Date(2001, 0, 1, 0, 10) },

                { start: new Date(2001, 0, 1), end: new Date(2001, 0, 2) },

                // testing summer/winter time in Russia
                { start: new Date(2001, 2, 25), end: new Date(2001, 3, 25) },
                { start: new Date(2001, 2, 25, 1), end: new Date(2001, 2, 25, 5) },
                { start: new Date(2001, 2, 25, 1, 30), end: new Date(2001, 2, 25, 5, 30) },
                { start: new Date(2001, 2, 25, 1, 45), end: new Date(2001, 2, 25, 5, 1) },
                { start: new Date(2001, 2, 25, 1, 59), end: new Date(2001, 2, 25, 5, 1) },

                { start: new Date(2010, 1, 15), end: new Date(2013, 6, 15) }
            ];

            var timeAxisViewModel = scheduler.timeAxisViewModel,
                width = timeAxisViewModel.getAvailableWidth(),
                level, level1,
                visibleStart, visibleStart1,
                visibleEnd, visibleEnd1,
                centerDate;

            var steps = [{ waitForEventsToRender : scheduler }];

            var generateStep = function (start, end) {
                return [
                    function (next) {
                        t.diag('Testing the following span: ' + start + '--' + end);

                        level = scheduler.zoomToSpan({
                            start   : start,
                            end     : end
                        });

                        next();
                    },

                    { waitForColumnLinesSynced : scheduler },

                    function (next) {
                        visibleStart    = timeAxisViewModel.getPositionFromDate(start);
                        visibleEnd      = timeAxisViewModel.getPositionFromDate(end);
                        centerDate      = scheduler.getViewportCenterDate();

                        t.isApprox(
                            centerDate,
                            new Date((start.getTime() + end.getTime()) / 2),
                            scheduler.getMilliSecondsPerPixelForZoomLevel(scheduler.zoomLevels[ level ]) * TIME_APPROXIMATION,
                            'Timespan centered correctly'
                        );
                        t.isApprox(visibleEnd - visibleStart, width, width * WIDTH_APPROXIMATION, 'Selected span takes at least 80% of the view');

                        t.waitForEvent(scheduler.getSchedulingView(), 'refresh', next);

                        // zoom second time to be sure nothing has changed
                        level1          = scheduler.zoomToSpan({
                            start   : start,
                            end     : end
                        });
                    },

                    { waitForColumnLinesSynced: scheduler },

                    function (next) {
                        visibleStart1   = timeAxisViewModel.getPositionFromDate(start);
                        visibleEnd1     = timeAxisViewModel.getPositionFromDate(end);

                        t.isApprox(
                            scheduler.getViewportCenterDate(),
                            centerDate,
                            scheduler.getMilliSecondsPerPixelForZoomLevel(scheduler.zoomLevels[ level1 ]) * TIME_APPROXIMATION,
                            'Timespan centered correctly'
                        );

                        t.is(visibleStart1, visibleStart, 'Left position hasn\'t changed');
                        t.is(visibleEnd1, visibleEnd, 'Right position hasn\'t changed');
                        t.is(level1, level, 'Zooming level hasn\'t changed');

                        next();
                    }
                ]
            };

            Ext.each(dates, function (date) {
                steps.push.apply(steps, generateStep(date.start, date.end));
            });

            t.chain(steps);
            // eof chain
        });
        // eof `zoomToSpan` should work #1

        t.it('zoomToSpan scenario 2', function (t) {

            t.chain(
                { waitForEventsToRender : scheduler },
                function () {
                    scheduler.zoomToSpan({ start: new Date(2001, 0, 1), end: new Date(2031, 0, 1) });

                    var timeAxisViewModel   = scheduler.timeAxisViewModel,
                        view                = scheduler.getSchedulingView(),
                        steps               = [],
                        level               = 1;

                    for (var i = 0; i < 10; i++) {
                        steps.push(
                            function (next) {
                                var scroll      = view.el.getScroll();

                                scheduler.columnLinesFeature.on('columnlinessynced', next, this, { single : true });

                                level = scheduler.zoomToSpan({
                                    start   : timeAxisViewModel.getDateFromPosition(scroll.left + 100),
                                    end     : timeAxisViewModel.getDateFromPosition(scroll.left + 101)
                                });

                                if (level === undefined) {
                                    scheduler.columnLinesFeature.un('columnlinessynced', next, this);
                                    next();
                                }
                            }
                        );
                    }

                    t.chain(steps)
                }
            );
        });
    };

    t.it('Zooming should work w/o infinite scroll', function (t) {
        testingScenario(t)
    }, 60000);

    t.it('Zooming should work w/ infinite scroll', function (t) {
        testingScenario(t, { infiniteScroll : true })
    }, 60000);
});
