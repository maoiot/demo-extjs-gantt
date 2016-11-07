Ext.require([
    'Gnt.panel.Gantt',
    'Gnt.column.PercentDone',
    'Gnt.column.StartDate',
    'Gnt.column.EndDate',
    'Gnt.plugin.Export'
]);

Ext.onReady(function () {
    Ext.QuickTips.init();

    var start = new Date(2009, 11, 26),
        end = Sch.util.Date.add(start, Sch.util.Date.MONTH, 8);

    var taskStore = Ext.create("Gnt.data.TaskStore", {
        model: 'Gnt.model.Task',

        proxy: {
            type  : 'ajax',
            method: 'GET',
            url   : 'tasks.js',
            reader: {
                type: 'json'
            }
        }
    });

    var dependencyStore = Ext.create("Gnt.data.DependencyStore", {
        autoLoad: true,
        proxy   : {
            type  : 'ajax',
            url   : 'dependencies.js',
            method: 'GET',
            reader: {
                type: 'json'
            }
        }
    });

    var exportPlugin = new Gnt.plugin.Export({
        printServer: 'server.php'
    });

    var gantt = Ext.create('Gnt.panel.Gantt', {
        title : 'Ext Gantt PDF Export Demo',
        region: 'center',

        header: {
            title: 'Work schedule',
            tools: [
                {
                    xtype  : 'button',
                    iconCls: 'fa fa-file-pdf-o',
                    text   : 'Export to PDF',
                    margin : '0 10 0 0',
                    handler: function () {
                        exportPlugin.setFileFormat('pdf');
                        gantt.showExportDialog();
                    }
                },
                {
                    xtype  : 'button',
                    iconCls: 'fa fa-file-image-o',
                    text   : 'Export to PNG',
                    handler: function () {
                        exportPlugin.setFileFormat('png');
                        gantt.showExportDialog();
                    }
                }
            ]
        },

        //Comment this line if you want to test exporting when the Gantt panel is wrapped by another (smaller) component.

        leftLabelField   : 'Name',
        highlightWeekends: false,
        loadMask         : true,
        viewPreset       : 'monthAndYear',
        startDate        : start,
        endDate          : end,
        rowHeight        : 32,
        eventBorderWidth : 0,
        bodyBorder       : false,
        columns          : [
            {
                xtype: 'namecolumn',
                width: 250
            }
        ],
        taskStore        : taskStore,
        dependencyStore  : dependencyStore,
        plugins          : exportPlugin
    });

    var viewport = new Ext.Viewport({
            layout: 'border',

            items: [
                gantt, {
                    xtype  : 'details',
                    cls    : 'match-height-with-tools',
                    details: '<h3>Ext Gantt PDF Export Demo</h3>' +
                    '<p>This example enables you to generate a PDF file out of a Gantt panel. ' +
                    'It requires having <a target="_blank" href="http://phantomjs.org">PhantomJS 1.6</a> and <a target="_blank" href="http://imagemagick.org">ImageMagick</a> ' +
                    'on your server as well as permissions to run them both and create/remove files.</p>' +
                    '<p>The complete instruction of setting up this example is available in the <a target="_blank" href="README.txt">README.txt</a> file. ' +
                    'Please note that the buffered option of the view (and data store) is not compatible with the export plugin.</p>' +
                    '<p>You can also take a look into PhantomJs renderer code <a target="_blank" href="render.js">render.js</a></p>' +
                    '<p>NOTE: For this example to work you have to run it in a web server context.</p>',
                    files  : [
                        'render.js',
                        'README.txt'
                    ]
                }
        ]
    });
});
