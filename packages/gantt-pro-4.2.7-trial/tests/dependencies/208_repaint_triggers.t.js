StartTest(function (t) {
    t.diag('Testing different scenarios that should trigger dependency repaint');

    var gantt, taskStore, depStore,  depView, view;

    t.beforeEach(function() {
        gantt && gantt.destroy();
        gantt = t.getGantt2({
            cascadeChanges  : false,
            width           : 500,
            height          : 100,
            startDate       : new Date(2012, 11, 3),
            endDate         : new Date(2012, 11, 31),
            rightLabelField : 'Name',
            forceFit        : true,
            dependencyStore : new Gnt.data.DependencyStore({
                data : [
                    {
                        From : 1,
                        To   : 2,
                        Type : 2,
                        Cls  : 'foo'
                    }
                ]
            }),
            renderTo        : document.body,
            taskStore       : new Gnt.data.TaskStore({
                root : {
                    expanded  : true,
                    children : [
                        {
                            Id        : 1,
                            StartDate : new Date(2012, 11, 3),
                            Duration  : 2,
                            leaf      : true
                        },
                        {
                            Id        : 2,
                            StartDate : new Date(2012, 11, 5),
                            Duration  : 2,
                            leaf      : true
                        }
                    ]
                }
            })
        });

        taskStore   = gantt.taskStore;
        depStore    = gantt.dependencyStore;
        depView     = gantt.getSchedulingView().getDependencyView();
        view        = gantt.getView();
    });

    t.it('Should see new dependency after dependency store add', function (t) {
        depStore.loadData([]);

        t.chain(
            function (next) {

                gantt.dependencyStore.add({
                    From : 1,
                    To   : 2,
                    Cls  : 'barz'
                });

                next();
            },

            { waitForSelector : '.barz-line' }
        )
    });

    t.it('Should see dependency refreshed after task update', function (t) {
        t.chain(
            { waitForSelector : '.foo-line'  },

            function(next) {
                t.isCalledOnce('renderDependencies', depView);

                Ext.select('.foo-line').remove();

                taskStore.getNodeById(1).shift(Sch.util.Date.DAY, 1);

                next();
            },

            { waitFor : 'selector', args : '.foo-line'  }
        );
    });


    t.it('Should see new dependency after dependency model update', function (t) {
        depStore.first().set('Cls', 'bar');

        t.chain(
            { waitFor : 'selector', args : '.bar-line' }
        );
    });

    t.it('Should see new dependency after node collapse', function (t) {
        t.chain(
            { waitForSelector : '.foo-line' },

            function(next) {
                taskStore.getRootNode().collapse();
                next();
            },

            { waitFor : 'selectorNotFound', args : '.foo-line' }
        );
    });

    t.it('Should see dependency after node expand', function (t) {

        t.chain(
            { waitFor : 'selector', args : '.foo-line' },

            function(next) {
                taskStore.getRootNode().collapse();

                t.waitForSelectorNotFound('.foo-line', next)
            },

            function(next) {
                taskStore.getRootNode().expand();

                t.waitForSelector('.foo-line', next)
            }
        );
    });

    t.it('Should not see new dependency after model removed', function (t) {
        t.chain(
            { waitFor : 'selector', args : '.foo-line' },

            function(next) {

                depStore.remove(depStore.first());
                next();
            },

            { waitFor : 'selectorNotFound', args : '.sch-dependency' }
        );
    });

    t.it('Should not see dependency after dependency removed', function (t) {

        t.chain(
            { waitFor : 'selector', args : '.foo-line' },

            function(next) {

                depStore.remove(depStore.first());
                next();
            },

            { waitFor : 'selectorNotFound', args : '.sch-dependency' }
        );

    });

    t.it('Should react to task store filtering', function (t) {
        t.chain(
            { waitFor : 'selector', args : '.foo-line' },

            function(next) {
                // first refresh is fired after render and second fires after tree filtering
                // earlier test passed in chrome, but it was catching only first event but not one triggered by filter
                t.willFireNTimes(gantt.getSchedulingView().getDependencyView(), 'refresh', 1, 'Dep view refresh');
                
                // Patched for now, See http://www.sencha.com/forum/showthread.php?290924
                t.willFireNTimes(gantt.getSchedulingView(), 'refresh', 1, 'Gantt view refresh');
                
                gantt.taskStore.filterTreeBy(function (task) {
                    return false;
                });

                next();
            },
            // this timeout is required for catching all hanging events
            // like ones that are triggered asyncronously (see Gantt.view.Dependency#renderTimer)
            { waitFor : 100 }
        )

    });

    t.it('Should refresh fully if gantt view refreshes', function (t) {
        t.chain(
            { waitForSelector : '.foo-line' },

            function(next) {
                t.willFireNTimes(gantt.getSchedulingView().getDependencyView(), 'refresh', 1, 'Dep view refresh');
                t.willFireNTimes(gantt.getSchedulingView(), 'refresh', 1, 'Gantt view refresh');

                t.waitForEvent(gantt.getSchedulingView(), 'refresh', next);

                gantt.getView().refresh();
            }
        )
    });

    t.it('Should refresh fully if gantt view fires rowexpand or rowcollapse', function (t) {
        var nbrEvents = 0;

        t.chain(
            { waitForTasksAndDependenciesToRender : gantt },
            function(next) {
                t.willFireNTimes(depView, 'refresh', 2, '2 Dep view refreshes');
                depView.on('refresh', function() { nbrEvents++; });
                next();
            },
            function(next) {
                view.fireEvent('expandbody', view);
                next();
            },
            { waitFor : function() { return nbrEvents == 1; } },
            function(next) {
                view.fireEvent('collapsebody', view);
                next();
            },
            { waitFor : function() { return nbrEvents == 2; } },
            function(next) {
                t.done();
            }
        )
    });


    t.it('Buffered view: Should refresh if task is indented', function (t) {
        gantt && gantt.destroy();

        gantt = t.getGantt2({
            height          : 200,
            startDate       : new Date(2012, 11, 3),
            endDate         : new Date(2012, 11, 31),
            forceFit        : true,
            dependencyStore : new Gnt.data.DependencyStore({
                data : [
                    {
                        From : 1,
                        To   : 2,
                        Type : 2,
                        Cls  : 'foo'
                    }
                ]
            }),
            renderTo        : document.body,
            taskStore       : new Gnt.data.TaskStore({
                proxy : 'memory',
                root : {
                    expanded  : true,
                    children  : [
                        {},{},{},{},{},{},{},{},{},{},{},
                        {},{},{},{},{},{},{},{},{},{},{},{},
                        {},{},{},{},{},{},{},{},{},{},{},{},
                        {
                            Id        : 1,
                            StartDate : new Date(2012, 11, 3),
                            Duration  : 2,
                            leaf      : true
                        },
                        {
                            Id        : 2,
                            StartDate : new Date(2012, 11, 5),
                            Duration  : 2,
                            leaf      : true
                        }
                    ]
                }
            })
        });

        var taskStore   = gantt.taskStore;
        var schedulingView     = gantt.getSchedulingView();

        t.chain(
            { waitForRowsVisible : gantt },

            function(next) {
                t.waitForEvent(gantt.lockedGrid.view.el, 'scroll', next);
                schedulingView.scrollEventIntoView(taskStore.getNodeById(1), false, false)
            },

            function(next) {
                gantt.el.select('.sch-dependency').remove();
                var scrollTop = gantt.lockedGrid.view.el.dom.scrollTop;

                t.isGreater(scrollTop, 0, 'Scrolling should have worked');

                // This should trigger a new draw of the affected dependencies
                // When indenting, Ext JS might request a refresh of the node before it exists in the view properly
                // (task.stores.length is 0 in this situation) so we should handle this case and not try to draw
                // if the task is currently being moved around in the task tree
                taskStore.indent([taskStore.getNodeById(1), taskStore.getNodeById(2)]);

                t.is(gantt.lockedGrid.view.el.dom.scrollTop, scrollTop, 'Locked: Scrolling should not have changed due to the indent');
                t.is(gantt.normalGrid.view.el.dom.scrollTop, scrollTop, 'Normal: Scrolling should not have changed due to the indent');
                t.is(gantt.normalGrid.view.el.dom.scrollTop, gantt.lockedGrid.view.el.dom.scrollTop, 'Scroll pos should be in sync');

                taskStore.getNodeById(1).outdent();
                taskStore.getNodeById(2).outdent();

                t.is(gantt.lockedGrid.view.el.dom.scrollTop, scrollTop, 'Locked: Scrolling should not have changed due to the indent');
                t.is(gantt.normalGrid.view.el.dom.scrollTop, scrollTop, 'Normal: Scrolling should not have changed due to the indent');
                t.is(gantt.normalGrid.view.el.dom.scrollTop, gantt.lockedGrid.view.el.dom.scrollTop, 'Scroll pos should be in sync');

                next()
            },

            { waitForTasksAndDependenciesToRender : gantt }
        )
    })
});
