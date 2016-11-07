Ext.ns('App');

//Ext.Loader.setConfig({ enabled : true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../js/Sch');

//Ext.require([
//    'Sch.panel.SchedulerGrid',
//    'Sch.plugin.DragSelector'
//]);

Ext.onReady(function () {
    App.Scheduler.init();
});


App.Scheduler = {

    // Bootstrap function
    init: function () {
        this.grid = this.createGrid();

        this.grid.render('example-container');
    },

    createGrid: function () {

        Ext.define('EventWithSubEvents', {
            extend: 'Sch.model.Event',
            fields: ['ParentId'],

            associations: [{
                type          : 'hasMany',
                model         : 'EventWithSubEvents',
                primaryKey    : 'Id',
                foreignKey    : 'ParentId',
                associationKey: 'SubEvents',
                name          : 'SubEvents'
            }, {
                type      : 'belongsTo',
                model     : 'EventWithSubEvents',
                primaryKey: 'Id',
                foreignKey: 'ParentId'
            }]
        });

        var resourceStore = Ext.create('Sch.data.ResourceStore', {
                data: [
                    {Id: 'a', Name: 'Rob', Type: 'Sales'},
                    {Id: 'b', Name: 'Mike', Type: 'Sales'},
                    {Id: 'c', Name: 'Kate', Type: 'Product manager'},
                    {Id: 'd', Name: 'Lisa', Type: 'Developer'},
                    {Id: 'e', Name: 'Dave', Type: 'Developer'},
                    {Id: 'f', Name: 'Arnold', Type: 'Developer'},
                    {Id: 'g', Name: 'Lee', Type: 'Marketing'},
                    {Id: 'h', Name: 'Jong', Type: 'Marketing'}
                ]
            }),

        // Store holding all the events
            eventStore = Ext.create('Sch.data.EventStore', {
                model: 'EventWithSubEvents',
                proxy: 'memory',
                data : [   // Some inline dummy data
                    {
                        ResourceId: 'a',
                        StartDate : '2017-05-22 10:00',
                        EndDate   : '2017-05-22 12:00'
                    },
                    {
                        ResourceId: 'b',
                        StartDate : '2017-05-22 13:00',
                        EndDate   : '2017-05-22 16:00'
                    },
                    {
                        ResourceId: 'c',
                        StartDate : '2017-05-22 09:00',
                        EndDate   : '2017-05-22 13:00'
                    },
                    {
                        Id        : 1,
                        ResourceId: 'a',
                        StartDate : '2017-05-22 06:00',
                        EndDate   : '2017-05-22 08:30',
                        SubEvents : [{
                            Id      : 11,
                            ParentId: 1,
                            Name    : 'Room preparation',
                            Offset  : 0,
                            Duration: 60
                        }, {
                            Id      : 12,
                            ParentId: 1,
                            Name    : 'Meeting',
                            Offset  : 60,
                            Duration: 82
                        }]
                    },
                    {
                        Id        : 2,
                        ResourceId: 'b',
                        StartDate : '2017-05-22 09:00',
                        EndDate   : '2017-05-22 15:20',
                        SubEvents : [{
                            Id      : 21,
                            ParentId: 2,
                            Name    : 'Fly to Vegas',
                            Offset  : 0,
                            Duration: 120
                        }, {
                            Id      : 22,
                            ParentId: 2,
                            Name    : 'Lunch',
                            Offset  : 150,
                            Duration: 60
                        }, {
                            Id      : 32,
                            ParentId: 3,
                            Name    : 'Hit casinos Slocum style',
                            Offset  : 210,
                            Duration: 162
                        }]
                    },
                    {
                        Id        : 3,
                        ResourceId: 'd',
                        StartDate : '2017-05-22 13:00',
                        EndDate   : '2017-05-22 18:00',
                        SubEvents : [{
                            Id      : 31,
                            ParentId: 3,
                            Name    : 'Visit Sencha',
                            Offset  : 0,
                            Duration: 60
                        }, {
                            Id      : 32,
                            ParentId: 3,
                            Name    : 'Hackathon',
                            Offset  : 60,
                            Duration: 180
                        }, {
                            Id      : 33,
                            ParentId: 3,
                            Name    : 'Beerathon',
                            Offset  : 240,
                            Duration: 52
                        }]
                    }
                ]
            });

        var subTpl = new Ext.XTemplate('<div class="subevent" style="left:{left}px;width:{width}px;height:{height}%;position:relative;">{name}</div>');

        var start = new Date(2017, 4, 22, 6);

        var g = new Sch.panel.SchedulerGrid({
            title    : 'DragSelector',
            width    : ExampleDefaults.width,
            height   : ExampleDefaults.height,
            rowHeight: 60,
            barMargin: 3,

            // Setup view configuration
            startDate    : start,
            endDate      : Sch.util.Date.add(start, Sch.util.Date.HOUR, 12),
            viewPreset   : 'hourAndDay',
            eventRenderer: function (ev, res, meta) {

                var subEvents = ev.SubEvents(),
                    view = g.getSchedulingView();

                if (subEvents && subEvents.getCount() > 0) {
                    // Custom css class for events with children
                    meta.cls = 'ev-withsubs';

                    var inner = '';
                    subEvents.each(function (sub) {
                        var startDate = Ext.Date.add(ev.data.StartDate, Ext.Date.MINUTE, sub.data.Offset),
                            endDate = Ext.Date.add(startDate, Ext.Date.MINUTE, sub.data.Duration),
                            left = view.getXFromDate(startDate);
                        inner += subTpl.apply({
                            name  : sub.data.Name,
                            left  : left - view.getXFromDate(ev.data.StartDate),
                            width : view.getXFromDate(endDate) - left,
                            height: 100 / subEvents.getCount()
                        });
                    });
                    return inner;
                }
            },
            dragConfig   : {enableCopy: true},
            multiSelect  : true,

            // Setup your static columns
            columns: [
                {header: 'Staff', width: 130, dataIndex: 'Name', flex: 1}
            ],

            resourceStore: resourceStore,
            eventStore   : eventStore,

            plugins: Ext.create("Sch.plugin.DragSelector"),

            bbar: [
                {
                    xtype: 'label',
                    id   : 'selectedTime',
                    text : 'No events selected'
                }
            ]
        });

        var sm = g.getEventSelectionModel();

        sm.on('selectionchange', function (sm, sel) {
            Ext.getCmp('selectedTime').setText(Ext.String.format("{0} {1} selected", sel.length, sel.length === 1 ? 'event' : 'events'));
        });
        return g;
    }
};
