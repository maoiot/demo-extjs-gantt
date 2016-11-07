Ext.define('GanttTaskBoard.model.KanbanModel', {
    extend: 'Kanban.model.Task',

    states: [
        'NotStarted',
        'InProgress',
        'FollowUp',
        'Done'
    ],

    // Add field to connect Kanban tasks to Gantt tasks
    fields: [
        {name: 'TaskId', type: 'int'}
    ],

    /**
     * Get the Gantt task that this Kanban task belongs to (follows TaskId)
     * @returns {GanttTaskBoard.model.TaskModel}
     */
    getTask: function() {
        // sometimes the Kanban task seems to be moved to another store when dragging
        // as a fix, check masterStore if no taskStore
        return (this.store.taskStore || this.store.masterStore.taskStore).getNodeById(this.get('TaskId'));
    },

    // Move tasks freely
    isValidTransition : function (state) {
        return true;
    }
});