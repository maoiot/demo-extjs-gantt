Ext.define("App.view.SchedulerFilterableTimeAxis", {
    extend     : 'Sch.panel.SchedulerGrid',
    xtype      : 'filterablescheduler',
    viewPreset : 'weekWithSummary',
    forceFit   : true,

    resourceStore : 'resources',
    eventStore    : 'events',
    rowHeight     : 40,

    columns : [
        { header : 'Name', sortable : true, width : 150, flex : 1, dataIndex : 'Name' }
    ],

    initComponent : function () {
        var me = this;

        Ext.apply(this, {
            // Setup static columns

            tbar : [
                {
                    toggleGroup : 'filter',
                    pressed     : true,
                    text        : 'Clear filter',
                    handler     : function () {
                        me.getTimeAxis().clearFilter();
                    }
                },
                {
                    toggleGroup : 'filter',
                    text        : 'Only weekdays',
                    handler     : function () {
                        me.getTimeAxis().filterBy(function (tick) {
                            return tick.start.getDay() !== 6 && tick.start.getDay() !== 0;
                        });
                    }
                },
                {
                    toggleGroup : 'filter',
                    text        : 'Only weekends',
                    handler     : function () {
                        me.getTimeAxis().filterBy(function (tick) {
                            return tick.start.getDay() === 6 || tick.start.getDay() === 0;
                        });
                    }
                },
                {
                    toggleGroup : 'filter',
                    text        : 'Only days with booked events',
                    handler     : function () {
                        me.getTimeAxis().filterBy(function (tick) {

                            return me.eventStore.queryBy(function (ev) {
                                    return Sch.util.Date.intersectSpans(ev.getStartDate(), ev.getEndDate(), tick.start, tick.end);
                                }).length > 0;

                        });
                    }
                }
            ]
        });

        this.callParent(arguments);

        // Refresh headers on changes to the eventStore, to show the amount of tasks
        // per day
        var timeAxisColumn = this.down('timeaxiscolumn');

        this.eventStore.on({
            add    : timeAxisColumn.refresh,
            remove : timeAxisColumn.refresh,
            update : timeAxisColumn.refresh,
            scope  : timeAxisColumn
        });
    },

    eventRenderer : function (ev) {
        return Ext.Date.format(ev.getStartDate(), 'Y-m-d');
    }

}, function() {

    Sch.preset.Manager.registerPreset('weekWithSummary', {
        timeColumnWidth     : 20,
        rowHeight           : 24,
        resourceColumnWidth : 100,
        displayDateFormat   : 'Y-m-d',
        shiftUnit           : "WEEK",
        shiftIncrement      : 1,
        defaultSpan         : 10,
        timeResolution      : {
            unit      : "HOUR",
            increment : 6
        },
        headerConfig        : {
            bottom : {
                unit     : 'DAY',
                align    : 'center',
                renderer : function (start, end, config, index, eventStore) {
                    return eventStore.getEventsInTimeSpan(start, end).length;
                }
            },
            middle : {
                unit     : 'DAY',
                align    : 'center',
                renderer : function (start) {
                    return Ext.Date.dayNames[start.getDay()].substring(0, 1);
                }
            },
            top    : {
                unit       : 'WEEK',
                dateFormat : 'D d M Y'
            }
        }
    });

});