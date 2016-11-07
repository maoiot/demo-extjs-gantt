StartTest(function(t) {
    var g;

    t.beforeEach(function () {
        g && g.destroy()
    })

    t.it('Should support reordering nodes in the tree', function (t) {
        g = t.getGantt({
            taskStore : t.getTaskStore({
                DATA : [
                    { Id : 1, Name : 'foo', leaf : true },
                    { Id : 2, Name : 'foo2', leaf : true },
                    { Id : 3, Name : 'bar', leaf : true }
                ]
            }),
            renderTo  : Ext.getBody()
        });

        t.is(g.taskStore.getNodeById(1).data.index, 0, 'Index 0 before drag')

        t.chain(
            { waitFor : 'rowsVisible' },

            // should not throw any exceptions
            { drag : '.x-grid-cell-treecolumn', by : [ 0, 200 ] },

            { drag : '.x-grid-cell-treecolumn', by : [ 0, 60 ] },

            function () {
                t.is(g.taskStore.getNodeById(1).data.index, 2, 'Index 2 after drag')
            }
        );
    });

    t.it('Should recalculate parent nodes correctly after reordering nodes in the tree', function (t) {
        g = t.getGantt({
            taskStore : t.getTaskStore({
                DATA : [
                    { Id : 20, Name : 'New parent', leaf : false, children : [] },
                    {
                        // Parent intentionally lacks calculated data to assure it's updated correctly
                        Id        : 11,
                        StartDate : '2010-10-11',
                        Duration  : 5,
                        expanded  : true,
                        children  : [
                            { Id : 1, Name : 'child1', leaf : true, StartDate : '2010-10-11', Duration : 3 },
                            { Id : 4, Name : 'child2', leaf : true, StartDate : '2010-10-14', Duration : 2 }
                        ]
                    },
                    { Id : 2, Name : 'foo2', leaf : true, StartDate : '2010-10-11', Duration : 10 },
                    { Id : 3, Name : 'bar', leaf : true, StartDate : '2010-10-11', Duration : 10 }
                ]
            }),
            renderTo  : Ext.getBody()
        });

        var oldParent = g.taskStore.getNodeById(11);
        var newParent = g.taskStore.getNodeById(20);

        t.is(g.taskStore.getNodeById(11).getDuration(), 5, 'Duration 5')

        t.chain(
            { waitFor : 'rowsVisible' },

            // should not throw any exceptions
            { drag : '.x-grid-cell:contains(child1)', to : '.x-grid-cell' },

            function () {
                t.is(oldParent.getDuration(), 2, 'Duration 2 in old parent')
                t.is(newParent.getDuration(), 3, 'Duration 3 in new parent');
            }
        );
    });
})
