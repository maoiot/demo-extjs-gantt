StartTest(function (t) {
    var histogram;

    t.beforeEach(function () {
        histogram && histogram.destroy();
    });

    t.it('Should show tooltip for bar', function (t) {
        var resourceStore   = t.getResourceStore({
            data    : [{
                Id      : '1',
                Name    : 'test'
            }]
        });

        var assignmentStore = t.getAssignmentStore({
            resourceStore   : resourceStore,
            data            : [{
                ResourceId  : 1,
                TaskId      : 1,
                Units       : 100
            }]
        });

        var taskStore   = t.getTaskStore({
            resourceStore   : resourceStore,
            assignmentStore : assignmentStore,
            DATA    : [{
                Id          : 1,
                Name        : 'Task',
                StartDate   : new Date(2010, 2, 2),
                EndDate     : new Date(2010, 2, 6)
            }]
        });

        histogram = new Gnt.panel.ResourceHistogram({
            renderTo                : Ext.getBody(),
            resourceStore           : resourceStore,
            taskStore               : taskStore,
            assignmentStore         : assignmentStore,
            viewPreset              : 'weekAndDayLetter',
            startDate               : new Date(2010, 2, 1),
            endDate                 : new Date(2010, 3, 1),

            height                  : 300,
            width                   : 800,

            tooltipTpl              : '<div class="tip-test">test</div>'
        });

        t.chain(
            { waitForRowsVisible : histogram },
            { moveMouseTo : '.gnt-resourcehistogram-bar' },
            { moveMouseBy : [[5, 0]] },
            { waitForElementVisible : '.tip-test' }
        );
    });
});