Ext.application({
    name   : 'App',

    views  : [
        'Viewport',
        'CarSchedule',
        'AllocationChart',
        'CarFleetStatusChart',
        'IncidentChart'
    ],

    stores : [
        'CarStore',
        'IncidentStore',
        'CarBooking'
    ],

    mainView : 'App.view.Viewport'
});