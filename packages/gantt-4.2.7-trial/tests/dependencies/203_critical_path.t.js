StartTest(function(t) {

    var gantt            = t.getGantt({
        renderTo         : Ext.getBody(),
        startDate        : new Date(2010, 1, 1),

        lockedViewConfig : {
            // Enable node reordering in the locked grid
            plugins     : 'treeviewdragdrop'
        }
    });

    var view        = gantt.getSchedulingView(),
        depView     = view.getDependencyView();

    t.it('Should be able to highlight and unhighlight CP', function (t) {
        t.chain(
            { waitForTasksAndDependenciesToRender : gantt },

            function (next) {
                view.highlightCriticalPaths();

                t.isGreater(depView.getSelectedDependencyElements().getCount(), 0, 'Found some critical path elements');

                view.unhighlightCriticalPaths();

                t.selectorNotExists('.sch-gantt-task-highlighted')
            }
        )
    });

    t.it('Should keep CP highlighting after view refresh', function (t) {
        t.chain(
            { waitForTasksAndDependenciesToRender : gantt },
            function (next) {
                view.highlightCriticalPaths();
                next()
            },
            // re-ordering should work while critical path is highlighted
            {
                drag : '.x-tree-view ' + Ext.grid.View.prototype.itemSelector + ':nth-child(2)',
                to   : '.x-tree-view ' + Ext.grid.View.prototype.itemSelector + ':nth-child(5)'
            },

            { waitForFn : function() {
                return view.getDependencyView().getSelectedDependencyElements().getCount() > 0;
            } }
        );
    });

    t.it('Should behave ok when there are no gantt rows', function (t) {
        t.chain(
            { waitForTasksAndDependenciesToRender : gantt },

            function (next) {

                view.unhighlightCriticalPaths();
                t.selectorNotExists('.sch-gantt-task-highlighted');

                gantt.taskStore.getRootNode().collapse();

                next()
            },
            { waitForSelectorNotFound : '.' + depView.selectedCls },

            function (next) {

                view.highlightCriticalPaths();
                view.unhighlightCriticalPaths();

            }
        )
    })
})
