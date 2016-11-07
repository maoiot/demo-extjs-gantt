StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    })

    t.it('Providing custom text to hover tip is easy', function (t) {
        scheduler = t.getScheduler({
            renderTo     : Ext.getBody(),
            createConfig : {
                hoverTip : {
                    getText : function () {
                        return 'My tip';
                    }
                }
            }
        });

        t.chain(
            { moveCursorTo : '.sch-timetd', offset : [20, 5] },

            { waitForComponentVisible : '[bodyCls=sch-hovertip]' },

            function (next) {
                var tipEl = Ext.getBody().down('.sch-hovertip');
                t.contentLike(tipEl, 'My tip', 'Tooltip template works correct');
            }
        );
    });

    t.it('Hover tip can be created with xtype', function (t) {
        Ext.define('Sch.tooltip.MyTip', {
            extend : 'Sch.tooltip.HoverTip',

            alias : 'widget.mytip',

            bodyCls : 'sch-mytestclass'
        });

        scheduler = t.getScheduler({
            renderTo     : Ext.getBody(),
            createConfig : {
                hoverTip : {
                    xtype   : 'mytip',
                    getText : function () {
                        return 'My tip1';
                    }
                }
            }
        });

        t.chain(
            { moveCursorTo : '.sch-timetd', offset : [30, 5] },

            function (next) {
                t.ok(t.cq1('[bodyCls=sch-mytestclass]'), 'hover tip instantiated');

                var tipEl = Ext.getBody().down('.sch-mytestclass');
                t.contentLike(tipEl, 'My tip1', 'Tooltip template works correct');

                scheduler.destroy();
            }
        );
    });

    t.it('Clock template isolated', function (t) {
        var tpl = new Sch.tooltip.ClockTemplate({});

        for (var i = 0; i < 6; i++) {
            var dt = new Date(2015, 9, 14, 15, 10*i);
            document.body.innerHTML += '<div style="margin-top:10px">' + Ext.Date.format(dt, 'G:i') +'</div>';

            tpl.append(document.body, {
                date : dt,
                text : 'foo'
            });
        }

    });
});