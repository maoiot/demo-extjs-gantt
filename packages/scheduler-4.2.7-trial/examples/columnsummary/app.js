/* global App */

Ext.require([

]);

Ext.application({
    name               : 'App',
    appFolder          : 'app',
    autoCreateViewPort : false,

    views : [
        'App.view.Scheduler',
        'App.view.SchedulerWithCustomHeader'
    ],

    launch : function () {

        var vp = new Ext.Viewport({
            layout : 'border',
            items  : [
                {
                    region      : 'north',
                    height      : 100,
                    border      : true,
                    bodyBorder  : true,
                    bodyPadding : 10,
                    html        : 'This example shows you the Sch.plugin.SummaryColumn plugin which can show either the amount of time or the percentage allocated within the visible view.' +
                    '<p>Note that the js for the example code is not minified so it is readable. See <a href="app.js">app.js</a>.</p>'
                },
                {
                    xtype      : 'tabpanel',
                    region     : 'center',
                    items      : [
                        {
                            xtype     : 'myscheduler',
                            startDate : new Date(2017, 11, 1),
                            endDate   : new Date(2017, 12, 14)
                        },
                        {
                            xtype     : 'myschedulerwithcustomheader',
                            startDate : new Date(2017, 11, 1),
                            endDate   : new Date(2017, 12, 14)
                        }
                    ]
                }
            ]
        });
    }
});
