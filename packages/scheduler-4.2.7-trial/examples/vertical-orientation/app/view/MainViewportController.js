Ext.define('Sch.examples.vertical.view.MainViewportController', {
    extend : 'Ext.app.ViewController',
    alias  : 'controller.vertical-viewport',

    control : {
        '[reference=fitColumns]'        : { click : 'onFitColumns' },
        '[reference=colWidthSlider]'    : { change : 'onColWidthSliderChange' },
        '[reference=rowHeightSlider]'   : { change : 'onRowHeightSliderChange' },
        '[reference=scheduler]'         : {
            columnwidthchange : 'onColumnWidthChange',
            viewchange        : 'updateTimeAxisHeader',
            viewready         : 'updateTimeAxisHeader'
        }
    },

    getScheduler : function () {
        return this.getView().lookupReference('scheduler');
    },

    getSpanningScheduler : function () {
        return this.getView().lookupReference('spanningscheduler');
    },

    onColumnWidthChange : function (timeAxisViewModel, width) {
        this.getView().lookupReference('colWidthSlider').setValue(width);
    },

    updateTimeAxisHeader : function () {
        var verticalAxis = this.getScheduler().down('verticaltimeaxis');

        verticalAxis.setText(Ext.Date.format(this.getScheduler().getStartDate(), 'd M Y'));
    },

    onFitColumns : function () {
        var slider = this.getView().lookupReference('colWidthSlider');
        slider.suspendEvents();
        this.getScheduler().getSchedulingView().fitColumns();
        slider.resumeEvents();
    },

    onColWidthSliderChange : function (slider, value) {
        this.getScheduler().getSchedulingView().setColumnWidth(value);
    },

    onRowHeightSliderChange : function (slider, value) {
        this.getScheduler().getSchedulingView().setRowHeight(value);
    }
});
