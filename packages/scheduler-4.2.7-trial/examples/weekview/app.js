Ext.application({
    name     : 'App',
    mainView : 'App.view.Viewport',
    paths    : {
        'Sch' : '../../js/Sch'
    },
    requires : [
        'Sch.panel.SchedulerGrid',
        'Sch.plugin.Zones'
    ],
    views    : [
        'Header',
        'InfoPanel',
        'NavigationBar',
        'ResourceCombo',
        'ResourceFilter',
        'Scheduler',
        'SchedulerDays',
        'Viewport'
    ],
    stores   : [
        'Event',
        'Resource'
    ]
});