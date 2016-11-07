Ext.define('App.view.SchedulerDays', {
    extend      : 'App.view.Scheduler',
    requires  : [
        'App.view.SchedulerDaysController'
    ],

    alias       : 'widget.schedulerdays',
    reference   : 'schedulerdays',
    controller  : 'schedulerdays',

    // you can specify any date here, calendar view will adjust time axis accordingly
    startDate   : new Date(2016, 3, 11),
    endDate     : new Date(2016, 3, 16),

    // following two configs required to show any timespan desired
    timeAxis    : {
        autoAdjust  : false
    },
    calendarViewPreset  : 'day',

    calendarColumnClass : 'App.column.Day'
});