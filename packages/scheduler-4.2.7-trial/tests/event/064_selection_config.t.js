StartTest(function (t) {

    // #2702 - eventSelModel config doesn't work

    t.it('eventSelModel defined on the panel is applied to the scheduler view', function (t) {
        var async = t.beginAsync();

        var fn = function () {
            t.endAsync(async);
            t.pass('Function called');
        };

        t.getScheduler({
            renderTo      : Ext.getBody(),
            eventSelModel : {
                listeners : {
                    select : fn
                }
            }
        });

        t.chain(
            { click : '.sch-event', desc : 'Click event to cause selection change' }
        );
    });

});