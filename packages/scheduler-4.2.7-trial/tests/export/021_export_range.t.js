StartTest(function (t) {
    t.expectGlobal('0'); // We love IE and Firefox

    var scheduler, exportPlugin;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    var iframe = document.body.appendChild(document.createElement('iframe')),
        doc;

    var setIframe   = function (html) {
        doc         = iframe.contentWindow.document;
        doc.open();
        doc.write(html);
        doc.close();
    };

    t.it('Exported page should be sized correctly', function (t) {
        exportPlugin = new Sch.plugin.Export({
            openAfterExport     : false,
            printServer         : 'foo',
            test                : true,
            exportDialogConfig  : {
                showColumnPicker : true
            }
        });

        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            plugins     : exportPlugin
        });

        var async = t.beginAsync(15000);

        t.waitForRowsVisible(function () {
            var conrtolWidth =
                scheduler.lockedGrid.getWidth() +
                scheduler.down('splitter').getWidth() +
                scheduler.timeAxisViewModel.getTickWidth();

            var viewId = scheduler.view.el.id;

            exportPlugin.doExport({
                format      : "A4",
                orientation : "landscape",
                range       : 'date',
                dateFrom    : new Date(2011, 0, 13),
                dateTo      : new Date(2011, 0, 14),
                showHeader  : true,
                exporterId  : 'singlepage'
            }, function (response) {
                var html = response.htmlArray[0].html;

                setIframe(html);
                var body = t.$('.sch-schedulerpanel', doc)[0];
                t.isApprox(parseInt(body.style.width, 10), conrtolWidth, 5, 'Width is correct');
                t.endAsync(async);
            });
        });
    });
});