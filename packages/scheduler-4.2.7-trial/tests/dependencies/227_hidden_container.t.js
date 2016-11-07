describe('Dependencies should not be painted if a containing parent is hidden', function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();

        scheduler = t.getScheduler({
            dependencyStore : true
        }, 3);
    })

    t.it("No deps painted", function (t) {

        var dependencyView = scheduler.getDependencyView();
        var container      = new Ext.Container({
            items    : scheduler,
            width    : 800,
            height   : 400,
            layout   : 'fit',
            renderTo : document.body,
            style    : 'background:#aaa'
        });

        container.hide();

        t.chain(
            { waitForSelectorNotFound : '.sch-dependency' },

            function (next) {
                t.selectorNotExists('.sch-dependency');

                var records = scheduler.dependencyStore.getRange();

                scheduler.dependencyStore.removeAll();
                scheduler.dependencyStore.loadData(records);

                next();
            },

            { waitFor : 300 },

            function (next) {
                t.selectorNotExists('.sch-dependency');

                // this should trigger a redraw
                container.show();

                next();
            },

            { waitForSelector : '.sch-dependency' }
        )
    });

    t.it("Should not try to draw dependencies after view is destroyed", function (t) {

        var dependencyView = scheduler.getDependencyView();
        var container      = new Ext.Container({
            items    : scheduler,
            width    : 800,
            height   : 400,
            layout   : 'fit',
            renderTo : document.body,
            style    : 'background:#aaa'
        });

        container.hide();

        t.chain(
            { waitForSelectorNotFound : '.sch-dependency' },

            function (next) {
                t.wontFire(scheduler.getDependencyView(), 'refresh');

                scheduler.destroy();

                container.show();
            }
        )
    });
});
