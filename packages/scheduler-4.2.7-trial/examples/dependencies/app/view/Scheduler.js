Ext.define('App.view.Scheduler', {
    extend   : 'Sch.panel.SchedulerGrid',
    xtype    : 'myscheduler',

    title                   : 'Production planning, Chicago plant',
    cls                     : 'scheduler',
    eventBarTextField       : 'Name',
    rowHeight               : 50,
    barMargin               : 8,
    constrainDragToResource : true,
    border                  : false,

    // columnLines             : false,
    viewPreset              : {
        name            : 'hourAndDay',
        timeColumnWidth : 25,
        columnLinesFor : 'top',
        headerConfig    : {
            top    : {
                unit       : 'd',
                align      : 'center',
                dateFormat : 'D d/m'
            },
            middle : {
                unit       : 'h',
                align      : 'center',
                dateFormat : 'G'
            }
        }
    },

    lockedGridConfig  : { width : 150 },

    columns : [
        {
            header    : 'Production line',
            sortable  : true,
            flex      : 1,
            dataIndex : 'Name',
            resizable : false
        }
    ],

    eventRenderer : function (event, resource, meta) {
        meta.style   = 'background:' + resource.get('Bg') + ';color:' + resource.get('TextColor');
        meta.iconCls = 'fa ' + 'fa-' + resource.get('Icon');

        return event.getName();
    }
});


