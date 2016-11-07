Ext.define('Sch.examples.vertical.view.MyToolbar', {
    extend   : 'Ext.Toolbar',
    xtype    : 'mytoolbar',

    initComponent : function () {
        this.items = [
            '->',
            {
                text        : 'Fit columns',
                reference   : 'fitColumns'
            },
            'Column Width:',
            {
                xtype       : 'slider',
                reference   : 'colWidthSlider',
                width       : 100,

                value       : 160,
                increment   : 10,
                minValue    : 30,
                maxValue    : 200
            },
            ' ',
            'Row Height:',
            {
                xtype       : 'slider',
                reference   : 'rowHeightSlider',
                width       : 100,

                value       : 50,
                increment   : 10,
                minValue    : 30,
                maxValue    : 150
            }
        ];

        Ext.Array.forEach(this.items, function (cmp) {
            if (cmp.reference) cmp.itemId = cmp.reference;
        });

        this.callParent(arguments);
    }
});
