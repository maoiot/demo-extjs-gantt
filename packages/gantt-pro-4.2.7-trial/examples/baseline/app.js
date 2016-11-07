//Ext.Loader.setConfig({enabled: true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../js/Sch');
//Ext.Loader.setPath('Gnt', '../../js/Gnt');

Ext.require([
    'Gnt.panel.Gantt',
    'Gnt.column.PercentDone',
    'Gnt.column.StartDate',
    'Gnt.column.EndDate',
    'Sch.plugin.TreeCellEditing',
    'Sch.plugin.Pan'
]);

Ext.onReady(function () {
    Ext.QuickTips.init();

    var start = new Date(2017, 0, 1),
        end = Sch.util.Date.add(start, Sch.util.Date.MONTH, 10);

    var taskStore = Ext.create("Gnt.data.TaskStore", {
        proxy: {
            type  : 'ajax',
            method: 'GET',
            url   : 'tasks.js',
            reader: {
                type: 'json'
            }
        }
    });

    var dependencyStore = Ext.create("Gnt.data.DependencyStore", {
        autoLoad: true,
        proxy   : {
            type  : 'ajax',
            url   : 'dependencies.js',
            method: 'GET',
            reader: {
                type: 'json'
            }
        }
    });

    var g = Ext.create('Gnt.panel.Gantt', {
        region: 'center',
        title: 'Baseline demo',

        leftLabelField: 'Name',

        highlightWeekends       : false,
        showTodayLine           : true,
        enableBaseline          : true,
        baselineVisible         : true,
        enableDependencyDragDrop: false,

        rowHeight       : 30,
        eventBorderWidth: 0,

        loadMask: true,

        viewPreset: 'monthAndYear',

        startDate: start,
        endDate  : end,

        // Setup your static columns
        columns        : [
            {
                xtype: 'namecolumn',
                width: 200
            },
            {
                xtype: 'baselinestartdatecolumn'
            },
            {
                xtype: 'baselineenddatecolumn'
            }
        ],
        taskStore      : taskStore,
        dependencyStore: dependencyStore,

        plugins: [
            {
                ptype: 'scheduler_pan'
            }
        ],

        tbar: [
            {
                text        : 'Show baseline task bars',
                enableToggle: true,
                pressed     : true,
                handler     : function () {
                    g.el.toggleCls('sch-ganttpanel-showbaseline');
                }
            },
            {
                text   : 'Set new baseline',
                handler: function () {
                    taskStore.getRootNode().cascadeBy(function (node) {
                        node.beginEdit();
                        node.set('BaselineStartDate', node.getStartDate());
                        node.set('BaselineEndDate', node.getEndDate());
                        node.endEdit();
                    });
                }
            }
        ]
    });

    var viewport = new Ext.Viewport({
        layout: 'border',

        items: [
            g, {
                xtype  : 'details',
                details: '<h3>Baseline demo</h3>' +
                '<p>This example shows both the current plan and the original baseline.</p>' +
                '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
            }
        ]
    });
});
