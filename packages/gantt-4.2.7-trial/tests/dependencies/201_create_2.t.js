StartTest({
    // otherwise Siesta is waiting until the tooltip is hidden (its hidden after 5s using "setTimeout")
    overrideSetTimeout	: false
},function (t) {
    var gantt;

    var getGantt = function (cfg) {
        gantt && gantt.destroy();

        gantt = t.getGantt2(Ext.apply({
            startDate       : new Date(2011, 6, 1),
            endDate         : new Date(2011, 6, 28),
            renderTo        : Ext.getBody()
        }, cfg));

        return gantt;
    };

    var getGantt2 = function (allowedDependencyTypes) {
        return getGantt(getDataSet({
            dependencyStore : {
                allowedDependencyTypes : allowedDependencyTypes
            }
        }));
    };

    var getDataSet = function (cfg) {
        cfg                 = cfg || {};

        var dependencyStore = t.getDependencyStore(Ext.apply({ data : [] }, cfg.dependencyStore));

        var taskStore       = t.getTaskStore(Ext.apply({
            cascadeDelay    : 0,
            dependencyStore : dependencyStore,

            DATA : [
                {
                    Id        : 1,
                    leaf      : true,
                    Name      : 'Foo',
                    StartDate : new Date(2011, 6, 1),
                    EndDate   : new Date(2011, 6, 5),
                    Cls       : 'T1'
                },
                {
                    Id        : 2,
                    leaf      : true,
                    Name      : 'Bar',
                    StartDate : new Date(2011, 6, 5),
                    EndDate   : new Date(2011, 6, 7),
                    Cls       : 'T2'
                }
            ]
        }, cfg.taskStore));

        return {
            taskStore       : taskStore,
            dependencyStore : dependencyStore
        };
    };

    t.it('Should hide drop zones', function (t) {
        t.it('No restrictions', function (t) {
            getGantt2(null);

            t.chain(
                { moveCursorTo : [1, 1] },
                { moveMouseTo : '.sch-gantt-item' },

                function () {
                    t.elementIsVisible('.sch-event-hover .sch-gantt-terminal-start', 'Start terminal is visible');
                    t.elementIsVisible('.sch-event-hover .sch-gantt-terminal-end', 'End terminal is visible');
                }
            );
        });

        t.it('Only StartToEnd allowed', function (t) {
            getGantt2(['StartToEnd']);

            t.chain(
                { moveCursorTo : [1, 1] },
                { moveMouseTo : '.sch-gantt-item' },

                function (next) {

                    t.elementIsVisible('.sch-event-hover .sch-gantt-terminal-start', 'Source Start terminal is visible');
                    t.elementIsNotVisible('.sch-event-hover .sch-gantt-terminal-end', 'Source End terminal is not visible');
                    next();
                },

                { moveMouseTo : '.sch-event-hover .sch-gantt-terminal-start' },

                { action : 'mouseDown' },

                { moveMouseTo : '.sch-ganttview ' + Ext.grid.View.prototype.itemSelector + ':last-child .sch-gantt-item' },

                function (next) {
                    t.elementIsNotVisible('.T2 .sch-gantt-terminal-start', 'Target Start terminal is not visible');
                    t.elementIsVisible('.T2 .sch-gantt-terminal-end', 'Target End terminal is visible');

                    next();
                },
                { action : 'mouseUp' }
            );
        });

        t.it('Only EndToStart allowed', function (t) {
            getGantt2(['EndToStart']);

            t.chain(
                { moveCursorTo : [1, 1] },
                { moveMouseTo : '.sch-gantt-item' },

                function (next) {
                    t.elementIsNotVisible('.sch-event-hover .sch-gantt-terminal-start', 'Source Start terminal is not visible');
                    t.elementIsVisible('.sch-event-hover .sch-gantt-terminal-end', 'Source End terminal is visible');
                    next();
                },

                { moveMouseTo : '.sch-event-hover .sch-gantt-terminal-end' },
                { action : 'mouseDown' },
                { moveMouseTo : '.sch-ganttview ' + Ext.grid.View.prototype.itemSelector + ':last-child .sch-gantt-item' },

                function (next) {
                    t.elementIsVisible('.T2 .sch-gantt-terminal-start', 'Target Start terminal is visible');
                    t.elementIsNotVisible('.T2 .sch-gantt-terminal-end', 'Target End terminal is not visible');

                    next();
                },

                { action : 'mouseUp' }
            );
        });

        t.it('StartToEnd and EndToStart allowed', function (t) {
            getGantt2(['StartToEnd', 'EndToStart']);

            t.chain(
                { moveCursorTo : [1, 1] },
                { moveMouseTo : '.sch-gantt-item' },

                function (next) {
                    t.elementIsVisible('.T1 .sch-gantt-terminal-start', 'Source Start terminal is visible');
                    t.elementIsVisible('.T1 .sch-gantt-terminal-end', 'Source End terminal is visible');
                    next();
                },
                { moveMouseTo : '.sch-event-hover .sch-gantt-terminal-end' },

                { action : 'mouseDown' },

                { moveMouseTo : '.sch-ganttview ' + Ext.grid.View.prototype.itemSelector + ':last-child .sch-gantt-item' },

                function () {
                    t.elementIsVisible('.T2 .sch-gantt-terminal-start', 'Target Start terminal is visible');
                    t.elementIsVisible('.T2 .sch-gantt-terminal-end', 'Target End terminal is visible');

                    t.mouseUp();
                }
            );
        });

        t.it('StartToEnd and EndToEnd allowed', function (t) {
            getGantt2(['StartToEnd', 'EndToEnd']);

            t.chain(
                { moveCursorTo : [1, 1] },
                { moveMouseTo : '.sch-gantt-item' },

                function (next) {
                    t.elementIsVisible('.T1 .sch-gantt-terminal-start', 'Source Start terminal is visible');
                    t.elementIsVisible('.T1 .sch-gantt-terminal-end', 'Source End terminal is visible');
                    next();
                },

                { moveMouseTo : '.sch-event-hover .sch-gantt-terminal-start' },

                { action : 'mouseDown' },

                { moveMouseTo : '.sch-ganttview ' + Ext.grid.View.prototype.itemSelector + ':last-child .sch-gantt-item' },

                function () {
                    t.elementIsNotVisible('.T2 .sch-gantt-terminal-start', 'Target Start terminal is not visible');
                    t.elementIsVisible('.T2 .sch-gantt-terminal-end', 'Target End terminal is visible');

                    t.mouseUp();
                }
            );
        });

        t.it('EndToStart and StartToStart allowed', function (t) {
            getGantt2(['EndToStart', 'StartToStart']);

            t.chain(
                { moveCursorTo : [1, 1] },
                { moveMouseTo : '.sch-gantt-item' },

                function (next) {
                    t.elementIsVisible('.T1 .sch-gantt-terminal-start', 'Source Start terminal is visible');
                    t.elementIsVisible('.T1 .sch-gantt-terminal-end', 'Source End terminal is visible');
                    next();
                },

                { moveMouseTo : '.sch-event-hover .sch-gantt-terminal-end' },

                { action : 'mouseDown' },

                { moveMouseTo : '.sch-ganttview ' + Ext.grid.View.prototype.itemSelector + ':last-child .sch-gantt-item' },

                function () {
                    t.elementIsVisible('.T1 .sch-gantt-terminal-start', 'Target Start terminal is visible');
                    t.elementIsNotVisible('.T1 .sch-gantt-terminal-end', 'Target End terminal is not visible');

                    t.mouseUp();
                }
            );
        });
    });
});