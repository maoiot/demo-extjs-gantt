StartTest(function(t) {

    // Note, that different numbers of events (600) and resources (800) is crucial in
    // reproducing the row desynchronization issue

    var createFakeData = function (count) {
        var data = [];
        for (var i = 0; i < count; i++) {
            data.push({
                Id : i,
                Name : 'BuffRow' + i
            });
        }
        return data;
    };

    // create the Resource Store
    var resourceStore = Ext.create('Sch.data.ResourceStore', {
        data : createFakeData(800)
    });

    // create the Event Store
    var eventStore = Ext.create('Sch.data.EventStore', {
        data : (function (count) {
            var data = [];

            for (var i = 0; i < count; i+=2) {
                data.push({
                    ResourceId : i,
                    StartDate : new Date(2010, 1, 1),
                    EndDate : new Date(2010, 1, 10),
                    Name : 'Event' + i
                });
                data.push({
                    ResourceId : i,
                    StartDate : new Date(2010, 1, 1),
                    EndDate : new Date(2010, 1, 10),
                    Name : 'Event' + i
                });
            }

            return data;
        })(600)
    });

    var scheduler = t.getScheduler({
        resourceStore   : resourceStore,
        eventStore      : eventStore,
        width           : 500,
        height          : 300,
        startDate       : new Date(2010, 1, 1),
        endDate         : new Date(2010, 1, 20),
        columns         : [ { dataIndex : 'Id', text : 'Id' }, { dataIndex : 'Name', text : 'Name' }],
        renderTo        : Ext.getBody()
    });

    var schedulingView  = scheduler.getSchedulingView();

    var el              = schedulingView.el;

    var async = null, next = null, msg = '';

    var sort = function (field, dir, callback) {
        next = callback;
        async = t.beginAsync();
        msg = field + ' ' + dir;
        resourceStore.sort(field, dir);
    };

    scheduler.getView().on('refresh', function () {

        if (async) {
            t.bufferedRowsAreSync(scheduler, "Rows are synchronized after sort " + msg);
            t.endAsync(async);
            async = null;
            next();
        }

    }, this, { buffer : 300 });

    t.chain(
        {
            waitFor     : 'rowsVisible',
            args        : [ scheduler ]
        },
        {
            // it seems shortly after initial rendering, the "scrollTop" position of the buffered schedulingView will be reset to 0
            // need to wait some time before modifiying it
            waitFor     : 300
        },
        function (next) {
            t.bufferedRowsAreSync(scheduler, "Rows are synchronized initially");
            if (Ext.isIE9) {
                t.waitForEvent(scheduler.normalGrid.view, 'scrollend', next);
                scheduler.lockedGrid.view.setScrollY(el.dom.scrollHeight);
            } else {
                t.scrollTo(scheduler, el.dom.scrollHeight, next);
            }
        },
        function (next) {
            t.bufferedRowsAreSync(scheduler, "Rows are synchronized after scroll");
            var lastNormalRow = t.safeSelect('.x-grid-item:last-child', el.dom);

            t.is(schedulingView.getRecord(lastNormalRow.dom).getId(), 799, 'Found last record row in scheduler schedulingView');
            sort('Id', 'DESC', next);
        },
        function (next) {

            var lastNormalRow = t.safeSelect('.x-grid-item:last-child', el.dom);
            t.is(schedulingView.getRecord(lastNormalRow.dom).getId(), 0, 'Found first record row in scheduler schedulingView');
            t.scrollTo(scheduler, el.dom.scrollHeight, next);
        },
        function (next) {
            t.bufferedRowsAreSync(scheduler, "Rows are synchronized after scroll");
            sort('Name', 'ASC', next);
        },
        function (next) {
            sort('Name', 'DESC', next);
        }
    )
});

