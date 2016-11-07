/* globals Class: true, Siesta: true, JSON: true */
Class('Bryntum.Test', {

    isa  : Siesta.Test.ExtJS,
    does : [
        Bryntum.Data
    ],

    methods : {

        initialize : function() {
            this.SUPERARG(arguments);

            this.on('beforetestfinalizeearly', this.performPostTestSanityChecks);
        },

        performPostTestSanityChecks :  function() {
            if (!this.parent) {
                this.assertNoSuspendedLayouts();
            }
        },

        assertNoSuspendedLayouts : function() {
            var win     = this.global;
            var Ext     = win.Ext;

            if (Ext) {
                var suspendedComponents = this.cq('component{isLayoutSuspended()}');

                // only report in case of failure
                if (suspendedComponents.length > 0) {
                    this.diag('POST TEST SANITY CHECKS');

                    this.is(suspendedComponents.length, 0, 'No components found with layouts suspended');

                    this.fail('Suspended layouts detected for components', {
                        annotation : Ext.Array.map(suspendedComponents, function(cmp) { return (cmp.id + '(' + cmp.xtype + ') '); }).join('\r\n')
                    });
                }

                if (Ext.AbstractComponent.layoutSuspendCount > 0) {
                    this.is(Ext.AbstractComponent.layoutSuspendCount, 0, 'Layouts should not be suspended globally by accident');
                }
            }
        },

        safeSelect : function (selector, root) {
            var Ext = this.Ext();
            return Ext.get(Ext.DomQuery.selectNode(selector, root));
        },

        getFile : function (url, callback) {
            var t   = this,
                Ext = this.Ext(),
                as  = t.beginAsync();

            Ext.Ajax.request({
                url         : url,
                callback    : function(options, success, response) {
                    t.endAsync(as);

                    if (!success) t.fail('File [' + url + '] failed to load');

                    success && callback && callback(response.responseText);
                }
            });
        },


        setIframe : function (config) {
            config        = config || {};

            var _document = this.global.document;
            var iframe    = _document.body.appendChild(_document.createElement('iframe'));

            iframe.width  = 900;
            iframe.height = 400;

            var doc       = iframe.contentWindow.document;

            var onload    = config.onload;
            var html      = config.html;

            if (onload) {
                var t     = this,
                    async = t.beginAsync();

                iframe.onload = function () {
                    t.endAsync(async);
                    onload(doc, iframe);
                };
            }

            if (html) {
                doc.open();
                doc.write(html);
                doc.close();
            }

            return iframe;
        },

        assertDependencies : function (panel, schedulingViewEl, depViewEl) {
            var t               = this,
                schedulingView  = panel.getSchedulingView(),
                taskStore       = panel.getTaskStore();

            schedulingViewEl = schedulingViewEl || schedulingView.getEl();
            depViewEl = depViewEl || panel.getDependencyView().getEl();

            // loop over exported scheduling view rows
            t.$(schedulingView.itemSelector, schedulingViewEl).each(function () {

                var task = taskStore.getModelByInternalId(this.getAttribute('data-recordId'));

                for (var i = 0, deps = task.getIncomingDependencies(); i < deps.length; i++) {
                    var dep       = deps[i];

                    var eventEl   = t.$('.sch-gantt-item', this);

                    var arrowCtEl = t.$('.sch-dependency-arrow[data-sch-dependency-id='+ dep.internalId +']', depViewEl);

                    if (eventEl.length) {
                        var prefix    = 'Dependency: '+ dep.getId();

                        t.ok(arrowCtEl.length, prefix +' element found');
                        t.elementIsVisible(arrowCtEl.get(0), prefix +' element visible');

                        switch (true) {
                            case arrowCtEl.hasClass('sch-dependency-arrow-down'):

                                t.isApprox(Math.round(arrowCtEl.offset().left), Math.round(eventEl.offset().left), 4, prefix +' (bottom arrow) left is correct');
                                t.isApprox(Math.round(arrowCtEl.offset().top + arrowCtEl.outerHeight()), Math.round(eventEl.offset().top), 4, prefix +' (bottom arrow) top is correct');

                                break;

                            case arrowCtEl.hasClass('sch-dependency-arrow-right'):

                                var row = t.$(this);

                                t.isApprox(Math.round(arrowCtEl.offset().left + arrowCtEl.outerWidth()), Math.round(eventEl.offset().left), 4, prefix +' (right arrow) left is correct');
                                t.isApprox(Math.round(arrowCtEl.offset().top + arrowCtEl.outerHeight()/2), Math.round(row.offset().top + row.height()/2), 4, prefix +' (right arrow) top is correct');

                                break;
                        }
                    }
                }
            });
        },

        assertExportedPageDependencies : function (html, panel, desc, callback) {
            var t              = this,
                schedulingView = panel.getSchedulingView(),
                id             = schedulingView.el.id;

            // load html into iframe
            var iframe = this.setIframe({
                html   : html,
                onload : function (doc, iframe) {
                    t.diag(desc);

                    // exported dependency view el
                    var depView = t.$('.sch-dependencyview-ct', doc);
                    // exported scheduling view el
                    var viewEl = t.$('#'+ id, doc);

                    t.assertDependencies(panel, viewEl, depView);

                    callback(t, iframe, doc, html);
                }
            });

            return iframe;
        },


        isOnline : function () {
            return window.location.href.match(/bryntum\.com|ext-scheduler\.com/i);
        },

        dragOneTickForward : function (eventModel, scheduler, callback) {
            this.dragOneTick(eventModel, scheduler, callback);
        },

        dragOneTickBackward : function (eventModel, scheduler, callback) {
            this.dragOneTick(eventModel, scheduler, callback, true);
        },

        dragOneTick : function (eventModel, panel, callback, isBackward) {

            if (!panel.xtype) {
                callback = panel;
                panel    = null;
            }

            panel        = panel || this.cq1('ganttpanel');
            var eventEl  = panel.getSchedulingView().getElementFromEventRecord(eventModel);
            var distance = panel.timeAxisViewModel.getTickWidth() * (isBackward ? -1 : 1);

            this.dragBy(eventEl, [distance, 0], callback);
        },

        getFirstScheduleRowEl : function (panel) {
            return this.getNthScheduleRowEl(panel, 0);
        },

        getNthScheduleRowEl : function (panel, index) {
            var Ext = this.global.Ext;
            return Ext.get(panel.getSchedulingView().getNode(index));
        },

        getFirstTaskEl : function (gantt) {
            try {
                return gantt.getSchedulingView().getEl().down('.sch-gantt-item');
            } catch (e) {
                return null;
            }
        },

        getFirstLeafTaskEl : function (gantt) {
            try {
                return gantt.getSchedulingView().getElementFromEventRecord(this.getFirstLeafTask(gantt));
            } catch (e) {
                return null;
            }
        },

        getFirstTaskBarEl : function (gantt) {
            try {
                return gantt.getSchedulingView().getEl().down('.sch-gantt-task-bar');
            } catch (e) {
                return null;
            }
        },

        getFirstDependencyEl : function (gantt) {
            return gantt.getSchedulingView().getDependencyView().getDependencyElements().first();
        },

        getScheduler : function (config) {
            var Ext = this.global.Ext;

            return Ext.create('Sch.panel.SchedulerGrid', Ext.apply({
                eventResizeHandles : 'both',

                startDate : new Date(2011, 0, 3),
                endDate   : new Date(2011, 0, 13),

                viewPreset : 'dayAndWeek',

                width  : 800,
                height : 600,

                viewConfig : {
                    barMargin       : 2,
                    cellBorderWidth : 0
                },
                rowHeight  : 30,

                eventRenderer : function (item, r, tplData, row) {
                    var bgColor;

                    switch (row % 3) {
                        case 0:
                            bgColor = 'lightgray';
                            break;
                        case 1:
                            bgColor = 'orange';
                            break;
                        case 2:
                            bgColor = 'lightblue';
                            break;
                    }

                    tplData.style = "background-color:" + bgColor;
                    tplData.cls   = "custom-css-class";

                    return item.get('Name');
                },

                // Setup static columns
                columns : [
                    { header : 'Name', sortable : true, width : 100, dataIndex : 'Id' }
                ],

                resourceStore : this.getSchedulerResourceStore(),
                eventStore    : this.getEventStore()

            }, config || {}));
        },


        getFirstTaskWithOutgoingDeps : function (gantt) {
            var task;
            gantt.taskStore.getRootNode().cascadeBy(function (node) {
                if (node.getOutgoingDependencies().length > 0) {
                    task = node;
                    return false;
                }
            });
            return task;
        },

        getFirstParentTask : function (gantt) {
            var task;
            gantt.taskStore.getRootNode().cascadeBy(function (node) {
                if (!node.data.root && !node.isLeaf()) {
                    task = node;
                    return false;
                }
            });
            return task;
        },

        getFirstLeafTask : function (ganttOrTaskStore) {
            var task,
                store = ganttOrTaskStore instanceof this.global.Gnt.data.TaskStore ? ganttOrTaskStore : ganttOrTaskStore.taskStore;

            store.getRootNode().cascadeBy(function (node) {
                if (!task && node.isLeaf()) {
                    task = node;
                    return false;
                }
            });
            return task;
        },

        // Returns a gantt with minimal locked section
        getGantt2 : function (config, cls) {
            config.lockedGridConfig       = config.lockedGridConfig || {};
            config.lockedGridConfig.width = 50;

            return this.getGantt(config);
        },

        getGantt : function (config, cls) {
            var Ext  = this.global.Ext;
            var DATE = this.global.Sch.util.Date;
            var Date = this.global.Date;
            config   = config || {};

            return Ext.create(cls || 'Gnt.panel.Gantt', Ext.apply({
                height         : 350,
                width          : 1000,
                leftLabelField : 'Name',
                viewPreset     : 'weekAndDayLetter',
                startDate      : new Date(2010, 0, 4),
                endDate        : DATE.add(new Date(2010, 0, 4), DATE.WEEK, 10),


                // Setup your static columns
                columns : [
                    {
                        xtype : 'namecolumn'
                    },
                    {
                        xtype : 'startdatecolumn'
                    },
                    {
                        xtype : 'enddatecolumn'
                    },
                    {
                        xtype : 'percentdonecolumn'
                    }
                ],

                taskStore       : !config.crudManager && (config.taskStore || this.getTaskStore()),
                dependencyStore : !config.crudManager && (config.dependencyStore || this.getDependencyStore())
            }, config));
        },


        waitForEventsToRender : function (timelinePanel, callback, scope) {
            var Ext = this.global.Ext;

            if (!(timelinePanel instanceof Ext.Component)) {
                // For ease of testing a single scheduler, grab whatever we find
                scope         = callback;
                callback      = timelinePanel;
                timelinePanel = this.cq1('ganttpanel[lockable=true]');
            }

            if (!timelinePanel || !callback) {
                throw 'Must provide a panel to observe, and a callback function';
            }

            this.waitForSelector(timelinePanel.getSchedulingView().eventSelector, timelinePanel.el, callback, scope);
        },


        waitForTasksAndDependenciesToRender : function (timelinePanel, callback, scope) {
            var Ext = this.global.Ext;

            if (!(timelinePanel instanceof Ext.Component)) {
                // For ease of testing a single panel, grab whatever we find
                scope         = callback;
                callback      = timelinePanel;
                timelinePanel = this.cq1('ganttpanel');
            }

            this.waitForFn(function() {
                return timelinePanel.getDependencyView().isDependencyCanvasPresent() &&
                       timelinePanel.getDependencyView().getDependencyElements().getCount() > 0;
            }, callback, scope);
        },


        isDeeplyUnordered : function (array, toMatch, desc) {
            var Ext = this.global.Ext;

            if (!Ext.isArray(array) || !Ext.isArray(toMatch)) return this.isDeeply.apply(this, arguments);

            if (array.length != toMatch.length) {
                this.fail(desc);
                return;
            }

            var diff = Ext.Array.difference(array, toMatch);

            if (diff.length) {
                this.fail(desc);
            } else {
                this.pass(desc);
            }
        },


        isStartEnd : function (task, startDate, endDate, description) {
            var taskStartDate = task.getStartDate();
            var taskEndDate   = task.getEndDate();

            if (taskStartDate - startDate === 0 && taskEndDate - endDate === 0)
                this.pass(description);
            else
                this.fail(description, {
                    assertionName : 'isStartEnd',
                    got           : "start: " + taskStartDate + ", end: " + taskEndDate,
                    need          : "start: " + startDate + ", end: " + endDate,
                    annotation    : 'Task id: ' + task.getId()
                });
        },


        getBusinessTimeCalendar : function (config) {
            var Ext  = this.Ext();
            var Date = this.global.Date;

            return Ext.create('Gnt.data.calendar.BusinessTime', Ext.apply({

                data : [
                    {
                        Date : new Date(2011, 6, 16),

                        IsWorkingDay : true,

                        Availability : ['11:00-16:00', '17:00-20:00']
                    },
                    {
                        Date : new Date(2011, 6, 17),

                        IsWorkingDay : true,

                        Availability : ['12:00-16:00']
                    }
                ]
            }, config));
        },


        getCalendar : function (config) {
            var Ext = this.Ext();

            return Ext.create('Gnt.data.Calendar', Ext.apply({}, config));
        },


        sortByInternalId : function (records) {
            var Ext = this.Ext();

            return Ext.Array.sort(records, function (r1, r2) {
                var id1 = r1.getId(),
                    id2 = r2.getId();

                if (id1 > id2) return 1;
                if (id2 > id1) return -1;

                return 0;
            });
        },


        getTimeZone : function () {
            var Date = this.global.Date;
            var date = new Date();

            return date.toLocaleString().replace(/.*(GMT.*)/, '$1');
        },


        getDSTDates : function () {
            var Date      = this.global.Date;
            var yearStart = new Date(2012, 0, 1);
            var yearEnd   = new Date(2012, 11, 31);

            var dstDates = [];
            var prev;

            var Ext = this.Ext();

            for (var i = yearStart; i <= yearEnd; i = Ext.Date.add(i, Ext.Date.DAY, 1)) {
                var midnightOffset = new Date(2012, i.getMonth(), i.getDate()).getTimezoneOffset();
                var noonOffset     = new Date(2012, i.getMonth(), i.getDate(), 12).getTimezoneOffset();

                if (midnightOffset != noonOffset) dstDates.push(i);
            }

            return dstDates;
        },

        snapShotListeners : function (observable, name) {
            this._observableData = this._observableData || {};

            if (!name) throw 'Must provide a name for the observable';

            this._observableData[name] = this.global.Ext.apply({}, observable.hasListeners);

            // Delete new 4.2 properties
            if ('_decr_' in this._observableData[name]) {
                delete this._observableData[name]._decr_;
                delete this._observableData[name]._incr_;
            }
        },

        verifyListeners : function (observable, name, description) {
            var needListeners = this._observableData[name];
            var ok            = true;

            for (var o in observable.hasListeners) {
                // Skip some internal Ext JS stuff
                if (o !== "_decr_" && o !== "_incr_" && observable.hasListeners[o] !== needListeners[o]) {
                    this.is(observable.hasListeners[o], needListeners[o], (description || name) + ': ' + o);

                    ok = false;
                }
            }

            if (ok) {
                this.pass(description || name);
            }
        },

        moveByWithCallback : function (delta, callback, next) {
            var Ext = this.Ext();

            Ext.getBody().on('mousemove', callback);

            this.moveCursorBy(delta, function () {
                Ext.getBody().un('mousemove', callback);
                next();
            });
        },


        verifyCachedDependenciesState : function (taskStore, dependencyStore) {
            dependencyStore = dependencyStore || taskStore.dependencyStore;

            var me          = this;
            var tasksCopies = {};

            dependencyStore.each(function (dependency) {
                var from = dependency.getSourceTask(),
                    to   = dependency.getTargetTask();

                if (from) {
                    var fromId   = from.getId();
                    var fromCopy = tasksCopies[fromId] = tasksCopies[fromId] || { successors : [], predecessors : [] };

                    fromCopy.successors.push(dependency);
                }

                if (to) {
                    var toId   = to.getId();
                    var toCopy = tasksCopies[toId] = tasksCopies[toId] || { successors : [], predecessors : [] };

                    toCopy.predecessors.push(dependency);
                }
            });

            var stateIsCorrect = true;

            taskStore.forEachTaskUnordered(function (task) {
                var taskCopy = tasksCopies[task.getId()];

                if (!taskCopy) {
                    if (task.successors.length || task.predecessors.length || task.getOutgoingDependencies().length || task.getIncomingDependencies().length) {
                        me.fail("Missing dependencies for task: ", {
                            annotation : 'Task id : ' + task.getId()
                        });

                        return stateIsCorrect = false;
                    }
                } else {
                    if (
                        !me.compareObjects(taskCopy.successors, task.successors) ||
                        !me.compareObjects(taskCopy.successors, task.getOutgoingDependencies())
                    ) {
                        me.fail("Successors of copy and real task does not match", {
                            got  : task.successors,
                            need : taskCopy.successors,

                            annotation : 'Task id : ' + task.getId()
                        });

                        return stateIsCorrect = false;
                    }

                    if (
                        !me.compareObjects(taskCopy.predecessors, task.predecessors) ||
                        !me.compareObjects(taskCopy.predecessors, task.getIncomingDependencies())
                    ) {
                        me.fail("Predecessors of copy and real task does not match", {
                            got  : task.predecessors,
                            need : taskCopy.predecessors,

                            annotation : 'Task id : ' + task.getId()
                        });

                        return stateIsCorrect = false;
                    }
                }
            });

            if (stateIsCorrect) this.pass('Dependencies cache state is correct');
        },

        verifyCachedAssignmentsState : function (taskStore, assignmentStore) {
            var me                       = this,
                tasksRequiredAssignments = {},
                Ext                      = me.getExt();

            function mapAssignmentsToComparable(assignments) {
                return Ext.Array.map(assignments, function (assignment) {
                    return Ext.getClassName(assignment) + '[' + assignment.getId() + ']';
                });
            }

            assignmentStore = assignmentStore || taskStore.getAssignmentStore();

            // Manually build task id -> task assignments map
            Ext.Array.forEach(assignmentStore.getRange(), function (assignment) {
                var task = assignment.getTask(),
                    id, requiredAssignments;

                if (task) {
                    id                  = task.getId();
                    requiredAssignments = (tasksRequiredAssignments[id] = tasksRequiredAssignments[id] || []);
                    requiredAssignments.push(assignment);
                }
            });

            var stateIsCorrect = true;

            // Comparing map built manually with task model getAssignments() results
            taskStore.forEachTaskUnordered(function (task) {
                var id                  = task.getId(),
                    requiredAssignments = tasksRequiredAssignments[id] || [],
                    reportedAssignments = task.getAssignments();

                requiredAssignments = mapAssignmentsToComparable(requiredAssignments);
                reportedAssignments = mapAssignmentsToComparable(reportedAssignments);

                if (!me.compareObjects(requiredAssignments, reportedAssignments)) {
                    me.fail('Reported assignments and required assignments do not match', {
                        got        : reportedAssignments,
                        need       : requiredAssignments,
                        annotation : 'Task id : ' + id
                    });

                    stateIsCorrect = false;
                }

                return stateIsCorrect;
            });

            stateIsCorrect && this.pass('Assignments cache state is correct');
        },


        calculateGridViewElOffset : function (el) {
            var transform = el.style.transform || el.style.msTransform || el.style.webkitTransform;

            if (transform) {
                var match = /\(\d+px,\s*(\d+)px,\s*(\d+)px\)/.exec(transform);

                return Number(match[1]);
            } else
                return el.offsetTop;
        },

        // copied from Scheduler test class
        _checkBufferedRowsSynced : function (gantt, desc) {
            desc = desc || "Positions of rows in normal and locked views are synchronized";

            var normalView = gantt.normalGrid.getView();
            var lockedView = gantt.lockedGrid.getView();

            var normalNodes = normalView.all;
            var lockedNodes = lockedView.all;

            var sameCount = normalNodes.getCount() == lockedNodes.getCount();

            if (!sameCount) {
                return [desc, {
                    assertionName : 'bufferedRowsAreSync',
                    annotation    : "The number of nodes in normal and locked views does not match: " + normalNodes.getCount() + ' and ' + lockedNodes.getCount()
                }];
            }

            var sameStartIndex = normalNodes.startIndex == lockedNodes.startIndex;

            if (!sameStartIndex) {
                return [desc, {
                    assertionName : 'bufferedRowsAreSync',
                    annotation    : "The start indicies of normal and locked views does not match: " + normalNodes.startIndex + ' and ' + lockedNodes.startIndex
                }];
            }

            var recordCount = (normalView.store.buffered ? normalView.store.getTotalCount() : normalView.store.getCount());

            if (recordCount && (normalNodes.endIndex === recordCount - 1)) {
                // verifying that content does not goes outside of the strecther when showing the last row in the dataset

                var normalScrollable = normalView.getScrollable();
                var lockedScrollable = lockedView.getScrollable();

                var diff = normalScrollable.getSize().y - (this.calculateGridViewElOffset(normalView.body.dom) + normalView.body.dom.offsetHeight);

                if (Math.abs(diff) > 1) {
                    return [desc, {
                        assertionName : 'bufferedRowsAreSync',
                        annotation    : "The scrollable of the normal view has incorrect height: " + normalScrollable.getSize().y +
                        ' content ends at ' + (this.calculateGridViewElOffset(normalView.body.dom) + normalView.body.dom.offsetHeight)
                    }];
                }

                diff = lockedScrollable.getSize().y - (this.calculateGridViewElOffset(lockedView.body.dom) + lockedView.body.dom.offsetHeight);

                if (Math.abs(diff) > 1) {
                    return [desc, {
                        assertionName : 'bufferedRowsAreSync',
                        annotation    : "The scrollable of the locked view has incorrect height: " + lockedScrollable.getSize().y +
                        ' content ends at ' + (this.calculateGridViewElOffset(lockedView.body.dom) + lockedView.body.dom.offsetHeight)
                    }];
                }
            }

            var areTheSame = true;
            // 203_buffered_view_5 is failing due to 1px difference in 798'th record which is not crucial
            var threshold = this.Ext().isIE8 || this.Ext().isGecko ? 1 : 0;

            for (var i = normalNodes.startIndex; i <= normalNodes.endIndex; i++)
                if (Math.abs(normalNodes.item(i).getY() - lockedNodes.item(i).getY()) > threshold) {
                    areTheSame = false;
                    break;
                }

            if (areTheSame)
                return [desc];
            else
                return [desc, {
                    assertionName : 'bufferedRowsAreSync',
                    annotation    : "Vertical offset of normal row does not match to locked row: " + normalNodes.item(i).getY() + ' and ' + lockedNodes.item(i).getY()
                }];
        },

        bufferedRowsAreSync : function (gantt, description) {
            var result = this._checkBufferedRowsSynced(gantt, description);

            if (result) {
                if (result.length === 1) {
                    this.pass(result[0]);
                } else {
                    this.fail(result[0], result[1]);
                }
            }
        },

        waitForBufferedRowsSynced : function (gantt, callback) {
            var me = this;

            this.waitFor({
                method        : function () {
                    var result = me._checkBufferedRowsSynced(gantt);
                    return result && result.length === 1;
                },
                callback      : callback,
                assertionName : 'waitForBufferedRowsSynced',
                description   : ' buffered rows synced'
            })
        },


        getLocatorById : function (taskStore) {
            return function (id) {
                return taskStore.getNodeById(id);
            };
        },

        getAllColumns : function (columnConfig) {
            var Ext = this.Ext();

            columnConfig = columnConfig || {};

            var classes = Ext.ClassManager.getNamesByExpression('widget.ganttcolumn.*');

            return Ext.Array.map(classes, function (cls) {
                return Ext.create(cls, Ext.Object.chain(columnConfig));
            });
        },

        getAllPlugins : function () {
            var Ext = this.Ext();

            return Ext.Array.map(Ext.ClassManager.getNamesByExpression('Gnt.plugin.*'), function (cls) {
                return Ext.create(cls);
            });
        },

        validateGanttScheduler : function (gantt, scheduler) {
            var Ext = this.getExt();

            this.subTest('Events and tasks should be synced', function (t) {
                gantt.getTaskStore().getRootNode().cascadeBy(function (record) {
                    if (!record.hasResources()) return;

                    var taskRect = gantt.getSchedulingView().getElementFromEventRecord(record).getBox(),
                        events   = scheduler.el.query('.scheduler-event-' + record.getId());

                    Ext.each(events, function (event) {
                        var eventRect = Ext.get(event).getBox();
                        t.isApprox(eventRect.left, taskRect.left, 2, 'Left border is synced for task: ' + record.getName());
                        t.isApprox(eventRect.right, taskRect.right, 2, 'Right border is synced for task: ' + record.getName());
                    });
                });
            });
        },

        validateRollupGantt : function (gantt) {
            var Ext       = this.getExt();
            var doc       = this.global.document;
            var ganttView = gantt.normalGrid.getView();

            this.subTest('Tasks and rollups should be synced', function (t) {

                gantt.getTaskStore().getRootNode().cascadeBy(function (record) {

                    if (!record.isRoot() && record.isVisible() && !record.isLeaf()) {

                        var rollupCount = 0;

                        for (var i = 0; i < record.childNodes.length; i++) {

                            var child = record.childNodes[i];

                            if (child.getRollup()) {

                                var viewId   = gantt.normalGrid.getView().id;
                                var rollupId = viewId + '-rollup_' + child.getId();
                                var rollUpEl = Ext.get(rollupId);

                                t.ok(rollUpEl, 'Rollup element for ' + record.getName() + '\\' + child.getName() + ' found in dom');

                                if (rollUpEl) {

                                    rollupCount++;

                                    var leftEdge  = gantt.getSchedulingView().getCoordinateFromDate(child.getStartDate(), false);
                                    var rightEdge = gantt.getSchedulingView().getCoordinateFromDate(child.getEndDate(), false);
                                    var box       = rollUpEl.getRegion();

                                    // little increase for IE8
                                    var treshHold = child.isMilestone() ? 7 : 4;

                                    t.isApprox(leftEdge, box.left, treshHold, 'Rollup has correct left');
                                    t.isApprox(rightEdge, box.right, treshHold, 'Rollup has correct right');
                                }
                            }
                        }

                        t.is(Ext.fly(ganttView.getNode(record)).query('.sch-gantt-task, .sch-gantt-milestone').length, rollupCount);

                    }
                });

            });
        },

        waitForGridContent : function (grid, row, cell, text, callback) {
            if (text === '') {
                text = '&nbsp;';
            }

            this.waitFor(function () {
                var gridCmp = this.normalizeActionTarget(grid);

                if (gridCmp) {
                    var cellEl = this.getCell(grid, row, cell);
                    return cellEl && cellEl.dom.innerHTML.trim().match(text);
                }
            }, callback);
        },

        copy : function (row1, col1, row2, col2, next) {
            var args = [[col1, row1]];

            if (arguments.length < 4) {
                next = row2;
                args.push([col1, row1]);
            } else {
                args.push([col2, row2]);
            }

            var gantt = this.cq1('ganttpanel');
            gantt.selModel.selectCells.apply(gantt.selModel, args);

            this.type(gantt.lockedGrid.view.el, 'c', next, null, { ctrlKey : true });
        },

        paste : function (row, col, next) {
            var gantt = this.cq1('ganttpanel');

            this.click(this.getCell(gantt, row, col), function () {
                this.type(gantt.lockedGrid.view.el, 'v', next, null, { ctrlKey : true });
            })
        },

        debugChain : function (start, end, steps) {
            if (arguments.length === 1) {
                steps = start;
                start = null;
            }

            start = start || 0;
            end   = end ? (end + 1) : steps.length;

            steps = steps.slice(start, end).map(function (step, i) {

                return [
                    { diag : 'Playing ' + String(start + i) + '. ' + JSON.stringify(step) },
                    step
                ]
            })

            this.chain(steps);
        },

        withoutConsole : function(fn) {
            var me = this,
                console = me.global.console,
                oldError, oldWarn;

            if (console) {
                oldError = console.error;
                oldWarn  = console.warn;
                console.error = console.warn = function() {};
            }

            fn();

            if (console) {
                console.error = oldError;
                console.warn = oldWarn;
            }
        }
    }
    // eof methods
});
