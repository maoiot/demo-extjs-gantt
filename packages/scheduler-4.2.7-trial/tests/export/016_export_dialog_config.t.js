StartTest(function (t){
    var scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    var setup = function (config) {
        var exportPlugin = Ext.create('Sch.plugin.Export', {
            openAfterExport     : false,
            exportDialogConfig  : config
        });

        scheduler = t.getScheduler({
            renderTo : Ext.getBody(),
            plugins  : exportPlugin
        });
    };

    var proto           = Sch.widget.ExportDialogForm.prototype,
        dateRangeText   = proto.l10n.dateRangeText,
        currentViewText = proto.l10n.currentViewText;

    t.it('Resize picker disabled by default', function (t) {

        setup();

        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                scheduler.showExportDialog();
                next();
            },
            { click : '.sch-export-dialog-range' },
            { click : '.x-boundlist .x-boundlist-item:contains('+ currentViewText +')' },
            function (next) {
                t.selectorNotExists('.sch-ux-range-picker');
            }
        );
    });

    t.it('Enable resize picker', function (t) {

        setup({
            showResizePicker : true
        });

        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                scheduler.showExportDialog();
                next();
            },
            { click : '.sch-export-dialog-range' },
            { click : '.x-boundlist .x-boundlist-item:contains('+ currentViewText +')' },
            function (next) {
                t.selectorExists('.sch-ux-range-picker');
            }
        );
    });

    t.it('Daterange restriction enabled by default', function (t) {

        setup();

        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                scheduler.showExportDialog();
                next();
            },
            { click : '.sch-export-dialog-range' },
            { click : '.x-boundlist .x-boundlist-item:contains('+ dateRangeText +')' },
            { waitForCQVisible : 'datefield' },
            function (next, dates) {
                t.is(dates[0].getValue(), scheduler.getStartDate(), 'Dialog set on current startdate');
                t.is(dates[1].getValue(), scheduler.getEndDate(), 'Dialog set on current enddate');
                t.is(dates[0].minValue, scheduler.getStartDate(), 'Min startdate is set on current startdate');
                t.is(dates[1].maxValue, scheduler.getEndDate(), 'Max startdate is set on current enddate');

            }
        );
    });

    t.it('Daterange restriction disabled', function (t) {

        setup({
            dateRangeRestriction : false
        });

        t.chain(
            { waitForRowsVisible : scheduler },
            function (next) {
                scheduler.showExportDialog();
                next();
            },
            { click : '.sch-export-dialog-range' },
            { click : '.x-boundlist .x-boundlist-item:contains('+ dateRangeText +')' },
            { waitForCQVisible : 'datefield' },
            function (next, dates) {
                t.is(dates[0].getValue(), scheduler.getStartDate(), 'Dialog set on current startdate');
                t.is(dates[1].getValue(), scheduler.getEndDate(), 'Dialog set on current enddate');
                t.is(dates[0].minValue, null, 'Min startdate is null');
                t.is(dates[1].maxValue, null, 'Max startdate is null');

            }
        );
    });

    t.it('Config should be passed to form class', function (t) {

        // List of configs that have to be passed to the dialog
        var confStrings = ('pageFormats,startDate,endDate,rowHeight,columnWidth,defaultExporter,exporters,' +
            'dateRangeFormat,exportConfig,showColumnPicker,columnPickerConfig,showDPIField,dpiFieldConfig,showShowHeaderField,'+
            'showShowFooterField,showResizePicker,stateful,stateId,dateRangeRestriction,showRowsRangeField,'+
            'rowsRangeFieldConfig,rangeFieldConfig,formatFieldConfig,orientationFieldConfig,exportersFieldConfig').split(',');

        var configObject = {}, receivedConfig;

        // prepare test configuration object
        for (var i = 0, l = confStrings.length; i < l; i++) {
            configObject[confStrings[i]] = i;
        }

        Ext.define('Sch.MyExportDialogCls', {
            extend  : 'Sch.widget.ExportDialogForm',

            constructor : function (config) {
                // keep passed configuration object to assert later
                receivedConfig = Ext.apply({}, config);

                return this.callParent([{
                    exportConfig : {},
                    exporters    : []
                }]);
            }
        });

        setup(Ext.apply(configObject, {
            form : { xclass : 'Sch.MyExportDialogCls' }
        }));

        t.waitForRowsVisible(scheduler, function () {
            scheduler.showExportDialog();

            // we don't test these props
            delete receivedConfig.form;
            delete receivedConfig.xclass;
            delete configObject.form;

            t.isDeeply(receivedConfig, configObject, 'All the properties are passed to the dialog');
        });
    });
});


