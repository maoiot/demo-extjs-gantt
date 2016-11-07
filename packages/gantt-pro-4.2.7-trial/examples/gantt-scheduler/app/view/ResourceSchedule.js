Ext.define("MyApp.view.ResourceSchedule", {
    extend    : 'Sch.panel.SchedulerGrid',
    alias     : 'widget.resourceschedule',
    title     : 'Resource schedule',
    flex      : 1,
    cls       : 'resourceschedule',
    hidden    : true,
    body      : false,
    bodyBorder: false,

    // Use the same layout and appearance as the Gantt chart
    lockedGridConfig: {width: 300},
    viewConfig      : {
        preserveScrollOnRefresh: true,
        segmentsTpl            : new Ext.XTemplate(
            '<div class="sch-gantt-segment-connector"></div>',
            '<tpl for="segments">',
            '<div class="resource-segment {cls}" style="left:{left}px;width:{width}px;{style}"><div class="resource-segment-inner">{name}</div></div>',
            '</tpl>')
    },

    // Scheduler configs
    viewPreset        : 'weekAndDayLetter',
    enableDragCreation: false,
    barMargin         : 4,
    eventBorderWidth  : 0,
    assignmentStore   : null,
    workingTimeStore  : null,
    highlightWeekends : true,

    plugins: [
        'scheduler_treecellediting'
    ],

    columns: [
        {
            text     : 'Name',
            flex     : 1,
            dataIndex: 'Name',
            editor   : {xtype: 'textfield'}
        }
    ]
});