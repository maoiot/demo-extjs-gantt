Ext.define("MyApp.view.Settings", {
    extend : 'Ext.FormPanel',

    requires : [
        'Ext.ux.colorpick.Field'
    ],

    // Ext JS configs
    alias       : 'widget.settings',
    bodyCls     : 'settings',
    region      : 'south',
    title       : 'SETTINGS',
    hidden      : true,
    bodyPadding : 10,
    rowHeight   : null,

    initComponent : function () {
        var me = this;

        Ext.apply(this, {
            defaults : {
                labelWidth : 150,
                width      : 300
            },
            items    : [
                {
                    xtype      : 'numberfield',
                    fieldLabel : 'Row height',
                    minValue   : 18,
                    value      : this.rowHeight,
                    step       : 4,
                    itemId     : 'gantt-rowheight',
                    listeners  : {
                        spinup   : me.onRowHeightChange,
                        spindown : me.onRowHeightChange,
                        scope    : me,
                        buffer   : 1
                    }
                },
                {
                    xtype        : 'colorfield',
                    itemId       : 'gantt-task-bg-color',
                    fieldLabel   : 'Task bg color'/*,
                    initialChange: true,
                    listeners    : {
                        change: function (field, selColor) {
                            if (!this.initialChange) me.fireEvent('bg-color-change', this, "#" + selColor);
                            this.initialChange = false;
                        }
                    }*/
                },
                {
                    xtype     : 'colorfield',
                    itemId    : 'gantt-task-progressbar-color',
                    fieldLabel: 'Task progress bar color'/*,
                    initialChange: true,
                    listeners : {
                        change: function (field, selColor) {
                            if (!this.initialChange) me.fireEvent('progress-color-change', this, "#" + selColor);
                            this.initialChange = false;
                        }
                    }*/
                },
                {
                    xtype     : 'colorfield',
                    itemId    : 'gantt-dependency-color',
                    fieldLabel: 'Dependency line color'/*,
                    initialChange: true,
                    listeners : {
                        change: function (field, selColor) {
                            if (!this.initialChange) me.fireEvent('dependency-color-change', this, "#" + selColor);
                            this.initialChange = false;
                        }
                    }*/
                }
            ]
        });

        this.callParent(arguments);
    },

    onRowHeightChange : function (field) {
        this.fireEvent('row-height-change', field, field.getValue());
    }
});
