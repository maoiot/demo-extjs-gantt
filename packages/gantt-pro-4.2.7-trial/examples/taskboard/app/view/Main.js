Ext.define('GanttTaskBoard.view.Main', {
    extend : 'Ext.panel.Panel',
    xtype  : 'taskboard-main',

    requires : [
        'Ext.plugin.Viewport',

        'GanttTaskBoard.view.MainController',
        'GanttTaskBoard.view.MainModel',

        'GanttTaskBoard.view.Gantt',
        'GanttTaskBoard.view.TaskBoard'
    ],

    controller : 'main',
    viewModel  : 'main',

    layout : 'border',

    items : [
        {
            xtype     : 'gantt',
            region    : 'center',
            reference : 'gantt'
        }, {
            xtype     : 'customtaskboard',
            flex      : 1,
            split     : true,
            region    : 'south',
            reference : 'taskboard'
        }, {
            xtype  : 'details',
            weight: 1000,
            details : '<h3>Gantt + TaskBoard demo</h3>' +
            '<p>This example integrates the TaskBoard component with the Ext Gantt. ' +
            'The Gantt chart tasks can contain Kanban tasks, which are rendered as small miniatures (squares) in the task bar.</p>' +
            '<h4>Features:</h4>' +
            '<ul>' +
            '<li>Kanban tasks state color used for miniature. Dragging kanban task to other state updates miniature</li>' +
            '<li>Tooltip for miniature showing kanban tasks title</li>' +
            '<li>Select task in gantt to filter taskboard</li>' +
            '<li>Click miniature in gantt to select Kanban task (and other way around)</li>' +
            '</ul>' +
            '<p>The source for this example is not minified, you can access it using the combo above.</p>' +
            '<p><strong>Please note:</strong> The Task board is a separate component, not part of the Gantt package. For more information, visit <a href="http://bryntum.com/products/taskboard">http://bryntum.com/products/taskboard</a></p>'
        }
    ]
});
