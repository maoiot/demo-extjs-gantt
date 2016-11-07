StartTest(function(t) {

    var getDataSet = function () {

        var taskStore = Ext.create("Gnt.data.TaskStore", {
            proxy       : {
                type    : 'memory',
                reader  : {
                    type    : 'json'
                }
            },

            root        : {
                expanded    : false,

                children    : [
                    {
                        Id          : 1,
                        leaf        : true,
                        StartDate   : new Date(2011, 6, 1),
                        EndDate     : new Date(2011, 6, 5)
                    },
                    {
                        Id          : 123,

                        StartDate   : new Date(2011, 6, 15),
                        EndDate     : new Date(2011, 6, 23),

                        children    : [
                            {
                                Id          : 2,
                                leaf        : true,

                                ManuallyScheduled   : true,

                                StartDate   : new Date(2011, 6, 16),
                                EndDate     : new Date(2011, 6, 20)
                            },
                            {
                                Id          : 3,
                                leaf        : true,
                                StartDate   : new Date(2011, 6, 18),
                                EndDate     : new Date(2011, 6, 22)
                            }
                        ]
                    },
                    {
                        Id          : 4,
                        leaf        : true,
                        StartDate   : new Date(2011, 6, 25),
                        EndDate     : new Date(2011, 6, 28)
                    },
                    {
                        Id          : 5,
                        leaf        : true,
                        StartDate   : new Date(2011, 6, 28),
                        EndDate     : new Date(2011, 6, 28)
                    }
                ]
            }
        });

        return taskStore
    }

    var collectIndexes = function (node) {
        var indexes = []

        Ext.each(node.childNodes, function (childNode) {
            indexes.push(childNode.get('index'))
        })

        return indexes
    }

    var sequentialIndexes = function (length) {
        var indexes = []

        for (var i = 0; i < length; i++) indexes.push(i)

        return indexes
    }

    var indexesAreOk = function (t, node, desc) {
        t.isDeeply(collectIndexes(node), sequentialIndexes(node.childNodes.length), desc)
    }


    //======================================================================================================================================================================================================================================================
    t.it("Task index should be correct initially and after data manipulation", function(t) {

        var taskStore           = getDataSet()

        indexesAreOk(t, taskStore.getRootNode(), '.. for root node')
        indexesAreOk(t, taskStore.getNodeById(123), '.. for `123` node')

        taskStore.getRootNode().insertChild(2, {})

        indexesAreOk(t, taskStore.getRootNode(), '.. for root node')

        taskStore.getRootNode().appendChild({})

        indexesAreOk(t, taskStore.getRootNode(), '.. for root node')

        taskStore.getNodeById(123).insertBefore({}, taskStore.getNodeById(3))

        indexesAreOk(t, taskStore.getNodeById(123), '.. for `123` node')
    });


    t.it("Task index should behave the same way is native tree model index", function(t) {

        var ts;

        function checkStoreBehaviour(ts) {
            var changes, n2, n3;

            n2 = ts.getNodeById(2);
            n3 = ts.getNodeById(3);

            ts.getRoot().insertBefore(n3, n2);

            t.is(n3.get('index'), 1, "Ext's native TreeStore's Node 3 has been moved from index 2 to index 1");
            t.is(n2.get('index'), 2, "Ext's native TreeStore's Node 2 has been moved from index 1 to index 2");

            changes = n3.getChanges();
            t.ok(changes.hasOwnProperty('index') && changes.index == 1, "Ext's native Node 3 has marked `index` field as changed with value 1");

            changes = n2.getChanges();
            t.ok(changes.hasOwnProperty('index') && changes.index == 2, "Ext's native Node 2 has marked `index` field as changed with value 2");
        }

        t.diag("Checking Ext's native tree store behaviour");

        ts = new Ext.data.TreeStore({
            fields : [{ name : 'index', type : 'int', defaultValue : -1, persist : true, convert : null }],
            root : {
                children : [{
                    id   : 1,
                    text : "One",
                    leaf : true
                }, {
                    id   : 2,
                    text : "Two",
                    leaf : true
                }, {
                    id   : 3,
                    text : "Tree",
                    leaf : true
                }]
            }
        });

        t.is(ts.getModel().getField('index').persist, true, "`index` field should be redefined to be perisistent");

        checkStoreBehaviour(ts);

        t.diag("Checking TaskStore's behaviour");

        ts = new Gnt.data.TaskStore({
            root : {
                children : [{
                    Id   : 1,
                    Name : "One",
                    leaf : true
                }, {
                    Id   : 2,
                    Name : "Two",
                    leaf : true
                }, {
                    Id   : 3,
                    Name : "Tree",
                    leaf : true
                }]
            }
        });

        t.is(ts.getModel().getField('index').persist, true, "`index` field should be redefined to be perisistent");

        checkStoreBehaviour(ts);
    });

});
