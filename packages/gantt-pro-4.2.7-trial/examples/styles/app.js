//Ext.Loader.setConfig({enabled: true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../js/Sch');
//Ext.Loader.setPath('Gnt', '../../js/Gnt');

Ext.require([
    'Gnt.panel.Gantt',
    'Gnt.column.PercentDone',
    'Gnt.column.StartDate',
    'Gnt.column.EndDate',
    'Sch.plugin.Pan',
    'Gnt.plugin.DependencyEditor'
]);

Ext.application({
    name: 'Styles',

    launch: function () {
        var cm = new Gnt.data.CrudManager({
            autoLoad : true,
            taskStore: new Gnt.data.TaskStore(),
            transport: {
                load: {
                    method: 'GET',
                    url   : 'tasks.js'
                }
            }
        });

        new Ext.Viewport({
            layout: 'border',
            items : [
                {
                    xtype                  : 'ganttpanel',
                    region                 : 'center',
                    rowHeight              : 30,
                    leftLabelField         : 'Name',
                    highlightWeekends      : true,
                    showTodayLine          : true,
                    loadMask               : true,
                    eventBorderWidth       : location.hash.match('crisp|triton') ? 0 : 1,
                    startDate              : new Date(2010, 0, 11),
                    endDate                : Sch.util.Date.add(new Date(2010, 0, 4), Sch.util.Date.WEEK, 20),
                    viewPreset             : 'weekAndDayLetter',
                    crudManager            : cm,
                    enableProgressBarResize: true,
                    columns                : [
                        {
                            xtype: 'namecolumn',
                            width: 250
                        }
                    ],
                    dockedItems            : {
                        dock  : 'top',
                        xtype : 'container',
                        items : Ext.Array.map([ 'classic', 'crisp', 'neptune', 'triton' ], function (name) {
                            return {
                                xtype   : 'button',
                                text    : name + ' theme',
                                margin  : 10,
                                height  : 40,
                                pressed : location.hash.match(name),
                                handler : function () {
                                    window.location.href = 'styles.html#' + name;
                                    window.location.reload();
                                }
                            };
                        })
                    }
                }, {

                    xtype  : 'details',
                    details: '<h3>Gantt styling demo</h3>' +
                    '<p>This example lets you switch between different themes.</p>' +
                    '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
                }
            ]
        });
    }
})
;
