StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();

        scheduler = t.getScheduler({
            mode        : 'calendar',
            calendarViewPreset  : 'week',
            startDate   : new Date(2014, 4, 28),
            viewConfig  : {
                // animations fail in chrome 40
                // https://code.google.com/p/chromium/issues/detail?id=454960
                eventAnimations : false
            },
            eventStore  : t.getEventStore({
                data    : [{
                    Id          : 1,
                    StartDate   : new Date(2014, 4, 28, 2),
                    EndDate     : new Date(2014, 4, 29, 3),
                    ResourceId  : 'r1',
                    Name        : 'Test'
                }, {
                    Id          : 2,
                    StartDate   : new Date(2014, 4, 29, 5),
                    EndDate     : new Date(2014, 4, 29, 6),
                    ResourceId  : 'r1',
                    Name        : 'Test'
                }, {
                    Id          : 3,
                    StartDate   : new Date(2014, 4, 27, 1),
                    EndDate     : new Date(2014, 4, 27, 3),
                    ResourceId  : 'r1',
                    Name        : 'Test'
                }]
            }),
            renderTo    : Ext.getBody()
        });
    });

    t.it('Should relayout events correctly after drag drop', function (t) {
        var trEl, width;

        t.chain(
            { waitForEventsToRender : scheduler },
            { waitFor : 500 },
            function (next) {
                trEl        = t.safeSelect('tr:nth-child(1)', scheduler.normalGrid.view.el.dom);
                width       = scheduler.timeAxisViewModel.calendarColumnWidth;
                next();
            },
            { drag : function () {
                    return t.safeSelect('td:nth-child(4) .sch-event', trEl.dom);
                }, by : [0, 116]
            },
            function (next) {
                t.isApprox(t.safeSelect('td:nth-child(3) .sch-event', trEl.dom).getWidth(), width, 4, 'First part\'s width is correct');
                t.isApprox(t.safeSelect('td:nth-child(4) .sch-event', trEl.dom).getWidth(), width / 2, 2, 'Second part\'s width is correct');
                next();
            },
            { drag : function () {
                    return t.safeSelect('td:nth-child(3) .sch-event', trEl.dom);
                }, offset : [10, 10], by : [0, -45]
            },
            function (next) {
                t.isApprox(t.safeSelect('td:nth-child(3) .sch-event', trEl.dom).getWidth(), width, 4, 'First part\'s width is correct');
                t.isApprox(t.safeSelect('td:nth-child(4) .sch-event', trEl.dom).getWidth(), width, 4, 'Second part\'s width is correct');
                next();
            },
            { drag : function () {
                    return t.safeSelect('td:nth-child(3) .sch-event', trEl.dom);
                }, offset : [10, 10], by : [-81, -86]
            },
            function (next) {
                t.isApprox(t.safeSelect('td:nth-child(2) .sch-event:nth-child(2)', trEl.dom).getWidth(), width / 2, 2, 'First part\'s width is correct');
                t.isApprox(t.safeSelect('td:nth-child(3) .sch-event', trEl.dom).getWidth(), width, 4, 'Second part\'s width is correct');
                next();
            },
            { drag : function () {
                    return t.safeSelect('td:nth-child(4) .sch-event', trEl.dom);
                }, by : [-120, -109]
            },
            function (next) {
                t.isApprox(t.safeSelect('td:nth-child(3) .sch-event:nth-child(2)', trEl.dom).getWidth(), width / 2, 2, 'Short event\'s width is correct');
                t.isApprox(t.safeSelect('td:nth-child(3) .sch-event', trEl.dom).getWidth(), width / 2, 2, 'Second part\'s width is correct');
                next();
            },
            { drag : function () {
                    return t.safeSelect('td:nth-child(3) .sch-event:nth-child(2)', trEl.dom);
                }, by : [-120, 54]
            },
            function (next) {
                t.isApprox(t.safeSelect('td:nth-child(3) .sch-event', trEl.dom).getWidth(), width, 4, 'Second part\'s width is correct');
                t.isApprox(t.safeSelect('td:nth-child(2) .sch-event:nth-child(3)', trEl.dom).getWidth(), width / 2, 2, 'Short event\'s width is correct');
                next();
            },
            { drag : function () {
                    return t.safeSelect('td:nth-child(2) .sch-event:nth-child(2)', trEl.dom);
                }, offset : [10, 10], by : [-100, -6]
            },
            function (next) {
                t.isApprox(t.safeSelect('td:nth-child(1) .sch-event', trEl.dom).getWidth(), width, 4, 'First part\'s width is correct');
                t.isApprox(t.safeSelect('td:nth-child(2) .sch-event:nth-child(3)', trEl.dom).getWidth(), width / 2, 2, 'Second\'s width is correct');
                next();
            }
        );
    });

    t.it('getElement(s)FromEventRecord should return correct dom nodes', function (t) {
        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                var view = scheduler.getSchedulingView();
                var record = scheduler.eventStore.getAt(0);

                var nodes = view.getElementsFromEventRecord(record);

                t.is(nodes.length, 2, 'Got correct amount of nodes');

                Ext.Array.forEach(nodes, function (node) {
                    if (node) {
                        t.is(record, view.getEventRecordFromDomId(node.dom.id), 'Record looked up correctly');
                    } else {
                        t.fail('Cannot lookup node by record');
                    }
                });

                next();
            }
        );
    });
});
