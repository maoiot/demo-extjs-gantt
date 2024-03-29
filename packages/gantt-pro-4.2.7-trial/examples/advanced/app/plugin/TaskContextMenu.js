//extended context menu, color picker added
Ext.define('Gnt.examples.advanced.plugin.TaskContextMenu', {
    extend          : 'Gnt.plugin.TaskContextMenu',
    mixins          : ['Gnt.mixin.Localizable'],
    alias           : ['plugin.advanced_taskcontextmenu','widget.advanced_taskcontextmenu'],

    createMenuItems : function () {
        var items = this.callParent(arguments);

        return [
            {
                text         : this.L('changeTaskColor'),
                requiresTask : true,
                itemId       : 'changeTaskColor',
                isColorMenu  : true,
                isValidAction : function (task) {

                    var readOnly = this.isReadOnly(task),
                        m = this.down('#changeTaskColor').menu;

                    m.setDisabled(readOnly);

                    return !readOnly;
                },
                menu         : {
                    showSeparator : false,
                    items         : [
                        {
                            xtype         : 'colorpicker',
                            allowReselect : true,
                            listeners     : {
                                select : function (cp, color) {
                                    this.rec.set('Color', color);
                                    this.hide();
                                },
                                scope  : this
                            }
                        }
                    ]
                }
            }
        ].concat(items);
    },


    configureMenuItems : function () {

        this.callParent(arguments);

        var rec = this.rec;

        // there might be no record when clicked on the empty space
        if (!rec) return;

        var colorMenu   = this.query('[isColorMenu]')[0].menu.items.first(),
            val         = colorMenu.getValue(),
            recVal      = rec.get('Color');

        if (colorMenu.el) {
            if (val && recVal && recVal !== val) {

                colorMenu.el.down('a.color-' + val).removeCls(colorMenu.selectedCls);

                if (colorMenu.el.down('a.color-' + recVal)) {
                    colorMenu.select(recVal.toUpperCase());
                }
            } else if (val && !recVal) {
                colorMenu.el.down('a.color-' + val).removeCls(colorMenu.selectedCls);
            }
        }
    }
});
