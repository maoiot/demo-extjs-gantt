StartTest(function(t) {
    var gantt;

    t.beforeEach(function () {
        gantt && gantt.destroy();
    });

    t.it('Should not loose scroll position on node collapse', function (t) {
        gantt = t.getGantt({
            renderTo         : Ext.getBody(),
            lockedGridConfig : {
                width : 200
            },
            width            : 400
        });

        var scrollable = gantt.lockedGrid.view.getScrollable();
        var scrollLeft;

        var steps = [
            {
                desc   : 'Scrolled the locked grid 200px to the right',
                action : function (next) {
                    t.waitForEvent(scrollable, 'scrollend', next);
                    scrollable.scrollTo(200);
                }
            },
            {
                desc   : 'Click a parent task to collapse it',
                click  : function () {
                    scrollLeft = scrollable.getPosition().x;
                    return gantt.getSchedulingView().el.down('.sch-gantt-parenttask-bar');
                }
            },
            function (next) {
                t.is(scrollable.getPosition().x, scrollLeft, 'Left scroll not changed');
                next();
            }
        ];

        t.chain(
            { waitForEventsToRender : gantt },

            steps,

            function (next) {
                scrollable.scrollTo(0);
                next();
            },
            {
                desc    : 'Reset the locked grid horizontal scroll to zero',
                waitFor : function () {
                    return scrollable.getPosition().x === 0;
                }
            },
            {
                desc    : 'Click namecolumn expander',
                click   : '.x-tree-expander'
            },
            {
                desc    : 'Click cell (row:1, column:0)',
                click   : function () {
                    return t.getCell(gantt, 1, 0);
                }
            },

            steps
        )
    });

    t.it('Should collapse/expand all nodes', function (t) {

        gantt = t.getGantt({
            renderTo         : Ext.getBody(),
            enableAnimations : false
	    });

	    t.waitForEventsToRender(gantt, function () {
	        gantt.collapseAll();
	        gantt.expandAll();
	        t.pass('collapseAll/expandAll executed ok');
	    });

    });

    t.it('Should keep locked & normal grids synced', function (t) {

        gantt = t.getGantt({
            renderTo         : Ext.getBody(),
            enableAnimations : false,
            leftLabelField   : {
                dataIndex : 'Name',
                editor    : { xtype : 'textfield' }
            }
        });

        t.waitForEventsToRender(gantt, function () {
            var task = gantt.taskStore.getNodeById(114);

            task.collapse();
            t.is(gantt.lockedGrid.getView().getNodes().length, gantt.getSchedulingView().el.select(Ext.grid.View.prototype.itemSelector).elements.length, 'Rows synced');
        });
    });

    t.it('Should render left label editor correctly', function (t) {

        gantt = t.getGantt({
            enableAnimations : false,
            leftLabelField   : {
                dataIndex : 'Name',
                editor    : { xtype : 'textfield' }
            }
        });

        gantt.on('beforerender', function () {
            t.is(gantt.normalGrid.view.getSecondaryCanvasEl(), null, 'Should not crash if accessing secondary canvas too early');
        });

        gantt.render(Ext.getBody());

        t.waitForRowsVisible(gantt, function () {
            t.livesOk(function () { gantt.normalGrid.view.getSecondaryCanvasEl(); }, 'Method doesn\'t throws an exception when shouldn\'t');
        });

    });
})

