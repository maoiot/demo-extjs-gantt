Ext.ns('App');

//Ext.Loader.setConfig({ enabled : true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../js/Sch');

//Ext.require([
//    'Sch.panel.SchedulerGrid',
//    'Sch.plugin.TimeGap'
//]);

Ext.onReady(function () {
    App.Scheduler.init();
});

App.Scheduler = {

    // Initialize application
    init: function () {
        this.grid = this.createGrid();

        this.grid.store.loadData([
            {Id: 'r1', Name: 'Mike', Color: '#167abc'},
            {Id: 'r2', Name: 'Linda', Color: '#03b4d5'},
            {Id: 'r3', Name: 'Don', Color: '#925e8b'},
            {Id: 'r4', Name: 'Karen', Color: '#9cc96b'},
            {Id: 'r5', Name: 'Doug', Color: '#ffc107'},
            {Id: 'r6', Name: 'Peter', Color: '#e44959'}
        ]);

        this.grid.eventStore.load();
    },

    renderer: function (item, r, tplData, row, col, ds, index) {
        tplData.style = 'background-color:' + r.get('Color');
        return item.get('Name');
    },

    createGrid: function () {
        Ext.define('Person', {
            extend: 'Sch.model.Resource',
            fields: [
                {name: 'Color'}
            ]
        });

        Ext.define('Assignment', {
            extend: 'Sch.model.Event'
        });

        var start = new Date(2010, 7, 14);

        // Store holding all the resources
        var resourceStore = new Sch.data.ResourceStore({
            idProperty: 'Id',
            model     : 'Person'
        });

        // Store holding all the events
        var eventStore = new Sch.data.EventStore({
            model: 'Assignment',
            proxy: {
                type: 'ajax',
                url : 'data.js'
            }
        });

        var g = Ext.create("Sch.panel.SchedulerGrid", {
            height            : ExampleDefaults.height,
            width             : ExampleDefaults.width,
            renderTo          : 'example-container',
            eventResizeHandles: 'both',
            startDate         : new Date(2017, 7, 14),
            endDate           : new Date(2017, 7, 21),
            viewPreset        : 'dayAndWeek',
            eventRenderer     : this.renderer,
            loadMask          : true,
            split             : false,
            title             : 'Assignments',
            rowHeight         : 36,
            viewConfig : {
                stripeRows : false  
            },
            // Setup static columns
            columns           : [
                {
                    header   : 'Name',
                    width    : 100,
                    xtype    : 'templatecolumn',
                    dataIndex: 'Name',
                    tpl      : '<div class="row-colorbox" style="background-color:{Color}"></div>{Name}'
                }
            ],

            plugins      : [new Sch.plugin.TimeGap({
                getZoneCls: function (start, end) {
                    if (Sch.util.Date.getDurationInDays(start, end) >= 2) {
                        return 'long-unallocated-slot';
                    }
                }
            })],
            resourceStore: resourceStore,
            eventStore   : eventStore,

            tools: [
                {
                    xtype  : 'button',
                    iconCls: 'fa fa-arrow-circle-left',
                    handler: function () {
                        g.shiftPrevious();
                    }
                },
                {
                    xtype  : 'button',
                    iconCls: 'fa fa-arrow-circle-right',
                    handler: function () {
                        g.shiftNext();
                    }
                }
            ]
        });

        return g;
    }
};
