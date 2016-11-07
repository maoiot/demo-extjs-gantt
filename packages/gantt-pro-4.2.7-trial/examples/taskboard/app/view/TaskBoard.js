Ext.define('GanttTaskBoard.view.TaskBoard', {
    extend : 'Kanban.view.TaskBoard',
    xtype  : 'customtaskboard',

    title          : 'All activities',
    iconCls        : 'x-fa fa-asterisk',
    taskMenu       : false,
    enableUserMenu : true,
    userMenu : {
        xtype         : 'kanban_usermenu',
        resourceStore : 'resources'
    },

    taskStore     : 'kanbanStore',
    resourceStore : {
        type    : 'kanban_resourcestore',
        storeId : 'resources',
        data : [
            { Id : 1, Name : 'First guy', ImageUrl : 'resources/images/unknown.gif' },
            { Id : 2, Name : 'Second guy', ImageUrl : 'resources/images/unknown.gif' }
        ]
    },

    viewConfig : {
        taskBodyTpl : '<div class="task-body">' +
        '<div class="sch-task-name">{Name}</div>' +
        '</div>'
    },

    tools : [
        {
            xtype     : 'button',
            text      : 'Show all',
            reference : 'showAllBtn',
            disabled  : true,
            iconCls   : 'x-fa fa-asterisk',
            handler   : 'onKanbanShowAllClick'
        }
    ],

    listeners : {
        select   : 'onKanbanTaskSelect',
        deselect : 'onKanbanTaskDeselect'
    }
});