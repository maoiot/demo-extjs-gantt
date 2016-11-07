StartTest(function (t) {
    var gantt;

    t.beforeEach(function() {
        gantt && gantt.destroy();
    })

    t.it('Dependencies should not be painted between two tasks whose dates are both before/after the timeaxis range', function (t) {

        gantt = t.getGantt2({
            startDate       : new Date(2012, 1, 1),
            endDate         : new Date(2012, 6, 1),
            dependencyStore : new Gnt.data.DependencyStore()
        });

        gantt.taskStore.getRootNode().removeAll();

        gantt.taskStore.getRootNode().appendChild({
            StartDate : new Date(2011, 1, 1),
            Duration  : 2,
            leaf      : true,
            Id        : 1
        });

        gantt.taskStore.getRootNode().appendChild({
            StartDate : new Date(2011, 1, 1),
            Duration  : 2,
            leaf      : true,
            Id        : 2
        });

        gantt.dependencyStore.add(new Gnt.model.Dependency({
            From : 1,
            To   : 2
        }));

        gantt.render(document.body)

        var view = gantt.getSchedulingView();

        t.chain(
            { waitFor : 'rowsVisible', args : gantt },
            { waitFor : 500 },

            function (next) {
                t.selectorNotExists('.sch-dependency', 'Should not find dependencies');
            }
        );
    })

    t.it('Dependencies should be painted if task A is before and task B is after timeaxis range', function (t) {

        gantt = t.getGantt2({
            startDate       : new Date(2012, 1, 1),
            endDate         : new Date(2012, 6, 1),
            dependencyStore : new Gnt.data.DependencyStore({
                data : [
                    {
                        From : 1,
                        To   : 2
                    }
                ]
            }),
            renderTo    : document.body
        });

        gantt.taskStore.getRootNode().removeAll();

        gantt.taskStore.getRootNode().appendChild({
            StartDate : new Date(2011, 1, 1),
            Duration  : 2,
            leaf      : true,
            Id        : 1
        });

        gantt.taskStore.getRootNode().appendChild({
            StartDate : new Date(2013, 1, 1),
            Duration  : 2,
            leaf      : true,
            Id        : 2
        });

        var view = gantt.getSchedulingView();

        t.chain(
            { waitForSelector : '.sch-dependency' },

            function(next) {
                gantt.taskStore.getNodeById(1).setStartDate(new Date(2012, 10, 1));

                t.waitForSelectorNotFound('.sch-dependency', next)
            }
        );
    })
})
