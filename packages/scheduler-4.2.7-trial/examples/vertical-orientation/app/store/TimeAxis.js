Ext.define('Sch.examples.vertical.store.TimeAxis', {
    extend     : "Sch.data.TimeAxis",
    continuous : false,

    generateTicks : function (start, end, unit, increment) {
        // Use our own custom time intervals
        if (unit === Sch.util.Date.HOUR) {
            var ticks = [];

            var currentEnd;

            while (start < end) {
                currentEnd = Sch.util.Date.add(start, Sch.util.Date.HOUR, 1);

                if (start.getHours() >= 9 && start.getHours() <= 14) {
                    ticks.push({
                        start : start,
                        end   : currentEnd
                    });
                }
                start = currentEnd;
            }
            return ticks;
        } else {
            return this.callParent(arguments);
        }
    }
});