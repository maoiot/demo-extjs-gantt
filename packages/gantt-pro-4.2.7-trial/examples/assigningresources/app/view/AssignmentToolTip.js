Ext.define('App.view.AssignmentToolTip', {
    extend: 'Ext.ToolTip',

    requires : [
        'App.view.AssignmentChart'
    ],
    delegate : '.gnt-utilizationrow-resource .gnt-resource-utilization-interval',
    showDelay: 0,
    hideDelay: 200,
    anchor   : 'bl',
    layout   : 'fit',

    chartStore: null,
    panel     : null,
    trackMouse: true,
    title     : 'Hours',

    initComponent: function () {
        this.chartStore = new Ext.data.Store({
            fields: ['name', 'amount']
        });

        Ext.apply(this, {

            items: [
                {
                    xtype       : 'assignmentchart',
                    store       : this.chartStore
                }
            ],

            listeners: {
                beforeshow: this.onMyBeforeShow,
                scope     : this
            }
        });

        this.callParent(arguments);
    },

    onMyBeforeShow: function (tip) {
        var me = this,
            taskStore = me.panel.getStore().getTaskStore(),
            summaryEvent = me.panel.getSchedulingView().resolveEventRecord(tip.triggerElement),
            originalResource = summaryEvent.getOriginalResource(),
            utilizationDayEl = Ext.fly(tip.triggerElement),
            intervalStart = new Date(parseInt(utilizationDayEl.getAttribute('data-utilization-interval-start'), 10)),
            intervalEnd = new Date(parseInt(utilizationDayEl.getAttribute('data-utilization-interval-end'), 10)),
            utilizationInfo = summaryEvent.getUtilizationInfoForInterval(intervalStart),
            resourceCalendar = originalResource.getCalendar(),
            data = [];

        Ext.Object.each(utilizationInfo.taskInfo, function (taskId, assignmentUtilizationInfo) {
            if (assignmentUtilizationInfo.isUtilized) {
                data.push({
                    name  : taskStore.getNodeById(taskId).getName(),
                    amount: resourceCalendar.convertMSDurationToUnit(assignmentUtilizationInfo.allocationMs, 'h')
                });
            }
        });

        if (data.length === 0) return false;


        // let's get the resource availability value
        var resourceAvailability = 0;

        // loop over its calendar and summarize availability intervals in the "intervalStart - intervalEnd" timespan
        resourceCalendar.forEachAvailabilityInterval(
            {
                startDate: intervalStart,
                endDate  : intervalEnd
            },
            function (start, end) {
                resourceAvailability += end - start;
            }
        );

        // output the resource availability plus over-/underallocated hours
        this.down('cartesian').setTitle('Resource availability: ' + resourceCalendar.convertMSDurationToUnit(resourceAvailability, 'h') + ' hrs' +
            (utilizationInfo.isOverallocated || utilizationInfo.isUnderallocated ?
            ', ' + (utilizationInfo.isOverallocated ? 'Overallocated' : 'Underallocated') + ': ' + resourceCalendar.convertMSDurationToUnit(Math.abs(utilizationInfo.allocationMs - resourceAvailability), 'h') + ' hrs'
                : '')
        );

        this.setTitle('Hours for ' + originalResource.getName() + ' ' + Ext.Date.format(intervalStart, 'M d') + ' - ' + Ext.Date.format(intervalEnd, 'M d'));

        this.chartStore.loadData(data);
    }
});
