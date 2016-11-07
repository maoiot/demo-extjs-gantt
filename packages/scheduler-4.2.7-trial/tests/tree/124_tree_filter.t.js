StartTest(function (t) {
    var scheduler;

    t.expectGlobal('TreeModel');

    Ext.define('TreeModel', {
        extend : 'Sch.model.Resource',
        fields : [
            { name : 'project_id', type : 'int' }
        ]
    });

    t.it('collapseAll works ok', function (t) {
        t.beforeEach(function (t, next) {
            scheduler && scheduler.destroy();

            scheduler = t.getSchedulerTree({
                renderTo        : Ext.getBody(),
                columns         : [{ dataIndex : 'Name', xtype : 'treecolumn', width : 200 }],
                resourceStore   : new Sch.data.ResourceTreeStore({
                    model : 'TreeModel',
                    root : {
                        expanded : true,
                        children : [{
                            "Id": 1,
                            "Name": "Project 1",
                            "expanded": true,
                            "children": [{
                                "Id": 10,
                                "Name": "Task 1",
                                "expanded": true,
                                "project_id": 1,
                                "leaf": false,
                                "children": [
                                    {
                                        "Id": 100,
                                        "Name": "Sub-task 1",
                                        "expanded": true,
                                        "project_id": 1,
                                        "children": [{
                                            "Id": 1000,
                                            "Name": "Sub-sub 1",
                                            "project_id": 1,
                                            "leaf": true
                                        }]
                                    }, {
                                        "Id": 101,
                                        "Name": "Sub-task 2",
                                        "leaf": true,
                                        "project_id": 1
                                    }, {
                                        "Id": 102,
                                        "Name": "Sub-task 3",
                                        "project_id": 1,
                                        "leaf": true
                                    }
                                ]
                            }, {
                                "Id": 11,
                                "Name": "Task 2",
                                "expanded": true,
                                "project_id": 1,
                                "children": [{
                                    "Id": 110,
                                    "Name": "Sub-task 1",
                                    "project_id": 1,
                                    "leaf": true
                                }, {
                                    "Id": 111,
                                    "Name": "Sub-task 2",
                                    "project_id": 1,
                                    "leaf": true
                                }]
                            }]
                        }, {
                            "Id": 2,
                            "Name": "Project 2",
                            "expanded": true,
                            "children": [{
                                "Id": 20,
                                "Name": "Task 1",
                                "expanded": true,
                                "project_id": 2,
                                "children": [{
                                    "Id": 200,
                                    "Name": "Sub-task 1",
                                    "project_id": 2,
                                    "leaf": true
                                }]
                            }, {
                                "Id": 21,
                                "Name": "Task 2",
                                "expanded": true,
                                "project_id": 2,
                                "children": [{
                                    "Id": 210,
                                    "Name": "Sub-task 1",
                                    "project_id": 2,
                                    "leaf": true
                                }]
                            }]
                        }]
                    }
                }),
                tbar            : [
                    {
                        text : 'filter',
                        handler : function () {
                            scheduler.store.filterBy(function (node) {
                                return !!((node.id === 1 || node.data.project_id === 1) && node.id != 'root');
                            });
                        }
                    },
                    {
                        text : 'collapse all',
                        handler : function () {
                            scheduler.collapseAll();
                        }
                    },
                    {
                        text : 'expand all',
                        handler : function () {
                            scheduler.expandAll();
                        }
                    }
                ]
            });

            t.waitForRowsVisible(scheduler, next);
        });

        // In case we decide to support filterBy also, just copy this subtest and replace method
        t.it('Should work with filterTreeBy', function (t) {
            t.chain(
                function (next) {
                    scheduler.store.filterTreeBy(function (node) {
                        return node.getId() === 1 || node.get('project_id') === 1;
                    });

                    scheduler.collapseAll();

                    t.is(scheduler.lockedGrid.view.getNodes().length, 1, 'Only one parent visible');
                }
            );
        });
    });
});