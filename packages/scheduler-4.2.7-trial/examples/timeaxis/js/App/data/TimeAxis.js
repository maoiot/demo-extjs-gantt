Ext.define('App.data.TimeAxis', {
    extend     : "Sch.data.TimeAxis",
    continuous : false,

    generateTicks : function (start, end, unit, increment) {
        // Use our own custom time intervals for day time-axis
        if (unit === Sch.util.Date.DAY) {
            var ticks = [],
                intervalEnd;

            while (start < end) {
                if (start.getDay() === 5) {
                    // Fridays are lazy days, working 10am - 4pm
                    start.setHours(10);
                    intervalEnd = Sch.util.Date.add(start, Sch.util.Date.HOUR, 6);
                } else {
                    start.setHours(8);
                    intervalEnd = Sch.util.Date.add(start, Sch.util.Date.HOUR, 8);
                }

                ticks.push({
                    start : start,
                    end   : intervalEnd
                });
                start = Sch.util.Date.add(start, Sch.util.Date.DAY, 1);
            }
            return ticks;
        } else {
            return this.callParent(arguments);
        }
    }
});