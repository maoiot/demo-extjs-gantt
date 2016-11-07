StartTest(function (t) {

    var g;

    t.beforeEach(function () {
        g = t.getGantt2({
            forceFit  : true,
            renderTo  : Ext.getBody(),
            StartDate : new Date(2010, 0, 1),
            EndDate   : new Date(2010, 2, 10),
            taskStore : new Gnt.data.TaskStore({
                root : {
                    children : [
                        {
                            Id        : 1,
                            StartDate : new Date(2010, 1, 1),
                            EndDate   : new Date(2010, 1, 10)
                        },
                        {
                            Id        : 2,
                            StartDate : new Date(2010, 1, 1),
                            EndDate   : new Date(2010, 1, 10)
                        }
                    ]
                }
            }),

            dependencyStore : new Gnt.data.DependencyStore({
                data : [
                    {
                        From : 1,
                        To   : 2,
                        Type : 1
                    }
                ]
            })
        });

    })

    t.it('should fire click, rightclick, dblclick events', function (t) {
        Ext.Array.forEach(['dependencyclick', 'dependencydblclick', 'dependencycontextmenu'], function (o) {
            t.firesAtLeastNTimes(g, o, 1);
        });


        t.chain(
            { waitForSelector : '.sch-dependency-line-horizontal' },

            // First click row to focus it - then try to click dependency line (focused row has higher zindex by default in Ext 6.0)
            // https://www.assembla.com/spaces/bryntum/tickets/2391/details?comment=852965283#
            { click : '.sch-timetd', offset : [5, '50%']},

            function (next) {
                g.el.select('.sch-event-wrap').remove();
                g.el.select('.sch-dependency-line-v').remove();

                next()
            },

            { click : '.sch-dependency-line-horizontal' },
            { waitFor : 100 },
            { rightClick : '.sch-dependency-line-horizontal'  },
            { waitFor : 100 },
            { doubleClick : '.sch-dependency-line-horizontal'  }
        )
    })
})
