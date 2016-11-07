/* global App */

Ext.application({
    name               : 'App',
    appFolder          : 'app',
    autoCreateViewPort : false,

    views : [
        'App.view.Scheduler'
    ],

    launch : function () {
        var lineStore = new Ext.data.Store({
            storeId : 'lines',
            fields  : [ { name : 'Date', type : 'date', dateFormat : 'c' } ]
        });

        var vp = new Ext.Viewport({
            layout : 'border',
            items  : [
                {
                    xtype   : 'component',
                    region  : 'north',
                    padding : 10,
                    html    : 'This example shows how you can have dependencies visualized between tasks by loading data into the DependencyStore.' +
                    '<p>Note that the js for the example code is not minified so it is readable. See <a href="app.js">app.js</a>.</p>'
                },
                {
                    xtype           : 'myscheduler',
                    region          : 'center',
                    startDate       : new Date(2016, 11, 1),
                    endDate         : new Date(2016, 11, 3),

                    crudManager     : {
                        autoLoad  : true,
                        dependencyStore : new Sch.data.DependencyStore(),
                        transport : {
                            load : {
                                url : 'data.json'
                            }
                        },
                        stores    : [
                            lineStore
                        ]
                    },
                    plugins         : {
                        ptype              : 'scheduler_lines',
                        showHeaderElements : true,
                        store              : lineStore
                    }
                }
            ]
        });
    }
});
