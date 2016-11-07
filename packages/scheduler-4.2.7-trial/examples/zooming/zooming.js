Ext.ns('App');

Ext.require([
    'Sch.panel.SchedulerGrid',
    'Sch.plugin.HeaderZoom'
]);

Ext.onReady(function () {
    App.Scheduler.init();
});

App.Scheduler = {

    // Initialize application
    init: function () {
        var resourceStore = Ext.create('Sch.data.ResourceStore', {
            data: [
                {Id: 'r1', Name: 'Mats'},
                {Id: 'r2', Name: 'Nick'},
                {Id: 'r3', Name: 'Jakub'},
                {Id: 'r4', Name: 'Tom'},
                {Id: 'r5', Name: 'Mary'}
            ]
        });

        var eventStore = Ext.create('Sch.data.EventStore', {
            data: [
                //To clearly see the seconds-length event the custom viewPreset should be added to zoomLevels
                {
                    ResourceId      : 'r1',
                    Name            : 'Seconds',
                    PercentAllocated: 20,
                    StartDate       : new Date(2017, 0, 1, 12, 10, 30),
                    EndDate         : new Date(2017, 0, 1, 12, 11)
                },
                {
                    ResourceId      : 'r2',
                    Name            : 'Minutes',
                    PercentAllocated: 30,
                    StartDate       : new Date(2017, 0, 1, 12, 10),
                    EndDate         : new Date(2017, 0, 1, 12, 15)
                },
                {
                    ResourceId      : 'r3',
                    Name            : 'Hours',
                    PercentAllocated: 40,
                    StartDate       : new Date(2017, 0, 1, 13),
                    EndDate         : new Date(2017, 0, 1, 16)
                },
                {
                    ResourceId      : 'r4',
                    Name            : 'Days',
                    PercentAllocated: 50,
                    StartDate       : new Date(2017, 0, 1, 8),
                    EndDate         : new Date(2017, 0, 4, 18)
                },
                {
                    ResourceId      : 'r5',
                    Name            : 'Months',
                    PercentAllocated: 60,
                    StartDate       : new Date(2017, 0, 1, 16),
                    EndDate         : new Date(2017, 1, 2, 13)
                }
            ]
        });

        var slider;

        var s = Ext.create("Sch.panel.SchedulerGrid", {
            height        : ExampleDefaults.height / 2 + 50,
            width         : ExampleDefaults.width,
            infiniteScroll: true,
            viewPreset    : 'hourAndDay',
            rowHeight     : 30,
            border        : false,
            bodyBorder    : false,

            startDate: new Date(2017, 0, 1, 6),
            endDate  : new Date(2017, 0, 2, 20),
            split    : false,

            columns: [
                {header: 'Name', sortable: true, width: 100, dataIndex: 'Name'}
            ],

            resourceStore: resourceStore,
            eventStore   : eventStore,

            listeners: {
                afterlayout: function () {
                    slider.setMinValue(s.minZoomLevel);
                    slider.setMaxValue(s.maxZoomLevel);

                    slider.setValue(s.getCurrentZoomLevelIndex());
                },

                single: true
            },

            tools: [
                {
                    xtype  : 'button',
                    text   : '-',
                    iconCls: 'x-fa fa-search-minus',
                    style  : 'margin-right: 5px',
                    handler: function () {
                        s.zoomOut();
                    }
                }, {
                    xtype  : 'button',
                    text   : '+',
                    iconCls: 'x-fa fa-search-plus',
                    style  : 'margin-right: 20px',
                    handler: function () {
                        s.zoomIn();
                    }
                }, {
                    xtype  : 'button',
                    text   : 'Min',
                    iconCls: 'x-fa fa-search-minus',
                    style  : 'margin-right: 5px',
                    handler: function () {
                        s.zoomOutFull();
                    }
                }, {
                    xtype  : 'button',
                    text   : 'Max',
                    iconCls: 'x-fa fa-search-plus',
                    style  : 'margin-right: 20px',
                    handler: function () {
                        s.zoomInFull();
                    }
                }, {
                    xtype: 'label',
                    text : 'Zoom out'
                },
                slider = new Ext.slider.SingleSlider({
                    style    : 'margin-left:10px',
                    width    : 100,
                    value    : 0,
                    increment: 1,
                    minValue : 0,
                    maxValue : 10,
                    listeners: {
                        change: function (p, v) {
                            s.zoomToLevel(parseInt(v, 10));
                        }
                    }
                }), {
                    xtype: 'label',
                    text : 'Zoom in'
                }
            ],

            plugins: new Sch.plugin.HeaderZoom({})
        });

        s.on('zoomchange', function (scheduler, zoomLevel) {
            slider.setValue(zoomLevel);
        });

        var slider1;

        var s1 = Ext.create("Sch.panel.SchedulerGrid", {
            height    : ExampleDefaults.height / 2 + 50,
            width     : ExampleDefaults.width,
            viewPreset: 'hourAndDay',
            split     : false,
            startDate : new Date(2017, 0, 1, 6),
            endDate   : new Date(2017, 0, 2, 20),
            cls       : 'no-infinite-scheduler',
            rowHeight : 30,

            columns: [
                {header: 'Name', sortable: true, width: 100, dataIndex: 'Name'}
            ],

            resourceStore: resourceStore,
            eventStore   : eventStore,

            listeners: {
                afterlayout: function () {
                    slider1.setMinValue(s.minZoomLevel);
                    slider1.setMaxValue(s.maxZoomLevel);

                    slider1.setValue(s.getCurrentZoomLevelIndex());
                },

                single: true
            },

            tools: [
                {
                    xtype  : 'button',
                    text   : '-',
                    iconCls: 'x-fa fa-search-minus',
                    style  : 'margin-right: 5px',
                    handler: function () {
                        s1.zoomOut();
                    }
                }, {
                    xtype  : 'button',
                    text   : '+',
                    iconCls: 'x-fa fa-search-plus',
                    style  : 'margin-right: 20px',
                    handler: function () {
                        s1.zoomIn();
                    }
                }, {
                    xtype  : 'button',
                    text   : 'Min',
                    iconCls: 'x-fa fa-search-minus',
                    style  : 'margin-right: 5px',
                    handler: function () {
                        s1.zoomOutFull();
                    }
                }, {
                    xtype  : 'button',
                    text   : 'Max',
                    iconCls: 'x-fa fa-search-plus',
                    style  : 'margin-right: 20px',
                    handler: function () {
                        s1.zoomInFull();
                    }
                }, {
                    xtype: 'label',
                    text : 'Zoom out'
                },
                slider1 = new Ext.slider.SingleSlider({
                    style    : 'margin-left:10px',
                    width    : 100,
                    value    : 0,
                    increment: 1,
                    minValue : 0,
                    maxValue : 10,
                    listeners: {
                        change: function (p, v) {
                            s1.zoomToLevel(parseInt(v, 10));
                        }
                    }
                }), {
                    xtype: 'label',
                    text : 'Zoom in'
                }
            ],

//            uncomment to enable snapping behaviour
//            dragConfig  : { showExactDropPosition : true },
            resizeConfig                : {showExactResizePosition: true},
            snapRelativeToEventStartDate: true,
            plugins                     : new Sch.plugin.HeaderZoom({})
        });

        s1.on('zoomchange', function (scheduler, zoomLevel) {
            slider1.setValue(zoomLevel);
        });

        var container = new Ext.panel.Panel({
            width : ExampleDefaults.width,
            layout: 'anchor',
            border: false,
            items : [
                Ext.apply(s, {title: 'infinite scroll'}),
                Ext.apply(s1, {title: 'no infinite scroll'})
            ]
        });

        App.s = s;
        App.s1 = s1;

        container.render('example-container');
    }
};