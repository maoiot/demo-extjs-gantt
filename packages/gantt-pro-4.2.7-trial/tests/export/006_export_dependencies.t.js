StartTest(function (t) {

    var testConfig = t.harness.getScriptDescriptor(t.url);

    var exporterId = testConfig.exporter;

    var plugin, ganttpanel;

    t.it('Gantt with changed row height exported correctly', function (t) {

        t.diag(testConfig.name);

        plugin  = new Gnt.plugin.Export({
            printServer     : 'none',
            openAfterExport : false,
            test            : true
        });

        var taskStore = t.getTaskStore({
            DATA : [
                {
                    Id          : 1,
                    StartDate   : new Date(2010, 0, 18),
                    Duration    : 1,
                    leaf        : true
                },
                {
                    Id          : 2,
                    StartDate   : new Date(2010, 0, 20),
                    Duration    : 1,
                    leaf        : true
                }
            ]
        });

        var dependencyStore = t.getDependencyStore({
            data : [{
                From : 1,
                To   : 2
            }]
        });

        ganttpanel = t.getGantt(Ext.apply({
            startDate       : new Date(2010, 0, 18),
            endDate         : Sch.util.Date.add(new Date(2010, 0, 18), Sch.util.Date.WEEK, 1),
            viewPreset      : 'weekAndDayLetter',
            renderTo        : Ext.getBody(),
            plugins         : plugin,
            rowHeight       : 50,
            taskStore       : taskStore,
            dependencyStore : dependencyStore,
            columns         : [{ xtype : 'namecolumn' }]
        }, testConfig.panel));


        // Exporter will change row height during export, we need to check for exact match to see if style
        // applied correctly on the exported pages

        var rowHeight = ganttpanel.getRowHeight();

        t.waitForRowsVisible(ganttpanel, function () {

            var async    = t.beginAsync(45000),
                mainTest = t;

            t.diag(exporterId +' exporter');

            plugin.doExport({
                format      : "A4",
                orientation : "landscape",
                range       : "complete",
                showHeader  : true,
                exporterId  : exporterId
            }, function (result) {

                var pages     = result.htmlArray,
                    pageIndex = 0;

                var checkPageContent = function (t, iframe) {

                    // cleanup (comment this out to debug)
                    iframe && iframe.parentNode.removeChild(iframe);

                    var page = pages[pageIndex];

                    // stop if no pages left
                    if (!page) {
                        mainTest.endAsync(async);
                        return;
                    }

                    // assert exported dependencies elements and then assert row heights
                    t.assertExportedPageDependencies(page.html, ganttpanel, 'Page '+ pageIndex, function (t, iframe, doc) {

                        t.$('.x-grid-cell', doc).each(function () {
                            t.isApprox(t.$(this).height(), rowHeight, 1, 'Row height is correct');
                        });

                        pageIndex++;

                        // check next page
                        checkPageContent(t, iframe);
                    });
                };

                checkPageContent(t);
            });

        });
    });
});
