StartTest(function (t) {

    t.describe('Assert infiniteScroll', function (t) {

        var plugin          = Ext.create('Sch.plugin.Export', {
            printServer     : 'someserver',
            openAfterExport : false,
            test            : true
        });

        var scheduler       = t.getScheduler({
            renderTo        : Ext.getBody(),
            width           : 1000,
            startDate       : new Date(2011, 0, 3),
            endDate         : new Date(2011, 0, 10),
            infiniteScroll  : true,
            plugins         : plugin,
            columns         : [
                { header : 'Name', dataIndex : 'Name', width : 100 }
            ]
        });

        var normalBodySelector      = '#' + scheduler.normalGrid.view.getId(),
            normalHeaderSelector    = '.x-grid-inner-normal .x-grid-header-ct',
            lockedHeaderSelector    = '.x-grid-header-ct-docked-top',
            iframe, doc, normalHeader, lockedHeader, normalBody, schedulerTargetEl;

        // puts HTML code into iframe
        var setIframe   = function (t, html) {
            iframe = t.setIframe({ html : html });
            doc    = iframe.contentWindow.document;

            normalBody      = t.$(normalBodySelector, doc)[0];
            normalHeader    = t.$(normalHeaderSelector, doc)[0];
            lockedHeader    = t.$(lockedHeaderSelector, doc)[0];
            schedulerTargetEl = t.$('.sch-schedulerpanel .x-box-target', doc)[0];
        };

        var checkPageContent = function (t, eventNumber, colNumber, start, end) {
            // locked grid width
            var lockedWidth = t.$(lockedHeader).width();

            // get normal grid columns
            var columns = t.$('.sch-header-row-middle .sch-simple-timeheader', normalHeader);

            // filter out invisible ones
            var leftWidth  = t.$(schedulerTargetEl).width() - lockedWidth;
            // filter out columns that ..
            columns     = Ext.Array.filter(columns, function (i, item) {
                item = t.$(item);
                // .. before visible range
                if (item.offset().left - lockedWidth < 0) return false;
                leftWidth -= item.width();
                // .. or after visible range
                return leftWidth >= 0;
            });

            var headerConfig    = scheduler.getSchedulingView().getTimeAxisViewModel().headerConfig,
                dateFormat      = (headerConfig.bottom || headerConfig.middle).dateFormat;

            t.is(t.$('.sch-event', normalBody).length, eventNumber, 'There are ' + eventNumber + ' events');
            t.is(columns.length, colNumber, 'There are ' + colNumber + ' columns');
            t.contentLike(columns[0], Ext.util.Format.date(start, dateFormat), 'Start visible column is correct');
            t.contentLike(columns[colNumber-1], Ext.util.Format.date(end, dateFormat), 'End visible column is correct');
        }

        t.waitForRowsVisible(scheduler, function () {

            var async = t.beginAsync(45000);

            plugin.doExport(
                {
                    format      : 'A4',
                    orientation : 'portrait',
                    range       : 'complete',
                    showHeader  : true,
                    exporterId  : 'multipage'
                },
                function (response) {
                    var span    = scheduler.getEventStore().getTotalTimeSpan(),
                        pages   = response.htmlArray;

                    t.it('0th page has correct number of events', function (t) {

                        setIframe(t, pages[0].html);
                        t.waitFor(1500, function () {
                            checkPageContent(t, 5, 5, span.start, new Date(2011, 0, 8));
                            // cleanup
                            iframe.parentNode.removeChild(iframe);
                        });
                    });

                    t.it('1th page has correct number of events', function (t) {

                        setIframe(t, pages[1].html);
                        t.waitFor(1500, function () {
                            checkPageContent(t, 2, 1, new Date(2011, 0, 9), Sch.util.Date.add(span.end, Ext.Date.DAY, -1));
                            // cleanup
                            iframe.parentNode.removeChild(iframe);
                        });
                    });

                    t.endAsync(async);
                }
            );
        });
    });

});