StartTest(function (t) {
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    t.it('Simple grid next to scheduler works ok', function (t) {
        var grid = new Ext.grid.Panel({
            renderTo: Ext.getBody(),
            width: 400,
            height: 200,
            store: Ext.create('Ext.data.Store', {
                data: [
                    { id:1, name:'Luca', age:20},
                    { id:2, name:'Mats', age:21},
                    { id:3, name:'Paul', age:22},
                    { id:4, name:'Lisa', age:23}
                ]
            }),
            columns: [
                { dataIndex: 'id', text: 'Id', locked: true },
                { dataIndex: 'name', text: 'Name' }
            ]
        });

        scheduler = t.getScheduler({
            renderTo    : Ext.getBody()
        });

        t.waitForEventsToRender(scheduler, function () {
            scheduler.lockedGrid.collapse();

            t.ok(scheduler.lockedGrid.collapsed, 'Locked grid collapsed ok');
        });
    });
});