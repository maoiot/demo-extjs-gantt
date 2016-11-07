StartTest(function(t) {

    t.it('Exporting date range should ignore not visible events', function (t) {

        var plugin  = new Sch.plugin.Export({
            printServer     : 'none',
            openAfterExport : false,
            test            : true
        });

        var scheduler = t.getScheduler({
            startDate       : new Date(2010, 0, 11),
            endDate         : new Date(2010, 3, 30),
            viewPreset      : 'weekAndDayLetter',
            bufferedRenderer : true,
            resourceStore   : null,
            eventStore      : null,
            dependencyStore : null,
            renderTo        : Ext.getBody(),
            plugins         : plugin,
            crudManager     : {
                autoLoad        : true,
                dependencyStore : new Sch.data.DependencyStore(),
                transport       : {
                    load : {
                        url : 'export/data/load.json'
                    }
                }
            }
        });

        t.waitForRowsVisible(scheduler, function () {
            var async = t.beginAsync(45000);

            plugin.doExport({
                format      : "A4",
                orientation : "landscape",
                range       : 'date',
                dateFrom    : new Date(2010, 0, 18),
                dateTo      : new Date(2010, 0, 25),
                showHeader  : true,
                exporter    : 'singlepage'
            }, function () {
                t.pass('Exported without exceptions');
                t.endAsync(async);
            });
        });
    });

});
