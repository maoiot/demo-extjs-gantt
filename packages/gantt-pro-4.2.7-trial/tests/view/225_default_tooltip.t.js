StartTest(function(t) {

    var g;

    t.beforeEach(function() {
        g && g.destroy();

        g = t.getGantt({
            renderTo        : Ext.getBody(),
            startDate : new Date(2016,7, 22),
            endDate : new Date(2016,10, 1),
            enableBaseline          : true,
            baselineVisible         : true,
            taskStore : new Gnt.data.TaskStore({
                root : {
                    children : [
                        {
                            Id                  : 1,
                            StartDate           : '2016-09-01',
                            Duration            : 2,
                            leaf                : true,
                            PercentDone         : 89,
                            Name                : 'Foo',
                            BaselinePercentDone : 11,
                            BaselineStartDate   : '2016-08-31',
                            BaselineEndDate     : '2016-09-03'
                        }
                    ]
                }
            })
        });
    })

    t.it('Should show default tooltip for normal task bar', function (t) {

        var ttt = g.getSchedulingView().tooltipTpl,
            record = g.taskStore.getNodeById(1);

        t.chain(
            { movemouseto : '.sch-gantt-task' },

            { waitForSelector : '.sch-task-tip' },

            function (next, el) {

                t.contentLike('.sch-task-tip-header', 'Foo', 'Name rendered');
                t.contentLike('.sch-task-tip', 'Start:', 'Start text is rendered on the tooltip');
                t.contentLike('.sch-task-tip', 'End:', 'End text is rendered on the tooltip');
                t.contentLike('.sch-task-tip', 'Complete:', 'Completion is rendered on the tooltip');
                t.contentLike('.sch-task-tip', '09/01/2016',  'StartDate is rendered in correct format on the tooltip');
                t.contentLike('.sch-task-tip', '09/02/2016',  'EndDate is rendered in correct format on the tooltip');
                t.contentLike('.sch-task-tip', '89%', 'Completion % is rendered on the tooltip');
            }
        );
    });

    t.it('Should show default tooltip for baseline task bar', function (t) {

        var ttt = g.getSchedulingView().tooltipTpl,
            record = g.taskStore.getNodeById(1);

        t.chain(
            { movemouseto : '.sch-gantt-task-baseline' },

            { waitForSelector : '.sch-task-tip' },

            function (next, el) {
                
                t.contentLike('.sch-task-tip-header', 'Foo', 'Name rendered');
                t.contentLike('.sch-task-tip', 'Start:', 'Start text is rendered on the tooltip');
                t.contentLike('.sch-task-tip', 'End:', 'End text is rendered on the tooltip');
                t.contentLike('.sch-task-tip', 'Complete:', 'Completion is rendered on the tooltip');
                t.contentLike('.sch-task-tip', '08/31/2016',  'StartDate is rendered in correct format on the tooltip');
                t.contentLike('.sch-task-tip', '09/02/2016',  'EndDate is rendered in correct format on the tooltip');
                t.contentLike('.sch-task-tip', '11%', 'Completion % is rendered on the tooltip');
            }
        );
    });

});
