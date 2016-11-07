Ext.define("App.view.SchedulerCustomTimeAxis2", {
    extend : 'Sch.panel.SchedulerGrid',
    xtype  : 'customtimeaxis2',

    requires : [
        'App.data.TimeAxis'
    ],
    cls        : 'timeaxis2',
    viewPreset : 'workweek2',
    rowHeight  : 40,

    viewConfig : {
        stripeRows : false
    },
    
    // Custom time axis
    timeAxis : {
        xclass     : 'Sch.data.TimeAxis',
        continuous : false,

        generateTicks : function (start, end, unit, increment) {
            var ticks = [];

            while (start < end) {
                if (start.getHours() > 7 && start.getHours() < 22) {
                    ticks.push({
                        start : start,
                        end   : Sch.util.Date.add(start, Sch.util.Date.HOUR, 1)
                    });
                }

                start = Sch.util.Date.add(start, Sch.util.Date.HOUR, 1);
            }
            return ticks;
        }
    },

    resourceStore : 'resources',
    eventStore    : 'events',

    // Setup static columns
    columns : [
        { header : 'Name', sortable : true, width : 100, dataIndex : 'Name' }
    ]
}, function () {
    Sch.preset.Manager.registerPreset('workweek2', {
        displayDateFormat : 'G:i',
        timeColumnWidth   : 25,
        shiftIncrement    : 1,
        shiftUnit         : "WEEK",
        timeResolution    : {
            unit      : "MINUTE",
            increment : 60
        },
        headerConfig      : {
            middle : {
                unit       : "HOUR",
                align      : 'center',
                dateFormat : 'G'
            },
            top    : {
                unit       : "DAY",
                align      : 'center',
                dateFormat : 'D Y-m-d'
            }
        }
    });
});
