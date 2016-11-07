StartTest(function(t) {
    
    var createFakeData = function (count) {
        var resources = [], i;
        
        for (i = 0; i < count; i++)
            resources.push({
                Id          : i, 
                Name        : 'BuffRow' + i
            });
        
        var events = [];
        
        for (i = 0; i < count; i++) {
            events.push({
                Id          : i, 
                Name        : 'Event' + i,
                ResourceId  : i,
                StartDate   : new Date(2011, 0, 4),
                EndDate     : new Date(2011, 0, 5)
            });
            
            if (i % 2) events.push({
                Id          : i + '-2', 
                Name        : 'Event' + i + '-2',
                ResourceId  : i,
                StartDate   : new Date(2011, 0, 4),
                EndDate     : new Date(2011, 0, 5)
            });

        }
        
        return {
            resourceStore       : new Sch.data.ResourceStore({
                data            : resources
            }),
            
            eventStore         : new Sch.data.EventStore({
                data            : events
            })
        }
    };
    
    var data            = createFakeData(1000);

    // create the Resource Store
    var resourceStore   = data.resourceStore;
    var eventStore      = data.eventStore;

    t.expectGlobal('Line');

    t.it('Should synchronize rows after buffered view scrolling', function(t) {

        Ext.define('Line', {
            extend      : 'Ext.data.Model',
            fields      : [
                'Date',
                'Text',
                'Cls'
             ]
        });

        var lineStore = Ext.create('Ext.data.Store', {
            model       : 'Line',
            data        : [
                {
                    Date    : new Date(2011, 0, 4, 12),
                    Text    : 'Some important date',
                    Cls     : 'sch-myLineStyle'
                }
            ]
        });

        var zoneStore   = Ext.create('Ext.data.Store', {
            model   : 'Sch.model.Range',
            data    : [
                {
                    StartDate   : new Date(2011, 0, 4),
                    EndDate     : new Date(2011, 0, 5),
                    Cls         : 'sch-myZoneStyle'
                }
            ]
        });


        var scheduler = t.getScheduler({
            eventStore      : eventStore,
            resourceStore   : resourceStore,
            width           : 500,
            renderTo        : Ext.getBody(),

            plugins         : [
                Ext.create("Sch.plugin.Zones", {
                    store : zoneStore
                }),

                Ext.create("Sch.plugin.Lines", {
                    store : lineStore
                })
            ],

            dependencyViewConfig : {
                drawDependencies : false
            }
        });

        var schedulingView      = scheduler.getSchedulingView();
        var normalView          = schedulingView;
        var lockedView          = scheduler.lockedGrid.getView();

        var el;

        t.chain(
            {
                waitFor     : 'rowsVisible',
                args        : [ scheduler ]
            },
            {
                // it seems shortly after initial rendering, the "scrollTop" position of the buffered schedulingView will be reset to 0
                // need to wait some time before modifiying it
                waitFor     : 500
            },
            // here we scroll to the bottom of the grid
            function (next) {
                t.bufferedRowsAreSync(scheduler, "Rows are synchronized");
                el                      = schedulingView.el;
                t.isLess(el.query(Ext.grid.View.prototype.itemSelector).length, 1000, "Only part of the dataset has been rendered");
                t.scrollTo(scheduler, el.dom.scrollHeight, next);

            },
            function (next) {
                t.bufferedRowsAreSync(scheduler, "Rows are synchronized");
                var lastNormalRow       = t.safeSelect('.x-grid-item:last-child', el.dom);
                var lastLockedRow       = t.safeSelect('.x-grid-item:last-child', lockedView.el.dom);

                t.is(schedulingView.getRecord(lastNormalRow.dom).getId(), 999, 'Found last record row in scheduler schedulingView');

                t.like(lastLockedRow.dom.innerHTML, 'BuffRow999', 'Found last record row in locked schedulingView');

                t.is(lastNormalRow.getY(), lastLockedRow.getY(), 'Both rows have the same vertical position');

                t.isApprox(el.down('.sch-myZoneStyle').getBottom(), lastLockedRow.getBottom(), 1, 'Zones stretches on whole view height');
                t.isApprox(el.down('.sch-myLineStyle').getBottom(), lastLockedRow.getBottom(), 1, 'Line stretches on whole view height');
                t.isApprox(el.down('.sch-column-line').getBottom(), lastLockedRow.getBottom(), 1, 'Column line stretches on whole view height');

                next()
            },
            // now we are trying to reproduce a row desynchronization regression
            // 1st step is to scroll to the most bottom of the grid
            // (seems previous step causes the spacer element to appear and sligthly increase the scroll height
            // of the view)
            function (next) {
                t.bufferedRowsAreSync(scheduler, "Rows are synchronized");

                // scroll to bottom with 300ms delay
                t.scrollTo(scheduler, el.dom.scrollHeight, next)
            },
            // now we scroll a significant distance to the top, imititating user moving the scrollbar quickly
            // after this step the rows will be desynronized
            function (next) {
                t.bufferedRowsAreSync(scheduler, "Rows are synchronized");
                t.scrollTo(scheduler, el.dom.scrollHeight - el.getHeight() - 1150, next);
            },
            function (next) {
                // verify that we found the fix and rows are in sync
                t.bufferedRowsAreSync(scheduler, "Rows are synchronized");

                // now we scroll almost to the top
                t.scrollTo(scheduler, 1100, next);
            },
            function (next) {
                t.bufferedRowsAreSync(scheduler, "Rows are synchronized");
                t.scrollTo(scheduler, 0, next);
            },
            function (next) {
                t.bufferedRowsAreSync(scheduler, "Rows are synchronized");

                // the table can be slightly out of the view - need to verify it starts at the top
                t.is(normalView.body.getLocalY(), 0, "Normal view should be precisely at the top");
                t.is(lockedView.body.getLocalY(), 0, "Locked view should be precisely at the top");
            }
        )
    });

    t.it('Should keep event selection as you scroll rows in and out of view', function(t) {
        var scheduler = t.getScheduler({
            cls             : 'sch-selection',
            eventStore      : eventStore,
            resourceStore   : resourceStore,
            width           : 500,
            renderTo        : Ext.getBody(),
            dependencyViewConfig : {
                drawDependencies : false
            }
        });

        t.chain(
            { waitForRowsVisible : scheduler },

            function(next) {
                scheduler.getEventSelectionModel().select(eventStore.first())
                t.scrollVerticallyTo(scheduler.getSchedulingView().el, 3000, 300, next)
            },
            function(next) {
                t.scrollVerticallyTo(scheduler.getSchedulingView().el, 0, 300, next)
            },

            function() {
                t.selectorExists('.sch-selection .x-grid-item[data-recordindex="0"] .sch-event-selected');
            }
        )
    })
});

