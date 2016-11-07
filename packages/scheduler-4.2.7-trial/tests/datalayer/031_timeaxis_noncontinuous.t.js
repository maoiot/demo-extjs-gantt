StartTest(function(t) {
    t.it('timeSpanInAxis works ok', function (t) {
        var ta = new Sch.data.TimeAxis({
            continuous : false
        });

        ta.reconfigure({
            unit    : Sch.util.Date.DAY,
            start   : new Date(2012, 2, 25),
            end     : new Date(2012, 2, 26)
        });

        t.ok(ta.timeSpanInAxis(new Date(2012, 2, 25), new Date(2012, 2, 26)), 'Time span matching time axis start end should be "in axis"');
        t.ok(ta.timeSpanInAxis(new Date(2012, 2, 24), new Date(2012, 2, 26)), 'Time span starting before time axis start should be "in axis"');
        t.ok(ta.timeSpanInAxis(new Date(2012, 2, 25), new Date(2012, 2, 27)), 'Time span ending after time axis end should be "in axis"');
        t.ok(ta.timeSpanInAxis(new Date(2012, 2, 24), new Date(2012, 2, 27)), 'Time span starting before and ending after time axis end should be "in axis"');
    });

    t.it('timeSpanInAxis works ok for generated ticks', function (t) {
        var startHour = 8,
            endHour = 17;

        t.expectGlobal('Test');

        Ext.define('Test.datalayer.TimeAxis', {
            extend    : "Sch.data.TimeAxis",
            continuous: false,

            generateTicks: function (start, end, unit, increment) {
                var ticks = [];
                while (start < end) {
                    if (start.getHours() >= startHour && start.getHours() <= endHour) {
                        ticks.push({
                            start: start,
                            end  : Sch.util.Date.add(start, Sch.util.Date.HOUR, 1)
                        });
                    }
                    start = Sch.util.Date.add(start, Sch.util.Date.HOUR, 1);
                }
                return ticks;
            }
        });

        var start = new Date(2010, 0, 1),
            end = new Date(2010, 0, 3);

        var ta = Ext.create('Test.datalayer.TimeAxis', {
            start : start,
            end : end
        });

        while (start < end) {
            if (start.getHours() >= startHour && start.getHours() <= endHour) {
                t.ok(ta.dateInAxis(start), 'Date in axis: ' + start);
            } else {
                t.notOk(ta.dateInAxis(start), 'Date not in axis:' + start);
            }
            start = Sch.util.Date.add(start, Sch.util.Date.HOUR, 1);
        }
    });
});
