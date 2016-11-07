StartTest(function(t) {

    var testConfig = t.harness.getScriptDescriptor(t.url);

    var exporterId            = testConfig.exporter,
        expectedNumOfPages    = testConfig.expected.pagesNum,
        expectedNumOfPageRows = testConfig.expected.pageRowsNum;

    var plugin  = new Sch.plugin.Export({
        printServer     : 'none',
        openAfterExport : false,
        test            : true
    });

    var scheduler = t.getScheduler(Ext.apply({
        startDate        : new Date(2010, 0, 11),
        endDate          : new Date(2010, 3, 30),
        viewPreset       : 'weekAndDayLetter',
        bufferedRenderer : true,
        resourceStore    : null,
        eventStore       : null,
        dependencyStore  : null,
        renderTo         : Ext.getBody(),
        plugins          : plugin,
        crudManager      : {
            autoLoad        : true,
            dependencyStore : new Sch.data.DependencyStore(),
            transport       : {
                load : {
                    url : 'export/data/load.json'
                }
            }
        }
    }, testConfig.scheduler));

    var mainTest   = t,
        mainAsync  = mainTest.beginAsync(45000),
        pageIndex  = 0,
        rowsHeight = 0,
        pages;

    function checkPageContent(iframe) {

        // cleanup (comment this out to debug)
        iframe && iframe.parentNode.removeChild(iframe);

        var page = pages[pageIndex];

        // stop if no pages left
        if (!page) {
            mainTest.endAsync(mainAsync);
            return;
        }


        // load page html into iframe
        t.setIframe({
            html   : page.html,
            onload : function (doc, iframe) {
                t.diag('Page '+ pageIndex);

                var schedulingView  = scheduler.getSchedulingView();

                // exported dependency view el
                var depView = t.$('.sch-dependencyview-ct', doc);

                // loop over exported scheduling view rows
                t.$(schedulingView.itemSelector, t.$('#'+ schedulingView.el.id, doc)).each(function () {

                    var resource = scheduler.getResourceStore().getModelByInternalId(this.getAttribute('data-recordId')),
                        events   = resource.getEvents();

                    for (var j = 0; j < events.length; j++) {
                        for (var i = 0, deps = scheduler.getDependencyStore().getEventIncomingDependencies(events[j]); i < deps.length; i++) {
                            var dep       = deps[i];

                            var row = t.$(this);

                            var eventEl   = t.$('.sch-event', this);

                            var arrowCtEl = t.$('.sch-dependency-arrow[data-sch-dependency-id='+ dep.internalId +']', depView);

                            if (eventEl.length) {
                                var prefix    = 'Dependency: '+ dep.internalId;

                                t.ok(arrowCtEl.length, prefix +' element found');
                                t.elementIsVisible(arrowCtEl.get(0), prefix +' element visible');

                                switch (true) {
                                    case arrowCtEl.hasClass('sch-dependency-arrow-bottom'):

                                        t.isApprox(Math.round(arrowCtEl.offset().left), Math.round(eventEl.offset().left), 4, prefix +' (bottom arrow) left is correct');
                                        t.isApprox(Math.round(arrowCtEl.offset().top + arrowCtEl.outerHeight()), Math.round(eventEl.offset().top), 4, prefix +' (bottom arrow) top is correct');

                                        break;

                                    case arrowCtEl.hasClass('sch-dependency-arrow-right'):

                                        t.isApprox(Math.round(arrowCtEl.offset().left + arrowCtEl.outerWidth()), Math.round(eventEl.offset().left), 4, prefix +' (right arrow) left is correct');
                                        t.isApprox(Math.round(arrowCtEl.offset().top + arrowCtEl.outerHeight()/2), Math.round(row.offset().top + row.height()/2), 4, prefix +' (right arrow) top is correct');

                                        break;
                                }
                            }
                        }
                    }
                });

                t.isApprox(parseFloat(depView.css("top")), -rowsHeight * (pageIndex % expectedNumOfPageRows), 2, "correct dependency view top shift");

                // proceed to the next page if any
                pageIndex++;

                checkPageContent(iframe);
            }
        });

    }

    t.diag(testConfig.name);

    t.waitForRowsVisible(scheduler, function() {

        plugin.doExport({
            format      : "A4",
            orientation : "landscape",
            range       : "complete",
            showHeader  : true,
            exporterId  : exporterId
        }, function (result) {

            pages = result.htmlArray;

            t.is(pages.length, expectedNumOfPages, "proper number of pages exported");

            var exporter   = plugin.exporter,
                rows       = exporter.normalRows;

            for (var i = 0; i < rows.length && rowsHeight + rows[i].height < exporter.printHeight; i++) {
                rowsHeight += rows[i].height;
            }

            checkPageContent();
        });

    });

});
