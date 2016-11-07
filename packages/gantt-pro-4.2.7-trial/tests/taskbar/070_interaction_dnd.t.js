StartTest(function (t) {
    var gantt;

    t.beforeEach(function () {
        gantt && gantt.destroy();
    });

    t.it('Drag tip should disappear correctly', function (t) {
        gantt = t.getGantt2({
            width: 500,
            height: 100,
            renderTo: Ext.getBody(),
            taskStore: new Gnt.data.TaskStore({proxy: 'memory'})
        });

        var taskStore = gantt.taskStore;

        var task = taskStore.getRootNode().appendChild({
            StartDate: new Date(2010, 0, 4),
            EndDate: new Date(2010, 0, 6),
            Duration: 2,
            DurationUnit: "d",
            leaf: true
        });

        t.chain(
            { waitForEventsToRender : gantt },
            { drag : '.sch-gantt-item', by : [10, 0], dragOnly : true },
            { mouseup : '.gnt-tooltip' },
            { moveMouseTo : function () {
                gantt.normalGrid.view.taskDragDrop.tip.showDelay = 0;
                return t.getCell(gantt, 0, 0); }
            },
            { moveMouseTo : '.sch-gantt-item' },
            function () {
                t.elementIsNotVisible('.gnt-tooltip');
            }
        );
    });

    t.it('Should be possible to drag a normal task', function (t) {
        gantt = t.getGantt2({
            width     : 500,
            height    : 200,
            renderTo  : Ext.getBody(),
            taskStore : new Gnt.data.TaskStore({ proxy : 'memory' })
        });

        var taskStore = gantt.taskStore;

        var task = taskStore.getRootNode().appendChild([{
            StartDate   : new Date(2010, 0, 4),
            Duration    : 2,
            leaf        : true
        }, {
            StartDate   : new Date(2010, 0, 4),
            Duration    : 2,
            leaf        : true,
            Cls         : 'task2'
        }])[1];

        t.is(taskStore.getNewRecords().length, 2, '2 record has been added');

        t.willFireNTimes(gantt, 'beforetaskdrag', 1);
        t.willFireNTimes(gantt, 'taskdragstart', 1);
        t.willFireNTimes(gantt, 'taskdrop', 1);
        t.willFireNTimes(gantt, 'aftertaskdrop', 1);
        t.willFireNTimes(taskStore, 'update', 1);

        gantt.on('taskdragstart', function () {
            var tip = t.cq1('[cls=gnt-dragdrop-tip]');
            var dragEl = Ext.getBody().down('.sch-gantt-dragproxy .sch-gantt-item');

            var proxyRegion = Ext.getBody().down('.sch-gantt-dragproxy .sch-gantt-item').getRegion();
            var taskRegion = Ext.getBody().down('.task2').getRegion();

            t.is(proxyRegion.top, taskRegion.top, 'Top coordinate is correct');
            t.is(proxyRegion.bottom, taskRegion.bottom, 'Bottom coordinate is correct');

            if (Ext.isIE8) {
                t.isApprox(proxyRegion.right, taskRegion.right, 1, 'Right coordinate is correct');
                t.isApprox(proxyRegion.left, taskRegion.left, 1, 'Left coordinate is correct');
            } else {
                t.is(proxyRegion.right, taskRegion.right, 'Right coordinate is correct');
                t.is(proxyRegion.left, taskRegion.left, 'Left coordinate is correct');
            }

            t.isApprox(tip.getX(), dragEl.getX(), 30, 'Proxy and tooltip aligned X');
            t.isApprox(tip.el.getBottom(), dragEl.getY(), 10, 'Proxy and tooltip aligned Y');
        });

        t.chain(
            { waitFor : 'rowsVisible', args : gantt },

            { action : 'drag', target : '.task2', by : [100, 0], dragOnly : true },

            function () {
                var tip = t.cq1('[cls=gnt-dragdrop-tip]');
                t.ok(tip.isVisible(), 'Gantt tooltip exists and is visible');

                t.mouseUp();

                t.waitFor(function () {
                    return !gantt.normalGrid.view.taskDragDrop.dragging;
                }, function () {
                    t.isGreater(task.getStartDate(), task.modified.StartDate, 'Duration intact');
                    t.is(task.getDuration(), 2, 'Duration intact');
                });
            }
        );
    });

    t.it('Should not affect a task if it is dropped outside the schedule area', function (t) {
        gantt = t.getGantt2({
            itemId    : 'invalidDrop',
            width     : 500,
            height    : 100,
            renderTo  : Ext.getBody(),
            StartDate : new Date(2010, 0, 4),
            taskStore : new Gnt.data.TaskStore({ proxy : 'memory' })
        });

        var taskStore = gantt.taskStore;

        var task = taskStore.getRootNode().appendChild({
            StartDate    : new Date(2010, 0, 11),
            Duration     : 2,
            DurationUnit : "d",
            leaf         : true
        });

        t.wontFire(taskStore, 'update');
        t.willFireNTimes(gantt, 'beforetaskdrag', 1);
        t.willFireNTimes(gantt, 'taskdragstart', 1);
        t.willFireNTimes(gantt, 'taskdrop', 0);
        t.willFireNTimes(gantt, 'aftertaskdrop', 1);

        t.chain(
            { waitFor : 'rowsVisible', args : gantt },

            { action : 'drag', target : '#invalidDrop => .sch-gantt-item', to : [1, 1] },

            function () {
                t.elementIsNotVisible(gantt.el.down('.sch-gantt-dragproxy'), 'Should not see proxy after invalid drop');
                t.elementIsVisible(gantt.el.down('.x-grid-cell .sch-gantt-item'), 'Should see event visible after invalid drop');
            }
        );
    });
});
