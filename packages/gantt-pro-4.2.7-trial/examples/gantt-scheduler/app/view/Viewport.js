/* globals MyApp */
Ext.define("MyApp.view.Viewport", {
    extend                  : 'Ext.Viewport',
    layout                  : 'border',
    requires                : [
        'MyApp.view.ResourceSchedule',
        'MyApp.view.Gantt',
        'MyApp.view.ResourceList',
        'MyApp.view.ResourceHistogram',
        'MyApp.model.Resource',
        'Gnt.data.CalendarManager',
        'Gnt.data.CrudManager'
    ],

    initComponent : function() {

        this.taskStore  = new MyApp.store.TaskStore({
            calendarManager : new Gnt.data.CalendarManager({ calendarClass : 'Gnt.data.calendar.BusinessTime' })
        });

        var cm          = new Gnt.data.CrudManager({
            autoLoad    : true,
            taskStore   : this.taskStore,
            transport   : {
                load    : {
                    url     : 'data/data.js'
                },
                sync    : {
                    url     : 'TODO'
                }
            }
        });

        this.gantt          = new MyApp.view.Gantt({
            id              : 'ganttchart',
            crudManager     : cm,
            startDate       : new Date(2010, 0, 11)
        });

        Ext.apply(this, {
            items : [
                {
                    xtype : 'navigation',
                    id    : 'navigation'
                },
                {
                    xtype   : 'container',
                    itemId  : 'maincontainer',
                    region  : 'center',
                    layout  : { type : 'vbox', align : 'stretch' },
                    items   : this.gantt
                },
                {
                    xtype     : 'settings',
                    rowHeight : this.gantt.getRowHeight()
                },
                {
                    xtype  : 'details',
                    details: '<h3>Resource histogram demo</h3>' +
                    '<p>This examples integrates Ext Gantt with Ext Scheduler.</p>' +
                    '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
                }
            ]
        });

        this.callParent(arguments);
    }
});