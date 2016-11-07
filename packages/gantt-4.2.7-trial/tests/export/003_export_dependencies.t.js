StartTest(function(t) {

    var plugin      = new Gnt.plugin.Export({
        printServer     : 'none',
        openAfterExport : false,
        test            : true
    });

    var gantt       = t.getGantt({
        renderTo    : Ext.getBody(),
        plugins     : plugin
    });

    t.waitForRowsVisible(gantt, function() {

        var async = t.beginAsync(45000);

        plugin.doExport({
            format              : "Letter",
            orientation         : "portrait",
            range               : "complete",
            showHeader          : true,
            singlePageExport    : false,
            exporterId          : 'multipage'
        }, function (response) {

            //First task should be visible #1334
            var firstTask = gantt.getSchedulingView().getEl().down('.sch-event-wrap');
            t.is(firstTask.getStyle('left'), '600px', "First task should have proper left position");

            t.endAsync(async);
        });
    });

});
