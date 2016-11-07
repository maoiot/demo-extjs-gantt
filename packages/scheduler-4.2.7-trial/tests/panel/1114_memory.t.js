StartTest(function (t) {

    t.it('Should not leak stores', function (t) {
        var nbrStoresBefore = Ext.StoreManager.getCount()

        var scheduler = t.getScheduler({
            renderTo      : Ext.getBody(),
            startDate     : new Date(2010, 1, 1),
            endDate       : new Date(2010, 2, 1),
            viewConfig    : { deferInitialRefresh : false },
            destroyStores : true,
            plugins       : [
                new Sch.plugin.CurrentTimeLine()
            ]
        });

        t.chain(
            { waitForRowsVisible : scheduler },

            function () {
                scheduler.destroy();

                t.is(Ext.StoreManager.getCount(), nbrStoresBefore, 'No leaked stores found')
            }
        );
    });

    t.it('Should not leak columns', function (t) {
        Ext.define('Sch.MyScheduler', {
            extend   : 'Sch.panel.SchedulerGrid',
            renderTo : Ext.getBody(),
            height   : 300,
            width    : 400,
            columns  : {
                items : [
                    {
                        width : 300
                    }
                ]
            }
        })

        var scheduler = new Sch.MyScheduler();
        scheduler.destroy();

        scheduler = new Sch.MyScheduler();
        scheduler.destroy();

        scheduler = new Sch.MyScheduler();
        scheduler.destroy();

        t.expect(Sch.MyScheduler.prototype.columns.items.length).toBe(1);
    });

});

