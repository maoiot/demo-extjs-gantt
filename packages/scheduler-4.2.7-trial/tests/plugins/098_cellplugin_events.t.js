StartTest(function (t) {
    var plugin, scheduler;

    var checkBoxPosition = function (t, col, row) {
        var pXY = plugin.containerEl.getXY();
        var vXY = scheduler.getSchedulingView().getXY();
        var colWidth = scheduler.timeAxisViewModel.getTickWidth();
        var rowHeight = scheduler.timeAxisViewModel.getViewRowHeight();

        t.isDeeply(pXY, [vXY[0] + col * colWidth, vXY[1] + row * rowHeight], 'Position is correct');
    };

    var createBeforeeditListener = function (t, startDate, endDate, resource, callback) {
        plugin.on('beforecelledit', function (editor, selection) {
            t.isDeeply(selection[0], {
                startDate   : startDate,
                endDate     : endDate,
                resource    : resource
            }, 'Context is correct');

            callback && callback();
        }, null, { single : true });
    };

    var createCompleteeditListener = function (t, startDate, endDate, resource, callback) {
        plugin.on('completecelledit', function (editor, value, selection) {
            t.isDeeply(selection[0], {
                startDate   : startDate,
                endDate     : endDate,
                resource    : resource
            }, 'Context is correct');

            callback && callback();
        }, null, { single : true });
    };

    var setup = function (config) {
        config = config || {};

        plugin = new Sch.plugin.CellPlugin(Ext.apply(config.plugin || {}, {
            pluginId : 'cellplugin'
        }));

        scheduler = t.getScheduler(Ext.apply({
            eventStore      : t.getEventStore({}, 0),
            width       : 1000,
            height      : 500,
            startDate   : new Date(2014, 5, 12),
            endDate     : new Date(2014, 5, 12, 7),
            viewPreset  : 'hourAndDay',
            renderTo    : Ext.getBody(),
            plugins     : plugin
        }, config.scheduler || {}));
    };

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    t.it('Selection-related event arguments are correct', function (t) {
        setup();

        t.chain(
            function (next) {
                plugin.on('beforeselect', function (view, resource, startDate, endDate) {
                    t.is(resource.getId(), 'r3', 'Resource is correct');
                    t.is(startDate, new Date(2014, 5, 12, 1), 'Start date is correct');
                    t.is(endDate, new Date(2014, 5, 12, 2), 'End date is correct');
                }, this, { single : true });

                plugin.on('select', function (view, resource, startDate, endDate) {
                    t.is(resource.getId(), 'r3', 'Resource is correct');
                    t.is(startDate, new Date(2014, 5, 12, 1), 'Start date is correct');
                    t.is(endDate, new Date(2014, 5, 12, 2), 'End date is correct');
                }, this, { single : true });

                plugin.on('selectionchange', function (view, selection) {
                    t.isDeeply(selection, [{
                        startDate   : new Date(2014, 5, 12, 1),
                        endDate     : new Date(2014, 5, 12, 2),
                        resource    : scheduler.resourceStore.getAt(2)
                    }], 'Selection is correct');
                }, this, { single : true });

                t.waitForEvent(plugin, 'selectionchange', next);
                t.click(t.getRow(scheduler.normalGrid, 2), false, false, false, [195, 16]);
            },
            function (next) {
                plugin.on('beforeselect', function (view, resource, startDate, endDate) {
                    t.is(resource.getId(), 'r4', 'Resource is correct');
                    t.is(startDate, new Date(2014, 5, 12, 1), 'Start date is correct');
                    t.is(endDate, new Date(2014, 5, 12, 2), 'End date is correct');
                }, this, { single : true });

                plugin.on('select', function (view, resource, startDate, endDate) {
                    t.is(resource.getId(), 'r4', 'Resource is correct');
                    t.is(startDate, new Date(2014, 5, 12, 1), 'Start date is correct');
                    t.is(endDate, new Date(2014, 5, 12, 2), 'End date is correct');
                }, this, { single : true });

                plugin.on('selectionchange', function (view, selection) {
                    t.isDeeply(selection, [{
                        startDate   : new Date(2014, 5, 12, 1),
                        endDate     : new Date(2014, 5, 12, 2),
                        resource    : scheduler.resourceStore.getAt(3)
                    }], 'Selection is correct');
                }, this, { single : true });

                t.waitForEvent(plugin, 'selectionchange', next);
                t.click(t.getRow(scheduler.normalGrid, 3), false, false, false, [195, 14]);
            },
            function (next) {
                plugin.on('beforeselect', function (view, resource, startDate, endDate) {
                    t.is(resource.getId(), 'r5', 'Resource is correct');
                    t.is(startDate, new Date(2014, 5, 12, 2), 'Start date is correct');
                    t.is(endDate, new Date(2014, 5, 12, 3), 'End date is correct');
                }, this, { single : true });

                plugin.on('select', function (view, resource, startDate, endDate) {
                    t.is(resource.getId(), 'r5', 'Resource is correct');
                    t.is(startDate, new Date(2014, 5, 12, 2), 'Start date is correct');
                    t.is(endDate, new Date(2014, 5, 12, 3), 'End date is correct');
                }, this, { single : true });

                plugin.on('selectionchange', function (view, selection) {
                    t.isDeeply(selection, [{
                        startDate   : new Date(2014, 5, 12, 1),
                        endDate     : new Date(2014, 5, 12, 2),
                        resource    : scheduler.resourceStore.getAt(3)
                    }, {
                        startDate   : new Date(2014, 5, 12, 2),
                        endDate     : new Date(2014, 5, 12, 3),
                        resource    : scheduler.resourceStore.getAt(4)
                    }], 'Selection is correct');
                }, this, { single : true });

                t.waitForEvent(plugin, 'selectionchange', next);
                t.click(t.getRow(scheduler.normalGrid, 4), false, false, { ctrlKey : true }, [309, 18]);
            }
        );
    });

    t.it('Should cancel selection', function (t) {
        setup({
            plugin  : {
                singleClickEditing : false
            }
        });

        t.chain(
            function (next) {
                plugin.on('beforeselect', function () { return false; }, this, { single : true });
                plugin.on('beforecelledit', function () { return false; }, this, { single : true });
                plugin.on('beforecompletecelledit', function () { return false; }, this, { single : true });
                next();
            },
            { click: function () { return t.getRow(scheduler.normalGrid, 1); }, offset : [156, 20] },
            function (next) {
                t.notOk(plugin.containerEl, 'Selection change cancelled');
                t.waitForEvent(plugin, 'selectionchange', next);
                t.click(t.getRow(scheduler.normalGrid, 1), null, null, { offset : [156, 20] });
            },
            function (next) {
                plugin.beginEdit();
                t.notOk(plugin.editor.isVisible(), 'Begin edit is cancelled');
                plugin.beginEdit();
                t.ok(plugin.editor.isVisible(), 'Begin edit is not cancelled');
                plugin.completeEdit();
                t.ok(plugin.editor.isVisible(), 'Complete edit is cancelled');
                plugin.completeEdit();
                t.notOk(plugin.editor.isVisible(), 'Complete edit is not cancelled');
            }
        );
    });

    t.it('Should distinguish click and double click', function (t) {
        // to make test stabe make plugin to think two clicks within
        // 2 seconds is 1 doubleclick
        var dblClickTimeout = 2000;

        setup({
            plugin  : {
                dblClickTimeout : dblClickTimeout
            }
        });

        t.willFireNTimes(plugin, 'cellclick', 1);
        t.willFireNTimes(plugin, 'celldblclick', 1);
        t.wontFire(plugin, 'beforeselect');

        t.chain(
            function (next) {
                plugin.on('cellclick', function () { return false; }, this, { single : true });
                plugin.on('celldblclick', function () { return false; }, this, { single : true });

                next();
            },
            { click: function () { return t.getRow(scheduler.normalGrid, 1); }, offset : [156, 20] },
            { waitFor : dblClickTimeout },
            { dblclick: function () { return t.getRow(scheduler.normalGrid, 1); }, offset : [156, 20] }
        );
    });

    t.it('beforecelledit fires correct arguments', function (t) {
        setup();

        t.waitForRowsVisible(scheduler, function () {
            var resource = scheduler.resourceStore.getAt(0);
            createBeforeeditListener(t, new Date(2014, 5, 12, 1), new Date(2014, 5, 12, 2), resource);
            plugin.showEditorInCell({ tickIndex : 1, resourceIndex : 0 });
            plugin.beginEdit();

            createCompleteeditListener(t, new Date(2014, 5, 12, 1), new Date(2014, 5, 12, 2), resource);
            createBeforeeditListener(t, new Date(2014, 5, 12), new Date(2014, 5, 12, 1), resource);
            plugin.editPrevious();

            t.firesOk({
                observable  : plugin,
                events      : {
                    beforecelledit : 0
                },
                during      : function () {
                    plugin.editPrevious();
                },
                desc        : 'Should not fire beforecelledit event when navigating left from top/left cell'
            });

            plugin.showEditorInCell({ tickIndex : 6, resourceIndex : 5 });
            createBeforeeditListener(t, new Date(2014, 5, 12, 6), new Date(2014, 5, 12, 7), scheduler.resourceStore.last());
            plugin.beginEdit();
            t.firesOk({
                observable  : plugin,
                events      : {
                    beforecelledit : 0
                },
                during      : function () {
                    plugin.editNext();
                },
                desc        : 'Should not fire beforecelledit event when navigating right from bottom/right cell'
            })
        });
    });

    t.it('Should skip uneditable columns when tabbing', function (t) {
        setup();

        // only edit even hours
        plugin.on('beforecelledit', function (editor, selection) {
            return selection[0].startDate.getHours() % 2 === 0;
        }, null, { priority : -10 });

        t.chain(
            { waitForRowsVisible : scheduler },
            { click : '.sch-timetd', offset : [10, '50%'] },
            function (next) {
                var resource = scheduler.resourceStore.getAt(0);
                createBeforeeditListener(t, new Date(2014, 5, 12, 1), new Date(2014, 5, 12, 2), resource, function () {
                    createBeforeeditListener(t, new Date(2014, 5, 12, 2), new Date(2014, 5, 12, 3), resource);
                });
                plugin.editNext();
                checkBoxPosition(t, 2, 0);
                t.ok(plugin.editor.isVisible(), 'Editor is visible');

                createBeforeeditListener(t, new Date(2014, 5, 12, 3), new Date(2014, 5, 12, 4), resource, function () {
                    createBeforeeditListener(t, new Date(2014, 5, 12, 4), new Date(2014, 5, 12, 5), resource);
                });
                plugin.editNext();
                checkBoxPosition(t, 4, 0);
                t.ok(plugin.editor.isVisible(), 'Editor is visible');

                plugin.editPrevious();
                checkBoxPosition(t, 2, 0);
                t.ok(plugin.editor.isVisible(), 'Editor is visible');

                createBeforeeditListener(t, new Date(2014, 5, 12, 1), new Date(2014, 5, 12, 2), resource, function () {
                    createBeforeeditListener(t, new Date(2014, 5, 12), new Date(2014, 5, 12, 1), resource);
                });
                plugin.editPrevious();
                checkBoxPosition(t, 0, 0);
                t.ok(plugin.editor.isVisible(), 'Editor is visible');

                plugin.editPrevious();
                checkBoxPosition(t, 0, 0);
                t.ok(plugin.editor.isVisible(), 'Editor is visible');
                next();
            }
        )
    });
});