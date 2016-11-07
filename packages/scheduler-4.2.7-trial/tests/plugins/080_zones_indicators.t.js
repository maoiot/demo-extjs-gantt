StartTest(function(t) {

    var scheduler;
    var zoneStore;
    var D                   = Sch.util.Date,
        startDate           = new Date(2011, 0, 3),
        endDate             = new Date(2011, 0, 13),
        indicatorSelector   = '.sch-header-indicator';

    t.beforeEach(function() {
        scheduler && scheduler.destroy();

        zoneStore           = Ext.create('Ext.data.JsonStore', {
            model       : 'Sch.model.Range',
            data        : [
                {
                    StartDate : D.add(startDate, D.DAY, -2),
                    EndDate   : D.add(startDate, D.DAY, -1),
                    Text      : 'Before start date'
                },
                {
                    StartDate : D.add(startDate, D.DAY, -1),
                    EndDate   : D.add(startDate, D.DAY, 1),
                    Text      : 'Including start date'
                },
                {
                    StartDate : D.add(startDate, D.DAY, 1),
                    EndDate   : D.add(startDate, D.DAY, 2),
                    Text      : 'Valid zone',
                    Cls       : 'text-cls'
                },
                {
                    StartDate : D.add(endDate, D.DAY, -1),
                    EndDate   : D.add(endDate, D.DAY, 1),
                    Text      : 'Including start date'
                },
                {
                    StartDate : D.add(endDate, D.DAY, -1),
                    EndDate   : D.add(endDate, D.DAY, 1),
                    Text      : 'After end date'
                }
            ]
        });
    })

    function runTests(t, orientation) {

        var plugin      = new Sch.plugin.Zones({
            store               : zoneStore,
            showHeaderElements  : true
        });

        scheduler   = t.getScheduler({
            height      : 400,
            width       : 800,
            startDate   : startDate,
            endDate     : endDate,
            orientation : orientation,
            viewConfig : {
                // animations fail in chrome 40
                // https://code.google.com/p/chromium/issues/detail?id=454960
                eventAnimations : false
            },
            plugins     : plugin
        });

        // rendering is async
        scheduler.render(Ext.getBody());

        var model           = scheduler.getSchedulingView().getTimeAxisViewModel(),
            isHorizontal    = scheduler.isHorizontal();


        function checkIndicator(t, el, date, position, cls) {

            if (D.betweenLesser(date, startDate, endDate)) {

                t.ok(el, 'Indicator should be rendered.');

                var elPos           = isHorizontal ? el.getLocalX() + (scheduler.rtl ? el.getWidth() : 0) : el.getLocalY();

                t.is(model.getDateFromPosition(elPos, 'round'), date, 'Indicator rendered in correct place on the time axis.');

                var box             = el.getBox(),
                    indicatorCenter = (isHorizontal ? box.left + box.right : box.top + box.bottom) / 2;

                // more safe way of using public method `getBox` led to increasing of error from 1 to 1.5 pixel
                // this is why we had to increase threshold (only for vertical orientation)
                // For IE9 approximation has to be increased to 3
                t.isApprox(indicatorCenter, position, Ext.isIE9 ? 3 : 2, "Header is placed right above the line");

                if (cls) {
                    t.ok(el.hasCls(cls), 'Indicator should have class "' + cls + '".');
                }
            } else {
                t.notOk(el, 'Indicator should not be rendered.');
            }
        }

        function checkZones(t) {
            // check each zone presented in the store
            zoneStore.each(function(record) {
                var zoneStartDate   = record.getStartDate(),
                    zoneEndDate     = record.getEndDate(),
                    zoneEl          = Ext.get(plugin.getElementId(record)),
                    startEl         = Ext.get(plugin.getHeaderElementId(record, true)),
                    endEl           = Ext.get(plugin.getHeaderElementId(record));

                if (D.intersectSpans(zoneStartDate, zoneEndDate, startDate, endDate)) {
                    t.ok(zoneEl, 'Zone should be rendered.');

                    var zoneRect    = zoneEl.getBox();
                    var cls         = record.get(record.clsField);

                    checkIndicator(t, startEl, zoneStartDate, isHorizontal ? zoneRect.left : zoneRect.top, cls);
                    checkIndicator(t, endEl, zoneEndDate, isHorizontal ? zoneRect.right : zoneRect.bottom, cls);
                } else {
                    t.notOk(zoneEl, 'Zone should not be rendered.');
                    t.notOk(startEl, 'Start indicator should not be rendered.');
                    t.notOk(endEl, 'End indicator should not be rendered.');
                }
            });
        }


        t.chain(
            { waitForSelector : [indicatorSelector, scheduler.el] },

            t.getSubTest('Indicator position', checkZones),

            function(next) {
                zoneStore.loadRawData([
                    {
                        StartDate : D.add(startDate, D.DAY, 2),
                        EndDate   : D.add(startDate, D.DAY, 3),
                        Text      : 'Some valid date',
                        Cls       : 'loaded'
                    }
                ]);

                next();
            },

            { waitForSelector : [indicatorSelector + '.loaded', scheduler.el] },

            t.getSubTest('Records loaded', checkZones),

            function(next) {
                var record = zoneStore.first();

                // wait for CSS3 animation completion
//                t.waitForCSSTransition(scheduler.el, 100, next);

                // Set date out of range
                record.setStartDate(D.add(startDate, D.DAY, -2));
                
                next();
            },

            t.getSubTest('Updated to invalid start date', checkZones),

            function(next) {
                var record = zoneStore.first();

                // wait for CSS3 animation completion
//                t.waitForCSSTransition(scheduler.el, 100, next);

                // Set date out of range
                record.setEndDate(D.add(endDate, D.DAY, 1));
                
                next();
            },

            t.getSubTest('Updated to invalid end date', checkZones),

            function(next) {
                var record = zoneStore.first();

                // wait for CSS3 animation completion
//                t.waitForCSSTransition(scheduler.el, 100, next);

                // Set valid date
                record.set({
                    StartDate   : D.add(startDate, D.DAY, 1),
                    EndDate     : D.add(startDate, D.DAY, 2),
                    Cls         : 'sch-new-class'
                });
                
                next();
            },

            t.getSubTest('Updated to valid date', checkZones),

            function(next) {
                zoneStore.add({
                    StartDate   : D.add(startDate, D.DAY, 3),
                    EndDate     : D.add(startDate, D.DAY, 4),
                    Text        : 'Some valid date',
                    Cls         : 'sch-added'
                });

                next();
            },

            { waitForSelector : [indicatorSelector + '.sch-added', scheduler.el] },

            t.getSubTest('Added record', checkZones),

            function(next) {
                scheduler.setSize(700, 400);
                next();
            },

            { waitForSelector : [indicatorSelector, scheduler.el] },

            t.getSubTest('Tests after resize', checkZones)
        );

    }

    t.it('Horizontal orientation', function(t) {
        runTests(t, 'horizontal');
    });

    t.it('Vertical orientation', function(t) {
        runTests(t, 'vertical');
    });

});
