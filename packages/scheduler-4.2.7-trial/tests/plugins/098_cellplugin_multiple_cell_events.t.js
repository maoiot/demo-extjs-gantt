StartTest(function (t) {
    var plugin, scheduler;
    
    var setup = function (config) {
        config = config || {};
        scheduler && scheduler.destroy();
        
        plugin = new Sch.plugin.CellPlugin(config.plugin || {});
        
        scheduler = t.getScheduler(Ext.apply({
            eventStore      : t.getEventStore({
                data    : [
                    { Cls : 'sch-e1', StartDate : new Date(2014, 5, 12, 1, 30), EndDate : new Date(2014, 5, 12, 2), ResourceId : 'r2' },
                    { Cls : 'sch-e2', StartDate : new Date(2014, 5, 12, 1, 15), EndDate : new Date(2014, 5, 12, 1, 45), ResourceId : 'r2' },
                    { Cls : 'sch-e3', StartDate : new Date(2014, 5, 12, 1), EndDate : new Date(2014, 5, 12, 2), ResourceId : 'r2' }
                ]
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
            }
        }, config.scheduler || {}));
    };
    
    var getCellPosition = function (col, row) {
        var view = scheduler.getSchedulingView();
        var viewXY  = view.getXY();
        var width = scheduler.timeAxisViewModel.getTickWidth();
        
        return [viewXY[0] + width * col, t.getRow(scheduler.normalGrid, row).getY()];
    };
    
    var checkDimensions = function (t, col, row, eId) {
        var height, width, node;
        var box = plugin.containerEl;
        
        if (eId) {
            node = scheduler.el.down('.' + eId);
            height = node.getHeight();
            width = node.getWidth();
        } else {
            node = t.getRow(scheduler.normalGrid, row);
            height = node.getHeight();
            width = scheduler.timeAxisViewModel.getTickWidth();
        }
        box.select('.sch-cellplugin-border-vertical').each(function (el) {
            t.isApprox(el.getHeight(), height, Ext.isIE8 ? 2 : 1, 'Vertical border is ok');
        });
        
        box.select('.sch-cellplugin-border-horizontal').each(function (el) {
            t.isApprox(el.getWidth(), width, 1, 'Horizontal border is ok');
        });
        
        var boxXY   = box.getXY();
        var cellXY;
        if (eId) {
            cellXY = node.getXY();
        } else {
            cellXY = getCellPosition(col, row);
        }
        
        t.isApprox(boxXY[0], cellXY[0], 1, 'Horizontal position is correct');
        t.isApprox(boxXY[1], cellXY[1], 1, 'Vertical position is correct');
    };
    
    var checkPosition   = function (t, verticalPosition, approx) {
        approx = approx || 0;
        
        var position = 0;
        var box = plugin.containerEl.getBox();
        
        var view = scheduler.getSchedulingView();
        
        Ext.fly(view.getNodeByRecord(plugin.position.resource)).select('.sch-event').each(function (el) {
            if (el.getY() < box.y && el.getX() > box.x && el.getX() < box.right) position++;
        });
        
        t.is(position - approx, verticalPosition, 'Vertical position is correct');
    };
    
    t.it('Events should be seleted properly', function (t) {
        setup();
        
        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                t.diag('Plugin should respect real layout of events, not order in store');
                plugin.showEditorInCell({ tickIndex : 1, resourceIndex : 0 });
                for (var i = 0; i < 3; i++) {
                    plugin.onKeyDown();
                    checkPosition(t, i);
                }
                
                t.diag('Click on locked grid (resource) should select events, if there are any');
                next();
            },
            { click : function () { return t.getRow(scheduler.lockedGrid, 1); } },
            function (next) {
                checkDimensions(t, 1, 1, 'sch-e3');
                
                t.diag('Key navigation should work correct when event is clicked');
                next();
            },
            { click : '.sch-e2' },
            function (next) {
                plugin.onKeyDown();
                checkPosition(t, 2);
                checkDimensions(t, 1, 1, 'sch-e1');
                next();
            },
            { click : '.sch-e2' },
            function (next) {
                plugin.onKeyUp();
                checkPosition(t, 0);
                checkDimensions(t, 1, 1, 'sch-e3');
                
                plugin.onKeyUp();
                checkDimensions(t, 1, 0);
                next();
            }
        );
    });
    
    t.it('Should extend row height to fill empty editor', function (t) {
        setup({
            scheduler   : {
                eventRenderer : function (eventRec, resourceRec, templateData) {
                    templateData.cls = 'my-event';
                    return Ext.Date.format(eventRec.getStartDate(), 'G:i') + ' - ' + Ext.Date.format(eventRec.getEndDate(), 'G:i');
                },
                rowHeight   : 30,
                viewPreset  : 'weekAndDay',
                eventStore  : t.getEventStore({
                    data    : [
                        { Cls : 'sch-e1', StartDate : new Date(2014, 5, 12, 1, 30), EndDate : new Date(2014, 5, 12, 2), ResourceId : 'r2' },
                        { Cls : 'sch-e2', StartDate : new Date(2014, 5, 12, 1, 15), EndDate : new Date(2014, 5, 12, 1, 45), ResourceId : 'r2' },
                        { Cls : 'sch-e3', StartDate : new Date(2014, 5, 12, 1, 15), EndDate : new Date(2014, 5, 12, 1, 45), ResourceId : 'r2' }
                    ]
                })
            }
        });
        
        t.chain(
            { waitForEventsToRender : scheduler },
            function () {
                t.diag('Row height should increase only if no space left');
                var row = t.getRow(scheduler.normalGrid, 1);
                var height = row.getHeight();
                
                plugin.showEditorInCell({ tickIndex : 2, resourceIndex : 1 });
                plugin.beginEdit();
                
                plugin.editor.setValue('10-11');
                plugin.onEditorKeyEnter();

                t.ok(row.getRegion().bottom >= plugin.containerEl.getRegion().bottom, 'Box is inside of resource row');
                t.is(row.getHeight(), height, 'Row height hasn\'t changed');

                plugin.editor.setValue('12-13');
                plugin.onEditorKeyEnter();

                plugin.editor.setValue('12-13');

                t.diag('No space left - row has to be increaed');
                plugin.onEditorKeyEnter();

                t.isApprox(row.getHeight(), height + scheduler.timeAxisViewModel.rowHeightHorizontal, 1, 'Row height increased');
            }
        );
    });
    
    t.it('Should remove empty lines on TAB keys', function (t) {
        setup({
            scheduler   : {
                eventStore  : t.getEventStore({
                    data    : [
                        { Cls : 'sch-e1', StartDate : new Date(2014, 5, 12, 1, 30), EndDate : new Date(2014, 5, 12, 2), ResourceId : 'r2' }
                    ]
                })
            }
        });
        
        t.chain(
            { click : '.sch-e1' },
            function () {
                var row = Ext.get(scheduler.getSchedulingView().getNodeByRecord(scheduler.resourceStore.getAt(1)));
                var height = row.getHeight();
                
                plugin.beginEdit();
                plugin.onEditorKeyEnter();
                
                plugin.moveRight(true);
                t.is(row.getHeight(), height, 'Height restored');
                
                plugin.moveLeft(true);
                plugin.onEditorKeyEnter();
                plugin.moveLeft(true);
                
                t.is(row.getHeight(), height, 'Height restored');
            }
        );
    });
    
    t.it('ENTER on empty editor should select last event', function (t) {
        setup();
        
        t.chain(
            { click : '.sch-e3' },
            function () {
                plugin.beginEdit();
                plugin.onEditorKeyEnter();
                plugin.onEditorKeyEnter();
                
                checkDimensions(t, 1, 1, 'sch-e1');
            }
        );
    });

    t.it('Should layout multiday events normally', function (t) {
        setup({
            scheduler : {
                eventStore      : t.getEventStore({
                    data    : [
                        { Cls : 'sch-e1', StartDate : new Date(2014, 5, 12, 1), EndDate : new Date(2014, 5, 12, 6), ResourceId : 'r2'},
                        { Cls : 'sch-e2', StartDate : new Date(2014, 5, 12, 2), EndDate : new Date(2014, 5, 12, 6), ResourceId : 'r2'},
                        { Cls : 'sch-e3', StartDate : new Date(2014, 5, 12, 3), EndDate : new Date(2014, 5, 12, 6), ResourceId : 'r2'},
                        { Cls : 'sch-e4', StartDate : new Date(2014, 5, 12, 4), EndDate : new Date(2014, 5, 12, 6), ResourceId : 'r2'},
                        { Cls : 'sch-e5', StartDate : new Date(2014, 5, 12, 5), EndDate : new Date(2014, 5, 12, 6), ResourceId : 'r2'}
                    ]
                })
            }
        });

        t.chain(
            { waitForEventsToRender : scheduler },
            function () {
                var y = Ext.select('.sch-e1').first().getY();

                for (var i = 1; i <= 5; i++) {
                    t.is(Ext.select('.sch-e' + i).first().getY(), y, 'Top position is correct');
                }
            }
        )
    });
});