Ext.define('App.view.CarFleetStatusChart', {
    extend       : 'Ext.chart.PolarChart',
    xtype        : 'carfleetstatuschart',
    insetPadding : 40,
    title        : 'Car Fleet Status',
    carStore     : null,
    store        : {
        storeId : 'fleetstatusstore',
        fields  : ['percentFunctioningCars']
    },

    bodyCls      : 'chartbody',
    animation    : true,
    donut        : true,

    series : [{
        type   : 'pie',
        xField : 'percentFunctioningCars',
        colors : ['#FF9463', '#e9e9e9'],
        donut  : 75
    }],

    afterRender : function () {
        this.callParent(arguments);

        this.carStore.on({
            load   : this.populateStore,
            update : this.populateStore,
            remove : this.populateStore,
            add    : this.populateStore,
            clear  : this.populateStore,
            scope  : this
        });

        this.populateStore();

    },

    populateStore : function () {
        var enabled = Math.round(100 * this.carStore.query('Enabled', true).getCount() / this.carStore.getCount());

        this.store.setData([
            { percentFunctioningCars   : enabled },
            { percentFunctioningCars   : 100 - enabled }
        ]);

        this.totalEl && this.totalEl.destroy();
        this.totalEl = this.body.createChild({ cls : 'total', html : enabled + '%' });
    }
});
