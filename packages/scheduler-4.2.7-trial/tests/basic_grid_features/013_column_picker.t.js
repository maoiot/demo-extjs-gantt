StartTest(function (t) {

    var scheduler = t.getScheduler({
        renderTo : Ext.getBody(),
        columns : [
            { header : 'Id', sortable : true, width : 100, dataIndex : 'Id', hidden : true },
            { header : 'Name', sortable : true, width : 100, dataIndex : 'Name' }
        ]
    });

    t.waitForRowsVisible(scheduler, function () {

        var picker = new Sch.widget.ColumnPicker({
            columns : scheduler.lockedGrid.query('gridcolumn'),
            renderTo : Ext.getBody()
        });

        var selection = picker.getSelectedColumns();

        t.is(selection.length, 1, 'Filter contains one item');
        t.is(picker.rawValue, 'Name', 'Name found');
        t.isInstanceOf(selection[0], Ext.grid.column.Column, 'Item is column');
        t.is(picker.store.getCount(), 2, 'Picker store contains two columns');

        picker.select([picker.columns[0].id, picker.columns[1].id]);
        selection = picker.getSelectedColumns();
        t.is(selection.length, 2, 'Filter contains two items');
        t.is(picker.rawValue, 'Name, Id', 'Id and Name found');
    });

});
