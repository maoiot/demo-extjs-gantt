StartTest(function (t) {

    Ext.Loader.setPath('Sch', '../js/Sch');

    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();

        scheduler = t.getScheduler({
            renderTo    : Ext.getBody(),
            plugins     : [{
                ptype       : 'scheduler_export',
                pluginId    : 'export_plugin',
                printServer : 'something'
            }],
            columns     : [
                { dataIndex : 'Name', width : 100 },
                { dataIndex : 'Name', text : '&nbsp;', width : 100 },
                { dataIndex : 'Name', text : 'col1', width : 50, ignoreInExport : true },
                { dataIndex : 'Name', text : 'col2', width : 50 },
                { dataIndex : 'Name', text : 'col3', width : 50, ignoreInExport : true }            ]
        });
    });

    t.it('Should ignore column configured with ignoreInExport=true in the column picker', function (t) {

        var plugin = scheduler.getPlugin('export_plugin');

        scheduler.showExportDialog();

        t.waitForCQVisible('exportdialog', function () {
            var store     = plugin.getActiveExportDialog().form.columnPicker.store;
            var emptyText = Sch.locale.En.l10n['Sch.widget.ExportDialogForm'].columnEmptyText;
            var columns   = scheduler.lockedGrid.getColumnManager().getColumns();

            t.is(store.getCount(), 3, 'proper number of items in the picker');

            t.is(store.getAt(0).get('name'), emptyText, '#0 proper item text in the picker');
            t.is(store.getAt(0).get('column'), columns[0], '#0 proper column item in the picker');
            t.is(store.getAt(1).get('name'), emptyText, '#1 proper item text in the picker');
            t.is(store.getAt(1).get('column'), columns[1], '#1 proper column item in the picker');
            t.is(store.getAt(2).get('name'), columns[3].text, '#2 proper item text in the picker');
            t.is(store.getAt(2).get('column'), columns[3], '#2 proper column item in the picker');
        });

    });

    t.it('Should localize empty header text', function (t) {

        var plugin = scheduler.getPlugin('export_plugin');

        scheduler.showExportDialog();

        t.chain(
            { waitForCQVisible : 'exportdialog' },

            function (next) {
                var store     = plugin.getActiveExportDialog().form.columnPicker.store;
                var emptyText = Sch.locale.En.l10n['Sch.widget.ExportDialogForm'].columnEmptyText;

                t.is(store.getAt(0).get('name'), emptyText, 'Empty header localized');
                t.is(store.getAt(1).get('name'), emptyText, 'Empty header localized');
                next();
            },

            { requireOk : ['Sch.locale.Nl'], desc : 'Nl localization applied' },

            function (next) {
                scheduler.showExportDialog();
                next();
            },

            { waitForCQVisible : 'exportdialog' },

            function () {
                var store     = plugin.getActiveExportDialog().form.columnPicker.store;
                var emptyText = Sch.locale.Nl.l10n['Sch.widget.ExportDialogForm'].columnEmptyText;

                t.is(store.getAt(0).get('name'), emptyText, 'Empty header localized');
                t.is(store.getAt(1).get('name'), emptyText, 'Empty header localized');
            }
        );
    });

});