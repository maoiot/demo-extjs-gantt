StartTest(function (t) {
    // in this test we'll be reproducing the #1082 and #1083

    var taskStore = Ext.create("Gnt.data.TaskStore", {
        // sorting slow downs the initial loading/rendering time for big trees
        sortOnLoad : false,
        root       : {
            expanded : true
        },
        proxy      : 'memory'
    });

    taskStore.proxy.data = t.getLargeDataset();

    taskStore.load();

    var gantt = t.getGantt({
        renderTo        : Ext.getBody(),
        taskStore       : taskStore,
        width           : 700,
        rightLabelField : 'Name',
        columns         : [
            {
                xtype     : 'treecolumn',
                header    : 'Tasks',
                sortable  : true,
                dataIndex : 'Name',
                width     : 150
            }
        ],
        plugins         : ['bufferedrenderer']
    });


    var lockedView     = gantt.lockedGrid.getView();
    var schedulingView = gantt.getSchedulingView();

    var lockedNode = function (record) {
        return lockedView.getNode(record)
    };

    var scrollHeight, viewEl, newTask, newTask1;

    t.chain(
        { waitForRowsVisible : gantt },
        function (next) {
            viewEl = schedulingView.el;

            scrollHeight = viewEl.dom.scrollHeight;

            schedulingView.on('refresh', next, null, { single : true });
            // #1082 - reloading the store - should not change the scroll height
            taskStore.proxy.data = t.getLargeDataset();
            taskStore.load();
        },
        function (next) {
            t.isApprox(viewEl.dom.scrollHeight, scrollHeight, 'Scroll height should not change much after reloading of the same data');

            // now #1083 - 1st part
            t.scrollVerticallyTo(viewEl, scrollHeight, next)
        },
        function (next) {
            newTask = taskStore.getRootNode().appendChild({
                Id        : 10000,
                Name      : 10000,
                StartDate : new Date(2010, 0, 5),
                Duration  : 2,
                expanded  : false,
                children  : [
                    {
                        Id        : 10001,
                        Name      : 10001,
                        leaf      : true,
                        StartDate : new Date(2010, 0, 5),
                        Duration  : 2
                    },
                    {
                        Id        : 10002,
                        Name      : 10002,
                        leaf      : true,
                        StartDate : new Date(2010, 0, 5),
                        Duration  : 2
                    }
                ]
            });

            newTask.expand();

            t.scrollVerticallyTo(viewEl, viewEl.dom.scrollHeight, next)
        },
        function (next) {
            var view = gantt.lockedGrid.view;
            /*
             These are last events captured on locked view before appendChild call:

             Firefox : afteritemcollapse, scrollend (rarely isn't fired at all), scroll, scrollend
             Chrome  : afteritemcollapse, scroll, scroll
             IE9     : afteritemcollapse, scrollend
             IE10    : afteritemcollapse, scrollend, scroll

             scrollend in IE sometimes is fired before listener can be attached, waiting for condition seems working.
             no scrollend in Chrome, but waitFor and afteritemcollapse are working.
             */
            if (Ext.isFirefox) {
                t.waitForEvent(view, 'afteritemcollapse', function () {
                    // scrollend in FF seemingly is slow enough to attach listener to it and following
                    // waitFor doesn't work well without it
                    t.waitForEvent(view, 'scrollend', next);
                });
            } else {
                t.waitForEvent(view, 'scrollend', next);
            }
            newTask.collapse();
        },
        {
            waitFor : function () {
                return gantt.lockedGrid.view.getScrollable().getSize().y === gantt.normalGrid.view.getScrollable().getSize().y;
            }
        },
        function (next) {
            // this is a final assertion for #1083, 1st part, now go to the 2nd part
            t.bufferedRowsAreSync(gantt);

            // adding 2 new tasks
            newTask = taskStore.getRootNode().appendChild({
                Name      : 20000,
                StartDate : new Date(2010, 0, 5),
                Duration  : 2,
                expanded  : false,
                children  : [
                    {
                        Name      : 20001,
                        leaf      : true,
                        StartDate : new Date(2010, 0, 5),
                        Duration  : 2
                    },
                    {
                        Name      : 20002,
                        leaf      : true,
                        StartDate : new Date(2010, 0, 5),
                        Duration  : 2
                    }
                ]
            });

            newTask1 = taskStore.getRootNode().appendChild({
                Name      : 30000,
                StartDate : new Date(2010, 0, 5),
                Duration  : 2,
                expanded  : false,
                children  : [
                    {
                        Name      : 30001,
                        leaf      : true,
                        StartDate : new Date(2010, 0, 5),
                        Duration  : 2
                    },
                    {
                        Name      : 30002,
                        leaf      : true,
                        StartDate : new Date(2010, 0, 5),
                        Duration  : 2
                    }
                ]
            });

            // and scroll to the bottom
            t.scrollVerticallyTo(viewEl, viewEl.dom.scrollHeight, next)
        },
        { waitForBufferedRowsSynced : gantt },
        function (next) {
            newTask.expand();
            next()
        },
        { waitForBufferedRowsSynced : gantt },
        function () {
            var is602 = Ext.getVersion().isGreaterThan('6.0.2'),
                nodes;
            // Buffered renderer in 6.0.2 doesnt draw nodes that are not visible
            // https://fiddle.sencha.com/#fiddle/1aht
            if (is602) {
                nodes = [
                    lockedNode(newTask),
                    lockedNode(newTask).nextSibling
                ];

                t.isDeeply(nodes, [
                    lockedNode(newTask),
                    lockedNode(newTask.childNodes[0])
                ], "Correct order of nodes in view");

                t.isDeeply(nodes, lockedView.all.slice().slice(-2), 'Correct elements in the `all` collection');
            } else {
                nodes = [
                    lockedNode(newTask),
                    lockedNode(newTask).nextSibling,
                    lockedNode(newTask).nextSibling.nextSibling,
                    lockedNode(newTask).nextSibling.nextSibling.nextSibling
                ];

                t.isDeeply(nodes, [
                    lockedNode(newTask),
                    lockedNode(newTask.childNodes[0]),
                    lockedNode(newTask.childNodes[1]),
                    lockedNode(newTask1)
                ], "Correct order of nodes in view");

                t.isDeeply(nodes, lockedView.all.slice().slice(-4), 'Correct elements in the `all` collection');
            }
        }
    );
});

