StartTest (function (t) {

    t.expectGlobal('Employee', '0');

    var secondaryCanvasSelector = '.sch-secondary-canvas',
        zoneSelector            = '.sch-zone',
        linesSelector           = '.sch-column-line',
        lockedBodySelector,
        normalBodySelector,
        iframe,
        doc,
        normalBody,
        lockedBody,
        secondaryCanvas,
        zones,
        lines;

    // puts HTML code into iframe
    var setIframe   = function (t, html) {
        iframe = t.setIframe({ html : html });
        doc    = iframe.contentWindow.document;

        lockedBody  = t.$(lockedBodySelector, doc)[0];
        normalBody  = t.$(normalBodySelector, doc)[0];
        secondaryCanvas = t.$(secondaryCanvasSelector, doc)[0];
        zones = t.$(zoneSelector, doc);
        lines = t.$(linesSelector, doc);
    };

    var createFakeData  = function (count) {

        var firstNames   = ['Ed', 'Tommy', 'Aaron', 'Abe', 'Jamie', 'Adam', 'Dave', 'David', 'Jay', 'Nicolas', 'Nige'],
            lastNames    = ['Spencer', 'Maintz', 'Conran', 'Elias', 'Avins', 'Mishcon', 'Kaneda', 'Davis', 'Robinson', 'Ferrero', 'White'];

        var data = [];

        for (var i = 0; i < (count || 25); i++) {
            var firstNameId = Math.floor(Math.random() * firstNames.length),
                lastNameId  = Math.floor(Math.random() * lastNames.length),
                name        = Ext.String.format('{0} {1}', firstNames[firstNameId], lastNames[lastNameId]);

            data.push({
                Id          : i,
                index       : i,
                name        : name
            });
        }

        Ext.define('Employee', {
            extend : 'Sch.model.Resource',
            fields : [
                { name : 'Id', type : 'int' },
                { name : 'index', type : 'int' },
                { name : 'name' }
            ]
        });

        // create the Resource Store
        var resourceStore   = Ext.create('Sch.data.ResourceStore', {
            model           : 'Employee',
            data            : data,
            proxy           : 'memory'
        });

        var eventData       = [];

        for (i = 0; i < (count || 25); i++) {
            eventData.push({
                Id          : 'Event' + i,
                Name        : 'Event' + i + '-1',
                ResourceId  : i,
                StartDate   : '2011-01-26',
                EndDate     : '2011-01-27'
            });

            if (i % 2) eventData.push({
                Id          : 'Event' + i + '-2',
                Name        : 'Event' + i + '-2',
                ResourceId  : i,
                StartDate   : '2011-01-26',
                EndDate     : '2011-01-28'
            });

        }

        var zoneStore = Ext.create('Ext.data.JsonStore', {
            model : 'Sch.model.Range',
            data  : [
                {
                    StartDate : new Date(2011, 0, 27),
                    EndDate   : new Date(2011, 0, 28),
                    Cls       : 'sch-myZoneStyle'
                }
            ]
        });

        // Store holding all the events
        var eventStore = Ext.create('Sch.data.EventStore', {
            data            : eventData
        });

        return {
            resourceStore   : resourceStore,
            eventStore      : eventStore,
            zoneStore       : zoneStore
        };
    };

    t.describe('Assert zones plugin', function (t) {

        var data            = createFakeData(100);
        var resourceStore   = data.resourceStore;
        var eventStore      = data.eventStore;
        var zoneStore       = data.zoneStore;

        var plugin          = new Sch.plugin.Export({
            //printServer   : '../examples/export/server.php',
            openAfterExport : false,
            test            : true
        });

        var scheduler   = t.getScheduler({
            rowHeight       : 40,
            width           : 2000,
            renderTo        : Ext.getBody(),
            startDate       : new Date(2011, 0, 25),
            endDate         : new Date(2011, 0, 30),
            plugins         : [
                plugin,
                Ext.create("Sch.plugin.Zones", {
                    store : zoneStore
                })
            ],
            viewPreset      : 'dayAndWeek',
            columns     : [
                { header : 'Name', sortable : true, width : 100, dataIndex : 'name' }
            ],
            resourceStore   : resourceStore,
            eventStore      : eventStore
        });

        lockedBodySelector = '#' + scheduler.lockedGrid.view.getId();
        normalBodySelector = '#' + scheduler.normalGrid.view.getId();

        t.waitForRowsVisible(scheduler, function () {

            t.it('Single export buffered', function (t) {

                var async = t.beginAsync(45000);

                plugin.doExport({
                    format      : 'A4',
                    orientation : 'landscape',
                    range       : 'complete',
                    exporterId  : 'singlepage'
                }, function (exported) {

                    setIframe(t, exported.htmlArray[0].html);

                    t.is(parseInt(lockedBody.style.top, 10), 0, 'correct top position of locked grid');
                    t.is(parseInt(normalBody.style.top, 10), 0, 'correct top position of normal grid');
                    t.is(parseInt(secondaryCanvas.style.top, 10), 0, 'correct top position of secondary canvas');

                    var totalHeight = this.exporter.getTotalHeight();
                    t.is(parseInt(lines[0].style.height, 10), totalHeight, 'correct height of line');
                    t.is(parseInt(zones[0].style.height, 10), totalHeight, 'correct height of zone');

                    var normalRows = plugin.exporter.normalRows;
                    t.is(normalRows.length, 100);
                    t.ok(normalRows[0].height, 'Normalrow height defined');

                    var lockedRows = plugin.exporter.lockedRows;
                    t.is(lockedRows.length, 100);
                    t.ok(lockedRows[0].height, 'Lockedrow height defined');

                    t.is(exported.htmlArray.length, 1, 'proper number of pages exported');

                    t.endAsync(async);
                });
            });

        });
    });
});