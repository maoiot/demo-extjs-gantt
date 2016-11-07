StartTest(function (t) {
    var scheduler, view, scrollPosition;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();

        scheduler = t.getSchedulerTree({
            renderTo    : Ext.getBody(),
            resourceStore : t.getResourceTreeStore({
                proxy : {
                    type   : 'memory',
                    data   : [
                        {
                            expanded : true,
                            children : [
                                {
                                    Id : "r1",
                                    Name     : 'Kastrup Airport',
                                    expanded : true,
                                    children : [
                                        {
                                            Id       : "r2",
                                            Name     : 'Terminal A',
                                            expanded : true,
                                            children : [
                                                {
                                                    Id       : "r3",
                                                    Name     : 'Gates 1 - 5',
                                                    expanded : true,
                                                    children : [
                                                        {
                                                            Id : "r4",
                                                            Name    : 'Gate 1',
                                                            leaf    : true
                                                        },
                                                        {
                                                            Id : "r5",
                                                            Name    : 'Gate 2',
                                                            leaf    : true
                                                        },
                                                        {
                                                            Id : "r6",
                                                            Name    : 'Gate 3',
                                                            leaf    : true
                                                        },
                                                        {
                                                            Id : "r7",
                                                            Name    : 'Gate 4',
                                                            leaf    : true
                                                        },
                                                        {
                                                            Id : "r8",
                                                            Name    : 'Gate 5',
                                                            leaf    : true
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            Id       : "r9",
                                            Name     : 'Terminal B',
                                            children : [
                                                {
                                                    Id       : "r10",
                                                    Name     : 'Gates 1 - 5',
                                                    expanded : true,
                                                    children : [
                                                        {
                                                            Id : "r11",
                                                            Name    : 'Gate 1',
                                                            leaf    : true
                                                        },
                                                        {
                                                            Id : "r12",
                                                            Name    : 'Gate 2',
                                                            leaf    : true
                                                        },
                                                        {
                                                            Id : "r13",
                                                            Name    : 'Gate 3',
                                                            leaf    : true
                                                        },
                                                        {
                                                            Id : "r14",
                                                            Name    : 'Gate 4',
                                                            leaf    : true
                                                        },
                                                        {
                                                            Id : "r15",
                                                            Name    : 'Gate 5',
                                                            leaf    : true
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            Id : "r42222",
                                            Name    : 'Gate 1214312421',
                                            leaf    : true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }),
            eventStore    : t.getEventStore({}, 15),
            eventRenderer : function (eventRec, resourceRec, templateData) {
                templateData.cls = 'sch-event-' + eventRec.getId();
            },
            columns       : [
                { header : 'Name', sortable : true, width : 200, dataIndex : 'Name', xtype : 'treecolumn' }
            ],
            height  : 200,
            dependencyViewConfig : {
                drawDependencies : false
            }
        }, 200);

        view = scheduler.getSchedulingView();
    });

    t.it('Scroll should be intact after dragdrop', function (t) {
        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                t.waitForEvent(view, 'scroll', next);
                view.scrollTo(view.el.dom.scrollWidth, view.el.dom.scrollHeight);
            },
            function (next) {
                scrollPosition = {
                    left : view.getScrollX(),
                    top : view.getScrollY()
                };
                next();
            },
            { drag : '.sch-event-8', by : [-10, 0] },
            {
                moveMouseBy : [[-200, 0]],
                desc        : 'Move mouse over normal view to trigger tip and layout update'
            },
            function () {
                // in ext6.0.1 vertical scroll here jumps 1px
                t.isApprox(view.getScrollY(), scrollPosition.top, 1, 'Top scroll is not changed');
                t.is(view.getScrollX(), scrollPosition.left, 'Left scroll is not changed');
            }
        )
    });

    t.it('Scroll should be intact after tree expand/collapse', function (t) {
        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                t.waitForEvent(view, 'scroll', function () {
                    scrollPosition = {
                        left : view.getScrollX(),
                        top : view.getScrollY()
                    };
                    next();
                });
                view.scrollTo(view.el.dom.scrollWidth, view.el.dom.scrollHeight);
            },
            { click : function () {
                return t.getRow(scheduler, 9).down('.x-tree-expander');
            }},
            { click : function () {
                return t.getRow(scheduler, 10).down('.x-tree-expander');
            }},
            function () {
                t.is(view.getScrollY(), scrollPosition.top, 'Top scroll is not changed');
                t.is(view.getScrollX(), scrollPosition.left, 'Left scroll is not changed');
            }
        );
    });

    t.it('Scroll should remain intact after drag create', function (t) {
        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                t.waitForEvent(view, 'scroll', function () {
                    scrollPosition = {
                        left : view.getScrollX(),
                        top : view.getScrollY()
                    };
                    next();
                });
                view.scrollTo(view.el.dom.scrollWidth, view.el.dom.scrollHeight);
            },
            { drag : "schedulergridview => table.x-grid-item:nth-child(11) .sch-timetd", offset : [854, 11], by : [221, -15] },

            function (next) {
                t.waitForEvent(view, 'scroll', function () {
                    scrollPosition = {
                        left : view.getScrollX(),
                        top : view.getScrollY()
                    };
                    next();
                });
                view.scrollBy(0, -50);
            },

            {
                moveCursorTo : ">>schedulergridview",
                offset : [561, 20],
                desc : 'Move mouse over normal view to trigger tip and layout update'
            },

            function () {
                t.is(view.getScrollY(), scrollPosition.top, 'Top scroll is not changed');
                t.is(view.getScrollX(), scrollPosition.left, 'Left scroll is not changed');
            }
        )
    });
});
