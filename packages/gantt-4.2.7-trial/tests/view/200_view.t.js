StartTest(function(t) {
    var gantt;

    t.beforeEach(function () {
        gantt && gantt.destroy();
    });

    // https://www.assembla.com/spaces/bryntum/tickets/2686
    t.it('Navigation in grouped grid should not throw exceptions', function (t) {
        var store = new Ext.data.Store({
            fields     : ['name', 'seniority', 'department'],
            groupField : 'department',
            data       : [
                { name : 'Michael Scott',  seniority : 7, department : 'Management' },
                { name : 'Dwight Schrute', seniority : 2, department : 'Sales'      },
                { name : 'Jim Halpert',    seniority : 3, department : 'Sales'      },
                { name : 'Kevin Malone',   seniority : 4, department : 'Accounting' },
                { name : 'Angela Martin',  seniority : 5, department : 'Accounting' }
            ]
        });

        var grid = Ext.create('Ext.grid.Panel', {
            title    : 'Employees',
            store    : store,
            columns  : [
                { text : 'Name',      dataIndex : 'name' },
                { text : 'Seniority', dataIndex : 'seniority' }
            ],
            features : [{ ftype : 'grouping' }],
            width    : 400,
            height   : 500,
            renderTo : Ext.getBody()
        });

        t.livesOk(function () {
            t.chain(
                { click : "gridpanel[title=Employees] => table.x-grid-item:nth-child(1) .x-grid-cell:nth-child(2)", offset: [43, 15] },
                { click : "gridpanel[title=Employees] => table.x-grid-item:nth-child(2) .x-grid-cell:nth-child(2)", offset: [43, 15] },
                function () {
                    grid.destroy();
                }
            );
            //t.click("gridpanel[title=Employees] => table.x-grid-item:nth-child(1) .x-grid-cell:nth-child(2)", null, null, null, [43, 15]);
        });
    });

    t.it('View should not throw extra refresh events', function (t) {
        var getDataSet = function () {

            var dependencyStore = new Gnt.data.DependencyStore({
                data : [{ From : 1, To : 2, Type : 2 }]
            });

            var taskStore = new Gnt.data.TaskStore({
                dependencyStore : dependencyStore,
                cascadeDelay    : 0,
                proxy           : 'memory',
                root            : {
                    expanded : false,
                    children : [
                        {}, {}, {}, {}, {}, {},
                        {
                            Id        : 1,
                            leaf      : true,
                            StartDate : new Date(2011, 6, 1),
                            EndDate   : new Date(2011, 6, 5)
                        },
                        {
                            Id        : 2,
                            leaf      : true,
                            StartDate : new Date(2011, 6, 5),
                            EndDate   : new Date(2011, 6, 20)
                        },
                        {}, {}, {}, {}, {}, {}, {}
                    ]
                }
            });

            return {
                taskStore       : taskStore,
                dependencyStore : dependencyStore
            }
        };

        var dataSet = getDataSet();
        var taskStore = dataSet.taskStore;
        var dependencyStore = dataSet.dependencyStore;

        gantt = t.getGantt({
            height           : 200,
            width            : 600,

            startDate        : new Date(2011, 6, 1),
            endDate          : new Date(2011, 6, 28),

            dependencyStore  : dependencyStore,
            taskStore        : taskStore,
            cascadeChanges   : true,

            renderTo         : Ext.getBody(),
            lockedGridConfig : { width : 100 }
        });

        var schedView = gantt.getSchedulingView();
        var lockedView = gantt.lockedGrid.getView();

        var schedOriginalScroll, lockedOriginalScroll;

        t.chain(
            { waitFor : 'rowsVisible' },

            function (next) {
                // Make sure normalGrid layout is still fit (#239 in Assembla)
                t.is(gantt.normalGrid.layout.type, 'fit', 'fit layout used for SchedulerGrid');

                t.wontFire(schedView, 'refresh', "View fires no refresh for low number of changed tasks");

                schedView.el.scrollTo('left', 10);
                schedView.el.scrollTo('top', 10);
                lockedView.el.scrollTo('left', 10);
                lockedView.el.scrollTo('top', 10);

                schedOriginalScroll = schedView.el.getScroll();
                lockedOriginalScroll = lockedView.el.getScroll();
                next();
            },

            { waitFor: 100 },

            function (next) {
                taskStore.getNodeById(1).setStartDate(new Date(2011, 5, 1), false);
                taskStore.getNodeById(1).setEndDate(new Date(2011, 6, 11), false);

                next();
            },

            { waitFor: 100 },

            function (next) {
                t.isDeeply(schedView.el.getScroll(), schedOriginalScroll, 'Scheduling view scroll position not changed after cascade');
                t.isDeeply(lockedView.el.getScroll(), lockedOriginalScroll, 'Locked view scroll position not changed after cascade');
                next();
            }
        );
    });

    // TODO: need to fix this #3031
    t.xit('Nodes should be normalized before first view refresh (when store.autoLoad enabled)', function (t) {

        var taskStore = new Gnt.data.TaskStore({
            autoLoad : true,
            proxy    : {
                type : 'ajax',
                url  : 'data/tasks_1.json'
            }
        });

        gantt = t.getGantt({
            renderTo  : Ext.getBody(),
            columns   : [{ xtype : 'namecolumn' }],
            startDate : new Date(2010, 0, 4),
            endDate   : new Date(2010, 0, 24),
            taskStore : taskStore,
            tbar      : [{
                text    : 'refresh',
                handler : function () {
                    gantt.normalGrid.view.refresh();
                }
            }]
        });

        t.waitForEventsToRender(gantt, function () {
            var progressBarWidth = gantt.getEl().down('.sch-gantt-progress-bar').getWidth();
            var taskElWidth      = gantt.getEl().down('.sch-gantt-item').getWidth();

            t.isApprox(progressBarWidth, taskElWidth / 2, 2, 'Task is normalized');
        });
    });

    t.it('Nodes should be normalized before first view refresh (when store.autoLoad disabled)', function (t) {

        var taskStore = new Gnt.data.TaskStore({
            autoLoad : false,
            proxy    : {
                type : 'ajax',
                url  : 'data/tasks_1.json'
            }
        });

        taskStore.load();

        gantt = t.getGantt({
            renderTo  : Ext.getBody(),
            columns   : [{ xtype : 'namecolumn' }],
            startDate : new Date(2010, 0, 4),
            endDate   : new Date(2010, 0, 24),
            taskStore : taskStore
        });

        t.waitForEventsToRender(gantt, function () {
            var progressBarWidth = gantt.getEl().down('.sch-gantt-progress-bar').getWidth();
            var taskElWidth      = gantt.getEl().down('.sch-gantt-item').getWidth();

            t.isApprox(progressBarWidth, taskElWidth / 2, 2, 'Task is normalized');
        });
    });

    t.it('Nodes should be normalized before first view refresh using CrudManager', function (t) {

        var crud = new Gnt.data.CrudManager({
            autoLoad  : true,
            transport : {
                load : {
                    url : 'data/tasks_2.json'
                }
            }
        });

        gantt = t.getGantt({
            renderTo    : Ext.getBody(),
            crudManager : crud,
            startDate   : new Date(2010, 0, 4),
            endDate     : new Date(2010, 0, 24)
        });

        t.waitForEventsToRender(gantt, function () {
            var progressBarWidth = gantt.getEl().down('.sch-gantt-progress-bar').getWidth();
            var taskElWidth      = gantt.getEl().down('.sch-gantt-item').getWidth();

            t.isApprox(progressBarWidth, taskElWidth / 2, 2, 'Task is normalized');
        });
    });
});
