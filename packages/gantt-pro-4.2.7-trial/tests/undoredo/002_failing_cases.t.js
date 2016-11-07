/* global DeepDiff */
StartTest(function(t) {

    t.expectGlobal('DeepDiff');

    var SEED = 'Bryntum',
        spec = {
            seed  : SEED,
            tasks : 100
        },
        random = Gnt.data.Random.makeGenerator(SEED),
        undoMan,
        data,
        gantt;

    function makeSerializableGenerator(spec) {
        return new Gnt.data.Generator(Ext.apply({}, spec, {
            calendarManagerConfig : {
                getUpdatedRecords : function() { var records = []; this.getRoot().cascadeBy(function(node) { records.push(node); }); return records; }
            },
            taskStoreConfig : {
                cascadeChanges : true,
                recalculateParents : true,
                getUpdatedRecords : function() { return this.toArray(); }
            },
            dependencyStoreConfig : {
                getUpdatedRecords : function() { return this.getRange(); }
            },
            resourceStoreConfig : {
                getUpdatedRecords : function() { return this.getRange(); }
            },
            assignmentStoreConfig : {
                getUpdatedRecords : function() { return this.getRange(); }
            },
            crudManagerConfig : {
                writeAllFields : true
            }
        }));
    }

    function getDataSnapshot(data) {
        var changeSetPackage;

        changeSetPackage = (Ext.isDefined(data.crudManager) && data.crudManager || data).getChangeSetPackage();

        return {
            calendars    : changeSetPackage.calendars.updated || [],
            tasks        : changeSetPackage.tasks.updated || [],
            dependencies : changeSetPackage.dependencies.updated || [],
            resources    : changeSetPackage.resources.updated || [],
            assignments  : changeSetPackage.assignments.updated || []
        };
    }

    function segmentsToRawArray(segments) {
        return segments && Ext.Array.map(segments, function(s) {
            return {
                StartDate : s.getStartDate(),
                EndDate   : s.getEndDate()
            };
        }) || [];
    }

    function vizualize(data) {
        gantt = new Gnt.panel.Gantt({
            plugins : [{
                ptype : 'scheduler_pan'
            }],
            infiniteScroll : true,
            columns  : [
                { xtype : 'namecolumn', width : 200 },
                { xtype : 'startdatecolumn', width : 100 },
                { xtype : 'enddatecolumn', width : 100 },
                { xtype : 'durationcolumn', width : 100 },
                { xtype : 'resourceassignmentcolumn', width : 100 }
            ],
            crudManager : data.crudManager,
            dockedItems : [{
                xtype : 'toolbar',
                dock  : 'top',
                items : [{
                    text : 'Zoom out',
                    handler : function() {
                        gantt.zoomOut();
                    }
                }, {
                    text : 'Zoom in',
                    handler : function() {
                        gantt.zoomIn();
                    }
                }, {
                    text : 'Zoom to fit',
                    handler : function() {
                        gantt.zoomToFit();
                    }
                }]
            }]
        });

        new Ext.container.Viewport({
            layout : 'fit',
            items : gantt
        });
    }

    // Generating the data and undo manager
    t.beforeEach(function(t, next) {
        setTimeout(function () {
            var generator = makeSerializableGenerator(spec);

            data = generator.generateData();

            undoMan = new Gnt.data.undoredo.Manager({
                transactionBoundary : 'manual',
                stores : [
                    data.calendarManager,
                    data.taskStore,
                    data.dependencyStore,
                    data.resourceStore,
                    data.assignmentStore
                ]
            });
            undoMan.start();
            next();
        }, 100);
    }, true);

    // Cleaning up the data and undo manager
    t.afterEach(function() {
        undoMan.stop();
        if (!gantt) {
            Ext.Object.each(data, function(prop, val) {
                if (val !== data.crudManager) {
                    data.crudManager.removeStore(val);
                    undoMan.removeStore(val);
                }
            });
            Ext.destroyMembers(data, 'calendarManager', 'taskStore', 'dependencyStore', 'resourceStore', 'assignmentStore', 'crudManager');
        }
    });

    // -------------------
    // Tests are following
    // -------------------

    t.it("Moving a task with an incoming dependency should keep the dependency after undo and then redo", function(t) {
        var movingTask,
            newParentTask,
            initialSnapshot,
            changedSnapshot;

        movingTask = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && task.hasIncomingDependencies();
        });

        t.ok(movingTask, "Found a leaf task with incoming dependencies");

        newParentTask = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return task !== movingTask && !task.isRoot() && task !== movingTask.parentNode && !data.dependencyStore.areTasksLinked(task, movingTask);
        });

        t.ok(newParentTask, "Found a new parent node for a moving task");

        t.chain(
            function(next) {
                initialSnapshot = getDataSnapshot(data);

                undoMan.startTransaction();

                newParentTask.addSubtask(movingTask, function() {

                    undoMan.endTransaction();
                    next();
                });
            },
            function(next) {

                t.ok(movingTask.hasIncomingDependencies(), "Task has incoming dependencies after being moved");

                changedSnapshot = getDataSnapshot(data);

                undoMan.undo();

                t.ok(movingTask.hasIncomingDependencies(), "Task has incoming dependencies after movement has been undoed");

                t.isDeeply(initialSnapshot, getDataSnapshot(data), "Data snapshots are identical");

                undoMan.redo();

                t.ok(movingTask.hasIncomingDependencies(), "Task has incoming dependencies after movement has been redoed");

                t.isDeeply(changedSnapshot, getDataSnapshot(data), "Data snapshots are identical");
            }
        );
    });

    t.it("A task with violated dependency constraint should not correct itself after it's removal undoing", function(t) {
        var sourceTask,
            targetTask,
            snapshot;

        sourceTask = {
            StartDate : Ext.Date.clearTime(data.taskStore.getProjectStartDate(), true),
            Duration  : 5,
            leaf      : true
        };

        targetTask = {
            StartDate : sourceTask.startDate,
            Duration  : 1,
            leaf      : true
        };

        sourceTask = data.taskStore.getRoot().appendChild(sourceTask);
        targetTask = data.taskStore.getRoot().appendChild(targetTask);

        t.chain(
            function(next) {
                sourceTask.linkTo(targetTask, Gnt.model.Dependency.Type.EndToEnd, function() {
                    next();
                });
            },
            function(next) {
                t.isDateEqual(sourceTask.getEndDate(), targetTask.getEndDate(), "After linking target task dependency constraint are satisfied");

                targetTask.shift(Ext.Date.DAY, -2, function() {
                    next();
                });
            },
            function(next) {
                t.isDateEqual(targetTask.getEndDate(), Ext.Date.add(sourceTask.getEndDate(), Ext.Date.DAY, -2), "Target task end date violates dependency constraint now");

                snapshot = getDataSnapshot(data);

                undoMan.startTransaction();

                targetTask.parentNode.removeSubtask(targetTask, function() {

                    undoMan.endTransaction();
                    next();
                });
            },
            function(next) {
                undoMan.undo();

                t.isDateEqual(targetTask.getEndDate(), Ext.Date.add(sourceTask.getEndDate(), Ext.Date.DAY, -2), "Target task end date violates dependency constraint after removal undoing");

                t.isDeeply(snapshot, getDataSnapshot(data), "Snapshots are identical");
            }
        );
    });

    t.it("Recalculate parents flag should not affect undoing / redoing if a data snapshot being set back has a non-recalculated summary node", function(t) {
        var summaryTask,
            summaryChildTask,
            summaryStartDate,
            summaryEndDate,
            snapshot;

        summaryTask = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return !task.isRoot() && !task.isLeaf() && !task.isProject
        });

        // Storing correct summary dates
        summaryStartDate = new Date(summaryTask.getStartDate().getTime());
        summaryEndDate   = new Date(summaryTask.getEndDate().getTime());

        t.ok(summaryTask, "Found a summary task which is not the root and not a project");

        summaryChildTask = summaryTask.lastChild;

        data.taskStore.recalculateParents = false;

        t.chain(
            function(next) {
                // Shifting such that
                // [ summary ]
                //           [ last child ]
                summaryChildTask.shift(Sch.util.Date.DAY, Sch.util.Date.getDurationInDays(summaryChildTask.getStartDate(), summaryTask.getEndDate()), function() {
                    next();
                });
            },
            function(next) {
                t.isDateEqual(summaryTask.getStartDate(), summaryStartDate, "With parents recalculation off summary task start date hasn't changed after child shifting outside of the summary task timespan");
                t.isDateEqual(summaryTask.getEndDate(),   summaryEndDate,   "With parents recalculation off summary task end date hasn't changed after child shifting outside of the summary task timespan");

                snapshot = getDataSnapshot(data);

                undoMan.startTransaction();

                summaryTask.removeSubtask(summaryChildTask, function() {

                    undoMan.endTransaction();
                    next();
                });
            },
            function(next) {

                data.taskStore.recalculateParents = true;

                undoMan.undo();

                t.isDateEqual(summaryTask.getStartDate(), summaryStartDate, "After undoing summary task start date is back to violating date even with parent recalculation on");
                t.isDateEqual(summaryTask.getEndDate(),   summaryEndDate,   "After undoing summary task end date is back to violating date even with parent recalculation on");

                t.isDeeply(snapshot, getDataSnapshot(data), "Snapshots are identical");
            }
        );
    });

    t.it("Indenting should be undoable", function(t) {
        var taskToIndent,
            originalParent,
            originalIndex,
            snapshot;

        taskToIndent = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && task.previousSibling;
        });

        t.ok(taskToIndent, "Got task to indent");

        originalParent = taskToIndent.parentNode;
        originalIndex  = taskToIndent.get('index');

        snapshot = getDataSnapshot(data);

        t.chain(
            function(next) {
                undoMan.startTransaction();

                taskToIndent.indent(function() {

                    undoMan.endTransaction();
                    next();
                });
            },
            function(next) {
                undoMan.undo();
                t.is(taskToIndent.parentNode, originalParent, "Indented node has been moved back to it's original parent after undo");
                t.is(taskToIndent.get('index'), originalIndex, "Indented node has been inserted back under it's original index after undo");
                t.isDeeply(snapshot, getDataSnapshot(data), "Snapshots are identical");
            }
        );
    });

    t.it("Outdenting should be undoable", function(t) {
        var taskToOutdent,
            originalParent,
            originalIndex,
            snapshot;

        taskToOutdent = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && !task.parentNode.isRoot() && task.get('index') > 1;
        });

        t.ok(taskToOutdent, "Got task to outdent");

        originalParent = taskToOutdent.parentNode;
        originalIndex  = taskToOutdent.get('index');

        snapshot = getDataSnapshot(data);

        t.chain(
            function(next) {
                undoMan.startTransaction();

                taskToOutdent.outdent(function() {

                    undoMan.endTransaction();
                    next();
                });
            },
            function(next) {
                undoMan.undo();

                t.is(taskToOutdent.parentNode, originalParent, "Outdented node has been moved back to it's original parent after undo");
                t.is(taskToOutdent.get('index'), originalIndex, "Outdented node has been inserted back under it's original index after undo");
                t.isDeeply(snapshot, getDataSnapshot(data), "Snapshots are identical");
            }
        );
    });

    t.it("Removing an effort driven task shouldn't change it's start/end dates upon undo-redo-undo sequence", function(t) {
        var effortDrivenTask,
            startDate,
            endDate,
            snapshot;

        effortDrivenTask = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return task.getSchedulingMode() == 'EffortDriven';
        });

        t.ok(effortDrivenTask, "Got effort driven task to remove");

        startDate = new Date(effortDrivenTask.getStartDate().getTime());
        endDate = new Date(effortDrivenTask.getEndDate().getTime());

        snapshot = getDataSnapshot(data);

        t.chain(
            function(next) {
                undoMan.startTransaction();

                effortDrivenTask.parentNode.removeSubtask(effortDrivenTask, function() {

                    undoMan.endTransaction();
                    next();
                });
            },
            function() {
                undoMan.undo();
                undoMan.redo();
                undoMan.undo();

                t.isDateEqual(startDate, effortDrivenTask.getStartDate(), "Effort driven task start date is back to original upon undoing");
                t.isDateEqual(endDate, effortDrivenTask.getEndDate(), "Effort driven task end date is back to original upon undoing");
                t.isDeeply(snapshot, getDataSnapshot(data), "Snapshots are identical");
            }
        );
    });

    t.it("Removing a summary task containing a subtask with dynamic assignment scheduling mode should be undoable", function(t) {
        var dynamicAssignmentTask,
            origSnapshot,
            modifSnapshot;

        dynamicAssignmentTask = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && !task.isMilestone() && task.hasIncomingDependencies() && task.getSchedulingMode() == 'DynamicAssignment' && !task.parentNode.isRoot();
        });

        t.ok(dynamicAssignmentTask, "Found task with dynamic assignment scheduling mode having dependencies which isn't descendant of root node");

        origSnapshot = getDataSnapshot(data);

        t.chain(
            function(next) {
                undoMan.startTransaction();
                dynamicAssignmentTask.parentNode.removeSubtask(dynamicAssignmentTask, function() {
                    undoMan.endTransaction();
                    next();
                });
            },
            function(next) {
                modifSnapshot = getDataSnapshot(data);

                undoMan.undo();

                t.isDeeply(origSnapshot, getDataSnapshot(data), "Original and undoed snapshots are identical");

                undoMan.redo();

                t.isDeeply(modifSnapshot, getDataSnapshot(data), "Modified and redoed snapshots are identical");
            }
        );
    });

    t.it("Removing a summary task in one undo/redo transaction then undoing it and then removing a regular task external to summary branch and having incoming dependency from within summary branch should be redoable", function(t) {
        var summaryTask,
            summaryDependantExternalTasks,
            origSnapshot,
            modifSnapshot;

        summaryTask = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return !task.isRoot() && !task.isLeaf() && !task.isProject;
        });

        t.ok(summaryTask, "Found a summary task (id = " + summaryTask.getId() + ")");

        summaryDependantExternalTasks = [];
        summaryTask.cascadeBy(function(task) {
            Ext.Array.forEach(task.getOutgoingDependencies(), function(dep) {
                var targetTask = dep.getTargetTask();
                if (!targetTask.isAncestor(summaryTask) && targetTask.isLeaf() && !targetTask.isMilestone() && !targetTask.isSegmented()) {
                    summaryDependantExternalTasks.push(targetTask);
                }
            });
        });

        t.ok(summaryDependantExternalTasks.length, "Got list of dependent regular tasks external to summary task and it's subtasks");

        origSnapshot = getDataSnapshot(data);

        t.chain(
            function(next) {
                undoMan.startTransaction();

                summaryTask.parentNode.removeSubtask(summaryTask, function() {

                    undoMan.endTransaction();
                    next();
                });
            },
            function(next) {

                undoMan.undo();

                t.isDeeply(origSnapshot, getDataSnapshot(data), "Original and undoed snapshots of the first transaction are identical");

                next();
            },
            function(next) {
                var depTask = summaryDependantExternalTasks[0];

                origSnapshot = getDataSnapshot(data);

                undoMan.startTransaction();

                depTask.parentNode.removeSubtask(depTask, function() {

                    undoMan.endTransaction();
                    next();
                });
            },
            function(next) {
                var depTask = summaryDependantExternalTasks[0];

                modifSnapshot = getDataSnapshot(data);

                undoMan.undo();

                t.isDeeply(origSnapshot, getDataSnapshot(data), "Original and undoed snapshots of the second transaction are identical");

                undoMan.redo();

                t.isDeeply(modifSnapshot, getDataSnapshot(data), "Modified and redoed snapshots of the second transaction are identical");
            }
        );
    });

    t.it("Asynchronious changes propagation process should be handled by single undo/redo transaction, i.e. transaction should hold during store projection time regardless of undo manager's transaction maximum timeout setting", function(t) {
        var lastRegularTask,
            topSummaryTask,
            origSnapshot,
            modifiedSnapshot;

        lastRegularTask = Ext.Array.findBy(data.taskStore.toArray().reverse(), function(task) {
            return task.isLeaf() && !task.isMilestone() && !task.parentNode.isRoot() && task.nextSibling;
        });

        t.ok(lastRegularTask, "Found one of the last regular task which is not direct child of a root node and which has next sibling");

        topSummaryTask = lastRegularTask.parentNode;
        while (!topSummaryTask.parentNode.isRoot()) {
            topSummaryTask = topSummaryTask.parentNode;
        }

        t.ok(topSummaryTask, "Found top summary node containing last regular task found");

        origSnapshot = getDataSnapshot(data);

        undoMan.transactionBoundary = 'timeout'

        // setting up constraint violation handler
        data.taskStore.on({
            'constraintconflict' : function(task, context) {
                Ext.Function.defer(function() {
                    context.getResolution('move-task').resolve();
                }, 2 * undoMan.transactionMaxDuration);
            },
            single : true
        });

        t.firesOnce(data.taskStore, 'constraintconflict', "Task store has reported a constraint conflict once");

        t.chain(
            // setting up the constraint
            function(next) {
                lastRegularTask.setConstraint('muststarton', lastRegularTask.getStartDate(), function() {
                    next();
                });
            },
            // moving summary task to violate the constraint
            function(next) {
                topSummaryTask.setStartDate(Ext.Date.add(lastRegularTask.getStartDate(), Ext.Date.DAY, 1), true, true, function() {
                    next();
                });
            },
            // waiting for transaction to finish
            function(next) {
                undoMan.on({
                    'undoqueuechange' : function() { next(); },
                    single : true
                });
            },
            // there should be only one transaction recorded
            function(next) {
                t.is(undoMan.getUndoQueue().length, 1, "Undo queue has single transaction");
                next();
            },
            function(next) {
                modifiedSnapshot = getDataSnapshot(data);

                undoMan.undo();

                t.isDeeply(origSnapshot, getDataSnapshot(data), "Original and undoed snapshots are identical");

                undoMan.redo();

                t.isDeeply(modifiedSnapshot, getDataSnapshot(data), "Modified and redoed snapshots are identical");
            }
        );
    });
});
