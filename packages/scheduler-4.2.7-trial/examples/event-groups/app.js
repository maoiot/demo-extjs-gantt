/* global App: true */
Sch.preset.Manager.registerPreset("customday", {
    timeColumnWidth  : 30,
    displayDateFormat: 'G:i',
    shiftIncrement   : 1,
    shiftUnit        : "DAY",
    timeResolution   : {
        unit     : "MINUTE",
        increment: 5
    },
    defaultSpan      : 24,
    headerConfig     : {
        bottom: {
            unit      : "MINUTE",
            increment : 15,
            dateFormat: 'i'
        },
        middle: {
            unit      : "HOUR",
            increment : 1,
            dateFormat: 'G:i'
        },
        top   : {
            unit      : "DAY",
            dateFormat: 'Y-m-d'
        }
    }
});

Ext.Loader.setConfig({
    disableCaching: true,
    enabled       : true
});

Ext.application({
    name: 'App',  // Our global namespace

    appFolder: 'lib',  // The folder for the JS files

    views: [
        'App.view.Scheduler'
    ],

    stores: [
        'DeliveryStepStore',
        'DeliveryStore',
        'DeliveryTaskStore'
    ],

    models: [
        'DeliveryStep',
        'Delivery',
        'DeliveryTask'
    ],

    // We'll create our own 'main' UI
    autoCreateViewport: false,

    launch: function () {

        var taskStore = new App.store.DeliveryTaskStore();
        var deliveryStepStore = new App.store.DeliveryStepStore();
        var deliveryStore = taskStore.getDeliveryStore();

        var cm = new Sch.data.CrudManager({
            eventStore   : taskStore,
            resourceStore: deliveryStepStore,
            stores       : [
                deliveryStore
            ],
            transport    : {
                load: {
                    url: 'data.js'
                }
            }
        });

        cm.addStoreToApplySequence(deliveryStore, -1, taskStore);

        cm.load();

        var scheduler = new App.view.Scheduler({
            title        : 'Event Groups',
            width        : ExampleDefaults.width,
            height       : ExampleDefaults.height,
            deliveryStore: deliveryStore,
            crudManager  : cm,
            renderTo     : 'example-container',
            startDate    : new Date(2017, 0, 1, 10),
            endDate      : new Date(2017, 0, 1, 16)
        });
    }
});
