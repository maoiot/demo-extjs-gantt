/* global App:true */
Ext.ns('App');

//Ext.Loader.setConfig({enabled: true, disableCaching : false });
//Ext.Loader.setPath('Sch', '../../js/Sch');
//Ext.Loader.setPath('Gnt', '../../js/Gnt');
Ext.Loader.setPath('App', 'app');

Ext.require([
    'App.view.DemoGanttPanel'
]);

Ext.onReady(function () {
    Ext.QuickTips.init();

    App.Gantt.init();
});

App.Gantt = {

    // Initialize application
    init: function () {
        this.gantt = this.createGantt();

        Ext.create("Ext.Viewport", {
            layout: 'border',
            items : [
                this.gantt, {
                    xtype  : 'details',
                    details: '<h3>Scheduling modes demo</h3>' +
                    '<p>This is a more advanced example demonstrating various scheduling modes supported by Gantt component:</p>' +
                    '<ul style="list-style:disc;padding-left:20px">' +
                    '<li><b>Manual</b> - task bypasses any holidays/availability rules, user can manually specify any start/end date for it</li>' +
                    '<li><b>Normal</b> - backward compatibility mode with Gantt 2.0.x, task only takes into account full days (holidays/weekends), but not hours. Resource calendars does not affect task schedule</li>' +
                    '<li><b>Fixed duration</b> - scheduling mode with fixed duration (the effort of task will change when assigning/removing resources)</li>' +
                    '<li><b>Effort driven</b> - scheduling mode with fixed effort (the duration of task will change when assigning/removing resources)</li>' +
                    '<li><b>Dynamic assignment</b> - scheduling mode with fixed duration and effort (the resources allocation will change when assigning/removing resources)</li>' +
                    '</ul>' +
                    '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
                }
            ]
        });
    },

    createGantt: function () {


        Sch.preset.Manager.registerPreset("weekAndDayNarrow", {
            timeColumnWidth    : 35,
            rowHeight          : 24,          // Only used in horizontal orientation
            resourceColumnWidth: 100,  // Only used in vertical orientation
            displayDateFormat  : 'Y-m-d',
            shiftUnit          : "WEEK",
            shiftIncrement     : 1,
            defaultSpan        : 1,       // By default, show 1 week
            timeResolution     : {
                unit     : "DAY",
                increment: 1
            },
            headerConfig       : {
                bottom: {
                    unit      : "DAY",
                    increment : 1,
                    dateFormat: 'd'
                },
                middle: {
                    unit      : "WEEK",
                    dateFormat: 'D d M',
                    align     : 'left'
                }
            }
        });

        var resourceStore = Ext.create("Gnt.data.ResourceStore", {
            data: [
                {"Id": 1, "Name": "Mats"},
                {"Id": 2, "Name": "Nickolay"},
                {"Id": 3, "Name": "Goran"},
                {"Id": 4, "Name": "Alex"},
                {"Id": 5, "Name": "Jakub"},
                {"Id": 7, "Name": "Juan"}
            ]
        });

        var assignmentStore = Ext.create("Gnt.data.AssignmentStore", {
            resourceStore: resourceStore,
//            proxy           : {
//                method  : 'GET',
//                type    : 'ajax',
//                api     : {
//                    read : 'assignmentdata.js'
//    //                uncomment and provide your urls to hook with server-side
//    //                ,
//    //                create : 'create.php',
//    //                update : 'update.php',
//    //                destroy : 'delete.php'
//                },
//                reader : {
//                    type : 'json',
//                    rootProperty : 'assignments'
//                }
//            },

            data: [
                {
                    "Id"        : 1,
                    "TaskId"    : 1,
                    "ResourceId": 1,
                    "Units"     : 100
                },
                {
                    "Id"        : 2,
                    "TaskId"    : 1,
                    "ResourceId": 2,
                    "Units"     : 50
                },
                {
                    "Id"        : 3,
                    "TaskId"    : 2,
                    "ResourceId": 2,
                    "Units"     : 50
                },
                {
                    "Id"        : 4,
                    "TaskId"    : 4,
                    "ResourceId": 4,
                    "Units"     : 50
                },
                {
                    "Id"        : 5,
                    "TaskId"    : 6,
                    "ResourceId": 5,
                    "Units"     : 50
                }
            ]

//            ,
//            listeners : {
//                load : function() {
//                    // this is how you can load your stores from a single data package
//                    resourceStore.loadData(this.proxy.reader.jsonData.resources);
//                }
//            }
        });


        var calendar = Ext.create('Gnt.data.calendar.BusinessTime', {
            calendarId: 'Project',
            data      : [
                // will affect Task2 - weekend will be working day with non-standard availability
                {
                    Id          : 1,
                    Date        : new Date(2011, 6, 16),
                    Availability: ['11:00-16:00', '17:00-20:00']
                },
                {
                    Id          : 2,
                    Date        : new Date(2011, 6, 17),
                    Availability: ['12:00-16:00']
                }
            ]
        });

        var taskStore = Ext.create("Gnt.data.TaskStore", {
            sorters : 'StartDate',
            calendar: calendar,
            proxy   : {
                type  : 'ajax',
                method: 'GET',
                url   : 'data/tasks.json',
                reader: 'json'
            }
        });

        var dependencyStore = Ext.create("Gnt.data.DependencyStore", {
            autoLoad: true,
            proxy   : {
                type  : 'ajax',
                url   : 'data/dependencies.json',
                method: 'GET',
                reader: 'json'
            }
        });

        var gantt = Ext.create("App.view.DemoGanttPanel", {
            title           : 'Scheduling modes demo',
            region          : 'center',
            selModel        : new Ext.selection.TreeModel({ignoreRightMouseSelection: false, mode: 'MULTI'}),

            taskStore      : taskStore,
            dependencyStore: dependencyStore,
            resourceStore  : resourceStore,
            assignmentStore: assignmentStore,

            //snapToIncrement : true,    // Uncomment this line to get snapping behavior for resizing/dragging.

            startDate: new Date(2011, 5, 28),
            endDate  : new Date(2011, 6, 30),

            viewPreset: 'weekAndDayNarrow'
        });

        return gantt;
    }
};

