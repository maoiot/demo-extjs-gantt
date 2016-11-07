Ext.define('App.view.NavigationBar', {
    extend    : 'Ext.panel.Header',
    alias     : 'widget.navigationbar',
    cls       : 'navigationbar',
    padding   : '0 10 0 5',
    height    : 40,
    border    : false,
    title     : '<img src="resources/images/logo.png" height="25" style="margin-top:8px"/>',
    listeners : {
        click : {
            fn       : 'onNavigationBarItemClick',
            delegate : 'tool, button'
        }
    },
    items     : [
        {
            type   : 'left',
            itemId : 'left'
        },
        {
            xtype  : 'button',
            text   : 'Today',
            itemId : 'today'
        },
        {
            type   : 'right',
            itemId : 'right'
        },
        {
            type   : 'print',
            margin : '0 0 0 30'
        },
        {
            type   : 'gear',
            margin : '0 0 0 6'
        },
        {
            type   : 'search',
            margin : '0 0 0 6'
        }
    ]
});
