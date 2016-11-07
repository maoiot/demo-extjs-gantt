StartTest(function(t) {

    // #2639 - Scheduling modes demo bugs

    t.it('Doesnt raise an exception when clicking on a task being removed from the visible timespan', function (t) {

        var plugin = Ext.create('Sch.plugin.TreeCellEditing', { clicksToEdit: 1 });

        var gantt  = t.getGantt({
            viewPreset : 'weekAndDayLetter',
            renderTo   : Ext.getBody(),
            startDate  : new Date(2016, 1, 19),
            endDate    : new Date(2016, 1, 20),
            plugins    : plugin,
            taskStore  : t.getTaskStore({
                DATA : [{ StartDate : '2016-02-19', Duration : 1, Cls : 'foo' }]
            }),
            columns    : [
                { xtype : 'startdatecolumn' }
            ]
        });

        t.chain(
            { waitForEventsToRender : gantt },

            { click : '.x-grid-cell' },

            { waitForCQVisible : 'startdatefield' },

            function (next) {
                plugin.getActiveEditor().field.setValue(new Date(2015, 1, 19));

                next();
            },

            { click : '.foo' }
        );
    });

});
