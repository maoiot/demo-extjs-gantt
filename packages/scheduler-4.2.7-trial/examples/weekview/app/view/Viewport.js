//This viewport takes a role of container that contains a scheduler.
//If you need more than one scheduler on the page, you need to wrap viewport items in your own view.
Ext.define('App.view.Viewport', {
    extend     : 'Ext.Viewport',
    requires   : [
        'App.view.ViewportController'
    ],
    controller : 'viewport',
    //You don't need to specify viewModel as a separate file.
    //It's enough to set it as empty object here and you will be able to work with viewModel.
    viewModel  : {},
    layout     : 'border',
    items      : [
        {
            xtype   : 'navigationbar',
            region  : 'north'
        },
        {
            xtype   : 'appheader',
            region  : 'north'
        },
        {
            xtype   : 'infopanel',
            region  : 'east'
        },
        {
            xtype   : 'tabpanel',
            reference : 'tabpanel',
            region  : 'center',
            layout  : 'fit',
            items   : [
                {
                    xtype   : 'scheduler',
                    title   : 'Week'
                },
                {
                    xtype   : 'schedulerdays',
                    title   : 'Work days'
                }
            ]
        }
    ]
});