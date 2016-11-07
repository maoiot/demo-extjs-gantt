Ext.define('GanttTaskBoard.store.TaskStore', {
    extend  : 'Gnt.data.TaskStore',
    requires: [
        'GanttTaskBoard.model.TaskModel',
        'GanttTaskBoard.store.KanbanStore'
    ],
    model   : 'GanttTaskBoard.model.TaskModel',
    storeId : 'taskStore',
    proxy   : {
        type  : 'ajax',
        method: 'GET',
        url   : 'data/tasks.xml',
        reader: {
            type        : 'xml',
            // records will have a 'Task' tag
            record      : ">Task",
            rootProperty: "Tasks"
        }
    },

    kanbanStore: 'kanbanStore',

    /**
     * Intialization. Ties this store to a Kanban store specified in config kanbanStore
     * @param config
     */
    constructor: function (config) {
        var me = this;

        me.callParent(arguments);

        me.setKanbanTaskStore(me.kanbanStore);
    },

    /**
     * Usually called from the constructor. Ties this store to a Kanban store and sets up event listeners.
     * @param store
     */
    setKanbanTaskStore: function (store) {
        var me = this;

        me.kanbanStore = Ext.StoreMgr.lookup(store);
        me.kanbanStore.taskStore = me;

        me.kanbanStore.on({
            'load'  : me.onKanbanLoad,
            'add'   : me.onKanbanTaskAdd,
            'remove': me.onKanbanTaskRemove,
            'update': me.onKanbanTaskUpdate,
            scope   : me
        });
    },

    filterKanbanByTask: function(task) {
        var me = this;
        if (task.isLeaf()) {
            me.kanbanStore.filterByTaskId(task.getId());
        } else {
            var ids = [];
            // gather all Id:s from subtasks
            task.cascadeBy(function (t) {
                if (t.isLeaf()) ids.push(parseInt(t.getId(), 10));
            });
            // filter kanban store
            me.kanbanStore.filterByTaskIds(ids);
        }
    },

    /**
     * Updates the Gantt task that is connected to the specified Kanban task.
     * Fires 'kanbantaskupdate', attach listener to update Gantt view.
     * @param kanbanTask
     */
    updateTaskForKanbanTask: function (kanbanTask) {
        var me = this,
            taskRecord = kanbanTask.getTask();
        taskRecord.updatePercentDone();
        me.fireEvent('kanbantaskupdate', me, kanbanTask, taskRecord);
    },

    // kanban task updated in store, update parent Gantt task
    onKanbanTaskUpdate: function (store, task) {
        this.updateTaskForKanbanTask(task);
    },

    // kanban store loaded, do initial update of Gantt tasks
    onKanbanLoad: function () {
        var me = this;

        me.getRoot().cascadeBy(function (r) {
            r.updatePercentDone(); // we had this as silent, but then percentdone isn't reflected to parenttaskbar...
        });

        me.fireEvent('kanbantasksload', me);
    },

    // not implemented
    onKanbanTaskAdd: function () {

    },

    // not implemented
    onKanbanTaskRemove: function () {

    }
});