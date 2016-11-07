Ext.define('TestApp.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.form.field.Text', // fixes SASS compilation issue
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Sch.panel.SchedulerGrid'
    ],

    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    items: [{
        region              : 'center',
        xtype               : 'schedulerpanel',

        viewPreset          : 'dayAndWeek',

        eventStore          : 'events',
        resourceStore       : 'resources',

        startDate           : new Date(2013, 10, 1),
        endDate             : new Date(2013, 11, 1),

        columns             : [
            { text : 'Name', dataIndex : 'Name' }
        ]
    }]
});