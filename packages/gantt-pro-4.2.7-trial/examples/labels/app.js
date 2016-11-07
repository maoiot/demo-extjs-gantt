/* global App:true */
Ext.ns('App');

//Ext.Loader.setConfig({enabled: true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../js/Sch');
//Ext.Loader.setPath('Gnt', '../../js/Gnt');

Ext.require([
    'Gnt.panel.Gantt'
]);

Ext.onReady(function () {
    App.Gantt.init();
});

App.Gantt = {

    createGantt: function (labels) {
        var me = this,
            gantt = new Gnt.panel.Gantt({
                region: 'center',
                title : 'Labels demo',

                rowHeight       : 62,
                eventBorderWidth: 0,

                topLabelField: labels.top ? {
                    dataIndex: 'Name',
                    editor   : {xtype: 'textfield'}
                } : null,

                bottomLabelField: labels.bottom ? {
                    dataIndex: 'StartDate',
                    renderer : function (date) {
                        return Ext.Date.format(date, 'M d');
                    }
                } : null,

                leftLabelField: labels.left ? {
                    renderer: function (val, record) {
                        return 'Id: ' + record.getId();
                    }
                } : null,

                rightLabelField: labels.right ? {
                    renderer: function (val, record) {
                        return record.getDuration() + ' ' + record.getDurationUnit();
                    }
                } : null,

                startDate : new Date(2010, 0, 11),
                viewPreset: 'weekAndDayLetter',

                // Setup your static columns
                columns: [
                    {
                        xtype: 'namecolumn',
                        width: 200
                    }
                ],

                taskStore: this.taskStore,

                tools: [
                    {
                        xtype  : 'button',
                        text   : 'Top + Bottom',
                        handler: function () {
                            gantt.destroy();
                            me.viewport.add(App.Gantt.createGantt({top: true, bottom: true}));
                        }
                    },
                    {
                        xtype  : 'button',
                        text   : 'Left + Right',
                        style  : 'margin-left: 10px',
                        handler: function () {
                            gantt.destroy();
                            me.viewport.add(App.Gantt.createGantt({left: true, right: true}));
                        }
                    },
                    {
                        xtype  : 'button',
                        text   : 'All',
                        style  : 'margin-left: 10px',
                        handler: function () {
                            gantt.destroy();
                            me.viewport.add(App.Gantt.createGantt({top: true, bottom: true, left: true, right: true}));
                        }
                    }
                ]
            });

        return gantt;
    },

    // Initialize application
    init: function () {

        this.taskStore = Ext.create("Gnt.data.TaskStore", {
            model: 'Gnt.model.Task',
            proxy: {
                type  : 'ajax',
                method: 'GET',
                url   : 'tasks.xml',
                reader: {
                    type        : 'xml',
                    // records will have a 'Task' tag
                    record      : ">Task",
                    rootProperty: "Tasks"
                }
            }
        });

        var g = this.createGantt({top: true, bottom: true});

        this.viewport = new Ext.Viewport({
            layout: 'border',

            items: [
                g, {
                    xtype  : 'details',
                    details: '<h3>Labels demo</h3>' +
                    '<p>This example shows how you can configure the different task labels.' +
                    'Click the buttons below the panel to see the various configuration options.</p>' +
                    '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
                }
            ]
        });

    }
};
