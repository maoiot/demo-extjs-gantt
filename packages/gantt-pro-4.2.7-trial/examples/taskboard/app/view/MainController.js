Ext.define('GanttTaskBoard.view.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    //region Gantt

    // called when clicking a gantt task (anywhere in the row),
    // filters Kanban to display only related tasks
    onGanttSelect: function (selModel, task) {
        var me = this,
            taskBoard = me.lookupReference('taskboard'),
            gantt = me.lookupReference('gantt');

        // filter kanban
        gantt.getTaskStore().filterKanbanByTask(task);

        // alter title to show name of clicked task
        taskBoard.setTitle('Activities for ' + task.get('Name'));
        taskBoard.setIconCls('x-fa fa-filter');

        // enable clearing of filter
        me.lookupReference('showAllBtn').enable();

        // deselect all miniatures (kanban tasks in taskboard get deselected on filtering)
        me.lookupReference('gantt').clearHighlightKanbanTaskThumb();
    },

    // deselection isn't enabled in this demo
    onGanttDeselect: function () {
        this.clearKanbanFilter();
    },

    // clicked on a task, determines if a minature has been clicked.
    // if so it is selected in the taskboard
    onGanttTaskClick: function (gantt, r, e) {
        var me = this,
            el = Ext.fly(e.target),
            taskBoard = me.lookupReference('taskboard');
        if (el.hasCls('sch-gantt-kanban-task')) {
            // find kanban task from miniatures data-kanban-id attribute
            var kanbanTaskId = parseInt(el.getAttribute('data-kanban-id'), 10),
                kanbanTask = taskBoard.getTaskStore().getById(kanbanTaskId);

            // select only that kanbantask and its miniature
            taskBoard.getSelectionModel().select(kanbanTask);
            me.lookupReference('gantt').highlightKanbanTaskThumb(kanbanTask);
        }
    },

    //endregion

    //region Kanban

    // when kanban task is selected, highlight corresponding miniature
    onKanbanTaskSelect: function (kanban, kanbanTask) {
        this.lookupReference('gantt').highlightKanbanTaskThumb(kanbanTask);
    },

    // when kanban task is deselected, clear highlight
    onKanbanTaskDeselect: function () {
        this.lookupReference('gantt').clearHighlightKanbanTaskThumb();
    },

    // clear filter button, clears filters :)
    onKanbanShowAllClick: function () {
        this.clearKanbanFilter();
    },

    /**
     * Clears kanban filter, displays all kanban tasks and removes any highlight from miniatures
     */
    clearKanbanFilter: function () {
        var me = this,
            taskBoard = me.lookupReference('taskboard'),
            gantt = me.lookupReference('gantt');

        // clear kanban filter
        taskBoard.getTaskStore().clearFilter();
        taskBoard.getSelectionModel().deselectAll();
        // update title and icon
        taskBoard.setTitle('All activities');
        taskBoard.setIconCls('x-fa fa-asterisk');
        // disable clearing
        me.lookupReference('showAllBtn').disable();
        // deselect tasks and miniatures
        gantt.getSelectionModel().deselectAll();
        gantt.clearHighlightKanbanTaskThumb();
    }
    //endregion
});
