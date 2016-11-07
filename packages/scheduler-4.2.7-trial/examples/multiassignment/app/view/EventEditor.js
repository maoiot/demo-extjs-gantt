Ext.define('MyApp.view.EventEditor', {
    extend : 'Sch.plugin.EventEditor',
    alias  : 'plugin.myeditor',

    width  : 300,
    height : 250,

    fieldsPanelConfig : {
        xtype : 'container',

        layout : {
            type  : 'hbox',
            align : 'stretch'
        },

        items : [
            {
                xtype      : 'container',
                autoScroll : true,
                flex       : 1,
                border     : false,
                padding    : '0 10',
                layout     : 'fit',
                items      : [{
                    xtype      : 'checkboxgroup',
                    labelAlign : 'top',
                    fieldLabel : 'Assigned Resources',
                    vertical   : true,
                    columns    : 1
                }]
            },
            {
                xtype    : 'container',
                border   : false,
                flex     : 1,
                layout   : 'anchor',
                defaults : {
                    anchor : '90%'
                },

                items : [
                    {
                        xtype      : 'textfield',
                        labelAlign : 'top',
                        name       : 'Name',
                        fieldLabel : 'Name'
                    }
                ]
            }
        ]
    },

    afterRender : function () {
        this.callParent(arguments);

        this.mon(this.schedulerView.resourceStore, {
            load        : this.loadResources,
            datachanged : this.loadResources,
            clear       : this.loadResources,

            scope : this
        });
    },

    loadResources : function () {
        var cbg           = this.down('checkboxgroup');
        var resourceStore = this.schedulerView.resourceStore;

        cbg.removeAll(true);

        cbg.add(
            Ext.Array.map(resourceStore.getRange(), function (resource) {
                return { boxLabel : resource.getName(), name : 'resource', inputValue : resource.getId() };
            })
        );
    },

    show : function () {
        this.callParent(arguments);

        var cbg         = this.down('checkboxgroup');
        var selected    = this.eventRecord.phantom ? [this.resourceRecord] : this.eventRecord.getResources();

        cbg.setValue({
            resource : Ext.Array.map(selected, function (resource) {
                return resource.getId();
            })
        });
    },

    onAfterSave : function (eventRecord) {
        var cbg = this.down('checkboxgroup');
        var resources = cbg.getValue().resource;

        resources = resources instanceof Array ? resources : [resources];

        eventRecord.unassign();
        eventRecord.assign(Ext.Object.getValues(resources));
    }
});
