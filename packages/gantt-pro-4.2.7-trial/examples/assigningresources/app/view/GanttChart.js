Ext.define('App.view.GanttChart', {
    extend           : 'Gnt.panel.Gantt',

    requires : [
        'App.view.GanttChartController'
    ],

    xtype            : 'appgantt',
    controller       : 'ganttcontroller',
    region           : 'center',
    eventBorderWidth : 0,
    rowHeight        : 32,
    columnLines      : true,

    // Object with editor and dataIndex defined
    leftLabelField : {
        dataIndex : 'Name',
        editor    : { xtype : 'textfield' }
    },

    plugins : [
        'scheduler_treecellediting'
    ],

    viewPreset : 'weekAndDayLetter',

    // Setup your static columns
    columns : [
        {
            xtype : 'namecolumn',
            width : 200
        },
        {
            xtype : 'resourceassignmentcolumn',
            width : 150
        }
    ],

    tools : [
        {
            type     : 'prev',
            tooltip  : 'Previous timespan',
            handler : 'onPrevious'
        },
        {
            type     : 'next',
            tooltip  : 'Next timespan',
            handler : 'onNext'
        },
        {
            type     : 'plus',
            tooltip  : 'Zoom in',
            handler  : 'onZoomIn'
        },
        {
            type     : 'minus',
            tooltip  : 'Zoom out',
            handler  : 'onZoomOut'
        },
        {
            type     : 'undo',
            tooltip  : 'Undo',
            itemId   : 'undotool',
            handler  : 'onUndo'
        },
        {
            type     : 'redo',
            tooltip  : 'Redo',
            itemId   : 'redotool',
            handler  : 'onRedo'
        }
    ],

    initComponent : function () {

        var crudManager = new Gnt.data.CrudManager({
            autoLoad  : true,
            transport : {
                load : {
                    url : 'data/data.js'
                }
            },
            listeners : {
                load : function () {
                    this.undoManager.start();
                },
                scope : this
            }
        });

        this.undoManager = new Gnt.data.undoredo.Manager({
            transactionBoundary : 'timeout',
            stores              : [
                crudManager.getTaskStore(),
                crudManager.getDependencyStore(),
                crudManager.getResourceStore(),
                crudManager.getAssignmentStore()
            ],
            listeners           : {
                undoqueuechange : function (manager, queue) {
                    var undoTool = Ext.first('#undotool');

                    undoTool.setDisabled(queue.length === 0);
                },
                redoqueuechange : function (manager, queue) {
                    var redoTool = Ext.first('#redotool');

                    redoTool.setDisabled(queue.length === 0);
                }
            }
        });

        Ext.apply(this, {
            crudManager : crudManager
        });

        this.callParent(arguments);
    },

    getUndoManager : function() {
        return this.undoManager;
    }
});
