/* global App */
Ext.ns('App');

Ext.Loader.setConfig({enabled: true, disableCaching: true});

Ext.Loader.setPath('App', '.');
Ext.Loader.setPath('Sch.plugin', '.');

Ext.onReady(function () {
    Ext.QuickTips.init();
    App.Scheduler.init();
});

App.Scheduler = {
    // Bootstrap function
    init: function () {
        this.scheduler = this.createScheduler();
    },

    createScheduler: function () {
        var me = this;

        Ext.define('Resource', {
            extend: 'Sch.model.Resource',
            fields: [
                'Type'
            ]
        });

        Ext.define('Event', {
            extend: 'Sch.model.Event',

            fields: [
                'Deletable'
            ]
        });

        // Store holding all the resources
        var resourceStore = App.resourceStore = Ext.create("Sch.data.ResourceStore", {
            model   : 'Resource',
            sortInfo: {field: 'Name', direction: "ASC"},

            data: [
                {Id: 'a', Name: 'Rob', Type: 'Sales'},
                {Id: 'b', Name: 'Mike', Type: 'Sales'},
                {Id: 'c', Name: 'Kate', Type: 'Management'},
                {Id: 'd', Name: 'Lisa', Type: 'Developer'},
                {Id: 'e', Name: 'Dave', Type: 'Developer'},
                {Id: 'f', Name: 'Arnold', Type: 'Developer'},
                {Id: 'g', Name: 'Lee', Type: 'Sales'},
                {Id: 'h', Name: 'Jong', Type: 'Management'}
            ]
        });

        // Store holding all the events
        var eventStore = App.eventStore = Ext.create("Sch.data.EventStore", {
            model: 'Event',
            data : [
                { Id : 1, StartDate: new Date(2017, 5, 19, 8), EndDate: new Date(2017, 5, 19, 10), ResourceId: 'b' },
                { Id : 2, StartDate: new Date(2017, 5, 20, 8), EndDate: new Date(2017, 5, 20, 10), ResourceId: 'b' },
                { Id : 3, StartDate: new Date(2017, 5, 21, 8), EndDate: new Date(2017, 5, 21, 10), ResourceId: 'c' },
                { Id : 4, StartDate: new Date(2017, 5, 21, 11), EndDate: new Date(2017, 5, 21, 14), ResourceId: 'c' },
                { Id : 5, StartDate: new Date(2017, 5, 24, 10), EndDate: new Date(2017, 5, 24, 12), ResourceId: 'c' },
                { Id : 6, StartDate: new Date(2017, 5, 24, 14), EndDate: new Date(2017, 5, 24, 16), ResourceId: 'c' },
                { Id : 7, StartDate: new Date(2017, 5, 25, 14), EndDate: new Date(2017, 5, 25, 15), ResourceId: 'c' },
                { Id : 8, StartDate: new Date(2017, 5, 20, 10), EndDate: new Date(2017, 5, 20, 19), ResourceId: 'd', Cls : 'readonly' }
            ]
        });

        var editor = new Sch.plugin.CellPlugin({
            dateFormat: 'G'
        });


        editor.on({
            selectionchange : function (plug, selection) {
                Ext.getCmp('bottom-summary').update(selection.length + ' cells selected');
            },
            beforecelledit : function (editor, selection) {
                var startDate = selection[0].startDate;
                var eventRecord = selection[0].eventRecord;

                if (eventRecord) {
                    return eventRecord.getId() !== 8;
                } else {
                    return startDate < new Date(2017, 5, 22) || startDate > new Date(2017, 5, 23);
                }
            }
        });

        return App.sched = Ext.create("Sch.panel.SchedulerGrid", {
            renderTo     : 'example-container',
            height       : 500,
            width        : ExampleDefaults.width,
            rowHeight    : 30,
            title        : 'Scheduler Event Tools',
            resourceStore: resourceStore,
            eventStore   : eventStore,
            viewPreset   : {
                name            : 'weekAndDay',
                columnLinesFor  : 'bottom'
            },

            startDate    : new Date(2017, 5, 21),
            columnWidth  : 100,
            split        : false,
            bodyBorder   : false,

            viewConfig: {
                horizontalLayoutCls: 'Sch.eventlayout.Table'
            },

            columns: [
                {header: 'Staff', sortable: true, flex: 1, width: 200, dataIndex: 'Name'}
            ],

            eventResizeHandles : 'none',
            enableEventDragDrop: false,
            enableDragCreation : false,

            eventRenderer: function (eventRec, resourceRec, templateData) {
                templateData.cls = 'my-event';
                return Ext.Date.format(eventRec.getStartDate(), 'G:i') + ' - ' + Ext.Date.format(eventRec.getEndDate(), 'G:i');
            },

            plugins: [
                editor,
                {
                    ptype   : 'scheduler_zones',
                    store   : new Ext.data.Store({
                        model   : 'Sch.model.Range',
                        data    : [
                            { StartDate : new Date(2017, 5, 22), EndDate : new Date(2017, 5, 24) }
                        ]
                    })
                }
            ],

            dockedItems: [
                {
                    id         : 'bottom-summary',
                    dock       : 'bottom',
                    bodyPadding: 3,
                    height     : 30
                }
            ]
        });
    }
};