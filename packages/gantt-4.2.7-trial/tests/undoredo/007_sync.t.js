StartTest(function(t) {

    // https://www.assembla.com/spaces/bryntum/tickets/2672-undo-task-deletion-creates-a-new-task/details#
    t.it("A task store under UndoManager control should not sync out deleted and then restored node", function(t) {

        var taskStore = t.getTaskStore({
            DATA : [{
                expanded : true,
                children : [{
                    leaf : true,
                    Id   : 1
                }]
            }]
        });

        var undoMan = new Gnt.data.undoredo.Manager({
            stores : [taskStore]
        });

        undoMan.start();

        undoMan.startTransaction();

        taskStore.getNodeById(1).remove();

        undoMan.endTransaction();

        undoMan.undo();

        undoMan.stop();

        t.ok(Ext.isEmpty(taskStore.getRemovedRecords()), "Task store has no removed records after record removing undo");
        t.ok(Ext.isEmpty(taskStore.getNewRecords()), "Task store has no new records after record removing undo");
    });

    // The issue reason was in fact in outdated Sch.data.mixin.FilterableTreeStore::onNodeInsert() method override. The re-inserted node wasn't removed
    // from TreeStore::removeNodes. So checking that the same code work w/o issues on a filtered tree store as well.
    t.it("A filterable and filtered task store under UndoManager should not sync out deleted and then restored node", function(t) {
        var taskStore = t.getTaskStore({
            DATA : [{
                expanded : true,
                children : [{
                    leaf : true,
                    Id   : 1
                }, {
                    leaf : true,
                    Id   : 2
                }]
            }]
        });

        var undoMan = new Gnt.data.undoredo.Manager({
            stores : [taskStore]
        });

        undoMan.start();

        undoMan.startTransaction();

        // Node 1 will be filtered out
        taskStore.filterTreeBy(function(node) { return node.getId() === 2; });

        taskStore.getNodeById(1).remove();

        undoMan.endTransaction();

        undoMan.undo();

        undoMan.stop();

        // TODO 'lastParentId' field leaks
        // https://www.sencha.com/forum/showthread.php?307264
        t.todo(function(t) {
            t.isDeeply(taskStore.getUpdatedRecords(), [], "Task store has no updated records after record removing undo");
        })
        t.isDeeply(taskStore.getRemovedRecords(), [], "Task store has no removed records after record removing undo");
        t.isDeeply(taskStore.getNewRecords(), [], "Task store has no new records after record removing undo");
    });
});
