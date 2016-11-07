describe('SchedulerPanel should support setting new stores', function (t) {

    t.expectGlobal('viewmodel', 'viewmodel2');

    t.it('setEventStore', function (t) {
        var eventStore = new Sch.data.EventStore();
        var s          = t.getScheduler({
            renderTo : document.body
        });

        s.setEventStore(eventStore);

        t.is(s.getEventStore(), eventStore);
        t.is(s.getResourceStore().getEventStore(), eventStore);
        t.is(s.getSchedulingView().getEventStore(), eventStore);
        t.is(s.getSchedulingView().getTimeAxisViewModel().eventStore, eventStore);
        t.is(s.getEventSelectionModel().store, eventStore);

        s.destroy();
    })

    t.it('with crudManager', function (t) {
        var s = t.getScheduler({
            crudManager : {
                transport : {
                    load : {
                        url : 'data.js'
                    }
                }
            },
            renderTo    : document.body
        });

        var cm              = s.getCrudManager();
        var eventStore      = new Sch.data.EventStore();
        var resourceStore   = new Sch.data.ResourceStore();
        var assignmentStore = new Sch.data.AssignmentStore();

        s.setEventStore(eventStore);
        s.setResourceStore(resourceStore);
        s.setAssignmentStore(assignmentStore);

        // Crud Manager should remain intact as the scheduler doesn't own/create it
        t.isnt(cm.getAssignmentStore(), s.getAssignmentStore());
        t.isnt(cm.getResourceStore(), s.getResourceStore());
        t.isnt(cm.getEventStore(), s.getEventStore());

        t.is(s.getAssignmentStore(), assignmentStore);
        t.is(s.getResourceStore(), resourceStore);
        t.is(s.getEventStore(), eventStore);

        s.destroy();
    });

    t.it('Setting stores via view model', function (t) {
        Ext.define('viewmodel', {
            extend : 'Ext.app.ViewModel',

            alias : 'viewmodel.scheduler',


            stores : {
                resourceStore   : {
                    type  : 'resourcestore',
                    data  : [{ Name : 'foo' }],
                    proxy : {
                        type : 'memory'
                    }
                },
                eventStore      : {
                    type  : 'eventstore',
                    data  : [{}, {}],
                    proxy : {
                        type : 'memory'
                    }
                },
                assignmentStore : {
                    type  : 'assignmentstore',
                    data  : [{}, {}, {}],
                    proxy : {
                        type : 'memory'
                    }
                }
            }
        });

        var vp = new Ext.Viewport({
            layout : 'fit',
            items  : [
                {
                    xtype     : 'schedulergrid',
                    columns   : [{ text : 'Name', dataIndex : 'Name', locked : true }, { text : 'foo' }],
                    viewModel : {
                        type : 'scheduler'
                    },
                    bind      : {
                        resourceStore   : '{resourceStore}',
                        eventStore      : '{eventStore}',
                        assignmentStore : '{assignmentStore}'
                    }
                }
            ]
        })

        var scheduler = vp.down('schedulerpanel');

        t.waitForRowsVisible(scheduler, function () {
            t.is(scheduler.getEventStore().getCount(), 2);
            t.is(scheduler.getResourceStore().getCount(), 1);
            t.is(scheduler.getAssignmentStore().getCount(), 3);

            // https://www.sencha.com/forum/showthread.php?307968-Viewmodel-can-t-be-used-with-locking-grid&p=1124891#post1124891
            t.knownBugIn('6.0.1.250', function (t) {
                //vp.destroy();
            })
        })
    })

    t.it('Tree Scheduler Setting stores via view model', function (t) {
        Ext.define('viewmodel2', {
            extend : 'Ext.app.ViewModel',

            alias : 'viewmodel.scheduler2',

            stores : {
                resourceStore   : {
                    type  : 'resourcetreestore',
                    proxy : {
                        type : 'memory'
                    },
                    root  : {
                        expanded : true,
                        children : [
                            { Name : 'foo' }
                        ]
                    }
                },
                eventStore      : {
                    type  : 'eventstore',
                    data  : [{}, {}],
                    proxy : {
                        type : 'memory'
                    }
                },
                assignmentStore : {
                    type  : 'assignmentstore',
                    data  : [{}, {}, {}],
                    proxy : {
                        type : 'memory'
                    }
                }
            }
        });

        var vp = new Ext.Viewport({
            layout : 'fit',
            items  : [
                {
                    xtype     : 'schedulertree',
                    columns   : [{ xtype : 'treecolumn', text : 'Name', dataIndex : 'Name', locked : true }, { text : 'foo' }],
                    viewModel : {
                        type : 'scheduler2'
                    },
                    bind      : {
                        resourceStore   : '{resourceStore}',
                        eventStore      : '{eventStore}',
                        assignmentStore : '{assignmentStore}'
                    }
                }
            ]
        })

        var scheduler = vp.down('schedulertree');

        t.waitForRowsVisible(scheduler, function () {
            t.is(scheduler.getEventStore().getCount(), 2);
            t.is(scheduler.getResourceStore().getCount(), 1);
            t.is(scheduler.getAssignmentStore().getCount(), 3);

            // https://www.sencha.com/forum/showthread.php?307968-Viewmodel-can-t-be-used-with-locking-grid&p=1124891#post1124891
            t.knownBugIn('6.0.1.250', function (t) {
                //vp.destroy();
            })
        })
    })
});
