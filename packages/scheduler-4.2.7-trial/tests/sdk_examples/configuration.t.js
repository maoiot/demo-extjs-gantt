StartTest(function (t) {

    t.chain(
        {waitFor: 'eventsVisible'},

        function (next) {
            var cmp = t.cq1('schedulergrid');

            t.willFireNTimes(cmp, 'viewchange', 11);

            cmp.on('viewchange', function () {
                t.is(cmp.getSchedulingView().getRowHeight(), 35, 'Row height should be constant')
            })
            next();
        },

        Ext.Array.map([
            'Seconds',
            'Minutes',
            'Hours',
            'Days',
            'Weeks',
            'Weeks 2',
            'Weeks 3',
            'Months',
            'Years',
            'Years 2',
            'Day/night shift (custom)'
        ], function(text) {
            return [
                { click: '>> #presets' },
                { click: '>> [text=' + text + ']' }
            ];
        })
    );
});
