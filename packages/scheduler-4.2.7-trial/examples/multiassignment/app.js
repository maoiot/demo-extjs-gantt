Ext.application({
    name              : 'MyApp',
    autoCreateViewport: false,
    views             : [
        'Scheduler',
        'EventEditor'
    ],

    launch: function () {

        var vp = new Ext.Viewport({
            layout: 'border',
            items : [
                {
                    xtype     : 'component',
                    el        : 'example-description',
                    region    : 'north',
                    autoHeight: true
                },
                {
                    xtype : 'myscheduler',
                    split : false,
                    region: 'center'
                }
            ]
        });
    }
});
