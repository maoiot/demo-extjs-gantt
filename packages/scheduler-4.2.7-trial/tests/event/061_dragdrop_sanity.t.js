StartTest(function (t) {

    var scheduler = t.getScheduler({
        enableDragCreation : false,
        renderTo           : Ext.getBody(),
        dragConfig         : {
            showTooltip : false
        }
    }, 1);

    var origRegion;
    var origEl;

    t.chain(
        { click : '.sch-event' },

        { waitFor : 400 },

        function (next) {
            origEl = Ext.getBody().down('.sch-timetd .sch-event');
            origRegion = origEl.getRegion();
            next();
        },

        { drag : '.sch-event', by : [10, 0], dragOnly : true },

        { moveCursorBy : [ [-10, 0] ] },

        function (next) {
            var origEl = Ext.getBody().down('.sch-timetd .sch-event');

            t.notOk(origEl.isVisible(origEl), 'Original element should be hidden during drag drop');

            t.hasRegion(Ext.getBody().down('.sch-dragproxy .sch-event'),
                origRegion,
                'At drag start: Drag drop proxy should be aligned with original event');
            next();
        },

        { moveCursorBy : [ [10, 0] ] },

        function (next) {
            t.is(Ext.getBody().down('.sch-dragproxy .sch-event').getLeft(),
                origRegion.left + 10,
                'Drag drop proxy should move with mouse');

            origEl.select('.sch-resizable-handle').each(function (el) {
                t.elementIsNotTopElement(el, false, el.dom.className + ': Should not find any visible sub-elements during drag drop');
            });

            next()
        },

        { action : 'mouseUp'},

        { click : '.sch-event' },

        function() {
            // https://www.assembla.com/spaces/bryntum/tickets/1524#/activity/ticket
            var dragProxyEl = scheduler.el.down('.sch-dragproxy');
            t.is(dragProxyEl.getLeft(true), 0, 'left style reset');
            t.is(dragProxyEl.getTop(true), 0, 'top style reset');
        }
    );
});