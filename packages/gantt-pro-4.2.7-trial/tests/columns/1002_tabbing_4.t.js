StartTest(function (t) {
    var gantt, editingPlugin;

    t.beforeEach(function (t, next) {
        gantt && gantt.destroy();

        editingPlugin = new Sch.plugin.TreeCellEditing({ clicksToEdit : 1 });

        gantt = t.getGantt({
            renderTo         : Ext.getBody(),
            plugins          : editingPlugin,
            width            : 500,
            lockedGridConfig : {
                width : 400
            },
            columns          : [
                { flex : 1, xtype : 'namecolumn' },
                { flex : 1, xtype : 'startdatecolumn' },
                { flex : 1, xtype : 'enddatecolumn' },
                { flex : 1, xtype : 'percentdonecolumn' }
            ],
            taskStore        : t.getTaskStore({
                DATA : [{
                    Id        : 1,
                    Name      : 'Task 1',
                    StartDate : new Date(2010, 0, 5),
                    EndDate   : new Date(2010, 0, 6),
                    leaf      : true
                }, {
                    Id        : 2,
                    Name      : 'Task 2',
                    StartDate : new Date(2010, 0, 5),
                    EndDate   : new Date(2010, 0, 6),
                    leaf      : true
                }]
            })
        });

        t.waitForRowsVisible(gantt, next);
    });

    t.it('Should update cell value correctly', function (t) {
        t.chain(
            { click : function () { return t.getCell(gantt, 0, 0); } },
            { setValue : 'FOO', target : '>>editor textfield', desc : 'Name set to FOO' },
            { type : '[TAB]' },
            { waitForSelector : 'input:focus' },
            function (next) {
                t.matchGridCellContent(gantt, 0, 0, 'FOO', 'Content updated');
                t.notOk(t.cq1('namecolumn').preventUpdate, 'correct value restored');
                next();
            },
            { setValue : '01/07/2010', target : '>>editor startdatefield', desc : 'Start date set to 01/07/2010' },
            { type : '[TAB]' },
            { waitForSelector : 'input:focus' },
            function (next) {
                t.matchGridCellContent(gantt, 0, 1, '01/07/2010', 'Content updated');
                t.notOk(t.cq1('startdatecolumn').preventUpdate, 'correct value restored');
                next();
            },
            { setValue : '01/11/2010', target : '>>editor enddatefield', desc : 'Start date set to 01/11/2010' },
            { type : '[TAB]' },
            { waitForSelector : 'input:focus' },
            function (next) {
                t.matchGridCellContent(gantt, 0, 2, '01/11/2010', 'Content updated');
                t.notOk(t.cq1('enddatecolumn').preventUpdate, 'correct value restored');
                next();
            },

            { click : function () { return t.getCell(gantt, 1, 1); } },
            { setValue : '01/11/2010', target : '>>editor startdatefield', desc : 'Start date set to 01/11/2010' },
            { type : '[TAB][TAB]' },
            function () {
                t.todo('ticket #2793', function (t) {
                    t.matchGridCellContent(gantt, 1, 1, '01/11/2010', 'Content is updated');
                    t.matchGridCellContent(gantt, 1, 2, '01/11/2010', 'Content is updated');
                    var record = gantt.taskStore.getById(2);
                    t.is(record.getStartDate(), new Date(2010, 0, 11), 'Task start date is correct');
                    t.is(record.getEndDate(), new Date(2010, 0, 12), 'Task end date is correct');
                });
                t.notOk(t.cq1('startdatecolumn').preventUpdate, 'correct value restored');
            }
        );
    });

    t.it('Should update cell when user does not change value', function (t) {
        var record = gantt.taskStore.getById(2);

        record.setStartDate(new Date(2010, 0, 9));

        t.chain(
            { waitFor : 1000 },
            { click : function () { return t.getCell(gantt, 1, 1); } },
            { setValue : '01/12/2010', target : '>>editor startdatefield' },
            { type : '[TAB]' },
            { waitForSelector : 'input:focus', desc : 'Editing enddate field' },
            { type : '[TAB]' },
            // Currently value is incorrect, because our editors may contain incorrect value in extjs up to 6.0.2
            // https://www.assembla.com/spaces/bryntum/tickets/2793
            { click : function () { return t.getCell(gantt, 1, 1); } },
            { setValue : '01/13/2010', target : '>>editor startdatefield' },
            { type : '[TAB]' },
            { waitForSelector : 'input:focus', desc : 'Editing enddate field' },
            { type : '[TAB]' },
            { waitForSelector : 'input:focus', desc : 'Editing duration field' },
            function () {
                t.matchGridCellContent(gantt, 1, 1, '01/13/2010');
                t.matchGridCellContent(gantt, 1, 2, '01/13/2010');

            }
        );
    });

    t.it('Value should be updated if picker was used', function (t) {
        t.chain(
            { dblclick : function () { return t.getCell(gantt, 1, 1); } },

            { click : "startdatefield => .x-form-trigger" },

            { click : ".x-datepicker-date:textEquals(11)" },

            { action : "type", text : "[TAB][TAB][RETURN]" },

            function () {
                t.matchGridCellContent(gantt, 1, 1, '01/11/2010');
                t.matchGridCellContent(gantt, 1, 2, '01/11/2010');
            }
        );
    });

    t.it('Editor should be visible after tabbing from invalid field', function (t) {
        t.chain(
            { dblclick : function () { return t.getCell(gantt, 1, 2); } },

            { click : ".x-form-trigger" },

            {
                click : ".x-datepicker-date:textEquals(7)",
                desc : 'Pick value to update task to make following cancel edit to trigger node update'
            },

            { setValue : '01/01/2010', target : '>>editor enddatefield', desc : 'Set invalid value to trigger cancelEdit' },

            { action : "type", text : "[TAB]" },

            { waitForSelector : 'input:focus' },

            { setValue : '10', target : '>>editor percentfield' },

            { type : '[ENTER]'},

            function () {
                t.matchGridCellContent(gantt, 1, 1, '01/05/2010');
                t.matchGridCellContent(gantt, 1, 2, '01/05/2010');
                t.matchGridCellContent(gantt, 1, 3, '10');
            }
        )
    });
});