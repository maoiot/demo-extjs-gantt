/* jshint -W085 */
StartTest(function(t) {

    var monday  = new Date(2015, 2, 16),
        tuesday = new Date(2015, 2, 17);

    function getDataSample() {
        var data = {
            eventStore      : new Sch.data.EventStore({
                proxy : 'memory',
                data  : [{
                    Id : 1, Name : 'Event 1', StartDate : monday, EndDate : tuesday
                }, {
                    Id : 2, Name : 'Event 2', StartDate : monday, EndDate : tuesday
                }]
            }),

            resourceStore   : new Sch.data.ResourceStore({
                proxy : 'memory',
                data  : [{
                    Id : 1, Name : 'Resource 1'
                }, {
                    Id : 2, Name : 'Resource 2'
                }]
            }),

            assignmentStore : new Sch.data.AssignmentStore({
                proxy : 'memory',
                data  : [{
                    Id : 1, EventId : 1, ResourceId : 1
                }, {
                    Id : 2, EventId : 1, ResourceId : 2
                }, {
                    Id : 3, EventId : 2, ResourceId : 2
                }]
            })
        };

        data.eventStore.setResourceStore(data.resourceStore);
        data.eventStore.setAssignmentStore(data.assignmentStore);

        return data;
    }

    function idify(recordset) {
        return Ext.Array.map(recordset, function(r) { return r.getId(); });
    }

    t.describe("Scheduler data model must support events assignment to multiple resources", function(t) {

        t.it("Should properly report resources an event assigned to", function(t) {
            var event1resources,
                event2resources;

            /* global eventStore, resourceStore, assignmentStore */
            with (getDataSample()) {
                event1resources = idify(eventStore.getById(1).getResources());
                event2resources = idify(eventStore.getById(2).getResources());

                t.isDeeply(event1resources, [1, 2], "Event 1 is correctly assigned to multiple resources");
                t.isDeeply(event2resources, [2],    "Event 2 is correctly assigned to single resource");

                t.ok(eventStore.getById(1).isAssignedTo(resourceStore.getById(1)), "Event 1 correctly reports it's assignment to Resource 1");
                t.ok(eventStore.getById(1).isAssignedTo(2), "Event 1 correctly reports it's assignment to Resource 1");
                t.ok(eventStore.isEventAssignedToResource(2, 2), "EventStore correctly reports Event 2 to be assiged to Resource 2");
            }
        });

        t.it("Should properly report events a resource assigned to", function(t) {
            var resource1events,
                resource2events;

            /* global eventStore, resourceStore, assignmentStore */
            with (getDataSample()) {
                resource1events = idify(resourceStore.getById(1).getEvents());
                resource2events = idify(resourceStore.getById(2).getEvents());

                t.isDeeply(resource1events, [1],    "Resource 1 is correctly assigned to single event");
                t.isDeeply(resource2events, [1, 2], "Resource 2 is correctly assigned to multiple events");
            }
        });

        t.it("Should support 'runtime' event assignment/unassignment", function(t) {
            var event2,
                resource1,
                resource2;

            /* global eventStore, resourceStore, assignmentStore */
            with (getDataSample()) {
                event2 = eventStore.getById(2);
                resource1 = resourceStore.getById(1);
                resource2 = resourceStore.getById(2);

                event2.unassign(resource2);
                t.isDeeply(idify(resource2.getEvents()), [1], "Event 2 was correctly unassigned from Resource 2");

                event2.assign(resource1);
                t.isDeeply(idify(resource1.getEvents()), [1, 2], "Event 2 was correcty assigned to Resource 1");
            }
        });

        t.it("Assignment information must be cached", function(t) {
            var event1, event2,
                resource1, resource2,
                getRangeSpy;

            /* global eventStore, resourceStore, assignmentStore */
            with (getDataSample()) {
                event1 = eventStore.getById(1);
                event2 = eventStore.getById(2);
                resource1 = resourceStore.getById(1);
                resource2 = resourceStore.getById(2);

                // Initially caches are empty, asking for assignments for event1, event2, resource1, resource2 will
                // initiate assignments store full scan via store::getRange() method
                getRangeSpy = t.spyOn(assignmentStore, 'getRange').and.callThrough();

                event1.getAssignments();
                event2.getAssignments();
                resource1.getAssignments();
                resource2.getAssignments();

                t.expect(getRangeSpy).toHaveBeenCalled(4);

                // After assignments has been cached call to further getAssignments() as well as calls to
                // event::getResources() and resource.getEvents() and underlying event/assignment store methods
                // should not initiate full assignment store scan
                event1.getAssignments();
                event2.getAssignments();
                resource1.getAssignments();
                resource2.getAssignments();
                event1.getResources();
                event2.getResources();
                resource1.getEvents();
                resource2.getEvents();

                t.expect(getRangeSpy).toHaveBeenCalled(4);
            }
        });
    });
});
