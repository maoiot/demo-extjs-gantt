Ext.define('App.view.ResourceFilter', {
    extend          : 'Ext.form.CheckboxGroup',
    alias           : 'widget.resourcefilter',
    resourceStoreId : 'resource',
    columns         : 1,
    vertical        : true,
    scrollable      : 'y',

    defaults : {
        margin        : '0 0 10 0',
        boxLabelAlign : 'before',
        checked       : true,
        width         : '100%'
    },

    initComponent : function () {
        var resourceStore = Ext.StoreManager.get(this.resourceStoreId);

        this.items = Ext.Array.map(resourceStore.getRange(), function (resource) {
            var id = resource.getId();

            return {
                boxLabel   : resource.getName(),
                name       : id,
                inputValue : id,
                style      : 'color:' + resource.get('Color')
            };
        });

        this.callParent(arguments);
    },
    
    listeners: {
        change: 'onResourceFilterChange'
    }
});