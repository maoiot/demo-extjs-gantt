/**
 * UNITTESTS for module Planner
 */
StartTest(function (t) {

    Ext.dom.GarbageCollector.interval = 1;

    var taskStore = Ext.create('Gnt.data.TaskStore');

    var crudManager = Ext.create('Gnt.data.CrudManager',{
        transport: {
            load: {
                method: 'GET',
                url: 'data/bigdataset2.js'
            }
        },
        taskStore : taskStore,
        createDependencies: function (callback) {
            var tasks = this.getTaskStore(),
                ds = this.getDependencyStore(),
                arr = [],
                next;
            tasks.getRootNode().cascadeBy(function (entry) {
                if (entry.isLeaf()) {
                    next = this.getNextLeaf(entry);
                    if (next) {
                        arr.push({
                            From: entry.getId(),
                            To: next.getId()
                        })
                    }
                }
            }, this);
            ds.add(arr);
            ds.commitChanges();
            callback.call()
        },
        /**
         * Returns the provided tasks next sibling even if it is on another parent node.
         */
        getNextLeaf:function(task){
            var nextTask = task.nextSibling;
            if(nextTask){
                return nextTask;
            }
            var section = task.parentNode.nextSibling;
            while (nextTask === null && section !== null) {
                nextTask = section.firstChild;
                section = section.nextSibling
            }
            return nextTask
        }
    });

    var gantt = Ext.create('Gnt.panel.Gantt',{
        renderTo        : Ext.getBody(),
        width           : 800,
        height          : 600,
        crudManager     : crudManager,
        plugins         : 'scheduler_treecellediting',
        columns       : [
            {
                xtype: 'namecolumn'
            },
            {
                xtype: 'durationcolumn'
            }
        ]

    });

    taskStore.on('load', function () {
        crudManager.createDependencies(function(){
            var span = gantt.getTaskStore().getTotalTimeSpan();
            gantt.setTimeSpan(span.start, span.end);
            gantt.expandAll();
        });
    }, this);

    crudManager.load();

    t.it('Edit + scroll and wait should not render isSyncronized error', function (t) {

        t.chain(
            { waitForGridContent : [gantt.lockedGrid, 0, 1, '5 hours'] },
            { dblclick : function () { return t.getCell(gantt, 1, 1); } },
            { type : "20[RETURN]" },
            function(next){
                taskStore.commitChanges();
                t.waitForEvent(gantt.normalGrid.view, 'scrollend', next);
                gantt.getSchedulingView().scrollEventIntoView(taskStore.last());
            },
            function(next){
                gantt.lockedGrid.view.scrollTo(0, 0);
                next();
            },
            { waitFor : function () { return gantt.normalGrid.view.getScrollY() === 0; } },
            { dblclick : function () { return t.getCell(gantt, 1, 1); } }
        );
    });
});