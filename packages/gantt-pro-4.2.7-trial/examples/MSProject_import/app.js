Ext.Loader.setPath({
    'Gnt.data.ux.Importer'      : 'Gnt.data.ux.Importer.js',
    'Gnt.view.ux.MSImportPanel' : 'Gnt.view.ux.MSImportPanel.js'
});

Ext.require([
    'Ext.form.Panel',
    'Ext.form.TextField',
    'Ext.form.File',
    'Gnt.model.Task',
    'Gnt.data.TaskStore',
    'Gnt.column.Name',
    'Gnt.panel.Gantt',
    'Gnt.data.ux.Importer',
    'Gnt.view.ux.MSImportPanel'
]);

Ext.define('MsProjectTask', {
    extend          : 'Gnt.model.Task',
    inclusiveEndDate: true,

    isMilestone: function () {
        return this.get('Milestone');
    }
});

Ext.onReady(function () {

    var taskStore = new Gnt.data.TaskStore({
        model: 'MsProjectTask',
        root : {
            children: [
                {Name: 'Hello World', StartDate: new Date(2012, 4, 1), EndDate: new Date(2012, 4, 3), leaf: true}
            ]
        }
    });

    var importer = new Gnt.data.ux.Importer();

    var g = new Gnt.panel.Gantt({
        region          : 'center',
        title           : 'Loading data from MS Project',
        taskStore       : taskStore,
        stripeRows      : true,
        rowHeight       : 31,

        leftLabelField   : {
            dataIndex: 'Name',
            editor   : {xtype: 'textfield'}
        },
        highlightWeekends: true,
        showTodayLine    : true,
        loadMask         : true,
        startDate        : new Date(2012, 4, 1),
        endDate          : Sch.util.Date.add(new Date(2012, 4, 1), Sch.util.Date.WEEK, 20),
        viewPreset       : 'weekAndDayLetter',

        //static column that will be removed when columns from mpp file are loaded
        columns: [
            {
                xtype: 'namecolumn',
                width: 200
            }
        ],
        plugins: importer,
        tbar   : [
            {
                xtype    : 'msimportpanel',
                listeners: {
                    dataavailable: function (form, data) {
                        Ext.Msg.alert('Success', 'Data from .mpp file loaded');

                        importer.importData(data);

                        g.lockedGrid.reconfigure(g.lockedGrid.getStore(), data.columns.concat({xtype: 'addnewcolumn'}));

                        g.expandAll();

                        var span = g.taskStore.getTotalTimeSpan();
                        if (span.start && span.end) {
                            g.setTimeSpan(span.start, span.end);
                        }
                    }
                }
            }
        ]
    });

    var viewport = new Ext.Viewport({
        layout: 'border',

        items: [
            g, {
                xtype  : 'details',
                details: '<h3>Loading data from MS Project</h3>' +
                '<p>This is a simple example showing how to import data from an MS Project file directly to the Ext Gantt.' +
                'With the help of the <a href="http://mpxj.sourceforge.net/">MPXJ library</a>, we have built a Java based application which extracts data from .mpp files. ' +
                'This gives us the ability to extract Tasks, Resources, Assignments, Dependencies and Columns. The basic MSP columns will be converted to proper Ext Gantt ones (if Ext Gantt has an analog). The JAVA code after compiling builds a standalone JAR package and the only dependency is Java JDK 7+.</p>' +
                '<p>For more information about the import feature, please refer to the <a target="_blank" href="README.txt">README.txt</a> file' +
                'To try this example, you can use your own MPP project file or download this sample MPP: <a class="mpp" href="AdvancedExample.mpp">AdvancedExample.mpp</a></p>' +
                '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
            }
        ]
    });

});
