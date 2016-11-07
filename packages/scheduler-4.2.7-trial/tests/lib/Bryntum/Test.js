/* globals Class: true, JSON: true */
Class('Bryntum.Test', {

    isa : Siesta.Test.ExtJS,


    methods : {

        initialize : function() {
            this.SUPERARG(arguments);

            this.on('beforetestfinalizeearly', this.performPostTestSanityChecks);
        },

        performPostTestSanityChecks :  function() {
            if (!this.parent) {
                this.assertNoSuspendedLayouts();

                // Exclude examples
                if (!this.harness.getScriptDescriptor(this.url).pageUrl) {
                    this.assertNoUnscopedCssClasses();
                }

                this.assertNoDomGarbage();
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

        // Look for elements with unprefixed CSS classes
        assertNoUnscopedCssClasses : function() {
            var Ext             = this.Ext();

            if (Ext) {
                var allowedPrefixes = ['x-', 'sch-'];
                var re              = new RegExp('\\b' + allowedPrefixes.join('|\\b'));
                var els             = Ext.select('body [class]');
                var me              = this;

                els.each(function(el) {
                    var classes = el.dom.className.split(/\s+/);

                    Ext.Array.each(classes, function(cls) {
                        if (cls && !re.test(cls)) {
                            me.like(cls, re, 'Unprefixed CSS class name');
                        }
                    });
                });
            }
        },

        assertNoDomGarbage : function() {
            var body   = this.global.document.body;
            var invalid = [
                '[id*="undefined"]',
                '[id*="null"]',
                '[class*="undefined"]',
                '[class*="null"]'
            ];

            if (body.innerHTML.match('NaN')) {
                this.contentNotLike(body, 'NaN', 'No "NaN" string found in DOM');
            }

            if (this.$(invalid.join(','), body).length) {
                this.selectorNotExists(invalid, 'No DOM attribute garbage found in DOM');
            }
        },

        safeSelect  : function (selector, root) {
            var Ext = this.Ext();
            return Ext.get(Ext.DomQuery.selectNode(selector, root));
        },

        isOnline : function () {
            return window.location.href.match(/bryntum\.com|ext-scheduler\.com/i);
        },

        dragOneTickForward: function (eventModel, scheduler, callback) {
            this.dragOneTick(eventModel, scheduler, callback);
        },

        dragOneTickBackward: function (eventModel, scheduler, callback) {
            this.dragOneTick(eventModel, scheduler, callback, true);
        },

        dragOneTick : function (eventModel, scheduler, callback, isBackward) {

            if (!scheduler.xtype) {
                callback = scheduler;
                scheduler = null;
            }

            scheduler = scheduler || this.cq1('schedulergrid, schedulertree');
            var eventEl = scheduler.getSchedulingView().getElementFromEventRecord(eventModel);

            var distance = scheduler.timeAxisViewModel.getTickWidth() * (isBackward ? -1 : 1);
            var delta = scheduler.getOrientation() === 'horizontal' ? [distance, 0] : [0, distance];

            this.dragBy(eventEl, delta, callback);
        },

        waitForEventsVisible : function (scheduler, cb) {
            if (!(scheduler instanceof this.global.Ext.panel.Table)) {
                cb = scheduler;
                scheduler = this.cq1('schedulerpanel');
            }

            this.waitForSelector(scheduler.getSchedulingView().eventSelector, cb);
        },

        waitForCSSTransition : function (el, bufferTimeout, cb) {
            var Ext = this.Ext();
            if (!Ext.isIE9m) {
                var func = function () {
                    el.dom.removeEventListener('transitionend', func);
                    cb();
                }
                func = Ext.Function.createBuffered(func, bufferTimeout);
                el.dom.addEventListener('transitionend', func);
            } else {
                this.waitFor(bufferTimeout, function () { cb.apply(this, arguments); });
            }
        },

        getTimeAxis : function (presetName, cfg) {
            var Date = this.global.Date;
            var Sch = this.global.Sch;
            var Ext = this.Ext();

            var preset  = Sch.preset.Manager.getPreset(presetName);

            var timeAxisCfg = Ext.apply({
                unit                : preset.getBottomHeader().unit,
                increment           : preset.getBottomHeader().increment || 1,
                resolutionUnit      : preset.timeResolution.unit,
                resolutionIncrement : preset.timeResolution.increment,

                weekStartDay        : 1,

                mainUnit            : preset.getMainHeader().unit,
                shiftUnit           : preset.shiftUnit,

                start               : new Date(2010, 1, 1),
                end                 : new Date(2010, 1, 11),

                shiftIncrement      : preset.shiftIncrement || 1,
                defaultSpan         : preset.defaultSpan || 1
            }, cfg);

            var timeAxis = new Sch.data.TimeAxis();
            timeAxis.reconfigure(timeAxisCfg);

            return timeAxis;
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


        getFile : function (url, callback) {
            var t   = this,
                Ext = this.Ext(),
                as  = t.beginAsync();

            Ext.Ajax.request({
                url         : url,
                callback    : function (options, success, response) {
                    t.endAsync(as);

                    if (!success) t.fail('File [' + url + '] failed to load');

                    success && callback && callback(response.responseText);
                }
            })
        },

        getFirstScheduleRowEl : function (panel) {
            var Ext = this.global.Ext;
            return Ext.get(panel.getSchedulingView().getNode(0));
        },

        getFirstScheduleCellEl : function (panel) {
            var Ext = this.global.Ext;
            return Ext.get(panel.getSchedulingView().getCellByPosition({row : 0, column : 0 }));
        },

        getFirstEventEl : function (scheduler) {
            var v = scheduler.getSchedulingView();
            try {
                return v.getEl().down(v.eventSelector);
            } catch (e) {
                return null;
            }
        },

        getResourceStore : function (config) {
            var Ext = this.global.Ext;

            return new this.global.Sch.data.ResourceStore(Ext.apply({

                data : [
                    { Id : 'r1', Name : 'Mike' },
                    { Id : 'r2', Name : 'Linda' },
                    { Id : 'r3', Name : 'Don' },
                    { Id : 'r4', Name : 'Karen' },
                    { Id : 'r5', Name : 'Doug' },
                    { Id : 'r6', Name : 'Peter' }
                ]
            }, config || {}));
        },

        getResourceStore2 : function (config, nbrResources) {
            var Ext = this.getExt();

            return new this.global.Sch.data.ResourceStore(Ext.apply({
                data    : (function () {
                    var resources = [];
                    for (var i = 1; i <= nbrResources; i++) {
                        resources.push({
                            Id         : 'r' + i,
                            Name       : 'Resource ' + i
                        });
                    }

                    return resources;
                })()
            }, config));
        },

        getResourceTreeStore : function (config) {
            var Ext = this.global.Ext;

            var treeStore = new this.global.Sch.data.ResourceTreeStore(Ext.apply({

                autoSync : false,
                autoLoad : false,

                proxy : {
                    type   : 'memory',
                    reader : {
                        type : 'json'
                    },
                    data   : [
                        {
                            expanded : true,

                            children : [
                                {
                                    Id : "r1",

                                    Name     : 'Kastrup Airport',
                                    iconCls  : 'sch-airport',
                                    expanded : true,

                                    children : [
                                        {
                                            Id       : "r2",
                                            Name     : 'Terminal A',
                                            iconCls  : 'sch-terminal',
                                            expanded : false,

                                            children : [
                                                {
                                                    Id       : "r3",
                                                    Name     : 'Gates 1 - 5',
                                                    iconCls  : 'sch-gates-bundle',
                                                    expanded : true,

                                                    children : [
                                                        {
                                                            Id : "r4",

                                                            Name    : 'Gate 1',
                                                            leaf    : true,
                                                            iconCls : 'sch-gate'
                                                        },
                                                        {
                                                            Id : "r5",

                                                            Name    : 'Gate 2',
                                                            leaf    : true,
                                                            iconCls : 'sch-gate'
                                                        },
                                                        {
                                                            Id : "r6",

                                                            Name    : 'Gate 3',
                                                            leaf    : true,
                                                            iconCls : 'sch-gate'
                                                        },
                                                        {
                                                            Id : "r7",

                                                            Name    : 'Gate 4',
                                                            leaf    : true,
                                                            iconCls : 'sch-gate'
                                                        },
                                                        {
                                                            Id : "r8",

                                                            Name    : 'Gate 5',
                                                            leaf    : true,
                                                            iconCls : 'sch-gate'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            Id : "r42222",

                                            Name    : 'Gate 1214312421',
                                            leaf    : true,
                                            iconCls : 'sch-gate'
                                        }
                                    ]
                                }
                                // eof Kastrup
                            ]
                            // eof top level
                        }
                    ]
                    // eof data
                },

                root : {
                    loaded   : true,
                    expanded : true
                }

            }, config || {}));

            treeStore.load();

            return treeStore;
        },


        getEventStore : function (config, nbrEvents) {
            var Ext = this.global.Ext;
            var Date = this.global.Date;
            nbrEvents = Ext.isNumber(nbrEvents) ? nbrEvents : 5;

            return Ext.create('Sch.data.EventStore', Ext.apply({

                data : (function () {
                    var events = [];
                    for (var i = 1; i <= nbrEvents; i++) {
                        events.push({
                            Id         : i,
                            ResourceId : 'r' + i,
                            Name       : 'Assignment ' + i,
                            StartDate  : new Date(2011, 0, 3 + i),
                            EndDate    : new Date(2011, 0, 5 + i)
                        });
                    }

                    return events;
                })()
            }, config || {}));
        },

        getDependencyStore : function (config, nbrEvents) {
            var Ext = this.global.Ext;

            nbrEvents = Ext.isNumber(nbrEvents) ? nbrEvents : 5;

            return Ext.create('Sch.data.DependencyStore', Ext.apply({

                data : (function() {
                    var dependencies = [];
                    for (var i = 1; i <= nbrEvents - 1; i++) {
                        dependencies.push({
                            Id : i,
                            From : i,
                            To : i + 1
                        });
                    }
                    return dependencies;
                })()

            }, config || {}));
        },

        getScheduler : function (config, nbrEvents) {
            config = config || {};
            var Date = this.global.Date;

            // Secret flag to easily get a scheduler tree
            if (config.__tree) {
                return this.getSchedulerTree(config, nbrEvents);
            }

            if (config.dependencyStore === true) {
                config.dependencyStore = this.getDependencyStore({}, nbrEvents);
            }

            if (!("startDate" in config)) {
                config.startDate = new Date(2011, 0, 3);
                config.endDate   = new Date(2011, 0, 13);
            }

            var Ext = this.global.Ext;

            return Ext.create('Sch.panel.SchedulerGrid', Ext.apply({
                eventResizeHandles : 'both',

                viewPreset : 'dayAndWeek',

                width  : 800,
                height : 400,

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
                    tplData.cls = "sch-custom-css-class";

                    return item.get('Name');
                },

                // Setup static columns
                columns       : [
                    { header : 'Name', sortable : true, width : 100, dataIndex : 'Name' }
                ],

                resourceStore   : this.getResourceStore(),
                eventStore      : this.getEventStore({}, nbrEvents)

            }, config));
        },

        getSchedulerTree : function (config, nbrEvents) {
            config = config || {};
            var Date = this.global.Date;
            var Ext = this.global.Ext;

            return Ext.create('Sch.panel.SchedulerTree', Ext.apply({
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
                    tplData.cls = "sch-custom-css-class";

                    return item.get('Name');
                },

                // Setup static columns
                columns       : [
                    { header : 'Name', sortable : true, width : 100, dataIndex : 'Name', xtype : 'treecolumn' }
                ],

                resourceStore : this.getResourceTreeStore(),
                eventStore    : this.getEventStore(nbrEvents)

            }, config));
        },

        waitForEventsToRender : function (timelinePanel, callback, scope) {
            var Ext = this.global.Ext;

            if (!(timelinePanel instanceof Ext.Component)) {
                // For ease of testing a single scheduler, grab whatever we find
                scope = callback;
                callback = timelinePanel;
                timelinePanel = this.cq1('schedulergrid[lockable=true], schedulertree[lockable=true]');
            }

            if (!callback) {
                throw 'Must provide a panel to observe, and a callback function';
            }

            this.waitFor({
                method        : function () {
                    if (timelinePanel.el && timelinePanel.lockedGrid.getView().getNode(0)) {
                        var events = timelinePanel.el.select(timelinePanel.getSchedulingView().eventSelector);

                        if (events.getCount() > 0) {
                            return events;
                        }
                    }
                },
                callback      : callback,
                scope         : scope,
                assertionName : 'waitForEventsToRender',
                description   : ' events to render'
            });
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
            this.isDeeply(
                { startDate : task.getStartDate(), endDate : task.getEndDate() },
                { startDate : startDate, endDate : endDate },
                description
            );
        },


        getTimeZone : function () {
            var Date = this.global.Date;
            var date = new Date();

            return date.toLocaleString().replace(/.*(GMT.*)/, '$1');
        },


        getDSTDates : function () {
            var Date = this.global.Date;
            var yearStart = new Date(2012, 0, 1);
            var yearEnd = new Date(2012, 11, 31);

            var dstDates = [];

            var Ext = this.Ext();

            for (var i = yearStart; i <= yearEnd; i = Ext.Date.add(i, Ext.Date.DAY, 1)) {
                var midnightOffset = new Date(2012, i.getMonth(), i.getDate()).getTimezoneOffset();
                var noonOffset = new Date(2012, i.getMonth(), i.getDate(), 12).getTimezoneOffset();

                if (midnightOffset != noonOffset) dstDates.push(i);
            }

            return dstDates;
        },

        rowHeightsAreInSync : function (lockableGrid, message) {
            var lockedEls = lockableGrid.lockedGrid.getView().getEl().select('tr');
            var normalEls = lockableGrid.normalGrid.getView().getEl().select('tr');
            var me = this;

            lockedEls.each(function (lockedRow, collection, i) {
                me.is(lockedRow.getHeight(), normalEls.item(i).getHeight(), (message ? message + ': ' : '') + 'Row heights synced: ' + i);
            });
        },


        calculateGridViewElOffset : function (el) {
            var transform       = el.style.transform || el.style.msTransform || el.style.webkitTransform;

            if (transform) {
                var match       = /\(\d+px,\s*(\d+)px,\s*(\d+)px\)/.exec(transform);

                return Number(match[ 1 ]);
            } else
                return el.offsetTop;
        },


        bufferedRowsAreSync : function (grid, desc) {
            desc = desc || "Positions of rows in normal and locked views are synchronized";

            var normalView = grid.normalGrid.getView();
            var lockedView = grid.lockedGrid.getView();

            var normalNodes = normalView.all;
            var lockedNodes = lockedView.all;

            var sameCount = normalNodes.getCount() == lockedNodes.getCount();

            if (!sameCount) {
                this.fail(desc, {
                    assertionName : 'bufferedRowsAreSync',
                    annotation    : "The number of nodes in normal and locked views does not match: " + normalNodes.getCount() + ' and ' + lockedNodes.getCount()
                });
                return;
            }

            var sameStartIndex = normalNodes.startIndex == lockedNodes.startIndex;

            if (!sameStartIndex) {
                this.fail(desc, {
                    assertionName : 'bufferedRowsAreSync',
                    annotation    : "The start indicies of normal and locked views does not match: " + normalNodes.startIndex + ' and ' + lockedNodes.startIndex
                });
                return;
            }

            var recordCount = (normalView.store.buffered ? normalView.store.getTotalCount() : normalView.store.getCount());

            if (recordCount && (normalNodes.endIndex === recordCount - 1)) {
                // verifying that content does not goes outside of the strecther when showing the last row in the dataset

                var normalScrollable = normalView.getScrollable();
                var lockedScrollable = lockedView.getScrollable();

                var diff            = normalScrollable.getSize().y - (this.calculateGridViewElOffset(normalView.body.dom) + normalView.body.dom.offsetHeight);

                if (Math.abs(diff) > 1) {
                    this.fail(desc, {
                        assertionName : 'bufferedRowsAreSync',
                        annotation    : "The scrollable of the normal view has incorrect height: " + normalScrollable.getSize().y +
                        ' content ends at ' + (this.calculateGridViewElOffset(normalView.body.dom) + normalView.body.dom.offsetHeight)
                    });
                    return;
                }

                diff                = lockedScrollable.getSize().y - (this.calculateGridViewElOffset(lockedView.body.dom) + lockedView.body.dom.offsetHeight);

                if (Math.abs(diff) > 1) {
                    this.fail(desc, {
                        assertionName : 'bufferedRowsAreSync',
                        annotation    : "The scrollable of the locked view has incorrect height: " + lockedScrollable.getSize().y +
                        ' content ends at ' + (this.calculateGridViewElOffset(lockedView.body.dom) + lockedView.body.dom.offsetHeight)
                    });
                    return;
                }
            }

            var areTheSame = true;

            var threshold = this.getExt().isIE8 ? 1 : 0;

            for (var i = normalNodes.startIndex; i <= normalNodes.endIndex; i++)
                if (Math.abs(normalNodes.item(i).getY() - lockedNodes.item(i).getY()) > threshold) {
                    areTheSame = false;
                    break;
                }

            if (areTheSame)
                this.pass(desc);
            else
                this.fail(desc, {
                    assertionName : 'bufferedRowsAreSync',
                    annotation    : "Vertical offset of normal row does not match to locked row: " + normalNodes.item(i).getY() + ' and ' + lockedNodes.item(i).getY()
                });
        },

        _checkColumnLinesSynced : function (scheduler, description) {
            if (scheduler.columnLines && scheduler.isHorizontal()) {
                var Ext         = this.getExt();
                var lines       = scheduler.el.select('.sch-column-line', scheduler.el);
                var headerCells = scheduler.el.select('.sch-header-row-' + scheduler.getSchedulingView().timeAxisViewModel.columnLinesFor + ' td', scheduler.el);

                if (headerCells.elements.length != lines.elements.length + 1) {
                    return [description || 'Column lines synced', {
                        assertionName   : 'columnLinesSynced',
                        got             : headerCells.elements.length,
                        need            : lines.elements.length,
                        gotDesc         : "Number of header els",
                        needDesc        : "Number of lines el",
                        annotation      : "NOTE: `number of lines` should be `number of headers` - 1"
                    }];
                }
                var rtl = scheduler.rtl;

                for (var i = 0; i < lines.elements.length; i++) {
                    var headerPos       = rtl ? headerCells.elements[i].getBox().left : headerCells.elements[i].getBox().right;
                    var linePos         = lines.elements[i].getBox().right;

                    if (linePos != headerPos) {
                        return [description || 'Column lines synced', {
                            assertionName   : 'columnLinesSynced',
                            got             : linePos,
                            need            : headerPos,
                            gotDesc         : "Position of line element",
                            needDesc        : "Position of header element",
                            annotation      : "Line element index: " + i
                        }];
                    }
                }

                var view    = scheduler.getSchedulingView();
                var rows    = view.el.query(Ext.grid.View.prototype.itemSelector);

                if (rows.length) {
                    // in IE, `clientWidth` for <tr> elements is 0 for some reason
                    var rowWidth    = rows[ 0 ].offsetWidth;
                    var totalWidth  = 0;

                    Ext.each(scheduler.normalGrid.headerCt.columnManager.columns, function (column) {
                        if (!column.locked) {
                            totalWidth += column.getWidth();
                        }
                    });

                    if (rowWidth != totalWidth) {
                        return [description || 'Column lines synced', {
                            assertionName   : 'columnLinesSynced',
                            got             : rowWidth,
                            need            : totalWidth,
                            gotDesc         : "Rows width",
                            needDesc        : "Total width"
                        }];
                    }
                }

                return [description || 'Lines coordinates and column headers are synced'];
            }
        },

        columnLinesSynced   : function (scheduler, description) {
            var result = this._checkColumnLinesSynced(scheduler, description);

            if (result) {
                if (result.length === 1) {
                    this.pass(result[0]);
                } else {
                    this.fail(result[0], result[1]);
                }
            }
        },

        waitForColumnLinesSynced : function (scheduler, callback) {
            var me = this;

            this.waitFor({
                method : function () {
                    var result = me._checkColumnLinesSynced(scheduler);
                    return result && result.length === 1;
                },
                callback : callback,
                assertionName : 'waitForColumnLinesSynced',
                description   : ' column lines synced'
            })
        },

        getAllPlugins : function() {
            var Ext = this.Ext();

            return Ext.Array.map(Ext.ClassManager.getNamesByExpression('Sch.plugin.*'), function(cls) {
                if (cls === 'Sch.plugin.EventEditor') {
                    return Ext.create(cls, { fieldsPanelConfig : { xtype : 'form' }});
                }

                if (cls.match(/ResourceZones/)) {
                    return Ext.create(cls, { store : Ext.create('Sch.data.EventStore', { proxy : 'memory' })});
                }
                else if (cls.match(/Lines|Zones/)) {
                    return Ext.create(cls, { store : Ext.create('Ext.data.Store', { fields : [], proxy : 'memory' })});
                }
                return Ext.create(cls);
            });
        },

        schedulerRowsSynced : function (scheduler) {
            if (scheduler.isHorizontal()) {
                var view        = scheduler.getSchedulingView();
                var Ext         = this.getExt();
                var rows        = view.el.query(Ext.grid.View.prototype.itemSelector);
                var width       = view.timeAxisViewModel.getTotalWidth();

                for (var i = 0; i < rows.length; i++) {
                    var rowWidth = Ext.fly(rows[i]).getWidth();
                    if (Math.abs(rowWidth - width) > 1) {
                        this.fail('Rows synced', {
                            assertionName   : 'schedulerRowsSynced',
                            got             : rowWidth,
                            need            : width,
                            gotDesc         : "Rows width",
                            needDesc        : "Total width"
                        });
                        return;
                    }
                }

                this.pass('Row width synced');
            }
        },

        lockedAndNormalRowsSynced   : function (scheduler) {
            var Ext         = this.getExt();

            if (scheduler.isHorizontal()) {
                var lockedNodes = scheduler.view.lockedView.getNodes();
                var normalNodes = scheduler.view.normalView.getNodes();

                var node1, node2;

                for (var i = 0; i < lockedNodes.length; i++) {
                    node1 = Ext.get(lockedNodes[i]);
                    node2 = Ext.get(normalNodes[i]);

                    if (node1.getY() !== node2.getY()) {
                        this.fail('Vertical coordinates out of sync');
                    }
                    if (node1.getHeight() !== node2.getHeight()) {
                        this.fail('Height is out of sync');
                    }
                }
            }
        },

        snapShotListeners : function(observable, name) {
            this._observableData = this._observableData || {};

            if (!name) throw 'Must provide a name for the observable';

            this._observableData[name] = this.global.Ext.apply({}, observable.hasListeners);

            // Delete new 4.2 properties
            if ('_decr_' in this._observableData[name]) {
                delete this._observableData[name]._decr_;
                delete this._observableData[name]._incr_;
            }
        },

        verifyListeners : function(observable, name, description) {
            var needListeners = this._observableData[name];
            var ok = true;

            for (var o in observable.hasListeners) {
                // Skip some internal Ext JS stuff
                if (o !== "_decr_" && o !== "_incr_" && observable.hasListeners[o] !== needListeners[o]) {
                    this.is(observable.hasListeners[o], needListeners[o], (description || name)  + ': ' + o);

                    ok = false;
                }
            }

            if (ok) {
                this.pass(description || name);
            }
        },

        scrollTo : function (scheduler, pos, next) {

            var normalEl = scheduler.getSchedulingView().getEl(),
                lockedEl = scheduler.lockedGrid.getView().getEl();

            var me = this;

            this.scrollVerticallyTo(normalEl, pos, 300, function () {
                me.scrollVerticallyTo(lockedEl, pos, 0, next);
            });
        },

        mountJsonResponse : function(url, data, cfg) {
            var response = {};
            var Ext = this.Ext();

            response[url] = {
                stype : 'json',  // use JsonSimlet (stype is like xtype for components)
                data  : data
            };

            Ext.ux.ajax.SimManager.init(Ext.apply({ delay : 10 }, cfg)).register(response);
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
        }
    }
});
