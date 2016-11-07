StartTest(function (t){

    // #2729 - Export: columns picker keeps column list from its previous run

    t.it('Column picker refreshes its dropdown list content every export dialog run', function (t) {

        var exportPlugin;

        var scheduler = t.getScheduler({
            renderTo : Ext.getBody(),
            plugins  : exportPlugin = new Sch.plugin.Export()
        });

        t.chain(
            { waitForRowsVisible : scheduler },

            function (next) {
                scheduler.showExportDialog();

                var field = exportPlugin.getActiveExportDialog().form.columnPicker;

                t.isGreater(field.store.findBy(function (item) { return item.get('name') == 'Name'; }), -1, 'Name item is found');

                exportPlugin.getActiveExportDialog().close();

                scheduler.setMode('vertical');

                next();
            },

            { waitForCQVisible : 'resourcecolumn' },

            function () {
                scheduler.showExportDialog();

                var field = exportPlugin.getActiveExportDialog().form.columnPicker;

                t.isLess(field.store.findBy(function (item) { return item.get('name') == 'Name'; }), 0, 'no "Name" item found');
            }
        );
    });

});


