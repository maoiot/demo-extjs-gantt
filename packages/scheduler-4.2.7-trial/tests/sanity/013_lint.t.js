/* global JSHINT */
/* jshint evil:true */
StartTest(function(t) {

    t.expectGlobals('JSHINT');

    t.getFile('../sch-all-debug.js', function (schAllDebugText) {
        t.getFile('../.jshintrc', function (jsHintRcText) {
            var myResult = JSHINT(schAllDebugText, eval('(' + jsHintRcText + ')'));

            t.notOk(schAllDebugText.match('console.log'), 'Should not find console.log in code!');

            if (myResult) {
                t.pass('No lint errors found');
            } else {
                Ext.each(JSHINT.errors, function(err) {
                    t.fail(err.reason + '(line: ' + err.line + ', char: ' + err.character + ')');
                });
            }

            t.diag((schAllDebugText.split('HACK').length - 1) + ' HACK statements found');
        })
    })
})
