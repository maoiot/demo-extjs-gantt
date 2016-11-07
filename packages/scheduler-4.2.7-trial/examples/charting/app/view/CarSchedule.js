Ext.define('App.view.CarSchedule', {
    extend   : 'Sch.panel.SchedulerGrid',
    requires : [
        'App.view.CarScheduleController'
    ],

    controller        : 'carschedule',
    xtype             : 'carschedule',
    flex              : 1,
    viewPreset        : 'weekAndDayLetter',
    eventBarTextField : 'Name',
    split             : false,
    border            : false,
    // Store holding all the resources
    resourceStore     : 'carstore',

    // Store holding all the events
    eventStore : 'carbooking',

    rowHeight : 50,
    barMargin : 4,

    viewConfig : {
        stripeRows : false,
        markDirty  : false
    },

    onEventCreated : function (ev) {
        ev.setName('New booking');
    },

    // Setup static columns
    columns : [
        {
            text      : 'Active',
            xtype     : 'checkcolumn',
            dataIndex : 'Enabled',
            width     : 60
        },
        {
            text      : 'Car',
            width     : 170,
            dataIndex : 'Name',
            sortable  : true,
            xtype     : 'templatecolumn',
            tpl       : '<img class="carimg functioning-{Enabled}" src="resources/images/{Id}.jpeg" />' +
            '<dl class="cardescr">' +
            '<dt>{Name}</dt>' +
            '<dd>{Seats} seats</dd>' +
            '</dl>'
        },
        {
            text      : 'Next Service',
            width     : 100,
            dataIndex : 'NextScheduledService',
            // position  : 'right',
            xtype     : 'datecolumn',
            format    : 'M Y'
        }
    ],

    header : {
        title : 'Car Rental Scheduling System (CRSS)',
        items : [
            {
                xtype   : 'button',
                text    : 'Zoom in',
                handler : 'onZoomIn'
            },
            {
                xtype   : 'button',
                text    : 'Zoom out',
                handler : 'onZoomOut'
            }
        ]
    }
});