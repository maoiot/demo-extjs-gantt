StartTest(function (t) {
    var scheduler, event, event1, event2;

    var setup = function (config) {
        scheduler && scheduler.destroy();

        scheduler = t.getScheduler(Ext.apply({
            mode        : 'calendar',
            renderTo    : Ext.getBody(),
            startDate   : new Date(2014, 4, 28),
            viewConfig  : {
                // animations fail in chrome 40
                // https://code.google.com/p/chromium/issues/detail?id=454960
                eventAnimations : false
            },
            dependencyViewConfig : {
                drawDependencies : false
            },

            eventStore  : t.getEventStore({
                data    : [
                    {
                        Id          : 1,
                        StartDate   : new Date(2014, 4, 28, 2),
                        EndDate     : new Date(2014, 4, 28, 4),
                        ResourceId  : 'r1',
                        Name        : 'Test'
                    }
                ]
            }),

            eventRenderer : function (eventRec, resourceRec, templateData) {
                 templateData.cls = 'sch-event-' + eventRec.getId();
            },

            onEventCreated : function (event) {
                event.setId(this.eventStore.last().getId() + 1);
            }
        }, config));

        event   = scheduler.eventStore.getById(1);
    };

    // https://www.assembla.com/spaces/bryntum/tickets/2813
    t.it('Calendar column class should be configurable', function (t) {
        t.expectGlobals('MyColumnCls');

        Ext.define('MyColumnCls', {
            extend : 'Sch.column.Day',
            alias : 'widget.mycolumncls'
        });

        setup({
            calendarColumnClass : 'MyColumnCls'
        });

        t.waitForRowsVisible(scheduler, function () {
            t.ok(t.cq1('mycolumncls'), 'Column is an instance of the correct class');
        });
    });

    t.it('Should render week', function (t) {
        setup();

        t.chain(
            { waitForEventsToRender : scheduler },

            function (next) {
                var columns = scheduler.normalGrid.columnManager.getColumns();
                t.is(columns.length, 7, '7 column rendered');

                t.it('Column are fine', function (t) {
                    var start = scheduler.timeAxis.getStart();

                    for (var i = 0; i < columns.length; i++) {
                        t.is(columns[i].start, Sch.util.Date.add(start, 'd', i), 'Column start is correct');
                        t.is(columns[i].end, Sch.util.Date.add(start, 'd', i + 1), 'Column end is correct');
                    }
                });

                var eventEl = scheduler.el.down('.sch-event-1');

                t.ok(eventEl.up('.x-grid-cell-inner').getWidth() - eventEl.getWidth() <= 4, 'Event width is correct');

                t.is(scheduler.normalGrid.getStore().getCount(), scheduler.lockedGrid.getStore().getCount(), 'Rows amount is equal');

                next();
            }
        );
    });

    t.it('Drag drop should work correctly', function (t) {
        setup();

        var view = scheduler.getSchedulingView();

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                t.waitForEvent(view, 'refresh', next);
                scheduler.timeAxisViewModel.setViewColumnWidth(100);
            },
            { drag : '.sch-event-1', offset : [20, 20], by : [-40, 0], dragOnly : true },
            function (next) {
                var el = view.getElementsFromEventRecord(view.eventStore.first())[0];
                t.is(el.getStyle('visibility'), 'hidden', 'Dragged record hidden');
                next();
            },
            { action : 'mouseup' },
            function (next) {
                var event = scheduler.eventStore.getAt(0);
                t.is(event.getStartDate(), new Date(2014, 4, 27, 2), 'Event start date is correct');
                next();
            },
            { drag : '.sch-event-1', offset : [20, 20], by : [-40, 0] },
            function (next) {
                var event = scheduler.eventStore.getAt(0);
                t.is(event.getStartDate(), new Date(2014, 4, 26, 2), 'Event start date is correct');

                event.setResourceId('r2');

                scheduler.eventStore.add({
                    Id: 2,
                    StartDate: new Date(2014, 4, 30, 2),
                    EndDate: new Date(2014, 4, 30, 4),
                    ResourceId: 'r1'
                });

                next();
            },
            { drag : '.sch-event-2', to : '.sch-event-1' },
            function (next) {
                var event = scheduler.eventStore.last();
                t.is(event.getStartDate(), new Date(2014, 4, 26, 2), 'Event 2 start date is correct');
            }
        );
    });

    t.it('Drag create should work correctly', function (t) {
        setup();

        var colWidth = scheduler.timeAxisViewModel.calendarColumnWidth;

        t.chain(
            { waitForEventsToRender : scheduler },
            // drag create
            { drag : function () {
                    return t.safeSelect('.x-grid-item[data-recordindex="2"] .sch-timetd', scheduler.el.dom);
                }, offset : [20, 5], by : [0, 31], dragOnly : true
            },

            function (next) {
                t.isApprox(scheduler.el.down('.sch-dragcreator-proxy').getWidth(), colWidth, 2, 'Proxy width is correct');
                next();
            },
            { moveMouseBy : [[-30, 0]], desc : 'Moving mouse away from view should work ok' },
            { action : 'mouseUp' },
            function (next) {
                event1 = scheduler.eventStore.last();
                t.is(event1.getStartDate(), new Date(2014, 4, 26, 2), 'Start date is correct');
                t.is(event1.getEndDate(), new Date(2014, 4, 26, 3), 'End date is correct');
                // TODO: append resource check
                next();
            },
            // drag create
            { drag : function () {
                    return t.safeSelect('.x-grid-item[data-recordindex="3"] .sch-timetd', scheduler.el.dom);
                }, offset : [97, 8], by : [-4, 30]
            },
            function (next) {
                event2 = scheduler.eventStore.last();
                t.is(event2.getStartDate(), new Date(2014, 4, 26, 3), 'Start date is correct');
                t.is(event2.getEndDate(), new Date(2014, 4, 26, 4), 'End date is correct');
                // TODO: append resource check
                next();
            },
            { drag : ".sch-event", by : [1, 21] },
            function (next) {
                t.is(event1.getStartDate(), new Date(2014, 4, 26, 2, 30), 'Start date is correct');
                t.is(event1.getEndDate(), new Date(2014, 4, 26, 3, 30), 'End date is correct');

                var events = t.getFirstScheduleCellEl(scheduler).query('.sch-event');
                Ext.each(events, function (event) {
                    t.isApprox(Ext.fly(event).getWidth(), colWidth / 2, 1, 'Event width is correct');
                });
                next();
            }
        );
    });

    t.it('getDateFromCoordinate works correct', function (t) {
        setup();

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                scheduler.timeAxisViewModel.setViewColumnWidth(100);

                var view = scheduler.getSchedulingView();
                t.is(view.getDateFromCoordinate([0, 0], null, true), scheduler.getStartDate(), 'Date from coordinate is correct');

                var columnWidth = scheduler.normalGrid.columnManager.getColumns()[0].getWidth();
                t.is(view.getDateFromCoordinate([columnWidth, 0], null, true), Sch.util.Date.add(scheduler.getStartDate(), 'd', 1), 'Date from coordinate is correct');

                // todo check bottom right corner
            }
        );
    });

    t.it('Should react and refresh view if scheduler is resized', function (t) {
        scheduler && scheduler.destroy();

        scheduler = t.getScheduler({
            mode        : 'calendar',
            width       : 600,
            renderTo    : Ext.getBody(),
            startDate   : new Date(2014, 4, 26),
            viewConfig  : {
                // animations fail in chrome 40
                // https://code.google.com/p/chromium/issues/detail?id=454960
                eventAnimations : false
            },
            eventStore  : t.getEventStore({
                data    : [
                    {
                        Id          : 1,
                        StartDate   : new Date(2014, 4, 26, 2),
                        EndDate     : new Date(2014, 4, 26, 4)
                    }
                ]
            })
        });

        function verifyFit() {
            var totalColWidth = 0;

            Ext.Array.each(scheduler.query('weekview-day'), function(col) {
                totalColWidth += col.getWidth();
            });

            t.isApprox(totalColWidth, scheduler.normalGrid.view.getWidth() - Ext.getScrollbarSize().width, 'Columns should be fit to the available space');
        }

        var event, eventWidth;

        t.chain(
            { waitForEventsToRender : scheduler },
            { waitFor : 500 },
            function (next) {
                event       = scheduler.el.down('.sch-event');
                eventWidth  = event.getWidth();

                verifyFit();

                // event element is rendered to have 2px from left/right sides
                t.isApprox(event.getWidth(), scheduler.down('weekview-day').getWidth(), 5, 'Event should match the column width');

                scheduler.setWidth(500);

                next();
            },
//            { waitForCSSTransition : [scheduler.el, 100] },
            function (next) {

                event       = scheduler.el.down('.sch-event');

                t.isLess(event.getWidth(), eventWidth, 'Event width should decrease');

                verifyFit();
            }
        );
    });

    t.it('View preset should be consumed correctly', function (t) {
        scheduler && scheduler.destroy();

        scheduler = t.getScheduler({
            mode        : 'calendar',
            width       : 600,
            renderTo    : Ext.getBody(),
            startDate   : new Date(2014, 4, 26),
            eventStore  : t.getEventStore({
                data    : [
                    {
                        Id          : 1,
                        StartDate   : new Date(2014, 4, 26, 2),
                        EndDate     : new Date(2014, 4, 26, 4)
                    }
                ]
            })
        });

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                t.waitForEvent(scheduler.timeAxisViewModel, 'reconfigure', next);
                scheduler.switchViewPreset('day', scheduler.timeAxis.getStart(), scheduler.timeAxis.getEnd());
            },
            function (next) {
                t.isApprox(scheduler.el.down('.sch-event').getWidth(), scheduler.normalGrid.down('gridcolumn').getWidth() - 4, 1, 'Width is correct');

                t.waitForEvent(scheduler.timeAxisViewModel, 'reconfigure', next);
                scheduler.switchViewPreset('week', scheduler.timeAxis.getStart(), scheduler.timeAxis.getEnd());
            },
            function (next) {
                t.isApprox(scheduler.el.down('.sch-event').getWidth(), scheduler.normalGrid.down('gridcolumn').getWidth() - 4, 1, 'Width is correct');
            }
        );
    });

    t.it('Setting new timeSpan should update view', function (t) {
        var sched = t.getScheduler({
            mode        : 'calendar',
            width       : 600,
            renderTo    : Ext.getBody(),
            startDate   : new Date(2014, 4, 26)
        });

        var view = sched.getSchedulingView();

        t.chain(
            { waitForRowsVisible : sched },
            function (next) {
                t.waitForEvent(view, 'bufferedrefresh', next);
                sched.setStart(new Date());
            },
            function (next) {
                t.pass('View is updated');
            }
        );
    });

    t.it('Should react on CRUD operations on event store', function (t) {
        setup({
            eventStore  : t.getEventStore({
                data    : [
                    {
                        Id          : 0,
                        StartDate   : new Date(2014, 4, 26, 2),
                        EndDate     : new Date(2014, 4, 27, 2),
                        ResourceId  : 'r1',
                        Name        : 'Test'
                    },
                    {
                        Id          : 1,
                        StartDate   : new Date(2014, 4, 27, 2),
                        EndDate     : new Date(2014, 4, 28, 4),
                        ResourceId  : 'r1',
                        Name        : 'Test 1'
                    }
                ]
            })
        });

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                scheduler.eventStore.remove(scheduler.eventStore.first());

                var view = scheduler.getSchedulingView();

                Ext.each(view.getElementsFromEventRecord(scheduler.eventStore.first()), function (el) {
                    t.isApprox(Ext.fly(el).getWidth(), scheduler.timeAxisViewModel.calendarColumnWidth, 2, 'Width is correct');
                });

                scheduler.eventStore.add({
                    Id          : 2,
                    StartDate   : new Date(2014, 4, 29, 5),
                    EndDate     : new Date(2014, 4, 29, 7),
                    ResourceId  : 'r1',
                    Name        : 'Test 2'
                });

                var el = view.getElementsFromEventRecord(scheduler.eventStore.last())[0];
                el = Ext.get(el);

                t.isApprox(el.getHeight(), scheduler.timeAxisViewModel.getViewRowHeight() * 2, 1, 'Height is correct');
                t.isApprox(el.getWidth(), scheduler.timeAxisViewModel.calendarColumnWidth, 2, 'Width is correct');

                scheduler.eventStore.last().setStartEndDate(new Date(2014, 4, 28, 2), new Date(2014, 4, 29, 2));

                t.selectorCountIs('.sch-event', 4, 'Correct amount of events rendererd');

                scheduler.eventStore.removeAt(0, 2);

                t.selectorNotExists('.sch-event', 'Events are removed');
            }
        )
    });

    t.it('Viewmodel should change view preset correctly', function (t) {
        var viewModel = new Ext.app.ViewModel({
            data: {
                viewPreset: 'week'
            }
        });

        setup({
            eventStore: t.getEventStore({
                data: [
                    {
                        StartDate   : new Date(2014, 4, 26, 2),
                        EndDate     : new Date(2014, 4, 26, 4),
                        ResourceId  : 'r1',
                        Name        : 'Test'
                    }, {
                        StartDate   : new Date(2014, 4, 27, 5),
                        EndDate     : new Date(2014, 4, 27, 7),
                        ResourceId  : 'r1',
                        Name        : 'Test'
                    }
                ]
            }),
            viewModel: viewModel,
            bind: {
                viewPreset: '{viewPreset}'
            },
            tbar: [{
                xtype: 'segmentedbutton',
                bind: '{viewPreset}',
                items: [{
                    text: "Day",
                    itemId: 'day',
                    value: 'day'
                }, {
                    text: "Week",
                    itemId: 'week',
                    value: 'week'
                }]
            }]
        });

        scheduler.normalGrid.on('columnresize', function (header, column, width) {
            //scheduler.timeAxisViewModel.setViewColumnWidth(width, true);
            if (width !== scheduler.timeAxisViewModel.calendarColumnWidth) {
                scheduler.timeAxisViewModel.setViewColumnWidth(width, true);
            }

            scheduler.normalGrid.view.calendar.repaintEventsForColumn(column, header.columnManager.indexOf(column));
        });

        t.chain(
            { waitForEventsToRender : scheduler },
            { click : "#day => .x-btn-button" },
            function (next) {
                t.isApprox(scheduler.el.down('.sch-event').getWidth(), scheduler.el.down('.sch-timetd').getWidth(), 2, 'Event element got correct width');
                next();
            },
            { click : "#week => .x-btn-button" },
            function () {
                t.isApprox(scheduler.el.down('.sch-event').getWidth(), scheduler.el.down('.sch-timetd').getWidth(), 2, 'Event element got correct width');
            }
        )
    });
});