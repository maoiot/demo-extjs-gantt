StartTest(function(t) {

    var testConfig = t.harness.getScriptDescriptor(t.url);

    // retrieve active locale Id
    var locale = testConfig.pageUrl.split('#').pop();

    t.it('Hit all buttons and try filter (locale '+locale+')', function(t) {
        t.waitForRowsVisible('ganttpanel', function() {

            var decimalSeparators = {
                'en'    : '.',
                'sv_SE' : ',',
                'ru'    : ',',
                'de'    : ',',
                'it'    : ',',
                'pl'    : ',',
                'nl'    : ','
            };

            // Checks that extjs locale was applied before panel got created #1964
            t.is(t.cq1('durationcolumn').field.decimalSeparator, decimalSeparators[locale], 'correct decimal separator found');

            var buttonsToSkip = ['addTask', 'manageCalendars', 'saveChanges', 'removeSelected', 'indentTask', 'outdentTask', 'tryMore', 'viewFullScreen'];

            var monkeyButtons = function () {

                var str = 'gantt_timeline > header ' + Ext.Array.map(buttonsToSkip, function (item) {
                        return '[reference!=' + item + ']';
                    }).join('');

                return str;
            }

            t.chain(
                Ext.Array.map(t.cq(monkeyButtons()), function (cmp) {
                    return { click : '#' + cmp.id };
                }),

                { click : '.sch-gantt-project-name' },

                { click : '>>[reference=addTask]' },

                { waitForTarget : '.x-field-form-focus' },

                { type : '[ENTER]' },

                { click : '>>[reference=outdentTask]' },

                { click : '>>[reference=removeSelected]' },

                { click : '>>[reference=manageCalendars]' },

                { waitForCQVisible : 'calendarmanager', desc : 'Calendar manager window showed' },

                { type : '[ESCAPE]' }, // type ESC to hide calendar manager window

                function (next) {
                    t.ok(t.cq1('[reference=saveChanges]').isDisabled(), 'Save button is disabled since there are no changes');
                    next();
                },

                { click : '>>[reference=tryMore]' },

                Ext.Array.map(t.cq('gantt-secondary-toolbar button'), function (cmp) {
                    // provide horizontal 10px offset ..since when we run the test in the vm
                    // it has quite a narrow screen width and a button is not 100% visible sometimes
                    // so we target its left part
                    return { click : cmp, offset : [ 10, '50%' ] };
                }),

                { click : '>> namecolumn textfield' },

                { type : 'foo', target : '>> namecolumn textfield' },

                {
                    waitFor : function() {
                        return t.cq1('ganttpanel treeview').store.getCount() === 0;
                    }
                },

                { type : '[ESCAPE]', target : '>> namecolumn textfield' },

                function (next) {
                    t.cq1('ganttpanel').destroy();
                    next();
                },
                { waitForSelectorNotFound : '.sch-ganttpanel' }
            )
        })
    })
});


