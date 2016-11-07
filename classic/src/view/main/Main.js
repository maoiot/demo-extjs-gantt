


/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */

Ext.Loader.setPath('Sch', '../gantt/Sch');
Ext.Loader.setPath('Gnt', '../gantt/Gnt');

Ext.require([
    'Gnt.panel.Gantt',
    'Gnt.column.PercentDone',
    'Gnt.column.StartDate',
    'Gnt.column.EndDate',
    'Sch.plugin.TreeCellEditing',
    'Sch.plugin.Pan'
]);

Ext.define('Gnt.template.MyTask', {
    extend: 'Gnt.template.Task',
    // override: 'Gnt.template.Task',
    innerTpl : '<div class="sch-gantt-progress-bar" style="width:{progressBarWidth}px;{progressBarStyle}" unselectable="on"><span class="secondary-info"></span> </div>',
    getInnerTpl :  function (cfg) {
        var side = cfg.rtl ? 'right' : 'left';

        return '<div id="' + cfg.prefix + '{id}" class="sch-gantt-item sch-gantt-task-bar {cls}" unselectable="on" style="width:{width}px;{style}">' +
          '<tpl if="isRollup">' +
          '<tpl else>' +
          '<tpl if="segments">' +
          '<div class="sch-gantt-segment-connector"></div>' +
          '</tpl>' +

          ((cfg.taskResizeHandles === 'both' || cfg.taskResizeHandles === 'left') ? '<div class="sch-resizable-handle sch-gantt-task-handle sch-resizable-handle-start"></div>' : '') +

          '<tpl for="segments">' +
          '<div id="' + cfg.prefix + '{parent.Id}-segment-{[xindex-1]}" class="sch-gantt-task-segment {cls}" style="' + side + ':{left}px;width:{width}px;{style}"' +
          ' data-segmentIndex="{[xindex-1]}">' +
          this.innerTpl +
          ((cfg.taskResizeHandles === 'both' || cfg.taskResizeHandles === 'right') ? '<div class="sch-resizable-handle sch-gantt-task-handle sch-resizable-handle-end"></div>' : '') +
          '</div>' +
          '</tpl>' +
          this.innerTpl +

          ((cfg.taskResizeHandles === 'both' || cfg.taskResizeHandles === 'right') ? '<div class="sch-resizable-handle sch-gantt-task-handle sch-resizable-handle-end"></div>' : '') +

          (cfg.enableProgressBarResize ? '<div style="' + side + ':{progressBarWidth}px" class="sch-gantt-progressbar-handle"></div>' : '') +

          // Left / Right terminals
          (cfg.enableDependencyDragDrop ? this.dependencyTerminalMarkup : '') +

          '</tpl>' +
          '</div>';
    }
});

Ext.define('App.view.main.GantView', {
    extend: 'Gnt.view.Gantt',
    override: 'Gnt.view.Gantt',

    customGunttView: true,

    // columnRenderer: function () {
    //     // var result = this.callParent(arguments);
    //     var record = arguments[1].record;
    //     var secondaryModel = Ext.create('Gnt.model.Task', Object.assign({}, record.getData(), {
    //         BaselineEndDate: new Date(record.get('SecondaryEndDate')),
    //         BaselineStartDate: new Date(record.get('SecondaryStartDate'))
    //     }));
    //     debugger;
    //     return  /*result + */this.callParent([arguments[0], arguments[1], secondaryModel]);
    // }

    baselineRenderer: function (taskModel, userData, viewStart, viewEnd, labelsRenderDataPrepared) {
        var primaryResult = this.callParent(arguments);
        var secondaryModel = Ext.create('Gnt.model.Task', Object.assign({}, taskModel.getData(), {
            BaselineEndDate: new Date(taskModel.get('SecondaryEndDate')),
            BaselineStartDate: new Date(taskModel.get('SecondaryStartDate'))
        }));
        var secondaryResult = this.callParent([secondaryModel, userData, viewStart, viewEnd, labelsRenderDataPrepared]);
        secondaryResult = secondaryResult.replace('ch-event-wrap sch-gantt-task-baseline sch-gantt-baseline-item  x-unselectable', 'ch-event-wrap sch-gantt-task-baseline sch-gantt-baseline-item  x-unselectable sch-gantt-parenttask-secondary');
        secondaryResult = secondaryResult.replace('sch-event-wrap sch-gantt-parenttask-baseline sch-gantt-baseline-item  x-unselectable', 'sch-event-wrap sch-gantt-parenttask-baseline sch-gantt-baseline-item  x-unselectable sch-gantt-parenttask-secondary');
        secondaryResult = secondaryResult.replace('sch-event-wrap sch-gantt-milestone-baseline sch-gantt-baseline-item  x-unselectable', 'sch-event-wrap sch-gantt-milestone-baseline sch-gantt-baseline-item  x-unselectable sch-gantt-parenttask-secondary');
        return primaryResult + secondaryResult;
    }
});
var start = new Date(2017, 0, 1),
    end = Sch.util.Date.add(start, Sch.util.Date.MONTH, 10);

