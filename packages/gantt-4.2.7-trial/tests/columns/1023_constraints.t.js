StartTest(function(t) {
    var gantt;

    function createGantt(cfg) {
        gantt && gantt.destroy();

        return t.getGantt(Ext.apply({
            renderTo    : document.body,
            startDate   : new Date(2010, 0, 11),
            height      : 200,
            plugins     : 'scheduler_treecellediting',
            columns     : [
                { xtype : 'namecolumn' },
                {
                    xtype : 'constrainttypecolumn',
                    tdCls : 'type'
                },
                {
                    xtype : 'constraintdatecolumn',
                    tdCls : 'date'
                }
            ],
            taskStore   : t.getTaskStore({
                DATA : [
                    { Id : 1, Name : 'foo', leaf : true, StartDate : new Date(2010, 0, 11), Duration : 2}
                ]
            })
        }, cfg));
    }

    t.it('Basic editing', function(t) {
        gantt = createGantt();

        t.chain(
            { waitForRowsVisible : gantt },

            function(next) {
                t.assertCellIsEmpty(gantt.lockedGrid, 0, 1);

                next();
            },

            { dblclick : ".type" },

            { click : "constrainttypefield => .x-form-trigger" },

            { click : "constrainttypefield.getPicker() => .x-boundlist-item:contains(Must start on)" },

            { waitForGridContent : [gantt.lockedGrid, 0, 2, '01/11/2010'] },

            { type : "[TAB]" },

            { moveCursorTo : "constraintdatefield => .x-form-trigger" },

            { click : "constraintdatefield => .x-form-trigger" },

            { click : "constraintdatefield.getPicker() => .x-datepicker-date:contains(11)" },

            { type : '[ENTER]' },

            { waitForGridContent : [gantt.lockedGrid, 0, 1, 'Must start on'] },

            function() {
                t.matchGridCellContent(gantt.lockedGrid, 0, 2, '01/11/2010');
            }
        );
    });

    t.it('Must-start-on constraint violated. Resolve by moving task to 13th', function(t) {
        gantt = createGantt();

        t.it('Editing and violating the constraint, resolving with OK button', function(t) {
            t.chain(
                { dblclick : ".type" },

                { click : "constrainttypefield => .x-form-trigger" },

                { click : "constrainttypefield.getPicker() => .x-boundlist-item:contains(Must start on)" },

                { type : "[TAB]" },

                { click : "constraintdatefield => .x-form-trigger" },

                { click : "constraintdatefield.getPicker() => .x-datepicker-date:contains(13)" },

                { waitForCQVisible : 'window[title=Constraint violation]' },

                { click : '>>window[title=Constraint violation] field[boxLabel^=Move the task]' },

                { click : '>>window[title=Constraint violation] button[text=OK]' },

                { waitForCQNotVisible : '>>window[title=Constraint violation]' },
                { waitForGridContent : [gantt.lockedGrid, 0, 2, '01/13/2010'] },
                { waitForGridContent : [gantt.lockedGrid, 0, 1, 'Must start on'] }
            );
        });

        t.it('Editing again (must-start-on on 14) and aborting the change', function(t) {
            t.chain(
                { dblclick : ".date" },
                { click : "constraintdatefield => .x-form-trigger" },
                { click : "constraintdatefield.getPicker() => .x-datepicker-date:contains(14)" },

                { waitForCQVisible : 'window[title=Constraint violation]' },
                { click : '>>window[title=Constraint violation] button[text=OK]' },

                { waitForCQNotVisible : '>>window[title=Constraint violation]' },
                { waitForGridContent : [gantt.lockedGrid, 0, 1, 'Must start on'] },
                { waitForGridContent : [gantt.lockedGrid, 0, 2, '01/13/2010'] }
            );
        });
    });

    t.it('Must-finish-on constraint violated. Resolve by moving task', function(t) {
        gantt = createGantt();

        t.it('Editing and violating the constraint, resolving with OK button', function(t) {
            t.chain(
                { dblclick : ".type" },

                { click : "constrainttypefield => .x-form-trigger" },

                { click : "constrainttypefield.getPicker() => .x-boundlist-item:contains(Must finish on)" },

                { type : '[TAB]' },

                { click : "constraintdatefield => .x-form-trigger" },

                { click : "constraintdatefield.getPicker() => .x-datepicker-date:contains(14)" },

                { waitForCQVisible : 'window[title=Constraint violation]' },

                { click : '>>window[title=Constraint violation] field[boxLabel^=Move the task]' },

                { click : '>>window[title=Constraint violation] button[text=OK]' },

                { waitForCQNotVisible : '>>window[title=Constraint violation]' },
                { waitForGridContent : [gantt.lockedGrid, 0, 2, '01/14/2010'] },
                { waitForGridContent : [gantt.lockedGrid, 0, 1, 'Must finish on'] },

                function () {
                    t.is(gantt.taskStore.getById(1).getEndDate(), new Date(2010, 0, 15), 'End date should be inclusive in the date picker');
                }
            );
        });
    });

    t.it('Start-no-earlier-than constraint added and violated. Resolve by removing constraint', function(t) {
        gantt = createGantt();

        gantt.taskStore.getById(1).setConstraintDate(new Date(2010, 0, 12));

        t.chain(
            { dblclick : ".type" },

            { click : "constrainttypefield => .x-form-trigger" },

            { click : "constrainttypefield.getPicker() => .x-boundlist-item:contains(Start no earlier than)" },

            { type : "[TAB]" },

            { click : "constraintdatefield => .x-form-trigger" },

            { click : "constraintdatefield.getPicker() => .x-datepicker-date:contains(12)" },

            { waitForCQVisible : 'window[title=Constraint violation]' },

            { click : '>>window[title=Constraint violation] field[boxLabel^=Remove the]' },

            { click : '>>window[title=Constraint violation] button[text=OK]' },

            { waitForCQNotVisible : '>>window[title=Constraint violation]' },
            { waitForGridContent : [gantt.lockedGrid, 0, 2, '01/12/2010'] },
            { waitForCellEmpty : [gantt.lockedGrid, 0, 1] },
            function () {

                t.notOk(gantt.taskStore.getById(1).getConstraintType(), 'Constraint removed');
            }
        );
    });

    t.it('Prompt should not be shown twice if checkbox is marked the first time a constraint is violated', function(t) {
        gantt = createGantt();

        gantt.taskStore.getById(1).setConstraint('muststarton', new Date(2010, 0, 12));

        t.chain(

            { waitForCQVisible : 'window[title=Constraint violation]' },

            { click : '>>checkboxfield[boxLabel=Don\'t ask again]' },
            { click : '>>window[title=Constraint violation] field[boxLabel^=Move the task]' },

            { click : '>>window[title=Constraint violation] button[text=OK]' },

            { waitForCQNotVisible : '>>window[title=Constraint violation]' },

            function () {
                t.matchGridCellContent(gantt.lockedGrid, 0, 1, 'Must start on');
                t.matchGridCellContent(gantt.lockedGrid, 0, 2, '01/12/2010');

                t.is(gantt.taskStore.getById(1).getConstraintType(), 'muststarton', 'Constraint set');

                // Now prompt should not be shown
                gantt.taskStore.getById(1).setConstraint('muststarton', new Date(2010, 0, 13));

                t.matchGridCellContent(gantt.lockedGrid, 0, 1, 'Must start on');
                t.matchGridCellContent(gantt.lockedGrid, 0, 2, '01/13/2010');

                t.is(gantt.taskStore.getById(1).getConstraintType(), 'muststarton', 'Constraint type set');
                t.is(gantt.taskStore.getById(1).getConstraintDate(), new Date(2010, 0, 13), 'Constraint date set');

                t.cqNotExists('window[title=Constraint violation]', 'No window visible');
            }
        );
    });

    t.it('Cascade triggering two violations and prompts', function(t) {
        gantt = createGantt({
            taskStore   : t.getTaskStore({
                DATA : [
                    { Id : 1, Name : 'FOO', leaf : true, StartDate : new Date(2010, 0, 11), Duration : 2, ConstraintType : 'muststarton', ConstraintDate : new Date(2010, 0, 11)},
                    { Id : 2, Name : 'BAR', leaf : true, StartDate : new Date(2010, 0, 13), Duration : 2, ConstraintType : 'muststarton', ConstraintDate : new Date(2010, 0, 13)}
                ]
            }),

            dependencyStore : new Gnt.data.DependencyStore({
                data : [
                    { From : 1, To : 2 }
                ]
            })
        });

        // This breaks FOO constraint, which is removed so the task can be moved.
        // The dependency to BAR breaks BAR's constraint. 2 prompts should be shown
        gantt.taskStore.getById(1).setStartDate(new Date(2010, 0, 12));

        t.chain(

            { waitForCQVisible : 'window[title=Constraint violation]' },

            { click : '>>window[title=Constraint violation] field[boxLabel^=Remove the]' },

            { click : '>>window[title=Constraint violation] button[text=OK]' },

            { waitForCQVisible : 'window[title=Constraint violation]' },

            { click : '>>window[title=Constraint violation] field[boxLabel^=Remove the]' },

            { click : '>>window[title=Constraint violation] button[text=OK]' },

            function () {
                t.assertCellIsEmpty(gantt.lockedGrid, 0, 1);
                t.matchGridCellContent(gantt.lockedGrid, 0, 2, '01/11/2010');

                t.assertCellIsEmpty(gantt.lockedGrid, 1, 1);
                t.matchGridCellContent(gantt.lockedGrid, 1, 2, '01/13/2010');

                t.is(gantt.taskStore.getById(1).getConstraintType(), '', 'Constraint type nulled');
                t.is(gantt.taskStore.getById(2).getConstraintType(), '', 'Constraint type nulled');

                t.cqNotExists('window[title=Constraint violation]', 'No window visible');
            }
        );
    });

    t.it('Should clear the constraint type field and date when no string is provided', function(t) {
        gantt = createGantt({
            taskStore   : t.getTaskStore({
                DATA : [
                    { Id : 1, Name : 'FOO', leaf : true, ConstraintType : 'muststarton', ConstraintDate : new Date(2010, 0, 11)}
                ]
            })
        });

        t.chain(
            { clickToEditCell : [gantt.lockedGrid, 0, 1] },
            { setValue : '', target : '>>constrainttypefield' },
            { type : '[ENTER]',  target : '>>constrainttypefield' },

            function (next) {

                t.assertCellIsEmpty(gantt.lockedGrid, 0, 1);
                t.assertCellIsEmpty(gantt.lockedGrid, 0, 2);
            }
        );
    });
});
