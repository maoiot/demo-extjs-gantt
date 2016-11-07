StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    var validateSelection = function (t, tableContainerEl) {
        var proxyEl = Ext.getBody().down('.sch-drag-selector');
        var box = tableContainerEl.getBox();

        t.is(scheduler.getEventSelectionModel().getCount(), Ext.select(scheduler.getSchedulingView().eventSelector).getCount(), 'Records were selected ok');
        t.ok(proxyEl, 'Should find proxy el + sch-drag-selector CSS class');

        t.elementIsTopElement(proxyEl, true, 'Should find selector as the top element');
        t.isApprox(proxyEl.getWidth(), box.width, 'Should find right width');
        t.isApprox(proxyEl.getHeight(), box.height, 'Should find right height');

        t.ok(proxyEl.getBorderWidth('l'), 'Should find el l border');
        t.ok(proxyEl.getBorderWidth('r'), 'Should find el r border');
        t.ok(proxyEl.getBorderWidth('t'), 'Should find el t border');
        t.ok(proxyEl.getBorderWidth('b'), 'Should find el b border');
    };

    t.it('Should select events as you drag', function(t) {
        scheduler = t.getScheduler({
            renderTo: Ext.getBody(),
            width: 400,
            height: 250,
            multiSelect: true,
            forceFit: true,
            viewConfig: {deferInitialRefresh: false},
            plugins: Ext.create("Sch.plugin.DragSelector")
        });

        var view = scheduler.getSchedulingView();

        t.chain(
            { waitForEventsToRender : scheduler },

            function (next) {
                t.is(scheduler.getEventSelectionModel().getCount(), 0, 'No records selected');
                next();
            },

            { drag : view, fromOffset : [ 1, 1 ], to: view, toOffset : [ "100%-1", "100%-1" ], options : { ctrlKey : true }, dragOnly : true },

            function (next) {
                validateSelection(t, view.el.down('.x-grid-item-container'));
                next()
            },

            { action    : 'mouseup' },

            { click : view, offset : [ '80%', '50%' ] },

            function (next) {
                t.is(scheduler.getEventSelectionModel().getCount(), 0, 'All events should be unselected');

                t.waitForEvent(view, 'refresh', next);
                view.refresh()
            },

            { drag : view, fromOffset : [1, 1], to: view, toOffset : ["100%-1", "100%-1"], options : { ctrlKey : true }, dragOnly : true },

            function (next) {
                validateSelection(t, view.el.down('.x-grid-item-container'));
                next()
            },

            { action    : 'mouseup' }
        );
    });

    t.it('Should scroll when dragging close to edges', function(t) {
        scheduler = t.getScheduler({
            renderTo: Ext.getBody(),
            width: 400,
            height: 200,
            multiSelect: true,
            viewConfig: {deferInitialRefresh: false},
            plugins: Ext.create("Sch.plugin.DragSelector"),
            eventStore: new Sch.data.EventStore()
        });

        var view = scheduler.getSchedulingView();

        t.chain(
            { waitForRowsVisible : scheduler },
            { 
                waitForScrollChange : [ view.el, 'left' ],
                trigger             : { 
                    drag        : view,
                    fromOffset  : [10, 1], 
                    to          : view,
                    toOffset    : ["100%-15", 10], 
                    options     : { ctrlKey : true }, 
                    dragOnly    : true 
                }
            },
            { action : 'mouseUp' },
            function (next) {
                t.isGreater(view.el.dom.scrollLeft, 0);
                
                next()
            },
            { 
                waitForScrollChange     : [ view.el, 'top' ],
                trigger                 : { 
                    drag        : view,
                    fromOffset  : [ 50, 1 ], 
                    to          : view,
                    toOffset    : [ 50, "100%-20" ], 
                    options     : { ctrlKey : true }, 
                    dragOnly    : true 
                }
            },
            { action : 'mouseUp' },
            function () {
                t.isGreater(view.el.dom.scrollTop, 0)
            }
        );
    });
});
