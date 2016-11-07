StartTest(function(t) {

    Sch.preset.Manager.registerPreset("second", {
        displayDateFormat : 'm:i:s',
        shiftIncrement    : 1,
        shiftUnit         : "DAY",
        timeResolution    : {
            unit      : "DAY",
            increment : 1
        },

        headerConfig      : {
            middle : {
                unit       : "DAY",
                dateFormat : 'i:s'
            }
        }
    });

    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    t.it('Should draw single header', function (t) {
        scheduler = t.getScheduler({
            viewPreset  : 'second',
            lightWeight : true,
            renderTo    : Ext.getBody(),
            width       : 500,

            columns     : [
                { header: 'Name', sortable: true, width: 100, dataIndex: 'Name' },
                { header: 'Id', sortable: true, width: 100, hidden : true, dataIndex: 'Id' }
            ]
        });


        t.waitForEventsToRender(scheduler, function () {
            var schedulerView   = scheduler.getSchedulingView();
            var headerCt        = schedulerView.headerCt;

            var timeAxis        = headerCt.items.getAt(0);

            t.isGreater(timeAxis.el.getWidth(), headerCt.el.getWidth(), 'Time axis has expanded horizontally');
            t.is(scheduler.normalGrid.getHeaderContainer().getHeight(), timeAxis.getHeight(), 'Height of the timeaxis matches header container');
        });
    });

    t.it('Single header should fill header container', function (t) {
        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            viewPreset  : 'second',
            columns     : [
                {
                    dataIndex : 'Name',
                    text      : 'Name',
                    items     : [{ xtype : 'textfield' }]
                }
            ]
        });

        var schedulerView   = scheduler.getSchedulingView();
        var headerCt        = schedulerView.headerCt;
        var timeAxis        = headerCt.items.getAt(0);

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                t.is(timeAxis.getEl().down('.sch-column-header').getHeight(), timeAxis.getHeight(), 'Height of the timeaxis matches header container');

                t.waitForEvent(headerCt, 'afterlayout', next);
                headerCt.setHeight(60);
            },
            function (next) {
                t.is(timeAxis.getEl().down('.sch-column-header').getHeight(), 60, 'Height of the timeaxis matches header container');
                t.waitForEvent(headerCt, 'afterlayout', next);
                headerCt.setHeight(80);
            },
            function () {
                t.is(timeAxis.getEl().down('.sch-column-header').getHeight(), 80, 'Height of the timeaxis matches header container');
            }
        );
    });

    t.it('Single header should fill header container', function (t) {
        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            columns     : [
                { dataIndex : 'Name', text : 'Name', width : 100 }
            ]
        });

        var schedulerView   = scheduler.getSchedulingView();
        var headerCt        = schedulerView.headerCt;
        var timeAxis        = headerCt.items.getAt(0);

        var validateHeaderHeight = function () {
            t.is(timeAxis.getEl().down('.sch-header-row-middle .sch-column-header').getHeight(),
                Math.floor(timeAxis.getHeight() / 2), 'Height of the timeaxis matches top header container');

            t.is(timeAxis.getEl().down('.sch-header-row-top .sch-column-header').getHeight(),
                Math.floor(timeAxis.getHeight() / 2), 'Height of the timeaxis matches middle header container');
        };

        t.chain(
            { waitForEventsToRender : scheduler },
            function (next) {
                validateHeaderHeight();
                t.waitForEvent(headerCt, 'afterlayout', next);
                headerCt.setHeight(60);
            },
            function (next) {
                validateHeaderHeight();
                t.waitForEvent(headerCt, 'afterlayout', next);
                headerCt.setHeight(80);
            },

            validateHeaderHeight
        );
    });
});