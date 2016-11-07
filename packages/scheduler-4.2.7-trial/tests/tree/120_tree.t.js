StartTest(function(t) {
    var scheduler = t.getSchedulerTree({
        columnLines : true,
        renderTo : Ext.getBody()
    });

    var viewEl = scheduler.getSchedulingView().el;
    
    var collapsedSnapshot;
    var expandedSnapshot;

    t.chain(
        { waitForEventsToRender : scheduler },
        
        { click : '.x-tree-expander' },
        // click somewhere else to avoid dblclick in IE
        { click : '.x-grid-cell' },

        function (next) {
            collapsedSnapshot = viewEl.dom.innerHTML;
            next();
        },

        { click : '.x-tree-expander' },
        { click : '.x-grid-cell' },

        function (next) {
            expandedSnapshot = viewEl.dom.innerHTML;
            next();
        },

        { click : '.x-tree-expander' },
        { click : '.x-grid-cell' },

        function (next) {
            // id's may change
            if (Ext.isIE8) {
                t.is(
                    // in IE8 we add extra top: 0px styles to secondary canvas and to item container
                    viewEl.dom.innerHTML.replace(/id="(.*)"/gi, 'id="foo"').replace(/ style="TOP:(.*)"/gi, '').replace(/; TOP: 0px/gi, ''), 
                    collapsedSnapshot.replace(/id="(.*)"/gi, 'id="foo"').replace(/ style="TOP:(.+?")/gi, ''), 
                    'DOM state exactly the same after 2 clicks on expand button (collapsed)'
                );
            } else {
                t.is(viewEl.dom.innerHTML.replace(/id="(.*)"/gi, 'id="foo"'), collapsedSnapshot.replace(/id="(.*)"/gi, 'id="foo"'), 'DOM state exactly the same after 2 clicks on expand button (collapsed)');
            }
            next();
        },

        { click : '.x-tree-expander' },
        { click : '.x-grid-cell' },

        // in IE in SL following function may produce exception because el is null
        { waitForSelector : '.sch-event' },

        function(next) {
            // id's may change
            t.is(viewEl.dom.innerHTML.replace(/id="(.*)"/gi, 'id="foo"'), expandedSnapshot.replace(/id="(.*)"/gi, 'id="foo"'), 'DOM state exactly the same after 2 clicks on expand button (expanded)');

            // Make sure events can be removed ok, triggering row update
            var el = t.getFirstEventEl(scheduler);
            el.addCls('FOO');

            scheduler.eventStore.remove(scheduler.getSchedulingView().resolveEventRecord(el));
            next();
        },
        { waitForSelectorNotFound : '.FOO' }
    );
});
