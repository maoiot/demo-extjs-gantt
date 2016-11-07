Ext.define('GanttTaskBoard.view.Gantt', {
    extend    : 'Gnt.panel.Gantt',
    xtype     : 'gantt',
    loadMask  : true,
    rowHeight : 35,
    split     : false,

    title   : 'Season events',
    iconCls : 'x-fa fa-calendar',

    border           : false,
    bodyBorder       : false,
    viewPreset       : 'monthAndYear',
    eventBorderWidth : 0,

    eventRenderer : function (taskRecord) {
        return {
            // Provide kanban tasks to the task body template
            kanbantasks : taskRecord.getKanbanTasks() || []
        };
    },

    // taskBody with an outer div (sch-gantt-task-inner) containing a progress bar and a div to hold kanban 
    // miniatures (.sch-gantt-kanban-bar)
    taskBodyTemplate : '<div class="sch-gantt-progress-bar" style="width:{progressBarWidth}px;{progressBarStyle}"></div>' +
    '<div class="sch-gantt-kanban-tasks">' +
        // template used to render kanban tasks as miniatures into gantt tasks
        '<tpl for="kanbantasks">' +
                '<div data-qtip="{data.Name}" data-kanban-id="{data.Id}" class="sch-gantt-kanban-task {data.State}"></div>' +
        '</tpl>' +
    '</div>',

    columns : [
        {
            xtype : 'namecolumn',
            width : 200,
            tdCls : 'name-column'
        }
    ],

    taskStore       : 'taskStore',
    dependencyStore : 'dependencyStore',

    initComponent : function () {
        var me = this;

        me.callParent();

        // listen for changes of kanban tasks
        me.mon(me.taskStore, {
            'kanbantaskupdate' : me.onKanbanTaskUpdate,
            'kanbantasksload'  : me.onKanbanTasksLoad,
            scope              : me
        });
    },

    /**
     * Highlight (select) a kanban task miniature
     * @param kanbanTask
     */
    highlightKanbanTaskThumb : function (kanbanTask) {
        this.clearHighlightKanbanTaskThumb();

        var node = Ext.DomQuery.selectNode('[data-kanban-id="' + kanbanTask.getId() + '"]');
        if (node) Ext.fly(node).addCls('sch-gantt-kanban-task-selected');
    },

    /**
     * Clear higlight for all kanban tasks miniatures
     */
    clearHighlightKanbanTaskThumb : function () {
        var selected = this.getSchedulingView().el.down('.sch-gantt-kanban-task-selected');
        selected && selected.removeCls('sch-gantt-kanban-task-selected');
    },

    // refresh view when kanban tasks have been loaded
    // (to trigger drawing of miniatures, data logic is implemented in TaskStore)
    onKanbanTasksLoad : function () {
        this.getSchedulingView().refreshView();
    },

    // refresh single task when related kanban task is updated
    // (redraws miniatures, data logic is implemented in TaskStore)
    onKanbanTaskUpdate : function (kanbanStore, kanbanTask, taskRecord) {
        this.getSchedulingView().refreshNode(taskRecord);
    },

    // listeners, handled in MainController
    listeners : {
        taskclick : 'onGanttTaskClick',
        select    : 'onGanttSelect',
        deselect  : 'onGanttDeselect'
    }
});