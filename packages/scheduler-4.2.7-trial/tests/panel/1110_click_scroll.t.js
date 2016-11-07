StartTest(function (t) {

    var panel;

    t.beforeEach(function(t) {
        panel && panel.destroy();
    });

    // This is testing the patch that prevents the gridview from resetting scroll after clicking
    // Mainly an issue in IE. This patch should ideally not interfere with the key naviation, which is also tested below
    // Clicking rows in IE has caused scroll resets a few times:
    // https://www.assembla.com/spaces/bryntum/tickets/661#/activity/ticket:
    // https://www.assembla.com/spaces/bryntum/tickets/1095?comment=413136983#comment:413136983

    t.it('Click locked row or normal row should not trigger scroll change', function (t) {
        panel = t.getScheduler({
            width  : 400,
            height : 200,

            columns : [
                { dataIndex : 'Name', width : 30 }, { dataIndex : 'StartDate' }, { dataIndex : 'EndDate' }
            ],

            lockedGridConfig : {
                width : 150
            },
            renderTo         : Ext.getBody()
        });

        var lockedViewEl = panel.lockedGrid.view.el;
        var normalViewEl = panel.normalGrid.view.el;


        t.chain(
            { waitFor : 'rowsVisible' },

            function (next) {
                // only need to set the scroll top in one view and another will reflect
                t.scrollVerticallyTo(lockedViewEl.dom, 50, next);
            },
            function (next) {
                t.scrollHorizontallyTo(normalViewEl.dom, 250, next);
            },
            function (next) {
                t.scrollHorizontallyTo(lockedViewEl.dom, 50, next);
            },

            { waitFor : 1000 },

            function (next) {
                // in IE, locked view fires the "scroll" event, but the actual scroll position does not change,
                // so we allow 1 "scroll" event, w/o position change (see below)
                t.firesOk(lockedViewEl.dom, 'scroll', '<=1', 'Locked');
                t.wontFire(normalViewEl.dom, 'scroll', 'Normal');

                var beforeScrollTop = lockedViewEl.dom.scrollTop;

                lockedViewEl.on('scroll', function () {
                    if (lockedViewEl.dom.scrollLeft === 0 || lockedViewEl.dom.scrollTop != beforeScrollTop) {
                        t.fail("Locked view has changed the scroll position");
                    }
                });

                next();
            },

            { click : '.x-grid-inner-locked .x-grid-view' },

            { click : '.sch-timelineview' }
        );
    });

    t.it('Clicking normal grid horizontal scroll bar should not affect vertical scroll position', function (t) {
        var resourceStore   = t.getResourceStore2({}, 20);

        panel           = t.getScheduler({
            resourceStore   : resourceStore,
            width           : 400,
            height          : 200,

            columns         : [
                { dataIndex : 'Name', width : 80 }, { dataIndex : 'foo' }, { dataIndex : 'bar' }
            ],
            
            lockedGridConfig : {
                width : 150
            },
            renderTo         : Ext.getBody()
        });

        var normalView = panel.getSchedulingView();
        var lockedView = panel.lockedGrid.view;
        
        var scroll = 0;

        t.chain(
            { waitForRowsVisible : panel },
            // check normal view scroll
            { click : function () { return normalView.getNode(resourceStore.getAt(0)); }, offset : [10, 5] },
            
            function (next) { t.scrollVerticallyTo(normalView.el.dom, 20 * 30, next); },
            
            { click : function () { return lockedView.getNode(resourceStore.getAt(19)); }, offset : [10, 5] },
            
            { click : function () { 
                scroll = normalView.getScroll().top;
                return normalView.el; 
            }, offset : [20, '100%-5'] },
            
            function (next) {
                t.is(normalView.getScroll().top, scroll, 'Scroll wasnt changed');
            }
        );
    });
    
    t.it('Clicking normal grid horizontal scroll bar should not affect vertical scroll position', function (t) {
        var resourceStore   = t.getResourceStore2({}, 5);

        panel           = t.getScheduler({
            resourceStore   : resourceStore,
            width           : 400,
            height          : 200,

            columns         : [
                { dataIndex : 'Name', width : 80 }, { dataIndex : 'foo' }, { dataIndex : 'bar' }
            ],
            
            lockedGridConfig : {
                width : 150
            },
            renderTo         : Ext.getBody()
        });

        var normalView = panel.getSchedulingView();
        var lockedView = panel.lockedGrid.view;
        
        var scroll = 0;

        t.chain(
            { waitForRowsVisible : panel },
            function (next) { t.scrollVerticallyTo(normalView.el.dom, 20, next); },
            { click : function () { return normalView.getNode(resourceStore.getAt(4)); }, offset : [10, 5] },
            { click : function () {
                scroll = normalView.getScroll().top;
                return lockedView.el;
            }, offset : [20, '100%-5'] },
            function (next) {
                t.is(normalView.getScroll().top, scroll, 'Scroll wasnt changed');
            }
        );
    });

    t.it('Key navigation in the grid should still work', function (t) {
        // in patchNavigationModel function we disable row focusing, since breaks scroll in IE
        // and due to this key navigation doesn't work
        if (Ext.isIE) { return; }

        panel = t.getScheduler({
            renderTo : Ext.getBody()
        });

        t.chain(
            { click : '.sch-timetd' },
            { type : '[DOWN]' },

            function () {
                t.ok(panel.getSelectionModel().isSelected(panel.resourceStore.getAt(1)), 'Second row now selected');
            }
        );
    });
});