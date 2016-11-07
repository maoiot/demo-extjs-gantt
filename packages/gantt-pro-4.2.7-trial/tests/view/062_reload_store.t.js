StartTest(function (t) {

    t.it('Should be able to reload store without side effects, using cascadeChanges', function (t) {

        var dependencyStore = Ext.create("Gnt.data.DependencyStore", {
            autoLoad : true,
            proxy    : {
                type   : 'ajax',
                url    : 'data/crud/get-dependencies.json',
                method : 'GET',
                reader : {
                    type : 'json'
                }
            }
        });

        var taskStore = Ext.create("Gnt.data.TaskStore", {
            dependencyStore : dependencyStore,

            cascadeChanges  : true,
            cascadeDelay    : 0,

            proxy           : {
                type   : 'ajax',

                api    : {
                    read : 'data/crud/get-tasks-collapsed.js'
                },

                method : 'GET',
                reader : 'json'
            },

            root : {
                expanded : true
            }
        });

        var gantt = t.getGantt({
            height          : 200,
            renderTo        : Ext.getBody(),
            taskStore       : taskStore,
            dependencyStore : dependencyStore
        });

        var view = gantt.lockedGrid.getView();

        t.chain(
            { waitForStoresToLoad : [taskStore, dependencyStore] },

            {
                desc : 'Asserted the taskStore initial content',
                action : function (next) {
                    t.is(view.getNodes().length, 5, '5 rendered rows');
                    t.is(taskStore.getTotalTaskCount(), 8, '8 tasks in store');

                    next();
                }
            },

            {
                desc : 'Expanded a task',
                action : function (next) {
                    var task = t.getFirstParentTask(gantt);
                    t.waitForEvent(task, 'expand', next);
                    task.expand(true);
                }
            },

            {
                desc : 'Reloaded the taskStore',
                action : function (next) {
                    t.waitForStoresToLoad(taskStore, next);
                    taskStore.load();
                }
            },

            {
                desc : 'Asserted the taskStore content after reload',
                action : function () {
                    t.is(view.getNodes().length, 5, '5 rendered rows');
                    t.is(taskStore.getTotalTaskCount(), 8, '8 tasks in store');
                }
            }
        );
    })

    t.it('Should be able to reload store without side effects, such as duplicated data', function (t) {
        var taskStore = Ext.create("Gnt.data.TaskStore", {
            proxy : {
                type   : 'ajax',
                method : 'GET',
                url    : 'data/tasks.js'
            }
        });

        var gantt = Ext.create("Gnt.panel.Gantt", {
            taskStore : taskStore,
            width     : 400,
            height    : 400,
            renderTo  : Ext.getBody(),
            columns   : [
                {
                    xtype     : 'treecolumn',
                    dataIndex : 'Id'
                }
            ]
        });

        t.chain(
            { waitForRowsVisible : gantt },

            function (next) {
                var renderedNodes = gantt.lockedGrid.getView().getNodes();

                t.is(renderedNodes.length, 2, '2 rendered rows');
                t.is(taskStore.getTotalTaskCount(), 2, '2 tasks in store');

                setTimeout(function () {
                    gantt.getSchedulingView().on('refresh', next, null, { single : true});
                    taskStore.load();
                }, 100);
            },

            { waitForRowsVisible : gantt },

            function (next) {
                var renderedNodes = gantt.lockedGrid.getView().getNodes();

                t.is(renderedNodes.length, 2, '2 rendered rows');
                t.is(taskStore.getTotalTaskCount(), 2, '2 tasks in store');
            }
        );
    })

})
