/* globals Prism */
StartTest(function (t) {

    if (!Ext.isIE) {
        t.ok(Prism, 'Prism included');

        t.ok(Prism.languages.javascript, 'Prism javascript available');
        t.ok(Prism.languages.json, 'Prism json available');
        t.ok(Prism.languages.xml, 'Prism xml available');
    }

    t.ok(Sch.examples.DetailsPanel, 'DetailsPanel included');

    t.it('Expand panel and combo, check contents', function (t) {
        t.chain(
            { action: 'click', target: '>>header[region=east]' },

            function(next) {
                t.hasValue('>>details combo', 'Details');
                t.ok(t.cq1('details combo').store.findExact('field1', 'app/model/Project.js'), 'Find Project.js');

                next();
            },

            { waitForTarget : 'details => :contains(Advanced Gantt demo)'},

            { action: 'click', target: '>>details combo' },

            { click : ".x-boundlist-item:contains(app.js)" },

            { waitForTarget : 'details => pre:contains(Ext.application)'}
        );
    });
});


