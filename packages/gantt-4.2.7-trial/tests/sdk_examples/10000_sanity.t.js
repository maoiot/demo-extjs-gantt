/* globals JSON */
StartTest({ defaultTimeout : 60000 }, function(t) {
    var scripts = Ext.select('script', Ext.getHead());
    var foundGantt = false;
    var foundExt = false;

    scripts.each(function(el) {
        if (el.dom.src && el.dom.src.match(/gnt-(pro-)?all-debug\.js/)){
            foundGantt = true;
        }

        if (el.dom.src && el.dom.src.match(/bryntum\.com/) && el.dom.src.match('ext-all.js|ext-all-rtl.js')){
            foundExt = true;
        }
    });

    t.ok(foundGantt, 'Script tag with gnt-all-debug.js found');

    t.ok(foundExt, 'ext-all.js script tag using cdn.sencha.io found');

    t.waitForSelector('.sch-gantt-item', function() {
        t.pass('Example rendered without exception');

        var gantt = t.cq1('ganttpanel');

        t.it('Search for suspicious header rendering artefacts', function(t) {
            gantt.el.select('.sch-column-header').each(function(el) {
                if (el.getWidth() <= 0) {
                    t.fail('Header cell has incorrect width: ' + el.getWidth());
                }
            })
        });

        t.it('Search for suspicious event rendering artefacts', function(t) {
            gantt.el.select('.sch-gantt-item').each(function(el) {
                if (el.isVisible(true) && el.getWidth() <= 0) {
                    t.fail('Task element has incorrect width: ' + el.getWidth());
                }
            })
        });

        var resourceUtilizationPanel = t.cq1('resourceutilizationpanel');
        Ext.StoreManager.each(function(store) {
            if (resourceUtilizationPanel && store.storeId === 'events') {
                t.todo('Some inner utilization store has changes', function (t) {
                    t.is(store.getModifiedRecords().length, 0, store.storeId + ' store should not contain modified data when sample loads')
                });
            } else {
                t.is(store.getModifiedRecords().length, 0, store.storeId + ' store should not contain modified data when sample loads')
            }
        });

        t.monkeyTest(gantt, 10, function (actionLog) {
            // If constraint resolution window is found, dragdrop operation may be in progress and thus some layouts
            // are suspended. Only check them if window is not found
            t.cq1('constraintresolutionwindow') && t.cq1('constraintresolutionwindow').close();
        });
    });
});
