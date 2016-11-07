StartTest(function (t) {
    var scheduler, panPlugin;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();

        scheduler = t.getScheduler({
            viewPreset          : 'weekAndDay',
            plugins             : new Sch.plugin.Pan({
                pluginId          : 'pan',
                enableVerticalPan : true
            }),
            eventStore          : t.getEventStore({}, 0),
            renderTo            : Ext.getBody(),
            height              : 300,
            enableDragCreation  : false
        });

        panPlugin = scheduler.getPlugin('pan');
    });

    t.it('Should scroll view using drag', function (t) {
        var schedulerView   = scheduler.getSchedulingView(),
            scrollEl        = schedulerView.el,
            xy              = scrollEl.getXY();

        xy[0] += 30;
        xy[1] += 15;

        // skip test for chrome
        if (Ext.isChrome) {
            return;
        }

        t.chain(
            { waitForRowsVisible    : scheduler },
            function (next) {
                t.is(scrollEl.getScroll().left, 0, 'Scroll 0 before drag');
                t.dragBy(xy, [-30, 0], next);
            },
            function (next) {
                // HACK, really weird bug in latest chrome
                if (Ext.isChrome) {
                    t.isGreater(schedulerView.getScroll().left, 10, 'Scroll increased after drag');
                } else {
                    t.is(schedulerView.getScroll().left, 30, 'Scroll increased after drag');
                }
                t.dragBy(xy, [30, 0], next);
            },
            { waitFor : function () {
                return scrollEl.getScroll().left === 0;
            }}
        );
    });

    t.it('Should disbale pan with special keys', function (t) {
        var scrollEl        = scheduler.getSchedulingView().el,
            xy              = scrollEl.getXY();

        xy[0] += 15;
        xy[1] += 15;

        panPlugin.disableOnKey = Sch.plugin.Pan.KEY_SHIFT;

        t.chain(
            { waitForRowsVisible    : scheduler },
            { drag : xy, by : [-30, 0], options : { shiftKey : true } },
            function (next) {
                t.is(scrollEl.getScroll().left, 0, 'Scroll 0 after drag when SHIFT key is disabled and pressed');

                panPlugin.disableOnKey = Sch.plugin.Pan.KEY_CTRL;

                t.dragBy(xy, [-30, 0], next, null, { ctrlKey : true });
            },
            function (next) {
                t.is(scrollEl.getScroll().left, 0, 'Scroll 0 after drag when CTRL key is disabled and pressed');

                panPlugin.disableOnKey = Sch.plugin.Pan.KEY_ALT;

                t.dragBy(xy, [-30, 0], next, null, { altKey : true });
            },
            function (next) {
                t.is(scrollEl.getScroll().left, 0, 'Scroll 0 after drag when ALT key is disabled and pressed');
            }
        )
    });
});
