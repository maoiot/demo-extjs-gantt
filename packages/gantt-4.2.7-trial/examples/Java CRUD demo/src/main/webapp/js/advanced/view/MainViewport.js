Ext.define("Gnt.examples.advanced.view.MainViewport", {
    extend: 'Ext.Viewport',
    alias : 'widget.advanced-viewport',

    requires: [
        'Gnt.examples.advanced.view.MainViewportController',
        'Gnt.examples.advanced.view.MainViewportModel',
        'Gnt.examples.advanced.view.GanttSecondaryToolbar',
        'Gnt.examples.advanced.view.ControlHeader',
        'Gnt.examples.advanced.view.Gantt'
    ],

    viewModel : 'advanced-viewport',
    controller: 'advanced-viewport',

    layout: 'border',

    initComponent: function () {
        this.items = [
            {
                xtype : 'container',
                region: 'center',
                layout: 'border',
                items : [
                    {
                        xtype      : 'advanced-gantt',
                        region     : 'center',
                        reference  : 'gantt',
                        crudManager: this.crudManager,
                        startDate  : this.startDate,
                        endDate    : this.endDate,
                        header     : Gnt.panel.Timeline ? null : {xtype: 'controlheader'},
                        bbar       : {
                            xtype: 'gantt-secondary-toolbar'
                        }
                    }
                ]
            },
            {
                xtype  : 'details',
                details: '<h3>Advanced Gantt demo</h3>' +
                '<p>This is example showcases a lot of Gantt functionality.</p>' +
                '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
            }
        ];

        this.callParent(arguments);
    }
});
