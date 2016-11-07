StartTest(function (t) {

    function getBufferedGantt(config) {

        var taskStore = new Gnt.data.TaskStore({
            proxy : {
                type : 'memory',
                data : [
                    {
                        Id          : 1,
                        leaf        : true,
                        StartDate   : new Date(2010, 0, 5),
                        Duration    : 1
                    },
                    {
                        Id          : 2,
                        leaf        : true,
                        StartDate   : new Date(2010, 0, 6),
                        Duration    : 1
                    },
                    {
                        Id          : 3,
                        leaf        : true,
                        StartDate   : null
                    },
                    {
                        Id          : 4,
                        leaf        : true,
                        EndDate     : null
                    },
                    {
                        expanded    : false,
                        children    : [
                            {
                                Id        : 5,
                                leaf      : true,
                                EndDate   : null
                            }
                        ]
                    },
                    {
                        Id          : 6,
                        leaf        : true,
                        StartDate   : new Date(2001, 0, 6),
                        Duration    : 1
                    },
                    {
                        Id          : 7,
                        StartDate   : new Date(2010, 0, 6),
                        expanded    : true,
                        children    : [
                            {
                                Id        : 8,
                                StartDate   : new Date(2010, 0, 6),
                                leaf      : true
                            }
                        ]
                    }
                ]
            }
        });

        return t.getGantt2(Ext.apply({
            taskStore   : taskStore,
            dependencyStore : {
                xclass : "Gnt.data.DependencyStore",

                data : [
                    { "From" : 117, "To" : 115, "Id" : 30, "Type" : 2 },
                    { "From" : 118, "To" : 115, "Id" : 31, "Type" : 2 },
                    { "From" : 115, "To" : 116, "Id" : 32, "Type" : 2 },
                    { "From" : 121, "To" : 120, "Id" : 33, "Type" : 2}
                ]
            },
            startDate   : new Date(2010, 0, 5),
            endDate     : new Date(2010, 8, 5),

            plugins     : 'bufferedrenderer',
            renderTo    : Ext.getBody()
        }, config));
    }

    t.describe('Should not render dependency if one of the tasks is filtered out', function (t) {
        var gantt       = getBufferedGantt(),
            taskStore   = gantt.taskStore,
            view        = gantt.getSchedulingView();

        var task    = function (id) { return taskStore.getNodeById(id); };

        taskStore.filterTreeBy(function(t) { return t.getId() !== 8; });

        t.ok(view.getItemBox(task(1)),    'Task1 visible, default case');
        t.ok(view.getItemBox(task(2)),    'Task2 visible, default case');
        t.notOk(view.getItemBox(task(3)), 'Task3: StartDate missing');
        t.notOk(view.getItemBox(task(4)), 'Task4: EndDate missing');
        t.notOk(view.getItemBox(task(5)), 'Task5: In a collapsed parent');
        t.isLess(view.getItemBox(task(6)).start, 0, 'Task6: Before time axis');
        t.isLess(view.getItemBox(task(6)).end, 0, 'Task6: Before time axis');
        t.notOk(view.getItemBox(task(7)), 'Task7 filtered out');
        t.notOk(view.getItemBox(task(8)), 'Task8 filtered out');
    });
});

