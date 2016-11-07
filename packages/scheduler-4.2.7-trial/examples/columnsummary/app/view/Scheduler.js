Ext.define('App.view.Scheduler', {
    extend   : 'Sch.panel.SchedulerGrid',
    xtype    : 'myscheduler',
    requires : [
        'App.model.Resource',
        'App.plugin.SummaryRow'
    ],

    cls                : 'scheduler1',
    eventBarTextField  : 'Name',
    viewPreset         : 'dayAndWeek',
    rowHeight          : 50,
    barMargin          : 3,
    title              : 'Scheduler with row and column summary',
    eventResizeHandles : 'both',

    lockedGridConfig : { width : 350 },

    columns : [
        {
            xtype     : 'templatecolumn',
            header    : 'Staff',
            sortable  : true,
            flex      : 1,
            dataIndex : 'Name',
            resizable : false,
            cls       : 'staffheader',
            tpl       : '<img src="resources/images/{[values.Name.toLowerCase()]}.jpg" /><dl><dt>{Name}</dt><dd>{Title}</dd></dl>'
        },
        {
            xtype       : 'summarycolumn',
            header      : 'Time allocated',
            width       : 100,
            align       : 'center',
            showPercent : false
        }/*,
         {
         xtype       : 'summarycolumn',
         header      : '% allocated',
         showPercent : true,
         align       : 'center',
         width       : 60
         }*/
    ],

    // Store holding all the resources
    resourceStore : {
        type  : 'resourcestore',
        model : 'App.model.Resource',
        data  : [
            { Id : 'r1', Name : 'Arnold', Title : 'R&D' },
            { Id : 'r2', Name : 'Lisa', Title : 'CEO' },
            { Id : 'r3', Name : 'Dave', Title : 'Acceptance Test' },
            { Id : 'r4', Name : 'Lee', Title : 'Sales' }
        ]
    },

    // Store holding all the events
    eventStore : {
        type : 'eventstore',
        data : [
            { Id : 'e10', ResourceId : 'r1', Name : 'Paris Trip', StartDate : "2017-12-02", EndDate : "2017-12-08" },
            {
                Id         : 'e101',
                ResourceId : 'r1',
                Name       : 'Board Meeting',
                StartDate  : "2017-12-08",
                EndDate    : "2017-12-12"
            },
            { Id : 'e11', ResourceId : 'r2', Name : 'Board Meeting', StartDate : "2017-12-04", EndDate : "2017-12-09" },
            { Id : 'e21', ResourceId : 'r3', Name : 'Test IE8', StartDate : "2017-12-01", EndDate : "2017-12-04" },
            {
                Id         : 'e211',
                ResourceId : 'r3',
                Name       : 'Test IE8 Some More',
                StartDate  : "2017-12-04",
                EndDate    : "2017-12-09"
            },
            {
                Id         : 'e22',
                ResourceId : 'r4',
                Name       : 'Conference X',
                StartDate  : "2017-12-01",
                EndDate    : "2017-12-05",
                Cls        : 'Special'
            },
            {
                Id         : 'e23',
                ResourceId : 'r4',
                Name       : 'Meet Client',
                StartDate  : "2017-12-05",
                EndDate    : "2017-12-09",
                Cls        : 'VerySpecial'
            },

            {
                Id         : 'special1',
                ResourceId : 'frozen',
                Name       : 'Summary task',
                StartDate  : "2017-12-02",
                EndDate    : "2017-12-03"
            },
            {
                Id         : 'special2',
                ResourceId : 'frozen',
                Name       : 'Important info',
                StartDate  : "2017-12-04",
                EndDate    : "2017-12-07"
            },
            {
                Id         : 'special3',
                ResourceId : 'frozen',
                Name       : 'Some text',
                StartDate  : "2017-12-08",
                EndDate    : "2017-12-09"
            }
        ]
    },

    plugins : [
        {
            ptype : 'scheduler_zones',
            store : {
                model : 'Sch.model.Event',
                data  : [
                    { StartDate : new Date(2010, 11, 4), EndDate : new Date(2010, 11, 5), Cls : 'weekend' }
                ]
            }
        },
        'scheduler_summaryrow'
    ],

    onEventCreated : function (newEventRecord) {
        newEventRecord.setName('New task...');
    }
});


