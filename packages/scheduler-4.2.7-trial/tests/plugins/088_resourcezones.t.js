StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    var doTest = function (t, isTree, orientation) {
        var eventStore = t.getEventStore({
                data : [{
                    Id         : 'e10',
                    ResourceId : 'r1',
                    Name       : 'Assignment 1',
                    StartDate  : "2011-01-03",
                    EndDate    : "2011-01-05"
                }]
            }),

            zoneStore  = Ext.create('Sch.data.EventStore', {
                model : 'Sch.model.Event',
                data  : [
                    {
                        StartDate  : new Date(2011, 0, 3),
                        EndDate    : new Date(2011, 0, 13),
                        ResourceId : 'r1',
                        Cls        : 'sch-sch-myZoneStyle'
                    }
                ]
            });

        scheduler         = t[isTree ? "getSchedulerTree" : "getScheduler"]({
            height        : 200,
            width         : 400,
            startDate     : new Date(2011, 0, 2),
            endDate       : new Date(2011, 0, 6),
            viewPreset    : 'weekAndMonth',
            forceFit      : true,
            orientation   : orientation,
            resourceZones : zoneStore,
            eventStore    : eventStore
        });
        var resourceStore = scheduler.getResourceStore();

        scheduler.render(Ext.getBody());
        var view = scheduler.getSchedulingView();

        t.chain(
            {waitForSelector : ['.sch-sch-myZoneStyle', scheduler.el]},

            function (next) {
                t.pass('Zone rendered ok, setting custom zone style works');

                var firstRowTimeCell = t.getFirstScheduleCellEl(scheduler), // This cell is covered fully by the only rendered event
                    firstEventEl     = t.getFirstEventEl(scheduler),
                    zoneEl           = scheduler.el.down('.sch-sch-myZoneStyle');

                // Make sure zone is not sitting on top of events
                t.elementIsTopElement(firstEventEl, true, 'Event was found on top of zone', true);

                var found,
                    xy = firstRowTimeCell.getXY();

                for (var j = 0; j < 60; j++) {
                    if (t.elementFromPoint(xy[0] + 5, xy[1] + j) === zoneEl) {
                        found = true;
                        break;
                    }
                }
                t.notOk(found, 'Zone completely unreachable');

                var newZone = new zoneStore.model({
                    StartDate  : new Date(2011, 0, 4),
                    EndDate    : new Date(2011, 0, 5),
                    ResourceId : 'r1',
                    Cls        : 'sch-otherZoneStyle'
                });
                zoneStore.add(newZone);
                next()
            },

            {waitFor : 500},

            function (next) {
                var zoneEl = scheduler.el.down('.sch-otherZoneStyle');

                t.pass('Adding new resource zone dynamically works');

                if (orientation === 'horizontal') {
                    var rowNode = view.getNode(resourceStore.getById('r1'));
                    t.isApprox(zoneEl.getHeight(), Ext.fly(rowNode).down('.x-grid-cell-inner').getHeight(), 1, 'Height correct for resource zone el');
                }

                var startEndDates = view.getStartEndDatesFromRegion(zoneEl.getRegion(), 'round');

                t.isDateEqual(startEndDates.start, new Date(2011, 0, 4), 'Zone rendered in correct place on the time axis');
                t.isDateEqual(startEndDates.end, new Date(2011, 0, 5), 'Zone rendered in correct place on the time axis');

                if (resourceStore instanceof Ext.data.TreeStore) {
                    resourceStore.getNodeById('r1').remove();
                } else {
                    resourceStore.remove(resourceStore.getById('r1'));
                }
                t.waitForSelectorNotFound('.sch-otherZoneStyle', scheduler.el, next);
            }
        );
    };

    t.it('Grid horizontal orientation tests', function (t) {
        doTest(t, false, 'horizontal');
    });

    t.it('Grid vertical orientation tests', function (t) {
        doTest(t, false, 'vertical');
    });

    t.it('Tree horizontal orientation tests', function (t) {
        doTest(t, true, 'horizontal');
    });

    t.it('Should repaint a single element after a zone record is updated', function (t) {
        var zoneStore = Ext.create('Sch.data.EventStore', {
            data : [
                {
                    StartDate  : new Date(2011, 0, 3),
                    EndDate    : new Date(2011, 0, 4),
                    ResourceId : 'r3',
                    Cls        : 'sch-reszone'
                }
            ]
        });

        var scheduler = t.getScheduler({
            height        : 200,
            width         : 400,
            renderTo      : document.body,
            startDate     : new Date(2011, 0, 2),
            endDate       : new Date(2011, 0, 6),
            forceFit      : true,
            resourceZones : zoneStore
        });

        t.chain(
            { waitForSelector : '.sch-reszone'},

            function () {
                var tickWidth = scheduler.timeAxisViewModel.getTickWidth();

                t.isApprox(scheduler.el.down('.sch-reszone').getWidth(), tickWidth, 2)

                zoneStore.first().setEndDate(new Date(2011, 0, 5));

                t.waitFor(function() {
                    return Math.abs(scheduler.el.down('.sch-reszone').getWidth() - (2 * tickWidth)) <= 2;
                }, function() {
                    t.ok('Zone element refreshed')
                })
            }
        )
    })
});
