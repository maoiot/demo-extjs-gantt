Ext.define('App.plugin.SummaryRow', {
    extend : 'Ext.AbstractPlugin',
    alias  : 'plugin.scheduler_summaryrow',

    requires : [
        'Ext.XTemplate'
    ],

    resourceStore   : null,
    eventStore      : null,
    schedulerView   : null,
    scope           : null,
    lockedToolbar   : null,
    scheduleToolbar : null,
    totalText       : 'Total',

    tpl : '<table style="width:{[values.values.length*values.cellWidth]}px"><tr><tpl for="values"><td style="width:{parent.cellWidth}px">{.}</td></tpl></tr></table>',

    init : function (scheduler) {

        if (!(this.tpl instanceof Ext.XTemplate)) {
            this.tpl = new Ext.XTemplate(this.tpl);
        }

        this.lockedToolbar = scheduler.lockedGrid.addDocked({
            xtype : 'component',
            cls   : 'sch-plugin-summaryrow-locked',
            dock  : 'bottom',
            html  : '<table style="width:100%"><tr><td>' + this.totalText + '</td></tr></table>'
        })[0];

        this.scheduleToolbar = scheduler.normalGrid.addDocked({
            xtype      : 'component',
            cls        : 'sch-plugin-summaryrow-normal',
            dock       : 'bottom',
            style      : 'margin-right:' + Ext.getScrollbarSize().width + 'px',
            scrollable : {  // Instantiate a Scroller, but no scrollbars
                x : false,
                y : false
            }
        })[0];


        this.schedulerView = scheduler.getSchedulingView();
        this.eventStore    = scheduler.getEventStore();
        this.resourceStore = scheduler.getResourceStore();

        this.schedulerView.on('refresh', this.renderSummaryRow, this);

        // partner the toolbar scroll with the view only in the X axis
        this.scheduleToolbar.getScrollable().addPartner(this.schedulerView.getScrollable(), 'x');

        var eventListeners = {
            add    : this.renderSummaryRow,
            remove : this.renderSummaryRow,
            update : this.renderSummaryRow,
            scope  : this
        };

        scheduler.mon(this.eventStore, eventListeners);
        scheduler.mon(this.resourceStore, eventListeners);

        if (scheduler.getAssignmentStore()) {
            scheduler.mon(scheduler.getAssignmentStore(), eventListeners);
        }

        this.callParent(arguments);
    },

    renderSummaryRow : function () {
        this.scheduleToolbar.update(this.tpl.apply(this.buildRenderData()));
    },

    buildRenderData : function () {
        var ticks      = this.schedulerView.timeAxis.getTicks(),
            cellWidth  = this.schedulerView.timeAxisViewModel.getTickWidth(),
            totalWidth = cellWidth * ticks.length,
            scope      = this.scope || this,
            values     = Ext.Array.map(ticks, function (tick) {
                var events = this.resourceStore.getScheduledEventsInTimeSpan(tick.start, tick.end, this.eventStore);

                return this.renderer.call(scope, tick.start, tick.end, events);
            }, this);

        return {
            cellWidth  : cellWidth,
            values     : values
        };
    },

    /**
     * The renderer function responsible for generating the text to put in each
     * summary cell. By default, it outputs the number of events found in each time interval.
     * @param {Date} start The interval start
     * @param {Date} end The interval end
     * @param {[Sch.model.Event]} eventsInRange The events in the time interval
     * @returns {String}
     */
    renderer : function (start, end, eventsInRange) {
        return eventsInRange.length || '';
    }
});