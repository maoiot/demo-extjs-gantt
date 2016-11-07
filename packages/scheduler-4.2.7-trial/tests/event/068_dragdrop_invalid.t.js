StartTest(function (t) {

    var scheduler = t.getScheduler({
        enableDragCreation : false,
        renderTo           : Ext.getBody(),
        dragConfig         : {
            showTooltip : false
        }
    });


    t.it('Should not change a record after trying to drag it outside of the chart', function (t) {
        t.wontFire(scheduler.eventStore, 'update');

        t.chain(
            { drag : '.sch-event', to : [5, 5] },

            function() {
                var dragProxyEl = scheduler.el.down('.sch-dragproxy');
                t.is(dragProxyEl.getLeft(true), 0, 'left style reset');
                t.is(dragProxyEl.getTop(true), 0, 'top style reset');
            }
        );
    });
})
