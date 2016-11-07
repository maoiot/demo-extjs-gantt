/**
 * This example has basic functionality and reads data stored in a database using Ruby on Rails.
 * NOTE: For this example to work you have to run it in a web server context with Ruby on Rails configured.
 */
/* global App, Prism */
Ext.ns('App');

Ext.require([
    'Gnt.panel.Gantt'
]);

Ext.onReady(function () {
    App.Gantt.init();
});

App.Gantt = {

    // Initialize application
    init: function (serverCfg) {

        // Create Gantt panel including stores
        var gantt = Ext.create('Gnt.panel.Gantt', {
            title           : 'Ruby on Rails',
            height          : 600,
            width           : 1000,
            rowHeight       : 40,
            eventBorderWidth: 0,
            border          : false,
            bodyBorder      : false,
            split           : false,

            region: 'center',

            loadMask         : true,
            highlightWeekends: true,
            viewPreset       : 'weekAndDayLetter',

            // The server side for the example only implements index & show
            readOnly: true,

            // Setup your static columns
            columns: [
                {
                    xtype: 'namecolumn',
                    width: 200
                }
            ],

            // Stores use rest-proxy to match RoR
            taskStore: Ext.create('Gnt.data.TaskStore', {
                proxy: {
                    type: 'rest',
                    url : '/tasks'
                }
            }),

            dependencyStore: Ext.create('Gnt.data.DependencyStore', {
                autoLoad: true,
                proxy   : {
                    type: 'rest',
                    url : '/dependencies'
                }
            })
        });

        // A viewport to display the example and its source in
        var viewport = Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items : [
                gantt,
                {
                    itemId       : 'exampleDetails',
                    region       : 'east',
                    width        : 400,
                    split        : true,
                    title        : 'Details',
                    collapsible  : true,
                    collapsed    : true,
                    titleCollapse: true,
                    scrollable   : true,
                    bodyBorder   : true,
                    tpl          : '',
                    html         : '<pre data-src="ror.js"></pre>',
                    tbar         : [
                        {
                            xtype  : 'button',
                            iconCls: 'x-fa fa-floppy-o',
                            text   : 'Download example (zip)',
                            tooltip: 'Download source including server side in RoR',
                            handler: function () {
                                document.location = 'ExtGanttRoR.zip';
                            }
                        }
                    ],
                    listeners    : {
                        render: function () {
                            Prism.fileHighlight();
                        }
                    }
                }
            ]
        });

        Ext.QuickTips.init();
    }
};
