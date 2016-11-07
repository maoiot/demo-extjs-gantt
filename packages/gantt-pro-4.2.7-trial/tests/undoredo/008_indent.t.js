StartTest(function (t) {

    // https://www.assembla.com/spaces/bryntum/tickets/2687-undo-task-indent-leaves-spuriously-changed-attributes/details#
    t.it("Indent + undo should not leave any modified records", function (t) {

        var taskStore = new Gnt.data.TaskStore({
            root  : {
                expanded : true,
                children : [
                    {
                        Id       : 11,
                        children : [
                            {
                                leaf : true,
                                Id   : 1
                            },
                            {
                                leaf : true,
                                Id   : 2
                            }
                        ]
                    }
                ]
            }
        });



        var undoMan = new Gnt.data.undoredo.Manager({
            stores : [taskStore]
        });

        undoMan.start();

        undoMan.startTransaction();

        taskStore.getNodeById(2).indent();

        undoMan.endTransaction();

        undoMan.undo();

        undoMan.stop();

        t.isDeeply(taskStore.getUpdatedRecords(), [], "Task store has no updated records after record removing undo");
        t.isDeeply(taskStore.getRemovedRecords(), [], "Task store has no removed records after record removing undo");
        t.isDeeply(taskStore.getNewRecords(), [], "Task store has no new records after record removing undo");
    });

    t.it("Indent + undo should not leave any modified records", function (t) {

        var taskStore = t.getTaskStore({
            DATA  : [{
                expanded : true,
                children : [
                    {
                        leaf : true
                    },
                    {
                        leaf : true,
                        Id   : 2
                    }
                ]
            }]
        });

        var undoMan = new Gnt.data.undoredo.Manager({
            stores : [taskStore]
        });

        undoMan.start();

        undoMan.startTransaction();

        taskStore.getRoot().firstChild.firstChild.indent();

        undoMan.endTransaction();

        undoMan.undo();

        undoMan.stop();

        t.isDeeply(taskStore.getUpdatedRecords(), [], "Task store has no updated records after record removing undo");
        t.isDeeply(taskStore.getRemovedRecords(), [], "Task store has no removed records after record removing undo");
    });
});
