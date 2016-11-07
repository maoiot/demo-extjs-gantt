StartTest(function (t) {

    // #2644 - Selection model issue after removing selected task

    var gantt;

    t.beforeEach(function (t, cb) {
        t.chain(
            { waitForRowsVisible : 'ganttpanel' },

            function () {
                gantt     = t.cq1('ganttpanel');
                cb();
            }
        )
    });

    // https://www.assembla.com/spaces/bryntum/tickets/2644
    t.it('Should not break multiple selection after active record remove', function (t) {

        t.chain(
            { click : function () { return t.getCell(gantt, 1, 1); } },

            { click : ">> #addTask" },

            { click : ">> #removeSelected" },

            { click : function () { return t.getCell(gantt, 3, 0); } },

            {
                click   : function () { return t.getCell(gantt, 4, 0); },
                options : { shiftKey : true }
            },

            function () {
                t.is(gantt.selModel.getSelection().length, 2, 'Correct amount of selected records');
                t.selectorCountIs('.x-grid-item-selected', gantt.lockedGrid.view.el, 2, 'Correct amount of nodes selected');
            }
        )
    });
});