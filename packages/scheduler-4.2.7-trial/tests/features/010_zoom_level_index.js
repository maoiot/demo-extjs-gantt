StartTest(function (t) {
    var setup = function () {
        return t.getScheduler({
            startDate   : new Date(2015, 0, 7),
            endDate     : new Date(2016, 0, 7),
            layout      : 'fit',
            viewPreset  : 'monthAndYear',
            renderTo    : Ext.getBody()
        });
    };
    
    t.it('Zoom out should always change zoom level', function (t) {
        var scheduler = setup();
        
        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                scheduler.zoomOut();
                t.is(scheduler.getCurrentZoomLevelIndex(), 5, 'Zoomlevel index is correct after zoom out');
                
                scheduler.destroy();
            }
        );
    });
    
    t.it('Should correctly zoom out when no matching zoom level found', function (t) {
        var scheduler = setup();
        
        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                scheduler.setViewPreset('year', scheduler.startDate, scheduler.endDate);
                scheduler.setTimeColumnWidth(320);
                scheduler.zoomOut();
                t.is(scheduler.getCurrentZoomLevelIndex(), 4, 'Zoomlevel index is correct after zoom out');
                
                scheduler.destroy();
            }
        );
    });
    
    t.it('Should correctly zoom in when no matching zoom level found', function (t) {
        var scheduler = setup();
        
        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                scheduler.setViewPreset('year', scheduler.startDate, scheduler.endDate);
                scheduler.setTimeColumnWidth(320);
                scheduler.zoomIn();
                t.is(scheduler.getCurrentZoomLevelIndex(), 6, 'Zoomlevel index is correct after zoom out');
                
                scheduler.destroy();
            }
        );
    });
});