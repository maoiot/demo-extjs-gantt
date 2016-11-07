/* global JSHINT */
/* jshint evil:true */
StartTest(function(t) {

    t.expectGlobals('JSHINT');

    t.getFile('../gnt-all-debug.js', function (gntAllDebugText) {
        t.getFile('../.jshintrc', function (jsHintRcText) {
            var myResult = JSHINT(gntAllDebugText, eval('(' + jsHintRcText + ')'));

            t.notOk(gntAllDebugText.match(/console\.log\(/), 'Found console.log in code, clean up!');

            if (myResult) {
                t.pass('No lint errors found');
            } else {
                Ext.each(JSHINT.errors, function(err) {
                    t.fail(err.reason + '(line: ' + err.line + ', char: ' + err.character + ')');
                });
            }
        })
    })
})