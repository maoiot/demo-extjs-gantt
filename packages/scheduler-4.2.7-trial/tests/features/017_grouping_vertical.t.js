StartTest(function (t) {
    t.expectGlobals('TempResource');

    Ext.define('TempResource', {
        extend : 'Sch.model.Resource',
        fields : ['Group']
    });

    var scheduler, resourceStore;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
        resourceStore && resourceStore.destroy();

        resourceStore = new Sch.data.ResourceStore({
            model   : 'TempResource',
            groupField  : 'Group',
            data    : [
                { Id : 'r1', Name : 'Albert', Group : 'Men' },
                { Id : 'r2', Name : 'Bruce', Group : 'Men' },
                { Id : 'r3', Name : 'Ann', Group : 'Women' },
                { Id : 'r4', Name : 'Beth', Group : 'Women' }
            ]
        });
    });

    t.it('Vertical view should do ok with grouping feature', function (t) {
        scheduler = t.getScheduler({
            renderTo        : Ext.getBody(),
            resourceStore   : resourceStore,
            features        : [
                {
                    id: 'group',
                    ftype: 'scheduler_grouping',
                    groupHeaderTpl: '{name}',
                    hideGroupedHeader: false,
                    enableGroupingMenu: true
                }
            ],
            mode            : 'vertical'
        });

        var view = scheduler.getSchedulingView();

        t.chain(
            { waitForSelector : '.sch-verticaltimeaxis-cell:contains(Mon 03 Jan)'},

            function (next) {
                t.ok(view.groupingFeature.disabled, 'Grouping disabled');
                t.selectorNotExists('.x-group-hd-container', 'Grouping header is not rendered');

                t.waitForEvent(scheduler, 'modechange', next);
                scheduler.setMode('horizontal');
            },
            function (next) {
                t.notOk(view.groupingFeature.disabled, 'Grouping enabled');
                t.selectorExists('.x-group-hd-container', 'Grouping header is rendered');
                t.selectorExists('.sch-event', 'Events are rendered');

                t.waitForEvent(scheduler, 'modechange', next);
                scheduler.setMode('vertical');
            },

            { waitForSelector : '.sch-verticaltimeaxis-cell:contains(Mon 03 Jan)'},

            function () {
                t.ok(view.groupingFeature.disabled, 'Grouping disabled');
                t.selectorNotExists('.x-group-hd-container', 'Grouping header is not rendered');

            }
        );
    });

    t.it('Calendar view should do ok with grouping feature', function (t) {
        scheduler = t.getScheduler({
            renderTo        : Ext.getBody(),
            resourceStore   : resourceStore,
            features        : [
                {
                    id: 'group',
                    ftype: 'scheduler_grouping',
                    groupHeaderTpl: '{name}',
                    hideGroupedHeader: false,
                    enableGroupingMenu: true
                }
            ],
            mode            : 'calendar'
        });

        t.waitForEventsToRender(scheduler, function () {
            t.ok(scheduler.getSchedulingView().groupingFeature.disabled, 'Grouping disabled');
            t.selectorNotExists('.x-group-hd-container', 'Grouping header is not rendered');
        });
    });

    t.it('Switching to vertical view with grouping should work ok', function (t) {
        scheduler = t.getScheduler({
            renderTo        : Ext.getBody(),
            resourceStore   : resourceStore,
            features        : [
                {
                    id: 'group',
                    ftype: 'scheduler_grouping',
                    groupHeaderTpl: '{name}',
                    hideGroupedHeader: false,
                    enableGroupingMenu: true
                }
            ]
        });

        var oldSpan = [scheduler.getStart(), scheduler.getEnd()];

        var view = scheduler.getSchedulingView();

        t.chain(
            { waitForEventsToRender : scheduler },

            function (next) {
                t.notOk(view.groupingFeature.disabled, 'Grouping enabled');
                t.selectorExists('.x-group-hd-container', 'Grouping header is rendered');

                t.waitForEvent(scheduler, 'modechange', next);
                t.firesOk({
                    observable  : view,
                    events      : {
                        refresh : 2
                    },
                    during      : function () {
                        scheduler.setMode('vertical');
                    }
                });
            },
            function (next) {
                t.ok(view.groupingFeature.disabled, 'Grouping disabled');
                t.selectorNotExists('.x-group-hd-container', 'Grouping header is not rendered');

                t.selectorExists('.sch-event', 'Events are visible');

                t.waitForEvent(scheduler, 'viewchange', next);
                t.firesOk({
                    observable  : view,
                    events      : {
                        refresh : 1
                    },
                    during      : function () {
                        scheduler.shiftNext();
                    }
                });
            },

            { waitForSelector : '.sch-verticaltimeaxis-cell:contains(Tue 04 Jan)'},

            function (next) {
                t.selectorExists('.sch-event', 'Events are visible');

                t.waitForEvent(scheduler, 'modechange', next);
                t.firesOk({
                    observable  : view,
                    events      : {
                        refresh : 2
                    },
                    during      : function () {
                        scheduler.setMode('calendar');
                    }
                });
            },
            function (next) {
                t.ok(view.groupingFeature.disabled, 'Grouping disabled');
                t.selectorExists('.sch-event', 'Events are visible');

                t.is(view.getNodes().length, 24, 'Calendar rows are rendered');
                t.is(scheduler.normalGrid.getVisibleColumns().length, 7, 'Calendar columns are rendered');

                t.waitForEvent(scheduler, 'modechange', next);
                t.firesOk({
                    observable  : view,
                    events      : {
                        refresh : 1
                    },
                    during      : function () {
                        scheduler.setMode('horizontal');
                    }
                });
            },
            function () {
                t.notOk(view.groupingFeature.disabled, 'Grouping enabled');
                t.selectorExists('.x-group-hd-container', 'Grouping header is rendered');
            }
        );
    });
});