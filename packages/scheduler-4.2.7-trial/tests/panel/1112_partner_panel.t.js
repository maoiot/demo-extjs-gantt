StartTest(function (t) {

    var scheduler, partner;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
        partner && partner.destroy();
    });

    t.afterEach(function () {
        if (scheduler.isVisible() && partner.isVisible()) {
            t.is(scheduler.lockedGrid.getCollapsed(), scheduler.lockedGrid.getCollapsed(), 'collapsed state is synced');
            t.is(partner.lockedGrid.getWidth(), scheduler.lockedGrid.getWidth(), 'width state is synced');
        }
    });

    t.it('Partner timeline panel should share timeAxis and timelineViewModel', function (t) {
        scheduler = t.getScheduler({
            renderTo   : Ext.getBody(),
            viewConfig : { deferInitialRefresh : false }
        });

        partner = t.getScheduler({
            renderTo             : Ext.getBody(),
            partnerTimelinePanel : scheduler,
            viewConfig           : { deferInitialRefresh : false }
        });

        t.is(scheduler.timeAxis, partner.timeAxis, 'timeAxis ok');
        t.is(scheduler.timeAxisViewModel, partner.timeAxisViewModel, 'timeAxisViewModel ok');

        for (var i = 0; i < 5; i++) {
            scheduler.zoomOut();
            t.is(scheduler.viewPreset, partner.viewPreset, 'Should see synced preset name in partner panel');
        }
    });

    // enable when this bug fixed http://www.sencha.com/forum/showthread.php?295195
    t.xit('Partner timeline panel should share collapsed state (panel is expanded, partner is collapsed)', function (t) {
        scheduler = t.getScheduler({
            renderTo         : Ext.getBody(),
            lockedGridConfig : {
                collapsed : true,
                width     : 200
            }
        });

        partner = t.getScheduler({
            renderTo             : Ext.getBody(),
            partnerTimelinePanel : scheduler
        });

        var schedulerLocked = scheduler.lockedGrid;
        var partnerLocked   = partner.lockedGrid;

        t.chain(
            { waitForRowsVisible : partner },
            function (next) {
                t.is(partnerLocked.getCollapsed(), 'left', 'Partner locked panel is collapsed');

                t.waitForEvent(schedulerLocked, 'viewready', next);
                schedulerLocked.expand();
            },
            function (next) {
                t.is(partnerLocked.getCollapsed(), false, 'Partner locked panel is expanded');
                t.is(partnerLocked.getWidth(), schedulerLocked.getWidth(), 'Locked grids width is synced');

                schedulerLocked.collapse();
                t.is(partnerLocked.getCollapsed(), 'left', 'Partner locked panel is collapsed');

                partnerLocked.expand();
                t.is(schedulerLocked.getCollapsed(), false, 'Partner locked panel is expanded');

                partnerLocked.collapse();
                t.is(schedulerLocked.getCollapsed(), 'left', 'Partner locked panel is collapsed');
            }
        );
    });

    // enable when this bug fixed http://www.sencha.com/forum/showthread.php?295195
    t.xit('Partner timeline panel should share collapsed state (panel is collapsed, partner is expanded)', function (t) {
        scheduler = t.getScheduler({
            renderTo         : Ext.getBody(),
            lockedGridConfig : {
                width : 200
            }
        });

        partner = t.getScheduler({
            renderTo             : Ext.getBody(),
            partnerTimelinePanel : scheduler,
            lockedGridConfig     : {
                collapsed : true
            }
        });

        var schedulerLocked = scheduler.lockedGrid;
        var partnerLocked   = partner.lockedGrid;

        t.chain(
            { waitForRowsVisible : partner },
            function (next) {
                t.is(partnerLocked.getWidth(), schedulerLocked.getWidth(), 'Locked grids width is synced');

                schedulerLocked.collapse();
                t.is(partnerLocked.getCollapsed(), 'left', 'Partner locked panel is collapsed');

                partnerLocked.expand();
                t.is(schedulerLocked.getCollapsed(), false, 'Partner locked panel is expanded');

                partnerLocked.collapse();
                t.is(schedulerLocked.getCollapsed(), 'left', 'Partner locked panel is collapsed');

                schedulerLocked.expand();
                t.is(partnerLocked.getCollapsed(), false, 'Partner locked panel is expanded');
            }
        );
    });


    t.it('First panel and the shared timeAxisViewModel should not react if a new partner panel is created', function (t) {
        scheduler = t.getScheduler({
            renderTo : Ext.getBody()
        });

        t.chain(
            { waitFor : 'rowsVisible', args : scheduler },

            function () {

                t.wontFire(scheduler.getSchedulingView(), 'refresh', 'First panel view should not refresh if a new partner panel is created');
                t.wontFire(scheduler.timeAxisViewModel, 'reconfigure', 'timeAxisViewModel should not be reconfigured by a new partner panel');
                t.wontFire(scheduler.timeAxis, 'reconfigure', 'timeAxis should not be reconfigured by a new partner panel');

                partner = t.getScheduler({
                    renderTo             : Ext.getBody(),
                    partnerTimelinePanel : scheduler,
                    startDate            : new Date()
                });

                t.is(scheduler.timeAxis, partner.timeAxis, 'timeAxis ok');
            }
        );
    });

    t.it('Partner panel should read "width" in case "master" panel is hidden when partner is created', function (t) {
        scheduler = t.getScheduler({
            renderTo         : Ext.getBody(),
            lockedGridConfig : {
                width : 222
            }
        });

        t.chain(
            { waitForRowsVisible : scheduler },

            function () {
                scheduler.hide();

                partner = t.getScheduler({
                    renderTo             : Ext.getBody(),
                    partnerTimelinePanel : scheduler
                });

                t.is(partner.lockedGrid.getWidth(), 222, 'lockedGrid sized ok');
            }
        );
    });

    t.it('Partner should sync locked grid width', function (t) {
        scheduler = t.getScheduler({
            id               : 'one',
            height           : 100,
            renderTo         : Ext.getBody(),
            lockedGridConfig : {
                width : 200
            }
        });

        partner = t.getScheduler({
            id                   : 'two',
            height               : 100,
            renderTo             : Ext.getBody(),
            partnerTimelinePanel : scheduler
        });

        t.chain(
            { drag : '>>#one splitter', by : [-50, 0] },

            function (next) {
                t.is(partner.lockedGrid.getWidth(), 150);

                next()
            },
            { drag : '>>#two splitter', by : [40, 0] },

            function (next) {
                t.is(scheduler.lockedGrid.getWidth(), 190);

                // through API call
                scheduler.lockedGrid.setWidth(40);

                t.is(partner.lockedGrid.getWidth(), 40);
            }
        );
    });

    t.it('Partner should sync scroll position', function (t) {
        scheduler = t.getScheduler({
            id               : 'one',
            height           : 100,
            renderTo         : Ext.getBody()
        });

        partner = t.getScheduler({
            id                   : 'two',
            height               : 100,
            renderTo             : Ext.getBody(),
            partnerTimelinePanel : scheduler
        });

        t.chain(
            { waitForRowsVisible : scheduler },

            function (next) {
                t.waitForEvent(partner.getSchedulingView(), 'scrollend', next);

                scheduler.getSchedulingView().scrollTo(100, 0);
            },

            // HACK: scroll syncing is buffered 300 ms, need to wait
            { waitFor : 500 },

            function (next) {
                t.is(partner.getSchedulingView().getScroll().left, 100);

                t.waitForEvent(scheduler.getSchedulingView(), 'scrollend', next);
                partner.getSchedulingView().scrollTo(50, 0);
            },

            function (next) {
                t.is(scheduler.getSchedulingView().getScroll().left, 50);
            }
        );
    });

    t.it('Partner should sync zoom level (zooming main panel)', function (t) {
        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            startDate   : new Date(2010, 0, 11),
            height      : 200
        });

        partner = t.getScheduler({
            renderTo                : Ext.getBody(),
            partnerTimelinePanel    : scheduler,
            height                  : 200
        });

        var schedulerNormalGrid = scheduler.normalGrid,
            partnerNormalGrid = partner.normalGrid;

        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                t.waitForEvent(partner, 'viewchange', next);
                scheduler.zoomOutFull();
            },
            function (next) {
                var steps = [];
                var previousLevelIndex, currentLevelIndex;

                var zoomStepsGenerator = function (panel, zoomOut) {
                    var steps = [];

                    for (var i = 0, l = scheduler.zoomLevels.length; i < l; i++) {
                        steps.push(
                            function (next) {
                                previousLevelIndex = panel.getCurrentZoomLevelIndex();

                                if (previousLevelIndex === 0 || previousLevelIndex === l - 1) {
                                    next();
                                } else {
                                    t.waitForEvent(partner.columnLinesFeature, 'columnlinessynced', next);
                                    currentLevelIndex = zoomOut ? panel.zoomOut() : panel.zoomIn();
                                }
                            },
                            {
                                waitFor : function () {
                                    var schedulerViewScroll = schedulerNormalGrid.getView().getScrollX(),
                                        schedulerHeaderScroll = schedulerNormalGrid.getHeaderContainer().getScrollX(),
                                        partnerViewScroll = partnerNormalGrid.getView().getScrollX(),
                                        partnerHeaderScroll = partnerNormalGrid.getHeaderContainer().getScrollX();

                                    return schedulerViewScroll === schedulerHeaderScroll &&
                                            partnerViewScroll === partnerHeaderScroll &&
                                            schedulerHeaderScroll === partnerHeaderScroll;
                                }
                            },
                            function (next) {
                                t.is(scheduler.viewPreset, partner.viewPreset, 'View presets match');
                                if (zoomOut) {
                                    if (currentLevelIndex > 0 && previousLevelIndex <= currentLevelIndex) {
                                        t.fail('Zooming out stopped');
                                    }
                                } else {
                                    if (currentLevelIndex < l - 1 && previousLevelIndex >= currentLevelIndex) {
                                        t.fail('Zooming in stopped');
                                    }
                                }
                                next();
                            }
                        )
                    }

                    return steps;
                };

                steps.push({ diag : 'Zooming main panel in' });
                steps.push.apply(steps, zoomStepsGenerator(scheduler, false));

                steps.push({ diag : 'Zooming main panel out' });
                steps.push.apply(steps, zoomStepsGenerator(scheduler, true));

                steps.push({ diag : 'Zooming partner panel in' });
                steps.push.apply(steps, zoomStepsGenerator(partner, false));

                steps.push({ diag : 'Zooming partner panel out' });
                steps.push.apply(steps, zoomStepsGenerator(partner, true));

                t.chain(steps);
            }
        );
    });
});

