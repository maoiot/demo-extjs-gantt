// https://www.assembla.com/spaces/bryntum/tickets/2618
StartTest(function (t) {
    t.it('Should restore all removed child tasks', function (t) {
        var taskStore = t.getTaskStore({
            DATA    : [
                {
                    expanded     : true,
                    Id           : 1,
                    children     : [
                        {
                            leaf         : true,
                            Id           : 2
                        },
                        {
                            leaf         : true,
                            Id           : 3
                        }
                    ]
                }
            ]
        });

        var undoMan = new Gnt.data.undoredo.Manager({
            stores : [taskStore]
        });

        undoMan.start();

        undoMan.startTransaction();

        taskStore.removeTasks([taskStore.getById(1), taskStore.getById(2)]);

        undoMan.endTransaction();

        t.is(taskStore.getCount(), 0, 'Store is empty');

        undoMan.undo();

        t.is(taskStore.getCount(), 3, 'All records are restored');
        t.is(taskStore.getById(1).childNodes.length, 2, 'All child nodes are restored');
    });

    // #2687
    // https://www.assembla.com/spaces/bryntum/tickets/2687-undo-task-indent-leaves-spuriously-changed-attributes/details#
    t.xit("Should not have any unsynced data after indenting and undoing", function(t) {
        t.fail("TODO");
    });
});
