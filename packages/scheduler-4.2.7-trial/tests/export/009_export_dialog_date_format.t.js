StartTest(function(t) {
    /* global MyExportPlugin */
    t.expectGlobals('MyExportPlugin');

    Ext.define('MyExportPlugin', {
        extend              : 'Sch.plugin.Export',
        doExport            : function (config) {
            t.is(config.dateFrom, this.getActiveExportDialog().form.startDate, 'proper start date');
            t.is(config.dateTo, this.getActiveExportDialog().form.endDate, 'proper end date');
        }
    });

    // checks that ExportDialog properly converts range dates before passing them to Export.doExport (#1672)
    t.it('Should properly convert range dates at default before passing them to export', function (t) {

        var exportPlugin = new MyExportPlugin();

        var scheduler   = t.getScheduler({
            renderTo    : Ext.getBody(),
            plugins     : exportPlugin
        });

        t.chain(
            { waitForRowsVisible : scheduler },

            function (next) {
                scheduler.showExportDialog();
                next();
            },

            { click : '.sch-export-dialog-range', desc : 'Open range combo' },
            { click : '.x-boundlist .x-boundlist-item:contains(Date)', desc : 'Pick date range option' },
            { click : '>> button[text=Export]' },
            function () {
                scheduler.destroy();
            }
        );
    });

    t.it('Should properly convert range dates before passing them to export', function (t) {
        // checks that ExportDialog properly converts range dates before passing them to Export.doExport (#1506)

        var exportPlugin = new MyExportPlugin({
            exportDialogConfig  : {
                dateRangeFormat : 'd-m-Y'
            }
        });

        var scheduler   = t.getScheduler({
            renderTo    : Ext.getBody(),
            plugins     : exportPlugin
        });

        t.chain(
            { waitForRowsVisible : scheduler },

            function (next) {
                scheduler.showExportDialog();
                next();
            },

            { click : '.sch-export-dialog-range', desc : 'Open range combo' },
            { click : '.x-boundlist .x-boundlist-item:contains(Date)', desc : 'Pick date range option' },
            { click : '>> button[text=Export]' },
            function () {
                scheduler.destroy();
            }
        );
    });

    t.it('Should disable format and orientation fields in single page mode', function (t) {
        var plugin  = new Sch.plugin.Export();

        var scheduler   = t.getScheduler({
            renderTo    : Ext.getBody(),
            plugins     : plugin
        });

        t.waitForRowsVisible(scheduler, function () {
            scheduler.showExportDialog();

            var form = plugin.getActiveExportDialog().form;

            form.exportersField.setValue('singlepage');

            t.ok(form.formatField.disabled, 'Format field is disabled');
            t.ok(form.orientationField.disabled, 'Orientation field is disabled');

            form.exportersField.setValue('multipage');

            t.notOk(form.formatField.disabled, 'Format field is enabled');
            t.notOk(form.orientationField.disabled, 'Orientation field is enabled');
        });
    });
});
