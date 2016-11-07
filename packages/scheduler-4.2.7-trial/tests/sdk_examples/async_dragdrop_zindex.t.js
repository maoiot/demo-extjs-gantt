StartTest(function (t) {

    t.waitForSelector('.sch-timetd', function () {
        t.chain(
            { drag : "schedulergrid => " + Ext.grid.View.prototype.itemSelector + '.x-grid-item[data-recordindex="3"] .sch-timetd .sch-event', by : [-116, 26], offset : [45, 6] },

            { drag : ">> messagebox[title=Please confirm] header", by : [-5, -46] },

            function (next) {
                var proxy   = Ext.get(Ext.query('.x-dd-drag-proxy.sch-dragproxy')[0]);
                var window  = Ext.WindowManager.getActive();

                t.isLess(proxy.el.getZIndex(), window.el.getZIndex(), 'Proxy is under the window');

                next();
            },

            { click : ">> messagebox[title=Please confirm] button[text=No]" }
        );
    });
});