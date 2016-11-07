Ext.define("DEMO.view.Scheduler", {
    extend          : "Sch.panel.SchedulerGrid",
    alias           : 'widget.Scheduler',
    title           : 'Employee Schedule',
    region          : 'center',
    viewPreset      : 'monthAndYear',
    rowHeight       : 32,
    split           : false,
    eventStore      : 'Bookings',
    resourceStore   : 'Employees',

    onEventCreated : function (newRecord) {
        newRecord.set('Name', 'New task');
    },

    // Specialized template with header and footer
    eventBodyTemplate : new Ext.XTemplate(
        '<div><span class="sch-event-header">{[fm.date(values.StartDate, "Y-m-d")]}</span>' +
        '<div class="sch-event-footer">{Name}</div></div>'
    ),

    initComponent : function() {
        var me = this;

        Ext.apply(me, {

            columns: [
                {
                    header      : 'Name',
                    dataIndex   : 'Name',
                    width       : 150,
                    tdCls       : 'user',
                    sortable    : true,
                    editor      : 'textfield'
                },
                {
                    header      : 'Active',
                    dataIndex   : 'Active',
                    width       : 50,
                    xtype       : 'booleancolumn',
                    trueText    : 'Yes',
                    falseText   : 'No',
                    align       : 'center'
                }
            ]
        });

        me.callParent(arguments);
    },

    onRender : function() {
        this.callParent(arguments);

        // Lazy loading only after render
        this.getEventStore().load();
    }
});