StartTest(function(t) {
    // hint: to understand what's going on in the tests you need to actually draw the tasks with dates on paper

    // Various methods of the dependency store and `successors/predecessors` (incoming/outgoing deps) 
    // properties of the task model are cached
    // in this test we'll verify that cache is correctly reset/refreshed after CRUD operations with dependencies 
    t.it('caching should work correctly', function (t) {
        /* global taskStore, depStore, dependencyStore, id, depId */
        with (t.getAllStoresDataSet( // jshint ignore:line
            [
                {
                    Id          : 1,
                    children    : [
                        {
                            Id          : 11,
                            leaf        : true
                        },
                        {
                            Id          : 12,
                            leaf        : true
                        }
                    ]
                },
                {
                    Id          : 20,
                    children    : [
                        {
                            Id          : 21,
                            leaf        : true
                        },
                        {
                            Id          : 22,
                            leaf        : true
                        }
                    ]
                },
                {
                    Id          : 30,
                    leaf        : true
                }
            ],
            [
                {
                    Id          : 'd1',
                    From        : 11,
                    To          : 21
                },
                {
                    Id          : 'd2',
                    From        : 22,
                    To          : 30
                }
            ]
        )) {
            t.verifyCachedDependenciesState(taskStore, dependencyStore);

            t.notOk(depStore.hasTransitiveDependency(11, 30), "No transitive dependency");

            depStore.add({ Id : 'd3', From : 21, To : 22 });

            t.verifyCachedDependenciesState(taskStore, dependencyStore);

            t.ok(depStore.hasTransitiveDependency(11, 30), "Transitive dependency appeared");

            depId('d3').set({
                From        : 22,
                To          : 21
            });

            t.verifyCachedDependenciesState(taskStore, dependencyStore);

            var dep4    = depStore.add({ Id : 'd4' })[ 0 ];

            dep4.setSourceTask(id(11));

            t.verifyCachedDependenciesState(taskStore, dependencyStore);

            dep4.setTargetTask(id(12));

            t.verifyCachedDependenciesState(taskStore, dependencyStore);

            dep4.reject();

            t.verifyCachedDependenciesState(taskStore, dependencyStore);

            depStore.removeAll();

            t.verifyCachedDependenciesState(taskStore, dependencyStore);
        }
    })

    t.it("Caching should work if we are adding a branch node into a data model with dependencies filled in the dependency store", function(t) {
        with (t.getAllStoresDataSet( // jshint ignore:line
            // No tasks are initially added
            [],
            // But dependencies are
            [{
                Id   : 'd1',
                From : 1,
                To   : 2
            }]
        )) {
            taskStore.getRoot().appendChild({
                Id : 'Branch',
                children : [{
                    Id : 1
                }, {
                    Id : 2
                }]
            });

            t.is(taskStore.getModelById(1).getSuccessors().length, 1);
            t.is(taskStore.getModelById(2).getPredecessors().length, 1);
        }
    });
});
