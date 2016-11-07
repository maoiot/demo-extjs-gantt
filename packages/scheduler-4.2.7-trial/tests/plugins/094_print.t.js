StartTest(function(t) {

    t.expectGlobals('0');

    var printable   = new Sch.plugin.Printable({ autoPrintAndClose : false });

    var scheduler   = t.getScheduler({
        renderTo            : Ext.getBody(),

        plugins             : [
            printable,
            new Sch.plugin.Zones({
                store       : new Ext.data.Store({
                    model   : 'Sch.model.Range',
                    data    : [
                        {
                            StartDate   : new Date(2010, 1, 3),
                            EndDate     : new Date(2010, 1, 7),
                            Cls         : 'sch-myZoneStyle'
                        }
                    ]
                })
            })
        ],

        startDate           : new Date(2010, 1, 1),
        endDate             : new Date(2010, 1, 20),

        eventStore          : new Sch.data.EventStore({
            data        : [
                { Id : 1, StartDate : new Date(2010, 1, 3), EndDate : new Date(2010, 1, 5), ResourceId  : 1 },
                { Id : 11, StartDate : new Date(2010, 1, 3), EndDate : new Date(2010, 1, 5), ResourceId  : 1 },
                { Id : 2, StartDate : new Date(2010, 1, 5), EndDate : new Date(2010, 1, 7), ResourceId  : 2 },
                { Id : 3, StartDate : new Date(2010, 1, 11), EndDate : new Date(2010, 1, 11), ResourceId  : 3 },
                { Id : 31, StartDate : new Date(2010, 1, 11), EndDate : new Date(2010, 1, 12), ResourceId  : 3 },
                { Id : 32, StartDate : new Date(2010, 1, 11), EndDate : new Date(2010, 1, 13), ResourceId  : 3 }
            ]
        }),
        resourceStore       : new Sch.data.ResourceStore({
            data        : [
                { Id : 1, Name  : 'Resource1' },
                { Id : 2, Name  : 'Resource2' },
                { Id : 3, Name  : 'Resource3' }
            ]
        })
    });

    var win;

    t.chain(
        { waitForRowsVisible : scheduler },

        function (next) {

            // Mock up "window.open". Native window.open usage in the test causes troubles w/ timeouts
            window.open = function () {
                return win = t.setIframe({ onload : next }).contentWindow;
            };

            printable.doExport({
                format      : 'A4',
                orientation : 'portrait',
                range       : 'complete',
                exporterId  : 'multipage'
            });

        },

        function () {
            var doc         = win.document;
            var bodyHtml    = doc.body.innerHTML;

            t.hasCls(win.document.body, 'sch-print-body', 'Should find sch-print-body on the print body element');
            t.ok(Ext.fly(win.document.body).down('.sch-print-ct'), 'Should find sch-print-ct class as a child of the print body element');

            t.like(bodyHtml, 'sch-timeline', 'Found rendered column line');
            t.like(bodyHtml, 'sch-myZoneStyle', 'Found rendered zone style');
            t.like(bodyHtml, 'sch-zone', 'Found rendered zone');

            var normalRowsCt    = doc.querySelector('.sch-print-normal-rows-ct');
            var lockedRowsCt    = doc.querySelector('.sch-print-locked-rows-ct');

            var lockedRows      = t.$(Ext.grid.View.prototype.itemSelector, lockedRowsCt);
            var normalRows      = t.$(Ext.grid.View.prototype.itemSelector, normalRowsCt);

            t.is(lockedRows.length, 3, '3 rows')
            t.is(lockedRows.length, normalRows.length, 'Sanity - equal number of rows');

            Ext.Array.each(lockedRows, function (lockedRow, index) {
                t.is(lockedRow.offsetHeight, normalRows[ index ].offsetHeight, 'Row height sync is ok');
            });

            win.close();
        }
    );
});
