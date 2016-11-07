StartTest(function (t) {

    var resourceStore,
        resourceUtilizationStore,
        resourceUtilizationEventStore,
        panel,
        view;

    t.beforeEach(function () {
        panel && panel.destroy();

        resourceStore = new Gnt.data.ResourceStore({
            data : [
                { Id : 1, Name : 'Mike' },
                { Id : 2, Name : 'Dan' }
            ]
        });

        var taskStore = new Gnt.data.TaskStore({
            resourceStore : resourceStore,
            root          : {
                children : [
                    {
                        Id        : 1,
                        Name      : 'Task 1',
                        StartDate : new Date(2015, 0, 5),
                        Duration  : 3
                    },
                    {
                        Id        : 2,
                        Name      : 'Task 2',
                        StartDate : new Date(2015, 0, 5),
                        Duration  : 5
                    },
                    {
                        Id        : 3,
                        Name      : 'Task 3',
                        StartDate : new Date(2015, 0, 5),
                        Duration  : 3
                    },
                    {
                        Id        : 4,
                        Name      : 'Task 4',
                        StartDate : new Date(2015, 0, 5),
                        Duration  : 5
                    }
                ]
            }
        });

        taskStore.getNodeById(1).assign(resourceStore.getById(1), 50);
        taskStore.getNodeById(2).assign(resourceStore.getById(1), 50);
        taskStore.getNodeById(3).assign(resourceStore.getById(2));
        taskStore.getNodeById(4).assign(resourceStore.getById(2));

        panel = new Gnt.panel.ResourceUtilization({
            renderTo         : document.body,
            height           : 300,
            width            : 800,
            decimalPrecision : 2,
            viewPreset       : 'weekAndDayLetter',
            startDate        : new Date(2015, 0, 5),
            endDate          : new Date(2015, 0, 19),
            taskStore        : taskStore
        });

        view = panel.getSchedulingView();

        panel.expandAll();

        resourceUtilizationStore      = panel.getStore();
        resourceUtilizationEventStore = resourceUtilizationStore.getEventStore();
    })

    var verifyInterval = function (t, resourceOrAssignment, startDate, amountHrs) {
        var utilizationEvent = resourceUtilizationEventStore.getModelByOriginal(resourceOrAssignment),
            info             = utilizationEvent && utilizationEvent.getUtilizationInfoForInterval(startDate),
            elem,
            value;

        if (resourceOrAssignment.getEvents && resourceOrAssignment.getEvents().length === 0) {
            t.notOk(info, 'Should find no utilization info for unassigned resource');
        } else {
            t.ok(info.isUtilized, 'We have interval for ' + utilizationEvent.getOriginalResource().getName());

            if (amountHrs !== undefined) {

                t.is(info.allocationMs, amountHrs * 3600000, 'Amount ' + amountHrs + ' ok');

                elem  = view.getElementFromEventRecord(utilizationEvent);
                value = (amountHrs === 0) ? '' : amountHrs;

                t.is(
                    Ext.dom.Query.selectNumber('div[@data-utilization-interval-start=' + startDate.getTime() + ']', elem.dom),
                    value,
                    'Amount ' + amountHrs + ' rendered ok'
                );
            }
        }
    }

    t.it('Sanity checks', function (t) {

        var mike = resourceStore.getById(1);
        var dan  = resourceStore.getById(2);

        t.chain(
            { waitForRowsVisible : panel },

            function () {

                verifyInterval(t, mike, new Date(2015, 0, 5), 24);
                verifyInterval(t, mike, new Date(2015, 0, 6), 24);
                verifyInterval(t, mike, new Date(2015, 0, 7), 24);
                verifyInterval(t, mike, new Date(2015, 0, 8), 12);
                verifyInterval(t, mike, new Date(2015, 0, 9), 12);

                verifyInterval(t, dan, new Date(2015, 0, 5), 48);
                verifyInterval(t, dan, new Date(2015, 0, 6), 48);
                verifyInterval(t, dan, new Date(2015, 0, 7), 48);
                verifyInterval(t, dan, new Date(2015, 0, 8), 24);
                verifyInterval(t, dan, new Date(2015, 0, 9), 24);
            }
        )
    });

    t.it('Refresh on assigment CRUD', function (t) {

        var mike = resourceStore.getById(1);

        var assignmentStore = resourceStore.getAssignmentStore();
        var assignment      = assignmentStore.queryBy(function (ass) {
            return ass.data.ResourceId == 1 && ass.data.TaskId == 1;
        }).first();

        t.chain(
            { waitForRowsVisible : panel },

            function (next) {
                assignment.setUnits(100);
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {

                verifyInterval(t, mike, new Date(2015, 0, 5), 36);
                verifyInterval(t, mike, new Date(2015, 0, 6), 36);
                verifyInterval(t, mike, new Date(2015, 0, 7), 36);

                verifyInterval(t, assignment, new Date(2015, 0, 5), 24);
                verifyInterval(t, assignment, new Date(2015, 0, 6), 24);
                verifyInterval(t, assignment, new Date(2015, 0, 7), 24);

                next();
            },

            function (next) {
                assignmentStore.remove(assignment);
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                verifyInterval(t, mike, new Date(2015, 0, 5), 12);
                verifyInterval(t, mike, new Date(2015, 0, 6), 12);
                verifyInterval(t, mike, new Date(2015, 0, 7), 12);

                t.notOk(resourceUtilizationStore.getModelByOriginal(assignment), 'Should not find Task 1 assignment under Mike anymore');

                next();
            },

            function (next) {
                assignmentStore.add(assignment);
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },
            // Waiting for corresponding event to be rendered, since resource utilization panel uses buffered renderer
            {
                waitForFn : function () {
                    var event = resourceUtilizationEventStore.getModelByOriginal(assignment);
                    return !!view.getElementFromEventRecord(event);
                }
            },

            function (next) {
                t.ok(resourceUtilizationStore.getModelByOriginal(assignment), 'Should find Task 1 added as a child to Mike');

                verifyInterval(t, mike, new Date(2015, 0, 5), 36);
                verifyInterval(t, mike, new Date(2015, 0, 6), 36);
                verifyInterval(t, mike, new Date(2015, 0, 7), 36);

                verifyInterval(t, assignment, new Date(2015, 0, 5), 24);
                verifyInterval(t, assignment, new Date(2015, 0, 6), 24);
                verifyInterval(t, assignment, new Date(2015, 0, 7), 24);
            }
        )
    });

    t.it('Refresh on resource store CRUD', function (t) {

        var new1, new2;

        t.chain(
            { waitForRowsVisible : panel },

            function (next) {
                resourceStore.removeAll();
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                t.is(resourceUtilizationStore.getCount(), 0, 'Empty resource store');
                t.is(resourceUtilizationEventStore.getCount(), 0, 'Empty event store');

                new1 = resourceStore.add({
                    Name : 'New',
                    Id   : 5
                })[0];

                new2 = resourceStore.add({
                    Name : 'New 2',
                    Id   : 6
                })[0];

                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                t.is(resourceUtilizationStore.getCount(), 2);
                // Surrogate resources has just summary tasks assigned
                t.is(resourceUtilizationStore.getModelByOriginal(new1).getEvents().length, 1, 'New resource 1 has exactly one event - summary event');
                t.is(resourceUtilizationStore.getModelByOriginal(new2).getEvents().length, 1, 'New resource 2 has exactly one event - summary event');
                next();
            },

            function (next) {
                resourceStore.remove(new2);
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {

                t.is(resourceUtilizationStore.getCount(), 1, 'Resource utilization store only one resource left');
                t.is(resourceUtilizationStore.getModelByOriginal(new1).getEvents().length, 0, 'Unassigned resource should have no summary event');
                next();
            },

            function (next) {
                new1.setName('Foo');
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                t.is(resourceUtilizationStore.getModelByOriginal(new1).getName(), 'Foo', 'Resource name in resource utilization store has been updated accordingly to resource store');
            }
        );
    });

    t.it('Refresh on TaskStore CRUD', function (t) {

        var mike            = resourceStore.getById(1);
        var dan             = resourceStore.getById(2);
        var taskStore       = resourceStore.getTaskStore();
        var task1           = taskStore.getModelById(1);
        var assignmentStore = taskStore.getAssignmentStore();
        var mikeAssignment1 = assignmentStore.getAssignmentForEventAndResource(task1, mike);

        t.chain(
            { waitForRowsVisible : panel },

            function (next) {
                task1.setName('Foo');
                task1.setStartDate(new Date(2015, 0, 6));
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                t.is(
                    resourceUtilizationStore.queryBy(function (surrogate) {
                        return surrogate.getTaskName() == 'Foo';
                    }).getCount(),
                    1,
                    '1 task updated'
                );

                verifyInterval(t, mike, new Date(2015, 0, 5), 12);
                verifyInterval(t, mike, new Date(2015, 0, 6), 24);
                verifyInterval(t, mike, new Date(2015, 0, 7), 24);
                verifyInterval(t, mike, new Date(2015, 0, 8), 24);
                verifyInterval(t, mike, new Date(2015, 0, 9), 12);

                verifyInterval(t, mikeAssignment1, new Date(2015, 0, 6), 12);
                verifyInterval(t, mikeAssignment1, new Date(2015, 0, 7), 12);
                verifyInterval(t, mikeAssignment1, new Date(2015, 0, 8), 12);

                next();
            },

            function (next) {
                task1.remove();
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                t.is(
                    resourceUtilizationStore.queryBy(function (surrogate) {
                        return surrogate.getTaskName() == 'Foo';
                    }).getCount(),
                    0,
                    'Task 1 not in the tree anymore'
                );
            }
        );
    });

    t.it('Refresh on task, resource and project calendar CRUD', function (t) {

        // 4hrs a day
        var mikeCal = new Gnt.data.Calendar({
            calendarId          : 'mikeCal',
            defaultAvailability : ['08:00-12:00']
        });

        // 2hrs a day
        var taskCal = new Gnt.data.Calendar({
            calendarId          : 'taskCal',
            defaultAvailability : ['14:00-16:00']
        });

        var taskStore           = resourceStore.getTaskStore(),
            assignmentStore     = taskStore.getAssignmentStore(),
            projectCalendar     = taskStore.getCalendar(),
            mike                = resourceStore.getModelById(1),
            dan                 = resourceStore.getModelById(2),
            task1               = taskStore.getModelById(1),
            task2               = taskStore.getModelById(2),
            task3               = taskStore.getModelById(3),
            task4               = taskStore.getModelById(4),
            mikeTask1Assignment = assignmentStore.getAssignmentForEventAndResource(task1, mike),
            mikeTask2Assignment = assignmentStore.getAssignmentForEventAndResource(task2, mike),
            danTask3Assignment  = assignmentStore.getAssignmentForEventAndResource(task3, dan),
            danTask4Assignment  = assignmentStore.getAssignmentForEventAndResource(task4, dan),
            day;

        panel.setNumberFormat('0.0');

        t.chain(
            { waitForRowsVisible : panel },

            function (next) {
                mike.setCalendar(mikeCal);
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },
            /*
             { waitForEvent : [ view, 'refresh' ] }
             { waitForFn : function() {
             var event = resourceUtilizationEventStore.getModelByOriginal(assignment);
             return !!view.getElementFromEventRecord(event);
             }},
             */

            function (next) {
                verifyInterval(t, mike, new Date(2015, 0, 5), 4);
                verifyInterval(t, mikeTask1Assignment, new Date(2015, 0, 5), 2);
                next();
            },

            function (next) {
                t.diag('Add a day to mikeCal');

                day = mikeCal.add({
                    Date         : new Date(2015, 0, 5),
                    Availability : ['08:00-12:00', '13:00-16:00']
                });

                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                verifyInterval(t, mike, new Date(2015, 0, 5), 7);
                verifyInterval(t, mikeTask1Assignment, new Date(2015, 0, 5), 3.5);
                next();
            },

            function (next) {
                dan.setCalendar(mikeCal);
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                verifyInterval(t, dan, new Date(2015, 0, 5), 14);
                verifyInterval(t, danTask3Assignment, new Date(2015, 0, 5), 7);
                next();
            },

            function (next) {
                t.diag('Remove the day from mikeCal');
                mikeCal.remove(day);
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                verifyInterval(t, mike, new Date(2015, 0, 5), 4);
                verifyInterval(t, mikeTask1Assignment, new Date(2015, 0, 5), 2);
                verifyInterval(t, dan, new Date(2015, 0, 5), 8);
                verifyInterval(t, danTask3Assignment, new Date(2015, 0, 5), 4);
                next();
            },

            function (next) {
                t.diag('Reset Dan\'s calendar field');
                dan.setCalendar(null);
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                verifyInterval(t, dan, new Date(2015, 0, 5), 48);
                verifyInterval(t, danTask3Assignment, new Date(2015, 0, 5), 24);
                next();
            },

            function (next) {
                t.diag('Reset Mike\'s calendar field');
                mike.setCalendar(null);
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                verifyInterval(t, mike, new Date(2015, 0, 5), 24);
                verifyInterval(t, mikeTask2Assignment, new Date(2015, 0, 5), 12);
                next();
            },

            function (next) {
                t.diag('Add a day to the project calendar');
                projectCalendar.add(day);
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                verifyInterval(t, dan, new Date(2015, 0, 5), 14);
                verifyInterval(t, danTask3Assignment, new Date(2015, 0, 5), 7);
                next();
            },

            function (next) {
                t.diag('Remove the day from the project calendar');
                projectCalendar.remove(day);
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                verifyInterval(t, dan, new Date(2015, 0, 5), 48);
                verifyInterval(t, danTask3Assignment, new Date(2015, 0, 5), 24);
                next();
            },

            function (next) {
                t.diag('Set task #3 calendar'); // 2hrs a day
                task3.setCalendar(taskCal);
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                verifyInterval(t, dan, new Date(2015, 0, 5), 26);
                verifyInterval(t, danTask3Assignment, new Date(2015, 0, 5), 2);
                next();
            },

            function (next) {
                t.diag('Add a day to task #3 calendar');
                day = taskCal.add({
                    Date         : new Date(2015, 0, 5),
                    IsWorkingDay : true,
                    Availability : ['08:00-12:00', '13:00-16:00']
                });
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                verifyInterval(t, dan, new Date(2015, 0, 5), 31);
                verifyInterval(t, danTask3Assignment, new Date(2015, 0, 5), 7);
                next();
            },

            function (next) {
                t.diag('Remove the day from task #3 calendar');
                taskCal.remove(day);
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                verifyInterval(t, dan, new Date(2015, 0, 5), 26);
                verifyInterval(t, danTask3Assignment, new Date(2015, 0, 5), 2);
                next();
            },

            function (next) {
                t.diag('Reset task #3 calendar field');
                task3.setCalendar(null);
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                verifyInterval(t, dan, new Date(2015, 0, 5), 48);
                verifyInterval(t, danTask3Assignment, new Date(2015, 0, 5), 24);
            }
        );
    });

    t.it('Refresh on timeAxis traversal', function (t) {

        var taskStore           = resourceStore.getTaskStore(),
            assignmentStore     = taskStore.getAssignmentStore(),
            mike                = resourceStore.getModelById(1),
            task1               = taskStore.getModelById(1),
            mikeTask1Assignment = assignmentStore.getAssignmentForEventAndResource(task1, mike);

        t.chain(
            { waitForRowsVisible : panel },

            function (next) {
                panel.shiftPrevious();
                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            function (next) {
                verifyInterval(t, mike, new Date(2015, 0, 5), 24);
                verifyInterval(t, mike, new Date(2015, 0, 6), 24);
                verifyInterval(t, mike, new Date(2015, 0, 7), 24);
                verifyInterval(t, mike, new Date(2015, 0, 8), 12);
                verifyInterval(t, mike, new Date(2015, 0, 9), 12);

                verifyInterval(t, mikeTask1Assignment, new Date(2015, 0, 5), 12);
                verifyInterval(t, mikeTask1Assignment, new Date(2015, 0, 6), 12);
                verifyInterval(t, mikeTask1Assignment, new Date(2015, 0, 7), 12);
            }
        );
    });

    t.it('Verify CSS classes', function (t) {
        t.waitForRowsVisible(panel, function () {
            t.selectorExists('.gnt-resource-utilization-interval:contains(48).gnt-resource-utilization-interval-overallocated', '48 hours is more than 24');
            t.selectorExists('.gnt-resource-utilization-interval:contains(24).gnt-resource-utilization-interval-optimallyallocated', '24 hours is optimal');
            t.selectorExists('.gnt-resource-utilization-interval:contains(12).gnt-resource-utilization-interval-underallocated', '12 hours is suboptimal');
            // TODO: implement and check of undertermined state, assignment cells should be undetermined in terms of allocation
        });
    });

    t.it('Fires events', function (t) {

        t.willFireNTimes(panel, 'eventclick', 1)

        t.chain(
            { click : '.sch-event' }
        );
    });

    t.it('Refresh row if all assignments for a resource are removed', function (t) {

        var taskStore       = resourceStore.getTaskStore(),
            assignmentStore = taskStore.getAssignmentStore(),
            mike            = resourceStore.getModelById(1)

        t.chain(
            { waitForRowsVisible : panel },

            function (next) {

                assignmentStore.removeAssignmentsForResource(mike);

                next();
            },

            { waitForEvent : [resourceUtilizationStore, 'sync-complete'] },

            { waitForSelectorNotFound : '.x-grid-item[data-recordindex="3"] .gnt-resource-utilization-interval' },

            function (next) {
                verifyInterval(t, mike, new Date(2015, 0, 5), 0);
                verifyInterval(t, mike, new Date(2015, 0, 6), 0);
                verifyInterval(t, mike, new Date(2015, 0, 7), 0);
                verifyInterval(t, mike, new Date(2015, 0, 8), 0);
                verifyInterval(t, mike, new Date(2015, 0, 9), 0);
            }
        );
    });
});
