StartTest(function (t) {
    t.it('Test if the scrollable element is scrolled during drag drop operations (horizontally)', function (t) {
        var gantt = t.getGantt({
            renderTo    : Ext.getBody(),
            columns : [{ xtype : 'treecolumn' }]
        });

        var view = gantt.getSchedulingView();

        t.chain(
            { waitForEventsToRender : gantt },
            { drag : '.sch-gantt-task-bar', to : view.getEl(), toOffset : ['100%-23', 30], dragOnly : true },
            { waitFor : function () {
                return view.getScrollX() > 0;
            }},
            { moveMouseTo : view.getEl(), offset : [23, 30] },
            { waitFor : function () {
                return view.getScrollX() === 0;
            }},
            { action : 'mouseup' }
        );
    });
});