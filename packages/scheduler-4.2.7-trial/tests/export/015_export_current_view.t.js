StartTest(function (t) {

    t.expectGlobal('0');

    var iframe,
        scheduler,
        plugin;

    t.beforeEach(function () {

        plugin = Ext.create('Sch.plugin.Export', {
            openAfterExport : false,
            test            : true
        });

        scheduler && scheduler.destroy();

        scheduler = t.getScheduler({
            renderTo      : Ext.getBody(),
            width         : 400,
            height        : 400,
            resourceStore : t.getResourceStore2({}, 50),
            eventStore    : t.getEventStore({}, 50),
            plugins       : plugin
        });
    });

    var assertRows = function (t, position, exporter, number, next) {

        var lockedRowSelector = scheduler.lockedGrid.view.getItemSelector(),
            normalRowSelector = scheduler.normalGrid.view.getItemSelector(),
            view              = scheduler.normalGrid.view,
            numberOfRows      = number || Math.ceil(view.el.getHeight() / scheduler.getRowHeight());

        var async = t.beginAsync(45000);

        t.scrollTo(scheduler, position, function () {

            plugin.doExport({
                format      : 'A4',
                orientation : 'portrait',
                range       : 'current',
                rowsRange   : 'visible',
                exporterId  : exporter
            }, function (exported) {

                iframe && iframe.parentNode.removeChild(iframe);

                iframe = t.setIframe({

                    html   : exported.htmlArray[0].html,

                    onload : function (doc) {
                        var lockedBodySelector = '#' + scheduler.lockedGrid.view.getId(),
                            normalBodySelector = '#' + scheduler.normalGrid.view.getId();

                        var lockedBody  = t.$(lockedBodySelector, doc)[0];
                        var normalBody  = t.$(normalBodySelector, doc)[0];

                        t.is(Ext.fly(t.$(lockedRowSelector, lockedBody)[0]).getTop(), Ext.fly(lockedBody).getTop(), 'first row has proper top coordinate');
                        t.is(Ext.fly(t.$(lockedRowSelector, lockedBody)[0]).getLeft(), Ext.fly(lockedBody).getLeft(), 'first row has proper left coordinate');

                        t.is(t.$(lockedRowSelector, lockedBody).length, numberOfRows, 'Number of locked rows is correct');
                        t.is(t.$(normalRowSelector, normalBody).length, numberOfRows, 'Number of normal rows is correct');

                        t.endAsync(async);

                        next();
                    }
                });

            });
        });
    };

    t.it('rowsRange=visible option is reated properly by "multipage" exporter', function (t) {

        t.waitForRowsVisible(scheduler, function () {

            var step = scheduler.normalGrid.view.el.dom.scrollHeight / 4;

            t.chain(
                function (next) {
                    assertRows(t, 0, 'multipage', 12, next);
                },
                function (next) {
                    assertRows(t, step, 'multipage', 11, next);
                },
                function (next) {
                    assertRows(t, step * 2, 'multipage', 12, next);
                },
                function (next) {
                    assertRows(t, step * 3, 'multipage', 11, next);
                }
            );

        });
    });


    t.it('rowsRange=visible option is reated properly by "multipagevertical" exporter', function (t) {

        t.waitForRowsVisible(scheduler, function () {

            var step = scheduler.normalGrid.view.el.dom.scrollHeight / 4;

            t.chain(
                function (next) {
                    assertRows(t, 0, 'multipagevertical', 12, next);
                },
                function (next) {
                    assertRows(t, step, 'multipagevertical', 11, next);
                },
                function (next) {
                    assertRows(t, step * 2, 'multipagevertical', 12, next);
                },
                function (next) {
                    assertRows(t, step * 3, 'multipagevertical', 11, next);
                }
            );

        });

    });
});
