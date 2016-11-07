StartTest(function (t) {

    var gantt;

    t.beforeEach(function() {
        gantt && gantt.destroy();
    })

    t.it('Should trigger menu show on longpress for touch devices', function (t) {
        var menu2 = new Gnt.plugin.TaskContextMenu({
            listeners : {
                //hide : function() { debugger; }
            }
        });

        t.wontFire(menu2, 'hide', 'Menu should stay open');

        gantt = t.getGantt({
            renderTo   : Ext.getBody(),
            viewConfig : { forceFit : true },
            forceFit   : true,
            plugins    : menu2
        });

        t.chain(
            { longpress : '.sch-gantt-task-bar' },
            { waitForComponentVisible : menu2 }
        )
    });
});
