Ext.define("MyApp.view.Navigation", {
    extend     : 'Ext.Container',
    alias      : 'widget.navigation',
    layout     : 'vbox',
    width      : 86,
    weight     : 100,
    region     : 'west',
    defaultType: 'button',
    cls        : 'navigation',
    defaults   : {
        enableToggle: true,
        scale       : 'large',
        toggleGroup : 'nav',
        height      : 64,
        width       : 64,
        margin      : 10
    },
    items      : [
        {
            itemId : 'gantt',
            iconCls: 'x-fa fa-square',
            pressed: true
        },
        {
            itemId: 'resourceschedule',
            iconCls: 'x-fa fa-calendar'
        },
        {
            itemId: 'histogram',
            iconCls: 'x-fa fa-bar-chart'
        },
        {
            itemId: 'resourcelist',
            iconCls: 'x-fa fa-th-list'
        },
        {
            xtype: 'tbfill'
        },
        {
            itemId      : 'settings',
            iconCls       : 'x-fa fa-sliders',
            enableToggle: false,
            toggleGroup : 'none'
        }
    ]
});