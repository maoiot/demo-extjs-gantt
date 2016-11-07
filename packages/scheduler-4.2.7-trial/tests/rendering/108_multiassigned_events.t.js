/* jshint -W085 */
StartTest(function (t) {

    var monday  = new Date(2015, 2, 16),
        tuesday = new Date(2015, 2, 17),
        eventStore,
        resourceStore,
        assignmentStore;

    t.beforeEach(function () {
        eventStore = new Sch.data.EventStore({
            proxy : 'memory',
            data  : [{
                Id : 1, Name : 'Event 1', StartDate : monday, EndDate : tuesday
            }, {
                Id : 2, Name : 'Event 2', StartDate : monday, EndDate : tuesday
            }]
        });

        resourceStore = new Sch.data.ResourceStore({
            proxy : 'memory',
            data  : [{
                Id : 1, Name : 'Resource 1'
            }, {
                Id : 2, Name : 'Resource 2'
            }]
        });

        assignmentStore = new Sch.data.AssignmentStore({
            proxy : 'memory',
            data  : [{
                Id : 1, EventId : 1, ResourceId : 1
            }, {
                Id : 2, EventId : 1, ResourceId : 2
            }, {
                Id : 3, EventId : 2, ResourceId : 2
            }]
        });

        eventStore.setResourceStore(resourceStore);
        eventStore.setAssignmentStore(assignmentStore);
    })

    t.describe("Testing scheduler events assigned to multiple resources rendering", function (t) {

        t.it("Horizontal orientation mode should support multiassigned events rendering and render several DOM elements for such event", function (t) {
            var sched = new Sch.panel.SchedulerGrid({
                renderTo      : Ext.getBody(),
                eventStore    : eventStore,
                resourceStore : resourceStore,
                startDate     : monday,
                orientation   : 'horizontal', //'horizontal', 'vertical', 'calendar'
                width         : 700,
                height        : 500,
                columns       : [
                    { header : 'Name', sortable : true, width : 100, dataIndex : 'Name' }
                ]
            });

            t.chain(
                { waitFor : 'rowsVisible', args : [sched] },
                function (next) {
                    var view = sched.getSchedulingView(),
                        els  = view.getElementsFromEventRecord(eventStore.getById(1));

                    t.is(els.length, 2, "Two elements are rendered for Event 1");
                    t.elementIsVisible(els[0], "Element 1 is visible");
                    t.elementIsVisible(els[1], "Element 2 is visible");

                    t.is(view.resolveResource(els[0]), resourceStore.getById(1), "Element 1 is rendered for resource 1");
                    t.is(view.resolveResource(els[1]), resourceStore.getById(2), "Element 2 is rendered for resource 2");
                }
            );
        });

        t.it("Vertical orientation mode should support multiassigned events rendering and render several DOM elements for such event", function (t) {
            var sched = new Sch.panel.SchedulerGrid({
                renderTo      : Ext.getBody(),
                eventStore    : eventStore,
                resourceStore : resourceStore,
                startDate     : monday,
                orientation   : 'vertical',
                width         : 700,
                height        : 500,
                columns       : [
                    { header : 'Name', sortable : true, width : 100, dataIndex : 'Name' }
                ]
            });

            t.chain(
                { waitFor : 'rowsVisible', args : [sched] },
                function (next) {
                    var view = sched.getSchedulingView(),
                        els  = view.getElementsFromEventRecord(eventStore.getById(1));

                    t.is(els.length, 2, "Two elements are rendered for Event 1");
                    t.elementIsVisible(els[0], "Element 1 is visible");
                    t.elementIsVisible(els[1], "Element 2 is visible");

                    t.is(view.resolveResource(els[0]), resourceStore.getById(1), "Element 1 is rendered for resource 1");
                    t.is(view.resolveResource(els[1]), resourceStore.getById(2), "Element 2 is rendered for resource 2");
                }
            );
        });

        t.it("Calendar orientation mode should support multiassigned events rendering but should render single DOM element for such event", function (t) {
            var sched = new Sch.panel.SchedulerGrid({
                renderTo      : Ext.getBody(),
                eventStore    : eventStore,
                resourceStore : resourceStore,
                startDate     : monday,
                orientation   : 'calendar',
                width         : 700,
                height        : 500,
                columns       : [
                    { header : 'Name', sortable : true, width : 100, dataIndex : 'Name' }
                ]
            });

            t.chain(
                { waitFor : 'rowsVisible', args : [sched] },
                function (next) {
                    var view = sched.getSchedulingView(),
                        els  = view.getElementsFromEventRecord(eventStore.getById(1));

                    t.is(els.length, 1, "One element is rendered for Event 1");
                    t.elementIsVisible(els[0], "Element 1 is visible");
                }
            );
        });
    });
});
