StartTest(function (t) {

    var g;

    t.beforeEach(function() { g && g.destroy(); });

    t.it('Should render weekend elements if highlightWeekends is true', function(t){
        g = t.getGantt({
            viewPreset          : 'weekAndDayLetter',
            renderTo            : Ext.getBody(),
            highlightWeekends   : true,
            weekendsAreWorkdays : false
        });

        t.chain(
            { waitForSelector : '.sch-zone' },
            { waitForSelector : '.sch-timelinepanel-highlightweekends .sch-dayheadercell-nonworking' },

            function(next) {
                g.disableWeekendHighlighting(true);
                next()
            },

            { waitForSelectorNotFound : '.sch-zone' },
            { waitForSelectorNotFound : '.sch-timelinepanel-highlightweekends .sch-dayheadercell-nonworking' },

            function(next) {
                g.disableWeekendHighlighting(false);
                next()
            },

            { waitForSelector : '.sch-zone' },
            { waitForSelector : '.sch-timelinepanel-highlightweekends .sch-dayheadercell-nonworking' }
        );
    })

    t.it('Should not render weekend elements if highlightWeekends is false', function(t){
        g = t.getGantt({
            viewPreset          : 'weekAndDayLetter',
            renderTo            : Ext.getBody(),
            highlightWeekends   : false
        });

        t.chain(
            { waitForRowsVisible : g },
            { waitForSelectorNotFound : '.sch-zone' },
            { waitForSelectorNotFound : '.sch-dayheadercell-nonworking' }
        );
    })
})
