Ext.define("Sch.examples.vertical.view.MainViewport", {
    extend : 'Ext.Viewport',
    alias  : 'widget.vertical-viewport',

    requires : [
        'Sch.examples.vertical.view.MainViewportController',
        'Sch.examples.vertical.view.MyToolbar',
        'Sch.examples.vertical.view.Scheduler',
        'Sch.examples.vertical.view.Scheduler2'
    ],

    controller : 'vertical-viewport',

    layout : 'border',

    initComponent : function () {
        this.items = [
            {
                xtype  : 'tabpanel',
                region : 'center',
                items  : [
                    {
                        xtype       : 'vertical-scheduler',
                        title       : 'Basic scheduler',
                        reference   : 'scheduler',
                        crudManager : this.crudManager,
                        startDate   : this.startDate,
                        tbar        : {
                            xtype : 'mytoolbar'
                        }
                    },
                    {
                        xtype          : 'vertical-scheduler2',
                        title          : 'Day + hour time axes',
                        reference      : 'secondscheduler',
                        crudManager    : this.crudManager,
                        startDate      : this.startDate
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
