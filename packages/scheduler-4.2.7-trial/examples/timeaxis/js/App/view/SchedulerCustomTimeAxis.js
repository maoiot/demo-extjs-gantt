Ext.define("App.view.SchedulerCustomTimeAxis", {
    extend : 'Sch.panel.SchedulerGrid',
    xtype  : 'customtimeaxis',

    requires : [
        'App.data.TimeAxis'
    ],

    viewPreset : 'workweek',
    rowHeight  : 40,

    // Custom time axis
    timeAxis : {
        xclass : 'App.data.TimeAxis'
    },

    resourceStore : 'resources',
    eventStore    : 'events',

    // Setup static columns
    columns : [
        { header : 'Name', sortable : true, width : 100, dataIndex : 'Name' }
    ],

    eventRenderer : function (ev) {
        return Ext.Date.format(ev.getStartDate(), 'G:i') + ' - ' + Ext.Date.format(ev.getEndDate(), 'G:i');
    },

    // Constrain events horizontally within their current day
    getDateConstraints : function (resourceRecord, eventRecord) {
        if (eventRecord) {
            var minDate, maxDate;

            if (eventRecord instanceof Date) {
                var date = eventRecord;
                var tick = this.timeAxis.getAt(Math.floor(this.timeAxis.getTickFromDate(date)));

                minDate = tick.data.start;
                maxDate = tick.data.end;
            } else {
                var constrainedStartDate = Sch.util.Date.max(eventRecord.getStartDate(), this.timeAxis.getStart());
                var constrainedEndDate   = Sch.util.Date.min(eventRecord.getEndDate(), this.timeAxis.getEnd());

                var minTick = this.timeAxis.getAt(Math.floor(this.timeAxis.getTickFromDate(constrainedStartDate)));
                var maxTick = this.timeAxis.getAt(Math.floor(this.timeAxis.getTickFromDate(constrainedEndDate)));

                minDate = minTick.data.start;
                maxDate = constrainedEndDate - this.timeAxis.getEnd() === 0 ? constrainedEndDate : maxTick.data.end;
            }

            return {
                start : minDate,
                end   : maxDate
            };
        }
    }
}, function() {
    Sch.preset.Manager.registerPreset('workweek', {
        displayDateFormat : 'G:i',
        shiftIncrement    : 1,
        shiftUnit         : "WEEK",
        timeResolution    : {
            unit      : "MINUTE",
            increment : 10
        },
        headerConfig      : {
            middle : {
                unit     : "DAY",
                renderer : function (start, end, cfg) {
                    cfg.headerCls = 'sch-hdr-startend';
                    return Ext.String.format('<span class="sch-hdr-start">{0}</span><span class="sch-hdr-end">{1}</span>', Ext.Date.format(start, 'G'), Ext.Date.format(end, 'G'));
                }
            },
            top    : {
                unit       : "DAY",
                dateFormat : 'D d M'
            }
        }
    });
});
