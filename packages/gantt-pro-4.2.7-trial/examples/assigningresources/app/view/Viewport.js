Ext.define('App.view.Viewport', {
    extend : 'Ext.Viewport',
    layout : 'border',
    items  : [
        {
            xtype  : 'container',
            region : 'center',
            layout : 'border',
            items  : [
                {
                    title : 'Gantt chart',
                    xtype : 'appgantt',
                    id    : 'gantt'
                },
                {
                    xtype : 'assignmentgridpanel'
                }
            ]
        },
        {
            xtype   : 'details',
            details : '<h3>Resource assignment demo</h3>' +
            '<p>This demo shows how to assign resources and uses a ResourcesUtilization-panel to display utilization levels.</p>' +
            '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
        }
    ]
});
