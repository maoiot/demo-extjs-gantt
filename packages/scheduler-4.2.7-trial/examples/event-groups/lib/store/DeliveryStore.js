Ext.define('App.store.DeliveryStore', {
    extend : 'Ext.data.Store',

    model             : 'App.model.Delivery',
    storeId           : 'deliveries',
    taskStore         : null,
    deliveryStepStore : null
});
