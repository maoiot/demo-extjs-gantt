StartTest(function (t) {
    var setup = function (cfg) {
        return t.getScheduler(Ext.apply({
            renderTo    : Ext.getBody()
        }, cfg));
    }
    
    t.it('Resize tip should ', function (t) {
        var scheduler = setup({
            resizeValidatorFn   : function () {
                return { valid : false, message : 'test' }
            }
        });
        
        t.chain(
            { waitForEventsToRender : scheduler },
            { moveMouseTo : '.sch-event' },
            { drag : '.sch-resizable-handle-end', by : [-20, 0] },
            // check if second resize would throw exception
            { drag : '.sch-resizable-handle-end', by : [-20, 0] }
        );
    });
});