StartTest(function (t) {

    var scheduler;

    t.beforeEach(function() {
        scheduler && scheduler.destroy();
    });

    t.it('View should not render filtered events', function (t) {
        scheduler = t.getScheduler({
            renderTo : Ext.getBody()
        });

        t.chain(
            { waitForEventsToRender : scheduler },

            function () {
                scheduler.eventStore.filter(function () {
                    return false;
                });
                t.is(scheduler.eventStore.getCount(), 0, 'All events are filtered');
                t.selectorNotExists('.sch-event', 'Events are filtered');

                scheduler.eventStore.clearFilter();

                t.selectorExists('.sch-event', 'Events are no longer filtered');
            }
        );
    });

    t.it('View should not render filtered events (multiassignment)', function (t) {
        var resourceStore = new Sch.data.ResourceStore({
            data    : [{ Id : 'r1', Name : 'Albert' }]
        });

        scheduler     = t.getScheduler({
            renderTo      : Ext.getBody(),
            resourceStore : resourceStore,
            eventStore    : t.getEventStore({
                assignmentStore : new Sch.data.AssignmentStore({
                    data : [{ EventId : 1, ResourceId : 'r1' }]
                }),
                resourceStore   : resourceStore,
                data            : [{ Id : 1, StartDate : new Date(2011, 0, 4), EndDate : new Date(2011, 0, 5) }]
            })
        });

        t.waitForEventsToRender(scheduler, function () {
            scheduler.eventStore.assignmentStore.filter(function () {
                return false;
            });

            t.selectorNotExists('.sch-event', 'Events are filtered');
        });
    });

    t.it('Filter out events while editing', function (t) {

        var scheduler = t.getScheduler({

            eventStore : t.getEventStore({

                filters : [
                    {
                        property: 'Cls',
                        value: 'red',
                        operator:'!='
                    }
                ],

                data : (function () {
                    var events = [];
                    for (var i = 1; i <= 6; i++) {
                        events.push({
                            Id         : i,
                            ResourceId : 'r2',
                            Cls        : 'green',
                            Name       : 'Assignment ' + i,
                            StartDate  : new Date(2011, 0, 3 + i),
                            EndDate    : new Date(2011, 0, 5 + i)
                        });
                    }

                    return events;
                })()

            }),
            renderTo : Ext.getBody()
        });

        t.waitForEventsToRender(scheduler, function () {

            var resourceStore = scheduler.getResourceStore(),
                resource = resourceStore.getById('r2');

            var events = resource.getEvents().slice();

            t.is(events.length, 6, 'Event has 6 items');

            Ext.Array.forEach(events, function (event) {
                event.set('Cls', 'red');
            });

            var updated = 0;

            Ext.Array.forEach(events, function (event) {
                if (event.get('Cls') === 'red') {
                    updated++;
                }
            });

            t.is(updated, 6, '6 items are updated');
            scheduler.destroy();
        });
    });

});