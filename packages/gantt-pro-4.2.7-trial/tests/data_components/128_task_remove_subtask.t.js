StartTest(function(t) {

    var taskStore;

    t.beforeEach(function() {
        taskStore = new Gnt.data.TaskStore({
            root : {
                children : [
                    {
                        Id       : 1,
                        children : [
                            {
                                Id   : 11,
                                children : [
                                    {
                                        Id   : 111,
                                        leaf : true
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        });
    });

    t.afterEach(function() {
        Ext.destroy(taskStore);
    });

    // Check that revoval attempts of already remove sutask doesn't cause an exception (#2320)
    t.it('removeSubtask calls for already removed nodes doesnt raise an exception', function(t) {
        var task1  = taskStore.getNodeById(1);
        var task11 = taskStore.getNodeById(11);
        var task111 = taskStore.getNodeById(111);

        t.livesOk(function () {
            task1.removeSubtask(task11);
            task11.removeSubtask(task111);
        });
    });

    // Ticket #2478
    t.it('removeSubtask should be able to remove children of a collapsed node', function(t) {
        var task11  = taskStore.getNodeById(11),
            task111 = taskStore.getNodeById(111);

        task11.removeSubtask(task111);

        t.is(Ext.Array.indexOf(task11.childNodes, task111), -1, "Subtask has been removed");
    });

});
