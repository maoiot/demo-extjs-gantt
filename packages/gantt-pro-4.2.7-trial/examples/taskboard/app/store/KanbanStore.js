Ext.define('GanttTaskBoard.store.KanbanStore', {
    extend  : 'Kanban.data.TaskStore',
    requires: [
        'GanttTaskBoard.model.KanbanModel'
    ],
    model   : 'GanttTaskBoard.model.KanbanModel',
    storeId : 'kanbanStore',
    autoLoad: true,
    proxy   : {
        type  : 'ajax',
        method: 'GET',
        url   : 'data/kanban.xml',
        reader: {
            type        : 'xml',
            // records will have a 'Task' tag
            record      : ">Task",
            rootProperty: "Tasks"
        }
    },

    /**
     * Filter store to contain only kanban tasks related to specified Gantt taskId (single)
     * @param taskId Single taskId
     */
    filterByTaskId: function(taskId) {
        this.filter({
            property: 'TaskId',
            value   : taskId
        });
    },

    /**
     * Filter store to contain only kanban tasks related to specified Gantt taskIds (multiple)
     * @param taskIds Array of taskIds
     */
    filterByTaskIds: function(taskIds) {
        // display kanban tasks belonging to all subtasks
        this.filterBy(function(t) {
            return Ext.Array.contains(taskIds, t.data.TaskId);
        });
    },
    
    /**
     * Get all Kanban tasks that belongs to a specific Gantt task.
     * @param taskId Id of a Gantt task, matched to Kanban tasks field TaskId
     * @returns {*} Array of Kanban tasks
     */
    getKanbanTasksByTaskId: function (taskId) {
        return this.query('TaskId', taskId).items;
    }
});