Ext.define('App.view.Scheduler', {
    extend : 'Sch.panel.SchedulerGrid',
    xtype  : 'scheduler',

    requires : [
        'App.view.SchedulerController',
        'App.model.Line',
        'App.model.Resource',
        'App.model.Zone'
    ],

    controller         : 'scheduler',
    eventResizeHandles : 'both',
    startDate          : new Date(2011, 0, 3),
    endDate            : new Date(2011, 0, 13),
    viewPreset         : 'dayAndWeek',
    rowHeight          : 44,

    lockedGridConfig : {
        width : 150
    },

    highlightWeekends : true,

    resourceStore : {
        type     : 'resourcestore',
        sorters  : ['Role', 'Name'],
        autoLoad : true,
        proxy    : {
            url    : 'resources.xml',
            type   : 'ajax',
            reader : {
                type   : 'xml',
                record : 'Resource',
                idPath : 'Id'
            }
        },
        model    : 'App.model.Resource'
    },

    eventStore : {
        type     : 'eventstore',
        autoLoad : true,
        proxy    : {
            url    : 'events.xml',
            type   : 'ajax',
            reader : {
                type   : 'xml',
                idPath : 'Id',
                record : 'Event'
            }
        }
    },

    // Setup static columns
    columns : [
        {
            header    : 'Name',
            width     : 150,
            flex      : 1,
            dataIndex : 'Name'
        }
    ],

    viewConfig : {
        barMargin  : 1,
        stripeRows : false
    },

    eventRenderer : function (item, resource, tplData, row) {

        if (resource.get('Color')) {
            tplData.style = "background-color:" + resource.get('Color');
        }

        return item.get('Name');
    },

    plugins : [
        'viewport',
        {
            ptype              : 'scheduler_zones',
            showHeaderElements : true,
            // If you want, show some extra meta data for each zone
            innerTpl           : '<span class="zone-type">{Type}</span>',
            store              : {
                model   : 'App.model.Zone',
                storeId : 'zones',
                data    : [
                    {
                        StartDate : new Date(2011, 0, 4),
                        EndDate   : new Date(2011, 0, 5),
                        Type      : 'Day off',
                        Cls       : 'myZoneStyle'
                    },
                    {
                        StartDate : new Date(2011, 0, 7),
                        EndDate   : new Date(2011, 0, 8),
                        Type      : 'Casual Friday',
                        Cls       : 'myZoneStyle'
                    }
                ]
            }
        },

        {
            ptype              : 'scheduler_lines',
            showHeaderElements : true,
            innerTpl           : '<span class="line-text">{Text}</span>',
            store              : {
                model : 'App.model.Line',
                data  : [
                    {
                        Date : new Date(2011, 0, 9, 12),
                        Text : 'Some important date',
                        Cls  : 'important'
                    }
                ]
            }
        }
    ],

    tbar : [
        {
            text         : 'Insert zone 1',
            enableToggle : true,
            listeners    : {
                toggle : 'onZoneAddPress'
            }
        },
        {
            text         : 'Insert zone 2 (alternate styling)',
            enableToggle : true,
            listeners    : {
                toggle : 'onZone2AddPress'
            }
        },
        {
            text    : 'Add Resource',
            handler : 'onRowAddPress'
        },
        {
            text         : 'Horizontal view',
            pressed      : true,
            enableToggle : true,
            toggleGroup  : 'orientation',
            handler      : 'onHorizontalPress'
        },
        {
            text         : 'Vertical view',
            enableToggle : true,
            toggleGroup  : 'orientation',
            handler      : 'onVerticalPress'
        },
        '->',
        {
            text    : 'Undo',
            handler : 'undo'
        },
        {
            text    : 'Redo',
            handler : 'redo'
        }
    ]
});
