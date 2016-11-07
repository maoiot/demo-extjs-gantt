StartTest(function (t) {

    var treeStore;

    Ext.define('Sch.TreeStore', {
        extend : 'Ext.data.TreeStore',

        mixins : [
            'Sch.data.mixin.FilterableTreeStore'
        ],

        constructor : function () {
            this.callParent(arguments);

            this.initTreeFiltering()
        }
    });

    t.beforeEach(function () {
        treeStore = new Sch.TreeStore({
            reApplyFilterOnDataChange : false
        });
    });

    var id         = function (id) {
        return treeStore.getNodeById(id);
    };
    var getIdRange = function () {
        return Ext.Array.map(treeStore.getRange(), function (node) {
            return node.getId()
        });
    };

    // https://www.assembla.com/spaces/bryntum/tickets/2417-new-task-is-sometimes-displaced-when-filtered-with-reapplyfilterondatachange-false/details#
    t.it("Should insert in correct order, when adding new nodes with `appendChild/insertChild` while filtered", function (t) {

        treeStore.setRootNode({
            children : [
                {
                    "id"       : 1,
                    "name"     : "Project A",
                    "expanded" : true,
                    "children" : [
                        {
                            "id"       : 2,
                            "name"     : "Planning",
                            "children" : [
                                {
                                    "id"   : 3,
                                    "name" : "Investigate",
                                    leaf   : true
                                },
                                {
                                    "id"   : 4,
                                    "name" : "Assign resources",
                                    leaf   : true
                                },
                                {
                                    "id"   : 5,
                                    "leaf" : true,
                                    "name" : "Gather documents (not resizable)"
                                },
                                {
                                    "id"   : 6,
                                    "leaf" : true,
                                    "name" : "Report to management"
                                }
                            ]
                        },
                        {
                            "name"     : "Implementation Phase",
                            "id"       : 7,
                            "children" : [
                                {
                                    "id"   : 8,
                                    "leaf" : true,
                                    "name" : "Preparation work"
                                },
                                {
                                    "id"   : 9,
                                    "leaf" : true,
                                    "name" : "Choose technology suite"
                                },
                                {
                                    "id"       : 10,
                                    "name"     : "Build prototype",
                                    "expanded" : false,
                                    "children" : [
                                        {
                                            "id"   : 14,
                                            "leaf" : true,
                                            "name" : "Follow up with customer"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id"   : 15,
                            "leaf" : true,
                            "name" : "Customer approval"
                        }
                    ]
                }
            ]
        });

        treeStore.filterTreeBy({
            filter : function (node) {
                return node.get('name').match(/g/i);
            }
        });

        id(2).insertChild(4,
            {
                id   : 999,
                name : 'New',
                leaf : true
            }
        );

        t.isDeeply(getIdRange(), [1, 2, 3, 4, 5, 6, 999, 7, 9], 'Add 1: Filter applied correctly');

        var task = id(2).insertChild(5,
            {
                id   : 1000,
                name : 'New 2',
                leaf : true
            }
        );

        t.isDeeply(getIdRange(), [1, 2, 3, 4, 5, 6, 999, 1000, 7, 9], 'Add 2: Filter applied correctly');

        id(2).insertChild(4,
            {
                id   : 1001,
                name : 'New 3',
                leaf : true
            }
        );

        t.isDeeply(getIdRange(), [1, 2, 3, 4, 5, 6, 1001, 999, 1000, 7, 9], 'Add 3: Filter applied correctly');

        treeStore.filterTreeBy({
            filter : function (node) {
                return node.get('name').match(/Investigate/i);
            }
        });

        t.isDeeply(getIdRange(), [1, 2, 3], 'Added nodes not visible after filtering again');
    });

    t.it("Should show a subtask added to a new node, while filtered", function (t) {

        treeStore.setRootNode({
            children : [
                {
                    "id"       : 1,
                    "name"     : "Project A",
                    "expanded" : true,
                    "children" : [
                        {
                            "id"       : 2,
                            "name"     : "Planning",
                            "children" : [
                                {
                                    "id"   : 3,
                                    "name" : "Investigate",
                                    leaf   : true
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        treeStore.filterTreeBy({
            filter : function (node) {
                return node.get('name').match(/g/i);
            }
        });

        id(2).appendChild(
            {
                id       : 999,
                expanded : true,
                name     : 'New',
                leaf     : true
            }
        );

        id(999).appendChild(
            {
                id   : 1000,
                name : 'New',
                leaf : true
            }
        );

        t.isDeeply(getIdRange(), [1, 2, 3, 999, 1000], 'Filter applied correctly');

        id(999).collapse();

        t.isDeeply(getIdRange(), [1, 2, 3, 999], '2 Filter applied correctly');

        id(999).expand();

        t.todo(function(t) {
            t.isDeeply(getIdRange(), [1, 2, 3, 999, 1000], '3 Filter applied correctly');
        })
    });
});
