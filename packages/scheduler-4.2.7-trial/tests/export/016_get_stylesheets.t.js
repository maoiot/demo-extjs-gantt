StartTest(function (t) {

    // Checks that translateURLsToAbsolute option works and correctly extracts stylesheet URLs
    t.expectGlobal('ExampleDefaults');

    var urls = [
        new RegExp('href="http://www.bryntum.com/examples/extjs-\\d\\.\\d\\.\\d/build/classic/theme-triton/resources/theme-triton-all.css"'),
        new RegExp('href="http[s]?://.+/resources/css/sch-all-triton.css'),
        new RegExp('href="http[s]?://.+/examples/css/examples.css')
    ];

    var scheduler = t.cq1('schedulergrid');

    t.waitFor(
        function () { return scheduler = t.cq1('schedulergrid'); },
        function () {
            var plugin    = scheduler.getPlugin('export');

            var exporters = plugin.getExporters();

            for (var i = 0; i < exporters.length; i++) {
                var exporter    = exporters[i],
                    stylesheets = exporter.getStylesheets();

                // check every exporter
                t.it(exporter.getExporterId(), function (t) {

                    t.is(stylesheets.match(/href="([^"]+)"/g).length, 3, 'proper number of stylesheets');

                    for (var i = 0; i < urls.length; i++) {
                        var url = urls[i];

                        t.like(stylesheets, url);
                    }

                });
            }
        }
    );

});