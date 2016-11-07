Ext.ns('App');

Ext.Loader.setConfig({enabled: true, disableCaching: true});
Ext.Loader.setPath('Sch', '../../js/Sch');

Ext.require([
    'Sch.panel.SchedulerGrid'
]);

Ext.onReady(function () {
    App.Scheduler.init();
});

Ext.define('MyEventModel', {
    extend: 'Sch.model.Event',
    fields: ['PercentDone']
});

App.Scheduler = {

    // Initialize application
    init: function () {

        Sch.preset.Manager.registerPreset("dayNightShift", {
            timeColumnWidth  : 35,
            rowHeight        : 32,
            displayDateFormat: 'G:i',
            shiftIncrement   : 1,
            shiftUnit        : "DAY",
            timeResolution   : {
                unit     : "MINUTE",
                increment: 15
            },
            defaultSpan      : 24,
            headerConfig     : {
                bottom: {
                    unit      : "HOUR",
                    increment : 1,
                    dateFormat: 'G'
                },
                middle: {
                    unit     : "HOUR",
                    increment: 12,
                    renderer : function (startDate, endDate, headerConfig, cellIdx) {
                        // Setting align on the header config object
                        headerConfig.align = 'center';

                        if (startDate.getHours() === 0) {
                            // Setting a custom CSS on the header cell element
                            headerConfig.headerCls = 'nightShift';
                            return Ext.Date.format(startDate, 'M d') + ' Night Shift';
                        }
                        else {
                            // Setting a custom CSS on the header cell element
                            headerConfig.headerCls = 'dayShift';
                            return Ext.Date.format(startDate, 'M d') + ' Day Shift';
                        }
                    }
                },
                top   : {
                    unit      : "DAY",
                    increment : 1,
                    dateFormat: 'd M Y'
                }
            }
        });

        this.scheduler = this.createScheduler();

        this.scheduler.getResourceStore().loadData([
            {Id: 'r1', Name: 'Mike'},
            {Id: 'r2', Name: 'Linda'},
            {Id: 'r3', Name: 'Don'},
            {Id: 'r4', Name: 'Karen'},
            {Id: 'r5', Name: 'Doug'},
            {Id: 'r6', Name: 'Peter'}
        ]);
    },

    createScheduler: function () {
        var resourceStore = Ext.create('Sch.data.ResourceStore', {
                sorters: {
                    property : 'Name',
                    direction: "ASC"
                },
                model  : 'Sch.model.Resource'
            }),

        // Store holding all the events
            eventStore = Ext.create('Sch.data.EventStore', {
                model: 'MyEventModel', // See definition above
                data : [
                    {
                        ResourceId : 'r1',
                        PercentDone: 60,
                        StartDate  : new Date(2017, 0, 1, 10),
                        EndDate    : new Date(2017, 0, 1, 12)
                    },
                    {
                        ResourceId : 'r2',
                        PercentDone: 20,
                        StartDate  : new Date(2017, 0, 1, 12),
                        EndDate    : new Date(2017, 0, 1, 13)
                    },
                    {
                        ResourceId : 'r3',
                        PercentDone: 80,
                        StartDate  : new Date(2017, 0, 1, 14),
                        EndDate    : new Date(2017, 0, 1, 16)
                    },
                    {
                        ResourceId : 'r6',
                        PercentDone: 100,
                        StartDate  : new Date(2017, 0, 1, 16),
                        EndDate    : new Date(2017, 0, 1, 18)
                    }
                ]
            });

        var sched = Ext.create("Sch.panel.SchedulerGrid", {
            title            : 'Presets and zooming',
            height           : ExampleDefaults.height,
            width            : ExampleDefaults.width,
            barMargin        : 2,
            rowHeight        : 35,
            border           : true,
            renderTo         : 'example-container',
            viewPreset       : 'hourAndDay',
            eventBodyTemplate: '<div class="value" style="width: {PercentDone}%">{PercentDone}</div>',
            startDate        : new Date(2017, 0, 1, 6),
            endDate          : new Date(2017, 0, 1, 20),
            split            : false,

            highlightWeekends   : true,

            calendar         : new Sch.data.Calendar({
                data    : [
                    {
                        Date    : '2017-01-12',
                        isWorkingDay    : false
                    }
                ]
            }),

            // Setup static columns
            columns: [
                {header: 'Name', sortable: true, width: 100, dataIndex: 'Name', flex: 1}
            ],

            resourceStore: resourceStore,
            eventStore   : eventStore,

            tbar: [
                {
                    text  : 'Select preset',
                    itemId: 'presets',
                    menu  : {
                        items: [
                            {
                                text     : 'Seconds',
                                itemId   : 'secondAndMinute',
                                startDate: new Date(2017, 0, 1, 10),
                                endDate  : new Date(2017, 0, 1, 13)
                            },
                            {
                                text     : 'Minutes',
                                itemId   : 'minuteAndHour',
                                startDate: new Date(2017, 0, 1, 10),
                                endDate  : new Date(2017, 0, 1, 14)
                            },
                            {
                                text     : 'Hours',
                                itemId   : 'hourAndDay',
                                startDate: new Date(2017, 0, 1, 8),
                                endDate  : new Date(2017, 0, 1, 18)
                            },
                            {
                                text     : 'Days',
                                itemId   : 'weekAndDay',
                                startDate: new Date(2017, 0, 1),
                                endDate  : new Date(2017, 0, 21)
                            },
                            {text: 'Weeks', itemId: 'weekAndMonth'},
                            {text: 'Weeks 2', itemId: 'weekAndDayLetter'},
                            {text: 'Weeks 3', itemId: 'weekDateAndMonth'},
                            {text: 'Months', itemId: 'monthAndYear'},
                            {
                                text     : 'Years',
                                itemId   : 'year',
                                startDate: new Date(2015, 0, 1),
                                endDate  : new Date(2020, 0, 1)
                            },
                            {
                                text     : 'Years 2',
                                itemId   : 'manyYears',
                                startDate: new Date(2010, 0, 1),
                                endDate  : new Date(2020, 0, 1)
                            },
                            '-',
                            {
                                text     : 'Day/night shift (custom)',
                                itemId   : 'dayNightShift',
                                startDate: new Date(2017, 0, 1),
                                endDate  : new Date(2017, 0, 2)
                            }
                        ]
                    }
                },
                '->',
                {
                    iconCls: 'fa fa-search-plus',
                    width  : null,
                    handler: function () {
                        sched.zoomIn();
                    }
                },
                {
                    iconCls: 'fa fa-search-minus',
                    width  : null,
                    handler: function () {
                        sched.zoomOut();
                    }
                }

            ]
        });

        sched.down('#presets menu').on('click',
            function (menu, item) {
                sched.switchViewPreset(item.itemId, item.startDate, item.endDate);
                sched.down('#presets').setText(item.text);
            }
        );

        return sched;
    }
};
