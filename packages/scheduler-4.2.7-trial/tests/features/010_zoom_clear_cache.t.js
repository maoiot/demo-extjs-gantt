StartTest(function (t) {

    // #2439 - Center date is lost after zoom in/out

    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();

        scheduler = t.getScheduler({
            renderTo    : Ext.getBody()
        })
    });

    t.it('View scroll should clear center date cache', function (t) {
        var view = scheduler.getSchedulingView();
        var desiredDate;

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                t.waitForEvent(view, 'scroll', next);
                scheduler.zoomOut();
            },
            function (next) {
                t.waitForEvent(view, 'scroll', next);
                view.scrollTo(100);
            },
            function (next) {
                t.waitForEvent(view, 'scroll', next);
                desiredDate = view.getViewportCenterDate();
                t.notOk(scheduler.cachedCenterDate, 'Center date cache cleared after scroll');
                scheduler.zoomIn();
            },
            function () {
                var msPerPixel = view.getDateFromX(1) - view.getDateFromX(0);
                t.isApprox(view.getViewportCenterDate(), desiredDate, msPerPixel, 'Center date is correct');
            }
        )
    });
});