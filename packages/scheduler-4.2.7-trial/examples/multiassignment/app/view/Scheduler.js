Ext.define('MyApp.view.Scheduler', {
    extend: 'Sch.panel.SchedulerGrid',
    xtype : 'myscheduler',

    requires: [
        'Sch.data.CrudManager'
    ],


    viewPreset        : 'dayAndWeek',
    rowHeight         : 45,
    enableDragCreation: true,
    dragConfig        : {
        enableCopy: true
    },

    columns: [
        {header: 'Name', sortable: true, width: 100, dataIndex: 'Name'}
    ],

    plugins: {
        ptype: 'myeditor'
    },

    initComponent: function () {
        var resourceStore = new Sch.data.ResourceStore(),
            assignmentStore = new Sch.data.AssignmentStore(),
            eventStore = new Sch.data.EventStore({
                assignmentStore: assignmentStore
            });

        Ext.apply(this, {
            crudManager: new Sch.data.CrudManager({
                autoLoad     : true,
                resourceStore: resourceStore,
                eventStore   : eventStore,
                transport    : {
                    load: {
                        method: 'GET',
                        url   : 'multiassignment.json'
                    }
                },
                listeners    : {
                    loadfail: this.onCrudError
                }
            }),

            startDate: new Date(2011, 0, 4),
            endDate  : Sch.util.Date.add(new Date(2011, 0, 4), Sch.util.Date.DAY, 30),

            title     : 'Multiassignment',
            border    : false,
            bodyBorder: false
        });

        this.callParent(arguments);
    },

    onCrudError: function (crud, response) {
        Ext.Msg.show({
            title   : 'Error',
            msg     : "Failed to load data",
            icon    : Ext.Msg.ERROR,
            buttons : Ext.Msg.OK,
            minWidth: Ext.Msg.minWidth
        });
    }
});
