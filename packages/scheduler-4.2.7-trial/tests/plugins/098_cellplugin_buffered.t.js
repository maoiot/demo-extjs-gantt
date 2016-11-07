StartTest(function (t) {
    var plugin, scheduler;

    var createFakeData = function (count) {
        var firstNames   = ['Ed', 'Tommy', 'Aaron', 'Abe', 'Jamie', 'Adam', 'Dave', 'David', 'Jay', 'Nicolas', 'Nige'],
            lastNames    = ['Spencer', 'Maintz', 'Conran', 'Elias', 'Avins', 'Mishcon', 'Kaneda', 'Davis', 'Robinson', 'Ferrero', 'White'];

        var resourceData = [], i;
        for (i = 0; i < (count || 25); i++) {
            var firstNameId = Math.floor(Math.random() * firstNames.length),
                lastNameId  = Math.floor(Math.random() * lastNames.length),

                name        = Ext.String.format("{0} {1}", firstNames[firstNameId], lastNames[lastNameId]);

            resourceData.push({
                Id          : i,
                Name        : name
            });
        }
        
        var eventData       = [];

        for (i = 0; i < (count || 25); i++) {
            eventData.push({
                Id          : 'Event' + i,
                Name        : 'Event' + i + '-1',
                ResourceId  : i,
                StartDate   : "2011-01-26",
                EndDate     : "2011-01-27"
            });
            
            if (i % 2) eventData.push({
                Id          : 'Event' + i + '-2',
                Name        : 'Event' + i + '-2',
                ResourceId  : i,
                StartDate   : "2011-01-26",
                EndDate     : "2011-01-28"
            });
            
        }
        
        return {
            resourceData    : resourceData,
            eventData       : eventData
        };
    };
    
    var setup = function (config) {
        scheduler && scheduler.destroy();
        config  = config || {};
        
        plugin = new Sch.plugin.CellPlugin(config.plugin || {});
        
        var data = createFakeData(500);
        
        scheduler = t.getScheduler(Ext.apply({
            width       : 1000,
            height      : 500,
            startDate   : new Date(2011, 0, 24),
            viewPreset  : 'weekAndDay',
            renderTo    : Ext.getBody(),
            plugins     : [
                plugin,
                'bufferedrenderer'
            ],
            resourceStore   : t.getResourceStore({
                data    : data.resourceData
            }),
            eventStore      : t.getEventStore({
                data    : data.eventData
            })
        }, config.scheduler || {}));
    };

    var cellPluginOk    = function () {
        var view        = scheduler.getSchedulingView();
        var resource    = scheduler.resourceStore.getAt(plugin.position.resourceIndex);
        if (!resource) {
            return false;
        }
        var node        = Ext.get(view.getNodeByRecord(resource));
        var el          = plugin.containerEl;
        var tickWidth   = scheduler.timeAxisViewModel.getTickWidth();

        return Math.abs(el.getWidth() - tickWidth) < 2 &&
                Math.abs(el.getHeight() - node.getHeight()) < 2 &&
                el.getX() === (node.getX() + plugin.position.tickIndex * tickWidth) &&
                Math.abs(el.getY() - node.getY()) < 2 &&
                el.isVisible();
    };
    
    var checkPlugin = function (t) {
        var view        = scheduler.getSchedulingView();
        var pos         = plugin.getPosition();
        var resource    = scheduler.resourceStore.getAt(pos.resourceIndex);
        var node        = Ext.get(view.getNodeByRecord(resource));
        var el          = plugin.containerEl;
        var tickWidth   = scheduler.timeAxisViewModel.getTickWidth();
        
        t.isApprox(el.getWidth(), tickWidth, 2, 'Width is correct');
        t.isApprox(el.getHeight(), node.getHeight(), 2, 'Height is correct');
        t.is(el.getX(), node.getX() + plugin.position.tickIndex * tickWidth, 'Horizontal position is correct');
        t.isApprox(el.getY(), node.getY(), 2, 'Vertical position is correct');
        t.ok(el.isVisible(), 'Element is visible');
    };
    
    t.it('Highlighter should be restored after scrolling down/back up', function (t) {
        setup({
            plugin  : {
                singleClickEditing  : false
            }
        });
        
        var view = scheduler.getSchedulingView();
        
        t.chain(
            { click : function () { return view.getNodeByRecord(scheduler.resourceStore.getById(3)); }, offset : [20, 20] },
            { waitFor : cellPluginOk },
            function (next) {
                t.scrollVerticallyTo(view.el, 1500, next);
            },
            // additional wait for IE that seemingly fix scrolling issue
            { waitFor : 100 },
            { waitFor : function () {
                return view.getScrollY() > 1400;
            } },
            function (next) {
                t.ok(!plugin.containerEl.isVisible(), 'Plugin is hidden');
                t.scrollVerticallyTo(view.el, 0, next);
            },
            { waitFor : function () {
                var resource    = scheduler.resourceStore.getAt(plugin.getPosition().resourceIndex);
                var node        = Ext.get(view.getNodeByRecord(resource));
                return !!node;
            }},
            { waitFor : cellPluginOk}
        );
    });
    
    t.it('Highlighter should work after buffered range changed', function (t) {
        setup({
            plugin  : {
                singleClickEditing  : false
            }
        });
        
        var view = scheduler.getSchedulingView();
        
        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                t.waitForEvent(plugin, 'selectionchange', next);
                t.click(view.getNodeByRecord(scheduler.resourceStore.getById(3)), false, false, false, [20, 20]);
            },
            function (next) {
                t.scrollVerticallyTo(view.el, 1500, next);
            },
            { waitFor : 300 },
            function (next) {
                t.waitForEvent(plugin, 'selectionchange', next);
                t.click(view.getNodeByRecord(scheduler.resourceStore.getById(38)), false, false, false, [10, 10]);
            },
            function (next) {
                checkPlugin(t);
                plugin.moveLeft();
                checkPlugin(t);
                plugin.moveDown();
                checkPlugin(t);
                plugin.moveRight();
                checkPlugin(t);
                plugin.moveUp();
                checkPlugin(t);
            }
        );
    });
});