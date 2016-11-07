/* global App */
Ext.ns('App');

Ext.Loader.setConfig({enabled: true, disableCaching: true});
Ext.Loader.setPath('Ext.ux', 'http://www.bryntum.com/examples/extjs-6.0.1/packages/ux/classic/src');
Ext.Loader.setPath('Sch', '../../js/Sch');
Ext.Loader.setPath('Sch.plugin.ExcelExport', 'Sch.plugin.ExcelExport.js');

Ext.require([
    'Ext.grid.Panel',
    'Sch.plugin.ExcelExport',
    'Sch.panel.SchedulerGrid'
]);

Ext.onReady(function () {
    App.Scheduler.init();
});

App.Scheduler = {

    // Initialize application
    init: function () {
        // Store holding all the resources
        var resourceStore = new Sch.data.ResourceStore({
            data: [
                {Id: 'r1', Name: 'Mike'},
                {Id: 'r2', Name: 'Linda'},
                {Id: 'r3', Name: 'Don'},
                {Id: 'r4', Name: 'Karen'},
                {Id: 'r5', Name: 'Doug'},
                {Id: 'r6', Name: 'Peter'}
            ]
        });

        // Store holding all the events
        var eventStore = new Sch.data.EventStore({
            proxy: {
                type: 'ajax',
                url : 'dummydata.js'
            }
        });

        var eventList = new Ext.grid.Panel({
            height : 200,
            width  : 200,
            store  : eventStore,
            region : 'east',
            split  : true,
            // Setup static columns
            columns: [
                {
                    header   : 'Starts',
                    sortable : true,
                    width    : 90,
                    dataIndex: 'StartDate',
                    xtype    : 'datecolumn',
                    format   : 'Y-m-d',
                    field    : {xtype: 'datefield', format: 'Y-m-d'}
                },
                {header: 'Name', sortable: true, flex: 1, dataIndex: 'Name', field: {xtype: 'textfield'}}
            ],

            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
            ]
        });

        var g = Ext.create("Sch.panel.SchedulerGrid", {
            eventResizeHandles: 'none',
            enableDragCreation: false,
            startDate         : new Date(2017, 2, 2),
            endDate           : new Date(2017, 2, 12),
            viewPreset        : 'weekAndDayLetter',
            rowHeight         : 32,
            split             : false,
            region            : 'center',

            // Setup static columns
            columns      : [
                {header: 'Name', sortable: true, width: 100, dataIndex: 'Name'}
            ],
            forceFit     : true,
            plugins      : new Sch.plugin.ExcelExport(),
            resourceStore: resourceStore,
            eventStore   : eventStore
        });

        eventStore.load();

        Ext.widget({
            xtype   : 'panel',
            title   : 'Schedule',
            layout  : 'border',
            height  : ExampleDefaults.height,
            width   : ExampleDefaults.width,
            renderTo: 'example-container',
            items   : [
                eventList,
                g
            ],

            tools: [
                {
                    xtype  : 'button',
                    text   : 'Export to Excel',
                    iconCls: 'x-fa fa-file-excel-o',
                    handler: function (btn) {
                        g.exportToExcel();
                    }
                }
            ]
        });
    }
};
