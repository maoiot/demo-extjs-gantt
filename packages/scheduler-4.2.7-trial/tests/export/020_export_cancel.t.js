StartTest (function (t) {

    var createFakeData  = function (count) {

        var data = [];

        for (var i = 0; i < (count || 25); i++) {
            data.push({
                Id          : i,
                Name        : 'Name ' + i
            });
        }

        // create the Resource Store
        var resourceStore   = Ext.create('Sch.data.ResourceStore', {
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

        // Store holding all the events
        var eventStore = Ext.create('Sch.data.EventStore', {
            data            : eventData
        });

        return {
            resourceStore   : resourceStore,
            eventStore      : eventStore
        };
    };

    t.describe('Assert the cancel flow of the export', function (t) {

        var data            = createFakeData(100);
        var resourceStore   = data.resourceStore;
        var eventStore      = data.eventStore;

        var async,
            it;

        var plugin          = new Sch.plugin.Export({
            openAfterExport : false,
            test            : true,
            onPageCommit    : function () {
                plugin.cancelExport();
            },
            afterExport : function (component) {
                it.endAsync(async);
            }
        });

        var scheduler   = t.getScheduler({
            rowHeight       : 40,
            width           : 2000,
            renderTo        : Ext.getBody(),
            startDate       : new Date(2011, 0, 25),
            endDate         : new Date(2011, 0, 30),
            plugins         : [
                plugin 
            ],
            viewPreset      : 'dayAndWeek',
            // Setup static columns
            columns     : [
                { header : 'Name', sortable : true, width : 100, dataIndex : 'Name' }
            ],
            resourceStore   : resourceStore,
            eventStore      : eventStore
        });

        var assertSequence = function (t, exporterId) {
            var exporter = plugin.getExporter(exporterId);
            t.isCalledOnce(exporter.abort, exporter, 'Abort called');
            t.isCalledOnce(exporter.restoreComponent, exporter, 'Restore called');
        };

        t.waitForRowsVisible(scheduler, function () {

            t.it('Cancel multipage export', function (t) {

                async = t.beginAsync(45000);
                it = t;

                assertSequence(t, 'multipage');
                
                plugin.doExport({
                    format      : 'A4',
                    orientation : 'portrait',
                    range       : 'complete',
                    exporterId  : 'multipage'
                }, function () {
                    t.fail('The export process should be cancelled');
                });

            });
        });
    });
});
