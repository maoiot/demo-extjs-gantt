/* global App */

//Ext.Loader.setConfig({ enabled : true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../js/Sch');

Ext.application({
    name     : 'App',
    mainView : 'Scheduler',
    views    : [
        'Scheduler'
    ],

    launch : function() {
        App.undoManager = new Robo.Manager({
            transactionBoundary : 'timeout',
            stores              : [
                'events',
                'resources',
                'zones'
            ]
        });

        App.undoManager.start();
    }
});
