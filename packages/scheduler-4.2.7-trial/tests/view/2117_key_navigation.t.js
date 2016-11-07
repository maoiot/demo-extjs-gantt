StartTest(function (t) {

    t.it('Navigating in normal view should not throw exceptions', function (t) {
        var scheduler = t.getScheduler({
            renderTo : Ext.getBody()
        });

        // we don't expect to face any exceptions during the following chain of clicks/key presses
        t.chain(
            { waitForEventsToRender : scheduler },
            {
                dblclick : '.sch-schedulerview',
                offset   : ['50%', '100%-20'],
                desc     : 'Click empty place in the bottom of the normal grid'
            },
            {
                click    : '.sch-timetd',
                desc     : 'Click 1st normal grid row'
            },
            { type : '[PAGE-DOWN][UP][PAGE-UP][DOWN]' }
        )
    });
});