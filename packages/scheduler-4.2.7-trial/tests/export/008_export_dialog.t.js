StartTest({
    overrideSetTimeout  : false
},
function (t) {

    t.diag('Setup');
    t.expectGlobals('MyExportPlugin', 'MyExportDialog');
    t.defaultTimeout = 50000;

    Ext.define('MyExportDialog', {
        extend  : 'Sch.widget.ExportDialog',
        x       : 0,
        y       : 0,
        buildButtons : function () {
            var buttons = this.callParent(arguments);

            buttons[0].cls = 'sch-test-export-button';
            buttons[1].cls = 'sch-test-cancel-button';

            return buttons;
        }
    });

    Ext.define('MyExportPlugin', {
        extend                  : 'Sch.plugin.Export',
        exportDialogClassName   : 'MyExportDialog',

        onRequestSuccess : function (response) {
            var text = Ext.JSON.decode(response.responseText);

            t.pass('Request successfull.');

            if (text.success) {
                this.callParent(arguments);
            } else {
                t.fail('Export failed: ' + text.msg);
            }
        },
        onRequestFailure: function (response) {
            this.callParent(arguments);

            t.fail("Request failed.");
        }
    });

    var exportPlugin = Ext.create('MyExportPlugin', {
        printServer         : '../examples/export/server.php',
        openAfterExport     : false,
        exportDialogConfig  : {
            range               : 'date',
            showFooterField     : true,
            showColumnPicker    : true,
            showResizePicker    : true,
            showDPIField        : true
        }
    });

    var scheduler = t.getScheduler({
        renderTo : Ext.getBody(),
        plugins  : exportPlugin
    });

    t.waitForRowsVisible(scheduler, function () {

        var columnWidth     = scheduler.getSchedulingView().timeAxisViewModel.getTickWidth(),
            proto           = Sch.widget.ExportDialogForm.prototype,
            dateRangeText   = proto.l10n.dateRangeText,
            currentViewText = proto.l10n.currentViewText;

        t.it('Test default export', function (t) {

            t.chain(
                function (next) {
                    scheduler.showExportDialog();
                    next();
                },
                { waitForSelector : '.sch-exportdialog', desc: 'Export dialog visible' },
                function (next) {
                    var form = exportPlugin.getActiveExportDialog().form;
                    t.is(form.rangeField.getValue(), 'date', 'Proper default range value' );
                    next();
                },
                function (next) {
                    t.waitForEvent(exportPlugin, 'hidedialogwindow', next, null, 150000);
                    t.click('.sch-test-export-button');
                });
        });


        t.it('Test Footer', function (t) {

            t.chain(
                function (next) {
                    scheduler.showExportDialog();
                    next();
                },

                { click : '.sch-export-dialog-footer .x-form-checkbox' },

                function (next) {
                    t.waitForEvent(exportPlugin, 'hidedialogwindow', next, null, 150000);
                    t.click('.sch-test-export-button');
                }
            );
        });

        t.it('Test date range export', function (t) {

            t.chain(
                function (next) {
                    scheduler.showExportDialog();
                    next();
                },
                { click : '.sch-export-dialog-range' },
                { click : '.x-boundlist .x-boundlist-item:contains('+ dateRangeText +')' },

                function (next) {
                    t.waitForEvent(exportPlugin, 'hidedialogwindow', next, null, 150000);

                    t.click('.sch-test-export-button');
                }
            );
        });

        t.it('Test current view export', function (t) {

            t.chain(
                function (next) {
                    scheduler.showExportDialog();
                    next();
                },
                { click : '.sch-export-dialog-range' },
                { click : '.x-boundlist .x-boundlist-item:contains('+ currentViewText +')' },
                { drag : '.x-slider-thumb', by: [-30, 0] },

                function (next) {
                    t.waitForEvent(exportPlugin, 'hidedialogwindow', next, null, 150000);

                    t.click('.sch-test-export-button');
                }
            );
        });

        t.it('Test Columns', function (t) {

            t.chain(
                function (next) {
                    scheduler.showExportDialog();
                    next();
                },

                { click : '.sch-export-dialog-columns' },
                { click : '.sch-columnpicker-list .x-boundlist-item' },

                function (next) {
                    t.waitForEvent(exportPlugin, 'hidedialogwindow', next, null, 150000);
                    t.click('.sch-test-export-button');
                });
        });

        t.it('Test DPI field', function (t) {

            scheduler.mon(exportPlugin, {
                beforeexport :  function (arg1, arg2, config) {
                   t.is(config.DPI, 80, 'DPI is passed correctly');
                   scheduler.mun(exportPlugin, 'beforeexport');
                   return false;
                }
            });

            t.chain(
                function (next) {
                    scheduler.showExportDialog();
                    next();
                },
                { waitForSelector : '.sch-export-dialog-dpi' },
                function (next) {
                    exportPlugin.win.form.dpiField.setValue(80);
                    t.click('.sch-test-export-button');
                }
            );
        });

        t.is(scheduler.getSchedulingView().timeAxisViewModel.getTickWidth(), columnWidth, 'Column width properly restored after export');

    });
});
