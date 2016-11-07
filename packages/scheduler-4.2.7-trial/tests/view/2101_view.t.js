StartTest(function (t) {
    var scheduler;

    t.beforeEach(function() {
        scheduler && scheduler.destroy();
    })

    t.it('Basic view functionality tests', function (t) {
        scheduler = t.getScheduler({
            normalViewConfig : {
                emptyText : 'empty_schedule'
            },
            height           : 200,
            eventRenderer    : function (event, resource) {
                return resource.getName();
            },
            renderTo         : Ext.getBody(),
            dependencyViewConfig : {
                drawDependencies : false
            }
        });

        t.waitForEventsToRender(scheduler, function () {
            var schedulingView = scheduler.getSchedulingView();

            t.it('Should copy view specific settings from panel to view', function (t) {
                t.expect(schedulingView.cellBorderWidth).toBeGreaterThan(-1);
                t.expect(schedulingView.cellTopBorderWidth).toBeGreaterThan(-1);
                t.expect(schedulingView.cellBottomBorderWidth).toBeGreaterThan(-1);
            });

            t.wontFire(scheduler.lockedGrid.getView(), 'refresh', 'locked view should not refresh after event is added');
            t.wontFire(schedulingView, 'refresh', 'schedule view should not refresh after event is added');

            var newEvent = new Sch.model.Event({
                StartDate  : scheduler.getStart(),
                EndDate    : scheduler.getEnd(),
                ResourceId : scheduler.resourceStore.first().getId()
            });
            scheduler.eventStore.add(newEvent);

            scheduler.resourceStore.first().setName('BLARGH');

            t.contentLike(schedulingView.getElementFromEventRecord(newEvent), 'BLARGH', 'Event row should be refreshed when resource is updated');
        });
    });

    t.it('Basic API tests', function (t) {
        scheduler = t.getScheduler({
            renderTo  : document.body,
            startDate : new Date(2010, 1, 1),
            endDate   : new Date(2010, 5, 1)
        });

        t.chain(
            { waitForRowsVisible : scheduler },

            function (next) {
                var view = scheduler.getSchedulingView();

                t.expect(view.getCoordinateFromDate(new Date(2010, 1, 1))).toBe(0);
                t.expect(view.getCoordinateFromDate(new Date(2010, 0, 1))).toBe(-1);
                t.expect(view.getCoordinateFromDate(new Date(2020, 0, 1))).toBe(-1);

                t.is(view.resolveResource(scheduler.getEl().down('.sch-timetd', true)), scheduler.resourceStore.first(), 'resolveResource horizontal');

                scheduler.setOrientation('vertical');
                next();
            },

            { waitForRowsVisible : scheduler },

            function (next) {
                var view = scheduler.getSchedulingView();

                t.is(view.resolveResource(scheduler.getEl().down('.sch-timetd', true)), scheduler.resourceStore.first(), 'resolveResource vertical');
            }
        )
    });

    t.it('Should not be allowed to move resource columns in vertical view', function (t) {
        scheduler = t.getScheduler({
            renderTo    : document.body,
            orientation : 'vertical'
        });

        t.wontFire(scheduler, 'columnmove');

        t.chain(
            { waitFor : 'rowsVisible', args : scheduler },

            { drag : '.sch-resourcecolumn-header', by : [100, 0] }
        )
    });

    t.it('Should not change vertical scroll on event selection', function (t) {
        var scheduler = t.getScheduler({
            mode        : 'vertical',
            width       : 600,
            renderTo    : Ext.getBody(),
            startDate   : new Date(2014, 4, 26),
            eventStore  : t.getEventStore({
                data    : [{
                    Id          : 1,
                    StartDate   : new Date(2014, 4, 27),
                    EndDate     : new Date(2014, 4, 28),
                    ResourceId  : 'r1'
                }]
            })
        });

        var view = scheduler.getSchedulingView();

        t.chain(
            { waitForEventsToRender : scheduler },

            function (next) {
                t.scrollVerticallyTo(view.el, 30, next);
            },

            { click : '.sch-event' },

            function (next) {
                t.is(view.el.getScroll().top, 30, 'Vertical scroll is correct');
            }
        );
    });

    t.it('Should fire "eventrepaint" when an event gets updated in the DOM, should fire once for a single event', function (t) {
        scheduler = new Sch.panel.SchedulerGrid({
            renderTo    : document.body,
            orientation : 'horizontal',
            height      : 100,
            startDate   : new Date(2010, 1, 1),
            endDate     : new Date(2010, 1, 3),

            resourceStore : new Sch.data.ResourceStore({
                data : [
                    { Id : 1 },
                    { Id : 2 }
                ]
            }),

            eventStore : new Sch.data.EventStore(),

            dependencyViewConfig : {
                drawDependencies : false
            }
        });

        var view = scheduler.getSchedulingView();
        var fn = function() {};

        t.chain(
            // view.refresh will render nodes into invisibile locked grid
            // view.refreshView will not do that, so wait for selector instead
            { waitForRowsVisible : scheduler.normalGrid },

            function () {

                t.diag('should fire once for a single event');
                scheduler.eventStore.loadData([
                    { ResourceId : 1, StartDate : new Date(2010, 1, 1), EndDate : new Date(2010, 1, 2) },
                    { ResourceId : 2, StartDate : new Date(2010, 1, 1), EndDate : new Date(2010, 1, 2) }
                ]);

                t.firesOnce(view, 'eventrepaint');

                view.on('eventrepaint', fn);

                scheduler.eventStore.first().setName('Foo');

                view.un('eventrepaint', fn);
            }
        )
    });

    t.it('Should fire "eventrepaint" when an event gets updated in the DOM, should not fire if noone is listening', function (t) {
        scheduler = new Sch.panel.SchedulerGrid({
            renderTo    : document.body,
            orientation : 'horizontal',
            height      : 100,
            startDate   : new Date(2010, 1, 1),
            endDate     : new Date(2010, 1, 3),

            resourceStore : new Sch.data.ResourceStore({
                data : [
                    { Id : 1 },
                    { Id : 2 }
                ]
            }),

            eventStore : new Sch.data.EventStore(),

            dependencyViewConfig : {
                drawDependencies : false
            }
        });

        var view = scheduler.getSchedulingView();
        var fn = function() {};

        t.chain(
            // view.refresh will render nodes into invisibile locked grid
            // view.refreshView will not do that, so wait for selector instead
            { waitForRowsVisible : scheduler.normalGrid },

            function () {

                var old = view.fireEvent;
                var didFire;

                view.fireEvent = function(name) {
                    old.apply(this, arguments);
                    if (name === 'eventrepaint') didFire = true;
                };

                scheduler.eventStore.loadData([
                    { ResourceId : 1, StartDate : new Date(2010, 1, 1), EndDate : new Date(2010, 1, 2) }
                ]);

                scheduler.eventStore.first().setName('Foo');

                t.notOk(didFire);

                view.fireEvent = old;
            }
        )
    });

    t.it('Should fire "eventrepaint" when an event gets updated in the DOM, should fire once for every event in a row', function (t) {
        scheduler = new Sch.panel.SchedulerGrid({
            renderTo    : document.body,
            orientation : 'horizontal',
            height      : 100,
            startDate   : new Date(2010, 1, 1),
            endDate     : new Date(2010, 1, 3),

            resourceStore : new Sch.data.ResourceStore({
                data : [
                    { Id : 1 },
                    { Id : 2 }
                ]
            }),

            eventStore : new Sch.data.EventStore(),

            dependencyViewConfig : {
                drawDependencies : false
            }
        });

        var view = scheduler.getSchedulingView();
        var fn = function() {};

        t.chain(
            // view.refresh will render nodes into invisibile locked grid
            // view.refreshView will not do that, so wait for selector instead
            { waitForRowsVisible : scheduler.normalGrid },

            function () {
                scheduler.eventStore.loadData([
                    { ResourceId : 1, StartDate : new Date(2010, 1, 1), EndDate : new Date(2010, 1, 2) },
                    { ResourceId : 1, StartDate : new Date(2010, 1, 1), EndDate : new Date(2010, 1, 2) },
                    { ResourceId : 1, StartDate : new Date(2010, 1, 1), EndDate : new Date(2010, 1, 2) }
                ]);

                // This adds a listener to the view which makes it fire the "eventrepaint" event
                t.willFireNTimes(view, 'eventrepaint', 3);

                view.refreshNode(0);
            }
        )
    });


    // https://www.assembla.com/spaces/bryntum/tickets/1827-investigate-locked-grid-view-ondatarefresh-unnecessary-call/details#
    t.it('Should refresh views once when data changes', function (t) {
        scheduler = t.getScheduler({
            renderTo : document.body
        });

        t.chain(
            { waitForRowsVisible : scheduler },

            function (next) {
                t.firesOnce(scheduler.lockedGrid.view, 'refresh');
                t.firesOnce(scheduler.normalGrid.view, 'refresh');
                scheduler.store.sort('Id', 'DESC');

                Ext.destroy(scheduler);
            }
        );
    });

    t.it('View should not refresh twice during crud manager load', function (t) {
        var cm = new Sch.data.CrudManager({
            resourceStore   : new Sch.data.ResourceStore(),
            eventStore      : new Sch.data.EventStore(),
            autoLoad        : true,
            transport       : {
                load : {
                    url : 'view/2101_data.json'
                }
            }
        });

        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            eventStore  : null,
            resourceStore : null,
            startDate   : new Date(2010, 0, 1),
            endDate     : new Date(2010, 0, 10),
            crudManager : cm
        });

        t.chain(
            { waitForEventsToRender : scheduler },

            function (next) {
                t.firesOnce(scheduler.lockedGrid.getView(), 'refresh');
                t.firesOnce(scheduler.getSchedulingView(), 'refresh');

                cm.load();

                t.waitForEvent(scheduler.getSchedulingView(), 'refresh', next)
            }
        )
    });
});

