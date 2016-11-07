StartTest(function (t) {
    var gantt, plugin, i, original, copy;

    var setup = function (config) {
        gantt && gantt.destroy();

        plugin = new Gnt.plugin.Clipboard(Ext.apply({
            // ext clipboard implementation relies on system clipboard inserting invisible element
            // it cannot be tested in siesta, so we apply specific settings
            // this is format of data to be stored in memory - 'shared' property of clipboard class prototype
            memory : 'raw',
            // this is format to be pasted from clipboard. default value 'system' will be preferrable to any other
            // behavior, we need to disable it
            source : 'raw'
        }, config.plugin));

        gantt = t.getGantt(Ext.apply({
            renderTo  : Ext.getBody(),
            plugins   : [plugin],
            taskStore : t.getTaskStore({
                data : [
                    {
                        BaselineEndDate   : '2010-02-01',
                        Id                : 1,
                        leaf              : true,
                        Name              : 'Task 1',
                        Resizable         : false,
                        PercentDone       : 50,
                        StartDate         : '2010-01-18',
                        BaselineStartDate : '2010-01-25',
                        Duration          : 10,
                        ConstraintDate    : '2010-01-18',
                        ConstraintType    : 'startnoearlierthan',
                        CalendarId        : 'testcal',
                        Note              : 'Should be copied',
                        // this field wouldn't be copied because respective column lacks dataIndex
                        //ManuallyScheduled   : true,
                        SchedulingMode    : 'FixedDuration',
                        Rollup            : true
                        // checkboxes are not copied by clipboard I guess we shouldn't do that either
                        //ShowInTimeline      : true
                    },
                    {
                        Id        : 2,
                        Name      : 'Task 2',
                        StartDate : '2010-01-20',
                        Duration  : 10,
                        leaf      : true
                    }
                ]
            }),
            selModel  : 'spreadsheet'
        }, config.gantt));
    };

    t.it('Should copy/paste in raw format', function (t) {

        new Gnt.data.Calendar({
            calendarId : 'testcal'
        });

        setup({
            gantt : {
                columns          : t.getAllColumns({ width : 100 }),
                lockedGridConfig : {
                    width : 900
                }
            }
        });

        var lockedGrid = gantt.lockedGrid;

        t.chain(
            { waitForEventsToRender : gantt },
            function (next) {
                gantt.selModel.selectCells([0, 0], [lockedGrid.getHeaderContainer().getColumnCount(), 0]);
                next();
            },
            function (next) {
                t.type(gantt.lockedGrid.view.el, 'c', next, null, { ctrlKey : true });
            },

            { paste : [1, 1] },

            function () {
                var origin = gantt.taskStore.getById(1);
                var clone  = gantt.taskStore.getById(2);

                for (i = 0; i < origin.customizableFields.length; i++) {
                    var field = origin.customizableFields[i];

                    if (field.name === 'index') continue;

                    var originalValue = origin['get' + Ext.String.capitalize(field.name)]();
                    var cloneValue    = clone['get' + Ext.String.capitalize(field.name)]();

                    t.is(cloneValue, originalValue, 'Correct value set to ' + field.name + ' field');
                }
            }
        )
    });

    t.it('Should cut/paste in raw format', function (t) {
        setup({
            gantt : {
                columns          : t.getAllColumns({ width : 100 }),
                lockedGridConfig : {
                    width : 900
                }
            }
        });

        var lockedGrid = gantt.lockedGrid;
        var data       = [];

        t.chain(
            { waitForEventsToRender : gantt },
            function (next) {
                gantt.selModel.selectCells([0, 0], [lockedGrid.getHeaderContainer().getColumnCount(), 0]);

                var record = gantt.taskStore.getById(1);

                for (i = 0; i < record.customizableFields.length; i++) {
                    var field = record.customizableFields[i];

                    if (field.name === 'index') continue;

                    data.push(record['get' + Ext.String.capitalize(field.name)]());
                }

                next();
            },
            function (next) {
                t.type(gantt.lockedGrid.view.el, 'x', next, null, { ctrlKey : true });
            },
            { paste : [1, 1] },

            function () {
                var origin = gantt.taskStore.getById(1);
                var clone  = gantt.taskStore.getById(2);

                var fields = origin.getFields();

                for (i = 0; i < fields.length && fields[i].isCustomizableFields; i++) {
                    var field  = fields[i];
                    var getter = 'get' + Ext.String.capitalize(field.name);

                    if (field.name === 'index') continue;

                    var originalValue = data.shift();
                    var cloneValue    = clone[getter]();

                    t.is(origin.data[field.name], fields.allowNull ? null : (field.getDefaultValue() || ''), 'Correct value after cut');
                    t.is(cloneValue, originalValue, 'Correct value set to ' + field.name + ' field');
                }
            }
        )
    });

    t.it('Should copy/paste skipping ignoreExport columns', function (t) {
        setup({
            gantt : {
                columns   : [
                    { xtype : 'namecolumn', ignoreExport : true },
                    { xtype : 'startdatecolumn' },
                    { xtype : 'percentdonecolumn', ignoreExport : true },
                    { xtype : 'enddatecolumn' },
                    { xtype : 'durationcolumn' }
                ],
                taskStore : t.getTaskStore({
                    DATA : [
                        {
                            Id          : 1,
                            Name        : 'Task 1',
                            StartDate   : '2010-01-05',
                            EndDate     : '2010-01-06',
                            PercentDone : 45,
                            leaf        : true
                        },
                        { Id : 2, leaf : true }
                    ]
                })
            }
        });

        t.chain(
            { waitForEventsToRender : gantt },

            { copy : [0, 1, 0, 5] },
            { paste : [1, 0] },

            function () {
                var task1 = gantt.taskStore.getById(1),
                    task2 = gantt.taskStore.getById(2);

                t.is(task2.getName(), '', 'Name was ignored');
                t.is(task2.getStartDate(), task1.getStartDate(), 'Start date copied');
                t.is(task2.getEndDate(), new Date(2010, 0, 6), 'End date calculated as a result of copying duration');
                t.is(task2.getPercentDone(), 0, 'Percent done not copied');
                t.is(task2.getDuration(), task1.getDuration(), 'Duration copied');
            }
        )
    });

    t.it('Copy/paste should handle empty values correctly', function (t) {
        setup({
            gantt : {
                columns          : t.getAllColumns({ width : 100 }),
                lockedGridConfig : {
                    width : 900
                }
            }
        });

        var lockedGrid = gantt.lockedGrid;

        t.chain(
            { waitForEventsToRender : gantt },
            function (next) {
                gantt.selModel.selectCells([0, 1], [lockedGrid.getHeaderContainer().getColumnCount(), 1]);
                next();
            },
            function (next) {
                t.type(gantt.lockedGrid.view.el, 'c', next, null, { ctrlKey : true });
            },
            { paste : [0, 1] },
            function () {
                var origin = gantt.taskStore.getById(2);
                var clone  = gantt.taskStore.getById(1);

                for (i = 0; i < origin.customizableFields.length; i++) {
                    var field = origin.customizableFields[i];

                    if (field.name === 'index') continue;

                    var originalValue = origin['get' + Ext.String.capitalize(field.name)]();
                    var cloneValue    = clone['get' + Ext.String.capitalize(field.name)]();

                    t.is(cloneValue, originalValue, 'Correct value set to ' + field.name + ' field');
                }
            }
        )
    });

    t.it('Should call field validator on paste', function (t) {
        setup({
            gantt : {
                columns : [
                    { xtype : 'startdatecolumn' },
                    { xtype : 'enddatecolumn' },
                    { xtype : 'durationcolumn' },
                    { xtype : 'constrainttypecolumn' }
                ]
            }
        });

        t.chain(
            { waitForEventsToRender : gantt },

            function (next) {
                gantt.selModel.selectCells([1, 0], [3, 0]);
                next();
            },

            { type : 'c', target : gantt.lockedGrid.view.el, options : { ctrlKey : true } },

            { paste : [1, 2] }
        )
    });

    t.it('Should copy assignments', function (t) {
        setup({
            gantt : {
                resourceStore   : t.getResourceStore({
                    data : [
                        { Id : 1, Name : 'Alex' },
                        { Id : 2, Name : 'Ben' },
                        { Id : 3, Name : 'Coral' },
                        { Id : 4, Name : 'Dean' },
                        { Id : 5, Name : 'Ethan' }
                    ]
                }),
                assignmentStore : t.getAssignmentStore({
                    data : [
                        { Id : 1, TaskId : 1, ResourceId : 1, Units : 50 },
                        { Id : 2, TaskId : 1, ResourceId : 2, Units : 50 },
                        { Id : 5, TaskId : 1, ResourceId : 5, Units : 100 },

                        { Id : 3, TaskId : 2, ResourceId : 3, Units : 80 },
                        { Id : 4, TaskId : 2, ResourceId : 4, Units : 20 }
                    ]
                }),
                columns         : [
                    { xtype : 'namecolumn' },
                    { xtype : 'resourceassignmentcolumn', width : 150 }
                ]
            }
        });

        t.chain(
            { waitForEventsToRender : gantt },
            { copy : [0, 2] },
            function (next) {
                gantt.resourceStore.remove(gantt.resourceStore.getById(5));
                next();
            },
            { paste : [1, 2] },
            function () {
                var task1 = gantt.taskStore.getById(1);
                var task2 = gantt.taskStore.getById(2);

                var assignments1 = task1.getAssignments();
                var assignments2 = task2.getAssignments();

                t.is(assignments2.length, assignments1.length, 'Correct amount of assignments');
                t.is(gantt.assignmentStore.getCount(), 4, 'total 4 assignments found');

                for (i = 0; i < assignments1.length; i++) {
                    t.is(assignments2[i].getResourceId(), assignments1[i].getResourceId(), 'Resource is ok');
                    t.is(assignments2[i].getUnits(), assignments1[i].getUnits(), 'Units are ok');
                }
            }
        )
    });

    t.it('Should copy dependencies', function (t) {
        setup({
            gantt : {
                taskStore       : t.getTaskStore({
                    data : [
                        { Id : 1, Name : 'Task 1', StartDate : '2010-01-20', Duration : 4, leaf : true },
                        { Id : 2, Name : 'Task 2', StartDate : '2010-01-20', Duration : 4, leaf : true },
                        { Id : 3, Name : 'Task 3', StartDate : '2010-01-20', Duration : 4, leaf : true },
                        { Id : 4, Name : 'Task 4', StartDate : '2010-01-20', Duration : 4, leaf : true },
                        { Id : 5, Name : 'Task 5', StartDate : '2010-01-20', Duration : 4, leaf : true },
                        { Id : 6, Name : 'Task 6', StartDate : '2010-01-20', Duration : 4, leaf : true },
                        { Id : 7, Name : 'Task 7', StartDate : '2010-01-20', Duration : 4, leaf : true }
                    ]
                }),
                dependencyStore : t.getDependencyStore({
                    data : [
                        // end to start
                        { Id : 1, From : 1, To : 3, Type : 2 },
                        // end to end
                        { Id : 2, From : 2, To : 3, Type : 3 },
                        // start to start
                        { Id : 3, From : 3, To : 5, Type : 0, Lag : 1, LagUnit : 's' },
                        // start to end
                        { Id : 4, From : 3, To : 6, Type : 1 },
                        // to be removed
                        { Id : 5, From : 3, To : 7, Type : 3 }
                    ]
                }),
                columns         : [
                    { xtype : 'predecessorcolumn', width : 150 },
                    { xtype : 'successorcolumn', width : 150 }
                ]
            }
        });

        t.chain(
            { waitForEventsToRender : gantt },
            function (next) {
                // for sel model coordinates go like 'col, row'
                gantt.selModel.selectCells([1, 2], [2, 2]);
                t.type(gantt.lockedGrid.view.el, 'c', next, null, { ctrlKey : true });
            },
            function (next) {
                gantt.taskStore.remove(gantt.taskStore.getById(7));
                next();
            },
            { paste : [3, 1] },
            function (next) {
                var store = gantt.dependencyStore;
                t.is(store.getCount(), 8, 'Correct amount of dependencies');

                var originalDeps = store.getIncomingDependenciesForTask(gantt.taskStore.getById(3));
                var copiedDeps   = store.getIncomingDependenciesForTask(gantt.taskStore.getById(4));

                t.is(copiedDeps.length, originalDeps.length, 'All dependencies are copied');
                t.is(store.getNewRecords().length, 4, '4 new dependencies');

                for (i = 0; i < copiedDeps.length; i++) {
                    original = originalDeps[i];
                    copy     = copiedDeps[i];

                    t.is(copy.getSourceId(), original.getSourceId(), 'Dependency source is ok');
                    t.is(copy.getLag(), original.getLag(), 'Lag is ok');
                    t.is(copy.getLagUnit(), original.getLagUnit(), 'Lag unit is ok');
                    t.is(copy.getType(), original.getType(), 'Type is ok');
                }

                originalDeps = store.getOutgoingDependenciesForTask(gantt.taskStore.getById(3));
                copiedDeps   = store.getOutgoingDependenciesForTask(gantt.taskStore.getById(4));

                t.is(copiedDeps.length, originalDeps.length, 'All dependencies are copied');

                for (i = 0; i < copiedDeps.length; i++) {
                    original = originalDeps[i];
                    copy     = copiedDeps[i];

                    t.is(copy.getTargetId(), original.getTargetId(), 'Dependency source is ok');
                    t.is(copy.getLag(), original.getLag(), 'Lag is ok');
                    t.is(copy.getLagUnit(), original.getLagUnit(), 'Lag unit is ok');
                    t.is(copy.getType(), original.getType(), 'Type is ok');
                }

                gantt.dependencyStore.add(
                    { From : 2, To : 1 },
                    { From : 6, To : 5 }
                );

                next();
            },
            { copy : [5, 1] },
            { paste : [0, 1] },
            function (next) {
                t.is(gantt.taskStore.getById(1).getIncomingDependencies().length, 0, 'No incoming deps pasted, existing removed');
                next();
            },
            { copy : [0, 2] },
            { paste : [5, 2] },
            function () {
                t.is(gantt.taskStore.getById(6).getOutgoingDependencies().length, 0, 'No outgoing deps pasted, existing removed');
            }
        )
    });

    t.it('Should update other scheduling fields when copying only startdate, enddate or duration', function (t) {
        setup({
            gantt : {
                columns   : [
                    { xtype : 'namecolumn' },
                    { xtype : 'startdatecolumn' },
                    { xtype : 'enddatecolumn' },
                    { xtype : 'durationcolumn' }
                ],
                taskStore : t.getTaskStore({
                    DATA : [
                        {
                            Id          : 1,
                            Name        : 'Task 1',
                            StartDate   : '2010-01-05',
                            Duration    : 3,
                            EndDate     : '2010-01-08',
                            PercentDone : 45,
                            leaf        : true
                        },
                        {
                            Id          : 2,
                            Name        : 'Task 2',
                            StartDate   : '2010-01-08',
                            EndDate     : '2010-01-08',
                            Duration    : 0,
                            PercentDone : 45,
                            leaf        : true
                        }
                    ]
                })
            }
        });

        var task1 = gantt.taskStore.getById(1),
            task2 = gantt.taskStore.getById(2);

        t.it('copying just startdate', function (t) {
            t.chain(
                { waitForEventsToRender : gantt },

                { copy : [0, 2] },
                { paste : [1, 2] },

                function (next) {
                    t.is(task2.getStartDate(), task1.getStartDate(), 'Start date copied');
                    t.is(task2.getEndDate(), task2.getStartDate(), 'Task moved, end date updated');
                    t.is(task2.getDuration(), 0, 'Duration intact');
                    t.ok(task2.isMilestone(), 'Still a milestone anymore');
                }
            );
        })

        t.it('copying just end date', function (t) {
            task2.setStartEndDate(new Date(2010, 0, 6), new Date(2010, 0, 7))
            task2.commit();

            t.chain(
                { waitForEventsToRender : gantt },

                { copy : [0, 3] },
                { paste : [1, 3] },

                function (next) {
                    t.is(task2.getStartDate(), new Date(2010, 0, 6), 'Start date intact');
                    t.is(task2.getEndDate(), task1.getEndDate(), 'End date copied');
                    t.is(task2.getDuration(), 2, 'Duration updated');


                    t.diag('if copying only end date and target is a milestone, move the task')
                    task1.setStartEndDate(new Date(2010, 0, 4), new Date(2010, 0, 6))
                    task2.setStartEndDate(new Date(2010, 0, 9), new Date(2010, 0, 9))
                    task1.commit();
                    task2.commit();
                    next()
                },

                { copy : [0, 3] },
                { paste : [1, 3] },

                function (next) {
                    t.is(task2.getStartDate(), new Date(2010, 0, 6), 'Start date updated');
                    t.is(task2.getEndDate(),  new Date(2010, 0, 6), 'End date copied');
                    t.is(task2.getDuration(), 0, 'Duration updated');
                    t.ok(task2.isMilestone(), 'still a milestone');

                    t.diag('If end date copied is < start date, then set as a milestone')
                    task1.setStartEndDate(new Date(2010, 0, 4), new Date(2010, 0, 6))
                    task2.setStartEndDate(new Date(2010, 0, 7), new Date(2010, 0, 9))
                    task1.commit();
                    task2.commit();
                    next()
                },

                { copy : [0, 3] },
                { paste : [1, 3] },

                function (next) {
                    t.is(task2.getStartDate(), new Date(2010, 0, 6), 'Start date updated');
                    t.is(task2.getEndDate(),  new Date(2010, 0, 6), 'End date copied');
                    t.is(task2.getDuration(), 0, 'Duration updated');
                    t.ok(task2.isMilestone(), 'a milestone');
                }
            )
        })

        t.it('copying just duration', function (t) {
            task1.setStartEndDate(new Date(2010, 0, 4), new Date(2010, 0, 7))
            task2.setStartEndDate(new Date(2010, 0, 6), new Date(2010, 0, 8))
            task2.commit();

            t.chain(
                { waitForEventsToRender : gantt },

                { copy : [0, 4] },
                { paste : [1, 4] },

                function (next) {
                    t.is(task2.getStartDate(), new Date(2010, 0, 6), 'Start date intact');
                    t.is(task2.getEndDate(), new Date(2010, 0, 9), 'End date updated');
                    t.is(task2.getDuration(), task1.getDuration(), 'Duration copied');
                }
            )
        });

        t.it('copying start + end', function (t) {
            task1.setStartEndDate(new Date(2010, 0, 4), new Date(2010, 0, 8))
            task2.setStartEndDate(new Date(2010, 0, 1), new Date(2010, 0, 4))
            task2.commit();

            t.chain(
                { waitForEventsToRender : gantt },

                { copy : [0, 2, 0, 3] },
                { paste : [1, 2] },

                function (next) {
                    t.is(task2.getStartDate(), task1.getStartDate(), 'Start date copied');
                    t.is(task2.getEndDate(), task1.getEndDate(), 'End date copied');
                    t.is(task2.getDuration(), task1.getDuration(), 'Duration copied');
                }
            )
        });

        // This is a weird combination, behavior not currently specified
        t.xit('copying finish + duration', function (t) {
            task1.setStartEndDate(new Date(2010, 0, 4), new Date(2010, 0, 8))
            task2.setStartEndDate(new Date(2010, 0, 6), new Date(2010, 0, 7))
            task2.commit();

            t.chain(
            )
        });
    });

    t.it('copying start + duration', function (t) {
        setup({
            gantt : {
                columns   : [
                    { xtype : 'namecolumn' },
                    { xtype : 'startdatecolumn' },
                    { xtype : 'durationcolumn' }
                ],
                taskStore : t.getTaskStore({
                    DATA : [
                        {
                            Id          : 1,
                            Name        : 'Task 1',
                            StartDate   : '2010-01-05',
                            Duration    : 3,
                            EndDate     : '2010-01-08',
                            PercentDone : 45,
                            leaf        : true
                        },
                        {
                            Id          : 2,
                            Name        : 'Task 2',
                            StartDate   : '2010-01-13',
                            EndDate     : '2010-01-13',
                            Duration    : 0,
                            PercentDone : 45,
                            leaf        : true
                        }
                    ]
                })
            }
        });

        var task1 = gantt.taskStore.getById(1),
            task2 = gantt.taskStore.getById(2);

        task2.commit();

        t.chain(
            { waitForEventsToRender : gantt },

            { copy : [0, 2, 0, 3] },
            { paste : [1, 2] },

            function (next) {
                t.is(task2.getStartDate(), task1.getStartDate(), 'Start date copied');
                t.is(task2.getEndDate(), task1.getEndDate(), 'End date copied');
                t.is(task2.getDuration(), task1.getDuration(), 'Duration copied');
            }
        )
    });
});