Ext.define('App.view.Scheduler', {
    extend        : 'Sch.panel.SchedulerGrid',
    alias         : 'widget.scheduler',
    reference     : 'scheduler',
    // you can specify any date here, calendar view will adjust time axis accordingly
    startDate     : new Date(2016, 3, 11),
    endDate       : new Date(2016, 3, 17),
    startTime     : 6,
    endTime       : 19,
    resourceStore : 'resource',
    eventStore    : 'event',
    style         : 'border: 1px solid #d0d0d0;',

    showTodayLine : true,

    calendarViewPreset   : 'week',
    mode                 : 'calendar',
    eventResizeHandles   : 'end',
    eventBodyTemplate    : '{Name}',
    snapToIncrement      : true,
    highlightCurrentTime : true,
    calendarTimeAxisCfg  : {
        height : 30
    },

    eventRenderer : function (event, resource, data) {
        data.style = 'border-color:' + resource.get('Color');

        return event.data;
    },

    onEventCreated : function (newEventRecord) {
        // Overridden to provide some defaults before adding it to the store
        newEventRecord.set({
            Name       : "New task",
            ResourceId : 'r0'
        });

        this.getEventSelectionModel().select(newEventRecord);
    }
});