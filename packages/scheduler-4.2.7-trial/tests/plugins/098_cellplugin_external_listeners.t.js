StartTest(function (t) {
    var rowHeight   = 30,
        colWidth,
        plugin,
        scheduler;
    
    var setup = function (config) {
        scheduler && scheduler.destroy();
        
        plugin = new Sch.plugin.CellPlugin();
        
        scheduler = t.getScheduler(Ext.apply({
            eventStore      : t.getEventStore({}, 0),
            width       : 1000,
            height      : 500,
            startDate   : new Date(2014, 5, 12),
            endDate     : new Date(2014, 5, 12, 7),
            viewPreset  : 'hourAndDay',
            renderTo    : Ext.getBody(),
            plugins     : plugin
        }, config || {}));
    };
    
    var getCellPosition = function (col, row) {
        var view = scheduler.getSchedulingView();
        var viewXY  = view.getXY();
        var scroll  = view.getScroll();
        
        return [viewXY[0] + colWidth * col - scroll.left, viewXY[1] + rowHeight * row - scroll.top];
    };
    
    var checkDimensions = function (t, box, col, row) {
        colWidth    = scheduler.timeAxisViewModel.getTickWidth();
        
        Ext.each(box.query('.border-vertical'), function (el) {
            t.is(Ext.fly(el).getHeight(), rowHeight, 'Vertical border is ok');
        });
        
        Ext.each(box.query('.border-horizontal'), function (el) {
            t.is(Ext.fly(el).getWidth(), colWidth, 'Horizontal border is ok');
        });
        
        var boxXY   = box.getXY(),
            cellXY  = getCellPosition(col, row);
        
        t.isApprox(boxXY[0], cellXY[0], 1, 'Box x is correct');
        t.isApprox(boxXY[1], cellXY[1], 1, 'Box y is correct');
    };
    
    t.it('Plugin should work correctly after time axis is reconfigured', function (t) {
        setup();
        
        t.chain(
            { click : function () { return t.getRow(scheduler.lockedGrid, 1); } },
            { waitForSelector : '.sch-cellplugin-highlighter' },
            function (next) {
                scheduler.timeAxis.setTimeSpan(new Date(2014, 5, 12, 1), new Date(2014, 5, 12, 3));
                
                t.selectorNotExists('.sch-cellplugin-highlighter', 'Highlighter is hidden');
                
                plugin.moveLeft();
                plugin.beginEdit();
                
                t.selectorNotExists('.sch-cellplugin-highlighter', 'Highlighter is hidden');
                next();
            },
            { click : function () { return t.getRow(scheduler.normalGrid, 3); }, offset : [115, 11] },
            { waitForSelector : '.sch-cellplugin-highlighter' },
            function (next) {
                var box = plugin.containerEl;
                
                checkDimensions(t, box, 0, 3);
                
                scheduler.timeAxis.setTimeSpan(new Date(2014, 5, 12), new Date(2014, 5, 12, 2));
                
                colWidth = scheduler.timeAxisViewModel.getTickWidth();
                
                checkDimensions(t, box, 0, 3);
                
                plugin.moveRight();
                checkDimensions(t, box, 1, 3);
                
                plugin.moveLeft();
                plugin.moveLeft();
                checkDimensions(t, box, 1, 2);
                next();
            }
        );
    });
    
    t.it('Box should be sized correctly after column width is changed', function (t) {
        setup();
        
        t.chain(
            { click : function () { return t.getRow(scheduler.lockedGrid, 1); } },
            { waitForSelector : '.sch-cellplugin-highlighter' },
            function () {
                plugin.moveRight();
                var box     = plugin.containerEl;
                colWidth    = 200;
                t.waitForEvent(scheduler.timeAxisViewModel, 'update', function () { 
                    checkDimensions(t, box, 1, 1); 
                });
                scheduler.timeAxisViewModel.setTickWidth(colWidth);
            }
        );
    });
    
    t.it('Box should move correct after adding/removing rows', function (t) {
        setup();
        
        t.chain(
            { click : function () { return t.getRow(scheduler.lockedGrid, 5); } },
            { waitForSelector : '.sch-cellplugin-highlighter' },
            function (next) {
                var box = plugin.containerEl;
                scheduler.resourceStore.removeAt(4);
                checkDimensions(t, box, 0, 4);
                scheduler.resourceStore.insert(4, {
                    Id      : 'test',
                    Name    : 'test'
                });
                
                next();
            },
            { type : "[DOWN]" },
            function (next) {
                var box = plugin.containerEl;
                checkDimensions(t, box, 0, 5);
                scheduler.resourceStore.removeAll();
                t.selectorNotExists('.sch-cellplugin-highlighter', 'Box is removed');
                scheduler.resourceStore.add([{
                    Id      : 'test1',
                    Name    : 'test1'
                }, {
                    Id      : 'test2',
                    Name    : 'test2'
                }]);
                next();
            },
            { click : function () { return t.getRow(scheduler.lockedGrid, 1); } },
            function () {
                var box = plugin.containerEl;
                checkDimensions(t, box, 0, 1);
            }
        );
    });
    
    t.it('Should destroy highlighter on zoom change', function (t) {
        setup();
        
        t.chain(
            { click : function () { return t.getRow(scheduler.normalGrid, 1); }, offset : [90, 15] },
            function () {
                var start = scheduler.getStart();
                var end = scheduler.getEnd();
                t.waitForEvent(scheduler, 'zoomchange', function () { t.notOk(plugin.containerEl, 'Highlighter removed'); });
                scheduler.zoomToSpan({ start : Sch.util.Date.add(start, 'd', 2), end : Sch.util.Date.add(end, 'd', 2) });
            }
        );
    });
    
    t.it('Should update editor width after zooming', function (t) {
        setup();
        
        t.chain(
            { waitForRowsVisible : scheduler },
            function () {
                plugin.showEditorInCell({ tickIndex : 0, resourceIndex : 0 });
                scheduler.zoomIn();
                scheduler.zoomIn();
                plugin.showEditorInCell({ tickIndex : 0, resourceIndex : 0 });
                plugin.beginEdit();
                var width = scheduler.timeAxisViewModel.getTickWidth();
                t.is(plugin.containerEl.getWidth(), width, 'Highlighter width is correct');
                t.is(plugin.editor.getWidth(), width, 'Editor width is correct');
            }
        );
    });
    
    t.it('Schould destroy highlighter after event store refresh', function (t) {
        setup({
            eventStore  : t.getEventStore({
                proxy : 'memory'
            })
        });
        
        t.chain(
            { waitForRowsVisible : scheduler },
            { click : function () { return t.getRow(scheduler.normalGrid, 1); }, offset : [147, 10] },
            { waitForSelector : '.sch-cellplugin-highlighter' },
            function (next) {
                t.waitForEvent(scheduler.eventStore, 'load', next);
                scheduler.eventStore.reload();
            },
            { waitForSelectorNotFound : '.sch-cellplugin-highlighter' },
            function () {
                t.pass('Highlighter removed');
            }
        );
    });
});