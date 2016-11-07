Ext.define("App.view.Viewport", {
    extend: 'Ext.Viewport',
    xtype : 'mainviewport',

    requires: [
        'App.view.SchedulerCustomTimeAxis',
        'App.view.SchedulerCustomTimeAxis2',
        'App.view.SchedulerFilterableTimeAxis'
    ],

    layout: {
        type : 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype    : 'component',
            height   : 100,
            contentEl: 'example-description'
        },
        {
            xtype: 'tabpanel',
            flex : 1,
            items: [
                {
                    xtype    : 'customtimeaxis2',
                    split    : false,
                    title    : 'Scheduler with custom timeaxis #1',
                    startDate: new Date(2017, 1, 14),
                    endDate  : new Date(2017, 1, 19)
                },
                {
                    xtype    : 'customtimeaxis',
                    split    : false,
                    title    : 'Scheduler with custom timeaxis #2',
                    startDate: new Date(2017, 1, 14),
                    endDate  : new Date(2017, 1, 19)
                },
                {
                    xtype    : 'filterablescheduler',
                    split    : false,
                    title    : 'Scheduler with filterable timeaxis',
                    startDate: new Date(2017, 1, 14, 8),
                    endDate  : new Date(2017, 1, 19, 21)
                }
            ]
        }
    ]
});