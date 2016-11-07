StartTest(function (t) {

    t.expectGlobal('ExampleDefaults');

    function getTicketColumnWidth(doc) {
        var headerRowCt = doc.querySelector('.sch-header-row-middle '),
            columns     = t.$('.sch-column-header', headerRowCt);

        return parseInt(columns[0].style.width, 10);
    }


    t.describe('TimeAxis alignment should be correct on first export/print run', function (t) {

        var scheduler = t.cq1('schedulergrid');

        var plugin    = scheduler.getPlugin('printable');

        plugin.autoPrintAndClose = false;

        var originalWidth = getTicketColumnWidth(document);

        var originalTickWidth = scheduler.timeAxisViewModel.originalTickWidth;

        var doExport = function (next) {

            var async = t.beginAsync(45000);

            var iframe, win;

            // Mock up "window.open". Native window.open usage in the test causes troubles w/ timeouts
            window.open = function () {
                iframe = t.setIframe({
                    onload : function () {
                        t.endAsync(async);

                        t.is(getTicketColumnWidth(win.document), originalWidth, 'TimeAxis column has correct width');
                        t.is(scheduler.timeAxisViewModel.originalTickWidth, originalTickWidth, 'Original tick width value restored');

                        // cleanup (remove iframe node)
                        iframe.parentNode.removeChild(iframe);

                        next();
                    }
                });

                return win = iframe.contentWindow;
            };

            plugin.doExport({
                format      : 'A4',
                orientation : 'portrait',
                range       : 'complete',
                exporterId  : 'multipage'
            });

        };


        t.waitForRowsVisible(scheduler, function () {
            t.chain(
                doExport,
                doExport
            );
        });
    });


});