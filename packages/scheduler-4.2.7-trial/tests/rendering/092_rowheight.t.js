StartTest(function(t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    t.it('setRowHeight updates row height of scheduler', function (t) {
        scheduler = t.getScheduler({
            renderTo        : Ext.getBody(),
            rowHeight       : 30
        });

        var lockedView = scheduler.lockedGrid.getView(),
            normalView = scheduler.getSchedulingView();

        t.waitForEventsToRender(scheduler, function () {
            t.isApprox(Ext.fly(normalView.getNode(0)).getHeight(), 30, 'Normal row height ok');
            t.isApprox(Ext.fly(lockedView.getNode(0)).getHeight(), 30, 'Locked row height ok');

            t.rowHeightsAreInSync(scheduler, 'Row heights in sync after rendering');

            normalView.setRowHeight(50);

            t.isApprox(Ext.fly(normalView.getNode(0)).getHeight(), 50, 'Locked row height ok after setRowHeight');
            t.isApprox(Ext.fly(lockedView.getNode(0)).getHeight(), 50, 'Locked row height ok after setRowHeight');

            t.rowHeightsAreInSync(scheduler, 'Row heights in sync after setRowHeight');

            normalView.setRowHeight(30);

            t.isApprox(Ext.fly(normalView.getNode(0)).getHeight(), 30, 'Normal row height ok');
            t.isApprox(Ext.fly(lockedView.getNode(0)).getHeight(), 30, 'Locked row height ok');

            t.rowHeightsAreInSync(scheduler, 'Row heights in sync after rendering');
        });
    });

    t.it('row height should react on event store add/remove', function (t) {
        scheduler = t.getScheduler({
            renderTo        : Ext.getBody(),
            resourceStore   : t.getResourceStore({
                data : [
                    { Id : 'c1', Name : 'Foo' },
                    { Id : 'c2', Name : 'Boo' }
                ]
            }),
            rowHeight       : 30,
            eventStore      : t.getEventStore({
                data : [
                    { ResourceId: 'c1', StartDate : '2011-01-03', EndDate : '2011-01-04' },
                    { ResourceId: 'c1', StartDate : '2011-01-03', EndDate : '2011-01-04' }
                ]
            })
        });

        var lockedView = scheduler.lockedGrid.getView(),
            normalView = scheduler.getSchedulingView();

        t.chain(
            { waitFor : 'EventsToRender', args : scheduler },
            
            function(next) {
                var scheduleRowEl   = Ext.get(normalView.getNode(0));
                var lockedRowEl     = Ext.get(lockedView.getNode(0));

                t.isApprox(scheduleRowEl.getHeight(), 60, 'Normal row height ok');
                t.isApprox(lockedRowEl.getHeight(), 60, 'Locked row height ok');

                t.rowHeightsAreInSync(scheduler, 'Row heights in sync after rendering');

                normalView.setRowHeight(50);

                scheduleRowEl   = Ext.get(normalView.getNode(0));
                lockedRowEl     = Ext.get(lockedView.getNode(0));

                t.isApprox(scheduleRowEl.getHeight(), 100, 'Locked row height ok after setRowHeight');
                t.isApprox(lockedRowEl.getHeight(), 100, 'Locked row height ok after setRowHeight');

                t.rowHeightsAreInSync(scheduler, 'Row heights in sync after setRowHeight');

                normalView.setRowHeight(100);
                scheduler.eventStore.last().setResourceId('c1');
                next();
            },
    
            function(next) {
                var scheduleRowEl   = Ext.get(normalView.getNode(0)),
                    lockedRowEl     = Ext.get(lockedView.getNode(0));
                
                t.rowHeightsAreInSync(scheduler, 'Row heights should be in sync with multiple events overlapping');

                next();
            }
        );
    });
    
    t.it('Row height should be updated after changing timespan', function (t) {
        scheduler = t.getScheduler({
            renderTo        : Ext.getBody(),
            resourceStore   : t.getResourceStore({
                data : [
                    { Id : 'c1', Name : 'Foo' },
                    { Id : 'c2', Name : 'Boo' }
                ]
            }),
            eventStore      : t.getEventStore({
                data : [
                    { ResourceId: 'c1', StartDate : '2011-01-03', EndDate : '2011-01-05' },
                    { ResourceId: 'c1', StartDate : '2011-01-03', EndDate : '2011-01-04' }
                ]
            })
        });

        var lockedView = scheduler.lockedGrid.getView(),
            normalView = scheduler.getSchedulingView(),
            height;

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                height = Ext.fly(normalView.getNode(1)).getHeight();

                t.waitForEvent(scheduler, 'viewchange', next);
                scheduler.shiftNext();
            },
            function () {
                t.isApprox(Ext.fly(normalView.getNode(0)).getHeight(), height, 'Normal row height ok');
                t.isApprox(Ext.fly(lockedView.getNode(0)).getHeight(), height, 'Locked row height ok');
            }
        )
    });

    t.it('Vertical row height should be in sync after shiftNext', function (t) {
        var res2 = Ext.create('Sch.data.ResourceStore', {
            model : 'Sch.model.Resource',
            data : [
                {Id : 'c1', Name : 'Foo'}
            ]
        });
            
        // Store holding all the events
        var ev2 = t.getEventStore({
            data : [
                {ResourceId: 'c1', Name : 'Mike', StartDate : "2010-12-09 07:45", EndDate : "2010-12-09 11:00"},
                {ResourceId: 'c1', Name : 'Linda', StartDate : "2010-12-09 07:45", EndDate : "2010-12-09 11:00"}
            ]
        });
    
        scheduler = t.getScheduler({
            viewPreset      : 'hourAndDay',
            startDate       : new Date(2010, 11, 9, 8),
            endDate         : new Date(2010, 11, 9, 20),
            rowHeight       : 100,    
            height          : 150,
            orientation     : 'vertical',
            resourceStore   : res2,
            eventStore      : ev2
        });
        scheduler.render(Ext.getBody());
    
        var svVert = scheduler.getSchedulingView(),
            lvVert = scheduler.lockedGrid.getView();
    
        t.waitForRowsVisible(scheduler, function() {
            scheduler.shiftNext();
    
            t.is(
                Ext.fly(lvVert.getNode(0)).getHeight(),
                Ext.fly(svVert.getNode(0)).getHeight(),
                'Vertical row height in sync after shiftNext'
            );
        });
    });
});
