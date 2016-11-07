//Ext.Loader.setConfig({enabled: true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../js/Sch');
//Ext.Loader.setPath('Gnt', '../../js/Gnt');

Ext.require([
    'Gnt.panel.Gantt',
    'Gnt.column.PercentDone',
    'Gnt.column.StartDate',
    'Gnt.column.EndDate',
    'Gnt.plugin.Printable'
]);

Ext.onReady(function () {
    Ext.QuickTips.init();

    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    var start = new Date(2010, 0, 1),
        end = Sch.util.Date.add(start, Sch.util.Date.MONTH, 20);

    var taskStore = Ext.create("Gnt.data.TaskStore", {
        model: 'Gnt.model.Task',

        proxy: {
            type  : 'ajax',
            method: 'GET',
            url   : 'data/tasks.js',
            reader: {
                type: 'json'
            }
        }
    });

    var dependencyStore = Ext.create("Gnt.data.DependencyStore", {
        autoLoad: true,
        proxy   : {
            type  : 'ajax',
            url   : 'data/dependencies.js',
            method: 'GET',
            reader: {
                type: 'json'
            }
        }
    });

    var g = Ext.create('Gnt.panel.Gantt', {
        region           : 'center',
        title            : 'Ext Gantt Print Demo',
        eventBorderWidth : 0,
        border           : false,
        bodyBorder       : false,
        leftLabelField   : 'Name',
        highlightWeekends: false,
        loadMask         : true,
        viewPreset       : 'monthAndYear',
        startDate        : start,
        endDate          : end,
        rowHeight        : 31,
        
        // Setup your static columns
        columns        : [
            {
                xtype: 'namecolumn',
                width: 250
            }
        ],
        taskStore      : taskStore,
        dependencyStore: dependencyStore,
        tools           : [
            {
                xtype: 'button',
                iconCls: 'x-fa fa-print',
                text   : 'Print',
                handler: function () {
                    g.print();
                }
            }
        ],
        plugins        : new Gnt.plugin.Printable({
            exportDialogConfig: {
                showDPIField        : true,
                showColumnPicker    : true,
                showResizePicker    : false,
                dateRangeRestriction: false,
                stateful            : true,
                stateId             : 'gntprint'
            }
        })
    });

    var viewport = new Ext.Viewport({
        layout: 'border',

        items: [
            g, {
                xtype  : 'details',
                cls    : 'match-height-with-tools',
                details: '<h3>Ext Gantt Print Demo</h3>' +
                '<p>This example enables you to print the gantt chart by using a "printable" plugin.</p>' +
                '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
            }
        ]
    });
});
