StartTest(function (t) {

    var gantt;

    t.beforeEach(function() {
        gantt && gantt.destroy();
    });

    // https://app.assembla.com/spaces/bryntum/tickets/2721-uncaught-error--can--39-t-find-a-taskstore-in-%60gettaskstore%60-after-undo/details#
    t.it("Adding records, then undoing while view is filtered should not crash", function (t) {

        var taskStore = new Gnt.data.TaskStore({
            reApplyFilterOnDataChange : false,
            root                      : {
                expanded : true,
                children : [
                    {
                        Id       : 11,
                        expanded : true,
                        children : [
                            {
                                leaf : true,
                                Id   : 1,
                                Name : 'asf'
                            },
                            {
                                leaf : true,
                                Id   : 2,
                                Name : 'we'
                            }
                        ]
                    }
                ]
            }
        });

        var undoMan = new Gnt.data.undoredo.Manager({
            stores : [ taskStore ]
        });

        gantt = t.getGantt({
            taskStore       : taskStore,
            renderTo        : document.body,
            dependencyStore : new Gnt.data.DependencyStore({
                data : [
                    { From : 1, To : 2 }
                ]
            }),

            columns : [
                { xtype : 'namecolumn' },
                { xtype : 'predecessorcolumn', useSequenceNumber : true }
            ]
        })

        undoMan.start();

        gantt.taskStore.filterTreeBy(function (task) {
            return task.id === 2;
        })

        undoMan.startTransaction();

        var task1 = taskStore.getNodeById(11).appendChild({ Name : 'foo' });
        t.expect(task1.get('visible')).toBe(true);

        // Object.defineProperty(task1.data, 'visible', { set : function(v) { debugger; }})
        undoMan.endTransaction();

        undoMan.startTransaction();

        var task2 = taskStore.getNodeById(11).appendChild({ Name : 'bar' });

        t.expect(task1.get('visible')).not.toBe(false);

        undoMan.endTransaction();

        undoMan.undo();

        undoMan.undo();

        undoMan.stop();

        t.isDeeply(taskStore.getNewRecords(), [], "Task store has no new records after record add undo");
        t.isDeeply(taskStore.getModifiedRecords(), [], "Task store has no changed records after record add undo");

        t.chain(
            { waitForSelectorNotFound: '.x-grid-cell:contains(foo)'}
        )
    });

    t.xit("Adding records, then removing while view is filtered should work", function (t) {

        var taskStore = new Gnt.data.TaskStore({
            reApplyFilterOnDataChange : false,
            root                      : {
                expanded : true,
                children : [
                    {
                        Id       : 11,
                        expanded : true,
                        children : [
                            {
                                leaf : true,
                                Id   : 1,
                                Name : 'asf'
                            },
                            {
                                leaf : true,
                                Id   : 2,
                                Name : 'we'
                            }
                        ]
                    }
                ]
            }
        });

        gantt = t.getGantt({
            taskStore       : taskStore,
            renderTo        : document.body,
            dependencyStore : new Gnt.data.DependencyStore({
                data : [
                    { From : 1, To : 2 }
                ]
            }),

            columns : [
                { xtype : 'namecolumn' },
                { xtype : 'predecessorcolumn', useSequenceNumber : true }
            ]
        })

        gantt.taskStore.filterTreeBy(function (task) {
            return task.id === 2;
        })

        var task1 = taskStore.getNodeById(11).appendChild({ Name : 'first', leaf : true });
        var task2 = taskStore.getNodeById(11).appendChild({ Name : 'second', leaf : true });

        gantt.taskStore.removeTasks(task2);

        t.selectorExists('.x-grid-cell:contains(first)', 'First record still here');
    });
});
