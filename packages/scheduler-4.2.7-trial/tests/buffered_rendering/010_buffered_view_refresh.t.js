StartTest(function (t) {
    t.it('Normal view refresh should not mess locked view (finite scroll)', function (t) {
        var scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            resourceStore   : t.getResourceStore2({}, 60)
        });

        var view = scheduler.getSchedulingView();

        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                // scroll to bottom first, before scrollEventIntoView changed timespan
                scheduler.ensureVisible(scheduler.resourceStore.last(), { callback : function () {
                    if (this.isLocked === false) {
                        t.waitForEvent(view, 'scroll', next);
                    }
                }});
            },
            function (next) {
                t.waitForEvent(view, 'refresh', next);
                scheduler.timeAxis.shiftNext();
            },
            function (next) {
                t.bufferedRowsAreSync(scheduler);
            }
        );
    });

    t.it('Normal view refresh should not mess locked view (infinite scroll)', function (t) {
        var scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            infiniteScroll  : true,
            resourceStore   : t.getResourceStore2({}, 60)
        });

        var view = scheduler.getSchedulingView();

        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                // scroll to bottom first, before scrollEventIntoView changed timespan
                scheduler.ensureVisible(scheduler.resourceStore.last(), { callback : function () {
                    if (this.isLocked === false) {
                        t.waitForEvent(view, 'scroll', next);
                    }
                }});
            },
            function (next) {
                t.waitForEvent(view, 'refresh', next);
                scheduler.timeAxis.shiftNext();
            },
            function (next) {
                t.bufferedRowsAreSync(scheduler);
            }
        );
    });
});