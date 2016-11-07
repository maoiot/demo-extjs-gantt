//Ext.Loader.setConfig({ enabled : true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../js/Sch');

//Ext.require([
//    'Sch.panel.SchedulerGrid',
//    'Sch.plugin.Printable'
//]);

Ext.onReady(function () {

    // create state provider to make export dialog fields remember their values
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    var resourceStore = Ext.create("Sch.data.ResourceStore", {
        sorters : 'Name'
    });

    var eventStore = Ext.create("Sch.data.EventStore");

    var crudManager = Ext.create("Sch.data.CrudManager", {
        autoLoad      : true,
        eventStore    : eventStore,
        resourceStore : resourceStore,
        transport   : {
            load    : {
                method  : 'GET',
                url     : 'data.js'
            },
            sync    : {
                url     : 'TODO'
            }
        }
    });

    var panel = new Ext.widget({
        xtype: 'schedulergrid',
        title: 'Work schedule',
        height: ExampleDefaults.height,
        width: ExampleDefaults.width,
        renderTo: 'example-container',

        readOnly: true,
        crudManager: crudManager,
        split: false,
        barMargin: 5,

        plugins: [
            new Sch.plugin.Printable({
                pluginId: 'printable',
                exportDialogConfig: {
                    showDPIField: true,
                    showColumnPicker: true,
                    dateRangeRestriction: false,
                    stateful: true
                }
            })
        ],
        rowHeight: 40,
        startDate: new Date(2010, 4, 27),
        endDate: new Date(2010, 5, 3),
        viewPreset: 'dayAndWeek',

        eventRenderer: function (eventRec, resourceRec, tplData, row) {
            if (row % 2 === 0) {
                tplData.cls = 'specialEventType';
            } else {
                tplData.cls = 'normalEvent';
            }

            return Ext.Date.format(eventRec.getStartDate(), 'M d');
        },

        // Setup static columns
        columns: [
            {header: 'Name', sortable: true, width: 100, dataIndex: 'Name'}
        ],

        resourceStore: resourceStore,
        eventStore: eventStore,

        tbar: [
            'This example shows you how you can print the chart content produced by Ext Scheduler.',
            '->',
            {
                iconCls: 'fa fa-print',
                text: 'Print',
                handler: function () {
                    panel.print();
                }
            }
        ]

    });
});

