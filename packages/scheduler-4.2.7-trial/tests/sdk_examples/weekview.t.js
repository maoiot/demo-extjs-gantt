describe("Testing weekview functionality", function (t) {

    t.it("Uncheck all boxes - all events should disappear", function (t) {
        t.chain(
            { click : ">>checkbox[name=r0]" },

            { click : ">>checkbox[name=r1]" },

            { click : ">>checkbox[name=r2]" },

            { click : ">>checkbox[name=r3]" },

            { click : ">>checkbox[name=r4]" },

            { click : ">>checkbox[name=r5]" },

            { click : ">>checkbox[name=r6]" },

            { click : ">>checkbox[name=r7]" },

            { click : ">>checkbox[name=r8]" },

            { click : ">>checkbox[name=r9]" },

            { click : ">>checkbox[name=r10]" },

            function () {
                t.selectorNotExists('.sch-event', 'Should not find any events rendered')
            }
        );
    });

    t.it("Check all boxes - all events should appear", function (t) {
        t.chain(
            { click : ">>checkbox[name=r0]" },

            { click : ">>checkbox[name=r1]" },

            { click : ">>checkbox[name=r2]" },

            { click : ">>checkbox[name=r3]" },

            { click : ">>checkbox[name=r4]" },

            { click : ">>checkbox[name=r5]" },

            { click : ">>checkbox[name=r6]" },

            { click : ">>checkbox[name=r7]" },

            { click : ">>checkbox[name=r8]" },

            { click : ">>checkbox[name=r9]" },

            { click : ">>checkbox[name=r10]" },

            function () {
                var eventsInStore = t.cq1('schedulergrid').getEventStore().getCount();

                t.expect(eventsInStore).toBe(8);
                t.selectorCountIs('.sch-event', eventsInStore, 'Should find all events rendered')
            }
        );
    });

    t.it("Verify binding - form fields should be populated", function (t) {
        t.chain(
            { click : ".sch-event.TheEvent" },

            function (next) {
                var foundName     = t.cq1('textfield[name=Name]').getValue();
                var foundResource = t.cq1('textfield[name=ResourceId]').getValue();

                var foundStartDate = t.cq1('datefield[name=StartDate]').getValue();
                var foundEndDate   = t.cq1('datefield[name=EndDate]').getValue();

                var foundStartTime = t.cq1('timefield[name=StartTime]').getValue();
                var foundEndTime   = t.cq1('timefield[name=EndTime]').getValue();

                t.is(foundName, 'Make the app');
                t.is(foundResource, 'r1');

                t.is(foundStartDate, new Date(2016, 3, 11));
                t.is(foundEndDate, new Date(2016, 3, 11));

                t.is(foundStartTime.getHours(), 8);
                t.is(foundStartTime.getMinutes(), 0);
                t.is(foundEndTime.getHours(), 10);
                t.is(foundEndTime.getMinutes(), 0);

                next();
            }
        );
    });

    t.it("Verify binding - event should be adjusted", function (t) {
        t.chain(
            { click : ".sch-event.TheEvent" },

            { click : "textfield[name=Name] => .x-form-text" },

            { action : "type", text : " test" },

            { waitForSelector : ".TheEvent:contains(Make the app test)", desc : 'Name updated' },

            { click : "resourcecombo => .x-form-trigger" },

            { click : "resourcecombo.getPicker() => .x-boundlist-item:contains(Jake)" },

            { click : "datefield[name=StartDate] => .x-form-trigger" },

            { click : "datefield[name=StartDate].getPicker() => .x-datepicker-date:textEquals(12)" },

            function (next) {
                var eventRecord    = t.cq1('schedulergrid').getEventStore().findRecord('Cls', 'TheEvent');
                var eventStartDate = eventRecord.getStartDate();
                var eventEndDate = eventRecord.getEndDate();
                var resourceID = eventRecord.getResourceId();

                t.is(resourceID, 'r2', 'Resource updated');
                t.is(eventStartDate, new Date(2016, 3, 12, 8));
                t.is(eventEndDate, new Date(2016, 3, 12, 10));

                next();
            },

            { click : "timefield[name=StartTime] => .x-form-trigger" },

            { click : "timefield[name=StartTime].getPicker() => .x-boundlist-item:contains(09:30)" },

            function (next) {
                var eventRecord    = t.cq1('schedulergrid').getEventStore().findRecord('Cls', 'TheEvent');
                var eventStartDate = eventRecord.getStartDate();
                var eventEndDate = eventRecord.getEndDate();

                t.is(eventStartDate, new Date(2016, 3, 12, 9, 30));
                t.is(eventEndDate, new Date(2016, 3, 12, 11, 30));

                next();
            },

            { click : "datefield[name=EndDate] => .x-form-trigger" },

            { click : "datefield[name=EndDate].getPicker() => .x-datepicker-date:textEquals(13)" },

            function (next) {
                var eventRecord    = t.cq1('schedulergrid').getEventStore().findRecord('Cls', 'TheEvent');
                var eventStartDate = eventRecord.getStartDate();
                var eventEndDate = eventRecord.getEndDate();

                t.is(eventStartDate, new Date(2016, 3, 12, 9, 30));
                t.is(eventEndDate, new Date(2016, 3, 13, 11, 30));

                next();
            },

            { click : "timefield[name=EndTime] => .x-form-trigger" },

            { click : "timefield[name=EndTime].getPicker() => .x-boundlist-item:contains(08:30)" },

            function (next) {
                var eventRecord    = t.cq1('schedulergrid').getEventStore().findRecord('Cls', 'TheEvent');
                var eventStartDate = eventRecord.getStartDate();
                var eventEndDate = eventRecord.getEndDate();

                t.is(eventStartDate, new Date(2016, 3, 12, 9, 30));
                t.is(eventEndDate, new Date(2016, 3, 13, 8, 30));

                next();
            }
        );
    });

    // test for #2854
    t.it('Infopanel lives ok', function (t) {
        var schedulergrid = t.cq1('schedulergrid');

        t.chain(
            { click : "#scheduler-1-timelineview => #scheduler-1-8-13-4 .sch-event-inner" },

            { click : ">>#scheduler-1-timelineview", offset : ['100%-10', 10] },

            { click : "datefield[name=StartDate] => .x-form-text" },

            { click : "#scheduler-1-timelineview => #scheduler-1-8-13-4 .sch-event-inner" },

            { click : ">>#scheduler-1-timelineview", offset : ['100%-10', 10] },

            { click : "timefield[name=StartTime] => .x-form-text" },

            { click : "#scheduler-1-timelineview => #scheduler-1-8-13-4 .sch-event-inner" },

            { click : ">>#scheduler-1-timelineview", offset : ['100%-10', 10] },

            { click : "timefield[name=EndTime] => .x-form-text" },

            { click : "#scheduler-1-timelineview => #scheduler-1-8-13-4 .sch-event-inner" },

            { click : ">>#scheduler-1-timelineview", offset : ['100%-10', 10] },

            { click : "datefield[name=EndDate] => .x-form-text" },

            { click : "#scheduler-1-timelineview => #scheduler-1-8-13-4 .sch-event-inner" },

            { click : ">>#scheduler-1-timelineview", offset : ['100%-10', 10] },

            { click : "datefield[name=StartDate] => .x-form-text" },

            { click : "#scheduler-1-timelineview => #scheduler-1-8-13-4 .sch-event-inner" },

            function () {
                t.pass('No exceptions thrown');
            }
        )
    });

    t.it("Toolbar buttons", function (t) {
        var schedulergrid = t.cq1('schedulergrid');

        t.willFireNTimes(schedulergrid, 'viewchange', 3);

        t.chain(
            { click : "#left => .x-tool-img" },
            { click : "#right => .x-tool-img" },
            { click : "#today => .x-btn-button" },

            { click : "tool[type=print] => .x-tool-img" },
            { click : "tool[type=gear] => .x-tool-img" },
            { click : "tool[type=search] => .x-tool-img" }
        );
    });
});