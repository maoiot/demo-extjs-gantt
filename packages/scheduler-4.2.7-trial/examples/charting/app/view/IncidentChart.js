Ext.define('App.view.IncidentChart', {
    extend : 'Ext.chart.CartesianChart',
    xtype  : 'incidentchart',

    requires : [
        'App.view.IncidentChartController'
    ],

    controller   : 'incidentchart',
    border       : false,
    animate      : true,
    store        : 'incidentstore',
    height       : 250,
    timeAxis     : null,
    insetPadding : '0 0 50 0',
    series       : {
        type         : 'line',
        xField       : 'Date',
        yField       : 'NbrIncidents',
        style        : {
            lineWidth   : 0,
            strokeStyle : '#115fa6',
            strokeOpacity : 0.3,
            fillOpacity : 0.5,
            miterLimit  : 3,
            lineCap     : 'miter'
        },
        marker       : {
            type      : 'circle',
            fillStyle : '#115fa6',
            radius    : 3,
            fx        : {
                duration : 200,
                easing   : 'backOut'
            }
        },
        highlightCfg : {
            scaling : 2
        },
        tooltip      : {
            trackMouse : true,
            renderer   : 'onSeriesTooltipRender'
        }
    },
    axes         : [{
        type     : 'numeric',
        position : 'left',
        hidden   : true,
        maximum  : 12,
        fields   : ['NbrIncidents']
    }, {
        type         : 'time',
        dateFormat   : 'M d',
        visibleRange : [0, 1],
        position     : 'bottom',
        fields       : ['Date']
    }],

    initComponent : function () {

        this.timeAxis.on({
            reconfigure : this.onRangeChanged,
            scope       : this
        });

        this.callParent(arguments);

        this.onRangeChanged();
    },

    onRangeChanged : function () {
        var chartTimeAxis = this.down('axis[type=time]');

        chartTimeAxis.setFromDate(this.timeAxis.getStart());
        chartTimeAxis.setToDate(this.timeAxis.getEnd());

        this.redraw();
    }
});
