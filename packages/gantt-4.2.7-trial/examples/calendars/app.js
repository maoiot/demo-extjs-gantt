/* global App */
Ext.ns('App');

//Ext.Loader.setConfig({enabled: true, disableCaching : false });
//Ext.Loader.setPath('Sch', '../../js/Sch');
//Ext.Loader.setPath('Gnt', '../../js/Gnt');

Ext.require([
    'Sch.plugin.TreeCellEditing',
    'Gnt.data.TaskStore',
    'Gnt.data.CalendarManager',
    'Gnt.data.CrudManager',
    'Gnt.column.StartDate',
    'Gnt.column.EndDate',
    'Gnt.column.ResourceAssignment',
    'Gnt.column.Duration',
    'Gnt.column.Calendar',
    'Gnt.field.Assignment',
    'Gnt.widget.calendar.Calendar',
    'Gnt.widget.calendar.ResourceCalendarGrid',
    'Gnt.data.calendar.BusinessTime',
    'Gnt.panel.Gantt'
]);

Ext.onReady(function () {
    App.Gantt.init();
});

App.Gantt = {

    // Initialize application
    init: function () {
        var taskStore = new Gnt.data.TaskStore({
            calendarManager: new Gnt.data.CalendarManager({
                // we will use BusinessTime calendars
                calendarClass: 'Gnt.data.calendar.BusinessTime'
            })
        });

        var AG = App.Gantt;

        var startDate = new Date(2010, 0, 11);
        var endDate = Sch.util.Date.add(new Date(2010, 0, 11), Sch.util.Date.WEEK, 10);

        var gantt = new Gnt.panel.Gantt({
            lockedGridConfig: {width: 300},
            leftLabelField  : 'Name',
            region          : 'center',

            loadMask                : true,
            enableProgressBarResize : true,
            enableDependencyDragDrop: false,
            highlightWeekends       : true,
            
            rowHeight       : 35,
            eventBorderWidth: 0,
            title           : 'Calendars demo',

            // uncomment to disable the skipping weekends/holidays functionality completely (empty calendar)
            // (for compatibility with 1.x)
            //weekendsAreWorkdays       : false,

            // uncomment to disable the skipping weekends/holidays functionality during d&d operations
            //skipWeekendsDuringDragDrop  : false,

            viewPreset: 'weekAndDayLetter',

            startDate: startDate,
            endDate  : endDate,

            // Setup your static columns
            columns: [
                {
                    xtype: 'calendarcolumn'
                },
                {
                    xtype   : 'namecolumn',
                    sortable: true,
                    width   : 180
                },
                {
                    xtype: 'startdatecolumn',
                    width: 80
                },
                {
                    xtype: 'enddatecolumn',
                    width: 80
                },
                {
                    xtype: 'durationcolumn',
                    width: 70
                },
                {
                    xtype: 'percentdonecolumn',
                    width: 50
                },
                {
                    xtype: 'resourceassignmentcolumn',
                    width: 150
                }
            ],

            crudManager: {
                autoLoad : true,
                taskStore: taskStore,
                transport: {
                    load: {
                        url: 'data/data.json'
                    },
                    sync: {
                        url: 'TODO'
                    }
                }
            },

            plugins: [
                {ptype: 'scheduler_treecellediting', clicksToEdit: 1},
                'gantt_taskeditor'
            ],

            tbar: [
                {
                    iconCls: 'gnt-date',
                    text   : 'Edit working time',
                    handler: function () {
                        var task = gantt.getSelectionModel().getLastSelected(),
                            calendar = task && task.getCalendar() || gantt.taskStore.getCalendar();

                        if (!gantt.editorWindow) {
                            gantt.editorWindow = new Gnt.widget.calendar.CalendarWindow({
                                calendar   : calendar,
                                closeAction: 'hide'
                            });

                        } else {
                            gantt.editorWindow.setCalendar(calendar);
                        }

                        gantt.editorWindow.show();
                    }
                },
                {
                    iconCls: 'gnt-date',
                    text   : 'Resource calendars',
                    handler: function () {
                        if (!gantt.calendarWindow) {
                            gantt.calendarWindow = new Ext.window.Window({
                                title      : 'Resource calendars',
                                modal      : true,
                                width      : 300,
                                layout     : 'fit',
                                closeAction: 'hide',

                                buttons: [
                                    {
                                        text   : 'Close',
                                        handler: function () {
                                            gantt.calendarWindow.close();
                                        }
                                    }
                                ],

                                items: new Gnt.widget.calendar.ResourceCalendarGrid({
                                    resourceStore: gantt.resourceStore
                                })
                            });
                        }

                        gantt.calendarWindow.show();
                    }
                }
            ]
        });

        var viewport = new Ext.Viewport({
            layout: 'border',

            items: [
                gantt, {
                    xtype  : 'details',
                    details: '<h3>Calendars demo</h3>' +
                    '<p>This is a simple example which demonstrates the capabilities of built-in calendar system. ' +
                    'The calendar allows the Gantt to skip non-working days during calculation of task durations. ' +
                    'By default the only non-working time in calendar are weekends.</p>' +
                    '<p>Its possible to add the additional holidays or exceptions (working day which is on weekend). ' +
                    'Holidays/exceptions should be represented as the `Gnt.model.CalendarDay` records in the calendar store.</p>' +
                    '<p>Its also possible to apply custom styling for each holiday period.</p>' +
                    '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
                }
            ]
        });
    }
};
