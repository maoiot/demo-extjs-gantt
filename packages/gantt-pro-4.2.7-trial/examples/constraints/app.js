//Ext.Loader.setConfig({enabled: true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../js/Sch');
//Ext.Loader.setPath('Gnt', '../../js/Gnt');

Ext.require([
    'Gnt.panel.Gantt',
    'Gnt.column.PercentDone',
    'Gnt.column.StartDate',
    'Gnt.column.EndDate',
    'Sch.plugin.TreeCellEditing',
    'Sch.plugin.Pan'
]);

Ext.onReady(function () {
    Ext.QuickTips.init();

    var start = new Date(2010, 0, 11),
        end = Sch.util.Date.add(start, Sch.util.Date.MONTH, 10);

    var taskStore = Ext.create("Gnt.data.TaskStore", {
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

    var g = Ext.create('Gnt.panel.Gantt', {
        region: 'center',
        title : 'Constraints demo',

        leftLabelField   : 'Name',
        loadMask         : true,
        viewPreset       : 'weekAndDayLetter',
        startDate        : start,
        endDate          : end,
        bodyBorder       : false,
        eventBorderWidth : 0,
        rowHeight        : 35,

        // Setup your static columns
        columns        : [
            {
                xtype: 'namecolumn',
                width: 200
            },
            {
                xtype: 'constrainttypecolumn'
            },
            {
                xtype: 'constraintdatecolumn'
            }
        ],
        taskStore      : taskStore,
        dependencyStore: dependencyStore
    });

    var viewport = new Ext.Viewport({
        layout: 'border',

        items: [
            g, {
                xtype  : 'details',
                details: '<h3>Constraints demo</h3>' +
                '<p>This example shows you how constraints affect the flow of the program. ' +
                'Try to move the task named "Constrained Task" a few days forward. ' +
                'This will lead to a prompt where you can decide one of the following:</p>' +
                '<ul style="margin-left:20px;margin-bottom:20px">' +
                '<li>Cancel the change and do nothing</li>' +
                '<li>Remove the constraint</li>' +
                '<li>Move the task to start at ...</li>' +
                '</ul>' +
                '<p>If you choose to remove this constraint, the move will be performed and another prompt will be shown since a successor task' +
                'now has its constraint violated.</p>' +
                '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
            }
        ]
    });
});
