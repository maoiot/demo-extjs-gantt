Ext.define('App.view.AssignmentGrid', {
    extend               : 'Gnt.panel.ResourceUtilization',
    
    requires             : [
        'App.view.AssignmentToolTip'
    ],      
    
    xtype                : 'assignmentgridpanel',
    title                : 'Resource utilization',
    region               : 'south',
    flex                 : 1,
    split                : true,
    partnerTimelinePanel : 'gantt',

    // Easy to style each utilization bar individually with CSS or inline 'style'
    utilizationBarRenderer : function (resourceUtilizationInfo, resource, intervalStartDate, intervalEndDate, metaData) {
        if (resource.getName() === 'Bart') {
            metaData.cls = 'Bart';
        }
    },

    afterRender : function () {
        this.callParent(arguments);

        this.tip = new App.view.AssignmentToolTip({
            target : this.getSchedulingView().el,
            panel  : this
        });
    }
});
