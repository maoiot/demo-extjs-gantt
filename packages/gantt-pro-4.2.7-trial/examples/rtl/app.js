/* global App */
Ext.ns('App');

//Ext.Loader.setConfig({enabled: true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../js/Sch');
//Ext.Loader.setPath('Gnt', '../../js/Gnt');

Ext.require([
    'Gnt.panel.Gantt',
    'Gnt.column.PercentDone',
    'Gnt.column.StartDate',
    'Gnt.column.EndDate',
    'Sch.plugin.TreeCellEditing'
]);

Ext.onReady(function () {
    App.Gantt.init();
});

// To workaround http://www.sencha.com/forum/showthread.php?299143-RTL-flag-not-propagated-to-child-components&p=1092329#post1092329
Ext.define('Sch.examples.RtlComponent', {
    override: 'Ext.Component',
    rtl     : true
});

App.Gantt = {

    // Initialize application
    init: function (serverCfg) {
        Ext.QuickTips.init();

        var taskStore = Ext.create("Gnt.data.TaskStore", {
            proxy: {
                type  : 'ajax',
                method: 'GET',
                url   : 'tasks.xml',
                reader: {
                    type        : 'xml',
                    // records will have a 'Task' tag
                    record      : ">Task",
                    rootProperty: "Tasks"
                }
            }
        });

        var dependencyStore = Ext.create("Gnt.data.DependencyStore", {
            autoLoad: true,
            proxy   : {
                type  : 'ajax',
                url   : 'dependencies.xml',
                method: 'GET',
                reader: {
                    type        : 'xml',
                    rootProperty: 'Links',
                    record      : 'Link' // records will have a 'Link' tag
                }
            }
        });

        var cellEditing = Ext.create('Sch.plugin.TreeCellEditing', {
            clicksToEdit: 1
        });

        var g = Ext.create('Gnt.panel.Gantt', {
            renderTo                : Ext.getBody(),
            region                  : 'center',
            title                   : 'RTL demo',
            leftLabelField          : 'Name',
            height                  : ExampleDefaults.height,
            width                   : ExampleDefaults.width,
            rtl                     : true,
            enableProgressBarResize : true,
            enableDependencyDragDrop: true,
            cascadeChanges          : false,
            startDate               : new Date(2010, 0, 11),
            endDate                 : Sch.util.Date.add(new Date(2010, 0, 11), Sch.util.Date.WEEK, 6),
            viewPreset              : 'weekAndDayLetter',
            eventBorderWidth        : 0,
            bodyBorder              : false,
            rowHeight               : 35,
            
            lockedGridConfig: {
                width: 200
            },

            eventRenderer: function (taskRecord) {
                return {
                    ctcls: taskRecord.get('Id') // Add a CSS class to the task element
                };
            },

            // Setup your static columns
            columns: [
                {
                    xtype: 'namecolumn',
                    width: 200
                },
                Ext.create('Gnt.column.StartDate'),
                Ext.create('Gnt.column.EndDate'),
                Ext.create('Gnt.column.PercentDone'),
                Ext.create('Gnt.column.AddNew')
            ],

            taskStore      : taskStore,
            dependencyStore: dependencyStore,
            plugins        : [cellEditing]
        });

        // var viewport = new Ext.Viewport({
        //     layout: 'border',

        //     items: [
        //         g, {
        //             xtype  : 'details',
        //             details: '<h3>RTL demo</h3>' +
        //             '<p>This example renders the Gantt chart in Right-To-Left mode. ' +
        //             'For this to work, you must also use the special RTL versions of Ext JS. See the HTML head section for details.</p>' +
        //             '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
        //         }
        //     ]
        // });

    }
};
