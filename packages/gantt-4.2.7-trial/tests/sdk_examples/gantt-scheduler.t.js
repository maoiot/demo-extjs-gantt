StartTest(function (t) {
    t.it('Clicking buttons should live ok', function (t) {
        t.waitForSelector('.sch-gantt-item', function () {

            t.chain(
                Ext.Array.map(t.cq('gantttoolbar button'), function (cmp) {
                    // provide horizontal 10px offset ..since when we run the test in the vm
                    // it has quite a narrow screen width and a button is not 100% visible sometimes
                    // so we target its left part
                    return { click : cmp, offset : [ 10, '50%' ] };
                }),

                { click : 'tool[type=close] => .x-tool-img' },

                Ext.Array.map(t.cq('navigation button'), function (cmp) {
                    // provide horizontal 10px offset ..since when we run the test in the vm
                    // it has quite a narrow screen width and a button is not 100% visible sometimes
                    // so we target its left part
                    return { click : cmp, offset : [ 10, '50%' ] };
                })
            );

        });
    });
});