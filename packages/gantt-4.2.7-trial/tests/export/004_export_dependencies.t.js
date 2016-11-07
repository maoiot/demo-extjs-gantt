StartTest(function(t) {

    // #3060 - Exception in the export dependency painter

    var plugin      = new Gnt.plugin.Export({
        printServer     : 'none',
        openAfterExport : false,
        test            : true
    });

    var gantt       = t.getGantt({
        renderTo  : Ext.getBody(),
        plugins   : plugin,
        taskStore : t.getTaskStore({
            DATA : [
                {
                    Id        : 1,
                    StartDate : '2016-07-26',
                    Duration  : 10,
                    leaf      : true
                },
                {
                    Id        : 2,
                    StartDate : '2016-08-05',
                    Duration  : 10,
                    leaf      : true
                }
            ]
        }),
        startDate       : new Date(2016, 6, 25),
        endDate         : new Date(2016, 6, 31),
        dependencyStore : new Gnt.data.DependencyStore({
            proxy : 'memory',
            data  : [
                { From : 1, To : 2 }
            ]
        })
    });


    t.waitForRowsVisible(gantt, function() {

        var async = t.beginAsync(45000);

        // run export to ensure it doesn't fire an exception
        plugin.doExport({
            format              : "Letter",
            orientation         : "portrait",
            range               : "complete",
            showHeader          : true,
            singlePageExport    : false,
            exporterId          : 'multipage'
        }, function () {
            t.endAsync(async);
        });
    });

});
