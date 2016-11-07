StartTest({
    overrideSetTimeout : false,
    subTestTimeout : 90000
}, function (t) {

    var testConfig = t.harness.getScriptDescriptor(t.url);

    var exporterId = testConfig.exporter;
    var expected   = testConfig.expected;

    var plugin, ganttpanel;

    plugin  = new Gnt.plugin.Export({
        printServer     : 'none',
        openAfterExport : false,
        test            : true
    });

    ganttpanel = t.getGantt(Ext.apply({
        startDate   : new Date(2010, 0, 11),
        endDate     : Sch.util.Date.add(new Date(2010, 0, 4), Sch.util.Date.WEEK, 20),
        viewPreset  : 'weekAndDayLetter',
        renderTo    : Ext.getBody(),
        plugins     : plugin,
        crudManager : {
            autoLoad  : true,
            transport : {
                load : {
                    url : 'export/data/load.json'
                }
            }
        }
    }, testConfig.panel));


    var async      = t.beginAsync(45000),
        mainTest   = t,
        pageIndex  = 0,
        rowsHeight = 0,
        pages;

    function checkPageContent (t, iframe) {

        // cleanup (comment this out to debug)
        iframe && iframe.parentNode.removeChild(iframe);

        var page = pages[pageIndex];

        // stop when no pages left
        if (!page) {
            mainTest.endAsync(async);
            return;
        }

        t.assertExportedPageDependencies(page.html, ganttpanel, 'Page '+ pageIndex, function (t, iframe, doc) {

            t.isApprox(parseFloat(t.$('.sch-dependencyview-ct', doc).css("top")), -rowsHeight * (pageIndex % expected.pageRowsNum), 2, "correct dependency view top shift");

            pageIndex++;

            checkPageContent(mainTest, iframe);
        });
    }


    t.waitForRowsVisible(ganttpanel, function() {

        t.diag(testConfig.name);

        plugin.doExport({
            format      : "A4",
            orientation : "landscape",
            range       : "complete",
            showHeader  : true,
            exporterId  : exporterId
        }, function (result) {

            pages = result.htmlArray;

            t.is(pages.length, expected.pagesNum, "proper number of pages exported");

            var exporter = plugin.exporter,
                rows     = exporter.normalRows;

            for (var i = 0; i < rows.length && rowsHeight + rows[i].height < exporter.printHeight; i++) {
                rowsHeight += rows[i].height;
            }

            checkPageContent(mainTest);
        });

    });

});
