/* global MyExportPlugin, MyExportPluginError */
StartTest(function (t) {
    var scheduler;

    t.expectGlobals('MyExportPlugin', 'MyExportPluginError');

    t.beforeEach(function () {
        scheduler && scheduler.destroy();
    });

    function checkFileExists (url, t) {
        var async = t.beginAsync();

        Ext.Ajax.request({
            method  : 'HEAD',
            url     : url,
            success : function (response, opts) {
                t.pass('File created');
                t.ok(response.request.xhr.getResponseHeader('Content-Length'), 'File has some size');
                t.endAsync(async);
            },

            failure : function (response, opts) {
                t.fail("Request failed");
                t.endAsync(async);
            }
        });
    }

    Ext.define('MyExportPlugin', {
        extend : 'Sch.plugin.Export',

        onRequestSuccess : function (response) {
            var text = Ext.JSON.decode(response.responseText);

            var t = this.testContext;

            t.pass('Request successfull.');

            if (text.success) {
                this.callParent(arguments);
                checkFileExists(text.url, t);
            } else {
                t.fail('Export failed: ' + text.msg);
            }

            t.endAsync(this.async);
        },
        onRequestFailure : function (response) {
            this.callParent(arguments);

            var t = this.testContext;

            t.fail("Request failed.");

            t.endAsync(this.async);
        }
    });

    Ext.define('MyExportPluginError', {
        extend : 'Sch.plugin.Export',

        onExportFailure : function () {
            var t = this.testContext;
            var me = this;

            t.isCalled('unmask', scheduler.getEl(), 'Body unmasked.');

            this.callParent(arguments);

            t.pass('Error caught after returning server error.');

            // close error messagebox
            t.waitForCQVisible('messagebox', function () {
                t.cq1('messagebox').close();
                t.endAsync(me.async);
            });
        }
    });

    t.it('Check "export" example response', function (t) {
        scheduler = t.getScheduler({
            renderTo : Ext.getBody(),
            plugins  : new MyExportPlugin({
                testContext     : t,
                async           : t.beginAsync(45000),
                printServer     : '../examples/export/server.php',
                openAfterExport : false
            })
        });

        t.waitForRowsVisible(scheduler, scheduler.doExport);
    });

    t.it('Check error response', function (t) {
        scheduler = t.getScheduler({
            renderTo : Ext.getBody(),
            plugins  : new MyExportPluginError({
                testContext     : t,
                async           : t.beginAsync(),
                printServer     : 'export/002_check_error_handling.php',
                openAfterExport : false
            })
        });

        t.waitForRowsVisible(scheduler, scheduler.doExport);
    });

    // #2727 - Missing locale "generalError" of the Sch.plugin.Export class

    t.it('Check error response (empty JSON object)', function (t) {
        scheduler = t.getScheduler({
            renderTo : Ext.getBody(),
            plugins  : new MyExportPluginError({
                testContext     : t,
                async           : t.beginAsync(),
                printServer     : 'export/002_check_error_handling2.json',
                openAfterExport : false
            })
        });

        t.waitForRowsVisible(scheduler, scheduler.doExport);
    });
});
