Ext.define("MyApp.controller.Settings", {
    extend: 'Ext.app.Controller',
    views : ['Settings'],

    refs: [
        {ref: "gantt", selector: 'gantt'}
    ],

    init: function () {
        var me = this;

        me.control({
            settings             : {
                'show'             : me.onShow,
                'row-height-change': me.onRowHeightChange//,
                //'bg-color-change'        : me.onBgColorChange,
                //'progress-color-change'  : me.onProgressbarColorChange,
                //'dependency-color-change': this.onDependencyColorChange
            },
            'settings colorfield': {
                change: me.onColorChange
            }
        });
    },

    getColorOfNode: function (selector, styleName) {
        if (!window.getComputedStyle) return null;

        var node = this.getGantt().getEl().selectNode(selector),
            color = node && window.getComputedStyle(node)[styleName],
            rgb = color && color.substr(4).split(',');

        // happens when all nodes are collapsed
        if (!rgb) return '#ff0000';

        rgb = Ext.Array.map(rgb, function (colorStr) {
            return parseInt(colorStr, 10);
        });

        return Ext.ux.colorpick.ColorUtils.rgb2hex(rgb[0], rgb[1], rgb[2]);
    },

    onShow: function (settings) {
        // set colorfields to colors currently in use

        var hexTaskBar = this.getColorOfNode('.sch-gantt-task-bar', 'background-color');
        if (hexTaskBar) settings.down('#gantt-task-bg-color').setValue(hexTaskBar);

        var hexProgressBar = this.getColorOfNode('.sch-gantt-task-bar .sch-gantt-progress-bar', 'background-color');
        if (hexProgressBar) settings.down('#gantt-task-progressbar-color').setValue(hexProgressBar);

        var hexDepLine = this.getColorOfNode('.sch-dependency-line', 'border-left-color');
        if (hexDepLine) settings.down('#gantt-dependency-color').setValue(hexDepLine);

        this.showDone = true;
    },

    onRowHeightChange: function (field, height) {
        this.getGantt().setRowHeight(height);
    },

    onColorChange: function(field, color) {
        if (this.showDone) {
            color = '#' + color;
            Ext.util.CSS.refreshCache();
            switch (field.itemId) {
                case 'gantt-task-bg-color':
                    Ext.util.CSS.updateRule('div.sch-gantt-task-bar', 'background', color);
                    Ext.util.CSS.updateRule('div.sch-gantt-milestone-diamond', 'border-left-color', color);
                    break;
                case 'gantt-task-progressbar-color':
                    Ext.util.CSS.updateRule('.sch-gantt-task-bar .sch-gantt-progress-bar', 'background-color', color);
                    break;
                case 'gantt-dependency-color':
                    Ext.util.CSS.updateRule('div.sch-dependency-line', 'border-color', color);
                    Ext.util.CSS.updateRule('.sch-dependency-arrow', 'border-left-color', color);
                    //Ext.util.CSS.updateRule('.sch-dependency-arrow', 'border-top-color', color);
                    //Ext.util.CSS.updateRule('.sch-dependency-arrow', 'border-right-color', color);
                    //Ext.util.CSS.updateRule('.sch-dependency-arrow', 'border-bottom-color', color);
                    break;

            }
        }
    }/*,

    onBgColorChange: function (picker, color) {
        Ext.util.CSS.refreshCache();
        Ext.util.CSS.updateRule('div.sch-gantt-task-bar', 'background', color);
        Ext.util.CSS.updateRule('div.sch-gantt-milestone-diamond', 'border-left-color', color);
    },

    onProgressbarColorChange: function (picker, color) {
        Ext.util.CSS.refreshCache();
        Ext.util.CSS.updateRule('.sch-gantt-task-bar .sch-gantt-progress-bar', 'background-color', color);
    },

    onDependencyColorChange: function (picker, color) {
        Ext.util.CSS.refreshCache();
        Ext.util.CSS.updateRule('div.sch-dependency-line', 'border-color', color);       
        Ext.util.CSS.updateRule('img.sch-dependency-arrow', 'border-color', color);
    }*/
});