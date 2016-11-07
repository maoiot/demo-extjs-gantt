//Ext.Loader.setConfig({enabled: true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../../ExtScheduler2.x/js/Sch');
//Ext.Loader.setPath('Gnt', '../../js/Gnt');

Ext.require([
    'Gnt.data.TaskStore',
    'Gnt.data.CrudManager',
    'Gnt.data.CalendarManager',
    'Gnt.data.calendar.BusinessTime',
    'Gnt.column.PercentDone',
    'Gnt.column.StartDate',
    'Gnt.column.EndDate',
    'Gnt.column.ResourceAssignment',
    'Gnt.column.Scale',
    'Sch.plugin.TreeCellEditing',
    'Gnt.panel.Gantt',
    'Gnt.panel.ResourceHistogram'
]);

Ext.onReady(function () {

    var taskStore = Ext.create('Gnt.data.TaskStore', {
        calendarManager: Ext.create('Gnt.data.CalendarManager', {
            // we will use BusinessTime calendars
            calendarClass: 'Gnt.data.calendar.BusinessTime'
        }),
        sorters        : [{
            property : 'leaf',
            direction: 'ASC'
        }]
    });

    var crudManager = Ext.create('Gnt.data.CrudManager', {
        autoLoad : true,
        taskStore: taskStore,
        transport: {
            load: {
                url: 'data/data.js'
            },
            sync: {
                url: 'TODO'
            }
        }
    });

    var cellEditing = Ext.create('Sch.plugin.TreeCellEditing', {
        clicksToEdit: 1
    });

    var gantt = Ext.create('Gnt.panel.Gantt', {
        title      : 'Resource histogram demo',
        flex       : 1,
        viewPreset : 'weekAndDayLetter',
        crudManager: crudManager,

        startDate        : new Date(2010, 0, 11),
        endDate          : Sch.util.Date.add(new Date(2010, 0, 11), Sch.util.Date.WEEK, 20),
        rowHeight        : 40,
        multiSelect      : true,
        viewConfig       : {
            stripeRows : false
        },
        lockedGridConfig : { width : 350 },

        border          : false,
        bodyBorder      : false,
        eventBorderWidth: 0,

        // Object with editor and dataIndex defined
        leftLabelField: {
            dataIndex: 'Name',
            editor   : {xtype: 'textfield'}
        },

        // ... or an object with editor and renderer defined
        rightLabelField: {
            dataIndex: 'Id',
            renderer : function (value, record) {
                return 'Id: #' + value;
            }
        },

        eventRenderer: function (task) {
            if (taskStore.getAssignmentStore().findExact('TaskId', task.data.Id) >= 0) {
                // This task has resources assigned, show a little icon
                return {
                    ctcls: 'resources-assigned'
                };
            }
        },

        highlightWeekends       : true,
        showTodayLine           : true,
        loadMask                : true,
        snapToIncrement         : true,
        plugins                 : [cellEditing, 'gantt_taskcontextmenu'],

        // Setup your static columns
        columns: [
            {
                xtype: 'namecolumn',
                width: 200
            },
            {
                text : 'Assigned Resources',
                width: 150,
                xtype: 'resourceassignmentcolumn'
            }
        ]
    });

    var histogram = Ext.create('Gnt.panel.ResourceHistogram', {
        flex                : 1,
        crudManager         : crudManager,
        viewPreset          : 'weekAndDayLetter',
        partnerTimelinePanel: gantt,
        labelMode           : 'units',
        // showScaleLines      : true,
        scaleMax            : 8,
        scaleStep           : 1,
        scaleLabelStep      : 4,
        viewConfig  : {
            stripeRows : false
        },
        listeners           : {
            barclick      : function (panel, context, ev) {
                // console.log('barclick', panel, context, ev);
            },
            bardblclick   : function (panel, context, ev) {
                // console.log('bardblclick', panel, context, ev);
            },
            barcontextmenu: function (panel, context, ev) {
                // console.log('barcontextmenu', panel, context, ev);
            }
        }
    });

    var viewport = new Ext.Viewport({
        layout: 'border',

        items: [
            {
                region: 'center',
                layout: {
                    type : 'vbox',
                    align: 'stretch'
                },
                items : [
                    gantt,
                    histogram
                ]
            }, {
                xtype  : 'details',
                details: '<h3>Resource histogram demo</h3>' +
                '<p>This is a simple example showing a resource histogram which makes it easy to detect overallocation. ' +
                'You can change task start/end dates and assignments (by clicking resource column and selecting in the editor) to view how these changes affect the resource histogram.</p>' +
                '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
            }
        ]
    });
});
