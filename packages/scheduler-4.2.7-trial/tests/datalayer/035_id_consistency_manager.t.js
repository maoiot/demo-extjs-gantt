/* jshint -W085 */
StartTest(function(t) {

    function createDataLayerWithoutAssignments() {
        var resourceStore,
            eventStore;

        resourceStore = new Sch.data.ResourceStore({
            data : [
                { Name : "Resource 1" },
                { Name : "Resource 2" }
            ]
        });

        eventStore = new Sch.data.EventStore({
            resourceStore : resourceStore,
            data : [
                { Name : "Event 1" },
                { Name : "Event 2" }
            ]
        });

        eventStore.getAt(0).assign(resourceStore.getAt(0));
        eventStore.getAt(1).assign(resourceStore.getAt(1));

        return {
            eventStore    : eventStore,
            resourceStore : resourceStore
        };
    }

    function createDataLayerWithAssignments() {
        var resourceStore,
            eventStore,
            assignmentStore;

        assignmentStore = new Sch.data.AssignmentStore();

        resourceStore = new Sch.data.ResourceStore({
            data : [
                { Name : "Resource 1" },
                { Name : "Resource 2" }
            ]
        });

        eventStore = new Sch.data.EventStore({
            resourceStore   : resourceStore,
            assignmentStore : assignmentStore,
            data : [
                { Name : "Event 1" },
                { Name : "Event 2" }
            ]
        });

        eventStore.getAt(0).assign(resourceStore.getAt(0));
        eventStore.getAt(1).assign(resourceStore.getAt(1));

        return {
            eventStore      : eventStore,
            resourceStore   : resourceStore,
            assignmentStore : assignmentStore
        };
    }

    t.describe("Id consistency manager should update model records referential fields with updated record ids", function(t) {

        t.it("Should update event resource ids on an event store if it works without assignment store and resource ids are changed", function(t) {
            /* global eventStore, resourceStore */
            with (createDataLayerWithoutAssignments()) {
                var event1, resource1,
                    event2, resource2;

                event1 = eventStore.getAt(0);
                event2 = eventStore.getAt(1);
                resource1 = resourceStore.getAt(0);
                resource2 = resourceStore.getAt(1);

                t.ok(event1.getResourceId() == resource1.getId(), "Event1 is assigned to Resource1");
                t.ok(event2.getResourceId() == resource2.getId(), "Event2 is assigned to Resource2");

                resource1.setId(1);
                resource2.setId(2);

                t.ok(event1.getResourceId() == resource1.getId(), "Event1 is still assigned to Resource1");
                t.ok(event2.getResourceId() == resource2.getId(), "Event2 is still assigned to Resource2");
            }
        });

        t.it("Should update assignment event ids on an assignment store if event ids are changed and should update resource ids on assignment store if resource ids are changed", function(t) {
            /* global eventStore, resourceStore, assignmentStore */
            with (createDataLayerWithAssignments()) {
                var event1, resource1,
                    event2, resource2,
                    assignment1, assignment2;

                event1 = eventStore.getAt(0);
                event2 = eventStore.getAt(1);
                resource1 = resourceStore.getAt(0);
                resource2 = resourceStore.getAt(1);
                assignment1 = assignmentStore.getAt(0);
                assignment2 = assignmentStore.getAt(1);

                t.ok(
                    assignment1.getEventId()    == event1.getId() &&
                    assignment1.getResourceId() == resource1.getId(),
                    "Event1 is assigned to Resource1"
                );
                t.ok(
                    assignment2.getEventId()    == event2.getId() &&
                    assignment2.getResourceId() == resource2.getId(),
                    "Event2 is assigned to Resource2"
                );

                event1.setId(1);
                event2.setId(2);

                t.ok(
                    assignment1.getEventId()    == event1.getId() &&
                    assignment1.getResourceId() == resource1.getId(),
                    "Event1 is still assigned to Resource1 after Event1 id has been changed"
                );
                t.ok(
                    assignment2.getEventId()    == event2.getId() &&
                    assignment2.getResourceId() == resource2.getId(),
                    "Event2 is still assigned to Resource2 after Event2 id has been changed"
                );

                resource1.setId(1);
                resource2.setId(2);

                t.ok(
                    assignment1.getEventId()    == event1.getId() &&
                    assignment1.getResourceId() == resource1.getId(),
                    "Event1 is still assigned to Resource1 after Resource1 id has been changed"
                );
                t.ok(
                    assignment2.getEventId()    == event2.getId() &&
                    assignment2.getResourceId() == resource2.getId(),
                    "Event2 is still assigned to Resource2 after Resource2 id has been changed"
                );
            }
        });
    });
});
