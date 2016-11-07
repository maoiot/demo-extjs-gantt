StartTest(function (t) {

    // #2517 - Task segments not updated after Duration field change

    var cellEditing, gantt;

    t.beforeEach(function () {
        gantt && gantt.destroy();

        cellEditing = new Sch.plugin.TreeCellEditing({ clicksToEdit : 1 });

        gantt = t.getGantt({
            height    : 200,
            renderTo  : Ext.getBody(),
            plugins   : cellEditing,
            startDate : null,
            endDate   : null,
            taskStore : new Gnt.data.TaskStore({
                root : {
                    children : [
                        {
                            leaf      : true,
                            Id        : 1,
                            StartDate : '2016-01-11',
                            Duration  : 2,
                            Segments  : [
                                { StartDate : '2016-01-11', Duration : 1 },
                                { StartDate : '2016-01-13', Duration : 1 }
                            ]
                        }
                    ]
                }
            }),
            columns   : [
                {
                    xtype : 'durationcolumn',
                    tdCls : 'dur'
                }
            ]
        });
    })


    t.it('Click spinner up and expect that the task and its last segments are aligned', function (t) {
        var task = gantt.getTaskStore().getNodeById(1);

        t.chain(
            { click : '.dur' },
            { waitForSelectorAtCursor : 'input:focus' },
            function (next) {
                t.waitForEvent(gantt.getView(), 'itemupdate', next);
                t.type(null, '[UP]');
            },
            function () {
                t.is(task.getDuration(), 3, 'task duration updated');
                t.is(task.getStartDate(), task.getFirstSegment().getStartDate(), 'task start is aligned w/ its very first segment');
                t.is(task.getEndDate(), task.getLastSegment().getEndDate(), 'task end is aligned w/ its very last segment');
            }
        );
    });

});
