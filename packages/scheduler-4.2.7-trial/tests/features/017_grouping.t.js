StartTest(function (t) {
    Ext.define('Sch.model.TempResource', {
        extend : 'Sch.model.Resource',
        fields : ['Group']
    });

    var scheduler;

    var getSetup = function (config) {
        scheduler && scheduler.destroy();

        var resourceStore = t.getResourceStore({
            groupField : 'Group',
            model      : 'Sch.model.TempResource',
            data       : (function () {
                var resources = [];
                for (var i = 1; i <= 5; i++) {
                    resources.push({
                        Id    : 'r' + i,
                        Name  : 'Resource ' + i,
                        Group : 'Group'
                    });
                }

                return resources;
            })()
        });

        scheduler = t.getScheduler(Ext.apply({
            renderTo    : Ext.getBody(),
            features    : [{
                id                 : 'group',
                ftype              : 'scheduler_grouping',
                groupHeaderTpl     : '{name}',
                hideGroupedHeader  : true,
                enableGroupingMenu : false,

                headerRenderer     : function (startDate, endDate, resources, meta) {
                    meta.cellCls    = 'testCls';
                    meta.cellStyle  = 'border-left: red 4px solid;';

                    var count = 0;

                    Ext.each(resources, function (resource) {
                        Ext.each(resource.getEvents(), function (event) {
                            if (startDate <= event.getStartDate() && endDate > event.getStartDate()) {
                                ++count;
                            }
                        });
                    });

                    return 'Events: ' + count;
                }
            }],
            resourceStore : resourceStore,
            dependencyViewConfig : {
                drawDependencies : false
            }
        }, config));
    };

    t.it('Should apply custom renderer to grouping header', function (t) {
        getSetup();

        t.waitForEventsToRender(scheduler, function () {
            var cells = scheduler.el.query('.sch-grid-group-hd-cell');
            var el = Ext.fly(cells[1]);

            t.hasCls(el, 'testCls', 'Custom class set correctly');
            t.is(el.getStyle('border-left-color'), Ext.isIE8 ? 'red' : 'rgb(255, 0, 0)', 'Border color set correctly');
            t.is(el.getStyle('border-left-style'), 'solid', 'Border style set correctly');
            t.is(el.getStyle('border-left-width'), '4px', 'Border width set correctly');
            t.contentLike(el, 'Events: 1', 'Content rendered correctly');

            t.lockedAndNormalRowsSynced(scheduler);
        });
    });

    t.it('Should refresh columns with assignment store', function (t) {
        var resourceStore   = new Sch.data.ResourceStore({
            groupField : 'Group',
            model      : 'Sch.model.TempResource',
            data       : [
                {
                    Id      : 'r1',
                    Name    : 'Al',
                    Group   : 'A'
                },
                {
                    Id      : 'r2',
                    Name    : 'Mike',
                    Group   : 'A'
                },
                {
                    Id      : 'r3',
                    Name    : 'Linda',
                    Group   : 'A'
                },
                {
                    Id      : 'r4',
                    Name    : 'Carl',
                    Group   : 'A'
                },
                {
                    Id      : 'r5',
                    Name    : 'Steve',
                    Group   : 'B'
                },
                {
                    Id      : 'r6',
                    Name    : 'Adam',
                    Group   : 'B'
                }
            ]
        });

        var assignmentStore = new Sch.data.AssignmentStore({
            data : [
                {
                    EventId    : 'e1',
                    ResourceId : 'r2'
                },
                {
                    EventId    : 'e1',
                    ResourceId : 'r3'
                }
            ]
        });

        var eventStore      = new Sch.data.EventStore({
            data            : [{
                Id        : 'e1',
                Name      : 'Event 1',
                StartDate : '2011-01-04',
                EndDate   : '2011-01-06'
            }],
            resourceStore   : resourceStore,
            assignmentStore : assignmentStore
        });

        getSetup({
            eventStore    : eventStore,
            resourceStore : resourceStore
        });

        var view    = scheduler.getSchedulingView(),
            counter = 0,
            cell;

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                view.on('itemupdate', function () {
                    counter++;
                });
                next();
            },
            { drag : '.x-grid-item[data-recordindex="2"] .sch-event', by : [100, 30] },
            function (next) {
                // 10 itemupdates is a bit too much for multiassignment:
                // 2 are from setStartDate which also call setEndDate
                // double that because of multiassignment
                // 2 are caused by grouping feature refreshing grouping headers
                // another 4 are from another onAssignmentAdd listener that refreshes all nodes again
                // not much we can do about that
                t.isLess(counter, 10, 'Correct amount of node updates');
                cell = Ext.fly(view.getNode(resourceStore.getById('r1'))).down('.sch-grid-group-hd-cell:nth-child(3)');
                t.contentLike(cell, 'Events: 2', 'Header cell updated correctly');
                next();
            },
            { drag : '.x-grid-item[data-recordindex="3"] .sch-event', by : [0, 90] },
            function () {
                t.isLess(counter, 14, 'Correct amount of node updates');
                cell = Ext.fly(view.getNode(resourceStore.getById('r1'))).down('.sch-grid-group-hd-cell:nth-child(3)');
                t.contentLike(cell, 'Events: 1', 'Header cell updated correctly');
                cell = Ext.fly(view.getNode(resourceStore.getById('r5'))).down('.sch-grid-group-hd-cell:nth-child(3)');
                t.contentLike(cell, 'Events: 1', 'Header cell updated correctly');
            }
        )
    });

    t.it('Should update grouping header after event add, update', function (t) {
        getSetup();

        t.chain(
            { waitForEventsToRender : scheduler },

            function () {

                t.it('Updating event start date', function(t) {
                    var event = scheduler.eventStore.getAt(1);
                    event.setStartDate(new Date(2011, 0, 4, 10), true);

                    var cells = scheduler.el.query('.sch-grid-group-hd-cell');
                    t.contentLike(Ext.fly(cells[1]), 'Events: 2', 'Header cell updated correctly');
                    t.contentLike(Ext.fly(cells[2]), 'Events: 0', 'Header cell updated correctly');

                    event = scheduler.eventStore.getAt(2);
                    event.setStartDate(new Date(2011, 0, 5, 15), true);

                    cells = scheduler.el.query('.sch-grid-group-hd-cell');
                    t.contentLike(Ext.fly(cells[2]), 'Events: 1', 'Header cell updated correctly');
                    t.contentLike(Ext.fly(cells[3]), 'Events: 0', 'Header cell updated correctly');
                });

                t.it('Adding event ', function(t) {
                    var e = Ext.create('Sch.model.Event', {
                        StartDate : new Date(2011, 0, 3, 4),
                        EndDate   : new Date(2011, 0, 3, 15),
                        Name      : 'New',
                        Group     : 'Group'
                    });

                    var r = scheduler.resourceStore.getById('r5');

                    e.assign(r);

                    scheduler.eventStore.add(e);

                    var cells = scheduler.el.query('.sch-grid-group-hd-cell');
                    t.contentLike(Ext.fly(cells[0]), 'Events: 1', 'Header cell updated correctly');
                });
            }
        );
    });

    t.it('Should update grouping header after CUD operations on event', function (t) {
        getSetup();

        t.waitForEventsToRender(scheduler, function () {
            // create
            t.contentLike(scheduler.el.down('.sch-grid-group-hd-cell'), 'Events: 0', 'Header updated correctly');
            scheduler.eventStore.add({
                Id         : 100,
                ResourceId : 'r1',
                Name       : 'Test assignment',
                StartDate  : new Date(2011, 0, 3),
                EndDate    : new Date(2011, 0, 7)
            });
            t.contentLike(scheduler.el.down('.sch-grid-group-hd-cell'), 'Events: 1', 'Header updated correctly');

            // update
            scheduler.eventStore.last().setStartDate(new Date(2011, 0, 5));
            t.contentLike(Ext.fly(scheduler.el.query('.sch-grid-group-hd-cell')[2]), 'Events: 2', 'Header updated correctly');

            scheduler.eventStore.remove(scheduler.eventStore.last());
            t.contentLike(Ext.fly(scheduler.el.query('.sch-grid-group-hd-cell')[2]), 'Events: 1', 'Header updated correctly');

        });
    });

    t.it('Should update grouping header after CUD operations on resource', function (t) {
        getSetup({
            features : [
                {
                    id                 : 'group',
                    ftype              : 'scheduler_grouping',
                    groupHeaderTpl     : '{name}',
                    hideGroupedHeader  : true,
                    enableGroupingMenu : false,

                    headerRenderer : function (startDate, endDate, resources, meta) {
                        meta.cellCls    = resources[0].get('Group');
                        return 'Resources: ' + resources.length;
                    }
                }
            ]
        });

        var view = scheduler.getSchedulingView();

        t.waitForEventsToRender(scheduler, function () {
            // create new group to test multiple added items
            scheduler.resourceStore.add({
                Id    : 'resource1',
                Name  : 'Resource1',
                Group : 'Group1'
            });
            // create
            scheduler.resourceStore.add([{
                Id    : 'resource2',
                Name  : 'Resource2',
                Group : 'Group'
            }, {
                Id    : 'resource3',
                Name  : 'Resource3',
                Group : 'Group1'
            }]);

            t.contentLike(view.el.down('.Group'), 'Resources: 6', 'Header updated correctly');
            t.contentLike(view.el.down('.Group1'), 'Resources: 2', 'Header updated correctly');

            // update
            scheduler.resourceStore.getAt(0).set('Group', 'Group1');
            t.contentLike(view.el.down('.Group'), 'Resources: 5', 'Header updated correctly');

            // remove
            scheduler.resourceStore.removeAt(0);

            // http://www.sencha.com/forum/showthread.php?295953-5.1-Grouping-feature-regression&p=1080543#post1080543
            t.knownBugIn('6.0.2.437', function(t) {
                t.selectorNotExists(scheduler.lockedGrid.view.itemSelector + ':contains(Resource 1)', 'First resource not found after remove');
                t.contentLike(view.el.down('.Group'), 'Resources: 4', 'Header updated correctly');
            }, 'Sencha bug');
        });
    });

    t.it('Drag create should work correctly with group collapsed', function (t) {
        getSetup({
            cls : 'fifth',

            resourceStore   : t.getResourceStore({
                groupField  : 'Group',
                model       : 'Sch.model.TempResource',
                data        : (function () {
                    var resources = [];
                    for (var i = 1; i < 3; i++) {
                        for (var j = 1; j <= 5; j++) {
                            resources.push({
                                Id          : 'r' + i + j,
                                Name        : 'Resource ' + i + j,
                                Group       : 'Group' + i
                            });
                        }
                    }

                    return resources;
                })()
            })
        });

        t.chain(
            { click : ".fifth .x-grid-group-title", offset : [7, 7] },
            { drag : '.fifth .x-grid-item[data-recordindex="3"] .sch-timetd', offset : [104, 16], by : [86, 0] },

            function (next) {
                var event = scheduler.eventStore.last();
                t.ok(Sch.util.Date.betweenLesser(event.getStartDate(), new Date(2011, 0, 4), new Date(2011, 0, 5)), 'Start date is correct');
                t.is(scheduler.resourceStore.getAt(7), event.getResource(), 'Resource is correct');
                t.selectorExists('.sch-event', 'Event is rendered');
                next();
            },

            { drag : '.fifth .x-grid-item[data-recordindex="5"] .sch-timetd', offset : [3, 16], by : [86, 0] },

            function () {
                t.contentLike(scheduler.el.query('.testCls span')[scheduler.timeAxis.getCount()], 'Events: 1', 'Header updated');
                t.is(scheduler.el.query('.sch-event').length, 2, 'Two events are rendered');
            }
        );
    });

    t.it('Should work ok when store is not grouped', function (t) {

        t.it('Should work ok with assignment store', function (t) {
            scheduler && scheduler.destroy();

            scheduler = t.getScheduler({
                renderTo    : Ext.getBody(),
                features    : [{
                    ftype : 'scheduler_grouping'
                }],
                eventStore  : new Sch.data.EventStore({
                    data    : [
                        { Id : 1, StartDate : '2011-01-04', EndDate : '2011-01-06' },
                        { Id : 2, StartDate : '2011-01-04', EndDate : '2011-01-06' }
                    ],
                    assignmentStore : new Sch.data.AssignmentStore({
                        data    : [
                            { ResourceId : 'r1', EventId : 1 },
                            // not existing resource
                            { ResourceId : 'r100', EventId : 1 },
                            { ResourceId : 'r10', EventId : 2 },
                            { ResourceId : 'r11', EventId : 2 }
                        ]
                    })
                })
            });

            t.waitForEventsToRender(scheduler, function () {

                var assignmentStore = scheduler.eventStore.assignmentStore;

                var event, assignment, resource;

                var scenario = function () {
                    event = scheduler.eventStore.add({
                        Id        : 100,
                        StartDate : '2011-01-01',
                        EndDate   : '2011-01-10'
                    })[0];

                    assignmentStore.add({ ResourceId : 'r1', EventId : 100 });
                    assignment = assignmentStore.add({ ResourceId : 'r101', EventId : 100 })[0];

                    event.setEndDate(Sch.util.Date.add(event.getEndDate(), 'd', 1));

                    assignmentStore.remove(assignment);

                    scheduler.eventStore.remove(event);
                    resource = scheduler.resourceStore.add({ Id : 'r12', Name : 'New resource' })[0];
                    resource.setName('New resource 1');
                    scheduler.resourceStore.remove(resource);
                };

                t.livesOk(scenario);

                scheduler.resourceStore.setGrouper('Name');
                t.livesOk(scenario);

                scheduler.resourceStore.setGrouper(null);
                t.livesOk(scenario);

            });
        });

        t.it('Should work ok without assignment store', function (t) {

            scheduler && scheduler.destroy();

            scheduler = t.getScheduler({
                renderTo   : Ext.getBody(),
                features   : [{
                    ftype : 'scheduler_grouping'
                }],
                eventStore : new Sch.data.EventStore({
                    data : [
                        { Id : 1, StartDate : '2011-01-04', EndDate : '2011-01-06', ResourceId : 'r1' },
                        { Id : 2, StartDate : '2011-01-04', EndDate : '2011-01-06', ResourceId : 'r100' }
                    ]
                })
            });

            t.waitForEventsToRender(scheduler, function () {
                t.livesOk(function () {
                    scheduler.eventStore.first().assign('r101');
                    scheduler.eventStore.first().assign('102');
                    scheduler.eventStore.last().assign('r2');
                });
            })
        });
    });

    //https://app.assembla.com/spaces/bryntum/tickets/2895-issue-when-loading-scheduler-in-vertical-mode-if-grouping-feature-is-added-/details#
    t.xit('Should disable grouping if scheduler is in vertical orientation', function (t) {

        scheduler && scheduler.destroy();

        scheduler = t.getScheduler({
            renderTo   : Ext.getBody(),
            features   : [ {
                ftype : 'scheduler_grouping',
                disabled : true
            } ],
            mode       : 'vertical'
        });

        t.waitForEventsToRender(scheduler, function () {

        })
    });
});
