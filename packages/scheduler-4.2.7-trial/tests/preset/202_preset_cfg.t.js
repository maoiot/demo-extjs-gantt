describe('Pass preset to the scheduler as a config object', function (t) {
    var scheduler;

    t.beforeEach(function() {
        scheduler && scheduler.destroy();
    })

    t.it('Pass anonymous preset without name', function (t) {

        scheduler = t.getScheduler({
            viewPreset : {
                timeColumnWidth   : 35,
                rowHeight         : 47,
                displayDateFormat : 'G-i',
                shiftIncrement    : 3,
                shiftUnit         : "DAY",
                timeResolution    : {
                    unit      : "MINUTE",
                    increment : 35
                },
                defaultSpan       : 24,
                headerConfig      : {
                    middle : {
                        unit      : "HOUR",
                        increment : 12,
                        renderer  : function (startDate, endDate, headerConfig, cellIdx) {
                            return cellIdx;
                        }
                    }
                }
            },
            startDate  : new Date(2011, 0, 4),
            endDate    : new Date(2011, 0, 5),
            height     : 200,
            renderTo   : Ext.getBody()
        });

        t.waitForEventsToRender(scheduler, function () {
            t.is(scheduler.getSchedulingView().getTimeResolution().increment, 35);
            t.is(scheduler.getSchedulingView().getDisplayDateFormat(), 'G-i');
        });
    });

    t.it('Pass existing preset and modify config', function (t) {
        scheduler = t.getScheduler({
            viewPreset : {
                name         : 'hourAndDay',
                headerConfig : {
                    middle : {
                        unit      : "HOUR",
                        increment : 12,
                        renderer  : function (startDate, endDate, headerConfig, cellIdx) {
                            return cellIdx;
                        }
                    }
                }
            },
            startDate  : new Date(2011, 0, 4),
            endDate    : new Date(2011, 0, 5),
            height     : 200,
            renderTo   : Ext.getBody()
        });

        t.waitForEventsToRender(scheduler, function () {
            var myPreset = Sch.preset.Manager.getPreset('hourAndDay');
            t.ok(myPreset, 'Could register a new preset');

            var timeAxisColumn = scheduler.down('timeaxiscolumn')

            timeAxisColumn.el.select('.sch-header-row-middle td').each(function (td, ar, index) {
                t.like(td.dom.innerText, index, 'Content matches cellIndex ' + index);
            });
        });
    });
});
