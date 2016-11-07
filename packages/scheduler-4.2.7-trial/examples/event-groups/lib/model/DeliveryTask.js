Ext.define('App.model.DeliveryTask', {
    extend : 'Sch.model.Event',
    fields : [
        'DeliveryId'
    ],

    getDelivery : function(id) {
        return this.store.deliveryStore.getById(this.get('DeliveryId'));
    }
});
