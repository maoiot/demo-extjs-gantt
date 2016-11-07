StartTest(function (t) {

    // #3079 - Gantt scroll to past after changing preset or show/hide resource histogram in border panel layout

    var scheduler = t.getScheduler({
        height           : 200,
        width            : 600,
        infiniteScroll   : true,
        viewPreset       : 'hourAndDay',
        startDate        : new Date(2011, 0, 1, 6),
        endDate          : new Date(2011, 0, 2, 20),
        resourceStore    : t.getResourceStore({
            data : [
                { Id : 'r1', Name : 'Mike' }
            ]
        }),
        renderTo         : Ext.getBody()
    });


    t.waitForRowsVisible(scheduler, function () {
        var view        = scheduler.getSchedulingView(),
            scrollX     = view.getScrollX(),
            startDate   = scheduler.getStart(),
            endDate     = scheduler.getEnd();

        scheduler.setViewPreset(scheduler.getViewPreset());

        t.is(view.getScrollX() - scrollX, 0, 'Scroll position stayed the same');
        t.is(scheduler.getStart() - startDate, 0, 'Timeaxis start date stayed the same');
        t.is(scheduler.getEnd() - endDate, 0, 'Timeaxis end date stayed the same');
    })
});
