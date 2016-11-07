StartTest(function (t) {
    var taskStore, gantt;

    var task = function (id) {
        return taskStore.getNodeById(id);
    };

    var interval = Ext.dom.GarbageCollector.interval;

    t.beforeEach(function (t, cb) {
        Ext.dom.GarbageCollector.interval = interval;

        t.chain(
            { waitForRowsVisible : 'ganttpanel' },

            function () {
                gantt     = t.cq1('ganttpanel');
                taskStore = gantt.getTaskStore();
                cb();
            }
        )
    });

    t.it('Should not throw exceptions', function (t) {
        Ext.dom.GarbageCollector.interval = 10;

        var steps = [];

        for (var i = 0; i < 3; i++) {
            steps.push(
                i % 3 !== 0 ?
                { click : '.x-tree-node-text:contains(Planning)' } : { click : '.x-grid-cell-row-numberer:contains(1.1)'},
                { click : '.icon-add-task' },
                { click : '.icon-undo' }
            )
        }

        t.chain(steps);
    });

    t.it('Indents/outdents multiple selected tasks', function (t) {

        t.chain(
            {
                click  : function () {
                    return gantt.lockedGrid.view.getNode(task(12));
                },
                // provide offset to click start of locked grid row
                // (otherwise it will try to click in the middle which is out of the visible area)
                offset : [10, '50%']
            },
            {
                click   : function () {
                    return gantt.lockedGrid.view.getNode(task(13));
                },
                // hold SHIFT to enable multiselect
                options : { shiftKey : true },
                offset  : [10, '50%']
            },

            { click : '>>[reference=indentTask]' },

            {
                waitFor : function () {
                    return task(12).parentNode === task(11) && task(13).parentNode === task(11);
                },
                desc    : 'Both tasks were indented'
            },

            { click : '>>[reference=outdentTask]' },

            {
                waitFor : function () {
                    return task(12).parentNode === task(1) && task(13).parentNode === task(1);
                },
                desc    : 'Both tasks were outdented back'
            },
            { click : '>>gantt-filter-field' },
            { type : '[DOWN]' }
        );

    });

    t.it('Can delete a selected task with spreadsheet selection model', function (t) {

        t.firesAtLeastNTimes(taskStore, 'noderemove', 1);

        t.chain(
            { click  : "ganttpanel => .x-grid-cell:contains(Report to management)" },

            { action : 'contextmenu'},

            { click : ">>#deleteTask" }
        );
    });

    t.it('Can delete a task with spreadsheet selection model', function (t) {

        t.cq1('ganttpanel').getSelectionModel().deselectAll();

        t.firesAtLeastNTimes(taskStore, 'noderemove', 1);

        t.chain(
            { contextmenu  : "ganttpanel => .x-grid-cell:contains(Customer approval)" },

            { click : ">>#deleteTask" }
        );
    })
});


