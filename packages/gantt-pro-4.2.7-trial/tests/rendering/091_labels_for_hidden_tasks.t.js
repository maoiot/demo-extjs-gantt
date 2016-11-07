StartTest(function (t) {

    // Here we check that labels for tasks outside of visible time span are still rendered if the task element is in the specified "zone" (#1527)

    var gantt;

    var setup = function (config) {
        gantt && gantt.destroy();

        gantt = t.getGantt(Ext.apply({
            renderTo        : Ext.getBody(),
            width           : 600,
            startDate       : new Date(2010, 0, 4),
            endDate         : new Date(2010, 0, 25),
            leftLabelField  : {
                dataIndex   : 'Name'
            },
            rightLabelField : {
                dataIndex   : 'Name'
            },
            columns     : [{
                xtype       : 'treecolumn',
                dataIndex   : 'Id'
            }],
            eventRenderer   : function (taskRec) {
                return {
                    cls : 'task' + taskRec.getId()
                }
            },
            taskStore   : t.getTaskStore({
                DATA    : [
                    {
                        Id        : 1,
                        StartDate : "2010-01-01",
                        Name      : "Really long name",
                        Duration  : 1
                    },
                    {
                        Id        : 2,
                        StartDate : "2010-01-25",
                        Name      : "Really long name",
                        Duration  : 3,
                        leaf      : true
                    }
                ]
            })
        }, config));
    }

    t.it('Labels from hidden tasks should be rendered', function (t) {
        setup();

        var view = gantt.getSchedulingView();

        t.waitForRowsVisible(gantt, function () {
            var el  = view.el.down('.task1'),
                label;

            if (el) {
                label   = el.parent().down('.sch-gantt-label-right');
                t.isGreater(label.getBox().right, view.getX(), 'Right label is visible');
            } else {
                t.fail("Task1 isn't rendered");
            }

            el      = view.el.down('.task2');
            if (el) {
                label   = el.parent().down('.sch-gantt-label-left');
                t.isLess(label.getX(), view.getBox().right, 'Left label is visible');
            } else {
                t.fail("Task2 isn't rendered");
            }
        });
    });

    t.it('Should hide labels when buffer zone is 0', function (t) {
        setup({
            viewConfig  : {
                outsideLabelsGatherWidth : 0
            }
        });

        t.waitForRowsVisible(gantt, function () {
            t.selectorNotExists('.sch-gantt-label', 'Labels are hidden');
        });
    });
});
