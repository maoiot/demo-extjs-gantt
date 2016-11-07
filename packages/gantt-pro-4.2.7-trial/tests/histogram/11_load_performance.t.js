StartTest(function (t) {
    var gantt, histogram;

    Ext.define('MyHistogram', {
        extend : 'Gnt.panel.ResourceHistogram',

        assignmentsChangeCounter : 0,

        onAssignmentsChange : function () {
            this.assignmentsChangeCounter++;
            return this.callParent(arguments);
        }
    });

    t.expectGlobals('MyHistogram');

    t.beforeEach(function () {
        histogram && histogram.destroy();
        gantt && gantt.destroy();
    });

    t.it('Histogram should not recalculate during task store load', function (t) {
        var taskStore = Ext.create('Gnt.data.TaskStore', {
            calendarManager : Ext.create('Gnt.data.CalendarManager', {
                // we will use BusinessTime calendars
                calendarClass : 'Gnt.data.calendar.BusinessTime'
            })
        });

        var crudManager = Ext.create('Gnt.data.CrudManager', {
            autoLoad  : false,
            taskStore : taskStore,
            transport : {
                load : {
                    url : 'data/bigdataset.js'
                }
            }
        });

        var gantt = t.getGantt({
            crudManager : crudManager,
            height      : 400,
            region      : 'north',
            title       : 'gantt'
        });

        var histogram = Ext.create('MyHistogram', {
            crudManager          : crudManager,
            partnerTimelinePanel : gantt,
            region               : 'center',
            title                : 'histogram'
        });

        var vp = new Ext.Viewport({
            layout : 'border',
            items  : [ gantt, histogram ]
        });

        var taskUpdateCounter, assignmentUpdateCounter;

        t.chain(
            function (next) {
                taskUpdateCounter       = histogram.taskUpdateCounter;
                assignmentUpdateCounter = histogram.assignmentsChangeCounter;

                // ticket #3114
                t.methodIsntCalled('hasChanges', 'Gnt.data.CrudManager', 'hasChanges is not called while loading');

                // it will take lot of time to load
                t.waitForEvent(taskStore, 'load', next, null, 30000);
                crudManager.load();
            },
            function () {
                // ticket #3113
                t.is(histogram.assignmentsChangeCounter, assignmentUpdateCounter, 'onAssignmentsChange was not called during crud load');
            }
        )
    });
});