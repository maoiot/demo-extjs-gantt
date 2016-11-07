StartTest(function (t) {
    var scheduler = t.cq1('schedulergrid');

    t.it('should render some events', function (t) {

        t.waitForEventsVisible(function() {
            t.expect(t.cq1('schedulergrid actioncolumn').getWidth()).toBe(50);
        });

    })

    t.it('should change timespan', function (t) {

        t.willFireNTimes(scheduler, 'viewchange', 2);

        t.chain(
            { click : ".x-tool-left" },
            { click : ".x-tool-right" }
        );

    });

    t.it('should clear all row events', function (t) {

        t.chain(
            { click : Ext.grid.View.prototype.itemSelector + ":nth-child(2) .icon-delete" },
            { waitForSelectorNotFound : Ext.grid.View.prototype.itemSelector + ':nth-child(2) .sch-event' }
        );

    });

    t.it('should clear all events', function (t) {

        t.chain(
            { click : ".x-tool-close" },
            { waitForSelectorNotFound : '.sch-event' }
        );

    });
});
