Ext.define('GanttTaskBoard.model.TaskModel', {
    extend : 'Gnt.model.Task',

    /**
     * Updates PercentDone by checking state of related KanbanTasks.
     */
    updatePercentDone : function () {
        // for summary tasks we rely on the gantt logic
        if (this.get('leaf')) {
            this.setPercentDone(this.calculatePercentDone());
        }
    },

    /**
     * Calculates PercentDone by checking how many of the related Kanban tasks that have state 'Done'
     * @returns {number} percent
     */
    calculatePercentDone : function() {
        var done  = 0,
            tasks = this.getKanbanTasks() || [];

        Ext.Array.each(tasks, function (t) {
            if (t.getState() === 'Done') done++;
        });

        return tasks.length ? Math.round((done / tasks.length) * 100) : 100;
    },

    /**
     * Get related Kanban tasks (where KanbanTask.TaskId == Task.Id)
     * @returns {*} Array of related Kanban tasks
     */
    getKanbanTasks: function() {
        var me = this,
            kanbanStore = me.getTaskStore().kanbanStore;

        return kanbanStore.getKanbanTasksByTaskId(parseInt(this.getId(), 10));
    }
});