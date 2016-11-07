Ext.application({
    name: 'GanttTaskBoard',

    extend: 'GanttTaskBoard.Application',

    requires: [
        'GanttTaskBoard.view.Main'
    ],

    mainView: 'GanttTaskBoard.view.Main'
});
