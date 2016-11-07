StartTest(function (t) {

    var testingScenario = function (t, config) {

        var scheduler, middleDate;

        t.beforeEach(function () {
            t.cq1('schedulergrid') && t.cq1('schedulergrid').destroy();

            scheduler       = t.getScheduler(Ext.apply({
                renderTo  : Ext.getBody()
            }, config));

            middleDate      = scheduler.getViewportCenterDate();
        });

        t.it('`setViewPreset` keeps the same central date when it`s called w/o a timespan provided', function (t) {

            t.waitForEventsToRender(scheduler, function () {
                // We enumerate view presets to check.
                // We don't check all the presets since we don't provide timespans to "setViewPreset"
                // and in this case it stays the same BUT the timeaxis makes roundation to week/month/year start/end
                // ..and sometimes the view simply cannot set proper central date because the date is naturally not in the  middle of the month or week etc.
                var presetsToAssert = ['hourAndDay', 'minuteAndHour', 'dayAndWeek'],
                    presetIndex     = -1,
                    async           = t.beginAsync();

                function assertViewPreset() {
                    // skip first step ..no setViewPreset call was made so far
                    if (presetIndex >= 0) {
                        // threshold 1hr
                        t.isApprox(scheduler.getViewportCenterDate(), middleDate, 60 * 60 * 1000, scheduler.viewPreset + ": Center date is kept the same");
                    }

                    presetIndex++;

                    if (presetIndex > presetsToAssert.length - 1) {
                        t.endAsync(async);
                        return;
                    }

                    t.waitForEvent(scheduler.columnLinesFeature, 'columnlinessynced', assertViewPreset);

                    scheduler.setViewPreset(presetsToAssert[presetIndex]);
                }

                assertViewPreset();
            });

        });
    };

    t.it('setViewPreset works w/o infinite scroll', function (t) {
        testingScenario(t);
    }, 60000);

    t.it('setViewPreset works w/ infinite scroll', function (t) {
        testingScenario(t, { infiniteScroll : true });
    }, 60000);
});
