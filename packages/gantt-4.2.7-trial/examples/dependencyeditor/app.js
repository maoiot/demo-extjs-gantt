/* global App:true */
Ext.ns('App');

//Ext.Loader.setConfig({enabled : true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../js/Sch');
//Ext.Loader.setPath('Gnt', '../../js/Gnt');

Ext.require([
    'Gnt.panel.Gantt',
    'Gnt.column.PercentDone',
    'Gnt.column.StartDate',
    'Gnt.column.EndDate',
    'Sch.plugin.Pan',
    'Gnt.plugin.DependencyEditor'
]);

Ext.onReady(function () {
    App.Gantt.init();
});

Ext.define('Gnt.ux.DependencyToolTip', {
    extend     : 'Ext.tip.ToolTip',
    delegate   : '.sch-dependency',
    showDelay  : 0,
    anchor     : 'bottom',
    trackMouse : false,
    ganttPanel : null,
    ganttView  : null,

    initComponent : function () {
        this.ganttView = this.ganttPanel.getSchedulingView();
        this.target    = this.ganttView.getEl();

        this.callParent(arguments);
    },

    tpl : '<table>' +
    '<tr><td>From:</td><td>{[values.from.getName()]}</td></tr>' +
    '<tr><td>To:</td><td>{[values.to.getName()]}</td></tr>' +
    '<tpl if="critical"><tr><td>Critical:</td><td>YES</td></tr></tpl>' +
    '</table>',

    alignToTask : function (task) {
        var eventEl = this.ganttView.getElementFromEventRecord(task);

        if (eventEl) {
            this.anchorTo(eventEl, 'bc-tc', [ eventEl.getWidth() * 3 / 4, -8 ]);
        }
    },

    show : function () {

        this.callParent(arguments);

        var depView   = this.ganttPanel.getDependencyView();
        var depRecord = depView.getDependencyForElement(this.triggerElement);

        this.setData({
            from     : depRecord.getSourceTask(),
            to       : depRecord.getTargetTask(),
            critical : depRecord.getCls() === 'Special'
        });

        this.alignToTask(depRecord.getTargetTask());
    }
});

App.Gantt = {

    // Initialize application
    init : function (serverCfg) {
        Ext.QuickTips.init();

        var taskStore = Ext.create("Gnt.data.TaskStore", {
            proxy   : {
                type   : 'ajax',
                method : 'GET',
                url    : 'tasks.xml',
                reader : {
                    type         : 'xml',
                    // records will have a 'Task' tag
                    record       : ">Task",
                    rootProperty : "Tasks",
                    idProperty   : "Id"
                }
            },
            sorters : [
                {
                    property  : 'leaf',
                    direction : 'ASC'
                }
            ]
        });

        var dependencyStore = Ext.create("Gnt.data.DependencyStore", {
            autoLoad : true,
            proxy    : {
                type   : 'ajax',
                url    : 'dependencies.xml',
                method : 'GET',
                reader : {
                    type         : 'xml',
                    rootProperty : 'Links',
                    record       : 'Link' // records will have a 'Link' tag
                }
            }
        });

        var g = Ext.create('Gnt.panel.Gantt', {
            title                    : 'Dependency editor demo',
            region                   : 'center',
            //
            leftLabelField           : 'Name',
            highlightWeekends        : true,
            rowHeight                : 30,
            border                   : false,
            bodyBorder               : false,
            eventBorderWidth         : 0,
            split                    : false,
            //showTodayLine: true,
            loadMask                 : true,
            enableDependencyDragDrop : true,
            //snapToIncrement : true,
            cascadeChanges           : true,
            startDate                : new Date(2010, 0, 4),
            endDate                  : Sch.util.Date.add(new Date(2010, 0, 4), Sch.util.Date.WEEK, 20),
            viewPreset               : 'weekAndDayLetter',
            dependencyViewConfig     : {
                overCls : 'dependency-over'
            },

            // Setup your static columns
            columns : [
                {
                    xtype    : 'namecolumn',
                    sortable : true,
                    width    : 200
                },
                {
                    xtype : 'startdatecolumn'
                }
            ],

            taskStore       : taskStore,
            dependencyStore : dependencyStore,
            plugins         : [
                this.depEditor = new Gnt.plugin.DependencyEditor({
                    showLag : true
                })
            ],

            listeners : {
                viewready : function () {
                    Ext.create('Gnt.ux.DependencyToolTip', {
                        ganttPanel : this
                    });
                }
            }
        });

        // Scroll task bar into view when clicking the row
        g.lockedGrid.view.on('itemclick', function (view, task) {
            g.getSchedulingView().scrollEventIntoView(task, false, true);
        });

        var viewport = new Ext.Viewport({
            layout : 'border',

            items : [
                g, {
                    xtype   : 'details',
                    details : '<h3>Dependency editor demo</h3>' +
                    '<p>This example shows you how you can edit dependencies by double clicking them.</p>' +
                    '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
                }
            ]
        });
    }
};
