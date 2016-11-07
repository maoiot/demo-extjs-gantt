Ext.define('Sch.examples.vertical.view.Scheduler', {
    extend : 'Sch.panel.SchedulerGrid',
    alias  : 'widget.vertical-scheduler',

    requires          : [
        'Sch.examples.vertical.store.TimeAxis'
    ],

    eventBarTextField : 'Title',
    viewPreset        : 'hourAndDay',
    mode              : 'vertical',

    constrainDragToResource : false,
    snapToIncrement         : true,
    eventResizeHandles      : 'end',
    rowHeight               : 50,
    resourceColumnWidth     : 160,
   
    eventBodyTemplate : '<span class="time">{[Ext.Date.format(values.StartDate, "G:i")]}</span> {Title}',

    eventRenderer : function (event, resource, data) {
        data.cls = resource.data.Name;
        return event.data;
    },

    timeAxisColumnCfg : {
        width : 110
    },

    lockedViewConfig : {
        getRowClass : function (resource) {
            return resource.data.Name;
        }
    },

    plugins : [
        {
            ptype : 'scheduler_zones',
            store : {
                xclass : 'Ext.data.JsonStore',
                model  : 'Sch.model.Range',
                data   : [
                    {
                        // Nice 2 hour lunch
                        StartDate : new Date(2011, 11, 9, 12),
                        EndDate   : new Date(2011, 11, 9, 14),
                        Cls       : 'lunch-style'
                    }
                ]
            }

        },
        'scheduler_simpleeditor',
        'responsive'
    ],

    // Uncomment this to make the Scheduler react to viewport size changes, for example when changing orientation on an iPad
    //responsiveConfig : {
    //    "width<height"  : {mode : "vertical"},
    //    "width>=height" : {mode : "horizontal"}
    //},

    onEventCreated : function (newEventRecord) {
        // Overridden to provide some defaults before adding it to the store
        newEventRecord.set({
            Title : "New appointment",
            Type  : 'Meeting'
        });
    }
});