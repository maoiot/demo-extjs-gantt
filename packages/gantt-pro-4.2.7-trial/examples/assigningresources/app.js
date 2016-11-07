/* global App */
//Ext.Loader.setConfig({enabled: true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../js/Sch');
//Ext.Loader.setPath('Gnt', '../../js/Gnt');

Ext.application({
    name      : 'App',
    appFolder : 'app',

    autoCreateViewport : true,

    views : [
        'App.view.GanttChart',
        'App.view.AssignmentGrid'
    ],

    launch : function () {

        Ext.tip.QuickTipManager.init();
    }
});

