Ext.define('App.store.DeliveryTaskStore', {
    extend        : 'Sch.data.EventStore',

    requires      : [
        'App.store.DeliveryStore'
    ],
    model         : 'App.model.DeliveryTask',
    deliveryStore : null,

    constructor : function() {
        this.setDeliveryStore(new App.store.DeliveryStore({
            taskStore         : this
        }));

        this.callParent(arguments);
    },

    setDeliveryStore : function(store) {
        this.deliveryStore = store;
    },

    getDeliveryStore : function(store) {
        return this.deliveryStore;
    },

    getTasksByDeliveryId : function(id) {
        return this.query('DeliveryId', id);
    }
});
