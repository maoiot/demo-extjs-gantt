Ext.define('App.view.IncidentChartController', {
    extend          : 'Ext.app.ViewController',
    alias           : 'controller.incidentchart',

    onSeriesTooltipRender: function (tooltip, record, item) {
        var title = item.series.getTitle();

        tooltip.setHtml(record.get(item.series.getYField()) + ' incident reports');
    }
});