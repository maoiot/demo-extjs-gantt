StartTest(function (t) {
    t.it('Ticks should have equal width', function (t) {
        Sch.preset.Manager.registerPreset('myPreset', {
            timeColumnWidth: 20,
            rowHeight: 24,          // Only used in horizontal orientation
            resourceColumnWidth: 100,  // Only used in vertical orientation
            displayDateFormat: 'G:i',
            shiftUnit: "DAY",
            shiftIncrement: 1,
            defaultSpan: 1,       // By default, show 1 week
            timeResolution: {
                unit: "HOUR",
                increment: 8
            },
            headerConfig: {
                bottom: {
                    unit: "HOUR",
                    increment: 8,
                    dateFormat: 'G'
                },
                middle: {
                    unit: "DAY",
                    dateFormat: 'd M Y',
                    align: 'left'
                }
            }
        });

        var scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            autoAdjustTimeAxis  : false,
            startDate   : new Date(2010, 0, 10, 7),
            endDate     : new Date(2010, 0, 13),
            viewPreset  : 'myPreset'
        });
        
        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                var tickEl = scheduler.el.down('.sch-header-row-bottom td');
                t.is(tickEl.getWidth(), scheduler.timeAxisViewModel.getTickWidth(), 'First tick has correct width');
            }
        );
    });
});