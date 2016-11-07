Ext.define("MyApp.view.Gantt", {
    extend : 'Gnt.panel.Gantt',
    alias  : 'widget.gantt',

    // Ext JS configs
    requires : [
        'MyApp.store.TaskStore',
        'MyApp.view.GanttToolbar',

        'Gnt.plugin.taskeditor.TaskEditor',
        'Gnt.plugin.taskeditor.ProjectEditor',
        'Sch.plugin.TreeCellEditing',
        'Gnt.plugin.TaskContextMenu'
    ],

    flex             : 1,
    title            : 'Gantt chart',
    lockedGridConfig : { width : 300 },
    loadMask         : true,
    border           : false,
    eventBorderWidth : 0,
    rowHeight        : 30,

    // Gantt configs
    leftLabelField    : 'Name',
    highlightWeekends : true,
    viewPreset        : 'weekAndDayLetter',
    columnLines       : true,
    cascadeChanges    : true,

    tipCfg: {cls: 'tasktip'},

    tooltipTpl : '<table>' +
                 '<tr><th class="caption" colspan="2">#{Id} {Name}</th></tr>' +
                 '<tr>' +
                 '<th>Start:</th><td>{[values._record.getDisplayStartDate("y-m-d")]}</td>' +
                 '</tr>' +
                 '<tr>' +
                 '<th>End:</th><td>{[values._record.getDisplayEndDate("y-m-d")]}</td>'+
                 '</tr>' +
                 '<tr>' +
                 '<th>Progress:</th><td>{[Math.round(values.PercentDone)]}%</td>' +
                 '</tr>' +
                 '</table>',

    initComponent : function () {
        // Add your setup code here

        Ext.apply(this, {
            tbar: {
                xtype: 'gantttoolbar',
                gantt: this
            }
        });
        
        this.callParent(arguments);
    },

    viewConfig : {
        getRowClass : function (record) {
            // Output a custom CSS class with some task property that we can use for styling
            return 'TASKID_' + record.data.Id;
        }
    },

    columns : [
        {
            xtype : 'namecolumn',
            tdCls : 'namecell',
            width : 200
        },
        {
            header : 'Assigned Resources',
            width  : 150,
            tdCls  : 'resourcecell',
            xtype  : 'resourceassignmentcolumn'
        },
        {
            xtype : 'startdatecolumn'
        },
        {
            xtype : 'durationcolumn'
        },
        {
            xtype : 'predecessorcolumn'
        },
        {
            xtype : 'addnewcolumn'
        }
    ],

    plugins : [
        'gantt_projecteditor',
        'gantt_taskeditor',
        'scheduler_treecellediting',
        'gantt_taskcontextmenu'
    ]
});
