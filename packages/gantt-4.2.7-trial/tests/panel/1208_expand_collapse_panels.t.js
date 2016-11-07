StartTest(function(t) {
    // Since we have a custom layout for the top containing 'treepanel', col resizing feature started breaking in 4.2.1
    var gantt;

    t.beforeEach(function() {
        gantt && gantt.destroy();

        gantt       = t.getGantt({
            width            : 400,
            lockedGridConfig : {
                collapsible : true,
                width       : 100,
                split       : false
            },
            normalGridConfig : { collapsible : true },
            renderTo         : Ext.getBody()
        });
    })


    t.it('Should have correct initial widths', function(t) {
        t.waitForRowsVisible(function () {
            t.isApprox(gantt.lockedGrid.getWidth(), 100, 2, 'Locked');
            t.isApprox(gantt.normalGrid.getWidth(), 300, 7, 'Normal');
        })
    });

    // collapsing locked grid not supported, sencha has been asked a lot
    // but has to be https://www.sencha.com/forum/showthread.php?297889-Layout-run-failed-when-collapsing-locked-grid
    t.it('Collapse Locked => Locked collapsed, normal expanded', function(t) {
        t.chain(
            function (next) {
                gantt.lockedGrid.collapse();
                next();
            },

            function () {
                // remove width of placeholder with title, borders etc
                t.isApprox(gantt.normalGrid.getWidth(), 400, 35, 'Normal');
            }
        )
    });

    t.it('Collapse Normal => Locked expanded, normal collapsed', function(t) {
        t.chain(
            function (next) {
                gantt.lockedGrid.collapse();

                // This should trigger locked grid to expand fully
                gantt.normalGrid.collapse();
                next();
            },

            function () {
                // remove width of placeholder with title, borders etc
                t.isApprox(gantt.lockedGrid.getWidth(), 400, 35, 'Normal');
            }
        )
    });

    t.it('Collapse Locked=> Locked collapse, normal expanded', function(t) {
        t.chain(
            function (next) {
                gantt.lockedGrid.collapse();
                gantt.normalGrid.collapse();
                next();
            },

            { waitFor : 500 },

            function (next) {
                // This should trigger normal grid to expand fully
                gantt.lockedGrid.collapse();
                next();
            },

            function () {
                // remove width of placeholder with title, borders etc
                t.isApprox(gantt.normalGrid.getWidth(), 400, 35, 'Normal');
            }
        )
    });

    t.it('Collapse Scheduler => Locked expanded, normal collapsed', function(t) {
        t.chain(
            function (next) {
                // This should trigger locked grid to expand fully
                gantt.normalGrid.collapse();
                next();
            },

            function () {
                // remove width of placeholder with title, borders etc
                t.isApprox(gantt.lockedGrid.getWidth(), 400, 35, 'Normal');
            }
        )
    });

    t.it('Expand Scheduler => Both expand, should have original widths', function(t) {
        t.chain(
            function (next) {
                gantt.normalGrid.collapse();
                gantt.lockedGrid.collapse();

                t.isApprox(gantt.normalGrid.getWidth(), 400, 35, 'Normal');

                next();
            },

            { waitFor : 500 },

            function (next) {
                gantt.lockedGrid.expand();

                t.isApprox(gantt.lockedGrid.getWidth(), 100, 2, 'Locked');

                next();
            },

            { waitFor : 500 },

            function () {
                t.isApprox(gantt.lockedGrid.getWidth(), 100, 2, 'Locked');
                t.isApprox(gantt.normalGrid.getWidth(), 300, 7, 'Normal');
            }
        )
    });
});

