StartTest(function (t) {

    var taskStore, timeline;

    t.mountJsonResponse('load.json', {
        "success"      : true,
        tasks : {
            rows : [
                {
                    "leaf"           : true,
                    "Id"             : 117,
                    "StartDate"      : "2010-02-03",
                    "EndDate"        : "2010-02-11",
                    "PercentDone"    : 0,
                    "Name"           : "Child 1",
                    "Duration"       : 6,
                    "ShowInTimeline" : true
                },
                {
                    "leaf"           : true,
                    "Id"             : 1117,
                    "StartDate"      : "2010-02-03",
                    "EndDate"        : "2010-02-11",
                    "PercentDone"    : 0,
                    "Name"           : "Child 1",
                    "Duration"       : 6,
                    "ShowInTimeline" : true
                },
                {
                    "leaf"           : true,
                    "Id"             : 11117,
                    "StartDate"      : "2010-02-03",
                    "EndDate"        : "2010-02-11",
                    "PercentDone"    : 0,
                    "Name"           : "Child 1",
                    "Duration"       : 6,
                    "ShowInTimeline" : true
                },
                {
                    "leaf"           : true,
                    "Id"             : 2117,
                    "StartDate"      : "2010-02-03",
                    "EndDate"        : "2010-02-11",
                    "PercentDone"    : 0,
                    "Name"           : "Child 1",
                    "Duration"       : 6,
                    "ShowInTimeline" : true
                },
                {
                    "leaf"           : true,
                    "Id"             : 21117,
                    "StartDate"      : "2010-02-03",
                    "EndDate"        : "2010-02-11",
                    "PercentDone"    : 0,
                    "Name"           : "Child 1",
                    "Duration"       : 6,
                    "ShowInTimeline" : true
                },
                {
                    "leaf"           : true,
                    "Id"             : 211117,
                    "StartDate"      : "2010-02-03",
                    "EndDate"        : "2010-02-11",
                    "PercentDone"    : 0,
                    "Name"           : "Child 1",
                    "Duration"       : 6,
                    "ShowInTimeline" : true
                }
            ]
        }
    });

    // https://app.assembla.com/spaces/bryntum/tickets/3112-timeline-refreshes-excessively-during-task-store-load/details#
    t.it('Timeline scheduler should not refresh excessively during task store load', function (t) {

        var crudManager = new Gnt.data.CrudManager({
            transport : {
                load : {
                    method    : 'GET',
                    paramName : 'q',
                    url       : 'load.json'
                }
            }
        });

        timeline = new Gnt.panel.TimelineScheduler({
            height      : 100,
            width       : 400,
            renderTo    : Ext.getBody(),
            taskStore   : crudManager.getTaskStore()
        });

        t.wontFire(timeline.down('schedulergridview'), 'itemupdate');
        t.wontFire(timeline.eventStore, 'add');
        t.firesOk(timeline.down('schedulergridview'), 'refresh', '<=2')

        crudManager.load();
    });
});
