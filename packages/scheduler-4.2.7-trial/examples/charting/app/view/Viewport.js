/*global App*/
Ext.define('App.view.Viewport', {
    extend    : 'Ext.Viewport',
    layout    : {type : 'border'},
    scheduler : null,

    initComponent : function () {
        var scheduler = this.scheduler = new App.view.CarSchedule();

        this.items = [
            {
                region : 'center',
                width  : '100%',
                layout : {type : 'hbox', align : 'stretch'},
                border : true,
                items  : [
                    scheduler,
                    {
                        xtype    : 'allocationchart',
                        timeAxis : scheduler.timeAxis,
                        split    : true,
                        header   : {
                            title : 'Usage',
                            items : [
                                {
                                    xtype : 'button',
                                    text  : 'Some button'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                region : 'south',
                xtype  : 'panel',
                layout : {type : 'hbox', align : 'stretch'},
                height : 250,

                items : [
                    {
                        xtype       : 'form',
                        title       : 'Some stats',
                        itemId      : 'details',
                        width       : 200,
                        cls         : 'detailsform',
                        bodyPadding : '20 0 0 20',
                        items       : [
                            {
                                xtype      : 'textfield',
                                fieldLabel : 'Number of incidents',
                                value      : 231,
                                anchor     : '90%',
                                readOnly   : true
                            },
                            {
                                xtype      : 'textfield',
                                fieldLabel : 'Incidents / day',
                                value      : 2.4,
                                anchor     : '90%',
                                readOnly   : true
                            }
                        ]
                    },
                    {
                        title      : 'Incident reports',
                        itemId     : 'incidentscroll',
                        scrollable : 'x',
                        height     : 200,
                        layout     : 'auto',
                        items      : {
                            xtype    : 'incidentchart',
                            timeAxis : scheduler.getTimeAxis()
                        }
                    },
                    {
                        xtype    : 'carfleetstatuschart',
                        carStore : scheduler.resourceStore,
                        flex     : 1
                    }
                ]
            }
        ];

        this.callParent(arguments);

        var schedulerView = this.down('schedulergridview');
        var incidentChart = this.down('incidentchart');
        var details       = this.down('#details');
        var scrollCt      = this.down('#incidentscroll');

        schedulerView.on('resize', function (cmp, width) {
            scrollCt.setWidth(width);
        });

        this.down('timeaxiscolumn').on('resize', function (cmp, width) {
            incidentChart.setWidth(width);
        });

        this.scheduler.lockedGrid.on('resize', function (cmp, width) {
            details.setWidth(width);
        });

        // Setup scroll sync
        schedulerView.getScrollable().addPartner(this.down('#incidentscroll').getScrollable(), 'x');
        this.scheduler.normalGrid.getHeaderContainer().getScrollable().addPartner(this.down('#incidentscroll').getScrollable(), 'x');
    }
});
