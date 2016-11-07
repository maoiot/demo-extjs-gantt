StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    t.it('Basic show/hide', function (t) {
        var plug = new Sch.plugin.EventTools({
            items : [
                { type : 'details', handler : Ext.emptyFn, tooltip : 'Show Event Details' },
                { type : 'foooo', handler : Ext.emptyFn, tooltip : 'Show Event Details' },
                { type : 'bar', handler : Ext.emptyFn, tooltip : 'Show Event Details' }
            ]
        });

        scheduler = t.getScheduler({
            renderTo : document.body,
            plugins  : plug,
            height   : 200
        });

        t.willFireNTimes(plug, 'show', 2);
        t.willFireNTimes(plug, 'hide', 2);

        t.chain(
            { moveCursorTo : '.sch-event' },
            { waitForComponentVisible : plug },
            { moveCursorTo : '.sch-column-header' },
            { waitForComponentNotVisible : plug },

            { moveCursorTo : '.sch-event' },
            { waitForComponentVisible : plug },
            { moveCursorTo : '.sch-column-header' },
            { waitForComponentNotVisible : plug }
        );
    })

    t.it('No visible tools should prevent the show', function (t) {

        var plug = new Sch.plugin.EventTools({
            items : [
                { type : 'details', handler : Ext.emptyFn, tooltip : 'Show Event Details', visibleFn : function() { return false; } }
            ]
        });

        scheduler = t.getScheduler({
            renderTo : document.body,
            plugins  : plug,
            height   : 200
        });

        t.wontFire(plug, 'show');

        t.chain(
            { moveCursorTo : '.sch-event' },

            { waitFor : 200},

            function() {
                t.notOk(plug.isVisible());
            }
        );
    });
});
