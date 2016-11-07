Ext.define("App.view.DemoGanttPanel", {
    extend : "Gnt.panel.Gantt",

    requires : [
        'Gnt.plugin.TaskContextMenu',
        'Gnt.column.StartDate',
        'Gnt.column.EndDate',
        'Gnt.column.Duration',
        'Gnt.column.PercentDone',
        'Gnt.column.ResourceAssignment',
        'Sch.plugin.TreeCellEditing',
        'Sch.plugin.Pan'
    ],

    rightLabelField         : 'Responsible',
    highlightWeekends       : true,
    showTodayLine           : true,
    loadMask                : true,
    stripeRows              : true,
    enableProgressBarResize : true,
    //bodyBorder             : false,
    eventBorderWidth        : 0,
    rowHeight               : 31,

    leftLabelField : {
        dataIndex : 'Name',
        editor    : { xtype : 'textfield' }
    },

    plugins : [
        'gantt_taskcontextmenu',
        'scheduler_pan',
        {
            ptype        : 'scheduler_treecellediting',
            clicksToEdit : 1
        }
    ],

    columns : [
        {
            xtype : 'namecolumn',
            width : 140
        },
        {
            xtype : 'startdatecolumn',
            width : 85
        },
        {
            xtype : 'enddatecolumn',
            width : 85
        },
        {
            xtype : 'durationcolumn',
            width : 75
        },
        {

            xtype : 'effortcolumn',
            width : 70
        },
        {
            xtype : 'schedulingmodecolumn',
            width : 90
        },
        {
            xtype : 'resourceassignmentcolumn',
            text  : 'Assigned Resources',
            width : 160
        }
    ],

    initComponent : function () {

        Ext.apply(this, {
            // Define the buttons that are available for user interaction
            tbar : [
                {
                    iconCls : 'x-fa fa-arrow-left',
                    tooltip : 'Previous',
                    scope   : this,
                    handler : function () {
                        this.shiftPrevious();
                    }
                },
                {
                    iconCls : 'x-fa fa-arrow-right',
                    tooltip : 'Next',
                    scope   : this,
                    handler : function () {
                        this.shiftNext();
                    }
                },
                '-',
                {
                    text    : 'Collapse all',
                    iconCls : 'x-fa fa-folder-open',
                    scope   : this,
                    handler : function () {
                        this.collapseAll();
                    }
                }, {
                    text    : 'Expand all',
                    iconCls : 'x-fa fa-folder',
                    scope   : this,
                    handler : function () {
                        this.expandAll();
                    }
                },
                '->',
                'View resolution',
                {
                    text    : '10 weeks',
                    scope   : this,
                    handler : function () {
                        this.switchViewPreset('weekAndDayLetter');
                    }
                },
                {
                    text    : '1 year',
                    scope   : this,
                    handler : function () {
                        this.switchViewPreset('monthAndYear');
                    }
                },
                {
                    text    : 'Zoom to fit',
                    iconCls : 'x-fa fa-search',
                    handler : function () {
                        this.zoomToFit();
                    },
                    scope   : this
                }
            ]
        });

        this.callParent(arguments);
    }
});
