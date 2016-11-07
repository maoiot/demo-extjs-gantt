StartTest(function(t) {

    var g = t.getGantt({
        renderTo : Ext.getBody(),
        columns  : [
            {
                xtype      : 'treecolumn',
                dataIndex  : 'Id'
            },
            {
                xtype      : 'addnewcolumn',
                columnList : Gnt.column.AddNew.buildDefaultColumnList().concat({
                    text   : 'Custom text',
                    config : {
                        dataIndex : 'Name',
                        editor    : 'textfield'
                    }
                })
            }
        ]
    });

    t.it('Should support adding custom fields', function(t) {
        t.chain(
            { waitForRowsVisible : g },
            { click : '>> addnewcolumn' },
            { waitForCQVisible : 'combobox', desc : 'Combobox is shown' },
            { type : 'Custom' },
            { waitForCompositeQuery : 'boundlist => .x-boundlist-item-over:contains(Custom text)' },
            { type : '[ENTER]' },
            { waitForCQVisible : 'ganttpanel gridcolumn[text="Custom text"]', desc : 'Custom text column is added' },
            function () {
                t.matchGridCellContent(g.lockedGrid, 0, 1, g.taskStore.getById(114).getName(), "Custom text column uses proper data index");
            }
        );
    });

});
