StartTest(function (t) {

    var undoManager;

    t.beforeEach(function () {
        undoManager && undoManager.stop();
    });

    t.it('should not record a load transaction', function (t) {

        t.mountJsonResponse('load', {
            children : [
                { id : 2, name : 'child2', value : 'value2', leaf : true },
                { id : 5, name : 'child5', value : 'value5', leaf : true }
            ]
        });

        var taskStore = new Gnt.data.TaskStore({
            proxy : {
                type : 'ajax',
                url  : 'load'
            }
        });

        undoManager = new Gnt.data.undoredo.Manager({
            stores              : [taskStore],
            transactionBoundary : 'manual'
        });

        undoManager.start();
        undoManager.startTransaction();

        t.loadStoresAndThen(taskStore, function () {
            undoManager.endTransaction();

            t.expect(undoManager.getUndoQueue()).toEqual([]);
            t.expect(undoManager.getRedoQueue()).toEqual([]);
        });
    });

    t.it('should not record a load transaction with CrudManager', function (t) {
        t.mountJsonResponse('load2', {
            "success"      : true,
            "tasks"    : {
                "rows" : [
                    { Id : 1, leaf : true, StartDate : '2010-01-01', EndDate : '2010-01-11' },
                    { Id : 5, leaf : true, StartDate : '2010-01-02', Duration : 23 }
                ]
            }
        });

        var taskStore = new Gnt.data.TaskStore();

        var cm = new Gnt.data.CrudManager({
            autoLoad        : true,
            resourceStore   : taskStore,
            transport       : {
                load : {
                    method      : 'GET',
                    url         : 'load2'
                }
            }
        });

        undoManager = new Gnt.data.undoredo.Manager({
            stores              : [taskStore],
            transactionBoundary : 'manual'
        });

        undoManager.start();
        undoManager.startTransaction();

        t.waitForStoresToLoad(taskStore, function () {
            undoManager.endTransaction();

            t.expect(undoManager.getUndoQueue().length).toBe(0);
            t.expect(undoManager.getRedoQueue().length).toBe(0);
        });
    })
});
