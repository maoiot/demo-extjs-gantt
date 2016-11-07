Ext.define('App.view.AssignmentChart', {
    extend       : 'Ext.chart.CartesianChart',
    xtype        : 'assignmentchart',
    height       : 250,
    width        : 430,
    theme        : {
        type : 'muted'
    },
    insetPadding : '20 20 20 20',
    interactions : [ 'itemhighlight' ],
    animation    : Ext.isIE8 ? false : {
        easing   : 'backOut',
        duration : 500
    },
    axes         : [
        {
            type           : 'numeric',
            position       : 'left',
            fields         : 'amount',
            minimum        : 0,
            maximum        : 24,
            minorTickSteps : 1,
            majorTickSteps : 6,
            label          : {
                textAlign : 'right'
            },
            title          : 'Hours',
            grid           : {
                odd  : {
                    fillStyle : 'rgba(255, 255, 255, 0.06)'
                },
                even : {
                    fillStyle : 'rgba(0, 0, 0, 0.03)'
                }
            }
        },
        {
            type     : 'category',
            position : 'bottom',
            fields   : 'name'
        }
    ],
    series       : [ {
        type         : 'bar',
        xField       : 'name',
        yField       : 'amount',
        style        : {
            minGapWidth : 20
        },
        highlightCfg : {
            saturationFactor : 1.5
        },
        label        : {
            field   : 'amount',
            display : 'insideEnd'
        }
    } ]
});
