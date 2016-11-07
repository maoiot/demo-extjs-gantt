describe("Drag drop sanity tests", function(t) {
    t.chain(
        { drag : ".x-grid-cell:contains(Phone call)", to : '#employeescheduler-timelineview => table.x-grid-item:nth-child(3)' },

        { drag : "availabilitygrid => .x-grid-item:nth-child(2) .sch-event", by : [60, 0] }
    );
});
