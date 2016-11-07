/*global App*/
//Ext.Loader.setConfig({ enabled : true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../js/Sch');

//Ext.require([
//    'Sch.panel.SchedulerGrid',
//    'Sch.plugin.Pan'
//]);

Ext.define('Resource', {
    extend    : 'Sch.model.Resource',
    idProperty: 'Id',
    fields    : [
        {name: 'Id'},
        {name: 'Name'},
        {name: 'Type'}
    ]
});

Ext.define('Event', {
    extend: 'Sch.model.Event',
    fields: [
        {name: 'ResourceId'},
        {name: 'StartDate', type: 'date', dateFormat: 'Y-m-d G:i'},
        {name: 'EndDate', type: 'date', dateFormat: 'Y-m-d G:i'}
    ]
});


window.App = {

    // Bootstrap function
    init: function () {
        this.grid = this.createGrid();

        this.grid.render('example-container');
    },

    createGrid: function () {

        // Store holding all the resources
        var resourceStore = new Sch.data.ResourceStore({
            idProperty: 'Id',
            model     : 'Resource'
        });

        resourceStore.loadData([
            {
                Id  : 1,
                Name: 'Rob',
                Type: 'Sales'
            },
            {
                Id  : 2,
                Name: 'Mike',
                Type: 'Sales'
            },
            {
                Id  : 3,
                Name: 'Kate',
                Type: 'Product manager'
            },
            {
                Id  : 4,
                Name: 'Lisa',
                Type: 'Developer'
            },
            {
                Id  : 5,
                Name: 'Dave',
                Type: 'Developer'
            },
            {
                Id  : 6,
                Name: 'Arnold',
                Type: 'Developer'
            },
            {
                Id  : 7,
                Name: 'Lee',
                Type: 'Marketing'
            },
            {
                Id  : 8,
                Name: 'Jong',
                Type: 'Marketing'
            }

        ]);

        // Store holding all the events
        var eventStore = new Sch.data.EventStore({
            model: 'Event',
            data : [   // Some inline dummy data
                {
                    ResourceId: 1,
                    Name      : 'Some task',
                    StartDate : '2010-05-22 10:00',
                    EndDate   : '2010-05-22 12:00',
                    Location  : 'Some office'
                },
                {
                    ResourceId: 2,
                    Name      : 'Some other task',
                    StartDate : '2010-05-22 13:00',
                    EndDate   : '2010-05-22 16:00',
                    Location  : 'Home office'
                },
                {
                    ResourceId: 3,
                    Name      : 'A basic task',
                    StartDate : '2010-05-22 9:00',
                    EndDate   : '2010-05-22 13:00',
                    Location  : 'Customer office'
                }
            ]
        });

        var start = new Date(2010, 4, 22, 6);
        var resourceMetaDataStore = new Sch.data.EventStore();
        var scheduler = new Sch.panel.SchedulerGrid({
            title             : 'Pan-plugin',
            height            : ExampleDefaults.height,
            width             : ExampleDefaults.width,
            enableDragCreation: false,
            // Setup view configuration
            startDate         : start,
            endDate           : Sch.util.Date.add(start, Sch.util.Date.HOUR, 24),
            viewPreset        : 'hourAndDay',
            rowHeight         : 70,
            split             : false,
            barMargin         : 20,
            border            : false,
            bodyBorder        : false,
            columns           : [
                {header: 'Staff', width: 130, dataIndex: 'Name'}
            ],

            resourceStore: resourceStore,
            eventStore   : eventStore,
            plugins      : [
                new Sch.plugin.Pan({
                    enableVerticalPan: true
                })
            ],

            // Output some meta data about the "cells" in the schedule
            resourceZones: resourceMetaDataStore
        });

        var data = [];

        resourceStore.each(function (resource) {
            scheduler.getTimeAxis().each(function (tick) {
                var value = Math.round(Math.random() * 10);

                data.push({
                    ResourceId: resource.getId(),
                    Name      : value < 5 ? '' : value,
                    StartDate : tick.get('start'),
                    EndDate   : tick.get('end'),
                    Cls       : value > 8 ? 'important' : ''
                });
            });
        });

        resourceMetaDataStore.loadData(data);

        return scheduler;
    }
};


Ext.onReady(function () {
    App.init();
});

