StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    t.xit("Scheduler horizontal mode visual test", function (t) {
        scheduler = t.getScheduler({
            renderTo        : Ext.getBody(),
            dependencyStore : true,
            resourceStore   : t.getResourceStore2({}, 2500)
        }, 2500);
    });

    t.xit("Scheduler vertical mode visual test", function (t) {
        scheduler = t.getScheduler({
            mode            : 'vertical',
            renderTo        : Ext.getBody(),
            dependencyStore : true,
            resourceStore   : t.getResourceStore2({}, 10)
        }, 300);
    });

    t.xit("Scheduler calendar mode visual test", function (t) {
        scheduler = t.getScheduler({
            calendarViewPreset : 'week',
            mode               : 'calendar',
            renderTo           : Ext.getBody(),
            dependencyStore    : true,
            resourceStore      : t.getResourceStore2({}, 10)
        }, 300);
    });


    t.it("Should fire dependencymouseenter/dependencymouseleave events", function (t) {
        scheduler = t.getScheduler({
            renderTo        : Ext.getBody(),
            dependencyStore : true,
            resourceStore   : t.getResourceStore2({}, 2),
            dependencyViewConfig : {
                overCls : 'sch-dependency-over'
            }
        }, 2);

        t.firesAtLeastNTimes(scheduler, 'dependencymouseover', 1);
        t.firesAtLeastNTimes(scheduler, 'dependencymouseout', 1);

        t.chain(
            { moveCursorTo : '.sch-dependency-arrow'},
            { waitForSelector : '.sch-dependency-over'},

            { moveCursorTo : '.sch-event'},
            { waitForSelectorNotFound : '.sch-dependency-over'}
        )
    });

    // #3243
    t.it('Dependency painted ok on the last rendered row', function (t) {
        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            eventStore  : t.getEventStore(null, 0),
            resourceStore   : t.getResourceStore({
                data : (function () {
                    var data = [];
                    for (var i = 0; i < 50; i++) {
                        data.push({ Id : i + 1, Name : i + 1 })
                    }
                    return data;
                })()
            }),
            dependencyStore : t.getDependencyStore(null, 0)
        });

        t.chain(
            { waitForRowsVisible : scheduler },
            function () {
                // Add two events so only one is rendered and link them with dependency
                var lastRowIndex = scheduler.normalGrid.view.all.endIndex;
                scheduler.eventStore.add([
                    {
                        Id : 1,
                        ResourceId : lastRowIndex + 1,
                        StartDate : '2011-01-06',
                        EndDate : '2011-01-08'
                    },
                    {
                        Id : 2,
                        ResourceId : lastRowIndex + 3,
                        StartDate : '2011-01-06',
                        EndDate : '2011-01-08'
                    }
                ]);

                scheduler.dependencyStore.add({
                    From : 1,
                    To : 2
                });

                // dependencies are async
                var async = t.beginAsync(1000);

                scheduler.getDependencyView().on('refresh', function () {
                    t.endAsync(async);
                    var dependencyLine = scheduler.el.down('.sch-dependency-line-horizontal');
                    var record = scheduler.eventStore.getById(1);
                    var eventBox = scheduler.normalGrid.view.getElementsFromEventRecord(record)[0].getBox();
                    t.isApprox(dependencyLine.getTop(), eventBox.top + eventBox.height / 2, 2, 'Horizontal line placed ok');
                });

                // Add two records to stretch row vertically
                scheduler.eventStore.add([
                    {
                        StartDate : '2011-01-06',
                        EndDate : '2011-01-08',
                        ResourceId : 2
                    }, {
                        StartDate : '2011-01-06',
                        EndDate : '2011-01-08',
                        ResourceId : 2
                    }
                ]);
            }
        );
    });
});
