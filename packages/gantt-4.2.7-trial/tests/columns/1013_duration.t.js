StartTest(function (t) {
    t.diag('Testing the instant update feature which is enabled by default')

    var cellEditing, gantt;

    t.beforeEach(function () {
        gantt && gantt.destroy();

        cellEditing = new Sch.plugin.TreeCellEditing({ clicksToEdit : 1 });

        gantt = t.getGantt({
            height                 : 200,
            renderTo               : Ext.getBody(),
            // Having this flag set to true caused scroll issue previously
            // http://www.bryntum.com/forum/viewtopic.php?f=9&t=3903&sid=4d93cb492b549664adc5b5239e194927
            cascadeChanges         : true,
            forceFit               : true,
            plugins                : cellEditing,
            simpleCascadeThreshold : 5,
            taskStore              : new Gnt.data.TaskStore({
                root : {
                    children : [
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 1 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 2 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 3 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 4 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 5 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 6 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 7 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 8 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 9 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 10 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 11 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 12 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 13 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 14 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 15 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 16 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 17 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 18 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 19 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 20 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 21 },
                        { leaf : true, StartDate : new Date(2010, 1, 1), Duration : 1, Id : 22 }
                    ]
                }
            }),
            dependencyStore        : new Gnt.data.DependencyStore({
                data : [
                    { From : 2, To : 1 },
                    { From : 2, To : 3 },
                    { From : 3, To : 4 },
                    { From : 4, To : 5 },
                    { From : 5, To : 6 },
                    { From : 6, To : 7 },
                    { From : 7, To : 8 },
                    { From : 8, To : 9 },
                    { From : 9, To : 10 },
                    { From : 10, To : 11 },
                    { From : 11, To : 12 },
                    { From : 12, To : 13 },
                    { From : 13, To : 14 },
                    { From : 14, To : 15 },
                    { From : 15, To : 16 },
                    { From : 16, To : 17 },
                    { From : 17, To : 18 },
                    { From : 18, To : 19 },
                    { From : 19, To : 20 },
                    { From : 22, To : 21 }
                ]
            }),
            columns                : [
                {
                    xtype : 'namecolumn'
                },
                {
                    xtype : 'durationcolumn',
                    tdCls : 'dur'
                }
            ]
        });
    })

    t.it('Click spinner up with dependency', function (t) {

        t.firesOk(gantt.normalGrid.view, {
            itemupdate : 2,
            refresh    : 0
        });

        t.willFireNTimes(gantt.taskStore, 'cascade', 1);
        t.willFireNTimes(gantt.taskStore, 'update', 2, '2 tasks updated');

        t.chain(
            { click : Ext.grid.View.prototype.itemSelector + ':last-child .dur' },
            { waitForSelectorAtCursor : 'input' },

            function (next) {
                var ed = cellEditing.getActiveEditor();

                t.isntCalled("setPosition", ed);
                t.wontFire(ed, 'move');
                next();
            },

            { type : '[UP]' },

            { waitFor : 100 }
        );
    });

    t.it('Click spinner up', function (t) {

        t.firesOk(gantt.normalGrid.view, {
            itemupdate : 1,
            refresh    : 0
        });

        t.willFireNTimes(gantt.taskStore, 'update', 1);

        t.chain(
            { click : '.dur' },
            { waitForSelectorAtCursor : 'input:focus' },
            { type : '[UP]' },
            { waitFor : 100 }
        );
    });

    t.it('Hit enter to finalize edit, which should not cause a scroll change', function (t) {
        var scroll;

        t.chain(
            { click : Ext.grid.View.prototype.itemSelector + ':last-child .dur' },
            { waitFor : 'selectorAtCursor', args : 'input' },
            function (next) {
                scroll = gantt.lockedGrid.view.el.dom.scrollTop;
                next()
            },

            { click : '.x-grid-cell-editor' },

            { type : '[ENTER]' },

            { waitFor : 100 },

            function (next) {
                t.is(gantt.lockedGrid.view.el.dom.scrollTop, scroll, 'Scroll should not be reset')
            }
        )
    });

    t.it('On edit start, no updates should be made', function (t) {
        // If instant update is on, this should not trigger any duration/end date field updates as editing is being started
        gantt.taskStore.getRoot().firstChild.set('EndDate', null);

        t.wontFire(gantt.taskStore, 'update');

        t.chain(
            { click : '.dur' },
            { waitForSelectorAtCursor : 'input' }
        )
    });

    t.it('After editing (using spinner) that causes a massive cascade, focus should be kept in the field', function (t) {
        // If instant update is on, this should not trigger any duration/end date field updates as editing is being started
        gantt.taskStore.getRoot().firstChild.set('EndDate', null);

        t.chain(
            { clickToEditCell : [gantt.lockedGrid, 1, 1] },
            { click : '.dur .x-form-spinner-up' },
            { waitForSelector : '.dur input:focus' }
        )
    });

    t.it('After editing (using spinner) that causes a massive cascade, focus should be kept in the field', function (t) {
        // If instant update is on, this should not trigger any duration/end date field updates as editing is being started
        gantt.taskStore.getRoot().firstChild.set('EndDate', null);

        t.chain(
            { clickToEditCell : [gantt.lockedGrid, 1, 1] },
            { type : '[UP]' },
            { waitForSelector : '.dur input:focus' },
            { type : '[ENTER]' },

            // ENTER should restart editing
            { waitForSelectorNotFound : '.dur input:focus' },
            { type : '[ENTER]' },
            { waitForSelector : '.dur input:focus' }
        )
    });
});
