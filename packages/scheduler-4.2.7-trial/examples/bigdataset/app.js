/* global App: true */

App = {
    random: function(max) {
        return Ext.Number.randomInt(0, max);
    },

    generateEvents: function (numResources, eventsPerResource) {
        var firstNames = [
                'Mike', 'Linda', 'Don', 'Karen', 'Doug', 'Peter', 'Daniel', 'Jorge', 'John', 'Jane', 'Theo', 'Lisa'
            ],

            sureNames = [
                'McGregor', 'Ewans', 'Scott', 'Smith', 'Johnson', 'Adams', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis'
            ],

            people = [],
            events = [];

        // generate resources & events
        for (var i = 0; i < numResources; i++) {
            // resource
            var name =
                    firstNames[App.random(firstNames.length)] +
                    ' ' +
                    String.fromCharCode(65 + App.random(26)) + // initial
                    ' ' +
                    sureNames[App.random(sureNames.length)],

                person = {Id: 'r' + (i + 1), Name: name};

            people.push(person);

            // events
            for (var j = 0; j < eventsPerResource; j++) {
                var startDate = new Date(2017 + App.random(3), App.random(12), App.random(28));
                events.push({
                    ResourceId: person.Id,
                    Name      : 'Event ' + (events.length + 1),
                    StartDate : startDate,
                    EndDate   : Ext.Date.add(startDate, Ext.Date.MONTH, App.random(3) + 1)
                });
            }
        }

        return {
            resources: people,
            events   : events
        };
    },

    // Initialize application
    init: function () {

        Ext.QuickTips.init();

        var resourceStore = Ext.create('Sch.data.ResourceStore', {
                model: 'Sch.model.Resource'
            }),

            eventStore = Ext.create('Sch.data.EventStore', {
                model: 'Sch.model.Event'
            }),

            // number of persons (resources) to create from start
            numResources = 100,
            // number of events per person to create from start
            eventsPerResource = 10,

            // generate events
            data = App.generateEvents(numResources, eventsPerResource);

        resourceStore.loadData(data.resources);
        eventStore.loadData(data.events);

        var scheduler = Ext.create("Sch.panel.SchedulerGrid", {
            height       : ExampleDefaults.height,
            width        : ExampleDefaults.width,
            barMargin    : 2,
            rowHeight    : 35,
            title        : 'Big Data Set',
            renderTo     : 'example-container',
            bodyBorder   : false,
            split        : false,
            viewPreset   : 'monthAndYear',
            startDate    : new Date(2017, 0, 1),
            endDate      : new Date(2019, 11, 31),
            eventRenderer: function (item, r, tplData, row, col, ds, index) {
                return item.get('Name');
            },
            // Setup static columns
            columns      : [
                {header: 'Name', sortable: true, width: 160, dataIndex: 'Name'}
            ],

            resourceStore: resourceStore,
            eventStore   : eventStore,

            tools: [
                {
                    xtype: 'label',
                    text:'Resources',
                    style: 'margin-right: 5px'
                },
                {
                    xtype    : 'numberfield',
                    emptyText: 'Persons',
                    cls      : 'resources-field',
                    itemId   : 'resources',
                    step: 100,
                    value    : numResources,
                    minValue: 10
                }, {
                    xtype: 'label',
                    text : 'x Events',
                    style: 'margin: 0 10px 0 10px'
                }, {
                    xtype    : 'numberfield',
                    emptyText: 'Events',
                    style    : 'margin-right: 10px',
                    cls      : 'events-field',
                    itemId   : 'events',
                    step: 10,
                    minValue: 10,
                    value    : eventsPerResource
                }, {
                    xtype  : 'button',
                    text   : 'Generate',
                    handler: function () {
                        var resources = scheduler.down('#resources').getValue(),
                            events = scheduler.down('#events').getValue();

                        scheduler.el.mask('Generating ' + (resources * events) + ' events');

                        Ext.defer(function() {
                            // generate events based on user input
                            var data = App.generateEvents(resources, events);

                            // update stores with generated events
                            resourceStore.loadData(data.resources);
                            eventStore.loadData(data.events);

                            scheduler.el.unmask();
                        }, 20);


                    }
                }
            ]
        });
    }
};

Ext.onReady(App.init);
