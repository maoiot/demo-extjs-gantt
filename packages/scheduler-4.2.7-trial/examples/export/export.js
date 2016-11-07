//Ext.Loader.setConfig({ enabled : true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../js/Sch');

Ext.onReady(function () {

    var dependencyStore = new Sch.data.DependencyStore({
        autoLoad : true,
        proxy    : {
            type   : 'ajax',
            url    : 'dependencies.js',
            reader : {
                type : 'json'
            }
        }
    });

    // Store holding all the resources
    var resourceStore = new Sch.data.ResourceStore({
        autoLoad : true,
        sorters  : 'Name',
        proxy    : {
            type   : 'ajax',
            url    : "peopledata.js",
            reader : {
                type         : 'json',
                rootProperty : 'people'
            }
        }
    });

    // Store holding all the events
    var eventStore = new Sch.data.EventStore({
        autoLoad : true,
        proxy    : {
            type   : 'ajax',
            url    : "taskdata.js",
            reader : {
                type         : 'json',
                rootProperty : 'tasks'
            }
        }
    });

    var exportPlugin = new Sch.plugin.Export({
        pluginId           : 'export',
        printServer        : 'server.php',
        exportDialogConfig : {
            showColumnPicker : true
        }
    });

    var scheduler = new Sch.panel.SchedulerGrid({
        header   : {
            title : 'Work schedule',
            tools : [
                {
                    xtype   : 'button',
                    iconCls : 'fa fa-file-pdf-o',
                    text    : 'Export to PDF',
                    margin  : '0 10 0 0',
                    handler : function () {
                        exportPlugin.setFileFormat('pdf');
                        scheduler.showExportDialog();
                    }
                },
                {
                    xtype   : 'button',
                    iconCls : 'fa fa-file-image-o',
                    text    : 'Export to PNG',
                    handler : function () {
                        exportPlugin.setFileFormat('png');
                        scheduler.showExportDialog();
                    }
                }
            ]
        },
        //Uncomment this line, and comment the line below if you want to test exporting when the Scheduler panel is wrapped by another panel.
        //region        : 'center',
        height        : ExampleDefaults.height,
        width         : ExampleDefaults.width,
        renderTo      : 'example-container',

        plugins       : exportPlugin,
        rowHeight     : 40,
        startDate     : new Date(2010, 4, 27),
        endDate       : new Date(2010, 5, 5),
        viewPreset    : 'dayAndWeek',
        split         : false,
        eventRenderer : function (eventRec, resourceRec, tplData, row) {
            return Ext.Date.format(eventRec.getStartDate(), 'M d');
        },

        // Setup static columns
        columns         : [
            {
                header    : 'Name',
                sortable  : true,
                width     : 150,
                dataIndex : 'Name'
            }
        ],
        resourceStore   : resourceStore,
        eventStore      : eventStore,
        dependencyStore : dependencyStore
    });

    //Uncomment this part if you want to test exporting when the Scheduler panel is wrapped by another panel.
    /*
    Ext.create("Ext.panel.Panel", {
        title    : 'Main panel',
        width    : 900,
        height   : 700,
        renderTo : Ext.getBody(),
        layout   : 'border',
        defaults : {
            collapsible : true,
            split       : true
        },
        items    : [
            {
                xtype  : 'panel',
                title  : 'The sidebar',
                region : 'west',
                width  : 250
            },
            scheduler
        ]
    });
    */
});
