Ext.Loader.setConfig({ enabled : true, disableCaching : true });
Ext.Loader.setPath('Sch', '../../js/Sch');

Ext.require([
    'Sch.panel.SchedulerTree',
    'Sch.plugin.Zones'
]);

Ext.define('Gate', {
    extend : 'Sch.model.Resource',
    fields : [ 'Capacity' ]
});


Ext.define('Flight', {
    extend : 'Sch.model.Event',
    fields : [
        { name : 'IconCls', defaultValue : 'fa-plane' }
    ]
});


Ext.onReady(function () {

    var resourceStore = Ext.create('Sch.data.ResourceTreeStore', {
        model      : 'Gate',
        proxy      : 'memory',
        folderSort : true
    });

    var eventStore = Ext.create('Sch.data.EventStore', {
        model : 'Flight',
        proxy : 'memory'
    });

    var zoneStore = new Sch.data.EventStore({ storeId : 'zones' });

    var cm = new Sch.data.CrudManager({
        autoLoad      : true,
        resourceStore : resourceStore,
        eventStore    : eventStore,
        transport     : {
            load : {
                url : 'data.json'
            }
        },
        stores        : [
            zoneStore
        ]
    });

    var tree = Ext.create('Sch.panel.SchedulerTree', {
        title            : 'Airport departures',
        height           : ExampleDefaults.height,
        width            : ExampleDefaults.width,
        renderTo         : 'example-container',
        rowHeight        : 40,
        barMargin        : 2,
        crudManager      : cm,
        useArrows        : true,
        viewPreset       : 'hourAndDay',
        startDate        : new Date(2016, 11, 2, 8),
        // endDate          : new Date(2016, 11, 2, 18),
        multiSelect      : true,
        border           : false,
        bodyBorder       : false,
        eventBorderWidth : 0,
        gridSplit        : true,
        eventRenderer    : function (flight, resource, meta) {
            if (resource.data.leaf) {
                meta.cls = 'leaf';
                return flight.get('Name');
            } else {
                meta.cls = 'group';
                return '&nbsp;';
            }
        },

        layout : { type : 'hbox', align : 'stretch' },

        lockedGridConfig : {
            width : 300
        },

        schedulerConfig : {
            scroll      : true,
            columnLines : false,
            flex        : 1
        },

        onEventCreated : function (newFlight) {
            newFlight.set('Name', 'New departure');
        },

        columnLines : false,
        rowLines    : true,

        columns : [
            {
                xtype     : 'treecolumn', //this is so we know which column will show the tree
                text      : 'Name',
                width     : 200,
                flex      : 1,
                sortable  : true,
                dataIndex : 'Name'
            },
            {
                text      : 'Capacity',
                width     : 75,
                sortable  : true,
                dataIndex : 'Capacity'
            }
        ],
        plugins : [
            {
                ptype : 'scheduler_zones',
                store : zoneStore
            }
        ],

        viewConfig : {
            getRowClass : function (r) {
                if (r.get('Id') === 3 || r.parentNode.get('Id') === 3) {
                    return 'some-grouping-class';
                }

                if (r.get('Id') === 9 || r.parentNode.get('Id') === 9) {
                    return 'some-other-grouping-class';
                }
            }
        },

        tools : [
            {
                xtype     : 'textfield',
                emptyText : 'Filter resources',

                triggers : {
                    remove : {
                        cls     : 'x-form-clear-trigger',
                        handler : function () {
                            this.setValue('');
                        }
                    }
                },

                listeners : {
                    change : function (field, newValue, oldValue) {
                        if (newValue) {
                            var regexps = Ext.Array.map(newValue.split(/\s+/), function (token) {
                                return new RegExp(Ext.String.escapeRegex(token), 'i');
                            });
                            var length  = regexps.length;

                            resourceStore.filterTreeBy(function (resource) {
                                var name = resource.get('Name');

                                // blazing fast "for" loop! :)
                                for (var i = 0; i < length; i++)
                                    if (!regexps[ i ].test(name)) return false;

                                return true;
                            });
                        } else {
                            resourceStore.clearTreeFilter();
                        }
                    },

                    specialkey : function (field, e, t) {
                        if (e.keyCode === e.ESC) field.reset();
                    }
                }
                // eof listeners
            }
        ]
    });
});

