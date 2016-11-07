StartTest(function (t) {

    var undoManager;

    t.beforeEach(function () {
        undoManager && undoManager.stop();
    })

    t.it('should not record fields that represent UI state, such as "expanded"', function (t) {
        var old = Gnt.model.Task.getField('expanded').persist;

        Gnt.model.Task.getField('expanded').persist = true;

        var taskStore = t.getTaskStore({
            DATA : [
                { Id : 1, expanded : true, children : [ {} ]}
            ]
        })

        undoManager = new Gnt.data.undoredo.Manager({
            stores              : [taskStore],
            transactionBoundary : 'manual'
        })

        undoManager.start()
        undoManager.startTransaction();

        taskStore.getNodeById(1).collapse();

        undoManager.endTransaction();

        t.expect(undoManager.getUndoQueue()).toEqual([])
        t.expect(undoManager.getRedoQueue()).toEqual([])

        Gnt.model.Task.getField('expanded').persist = old;
    })
})
