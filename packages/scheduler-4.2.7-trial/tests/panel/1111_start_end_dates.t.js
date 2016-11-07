StartTest(function(t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    // Here we check that panel can get startDate and endDate from eventStore if they were not specified

    t.it('Panel takes start and end dates from event store', function (t) {
        scheduler = t.getScheduler({
            renderTo        : Ext.getBody(),
            startDate       : null,
            endDate         : null,
            eventStore      : new Sch.data.EventStore({
                data : [
                    { StartDate : new Date(2011, 0, 4), EndDate : new Date(2011, 0, 5) },
                    { StartDate : new Date(2011, 0, 9), EndDate : new Date(2011, 0, 10) }
                ]
            })
        });

        t.is(scheduler.timeAxis.start, new Date(2011, 0, 4), 'proper start date set');
        t.is(scheduler.timeAxis.end, new Date(2011, 0, 10), 'proper end date set');
    });

    // Here we check that panel can get startDate and endDate from eventStore if they were not specified

    t.it('Panel handles an event store with 0 duration content (add a buffer of 1 timeAxis "main unit" to start and end respectively)', function (t) {
        scheduler = t.getScheduler({
            renderTo        : Ext.getBody(),
            startDate       : null,
            endDate         : null,
            viewPreset      : 'weekAndDayLetter',
            eventStore      : new Sch.data.EventStore({
                data : [
                    { StartDate : new Date(2011, 0, 10), EndDate : new Date(2011, 0, 10) }
                ]
            })
        });

        // Add 1 w on each side of the milestone event
        t.is(scheduler.timeAxis.start, new Date(2011, 0, 3), 'proper start date set');
        t.is(scheduler.timeAxis.end, new Date(2011, 0, 17), 'proper end date set');
    });

    t.it('Panel gets start end dates from new events', function (t) {

        scheduler = t.getScheduler({
            startDate   : null,
            endDate     : null,
            eventStore  : t.getEventStore({
                data        : [
                    { Id : 10, ResourceId : 1, StartDate : new Date(2010, 1, 1), EndDate : new Date(2010, 2, 2), Cls : 'event-I' },
                    { Id : 20, ResourceId : 1, StartDate : new Date(2010, 1, 10), EndDate : new Date(2010, 2, 12), Cls : 'event-II' }
                ]
            }),
            resourceStore  : t.getResourceStore({
                data        : [{ Id : 1, Name : 'foo' }]
            }),
            renderTo    : Ext.getBody()
        });

        var view            = scheduler.getSchedulingView(),
            eventStore      = scheduler.getEventStore();

        // waiting for the very first refresh to complete to not interfere with other refreshes
        t.waitFor(function () { return scheduler.eventStore.isLoaded(); }, function () {
            t.is(scheduler.timeAxis.start, new Date(2010, 1, 1), 'proper start date set');
            t.is(scheduler.timeAxis.end, new Date(2010, 2, 12), 'proper end date set');

            t.selectorExists('.event-I', 'event #10 is rendered');
            t.selectorExists('.event-II', 'event #20 is rendered');
        });
    });

    t.it('Should take start and dates from crud manager', function (t) {
        var cm = new Sch.data.CrudManager({
            autoLoad    : false,
            transport   : {
                load : {
                    url : 'data/1111_start_end_dates.json'
                }
            }
        });

        var getScheduler = function () {
            return new Sch.panel.SchedulerGrid({
                renderTo    : Ext.getBody(),
                width       : 600,
                height      : 400,
                crudManager : cm
            });
        };

        scheduler = getScheduler();

        cm.load();

        t.chain(
            { waitForSelector : '.sch-event' },
            function (next) {
                t.ok(scheduler.timeAxis.timeSpanInAxis(new Date(2011, 0, 1), new Date(2011, 0, 13)));

                scheduler.destroy();

                scheduler = getScheduler();
                next();
            },
            { waitForSelector : '.sch-event' },
            function () {
                t.ok(scheduler.timeAxis.timeSpanInAxis(new Date(2011, 0, 1), new Date(2011, 0, 13)));
            }
        );
    });
});

