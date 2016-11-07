StartTest(
    {
        // to avoid waiting - seems somewhere in Ext code related to tooltips,
        // there is a "setTimeout" call
        overrideSetTimeout : false
    },
    function (t) {
        var startDate   = new Date(2010, 11, 14);
        var endDate     = new Date(2011, 1, 2);
        
        var scheduler   = t.getScheduler({
            tooltipTpl  : new Ext.Template('{Name} {Id}'),
            renderTo    : Ext.getBody(),
            startDate   : startDate,
            endDate     : endDate
        }, 1);
        
        t.willFireNTimes(scheduler, 'beforetooltipshow', 1);
        
        var firstTask = scheduler.eventStore.first();
        firstTask.setStartEndDate(startDate, endDate);
        
        t.chain(
            { waitFor : 'eventsToRender', args : scheduler },

            function (next) {
                t.ok(!scheduler.getSchedulingView().tip, 'Tip not created before first event hover');

                scheduler.on('beforetooltipshow', function (schedView, record) {
                    t.is(schedView, scheduler.getSchedulingView(), '"beforetooltipshow" - correct 1st argument');
                    t.is(firstTask, record, '"beforetooltipshow" - correct 2nd argument');

                    var as = t.beginAsync();

                    schedView.tip.on('show', function(tip) {
                        t.endAsync(as);
                        
                        t.isApprox(tip.getX(), t.currentPosition[0], 20, 'Should find tooltip horizontally placed by the cursor');
                    }, null, { delay : 100 });

                }, null, { single : true });

                next();
            },

            { moveCursorTo : '.sch-event', offset : [10, 5] },
            
            // when using "mouseMovePrecision : 10000" only single "mousemove" event will be fired, 
            // which will be used to call "setupTooltip", so need to move mouse again to actually trigger tooltip            
            { moveMouseBy : [[5, 0]] },

            { waitFor : 'componentVisible', args : '[cls=sch-tip]' },
            
            function (next) {
                var tipEl = Ext.getBody().down('.sch-tip');
                t.contentLike(tipEl, 'Assignment 1 1', 'Tooltip template works correct');
            }
        );
    });