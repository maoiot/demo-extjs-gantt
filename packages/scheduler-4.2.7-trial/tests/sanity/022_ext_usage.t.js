StartTest(function(t) {

    t.todo("This test is setting up a limitation for Ext.* calls", function(t) {
        t.getFile('../sch-all.js', function (schAllDebugText) {

            var matched = schAllDebugText.match(/Ext[.][a-zA-Z.]+/g);

            var processed    = {},
                distinctList = [];

            for (var i = matched.length - 1; i >= 0; i--) {
                var match = matched[i];
                if (!processed[match]) {
                    distinctList.push(processed[match] = { counter : 1, name : match });
                } else {
                    processed[match].counter++;
                }
            }

            t.isLessOrEqual(matched.length, 1169, 'number of Ext.* calls is under control: ' + matched.length + ' (check console for top-10)');

            // let's report top-10 Ext.* usages to console
            if (!Ext.isIE) {
                var consoleLog = console && console.table || console.log;

                if (consoleLog && consoleLog.call) {
                    consoleLog.call(console, distinctList.sort(function (a, b) {
                        return b.counter - a.counter;
                    }).slice(0, 10));
                }
            }

        });
    });
});
