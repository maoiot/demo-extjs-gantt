StartTest(function(t) {

    var VIZUALIZE = true,
        SEED_BASE = "Bryntum",
        MONKEY_MIN_ACTIONS_TO_DO = 1,
        MONKEY_MAX_ACTIONS_TO_DO = 1;

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

    function reportActions(t, actionsDone) {
        // Report
        Ext.Array.forEach(actionsDone, function(action) {
            t.diag(action.description);
        });
    }

    function reportCleanupRegenerate(t, actionsDone, data, generator, undoMan) {

        // Report
        reportActions(t, actionsDone);

        // Cleanup
        undoMan.stop();
        Ext.Object.each(data, function(prop, val) {
            if (val !== data.crudManager) {
                data.crudManager.removeStore(val);
                undoMan.removeStore(val);
            }
        });
        Ext.destroyMembers(data, 'calendarManager', 'taskStore', 'dependencyStore', 'resourceStore', 'assignmentStore', 'crudManager');

        // Regenerate
        if (generator) {
            data = generator.generateData();
            Ext.Array.map([
                data.calendarManager,
                data.taskStore,
                data.dependencyStore,
                data.resourceStore,
                data.assignmentStore
            ], function(store) {
                undoMan.addStore(store);
            });
        }

        undoMan.start();

        return data;
    }

    function vizualize(data) {
        var gantt;
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

    t.xdescribe("Generator self test", function(t) {
        var gantt,
            data,
            calendarManager,
            taskStore,
            dependencyStore,
            resourceStore,
            assignmentStore,
            crudManager,
            snapShot1,
            snapShot2,
            calendarCount       = 0,
            parentCalendarCount = 0,
            normalTaskCount     = 0,
            milestoneTaskCount  = 0,
            projectTaskCount    = 0,
            summaryTaskCount    = 0,
            spec                = { seed : 'Bryntum', tasks : 50 },
            generator;

        t.ok(Math.seedrandom, "Seedrandom library is loaded");

        generator = makeSerializableGenerator(spec);
        data = generator.generateData();
        spec = generator.getConfig();

        // Calendar manager
        calendarManager = data.calendarManager;
        calendarManager.getProjectCalendar().cascadeBy(function(node) {
            ++calendarCount;
            parentCalendarCount += node.isLeaf() ? 0 : 1;
        });
        t.is(calendarCount, spec.calendars, "Correct amount of calendars is generated");
        t.isApprox(parentCalendarCount, spec.parentCalendars, 20, "Correct amount of parent calendars is generated");

        // Task store
        taskStore = data.taskStore;
        taskStore.getRoot().cascadeBy(function(node) {
            if (!node.isRoot() && node instanceof Gnt.model.Project) {
                ++projectTaskCount;
            }
            else if (!node.isRoot() && !node.isLeaf()) {
                ++summaryTaskCount;
            }
            else if (!node.isRoot() && node.isMilestone()) {
                ++milestoneTaskCount;
            }
            else if (!node.isRoot()) {
                ++normalTaskCount;
            }
        });
        t.is(normalTaskCount + projectTaskCount + summaryTaskCount + milestoneTaskCount, spec.tasks, "Correct total task nodes amount is generetaed");
        t.isApprox(projectTaskCount, spec.projects, 20, "Correct project nodes amount is generated");
        t.isApprox(summaryTaskCount, spec.summaries, 20, "Correct summary nodes amount is generated");
        t.isApprox(milestoneTaskCount, spec.milestones, 20, "Correct milestone nodes amount is generated");

        // Dependency store
        dependencyStore = data.dependencyStore;
        t.is(dependencyStore.getCount(), spec.dependencies, "Correct dependencies amount is generated");

        // Resource store
        resourceStore = data.resourceStore;
        t.is(resourceStore.getCount(), spec.resources, "Correct resources amount is generated");

        // Assignment store
        assignmentStore = data.assignmentStore;
        t.is(assignmentStore.getCount(), spec.assignments, "Correct assignments amount is generated");

        // Crud manager
        crudManager = data.crudManager;

        // Testing comparator logic
        snapShot1 = getDataSnapshot(data);
        snapShot2 = getDataSnapshot(data);
        t.isDeeply(snapShot1, snapShot2, "Both snapshots are equal");

        resourceStore.remove(resourceStore.first());
        snapShot2 = getDataSnapshot(data);
        t.ok(!t.compareObjects(snapShot1, snapShot2), "After a modification next snapshot is not equal to the first one");

        // Testing that different generators with the same seed generates same data
        generator = makeSerializableGenerator(spec);
        snapShot1 = getDataSnapshot(generator.generateData());
        generator = makeSerializableGenerator(spec);
        snapShot2 = getDataSnapshot(generator.generateData());
        t.isDeeply(snapShot1, snapShot2, "Two generators with the same seed and specification generate the same data");
        console.log(snapShot1, snapShot2);
        // Vizualization
        if (VIZUALIZE) {
            vizualize(data);
        }
    });

    t.it("An infinite amount of monkeys hitting keyboard for infinite amount of years might program an AI", function(t) {
        var monkeys = new Array(50),
            monkeyGroupStartFrom = 0,
            generator, data, i, len,
            undoMan,
            heapSize;

        generator = makeSerializableGenerator({
            seed : SEED_BASE,
            tasks : 100
        });

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

        for (i = 0, len = monkeys.length; i < len; ++i) {
            monkeys[i] = new Gnt.data.Monkey({
                seed : SEED_BASE + (i + monkeyGroupStartFrom),
                minActionsToDo : MONKEY_MIN_ACTIONS_TO_DO,
                maxActionsToDo : MONKEY_MAX_ACTIONS_TO_DO
            });
        }

        /*
        if ('console' in window && console.memory) {
            heapSize = console.memory.usedJSHeapSize;
            t.diag("Used JS heap size " + console.memory.usedJSHeapSize + ", Total JS heap size " + console.memory.totalJSHeapSize + ", JS heap size limit " + console.memory.jsHeapSizeLimit);
        }
        */

        t.chainForArray(monkeys, function(monkey, index) {
            return function(next) {
                var snapshot1 = getDataSnapshot(data);

                undoMan.startTransaction();

                t.wait('monkey');
                monkey.playOn(data, function(actionsDone) {
                    t.endWait('monkey');

                    var snapshot2,
                        changeResult,
                        undoResult,
                        redoResult,
                        undoRedoResult;

                    undoMan.endTransaction();

                    snapshot2 = getDataSnapshot(data);

                    changeResult = !t.compareObjects(snapshot1, snapshot2);
                    t.ok(changeResult, "Monkey [" + monkey.getSeed() + "] did some changes");

                    if (!changeResult) {
                        data = reportCleanupRegenerate(t, actionsDone, data, generator, undoMan);
                    }
                    else {
                        undoMan.undo();

                        undoResult = t.compareObjects(snapshot1, getDataSnapshot(data));
                        t.isDeeply(getDataSnapshot(data), snapshot1, "Undo manager succeeded undoing monkey's mess");

                        if (!undoResult) {
                            data = reportCleanupRegenerate(t, actionsDone, data, generator, undoMan);
                        }
                        else {
                            undoMan.redo();

                            redoResult = t.compareObjects(snapshot2, getDataSnapshot(data));
                            t.isDeeply(getDataSnapshot(data), snapshot2, "Undo manager succeeded redoing monkey's mess");

                            if (!redoResult) {
                                data = reportCleanupRegenerate(t, actionsDone, data, generator, undoMan);
                            }
                            else {
                                undoMan.undo();

                                undoRedoResult = t.compareObjects(snapshot1, getDataSnapshot(data));
                                t.isDeeply(snapshot1, getDataSnapshot(data), "Undo manager succeeded undoing after redoing");

                                if (!undoRedoResult) {
                                    data = reportCleanupRegenerate(t, actionsDone, data, generator, undoMan);
                                }
                                else {
                                    reportActions(t, actionsDone);
                                }
                            }
                        }
                    }

                    /*
                    if ('console' in window && console.memory) {
                        t.diag("JS heap size diff " + Ext.util.Format.fileSize(console.memory.usedJSHeapSize - heapSize));
                    }
                    */

                    next();
                });
            };
        });
    });

    t.xdescribe("This particular monkey breaks the rules", function particularMonkey(t) {
        // Use this test to re-play actions of a particular monkey (monkey with particular seed)
        var monkeyNo = 50,
            monkeySeed = SEED_BASE + monkeyNo,
            monkey,
            generator,
            data,
            undoMan,
            snapshot1;

        generator = makeSerializableGenerator({
            seed : SEED_BASE,
            tasks : 100
        });

        window.monkeyData = data = generator.generateData();

        // Vizualization
        if (VIZUALIZE) {
            vizualize(data);
        }

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

        window.monkeyUndo = undoMan;

        monkey = new Gnt.data.Monkey({
            seed : monkeySeed,
            minActionsToDo : MONKEY_MIN_ACTIONS_TO_DO,
            maxActionsToDo : MONKEY_MAX_ACTIONS_TO_DO
        });

        snapshot1 = getDataSnapshot(data);

        undoMan.startTransaction();

        monkey.playOn(data, function(actionsDone) {
            var snapshot2,
                changeResult,
                undoResult,
                redoResult,
                undoRedoResult;

            undoMan.endTransaction();

            snapshot2 = getDataSnapshot(data);

            changeResult = !t.compareObjects(snapshot1, snapshot2);
            t.ok(changeResult, "Monkey [" + monkey.getSeed() + "] did some changes");

            if (!changeResult) {
                reportActions(t, actionsDone);
            }
            else {
                undoMan.undo();

                undoResult = t.compareObjects(snapshot1, getDataSnapshot(data));
                t.isDeeply(getDataSnapshot(data), snapshot1, "Undo manager succeeded undoing monkey's mess");

                if (!undoResult) {
                    reportActions(t, actionsDone);
                }
                else {
                    undoMan.redo();

                    redoResult = t.compareObjects(snapshot2, getDataSnapshot(data));
                    t.isDeeply(getDataSnapshot(data), snapshot2, "Undo manager succeeded redoing monkey's mess");

                    if (!redoResult) {
                        reportActions(t, actionsDone);
                    }
                    else {
                        undoMan.undo();

                        undoRedoResult = t.compareObjects(snapshot1, getDataSnapshot(data));
                        t.isDeeply(getDataSnapshot(data), snapshot1, "Undo manager succeeded undoing after redoing");

                        if (!undoRedoResult) {
                            reportActions(t, actionsDone);
                        }
                    }
                }
            }
        });
    });
});
