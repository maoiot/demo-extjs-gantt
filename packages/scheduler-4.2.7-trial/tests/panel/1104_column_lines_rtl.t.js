StartTest(function (t) {
    // To workaround http://www.sencha.com/forum/showthread.php?299143-RTL-flag-not-propagated-to-child-components&p=1092329#post1092329
    Ext.define('Sch.examples.RtlComponent', {
        override : 'Ext.Component',
        rtl      : true
    });

    var scheduler = t.getScheduler({
        height      : 200,
        width       : 600,
        viewPreset  : 'hourAndDay',
        startDate   : new Date(2010, 1, 1),
        endDate     : new Date(2010, 1, 1, 10),
        columnLines : true,
        rtl         : true,
        renderTo    : Ext.getBody()
    });

    var schedulingView = scheduler.getSchedulingView();

    function verify() {
        var lines = Ext.select('.sch-column-line');
        var colWidth = scheduler.timeAxisViewModel.getTickWidth();

        t.is(lines.first().getStyle('right'), colWidth + 'px', 'First column line right style ok');
        t.is(lines.last().getStyle('right'), colWidth * 9 + 'px', 'Last column line right style ok');

        t.is(schedulingView.getHorizontalScroll(), scheduler.normalGrid.headerCt.getScrollX(), 'Scroll synced between header and body');

        t.is(schedulingView.getScrollX(), scheduler.normalGrid.headerCt.getScrollX(), 'Scroll synced');

        t.is(scheduler.el.down('.sch-secondary-canvas').el.getStyle('right')[0], "0", 'Secondary canvas right position');
        t.isApprox(schedulingView.el.down('.x-grid-item-container').dom.clientWidth,
            scheduler.normalGrid.headerCt.el.down('.x-column-header').dom.clientWidth,
            1,
            'Grid view and header equally sized');
    }

    t.chain(
        { waitForSelector : '.sch-column-line' },

        function (next) {
            t.cqNotExists('schedulergrid [rtl!=true]', 'Should not find LTR components');
            verify();

            schedulingView.scrollHorizontallyTo(100);
            next();
        },

        { waitFor : function() {
            return schedulingView.getScrollX() === scheduler.normalGrid.headerCt.getScrollX();
        }},

        function (next) {
            verify();
        }
    );
});