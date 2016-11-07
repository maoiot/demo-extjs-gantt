StartTest(function (t) {
    var gantt;

    t.beforeEach(function (t, next) {
        gantt && gantt.destroy();

        gantt = t.getGantt({
            renderTo    : Ext.getBody(),
            width       : 400,
            height      : 300,
            selModel    : 'spreadsheet',
            enableTaskReordering : true,
            columns     : [
                { xtype : 'dragdropcolumn' },
                { xtype : 'namecolumn' }
            ],
            taskStore   : t.getTaskStore({
                DATA    : [{
                    Id      : 1,
                    Name    : 'Parent',
                    expanded    : true,
                    children    : [
                        {
                            Id      : 10,
                            Name    : 'Task 10',
                            leaf    : true
                        },
                        {
                            Id      : 11,
                            Name    : 'Task 11',
                            leaf    : true
                        },
                        {
                            Id      : 12,
                            Name    : 'Task 12',
                            leaf    : true
                        },
                        {
                            Id      : 13,
                            Name    : 'Task 13',
                            leaf    : true
                        }
                    ]
                }]
            })
        });

        t.waitForRowsVisible(gantt, next);
    });

    t.it('Dragdrop column should remove its listeners correctly', function (t) {
        var cellSelectedCls = '.' + gantt.lockedGrid.view.selectedCellCls;

        t.chain(
            { click : function () { return t.getCell(gantt, 1, 1); } },
            { drag : function () { return t.getCell(gantt, 1, 2); }, by : [0, 26] },
            function (next) {
                var selModel = gantt.getSelectionModel();

                t.ok(selModel.getSelected().isCells, 'Cells are selected');
                t.selectorCountIs(cellSelectedCls, 2, '2 cells selected');

                next();
            },
            {
                drag : function () { return t.getCell(gantt, 1, 1); },
                to : function () { return gantt.getSchedulingView().el; },
                desc : 'Drag to invalid place so view wont fire drop event'
            },
            {
                drag : function () { return t.getCell(gantt, 1, 2); },
                by : [0, 26],
                desc : 'Dragdrop should not happen'
            },
            function () {
                t.is(gantt.lockedGrid.view.indexOf(gantt.taskStore.getById(10)), 1, 'Task position is intact');
            }
        )
    });

    t.it('Dragdrop column should allow to reorder tasks', function (t) {
        var taskStore = gantt.taskStore;
        var view = gantt.lockedGrid.view;
        var rowSelectedCls = '.' + view.selectedItemCls;
        var cellSelectedCls = '.' + view.selectedCellCls;

        var returnFalse = function () {
            return false;
        };

        t.chain(
            { drag : function () { return t.getCell(gantt, 1, 1); }, by : [0, 26], desc : 'Drag and drop row' },
            function (next) {
                t.selectorCountIs(rowSelectedCls, view, 1, 'One record is selected');
                t.is(view.indexOf(taskStore.getById(10)), 2, 'Record is dropped to correct position');
                next();
            },
            { drag : function () { return t.getCell(gantt, 1, 0); }, by : [0, 26], desc : 'Drag and select rows' },
            function (next) {
                t.selectorCountIs(rowSelectedCls, view, 2, 'Two items selected');
                t.is(view.indexOf(taskStore.getById(11)), 1, 'Record is not dropped');
                next();
            },
            { drag : function () { return t.getCell(gantt, 1, 2); }, by : [0, 26], desc : 'Drag and select rows' },
            function (next) {
                t.selectorCountIs(cellSelectedCls, view, 2, 'Two items selected');
                t.is(view.indexOf(taskStore.getById(11)), 1, 'Record is not dropped');
                next();
            },
            { drag : function () { return t.getCell(gantt, 1, 1); }, by : [0, 26], desc : 'Drag and drop row' },
            function (next) {
                t.selectorCountIs(rowSelectedCls, view, 1, 'One record is selected');
                t.is(view.indexOf(taskStore.getById(11)), 2, 'Record is dropped to correct position');
                next();
            },
            {
                click : function () { return t.getCell(gantt.normalGrid, 1, 0); },
                offset : [10, 10],
                desc : 'Click in normal view to loose selection'
            },
            function (next) {
                view.on('beforecellmousedown', returnFalse);
                t.firesOk({
                    observable  : view,
                    events      : {
                        drop    : 0,
                        selectionchange : 0
                    },
                    desc        : 'Selection is not changed, tasks keep order'
                });
                next();
            },
            { drag : function () { return t.getCell(gantt, 1, 1); }, by : [0, 26], desc : 'Should not drag and drop row' },
            { drag : function () { return t.getCell(gantt, 1, 0); }, by : [0, 26], desc : 'Should not drag and select rows' },
            { drag : function () { return t.getCell(gantt, 1, 2); }, by : [0, 26], desc : 'Should not drag and select rows' },
            { drag : function () { return t.getCell(gantt, 1, 1); }, by : [0, 26], desc : 'Should not drag and drop row' }
        )
    });

    // https://www.sencha.com/forum/showthread.php?310313
    // We do not fix this behavior intentionally, but we used to, so here's test
    t.xit('Should update row numberer column', function (t) {
        var matchRowNumbererColumn = function () {
            t.matchGridCellContent(gantt, 0, 0, '1');
            t.matchGridCellContent(gantt, 1, 0, '2');
            t.matchGridCellContent(gantt, 2, 0, '3');
            t.matchGridCellContent(gantt, 3, 0, '4');
            t.matchGridCellContent(gantt, 4, 0, '5');
        };

        t.chain(
            { drag : function () { return t.getCell(gantt, 1, 1); }, by : [0, 26] },
            function (next) {
                matchRowNumbererColumn();
                next();
            },
            { drag : function () { return t.getCell(gantt, 2, 1); }, by : [0, -26] },
            { drag : function () { return t.getCell(gantt, 2, 1); }, by : [0, -26] },
            function (next) {
                matchRowNumbererColumn();
                next();
            },
            { drag : function () { return t.getCell(gantt, 2, 1); }, by : [0, 52] },
            function () {
                matchRowNumbererColumn();
            }
        );
    });
});