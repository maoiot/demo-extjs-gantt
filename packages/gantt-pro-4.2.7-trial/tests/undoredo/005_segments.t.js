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

    function compareSnapshots(t, snap, originalSnap) {

        for (var o in snap) {
            t.subTest(o, function(t) {
                Ext.Array.forEach(snap[o], function(data1, i) {
                    t.isDeeply(data1, originalSnap[o][i]);
                })
            });

        }
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
    t.beforeEach(function(t, proceed) {
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

            proceed();
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

    t.it("Undoing / redoing of a segmented task shift should work", function(t) {
        var segmentedTask,
            origSegments,
            modifSegments,
            origSnapshot,
            modifSnapshot;

        segmentedTask = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && !task.isMilestone() && task.isSegmented();
        });

        t.ok(segmentedTask, "Found segmented task to shift");

        origSegments = segmentsToRawArray(segmentedTask.getSegments());
        origSnapshot = getDataSnapshot(data);

        t.chain(
            function (next) {
                undoMan.startTransaction();

                segmentedTask.shift(Sch.util.Date.DAY, 5, function() {
                    undoMan.endTransaction();
                    next();
                });
            },
            function (next) {
                modifSegments = segmentsToRawArray(segmentedTask.getSegments());
                modifSnapshot = getDataSnapshot(data);

                undoMan.undo();

                t.isDeeply(segmentsToRawArray(segmentedTask.getSegments()), origSegments, "Segments data restored after undo");
                t.isDeeply(getDataSnapshot(data), origSnapshot, "Original and undoed snapshots are identical");

                undoMan.redo();

                t.isDeeply(segmentsToRawArray(segmentedTask.getSegments()), modifSegments, "Segments data reset back after redo");
                t.isDeeply(getDataSnapshot(data), modifSnapshot, "Modified and redoed snapshots are identical");
            }
        );
    });

    t.it("Undoing / redoing of a moved task segment should work", function(t) {

        var ts = new Gnt.data.TaskStore({
            root : {
                children : [
                    {
                        "Id"                : 1,
                        "leaf"              : true,
                        "StartDate"         : "2010-01-18",
                        "Duration"          : 10,
                        "Segments"          : [
                            {
                                "Id"        : 1,
                                "StartDate" : "2010-01-18",
                                "Duration"  : 1
                            },
                            {
                                "Id"        : 2,
                                "StartDate" : "2010-01-20",
                                "Duration"  : 2
                            },
                            {
                                "Id"        : 3,
                                "StartDate" : "2010-01-25",
                                "Duration"  : 5
                            }
                        ]
                    }
                ]
            }
        })

        var segmentedTask = ts.getNodeById(1);
        var origSegments = getSerializedSegments();

        function getSerializedSegments() {
            return Ext.Array.map(segmentedTask.getSegments() || [], function(seg) { return seg.serialize(); });
        }

        undoMan = new Gnt.data.undoredo.Manager({
            transactionBoundary : 'manual',
            stores : [
                ts
            ]
        });

        undoMan.start();

        undoMan.startTransaction();
        segmentedTask.getSegment(2).setStartDate(new Date(2010, 0, 29), true);
        undoMan.endTransaction();

        var modifSegments = getSerializedSegments();

        undoMan.undo();

        t.isDeeply(getSerializedSegments(), origSegments, "Segments data restored after undo");

        undoMan.redo();

        t.isDeeply(getSerializedSegments(), modifSegments, "Segments data reset back after redo");
    });


    t.it("Undoing / redoing of a segmented task joining should work", function(t) {
        var segmentedTask,
            segments,
            origSnapshot,
            modifSnapshot;

        segmentedTask = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && !task.isMilestone() && task.isSegmented();
        });

        t.ok(segmentedTask, "Found segmented task to join");

        segments = segmentsToRawArray(segmentedTask.getSegments());
        origSnapshot = getDataSnapshot(data);

        t.chain(
            function(next) {
                undoMan.startTransaction();

                segmentedTask.setSegments([], function() {
                    undoMan.endTransaction();
                    next();
                });
            },
            function(next) {
                modifSnapshot = getDataSnapshot(data);

                undoMan.undo();

                t.isDeeply(segmentsToRawArray(segmentedTask.getSegments()), segments, "Segments data restored after undo");
                //t.isDeeply(getDataSnapshot(data), origSnapshot, "Original and undoed snapshots are identical");

                undoMan.redo();

                t.isDeeply(segmentsToRawArray(segmentedTask.getSegments()), [], "Segments data reset back after redo");
                t.isDeeply(getDataSnapshot(data), modifSnapshot, "Modified and redoed snapshots are identical");
            }
        );
    });

    t.it("Segments merging should be undoable/redoable in 'timeout' undo manager mode", function(t) {
        var segmentedTask,
            segments,
            origSnapshot,
            modifSnapshot;

        segmentedTask = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && !task.isMilestone() && task.isSegmented();
        });

        t.ok(segmentedTask, "Found segmented task to join (id = " + segmentedTask.getId() + ")");

        segments = segmentsToRawArray(segmentedTask.getSegments());
        origSnapshot = getDataSnapshot(data);

        undoMan.transactionBoundary = 'timeout'

        t.chain(
            function (next) {
                segmentedTask.merge(segmentedTask.getSegment(0), segmentedTask.getSegment(1), function() {

                    undoMan.on({
                        'undoqueuechange' : next,
                        single            : true
                    });

                });
            },
            function (next) {
                modifSnapshot = getDataSnapshot(data);

                undoMan.undo();

                t.isDeeply(segmentsToRawArray(segmentedTask.getSegments()), segments, "Segments data restored after undo");
                t.isDeeply(getDataSnapshot(data), origSnapshot, "Original and undoed snapshots are identical");

                undoMan.redo();

                t.isDeeply(segmentsToRawArray(segmentedTask.getSegments()), [], "Segments data reset back after redo");
                t.isDeeply(getDataSnapshot(data), modifSnapshot, "Modified and redoed snapshots are identical");
            }
        );
    });

    t.it("Removing a summary task containing segmented children with dependencies and violating calendar should be undoable/redoable", function(t) {
        var segmentedTask,
            summaryTask,
            segments,
            origSnapshot,
            modifSnapshot;

        segmentedTask = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && !task.isMilestone() && task.isSegmented() && task.hasIncomingDependencies() && !task.parentNode.isRoot();
        });

        t.ok(segmentedTask, "Found segmented task having dependencies which isn't descendant of root node");

        segments = segmentsToRawArray(segmentedTask.getSegments());
        origSnapshot = getDataSnapshot(data);

        summaryTask = segmentedTask.parentNode;

        t.chain(
            function(next) {
                undoMan.startTransaction();
                summaryTask.parentNode.removeSubtask(summaryTask, function() {
                    undoMan.endTransaction();
                    next();
                });
            },
            function(next) {
                modifSnapshot = getDataSnapshot(data);

                undoMan.undo();

                compareSnapshots(t, getDataSnapshot(data), origSnapshot)

                t.isDeeply(segmentsToRawArray(segmentedTask.getSegments()), segments, "Segments data restored after undo");
                t.isDeeply(getDataSnapshot(data), origSnapshot, "Original and undoed snapshots are identical");

                undoMan.redo();

                t.isDeeply(segmentsToRawArray(segmentedTask.getSegments()), segments, "Segments data is untouched after redo");
                t.isDeeply(getDataSnapshot(data), modifSnapshot, "Modified and redoed snapshots are identical");
            }
        );
    });

    t.it("Converting a segmented task to milestone within one undo/redo transaction, undoing it, and then changing task's duration within another transaction should be undoable/redoable", function(t) {
        var segmentedTask,
            origSnapshot,
            modifSnapshot;

        segmentedTask = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && !task.isMilestone() && task.isSegmented();
        });

        t.ok(segmentedTask, "Found segmented task (id = " + segmentedTask.getId() + ")");

        origSnapshot = getDataSnapshot(data);

        t.chain(
            function(next) {
                undoMan.startTransaction();

                segmentedTask.convertToMilestone(function() {
                    undoMan.endTransaction();
                    next();
                });
            },
            function(next) {
                undoMan.undo();
                t.isDeeply(getDataSnapshot(data), origSnapshot, "Original and undoed snapshots of the first transaction are identical");
                next();
            },
            function(next) {
                origSnapshot = getDataSnapshot(data);

                undoMan.startTransaction();

                segmentedTask.setDuration(segmentedTask.getDuration() + 5, null, function() {
                    undoMan.endTransaction();
                    next();
                });
            },
            function(next) {
                modifSnapshot = getDataSnapshot(data);

                undoMan.undo();

                t.isDeeply(getDataSnapshot(data), origSnapshot, "Original and undoed snapshots of the second transaction are identical");

                compareSnapshots(t, getDataSnapshot(data), origSnapshot);

                undoMan.redo();

                t.isDeeply(getDataSnapshot(data), modifSnapshot, "Modified and redoed snapshots of the second transaction are identical");
            }
        );
    });

    t.it("Calling setSegments(...) is undoable/redoable", function(t) {
        var segmentedTask,
            origSnapshot,
            modifSnapshot;

        segmentedTask = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && !task.isMilestone() && task.isSegmented();
        });

        t.ok(segmentedTask, "Found segmented task (id = " + segmentedTask.getId() + ")");

        origSnapshot = getDataSnapshot(data);

        t.chain(
            function (next) {
                undoMan.startTransaction();

                segmentedTask.setSegments([{ StartDate : '2016-02-24', Duration : 1 }, { StartDate : '2016-02-26', Duration : 1 }], function () {
                    undoMan.endTransaction();
                    next();
                });
            },
            function (next) {
                modifSnapshot = getDataSnapshot(data);

                undoMan.undo();

                t.isDeeply(getDataSnapshot(data), origSnapshot, "Original and undoed snapshots of the first transaction are identical");

                undoMan.redo();

                t.isDeeply(getDataSnapshot(data), modifSnapshot, "Modified and redoed snapshots of the second transaction are identical");
            }
        );
    });

    t.it("Calling set(Segments, ...) is undoable/redoable", function(t) {
        var segmentedTask,
            origSnapshot,
            modifSnapshot;

        segmentedTask = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && !task.isMilestone() && task.isSegmented();
        });

        t.ok(segmentedTask, "Found segmented task (id = " + segmentedTask.getId() + ")");

        origSnapshot = getDataSnapshot(data);

        t.chain(
            function(next) {
                undoMan.startTransaction();

                segmentedTask.set('Segments', [{ StartDate : '2016-02-24', Duration : 1 }, { StartDate : '2016-02-26', Duration : 1 }]);

                modifSnapshot = getDataSnapshot(data);

                undoMan.endTransaction();

                next();
            },
            function(next) {

                undoMan.undo();

                t.isDeeply(getDataSnapshot(data), origSnapshot, "Original and undoed snapshots of the first transaction are identical");

                undoMan.redo();

                t.isDeeply(getDataSnapshot(data), modifSnapshot, "Modified and redoed snapshots of the second transaction are identical");
            }
        );
    });

    t.it("Calling setSegments(null) is undoable/redoable", function(t) {
        var segmentedTask,
            origSnapshot,
            modifSnapshot;

        segmentedTask = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && !task.isMilestone() && task.isSegmented();
        });

        t.ok(segmentedTask, "Found segmented task (id = " + segmentedTask.getId() + ")");

        origSnapshot = getDataSnapshot(data);

        t.chain(
            function(next) {
                undoMan.startTransaction();

                segmentedTask.setSegments(null, function () {
                    undoMan.endTransaction();
                    next();
                });
            },
            function(next) {
                modifSnapshot = getDataSnapshot(data);

                undoMan.undo();

                t.isDeeply(getDataSnapshot(data), origSnapshot, "Original and undoed snapshots of the first transaction are identical");

                undoMan.redo();

                t.isDeeply(getDataSnapshot(data), modifSnapshot, "Modified and redoed snapshots of the second transaction are identical");
            }
        );
    });

    t.it("Calling set(Segments, null) is undoable/redoable", function(t) {
        var segmentedTask,
            origSnapshot,
            modifSnapshot;

        segmentedTask = Ext.Array.findBy(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && !task.isMilestone() && task.isSegmented();
        });

        t.ok(segmentedTask, "Found segmented task (id = " + segmentedTask.getId() + ")");

        origSnapshot = getDataSnapshot(data);

        t.chain(
            function(next) {
                undoMan.startTransaction();

                segmentedTask.set('Segments', null);

                modifSnapshot = getDataSnapshot(data);

                undoMan.endTransaction();

                next();
            },
            function(next) {

                undoMan.undo();

                t.isDeeply(getDataSnapshot(data), origSnapshot, "Original and undoed snapshots of the first transaction are identical");

                undoMan.redo();

                t.isDeeply(getDataSnapshot(data), modifSnapshot, "Modified and redoed snapshots of the second transaction are identical");
            }
        );
    });
});

