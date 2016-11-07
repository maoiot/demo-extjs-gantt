Ext.ns('App');

/* global App */

//Ext.Loader.setConfig({enabled: true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../../ExtScheduler2.x/js/Sch');
//Ext.Loader.setPath('Gnt', '../../js/Gnt');

Ext.require([
    'Gnt.panel.Gantt',
    'Gnt.column.PercentDone',
    'Gnt.column.StartDate',
    'Gnt.column.EndDate',
    'Gnt.plugin.TaskContextMenu'
]);

Ext.onReady(function () {
    App.Gantt.init(1000, 1000);
});

App.Gantt = {

    generateTaskData: function (nbrTasks, nbrDependencies) {
        var tasks = [],
            dependencies = [],
            start = new Date(2010, 0, 5),
            end = new Date(2010, 0, 7);

        for (var i = 1; i < nbrTasks; i += 100) {

            tasks.push({
                Id       : 'p' + i,
                Name     : 'Root task',
                StartDate: start,
                EndDate  : end,
                Duration : 2,
                expanded : true,
                children : (function () {
                    var cn = [];

                    for (var j = 0; j < 99; j++) {
                        cn.push({
                            Id       : i + j + 1,
                            Name     : 'Child task',
                            StartDate: start,
                            EndDate  : end,
                            Duration : 2,
                            leaf     : true
                        });
                    }

                    return cn;
                }())
            });

        }

        for (i = 1; i <= nbrDependencies; i++) {
            dependencies.push({
                From: i,
                To  : i + 5
            });
        }

        return {
            tasks       : tasks,
            dependencies: dependencies
        };
    },


    // Initialize application
    init: function (nbrTasks, nbrDependencies) {

        // console.time('data')

        //var data            = this.generateTaskData(nbrTasks, nbrDependencies);

        var dependencyStore = Ext.create("Gnt.data.DependencyStore", {
            //data : data.dependencies
        });

        var taskStore = Ext.create("Gnt.data.TaskStore", {
            dependencyStore: dependencyStore,
            // sorting slow downs the initial loading/rendering time for big trees
            sortOnLoad     : false,

            proxy: {
                type: 'memory'//,
                //data    : data.tasks
            }
        });

        // console.timeEnd('data')

        // console.time('create panel')

        var g = Ext.create('Gnt.panel.Gantt', {
            region            : 'center',
            rightLabelField   : 'Name',
            rowHeight         : 30,
            highlightWeekends : true,
            showTodayLine     : true,
            loadMask          : true,
//            snapToIncrement     : true,
            eventBorderWidth  : 0,

            viewPreset: 'weekAndDayLetter',
            title     : nbrTasks + ' tasks, ' + nbrDependencies + ' dependencies',
            startDate : new Date(2010, 0, 4),
            endDate   : Sch.util.Date.add(new Date(2010, 0, 4), Sch.util.Date.WEEK, 20),

            tbar: [
                {
                    text: 'Scroll to 888',

                    handler: function () {
                        g.getSchedulingView().scrollEventIntoView(taskStore.getNodeById(888), true);
                    }
                },
                {
                    text: 'Scroll to 111',

                    handler: function () {
                        g.getSchedulingView().scrollEventIntoView(taskStore.getNodeById(111), true);
                    }
                }
            ],

            // Setup your static columns
            columns: [
                {
                    width    : 50,
                    dataIndex: 'Id'
                },
                {
                    xtype    : 'treecolumn',
                    text     : 'Name',
                    dataIndex: 'Name',
                    width    : 200
                },
                {
                    xtype: 'startdatecolumn'
                },
                {
                    xtype: 'enddatecolumn'
                },
                {
                    xtype: 'percentdonecolumn'
                }
            ],

            taskStore: taskStore,

            plugins: {ptype: 'gantt_taskcontextmenu'}
        });

        var viewport = new Ext.Viewport({
            layout: 'border',

            items: [
                g, {
                    xtype  : 'details',
                    details: '<h3>Buffered Gantt demo</h3>' +
                    '<p>This is an example rendering thousands of rows without bringing the browser to a halt.</p>' +
                    '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
                }
            ]
        });
        // console.timeEnd('create panel')

        // console.time('render')

        g.mask('Generating task data');

        Ext.defer(function () {
            var data = this.generateTaskData(nbrTasks, nbrDependencies);
            
            g.mask('Loading generated data');

            dependencyStore.loadData(data.dependencies);

            taskStore.setRoot({ expanded: true, children: data.tasks });

            g.unmask();
        }, 100, this);


        // console.timeEnd('render')
    }
};
