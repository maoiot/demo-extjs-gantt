StartTest(function (t) {
    var gantt;

    t.beforeEach(function () {
        gantt && gantt.destroy();
    });

    t.it('Dradrop should work when dragging over readonly task', function (t) {
        gantt = t.getGantt({
            renderTo    : Ext.getBody(),
            selModel : {
                type : 'gantt_spreadsheet'
            },
            columns : [
                { xtype : 'dragdropcolumn' },
                { xtype : 'namecolumn' },
                { xtype : 'startdatecolumn' }
            ],
            taskStore   : t.getTaskStore({
                DATA    : [{
                    Id          : 1,
                    Name        : 'Task 1',
                    StartDate   : new Date(2010, 0, 11),
                    Duration    : 4,
                    leaf        : true
                },{
                    Id          : 2,
                    Name        : 'Task 2',
                    StartDate   : new Date(2010, 0, 11),
                    Duration    : 4,
                    leaf        : true
                },{
                    Id          : 3,
                    Name        : 'Task 3',
                    StartDate   : new Date(2010, 0, 11),
                    Duration    : 4,
                    ReadOnly    : true,
                    leaf        : true
                },{
                    Id          : 4,
                    Name        : 'Task 4',
                    StartDate   : new Date(2010, 0, 11),
                    Duration    : 4,
                    leaf        : true
                }]
            })
        });

        t.chain(
            { waitForEventsToRender : gantt },
            {
                drag: function () {
                    return t.getCell(gantt, 0, 1);
                },
                to: function () {
                    return t.getCell(gantt, 1, 2);
                }
            },
            function (next) {
                t.is(gantt.taskStore.indexOf(gantt.taskStore.getById(1)), 1, 'Task is in correct position');
                t.is(gantt.taskStore.indexOf(gantt.taskStore.getById(2)), 0, 'Task is in correct position');
                next();
            },
            { waitForElementNotVisible : '.x-dd-drag-proxy' },
            {
                drag: function () {
                    return t.getCell(gantt, 0, 1);
                },
                to: function () {
                    return t.getCell(gantt, 1, 1);
                }
            },
            function () {
                t.is(gantt.taskStore.indexOf(gantt.taskStore.getById(1)), 0, 'Task is in correct position');
                t.is(gantt.taskStore.indexOf(gantt.taskStore.getById(2)), 1, 'Task is in correct position');
            }
        )
    });
});