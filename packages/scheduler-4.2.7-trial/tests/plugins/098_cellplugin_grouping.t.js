StartTest(function (t) {
    Ext.define('Sch.model.TempResource', {
        extend  : 'Sch.model.Resource',
        fields  : ['Group']
    });

    var plugin,
        scheduler;

    var setup = function (config) {
        scheduler && scheduler.destroy();

        plugin = new Sch.plugin.CellPlugin();

        scheduler = t.getScheduler(Ext.apply({
            eventStore      : t.getEventStore({}, 0),
            resourceStore   : t.getResourceStore({
                groupField  : 'Group',
                model       : 'Sch.model.TempResource',
                data        : (function () {
                    var resources = [];
                    for (var i = 1; i <= 3; i++) {
                        for (var j = 1; j <= 3; j++) {
                            resources.push({
                                Id          : 'r' + i + j,
                                Name        : 'Resource ' + i + j,
                                Group       : 'Group' + i
                            });
                        }
                    }
                    return resources;
                })()
            }),
            width       : 1000,
            height      : 500,
            startDate   : new Date(2014, 5, 12),
            endDate     : new Date(2014, 5, 12, 7),
            viewPreset  : 'hourAndDay',
            renderTo    : Ext.getBody(),
            plugins     : plugin,

            viewConfig    : {
                horizontalLayoutCls : 'Sch.eventlayout.Table'
            },

            eventRenderer : function (eventRec, resourceRec, templateData) {
                templateData.cls = eventRec.getId();
            },

            features    : [{
                id                 : 'group',
                ftype              : 'scheduler_grouping',
//                hideGroupedHeader  : true,
                enableGroupingMenu : false,
                groupHeaderTpl     : [
                    '{name:this.getName}',
                    '<div id="{name:this.getName}"></div>',
                    {
                        getName: function(name) {
                            return Ext.String.trim(name);
                        }
                    }
                ]
            }]
        }, config || {}));
    };

    var getCellPosition = function (col, resource) {
        var view = scheduler.getSchedulingView();
        var viewXY  = view.getXY();
        var scroll  = view.getScroll();

        var node    = Ext.get(view.getNodeByRecord(resource)).down(view.rowSelector);
        var width   = scheduler.timeAxisViewModel.getTickWidth();
        return [viewXY[0] + width * col - scroll.left, node.getY()];
    };

    var getEventBoxes = function (up) {
        var view = scheduler.getSchedulingView();
        up = up ? -1 : 1;

        return Ext.Array.sort(view.el.query('.sch-event'), function (box1, box2) {
            return up * (Ext.fly(box1).getTop() - Ext.fly(box2).getTop());
        });
    };

    var checkDimensions = function (t, box, col, resource, eventBox) {
        var view    = scheduler.getSchedulingView();
        var boxXY   = box.getXY();

        var height, width, node, cellXY;

        if (eventBox) {
            eventBox = Ext.get(eventBox);
            height   = eventBox.getHeight();
            width    = eventBox.getWidth();
            cellXY   = eventBox.getXY();
        } else {
            node     = Ext.get(view.getRowByRecord(resource));
            height   = node.getHeight();
            width    = scheduler.timeAxisViewModel.getTickWidth();
            cellXY   = getCellPosition(col, resource);
        }

        box.select('.sch-cellplugin-border-vertical').each(function (el) {
            t.isApprox(Ext.fly(el).getHeight(), height, 1, 'Box border height is correct');
        });

        box.select('.sch-cellplugin-border-horizontal').each(function (el) {
            t.isApprox(Ext.fly(el).getWidth(), width, 1, 'Box border width is correct');
        });

        t.isApprox(boxXY[0], cellXY[0], 1, 'Horizontal position is correct');
        t.isApprox(boxXY[1], cellXY[1], 1, 'Vertical position is correct');
    };

    t.it('Should destroy highlighter when group with selected resource is collapsed', function (t) {
        setup();

        t.chain(
            { click : function () { return t.getRow(scheduler.normalGrid, 4); }, offset : [77, 11] },
            { click : ".x-grid-group-title:contains(Group2)" },
            function (next) {
                t.selectorNotExists('.sch-cellplugin-highlighter', 'Highlighter is hidden');
                t.notOk(plugin.containerEl, 'Highlighter removed');
                next();
            },
            { click : function () { return t.getCell(scheduler, 0, 0); } },
            function (next) {
                t.elementIsVisible(plugin.containerEl, 'Highlighter is visible');
                t.notOk(plugin.editor.isVisible(), 'Editor is not visible');
            }
        );
    });

    t.it('Should update/move highlighter when previous group is collapsed', function (t) {
        setup({
            eventStore  : t.getEventStore({
                data    : [
                    { StartDate : new Date(2014, 5, 12, 1), EndDate : new Date(2014, 5, 12, 2), ResourceId : 'r32', Id : 'e1' },
                    { StartDate : new Date(2014, 5, 12, 1), EndDate : new Date(2014, 5, 12, 2), ResourceId : 'r32', Id : 'e2' },
                    { StartDate : new Date(2014, 5, 12, 1), EndDate : new Date(2014, 5, 12, 2), ResourceId : 'r32', Id : 'e3' }
                ]
            })
        });

        t.chain(
            { click : function () { return scheduler.getSchedulingView().getRowByRecord(scheduler.resourceStore.getAt(6)); }, offset : [93, 14] },
            { click : ".x-grid-group-title:contains(Group2)" },
            function () {
                var box = plugin.containerEl;
                checkDimensions(t, box, 0, scheduler.resourceStore.getAt(6));
                plugin.moveUp(true);
                checkDimensions(t, box, 0, scheduler.resourceStore.getAt(2));
                plugin.moveRight(true);
                checkDimensions(t, box, 1, scheduler.resourceStore.getAt(2));
                plugin.moveDown(true);
                checkDimensions(t, box, 1, scheduler.resourceStore.getAt(6));
                plugin.moveLeft(true);
                checkDimensions(t, box, 0, scheduler.resourceStore.getAt(6));

                plugin.moveLeft(true);
                checkDimensions(t, box, scheduler.timeAxis.getCount() - 1, scheduler.resourceStore.getAt(2));
                plugin.moveRight(true);
                checkDimensions(t, box, 0, scheduler.resourceStore.getAt(6));

                t.diag('Moving box between multiple events in grouped view');
                plugin.moveRight();
                plugin.moveDown();

                Ext.Array.each(getEventBoxes(), function (eventBox) {
                    checkDimensions(t, box, 1, scheduler.resourceStore.getAt(7), eventBox);
                    plugin.moveDown();
                });

                checkDimensions(t, box, 1, scheduler.resourceStore.getAt(8));

                Ext.Array.each(getEventBoxes(true), function (eventBox) {
                    plugin.moveUp();
                    checkDimensions(t, box, 1, scheduler.resourceStore.getAt(7), eventBox);
                });
            }
        );
    });

    t.it('Should not move highlighter between rows in left/top and right/bottom positions', function (t) {
        setup();

        t.chain(
            { click : ".x-grid-group-title:contains(Group1)" },
            function (next) {
                plugin.showEditorInCell({ tickIndex : 0, resourceIndex : 1 });
                plugin.moveLeft(true);

                var box = plugin.containerEl;

                checkDimensions(t, box, 0, scheduler.resourceStore.getAt(3));

                var col = scheduler.timeAxis.getCount() - 1;
                var row = scheduler.getSchedulingView().dataSource.getCount() - 1;

                plugin.showEditorInCell({ tickIndex : col, resourceIndex : row });

                plugin.moveRight(true);
                checkDimensions(t, box, col, scheduler.resourceStore.last());
            }
        );
    });
});