StartTest(function (t) {
    var g, locked, root;

    t.beforeEach(function () {
        g = t.getGantt({
            renderTo  : Ext.getBody(),
            taskStore : new Gnt.data.TaskStore({
                root : {
                    expanded : true,
                    children : [
                        {},    // 1
                        {},    // 2
                        {
                            // 3
                            expanded : true,
                            children : [
                                {
                                    // 3.1
                                    expanded : true,
                                    children : [
                                        {
                                            // 3.1.1
                                            Id : 1
                                        }
                                    ]
                                }
                            ]
                        },

                        {       // 4
                            expanded : true,
                            children : [
                                {
                                    // 4.1
                                    Id       : 4,
                                    loaded   : true,
                                    expanded : true
                                }
                            ]
                        }
                    ]
                }
            }),
            columns   : [
                {
                    xtype     : 'namecolumn',
                    dataIndex : 'Id'
                },
                {
                    xtype : 'wbscolumn'
                }
            ]
        });

        locked = g.lockedGrid;
        root   = g.taskStore.getRootNode();
    })

    function assertWBSValues(t, values) {
        t.is(locked.view.getNodes().length, values.length);

        Ext.Array.forEach(values, function(expected, i) {
            t.matchGridCellContent(locked, i, 1, expected);
        })
    }


    t.it('Should render correct WBS code', function (t) {
        assertWBSValues(t, [
            '1',
            '2',
            '3',
            '3.1',
            '3.1.1',
            '4',
            '4.1'
        ])
    })

    t.it('Should render correct WBS code after remove', function (t) {
        root.childNodes[1].remove();

        assertWBSValues(t, [
            '1',
            '2',
            '2.1',
            '2.1.1',
            '3',
            '3.1'
        ])
    })

    t.it('Should render correct WBS code after move of node', function (t) {
        g.taskStore.setRoot({
            expanded : true,
            children : [
                {
                    Id       : 1,
                    expanded : true,
                    children : [
                        { Id : 11 },
                        { }
                    ]
                },
                {
                    Id : 2,
                    expanded : true,
                    children : [
                        { },
                        { },
                        { },
                        { },
                        { }
                    ]
                }
            ]
        })

        assertWBSValues(t, [
            '1',
            '1.1',
            '1.2',
            '2',
            '2.1',
            '2.2',
            '2.3',
            '2.4',
            '2.5'
        ])

        g.taskStore.getNodeById(2).appendChild(g.taskStore.getNodeById(11));

        assertWBSValues(t, [
            '1',
            '1.1',
            '2',
            '2.1',
            '2.2',
            '2.3',
            '2.4',
            '2.5',
            '2.6'
        ])
    })

    t.it('Should render correct WBS code after add', function (t) {
        root.insertChild(1, {});

        assertWBSValues(t, [
            '1',
            '2',
            '3',
            '4',
            '4.1',
            '4.1.1',
            '5',
            '5.1'
        ])
    })
});
