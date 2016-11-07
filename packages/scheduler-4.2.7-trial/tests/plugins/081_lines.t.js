StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    t.it('Lines drawn correctly', function (t) {
        var lineStore = Ext.create('Ext.data.JsonStore', {
            fields : ['Date', 'Text', 'Cls'],
            data  : [
                {
                    Date : new Date(2011, 0, 4, 12),
                    Cls  : 'foo'
                },
                {
                    Date : new Date(2011, 0, 5, 12),
                    Cls  : 'foo'
                }
            ]
        });

        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            startDate   : new Date(2011, 0, 3),
            endDate     : new Date(2011, 0, 13),

            startTime   : 8,
            endTime     : 17,

            plugins     : {
                ptype               : 'scheduler_lines',
                renderingDoneEvent  : 'linesrendered',
                pluginId            : 'lines',
                store               : lineStore
            }
        });

        var view    = scheduler.getSchedulingView(),
            plugin  = scheduler.getPlugin('lines'),
            date, lineXY, item, region;

        t.chain(
            { waitForSelector : '.foo' },

            function (next, lineEls) {
                t.ok(lineEls.length === 2, 'Lines rendered ok, setting custom line CSS class works');

                lineXY = Ext.fly(lineEls[0]).getXY();
                t.hasCls(Ext.Element.fromPoint(lineXY[0], lineXY[1] + 1), 'foo', 'Lines rendered on top of schedule');

                date = scheduler.getSchedulingView().getDateFromXY(lineXY, 'round');
                t.isDateEqual(date, lineStore.first().get('Date'), 'Line rendered in correct place on the time axis');

                lineStore.add({
                    Date : new Date(2011, 0, 6),
                    Cls  : 'otherLineStyle'
                });

                next();
            },

            { waitForSelector : '.otherLineStyle' },

            function (next) {
                lineStore.first().set('Cls', 'Moooo');
                next();
            },

            { waitForSelector : '.Moooo' },

            function (next) {
                t.selectorExists('.otherLineStyle', 'Line was rendered');
                t.waitForEvent(plugin, 'linesrendered', next);
                scheduler.setMode('calendar');
            },

            { waitForSelector : '.Moooo' },

            function () {
                var els = scheduler.el.select('.sch-timeline');

                item = els.item(0);

                date = new Date(2011, 0, 4, 12);

                region = view.getTimeSpanRegion(date, date);

                t.is(item.getY(), view.getYFromDate(date, false), 'Correct vertical coordinate');
                t.isApprox(item.getX(), view.calendar.translateToPageCoordinate([region.x, region.y])[0], 1, 'Left coordinate is correct');
                t.isApprox(item.getWidth(), view.timeAxisViewModel.calendarColumnWidth, 2, 'Correct width');

                item = els.item(1);

                date = new Date(2011, 0, 5, 12);
                region = view.getTimeSpanRegion(date, date);

                t.is(item.getY(), view.getYFromDate(date, false), 'Correct vertical coordinate');
                t.isApprox(item.getX(), view.calendar.translateToPageCoordinate([region.x, region.y])[0], 1, 'Left coordinate is correct');
                t.isApprox(item.getWidth(), view.timeAxisViewModel.calendarColumnWidth, 2, 'Correct width');

                lineStore.add({
                    Date : new Date(2011, 0, 5),
                    Cls : 'testline'
                });

                t.waitFor(100, function() {
                    t.selectorNotExists('.testline', 'Line is not visible');
                })
            }
        );
    });

    t.it('Should draw today line', function (t) {
        var date = new Date();

        scheduler = t.getScheduler({
            renderTo        : Ext.getBody(),
            startDate       : Sch.util.Date.clearTime(date),
            endDate         : Ext.Date.add(Sch.util.Date.clearTime(date), 'd', 4),
            showTodayLine   : true
        });

        t.waitForSelector('.sch-todayLine', function () {
            date = scheduler.todayLinePlugin.store.getAt(0).get('Date');

            t.is(Sch.util.Date.clearTime(date), Sch.util.Date.clearTime(new Date()), 'Today line rendered');
        });
    });
});