var taskStore = Ext.create("Gnt.data.TaskStore", {
    proxy: {
        type  : 'ajax',
        method: 'GET',
        url   : 'tasks.js',
        reader: {
            type: 'json'
        }
    }
});

var dependencyStore = Ext.create("Gnt.data.DependencyStore", {
    autoLoad: true,
    proxy   : {
        type  : 'ajax',
        url   : 'dependencies.js',
        method: 'GET',
        reader: {
            type: 'json'
        }
    }
});

Ext.define('gntt', {

    onRender: function(){
        this.callParent(arguments);
        console.log(arguments);
    },
    extend: 'Gnt.panel.Gantt',
    // parentTaskBodyTemplate: 'bebe',

    region: 'center',
    title: 'Baseline demo',

    leftLabelField: 'Name',

    highlightWeekends       : false,
    showTodayLine           : true,
    enableBaseline          : true,
    baselineVisible         : true,
    enableDependencyDragDrop: false,
    eventRenderer: function () {
        // debugger;
    },

    rowHeight       : 30,
    eventBorderWidth: 0,

    loadMask: true,

    viewPreset: 'monthAndYear',

    startDate: start,
    endDate  : end,

    initComponent: function(){
        this.callParent()
    },

    // Setup your static columns
    columns        : [
        {
            xtype: 'namecolumn',
            width: 200
        },
        {
            xtype: 'baselinestartdatecolumn'
        },
        {
            xtype: 'baselineenddatecolumn'
        },
        {
            xtype: 'baselinestartdatecolumn',
            text: 'Secondary Start Date',
            dataIndex: 'SecondaryStartDate',
            renderer: function(dataStr){
                return Ext.Date.format(new Date(dataStr), 'm/d/Y')
            }
        },
        {
            xtype: 'baselineenddatecolumn',
            text: 'Secondary End Date',
            dataIndex: 'SecondaryEndDate',
            renderer: function(dataStr){
                return Ext.Date.format(new Date(dataStr), 'm/d/Y')
            }

        }
    ],
    taskStore      : taskStore,
    dependencyStore: dependencyStore,

    plugins: [
        {
            ptype: 'scheduler_pan'
        }
    ],

    tbar: [
        {
            text        : 'Show baseline task bars',
            enableToggle: true,
            pressed     : true,
            handler     : function () {
                g.el.toggleCls('sch-ganttpanel-showbaseline');
            }
        },
        {
            text   : 'Set new baseline',
            handler: function () {
                taskStore.getRootNode().cascadeBy(function (node) {
                    node.beginEdit();
                    node.set('BaselineStartDate', node.getStartDate());
                    node.set('BaselineEndDate', node.getEndDate());
                    node.endEdit();
                });
            }
        },
        {
            text        : 'Show secondary line task bars',
            enableToggle: true,
            handler     : function () {
                g.el.toggleCls('sch-ganttpanel-secondaryline');
            }
        }
    ]
});
var g = Ext.create('gntt');
Ext.define('App.view.main.Main', {
    extend: 'Ext.Viewport',
    layout: 'border',
    items: [
        g
    ]

});
