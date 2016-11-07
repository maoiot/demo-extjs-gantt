/* global App */
Ext.ns('App');

//Ext.Loader.setConfig({enabled: true, disableCaching : true });
//Ext.Loader.setPath('Sch', '../../js/Sch');
//Ext.Loader.setPath('Gnt', '../../js/Gnt');

Ext.require([
    'Gnt.panel.Gantt',
    'Gnt.column.PercentDone',
    'Gnt.column.StartDate',
    'Gnt.column.EndDate',
    'Sch.plugin.TreeCellEditing'
]);

Ext.onReady(function () {
    App.Gantt.init();
});

App.Gantt = {

    // Initialize application
    init: function (serverCfg) {

        var taskStore = Ext.create("Gnt.data.TaskStore", {
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

        var dependencyStore = Ext.create("Gnt.data.DependencyStore", {
            allowedDependencyTypes: ['EndToStart'],
            autoLoad              : true,
            proxy                 : {
                type  : 'ajax',
                url   : 'dependencies.xml',
                method: 'GET',
                reader: {
                    type        : 'xml',
                    rootProperty: 'Links',
                    record      : 'Link' // records will have a 'Link' tag
                }
            }
        });

        var g = Ext.create('Gnt.panel.Gantt', {
//            leftLabelField    : 'Name',
            highlightWeekends: true,
            loadMask         : true,
            rowHeight        : 30,
            resizeConfig     : {
                showDuration: false
            },
            region           : 'center',
            title            : 'Planned releases',
            border           : false,

            plugins: 'gantt_taskeditor',

            viewConfig              : {
                trackOver: false
            },
            enableProgressBarResize : true,
            enableDependencyDragDrop: true,
            //snapToIncrement : true,
            startDate               : new Date(2010, 0, 11),
            endDate                 : Sch.util.Date.add(new Date(2010, 0, 4), Sch.util.Date.WEEK, 10),
            viewPreset              : {
                timeColumnWidth : 130,
                name            : 'weekAndDayLetter',
                headerConfig    : {
                    middle          : {
                        unit        : 'w',
                        dateFormat  : 'D d M Y'
                    }
                }
            },
            eventBorderWidth        : 0,

            eventRenderer: function (taskRecord) {
                return {
                    ctcls: "Id-" + taskRecord.get('Id') // Add a CSS class to the task container element
                };
            },

            // Setup your static columns
            columns: [
                {
                    xtype: 'namecolumn',
                    width: 200
                }
            ],

            taskStore      : taskStore,
            dependencyStore: dependencyStore,

            tbar: [
                {
                    xtype  : 'button',
                    text   : 'Add new task...',
                    iconCls: 'x-fa fa-plus-circle',
                    handler: function () {

                        if (!g.isReadOnly()) {
                            var newTask = new taskStore.model({
                                Name: 'New task',
                                leaf: true,
                                PercentDone: 0
                            });
                            taskStore.getRootNode().appendChild(newTask);
                            g.getSchedulingView().scrollEventIntoView(newTask);
                        }
                    }
                },
                {
                    xtype       : 'button',
                    style       : 'margin-left: 10px',
                    enableToggle: true,
                    id          : 'demo-readonlybutton',
                    text        : 'Read only mode',
                    pressed     : false,
                    handler     : function () {
                        g.setReadOnly(this.pressed);
                    }
                }
            ],

            listeners: {

                // Setup a time header tooltip after rendering
                render: function (view) {
                    var header = view.getSchedulingView().headerCt;

                    view.tip = Ext.create('Ext.tip.ToolTip', {
                        // The overall target element.
                        target    : header.id,
                        // Each grid row causes its own separate show and hide.
                        delegate  : '.sch-simple-timeheader',
                        showDelay : 0,
                        trackMouse: true,
                        anchor    : 'bottom',

                        //to see different date formats, see http://docs.sencha.com/ext-js/4-1/#!/api/Ext.Date
                        dateFormat: 'Y-m-d',
                        //dateFormat: 'Y-m-d, g:i a',
                        renderTo  : Ext.getBody(),
                        listeners : {
                            // Change content dynamically depending on which element triggered the show.
                            beforeshow: function (tip) {
                                var el = Ext.get(tip.triggerElement),
                                    position = el.getXY(),
                                    date = view.getSchedulingView().getDateFromXY(position);

                                //update the tip with date
                                tip.update(Ext.Date.format(date, tip.dateFormat));
                            }
                        }
                    });
                }
            }
        });

        var viewport = new Ext.Viewport({
            layout: 'border',

            items: [
                g, {
                    xtype  : 'details',
                    details: '<h3>Basic Gantt demo</h3>' +
                    '<p>This is a simple example with basic functionality only. ' +
                    'Tasks titles can be edited inline and you can drag/drop and resize tasks.</p>' +
                    '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
                }
            ]
        });

        Ext.QuickTips.init();
    }
};
