Ext.define('App.view.AllocationChart', {
    extend        : 'Ext.chart.PolarChart',
    xtype         : 'allocationchart',
    width         : 350,
    border        : false,
    animate       : true,
    store         : {
        fields : ['name', 'usage']
    },
    shadow        : true,
    eventStore    : 'carbooking',
    resourceStore : 'carstore',
    insetPadding  : 70,
    series        : [
        {
            type       : 'pie',
            angleField : 'usage',
            donut      : 30,
            label      : {
                field    : 'name',
                display  : 'rotate',
                contrast : true
            }
        }
    ],

    afterRender : function () {

        this.eventStore    = Ext.StoreMgr.lookup(this.eventStore);
        this.resourceStore = Ext.StoreMgr.lookup(this.resourceStore);

        Ext.StoreMgr.lookup(this.eventStore).on({
            update : this.refreshChart,
            add    : this.refreshChart,
            scope  : this
        });
        
        this.timeAxis.on({
            reconfigure : this.refreshChart,
            scope       : this
        });

        this.callParent(arguments);

        this.refreshChart();
    },

    refreshChart : function () {
        var data  = [],
            ta    = this.timeAxis,
            start = ta.getStart(),
            end   = ta.getEnd();

        var totalAllocatedTime = 0;

        this.eventStore.queryBy(function (eRec) {
            totalAllocatedTime += eRec.getEndDate() - eRec.getStartDate();
        });

        this.resourceStore.each(function (r) {
            var carAllocatedTime = 0;

            this.eventStore.queryBy(function (eRec) {
                if (eRec.getResourceId() === r.get('Id') && Sch.util.Date.intersectSpans(start, end, eRec.getStartDate(), eRec.getEndDate())) {
                    carAllocatedTime += eRec.getEndDate() - eRec.getStartDate();
                }
            });

            data.push({
                name  : r.getName(),
                usage : Math.round(100 * carAllocatedTime / totalAllocatedTime)
            });
        }, this);

        this.store.loadData(data);
    }
});
