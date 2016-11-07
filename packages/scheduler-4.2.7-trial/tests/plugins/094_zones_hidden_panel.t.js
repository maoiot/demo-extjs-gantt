StartTest(function(t) {
    var scheduler = t.getScheduler({
        startDate : new Date(2011, 0, 3),
        endDate : new Date(2011, 0, 6),
        renderTo : document.body,
        viewConfig  : {
            // animations fail in chrome 40
            // https://code.google.com/p/chromium/issues/detail?id=454960
            eventAnimations : false
        },

        plugins : Ext.create("Sch.plugin.Zones", {
            store : Ext.create('Ext.data.JsonStore', {
                model : 'Sch.model.Range',
                data : [
                    {
                        StartDate : new Date(2011, 0, 3),
                        EndDate   : new Date(2011, 0, 4),
                        Cls       : 'sch-sch-myZoneStyle'
                    }
                ]
            })
        })
    });

    t.chain(
        { waitForSelector : [ '.sch-sch-myZoneStyle', scheduler.el ] },

        function (next) {
            scheduler.hide();
            scheduler.setStart(new Date(2011, 0, 2));
            next();
        },

        // Animation should finish first
        { waitFor : 500 },

        // During this interval, zones will repaint with 0 height since view is hidden
        function(next){
            scheduler.show();
            next();
        },

        { waitForSelector : [ '.sch-sch-myZoneStyle', scheduler.el ] },

        // zone should eventually get proper height
        { waitFor : function () { return Ext.select('.sch-zone').first().getHeight() == scheduler.normalGrid.view.el.down('.x-grid-item-container').getHeight(); } }

    );
});
